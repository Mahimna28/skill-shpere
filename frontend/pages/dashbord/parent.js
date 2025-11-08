/**
 * Parent Dashboard Page
 */
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import { CheckCircleIcon, FileTextIcon, BarChart3Icon } from '@/components/icons';

const ParentOverview = ({ user }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Parent Dashboard</h1>
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Child's Progress (Alice)</h2>
      <p className="text-gray-600 mb-4">Showing dummy data for your child.</p>
      <div className="space-y-3">
        <div className="p-3 bg-green-50 rounded-lg flex items-center">
          <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
          <span>Math Assignment - Submitted</span>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg flex items-center">
          <FileTextIcon className="w-5 h-5 text-yellow-600 mr-2" />
          <span>History Essay - Due Friday</span>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg flex items-center">
          <BarChart3Icon className="w-5 h-5 text-blue-600 mr-2" />
          <span>Overall Grade: 88% (B+)</span>
        </div>
      </div>
    </Card>
  </div>
);

export default function ParentDashboardPage() {
  const { user } = useAuth();
  if (!user || user.role !== 'parent') return null;

  return (
    <DashboardLayout>
      <ParentOverview user={user} />
    </DashboardLayout>
  );
}