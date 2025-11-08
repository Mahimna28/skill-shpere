/**
 * Auth Form Component
 * * A reusable form for both login and signup.
 */
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { LogoIcon } from '@/components/icons';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await signup(email, password, role, institution);
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <div className="text-center">
          <LogoIcon className="w-12 h-12 text-indigo-600 mx-auto" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Log in to continue your learning.' : 'Join Skill Sphere today.'}
          </p>
        </div>
        
        {error && (
          <div className="p-3 text-red-800 bg-red-100 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">I am a...</label>
            <Select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Institution Admin</option>
            </Select>
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700">Institution (School/College)</label>
              <Input
                type="text"
                placeholder="e.g., Greenwood High"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full py-3" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isLogin ? (
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:underline">
                Log In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;