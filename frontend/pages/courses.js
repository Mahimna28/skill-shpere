/**
 * All Courses Page
 */
import React from 'react';
import Layout from '@/components/Layout';
import CourseCard from '@/components/CourseCard';
import { MOCK_COURSES } from '@/lib/constants';

export default function CourseListingPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </Layout>
  );
}