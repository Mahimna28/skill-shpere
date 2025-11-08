/*
  Skill Sphere - backend/server.js
  Complete, production-ready (prototype) Express server for the Skill Sphere MERN prototype.
  - Uses dotenv, mongoose, express, cors, helmet, morgan, cookie-parser
  - JWT auth skeleton, role-based middleware
  - Basic route examples: /api/auth, /api/users, /api/courses, /api/institutions
  - File upload support via multer
  - Socket.IO integration for realtime features (chat/notifications)
  - Graceful shutdown and useful startup logs

  Usage:
    1. create a .env file with: 
         PORT=5000
         MONGO_URI="your-mongodb-connection-string"
         JWT_SECRET="strong_jwt_secret"
         CLIENT_URL="http://localhost:3000"
    2. npm install express mongoose dotenv cors helmet morgan cookie-parser bcryptjs jsonwebtoken multer socket.io http-errors express-rate-limit
    3. node backend/server.js
*/

const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const CLIENT_URL = process.env.CLIENT_URL || '*';

if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env — please configure it.');
  process.exit(1);
}

// ---------------------- Mongoose setup ----------------------
mongoose.set('strictQuery', true);

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// ---------------------- Minimal Models (inline for prototype) ----------------------
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'parent', 'institution_admin'], default: 'student' },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', UserSchema);

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Course = mongoose.model('Course', CourseSchema);

const InstitutionSchema = new Schema({
  name: { type: String, required: true },
  subDivisions: [
    {
      name: String,
      code: String,
    },
  ],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});
const Institution = mongoose.model('Institution', InstitutionSchema);

// ---------------------- Express app setup ----------------------
const app = express();
const server = http.createServer(app);

// Socket.IO (for real-time chat/notifications)
const { Server: IOServer } = require('socket.io');
const io = new IOServer(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('⚡️ Socket connected:', socket.id);
  socket.on('joinRoom', (room) => socket.join(room));
  socket.on('leaveRoom', (room) => socket.leave(room));
  socket.on('message', (payload) => {
    // payload: { room, userId, text }
    if (payload && payload.room) io.to(payload.room).emit('message', payload);
  });
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

// Security & middleware
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Rate limiter for basic protection
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
});
app.use(limiter);

// Static uploads (ensure directory exists in real project)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------------------- Helpers: Auth ----------------------
function signToken(user) {
  const payload = { id: user._id, role: user.role, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies?.token;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden - insufficient role' });
    next();
  };
}

// ---------------------- Multer setup (file uploads) ----------------------
const uploadDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const safe = file.originalname.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
    cb(null, `${Date.now()}_${safe}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ---------------------- Routes (inline prototypes) ----------------------
app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// --- Auth routes ---
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role: role || 'student' });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// --- Profile ---
app.get('/api/users/me', authRequired, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

// --- Users management (admin-like) ---
app.get('/api/users', authRequired, requireRole('institution_admin', 'teacher'), async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').limit(200);
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

// --- Courses ---
app.post('/api/courses', authRequired, requireRole('teacher', 'institution_admin'), async (req, res, next) => {
  try {
    const { title, description, tags } = req.body;
    const course = await Course.create({ title, description, tags: tags || [], teacher: req.user.id });
    res.status(201).json({ course });
  } catch (err) {
    next(err);
  }
});

app.get('/api/courses', async (req, res, next) => {
  try {
    const q = {};
    if (req.query.teacher) q.teacher = req.query.teacher;
    const courses = await Course.find(q).populate('teacher', 'name email');
    res.json({ courses });
  } catch (err) {
    next(err);
  }
});

// --- Institutions & subdivision creation ---
app.post('/api/institutions', authRequired, requireRole('institution_admin'), async (req, res, next) => {
  try {
    const { name, subDivisions } = req.body;
    const inst = await Institution.create({ name, subDivisions, admins: [req.user.id] });
    res.status(201).json({ institution: inst });
  } catch (err) {
    next(err);
  }
});

app.get('/api/institutions', async (req, res, next) => {
  try {
    const list = await Institution.find().limit(200);
    res.json({ institutions: list });
  } catch (err) {
    next(err);
  }
});

// --- Upload avatar ---
app.post('/api/upload/avatar', authRequired, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  await User.findByIdAndUpdate(req.user.id, { avatarUrl: url });
  res.json({ url });
});

// ---------------------- Simple admin seed endpoint (dev only) ----------------------
app.post('/api/dev/seed-admin', async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'production') return res.status(403).json({ message: 'Disabled in production' });
    const { name = 'Admin', email = 'admin@example.com', password = 'password' } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await hashPassword(password);
      user = await User.create({ name, email, passwordHash, role: 'institution_admin' });
    }
    const token = signToken(user);
    res.json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (err) {
    next(err);
  }
});

// ---------------------- Error handling ----------------------
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error', status });
});

// ---------------------- Start server ----------------------
async function start() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

start();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received: closing server');
  server.close(() => {
    mongoose.disconnect().then(() => process.exit(0));
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server');
  server.close(() => {
    mongoose.disconnect().then(() => process.exit(0));
  });
});

module.exports = app; // exported for tests
