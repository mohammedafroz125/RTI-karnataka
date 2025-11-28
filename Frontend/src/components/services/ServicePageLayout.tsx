/**
 * New Service Page Layout Component
 * Fresh Karnataka UI design for service detail pages
 */

import React from 'react';
import { RTIModel } from '../../types/services';
import { useVideoLazyLoad } from '../../hooks/useVideoLazyLoad';
import { getVideoConfigForService } from '../../constants/services';

interface ServicePageLayoutProps {
  model: RTIModel;
  onCTAClick: () => void;
  serviceSlug?: string;
  extraInfo?: {
    whenToUse: string;
    whatToShare: string;
    stateCoverage: string;
  };
}

export const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  model,
  onCTAClick,
  serviceSlug,
  extraInfo
}) => {
  const { shouldLoadVideo, videoRef } = useVideoLazyLoad();
  const videoConfig = getVideoConfigForService(serviceSlug);

  // Default extra info if not provided
  const defaultExtraInfo = {
    whenToUse: 'Use this service when you need to file RTI applications to Karnataka Government departments with expert assistance and complete support.',
    whatToShare: 'You need to share your RTI query, contact details, and any relevant information about the department or authority you want to file with.',
    stateCoverage: 'This service is valid for Karnataka and all other Indian states. We support RTI filing across India.'
  };

  const info = extraInfo || defaultExtraInfo;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* A. Top Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-responsive max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold text-primary-600 uppercase tracking-wide mb-4">
              RTI SERVICES
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {model.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              {model.fullDescription}
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-primary-700">Expert Support</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-primary-700">Quick Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Middle Section - Two Columns */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-responsive max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - What You'll Get */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get</h2>
              <ul className="space-y-4">
                {model.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Pricing Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
                {model.price === 0 || model.price === null || model.price === undefined ? (
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary-600">Request Quote</span>
                  </div>
                ) : (
                  <div className="mb-6">
                    {model.originalPrice > model.price && (
                      <div className="mb-2">
                        <span className="text-lg text-gray-500 line-through">₹{model.originalPrice.toLocaleString()}.00</span>
                      </div>
                    )}
                    <div>
                      <span className="text-4xl font-bold text-primary-600">₹{model.price.toLocaleString()}.00</span>
                    </div>
                  </div>
                )}
                <button
                  onClick={onCTAClick}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95"
                >
                  {model.buttonText}
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Prices applicable for Karnataka and other Indian states.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. Video Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-responsive max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Watch: How This Service Works
          </h2>
          <div ref={videoRef} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
            <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
              {shouldLoadVideo ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoConfig.embedUrl}
                  title="RTI Service Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-white">Loading video...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* D. Extra Info / FAQs Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-responsive max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">When should I use this service?</h3>
              <p className="text-gray-700 leading-relaxed">{info.whenToUse}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What information do I need to share?</h3>
              <p className="text-gray-700 leading-relaxed">{info.whatToShare}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is this valid for Karnataka only or all states?</h3>
              <p className="text-gray-700 leading-relaxed">{info.stateCoverage}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

