import React from "react";

const primaryColor = "#003366"; // Dark Blue
const secondaryColor = "#FFFFFF"; // White
const accentColor = "#FFCC00"; // Gold
const backgroundColor = "#F4F4F4"; // Light Gray
const textColor = "#333333"; // Dark Gray

export default function AboutUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: backgroundColor, color: textColor }}>
  

      {/* Our Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold font-serif text-center" style={{ color: primaryColor, marginBottom: '4rem' }}>
            Our Services
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-16 md:gap-0">
            {/* Service 1 */}
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:bg-gray-200 p-6 rounded-lg">
              <h3 className="text-3xl font-semibold" style={{ color: primaryColor, marginBottom: '1rem' }}>
                Skill Development
              </h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Enhance your technical and soft skills through our comprehensive training programs.
              </p>
            </div>
            {/* Service 2 */}
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:bg-gray-200 p-6 rounded-lg">
              <h3 className="text-3xl font-semibold" style={{ color: primaryColor, marginBottom: '1rem' }}>
                Career Counseling
              </h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Receive personalized guidance to identify your strengths and explore the best career paths.
              </p>
            </div>
            {/* Service 3 */}
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:bg-gray-200 p-6 rounded-lg">
              <h3 className="text-3xl font-semibold" style={{ color: primaryColor, marginBottom: '1rem' }}>
                Placement Assistance
              </h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                We connect you with top companies and provide support throughout the recruitment process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center" style={{ color: primaryColor, marginBottom: '4rem' }}>
            Our Achievements
          </h2>
          <div className="flex justify-center items-center gap-12">
            {/* Achievement 1 */}
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:bg-gray-200 p-6 rounded-lg">
              <h3 className="text-6xl font-semibold" style={{ color: primaryColor }}>95%</h3>
              <p className="text-xl text-gray-600 mt-2">Placement Rate</p>
            </div>
            {/* Achievement 2 */}
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:bg-gray-200 p-6 rounded-lg">
              <h3 className="text-6xl font-semibold" style={{ color: primaryColor }}>10+</h3>
              <p className="text-xl text-gray-600 mt-2">Years of Experience</p>
            </div>
            {/* Achievement 3 */}
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:bg-gray-200 p-6 rounded-lg">
              <h3 className="text-6xl font-semibold" style={{ color: primaryColor }}>500+</h3>
              <p className="text-xl text-gray-600 mt-2">Students Placed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}