/**
 * Admin Dashboard Page
 */
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const AdminOverview = ({ user }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Institution: {user.institution}</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-indigo-600">150</p>
          <p className="text-gray-600">Students</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">25</p>
          <p className="text-gray-600">Teachers</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">12</p>
          <p className="text-gray-600">Classes</p>
        </div>
      </div>
      <div className="mt-6 space-x-2">
        <Button variant="primary">Add Subdivision</Button>
        <Button variant="secondary">Assign Teachers</Button>
      </div>
    </Card>
  </div>
);

export default function AdminDashboardPage() {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return null;

  return (
    <DashboardLayout>
      <AdminOverview user={user} />
    </DashboardLayout>
  );
}