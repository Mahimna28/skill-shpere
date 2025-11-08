/**
 * Student Dashboard Page
 */
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { MOCK_COURSES } from '@/lib/constants';
import { callGeminiAPI } from '@/lib/api';

const StudentOverview = ({ user }) => {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [studyPlan, setStudyPlan] = useState('');
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  const handleGenerateStudyPlan = async () => {
    setIsPlanModalOpen(true);
    setIsPlanLoading(true);
    setStudyPlan('');

    const systemPrompt = "You are a friendly and encouraging academic advisor. Generate a concise, 5-day study plan based on the user's courses. Use markdown for simple formatting (like headers or bullets) but keep it brief.";
    const courseTitles = MOCK_COURSES.slice(0, 2).map(c => c.title).join(', ');
    const userQuery = `I'm a student taking the following courses: ${courseTitles}. Please create a 5-day study plan for me, outlining key topics to review or activities for each day to help me stay on track.`;

    const plan = await callGeminiAPI(userQuery, systemPrompt);
    
    setStudyPlan(plan);
    setIsPlanLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <ul className="space-y-2">
            {MOCK_COURSES.slice(0, 2).map(c => (
              <li key={c.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>{c.title}</span>
                <Button variant="secondary" className="px-3 py-1 text-sm">Continue</Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">My Stats (Gamification)</h2>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">1,250</p>
              <p className="text-gray-600">Points</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">5</p>
              <p className="text-gray-600">Badges</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">#12</p>
              <p className="text-gray-600">Leaderboard</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                ✨ AI Study Planner
              </h2>
              <p className="text-gray-600">Feeling overwhelmed? Let our AI generate a custom study plan based on your courses.</p>
            </div>
            <Button 
              variant="primary" 
              onClick={handleGenerateStudyPlan} 
              className="px-6 py-3 text-base flex-shrink-0"
              disabled={isPlanLoading}
            >
              {isPlanLoading ? "Generating..." : "Generate My 5-Day Plan"}
            </Button>
          </div>
        </Card>
      </div>

      <Modal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        title="Your AI-Generated Study Plan"
      >
        {isPlanLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-2">
            {studyPlan.split('\n').map((line, index) => (
              <p key={index} className="text-gray-700">
                {line || <br />}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default function StudentDashboardPage() {
  const { user } = useAuth();
  if (!user || user.role !== 'student') return null; // Or a loading/error state

  return (
    <DashboardLayout>
      <StudentOverview user={user} />
    </DashboardLayout>
  );
}