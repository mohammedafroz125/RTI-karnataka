import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SOFIcon from '../../assets/images/SOFIcon.webp';
import AnonyIcon from '../../assets/images/AnonyIcon.webp';
import FirstIcon from '../../assets/images/FirstIcon.webp';
import BulkIcon from '../../assets/images/BulkIcon.webp';
import CustomIcon from '../../assets/images/CustomIcon.webp';
import Icon15min from '../../assets/images/15minIcon.webp';

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  buttonText: string;
  secondaryButtonText?: string;
}

export const KarnatakaAllServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>('1');

  const rtiServices: Service[] = [
    {
      id: '1',
      name: 'Seamless Online Filing',
      icon: SOFIcon,
      description: 'File RTI applications online easily with expert drafting, submission, and timely dispatch.',
      route: '/services/seamless-online-filing',
      buttonText: 'File Now',
    },
    {
      id: '2',
      name: 'Anonymous RTI Filing',
      icon: AnonyIcon,
      description: 'Protect your identity with our discreet service for filing RTI applications on your behalf.',
      route: '/services/anonymous',
      buttonText: 'Start Anonymously',
    },
    {
      id: '3',
      name: 'Online First Appeal Filing',
      icon: FirstIcon,
      description: 'File your First Appeal online with expert drafting, review, and quick submission.',
      route: '/services/1st-appeal',
      buttonText: 'Appeal Now',
    },
    {
      id: '4',
      name: 'Efficient Bulk RTI Filing',
      icon: BulkIcon,
      description: 'Manage and submit multiple RTI applications efficiently with our professional bulk service.',
      route: '/services/bulk',
      buttonText: 'Request Quote',
    },
    {
      id: '5',
      name: 'Custom RTI',
      icon: CustomIcon,
      description: 'Can\'t find the right RTI? Create a personalized application designed for your exact information need.',
      route: '/services/custom-rti',
      buttonText: 'Custom RTI',
    },
    {
      id: '6',
      name: '15 min RTI',
      icon: Icon15min,
      description: 'Get personalized advice from legal experts to navigate complex RTI applications effectively.',
      route: '/services/15-minute-consultation',
      buttonText: 'Pay Now',
    },
  ];

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-[32px] md:text-[36px] font-semibold text-gray-900">
            RTI SERVICES
          </h2>
          <div className="mx-auto h-1 w-24 bg-yellow-500"></div>
        </div>

        {/* Service Filter Buttons */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-2 md:gap-3">
          {rtiServices.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              className={`px-2 py-2 md:px-3 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm leading-tight break-words transition-all duration-200 ${
                selectedService === service.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        {selectedService ? (
          // Single selected service - Compact service plan layout
          (() => {
            const service = rtiServices.find(s => s.id === selectedService);
            if (!service) return null;
            
            // Service-specific details
            const serviceDetails: Record<string, { bullets: string[]; price: string }> = {
              '1': {
                bullets: ['Expert RTI drafting', 'Online submission support', 'Application tracking', 'Timely dispatch'],
                price: 'Flat fee ₹699'
              },
              '2': {
                bullets: ['Complete anonymity', 'Secure filing process', 'Identity protection', 'Professional handling'],
                price: 'Flat fee ₹699'
              },
              '3': {
                bullets: ['Expert appeal drafting', 'Legal review', 'Quick submission', 'Appeal tracking'],
                price: 'Flat fee ₹699'
              },
              '4': {
                bullets: ['Multiple RTI handling', 'Bulk processing', 'Volume discounts', 'Dedicated support'],
                price: 'Request Quote'
              },
              '5': {
                bullets: ['Custom RTI drafting', 'Personalized approach', 'Expert consultation', 'Tailored solutions'],
                price: 'Flat fee ₹699'
              },
              '6': {
                bullets: ['15 minutes expert call', 'RTI strategy suggestion', 'Basic drafting guidance', 'Quick consultation'],
                price: 'Flat fee ₹199'
              }
            };
            
            const details = serviceDetails[service.id] || {
              bullets: ['Expert assistance', 'Professional service', 'Quick processing', 'Reliable support'],
              price: 'Contact for pricing'
            };
            
            return (
              <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg p-6 md:p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col">
                      {/* Icon */}
                      <div className="mb-6 flex justify-start">
                        <img
                          src={service.icon}
                          loading="lazy"
                          decoding="async"
                          width="140"
                          height="140"
                          alt={service.name}
                          className="w-32 h-32 md:w-40 md:h-40 object-contain"
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl md:text-[28px] font-semibold text-gray-900 mb-3 leading-tight">
                        {service.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col">
                      {/* What you get heading */}
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        What you get
                      </h4>
                      
                      {/* Bullet points */}
                      <ul className="space-y-2 mb-6">
                        {details.bullets.map((bullet, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-700">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <p className="text-xl md:text-2xl font-semibold text-gray-900">{details.price}</p>
                      </div>
                      
                      {/* CTA Button */}
                      <button
                        onClick={() => navigate(service.route)}
                        className="w-full md:w-auto md:ml-auto px-6 py-3 bg-[#026CB6] hover:bg-[#025a9a] text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                      >
                        {service.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          // All services grid view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rtiServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl hover:border-primary-400 transition-all duration-200 flex flex-col h-full"
              >
                {/* Icon Section */}
                <div className="mb-6 flex flex-col items-center">
                  <img
                    src={service.icon}
                    loading="lazy"
                    decoding="async"
                    width="120"
                    height="120"
                    alt={service.name}
                    className="w-28 h-28 md:w-32 md:h-32 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-[28px] font-semibold text-gray-900 mb-3 text-center leading-tight">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-center text-base md:text-lg">
                  {service.description}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => navigate(service.route)}
                  className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md mt-auto"
                >
                  {service.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

