import React, { useState, memo, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/icons/logo.webp';
import { FloatingSocialBar } from './FloatingSocialBar';

const NavbarComponent: React.FC = () => {
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on a service page (has sidebar)
  const isServicePage = location.pathname.startsWith('/services/');

  // Check if we're on the homepage - show social media sidebar only on homepage
  const isHomepage = location.pathname === '/';

  const handleServicesMouseEnter = useCallback(() => setIsServicesOpen(true), []);
  const handleServicesMouseLeave = useCallback(() => setIsServicesOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
  const toggleMobileServices = useCallback(() => setIsMobileServicesOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    // Close on escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Floating Social Media Bar - Only shown on homepage */}
      {isHomepage && <FloatingSocialBar />}

      {/* Main Navbar - Fresh implementation with proper sticky positioning */}
      <nav
        className="fixed top-0 z-[100] w-full"
      >
        <div className={isServicePage ? "w-full pl-4 md:pl-6 pr-4 md:pr-6" : "container-responsive max-w-7xl mx-auto"}>
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="FileMyRTI - File RTI Online | Right to Information Act 2005 | RTI Filing Service"
                  className="h-8 w-auto"
                  loading="eager"
                  fetchPriority="high"
                  width="120"
                  height="32"
                  decoding="async"
                />
                <span className="text-primary-600 font-bold text-lg hidden sm:inline">FileMyRTI</span>
              </Link>
              <img
                src="/images/50krti filed.webp"
                alt="50k RTI Filed"
                className="hidden lg:inline h-12 w-auto ml-2"
                loading="lazy"
                width="200"
                height="48"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/about-us" className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm">
                About us
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm">
                  Services
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[min(224px,90vw)] max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link to="/services/anonymous" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 text-sm">
                      Anonymous RTI
                    </Link>
                    <Link to="/services/bulk" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 text-sm">
                      Bulk RTI Filing
                    </Link>
                    <Link to="/services/seamless-online-filing" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 text-sm">
                      Seamless Online Filing
                    </Link>
                    <Link to="/services/15-minute-consultation" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 text-sm">
                      15 Minute Consultation
                    </Link>
                    <Link to="/services/1st-appeal" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 text-sm">
                      1st Appeal
                    </Link>
                    <Link to="/services/custom-rti" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 text-sm">
                      Custom RTI
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm">
                Pricing
              </Link>
              <Link to="/blogs" className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm">
                Blogs
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm">
                Contact us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-primary-600 hover:text-primary-700 mt-2.5 md:mt-0"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-7 w-7 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-[99] transition-opacity duration-300"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu Panel - Slides in from right */}
          <div
            ref={mobileMenuRef}
            className={`lg:hidden fixed top-0 right-0 h-full w-[min(320px,85vw)] max-w-[85vw] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="FileMyRTI Logo"
                  className="h-8 w-auto"
                  loading="eager"
                  width="120"
                  height="32"
                />
                <span className="text-primary-600 font-bold text-lg">FileMyRTI</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-primary-600 transition-colors p-2"
                aria-label="Close mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="overflow-y-auto h-[calc(100vh-64px)] py-4">
              <div className="flex flex-col space-y-1">
                <Link
                  to="/about-us"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium px-4 py-3"
                >
                  About us
                </Link>

                {/* Services Dropdown in Mobile */}
                <div className="px-4">
                  <button
                    onClick={toggleMobileServices}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium py-3"
                    aria-expanded={isMobileServicesOpen}
                    aria-label="Toggle Services menu"
                  >
                    <span>Services</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="flex flex-col space-y-1 ml-4 mt-1">
                      <Link
                        to="/services/anonymous"
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors text-sm px-4 py-2 rounded"
                      >
                        Anonymous RTI
                      </Link>
                      <Link
                        to="/services/bulk"
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors text-sm px-4 py-2 rounded"
                      >
                        Bulk RTI Filing
                      </Link>
                      <Link
                        to="/services/seamless-online-filing"
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors text-sm px-4 py-2 rounded"
                      >
                        Seamless Online Filing
                      </Link>
                      <Link
                        to="/services/15-minute-consultation"
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors text-sm px-4 py-2 rounded"
                      >
                        15 Minute Consultation
                      </Link>
                      <Link
                        to="/services/1st-appeal"
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors text-sm px-4 py-2 rounded"
                      >
                        1st Appeal
                      </Link>
                      <Link
                        to="/services/custom-rti"
                        onClick={closeMobileMenu}
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors text-sm px-4 py-2 rounded"
                      >
                        Custom RTI
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  to="/pricing"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium px-4 py-3"
                >
                  Pricing
                </Link>
                <Link
                  to="/blogs"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium px-4 py-3"
                >
                  Blogs
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors font-medium px-4 py-3"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export const Navbar = memo(NavbarComponent);
