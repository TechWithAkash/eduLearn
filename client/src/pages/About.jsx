import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our LMS</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We are dedicated to providing quality education for students from Class 1 to 12
            through our innovative learning management system.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our Mission" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At LMS Portal, our mission is to make quality education accessible to all students regardless of 
                their geographical location. We believe that every student deserves access to high-quality learning 
                materials and expert educators.
              </p>
              <p className="text-gray-600 mb-4">
                We strive to create an engaging and interactive learning environment that fosters critical thinking,
                creativity, and a love for lifelong learning.
              </p>
              <p className="text-gray-600">
                Our platform is designed to support students in their educational journey, providing them with the 
                tools and resources they need to succeed academically and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 mb-6">
              LMS Portal was founded in 2020 by a team of educators and technology enthusiasts who recognized the 
              need for a comprehensive online learning platform tailored to the Indian education system.
            </p>
            <p className="text-gray-600 mb-6">
              What started as a small initiative to help students during the COVID-19 pandemic has grown into a 
              robust learning management system serving thousands of students across the country.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experienced educators, instructional designers, and developers work tirelessly to create 
              and curate high-quality learning materials that align with national curriculum standards.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and expand our offerings, guided by our commitment to making quality 
              education accessible to all students and empowering them to reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Rahul Mehta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Rahul Mehta</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <p className="mt-2 text-gray-600 max-w-xs mx-auto">
                Former high school principal with over 15 years of experience in education.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Priya Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Priya Singh</h3>
              <p className="text-gray-600">Chief Academic Officer</p>
              <p className="mt-2 text-gray-600 max-w-xs mx-auto">
                Educational psychologist specializing in curriculum development and learning outcomes.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Vikram Kapoor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Vikram Kapoor</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
              <p className="mt-2 text-gray-600 max-w-xs mx-auto">
                Software engineer with a passion for creating educational technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We are committed to excellence in everything we do, from the quality of our content 
                to the support we provide to our students and educators.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Accessibility</h3>
              <p className="text-gray-600">
                We believe that quality education should be accessible to all students, regardless 
                of their location, background, or circumstances.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek innovative ways to improve the learning experience and outcomes 
                for our students through technology and pedagogy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Student-Centered</h3>
              <p className="text-gray-600">
                We put students at the center of everything we do, designing our platform and content 
                to meet their diverse learning needs and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Become part of our growing community of students and educators dedicated to 
            excellence in learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Explore Courses
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;