import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { LazyChatbot } from '../components/common/LazyChatbot';
import SOFIcon from '../assets/images/SOFIcon.webp';
import AnonyIcon from '../assets/images/AnonyIcon.webp';
import FirstIcon from '../assets/images/FirstIcon.webp';
import BulkIcon from '../assets/images/BulkIcon.webp';
import CustomIcon from '../assets/images/CustomIcon.webp';
import Icon15min from '../assets/images/15minIcon.webp';

interface Service {
  id: string;
  name: string;
  icon: string;
  iconText: string;
  description: string;
  route: string;
  buttonText: string;
}

export const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      name: 'Seamless Online Filing',
      icon: SOFIcon,
      iconText: 'Seamless Online Filing',
      description: 'File RTI applications to Karnataka Government departments online easily with expert drafting, submission, and timely dispatch.',
      route: '/services/seamless-online-filing',
      buttonText: 'File Now'
    },
    {
      id: '2',
      name: 'Anonymous RTI Filing',
      icon: AnonyIcon,
      iconText: 'ANONYMOUS RTI Filing',
      description: 'Protect your identity with our discreet service for filing RTI applications to Karnataka departments on your behalf.',
      route: '/services/anonymous',
      buttonText: 'Start Anonymously'
    },
    {
      id: '3',
      name: 'Online First Appeal Filing',
      icon: FirstIcon,
      iconText: 'First Appeal',
      description: 'File your First Appeal online with expert drafting, review, and quick submission for Karnataka RTI cases.',
      route: '/services/1st-appeal',
      buttonText: 'Appeal Now'
    },
    {
      id: '4',
      name: 'Efficient Bulk RTI Filing',
      icon: BulkIcon,
      iconText: 'Efficient Bulk RTI Filing',
      description: 'Manage and submit multiple RTI applications efficiently to Karnataka departments with our professional bulk service.',
      route: '/services/bulk',
      buttonText: 'Request Quote'
    },
    {
      id: '5',
      name: 'Custom RTI',
      icon: CustomIcon,
      iconText: 'Custom RTI',
      description: 'Can\'t find the right RTI? Create a personalized application designed for your exact information need from Karnataka departments.',
      route: '/services/custom-rti',
      buttonText: 'Custom RTI'
    },
    {
      id: '6',
      name: '15 min RTI Consultation',
      icon: Icon15min,
      iconText: '15-MIN TALK TO EXPERT',
      description: 'Get personalized advice from legal experts to navigate complex RTI applications effectively for Karnataka departments.',
      route: '/services/15-minute-consultation',
      buttonText: 'Pay Now'
    },
  ];

  const pageTitle = "Our Services - FileMyRTI | RTI Filing Services for Karnataka";
  const pageDescription = "Explore our comprehensive RTI filing services for Karnataka including seamless online filing, anonymous RTI, first appeal, bulk filing, custom RTI, and expert consultations. Expert drafting and filing for all Karnataka Government departments.";
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : "https://filemyrti.com/services";
  const ogImage = "https://filemyrti.com/src/assets/icons/logo.webp";

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FileMyRTI Services",
    "description": pageDescription,
    "url": "https://filemyrti.com/services",
    "provider": {
      "@type": "Organization",
      "name": "FileMyRTI",
      "url": "https://filemyrti.com"
    },
    "serviceType": "RTI Filing Services"
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://filemyrti.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>

      <Navbar />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 md:py-16 lg:py-20">
            <div className="container-responsive max-w-7xl mx-auto px-4 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Our Services
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto">
                Choose from our comprehensive range of RTI filing services designed to meet your specific needs for Karnataka Government departments.
              </p>
            </div>
          </section>

          {/* Services Grid Section */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container-responsive max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {services.map((service) => {
                  // Service-specific bullet points (matching original 6 services)
                  const serviceBullets: Record<string, string[]> = {
                    '1': [
                      'Expert drafting service for Karnataka RTI applications',
                      'Online submission to Karnataka Government departments',
                      'Timely dispatch via registered or speed post',
                      'Application tracking and status updates',
                      'Proper formatting as per Karnataka RTI rules',
                      'Authority verification for correct PIO',
                      'Support for all Karnataka Secretariat departments'
                    ],
                    '2': [
                      'Complete anonymity for your RTI filing',
                      'Discreet filing service for Karnataka departments',
                      'Identity protection guaranteed',
                      'Professional handling of sensitive queries',
                      'Confidential process throughout',
                      'Secure submission to Karnataka authorities',
                      'Privacy guaranteed for all applications'
                    ],
                    '3': [
                      'Expert appeal drafting for Karnataka RTI cases',
                      'Quick review process of original RTI',
                      'Online submission to First Appellate Authority',
                      'Appeal tracking and follow-up',
                      'Documentation review and preparation',
                      'Legal guidance for Karnataka appeal procedures',
                      'Timely filing within 30-day deadline'
                    ],
                    '4': [
                      'Manage multiple RTI applications efficiently',
                      'Professional bulk service for Karnataka departments',
                      'Streamlined process for organizations',
                      'Special pricing for bulk filings',
                      'Coordinated submission and tracking',
                      'Dedicated support for bulk RTI needs',
                      'Custom solutions for large-scale RTI requirements'
                    ],
                    '5': [
                      'Personalized RTI application design',
                      'Custom solutions for unique information needs',
                      'Expert consultation for complex queries',
                      'Tailored drafting for Karnataka departments',
                      'Flexible service for specific requirements',
                      'Support for specialized RTI requests',
                      'Individual attention to your information needs'
                    ],
                    '6': [
                      '15-minute phone consultation with RTI expert',
                      'Personalized advice for Karnataka RTI cases',
                      'Guidance on framing effective RTI queries',
                      'Expert insights on Karnataka RTI rules',
                      'Help navigating complex RTI applications',
                      'Quick answers to your RTI questions',
                      'Professional consultation at affordable price'
                    ]
                  };

                  const bullets = serviceBullets[service.id] || [];

                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-primary-400 transition-all duration-200 flex flex-col h-full group"
                    >
                      {/* Icon Section */}
                      <div className="mb-4 flex flex-col items-center -mx-6 -mt-6">
                        <img
                          src={service.icon}
                          loading="lazy"
                          decoding="async"
                          width="200"
                          height="200"
                          alt={service.name}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center leading-tight">
                        {service.name}
                      </h3>

                      {/* Bullet Points */}
                      <ul className="mb-6 flex-grow space-y-2">
                        {bullets.map((bullet, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        to={service.route}
                        className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md active:scale-95 bg-primary-600 hover:bg-primary-700"
                      >
                        {service.buttonText}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Choose Our Services Section */}
          <section className="py-12 md:py-16 lg:py-20 bg-white">
            <div className="container-responsive max-w-7xl mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
                Why Choose Our Services?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Drafting</h3>
                  <p className="text-gray-600">Professional RTI applications drafted by legal experts</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Processing</h3>
                  <p className="text-gray-600">Fast and efficient filing with timely submissions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Confidential</h3>
                  <p className="text-gray-600">Your information is protected with highest security standards</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <LazyChatbot />
      </div>
    </>
  );
};

