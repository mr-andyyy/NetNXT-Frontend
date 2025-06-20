'use client';

import { useState, useEffect } from 'react';
import { CASE_STUDY_API } from '../../constants/url';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Building, ArrowRight, Award } from 'lucide-react';
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

interface CaseStudy {
  _id: string;
  title: string;
  content: string;
  clientName: string;
  industry: string;
  imageUrl?: string;
  published: boolean;
  slug: string;
  createdAt: string;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    filterAndSortCaseStudies();
  }, [caseStudies, searchTerm, sortBy, industryFilter]);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch(CASE_STUDY_API.GET);
      const data = await response.json();
      setCaseStudies(data.filter((caseStudy: CaseStudy) => caseStudy.published));
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCaseStudies = () => {
    let filtered = caseStudies.filter(caseStudy =>
      caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by industry
    if (industryFilter !== 'all') {
      filtered = filtered.filter(caseStudy => 
        caseStudy.industry.toLowerCase() === industryFilter.toLowerCase()
      );
    }

    // Sort case studies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'industry':
          return a.industry.localeCompare(b.industry);
        default:
          return 0;
      }
    });

    setFilteredCaseStudies(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  const getUniqueIndustries = () => {
    const industries = caseStudies.map(cs => cs.industry);
    return [...new Set(industries)].sort();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onHomeClick={() => window.location.href = '/know-more'}
        contactLink="https://forms.gle/F2ZbFB9YA2wNrLqV8"
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green to-green/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Case Studies
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Real success stories from our clients across various industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
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
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="financial services">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="large enterprises">Large Enterprises</SelectItem>
                  <SelectItem value="ecommerce">Ecommerce</SelectItem>
                  {getUniqueIndustries().map(industry => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Sort by:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCaseStudies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                {searchTerm ? 'No case studies found matching your search' : 'No case studies available'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new case studies'}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.article
                  key={caseStudy._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={caseStudy.imageUrl || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Award className="w-8 h-8 text-white opacity-80" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {caseStudy.industry}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(caseStudy.createdAt)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green transition-colors duration-300">
                      {caseStudy.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-green mb-3">
                      Client: {caseStudy.clientName}
                    </p>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {truncateContent(caseStudy.content)}
                    </p>
                    
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-green hover:text-green/80 font-semibold group/btn"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}