import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Image from 'next/image';
import Link from 'next/link';

const CourseCard = ({ course }) => (
  <Card className="flex flex-col">
    <Image 
      src={course.imageUrl} 
      alt={course.title} 
      width={600} 
      height={400} 
      className="w-full h-48 object-cover" 
    />
    <div className="p-4 flex flex-col flex-grow">
      <span className="text-sm font-semibold text-indigo-600">{course.category}</span>
      <h3 className="mt-1 text-lg font-bold text-gray-800">{course.title}</h3>
      <p className="mt-2 text-gray-600 text-sm flex-grow">{course.description}</p>
      <Link href={`/courses/${course.id}`} passHref legacyBehavior>
        {/* Note: This links to a dynamic page we haven't created,
            but it's good for showing how to structure.
            For now, it will 404. Change href to "/courses" to just go to the list.
        */}
        <Button as="a" variant="primary" className="w-full mt-4">View Course</Button>
      </Link>
    </div>
  </Card>
);

export default CourseCard;