/**
 * Teacher Dashboard Page
 */
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const TeacherOverview = ({ user }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Teacher Dashboard</h1>
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Classes</h2>
      <ul className="space-y-2">
        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span>Class 10A - Mathematics</span>
          <Button variant="secondary" className="px-3 py-1 text-sm">Manage</Button>
        </li>
        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span>Class 12B - Physics</span>
          <Button variant="secondary" className="px-3 py-1 text-sm">Manage</Button>
        </li>
      </ul>
      <Button variant="primary" className="mt-4">Create New Class</Button>
    </Card>
  </div>
);

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  if (!user || user.role !== 'teacher') return null;

  return (
    <DashboardLayout>
      <TeacherOverview user={user} />
    </DashboardLayout>
  );
}