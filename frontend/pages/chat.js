/**
 * Chat Page
 */
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChatPanel from '@/components/ChatPanel';

export default function ChatPage() {
  return (
    <DashboardLayout>
      <ChatPanel />
    </DashboardLayout>
  );
}