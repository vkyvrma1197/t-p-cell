import React from 'react';
import Announcements from '../component/core/Homepage/Announcements';
import Resources from '../component/core/Homepage/Resources';
import FeaturedCompanies from '../component/core/Homepage/FeaturedCompanies';
import Footer from '../component/common/Footer';
import HomePageImage from '../component/core/Homepage/HomePageImage';
import UpcomingEvents from '../component/core/Homepage/UpcomingEvents';
const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Home Page Banner */}
      <HomePageImage />

      {/* Main content: Announcements, Resources, and Featured Companies */}
      <main className="container mx-auto p-8 space-y-12 ">
        {/* Announcements */}
        <section className="space-y-6">
          <Announcements />
        </section>
        <section className="space-y-6">
          <UpcomingEvents />
        </section>

        {/* Resources */}
        <section className="space-y-6">
          <Resources />
        </section>

        {/* Featured Companies */}
        <section className="space-y-6">
          <FeaturedCompanies />
        </section>
        <section className="space-y-6">
          <Footer />
        </section>
      </main>

   
    </div>
  );
};

export default Home;
