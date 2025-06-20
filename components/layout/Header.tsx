'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onAboutClick?: () => void;
  onResourcesClick?: () => void;
  contactLink?: string;
}

const Header: React.FC<HeaderProps> = ({
  onHomeClick,
  onServicesClick,
  onAboutClick,
  onResourcesClick,
  contactLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const resourceItems = [
    { name: "Blog", href: "/blog", description: "Latest insights and updates" },
    { name: "Webinars", href: "/webinars", description: "Expert-led sessions" },
    { name: "Case Studies", href: "/case-studies", description: "Success stories" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <button className="flex items-center" onClick={onHomeClick}>
          <Image
            src={
              isScrolled
                ? "/Logos/logo.png"
                : "/Logos/white-logo.png"
            }
            alt="NetNXT Logo"
            width={70}
            height={30}
            className="transition-all duration-300"
            priority
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <button
            onClick={onHomeClick}
            className={cn(
              "transition-colors duration-300 font-medium bg-transparent",
              isScrolled
                ? "text-black hover:text-green"
                : "text-white hover:text-gray-200"
            )}
          >
            Home
          </button>
          <button
            onClick={onServicesClick}
            className={cn(
              "transition-colors duration-300 font-medium bg-transparent",
              isScrolled
                ? "text-black hover:text-green"
                : "text-white hover:text-gray-200"
            )}
          >
            Services
          </button>
          <button
            onClick={onAboutClick}
            className={cn(
              "transition-colors duration-300 font-medium bg-transparent",
              isScrolled
                ? "text-black hover:text-green"
                : "text-white hover:text-gray-200"
            )}
          >
            About Us
          </button>
          
          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowResourcesDropdown(true)}
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            <button
              className={cn(
                "transition-colors duration-300 font-medium bg-transparent flex items-center gap-1",
                isScrolled
                  ? "text-black hover:text-green"
                  : "text-white hover:text-gray-200"
              )}
            >
              Resources
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  showResourcesDropdown ? "rotate-180" : ""
                )}
              />
            </button>

            <AnimatePresence>
              {showResourcesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                >
                  {resourceItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-6 py-4 hover:bg-green/5 transition-all duration-200 group border-b border-gray-50 last:border-b-0"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex flex-col"
                        >
                          <span className="font-semibold text-gray-900 group-hover:text-green transition-colors duration-200">
                            {item.name}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {item.description}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "transition-colors duration-300 font-medium bg-transparent",
              isScrolled
                ? "text-black hover:text-green"
                : "text-white hover:text-gray-200"
            )}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={isScrolled ? "text-black" : "text-white"} size={24} />
          ) : (
            <Menu className={isScrolled ? "text-black" : "text-white"} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white px-4 py-4 absolute top-full left-0 w-full shadow-md"
        >
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => {
                onHomeClick?.();
                setIsOpen(false);
              }}
              className="text-black hover:text-green transition-colors duration-300 text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                onServicesClick?.();
                setIsOpen(false);
              }}
              className="text-black hover:text-green transition-colors duration-300 text-left"
            >
              Services
            </button>
            <button
              onClick={() => {
                onAboutClick?.();
                setIsOpen(false);
              }}
              className="text-black hover:text-green transition-colors duration-300 text-left"
            >
              About Us
            </button>
            
            {/* Mobile Resources */}
            <div className="space-y-2">
              <span className="text-black font-medium">Resources</span>
              <div className="pl-4 space-y-2">
                {resourceItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-green transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <a
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-green transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;