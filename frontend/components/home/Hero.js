import React from 'react';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => (
  <section id="home" className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 to-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
        Welcome to <span className="text-indigo-600">Skill Sphere</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Your AI-powered ecosystem for connected learning.
        Join students, teachers, and parents on one intelligent platform.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/auth/signup" passHref legacyBehavior>
          <Button as="a" variant="primary" className="px-8 py-3 text-lg">
            Get Started
          </Button>
        </Link>
        <Link href="/courses" passHref legacyBehavior>
          <Button as="a" variant="secondary" className="px-8 py-3 text-lg">
            View Courses
          </Button>
        </Link>
      </div>
      <div className="mt-16">
        <Image 
          src="https://placehold.co/1000x500/e0e7ff/4338ca?text=Skill+Sphere+Dashboard+Preview" 
          alt="Skill Sphere Dashboard" 
          width={1000}
          height={500}
          className="rounded-xl shadow-2xl mx-auto w-full max-w-4xl"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;