/**
 * Mock Data
 * * This file contains all the mock data for the prototype.
 * In a real MERN app, this data would come from your MongoDB database.
 */

export const MOCK_COURSES = [
  {
    id: 1,
    title: "AI & Machine Learning Bootcamp",
    category: "AI",
    description: "Go from beginner to expert in AI with Python, TensorFlow, and Scikit-learn.",
    imageUrl: "https://placehold.co/600x400/1e40af/ffffff?text=AI+Bootcamp",
    resources: [
      { type: "video", title: "Intro to Machine Learning", url: "https://www.youtube.com/watch?v=KNAWp2S3w94" },
      { type: "notes", title: "Statistics for AI", url: "https://drive.google.com/file/d/1.../view" }
    ]
  },
  {
    id: 2,
    title: "Full-Stack Web Development (MERN)",
    category: "Web Development",
    description: "Master the MERN stack (MongoDB, Express, React, Node) and build real-world applications.",
    imageUrl: "https://placehold.co/600x400/34d399/ffffff?text=MERN+Stack",
    resources: [
      { type: "video", title: "React Hooks Explained", url: "https://www.youtube.com/watch?v=cF2lQ_x8c-c" },
      { type: "notes", title: "Node.js Cheat Sheet", url: "https://drive.google.com/file/d/1.../view" }
    ]
  },
  {
    id: 3,
    title: "Cybersecurity Essentials",
    category: "Cybersecurity",
    description: "Learn ethical hacking, network security, and how to protect digital assets.",
    imageUrl: "https://placehold.co/600x400/be123c/ffffff?text=Cybersecurity",
    resources: [
      { type: "video", title: "What is Penetration Testing?", url: "https://www.youtube.com/watch?v=fN-y-a-A7cQ" },
      { type: "notes", title: "OWASP Top 10", url: "https://drive.google.com/file/d/1.../view" }
    ]
  },
  {
    id: 4,
    title: "Data Science with Python",
    category: "Data Science",
    description: "Learn data analysis, visualization, and statistical modeling using Pandas, Numpy, and Matplotlib.",
    imageUrl: "https://placehold.co/600x400/f59e0b/ffffff?text=Data+Science",
    resources: [
      { type: "video", title: "Pandas DataFrame Tutorial", url: "https://www.youtube.com/watch?v=zmdjNSmRXF4" },
      { type: "notes", title: "Data Visualization Principles", url: "https://drive.google.com/file/d/1.../view" }
    ]
  }
];

export const MOCK_USERS = [
  { id: 'u1', name: 'Alice (Student)', role: 'student', institution: 'Greenwood High' },
  { id: 'u2', name: 'Bob (Student)', role: 'student', institution: 'Greenwood High' },
  { id: 'u3', name: 'Prof. (Teacher)', role: 'teacher', institution: 'Greenwood High' },
  { id: 'u4', name: 'Ms. (Parent)', role: 'parent', childId: 'u1' },
  { id: 'u5', name: 'Admin (Admin)', role: 'admin', institution: 'Greenwood High' },
];

export const MOCK_CHAT_CONTACTS = [
  { id: 'ai', name: 'Study Sphere AI', role: 'ai', avatar: '🤖', online: true },
  { id: 'gc1', name: 'Greenwood High - Class 10A', role: 'group', avatar: '🏫', online: true },
  { id: 'u2', name: 'Bob (Student)', role: 'student', avatar: '🧑‍🎓', online: false },
  { id: 'u3', name: 'Prof. (Teacher)', role: 'teacher', avatar: '👩‍🏫', online: true },
];

export const MOCK_CHAT_HISTORY = {
  'ai': [
    { from: 'ai', text: 'Hello! I am Study Sphere, your AI assistant. How can I help you with your studies today?' },
  ],
  'gc1': [
    { from: 'u2', name: 'Bob', text: 'Hey everyone, did anyone finish the math assignment?' },
    { from: 'self', text: 'Not yet, I\'m still working on question 3.' },
    { from: 'u2', name: 'Bob', text: 'It\'s tough!' },
  ],
  'u3': [
    { from: 'u3', name: 'Prof. (Teacher)', text: 'Hi Alice, just checking in on your progress for the MERN project.' },
    { from: 'self', text: 'Hi Professor! I\'m working on the frontend prototype right now.' },
  ],
  'u2': [
     { from: 'self', text: 'Hey Bob, are you going to the study group later?' },
  ]
};