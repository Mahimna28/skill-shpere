/**
 * Main Dashboard Redirector
 * * This page checks the user's role and redirects them
 * to their specific dashboard.
 */
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DashboardIndex() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;

    // Redirect based on role
    switch (user.role) {
      case 'student':
        router.replace('/dashboard/student');
        break;
      case 'teacher':
        router.replace('/dashboard/teacher');
        break;
      case 'parent':
        router.replace('/dashboard/parent');
        break;
      case 'admin':
        router.replace('/dashboard/admin');
        break;
      default:
        router.replace('/'); // Fallback
    }
  }, [user, loading, router]);

  return <LoadingSpinner />;
}