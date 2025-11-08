/**
 * Home Page
 */
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import CoursesSection from '@/components/home/CoursesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
    </Layout>
  );
}