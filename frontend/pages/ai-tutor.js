/**
 * AI Tutor Page
 */
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AiTutorPanel from '@/components/AiTutorPanel';

export default function AiTutorPage() {
  return (
    <DashboardLayout>
      <AiTutorPanel />
    </DashboardLayout>
  );
}