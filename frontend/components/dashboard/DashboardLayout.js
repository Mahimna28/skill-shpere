/**
 * Dashboard Layout
 * * This component wraps all dashboard pages, providing the
 * sidebar and header context.
 */
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  LogoIcon, HomeIcon, BookOpenIcon, MessageCircleIcon, BotIcon,
  BarChart3Icon, UsersIcon, SettingsIcon, LogOutIcon, FileTextIcon
} from '@/components/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DashboardSidebar = ({ role }) => {
  const { logout } = useAuth();
  const router = useRouter();
  
  const getNavItems = () => {
    const baseNav = [
      { name: 'Dashboard', icon: <HomeIcon className="w-5 h-5" />, href: '/dashboard' },
      { name: 'Courses', icon: <BookOpenIcon className="w-5 h-5" />, href: '/courses' },
    ];

    switch (role) {
      case 'student':
        return [
          ...baseNav,
          { name: 'Chat', icon: <MessageCircleIcon className="w-5 h-5" />, href: '/chat' },
          { name: 'AI Tutor', icon: <BotIcon className="w-5 h-5" />, href: '/ai-tutor' },
          { name: 'My Progress', icon: <BarChart3Icon className="w-5 h-5" />, href: '/dashboard/student' }, // Placeholder
        ];
      case 'teacher':
        return [
          ...baseNav,
          { name: 'My Classes', icon: <UsersIcon className="w-5 h-5" />, href: '/dashboard/teacher' }, // Placeholder
          { name: 'Chat', icon: <MessageCircleIcon className="w-5 h-5" />, href: '/chat' },
          { name: 'Uploads', icon: <FileTextIcon className="w-5 h-5" />, href: '/dashboard/teacher' }, // Placeholder
        ];
      case 'parent':
        return [
          { name: 'Dashboard', icon: <HomeIcon className="w-5 h-5" />, href: '/dashboard' },
          { name: 'Child\'s Progress', icon: <BarChart3Icon className="w-5 h-5" />, href: '/dashboard/parent' }, // Placeholder
        ];
      case 'admin':
        return [
          ...baseNav,
          { name: 'Manage School', icon: <SettingsIcon className="w-5 h-5" />, href: '/dashboard/admin' }, // Placeholder
          { name: 'All Users', icon: <UsersIcon className="w-5 h-5" />, href: '/dashboard/admin' }, // Placeholder
        ];
      default:
        return baseNav;
    }
  };

  const navItems = getNavItems();

  const NavItem = ({ item }) => {
    const isActive = router.pathname === item.href;
    return (
      <Link href={item.href} legacyBehavior>
        <a
          className={`
            flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors
            ${isActive 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          {item.icon}
          <span className="ml-3">{item.name}</span>
        </a>
      </Link>
    );
  };

  return (
    <div className="hidden md:flex flex-col h-full w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b">
        <LogoIcon className="w-8 h-8 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">Skill Sphere</span>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map(item => <NavItem key={item.name} item={item} />)}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOutIcon className="w-5 h-5" />
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

const DashboardHeader = ({ user }) => (
  <header className="flex-1 flex justify-between items-center p-4 h-16 bg-white border-b border-gray-200">
    <div>
      <h1 className="text-xl font-semibold text-gray-800">Welcome back, {user.name.split(' ')[0]}!</h1>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-600">{user.institution}</span>
      <img
        className="w-10 h-10 rounded-full"
        src={`https://placehold.co/100x100/e0e7ff/4338ca?text=${user.name.charAt(0)}`}
        alt="User Avatar"
      />
    </div>
  </header>
);


const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return null; // AuthContext will handle redirect
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <DashboardSidebar role={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;