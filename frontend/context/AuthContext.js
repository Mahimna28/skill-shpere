/**
 * Auth Context
 * * This context manages user state and "simulates" login/logout
 * In a real MERN app, this would make API calls to your /api/auth endpoints
 * using a library like Axios.
 */
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { MOCK_USERS } from '@/lib/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On mount, check localStorage for a logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem('skillSphereUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Effect to protect routes
  useEffect(() => {
    if (loading) return;

    const isAuthPage = router.pathname.startsWith('/auth');
    const isDashboardPage = router.pathname.startsWith('/dashboard') || router.pathname === '/chat' || router.pathname === '/ai-tutor';

    if (!user && isDashboardPage) {
      router.push('/auth/login');
    } else if (user && isAuthPage) {
      router.push('/dashboard');
    }
  }, [user, loading, router.pathname, router]);

  // Simulated login
  const login = (email, password, role) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = MOCK_USERS.find(u => u.role === role);
        if (mockUser) {
          const loggedInUser = { ...mockUser, email };
          setUser(loggedInUser);
          localStorage.setItem('skillSphereUser', JSON.stringify(loggedInUser));
          setLoading(false);
          resolve(loggedInUser);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials or role not found'));
        }
      }, 1000);
    });
  };

  // Simulated signup
  const signup = (email, password, role, institution) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: `u${Math.floor(Math.random() * 1000)}`,
          name: email.split('@')[0],
          email,
          role,
          institution
        };
        setUser(newUser);
        localStorage.setItem('skillSphereUser', JSON.stringify(newUser));
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillSphereUser');
    router.push('/');
  };

  const value = { user, loading, login, signup, logout };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  return useContext(AuthContext);
};