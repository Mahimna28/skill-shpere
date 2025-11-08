import React from 'react';
import CourseCard from '@/components/CourseCard';
import { MOCK_COURSES } from '@/lib/constants';

const CoursesSection = () => (
  <section id="courses" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Popular Courses
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Start learning from our curated list of free and premium courses.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_COURSES.slice(0, 4).map((course) => ( // Show only 4 for home page
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  </section>
);

export default CoursesSection;