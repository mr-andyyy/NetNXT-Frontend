'use client';

import { useState, useEffect } from 'react';
import { CAREER_API } from '../../constants/url';
import {  } from '../../constants/url';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Users, ArrowRight, Briefcase, Heart, Zap, Target } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Career {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  department: string;
  active: boolean;
  createdAt: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    filterCareers();
  }, [careers, searchTerm, locationFilter, departmentFilter]);

  const fetchCareers = async () => {
    try {
      const response = await fetch(CAREER_API.GET);
      const data = await response.json();
      // dummy data
      const data1 = [
  {
    "_id": "unique-id-string",
    "title": "Frontend Developer",
    "description": "Work on modern web apps using React.",
    "requirements": [
      "2+ years experience with React",
      "Strong CSS and JS skills",
      "Familiarity with REST APIs"
    ],
    "location": "Bangalore, IN",
    "department": "Tech Support",
    "active": true,
    "createdAt": "2024-06-18T12:00:00.000Z"
  },
  {
    "_id": "another-unique-id",
    "title": "Sales Executive",
    "description": "Drive sales and manage client relationships.",
    "requirements": [
      "Excellent communication skills",
      "Experience in B2B sales"
    ],
    "location": "Gurgaon, IN",
    "department": "Sales",
    "active": true,
    "createdAt": "2024-06-10T09:00:00.000Z"
  }
  // ...more jobs
]
      console.log('Fetched careers:', data);
      setCareers(data.filter((career: Career) => career.active));
      //console.log('Active careers:', data.filter((career: Career) => career.active));
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCareers = () => {
    let filtered = careers.filter(career =>
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (locationFilter !== 'all') {
      filtered = filtered.filter(career => 
        career.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(career => 
        career.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }

    setFilteredCareers(filtered);
  };

  const getUniqueLocations = () => {
    const locations = careers.map(career => career.location);
    return [...new Set(locations)].sort();
  };

  const getUniqueDepartments = () => {
    const departments = careers.map(career => career.department);
    return [...new Set(departments)].sort();
  };

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Growth & Learning",
      description: "Continuous learning opportunities and career development"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Culture",
      description: "Collaborative environment with amazing colleagues"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and time off"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={() => window.location.href = '/know-more'}
        contactLink="https://forms.gle/F2ZbFB9YA2wNrLqV8"
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green to-green/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Build the future of cybersecurity with us. We're looking for passionate individuals to join our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green font-semibold px-8 py-3 border-0 hover:bg-gray-100"
                onClick={() => {
                  const el = document.getElementById('open-positions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Open Positions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white font-semibold px-8 py-3 bg-transparent hover:bg-white hover:text-green transition-colors"
                onClick={() => {
                  const el = document.getElementById('our-culture');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating an environment where our team can thrive and grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-green mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/* Our Culture Section */}
      <section id="our-culture" className="py-20 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green mb-10 text-center">
              Our Culture
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              At <span className="font-semibold text-green">NetNXT</span>, we're more than just an IT and Cyber Security firm — we're a collective of driven, curious, and open-minded individuals building something impactful from our bases in Gurgaon and Bangalore.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First row: 3 cards */}
              {[
                {
                  icon: <Users className="w-10 h-10 text-green mb-4" />, 
                  title: "No Micromanagement. Just Trust.",
                  description:
                    "We hire smart people and trust them to get the job done. There are no hovering managers here — only mentors and collaborators. We believe great work happens when people are given space to own their projects and take initiative.",
                },
                {
                  icon: <Zap className="w-10 h-10 text-green mb-4" />, 
                  title: "Young Minds. Bold Ideas.",
                  description:
                    "With an average age of 25, our team thrives on energy, experimentation, and enthusiasm. We don’t wait for permission — we learn by doing, fail fast, and improve even faster.",
                },
                {
                  icon: <Clock className="w-10 h-10 text-green mb-4" />, 
                  title: "Flexible Work, Firm Goals.",
                  description:
                    "We offer flexible work-from-home options, not because it's trendy, but because we understand that flexibility fuels productivity. What matters most to us? Deliverables, not clock-ins. Outcomes, not office optics.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flip-card group cursor-pointer h-full"
                >
                  <div className="flip-card-inner group-hover:[transform:rotateY(180deg)] transition-transform duration-500 h-full">
                    <div className="flip-card-front bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center min-h-[220px] h-full text-center">
                      {item.icon}
                      <span className="font-semibold text-xl text-gray-900">{item.title}</span>
                    </div>
                    <div className="flip-card-back bg-green text-white rounded-2xl shadow-md p-8 flex items-center justify-center min-h-[220px] h-full text-center [transform:rotateY(180deg)]">
                      <span className="text-base leading-relaxed">{item.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Second row: 2 cards centered */}
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
              {[
                {
                  icon: <Heart className="w-10 h-10 text-green mb-4" />, 
                  title: "Freedom to Be You.",
                  description:
                    "We don’t believe in forcing people into rigid models. Every individual brings something unique, and we do everything we can to harness that individuality, not suppress it. Your quirks, strengths, and working styles are welcome here.",
                },
                {
                  icon: <Target className="w-10 h-10 text-green mb-4" />, 
                  title: "Limitless Possibilities.",
                  description:
                    "We believe that the sky’s the limit for those who are curious, adaptable, and hungry to grow. If you’re someone who questions the status quo and thrives on continuous learning, you’ll find your tribe here.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flip-card group cursor-pointer h-full w-full md:w-96"
                >
                  <div className="flip-card-inner group-hover:[transform:rotateY(180deg)] transition-transform duration-500 h-full">
                    <div className="flip-card-front bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center min-h-[220px] h-full text-center">
                      {item.icon}
                      <span className="font-semibold text-xl text-gray-900">{item.title}</span>
                    </div>
                    <div className="flip-card-back bg-green text-white rounded-2xl shadow-md p-8 flex items-center justify-center min-h-[220px] h-full text-center [transform:rotateY(180deg)]">
                      <span className="text-base leading-relaxed">{item.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-100 border-b mt-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {/* Static department options */}
                  <SelectItem value="tech support">Tech Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  {/* Dynamic department options */}
                  {getUniqueDepartments().map(department => (
                    <SelectItem key={department} value={department.toLowerCase()}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {/* Static location options 
                  <SelectItem value="bangalore in">Bangalore, IN</SelectItem>
                  <SelectItem value="gurgaon in">Gurgaon, IN</SelectItem>
                  <SelectItem value="colorado us">Colorado, US</SelectItem>*/}
                  <SelectItem value="remote">Remote</SelectItem>
                  {/* Dynamic location options */}
                  {getUniqueLocations().map(location => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-positions" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions ({filteredCareers.length})
            </h2>
          </motion.div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/5"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredCareers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                {searchTerm ? 'No positions found matching your search' : 'No open positions at the moment'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new opportunities'}
              </p>
              <Button variant="outline">
                Get Notified of New Openings
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredCareers.map((career, index) => (
                <motion.div
                  key={career._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green transition-colors duration-300">
                        {career.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {career.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {career.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Full-time
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {career.description}
                      </p>
                      
                      {career.requirements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                          <ul className="text-gray-600 space-y-1">
                            {career.requirements.slice(0, 3).map((req, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green mt-1">•</span>
                                {req}
                              </li>
                            ))}
                            {career.requirements.length > 3 && (
                              <li className="text-gray-500 italic">
                                +{career.requirements.length - 3} more requirements
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="lg:ml-6">
                      <Button 
                        className="w-full lg:w-auto bg-green hover:bg-green/90 text-white font-semibold px-8 py-3 group/btn"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Send Your Resume
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
