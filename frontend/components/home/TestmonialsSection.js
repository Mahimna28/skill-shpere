import React from 'react';
import Card from '@/components/ui/Card';

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Alice M.", role: "Student", quote: "The AI tutor is a lifesaver! It helped me understand complex calculus problems at 2 AM." },
    { name: "Mr. David L.", role: "Teacher", quote: "Managing my class, sharing resources, and tracking progress has never been easier. Skill Sphere is a game-changer." },
    { name: "Sarah K.", role: "Parent", quote: "I love being able to see my son's upcoming tasks and his performance. It makes me feel so much more involved." },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Community Says
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="mt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-indigo-600">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;