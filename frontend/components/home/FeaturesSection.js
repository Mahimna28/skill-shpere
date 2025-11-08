import React from 'react';
import Card from '@/components/ui/Card';
import { BotIcon, VideoIcon, AwardIcon, BarChart3Icon, UsersIcon, FileTextIcon } from '@/components/icons';

const FeaturesSection = () => {
  const features = [
    { icon: <BotIcon className="w-10 h-10 text-indigo-600" />, title: "AI Study Assistant", description: "Get instant help with homework, topic explanations, and study planning." },
    { icon: <VideoIcon className="w-10 h-10 text-indigo-600" />, title: "Live Online Classes", description: "Engage in real-time sessions with teachers (placeholder for now)." },
    { icon: <AwardIcon className="w-10 h-10 text-indigo-600" />, title: "Gamification", description: "Earn points, badges, and climb leaderboards as you learn (placeholder)." },
    { icon: <BarChart3Icon className="w-10 h-10 text-indigo-600" />, title: "Learning Analytics", description: "Track progress with detailed analytics for students, teachers, and parents." },
    { icon: <UsersIcon className="w-10 h-10 text-indigo-600" />, title: "Connected Community", description: "Chat with classmates, teachers, and parents in a secure environment." },
    { icon: <FileTextIcon className="w-10 h-10 text-indigo-600" />, title: "Rich Resources", description: "Access videos, notes, and assignments all in one place." },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            A New Way to Learn
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Skill Sphere brings all the tools you need into one seamless platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="inline-block p-4 bg-indigo-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;