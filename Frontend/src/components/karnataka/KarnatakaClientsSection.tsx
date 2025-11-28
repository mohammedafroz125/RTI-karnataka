import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
}

export const KarnatakaClientsSection: React.FC = () => {
  const navigate = useNavigate();

  const services: Service[] = [
    {
      id: '1',
      name: 'Personal RTI',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      route: '/services/custom-rti',
    },
    {
      id: '2',
      name: 'Property RTI',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      route: '/services/custom-rti',
    },
    {
      id: '3',
      name: 'Government RTI',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      route: '/services/seamless-online-filing',
    },
    {
      id: '4',
      name: 'Legal RTI Queries',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      route: '/services/custom-rti',
    },
    {
      id: '5',
      name: 'Anonymous RTI Filing',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      route: '/services/anonymous',
    },
    {
      id: '6',
      name: 'First Appeal Filing',
      icon: (
        <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      route: '/services/1st-appeal',
    },
  ];

  return (
    <section className="bg-primary-50 pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-[32px] md:text-[36px] font-semibold text-gray-900">
            SUPPORTED RTI SERVICES
          </h2>
          <div className="mx-auto h-1 w-24 bg-yellow-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4 hover:shadow-xl hover:border-primary-400 transition-all duration-200 flex flex-col items-center text-center cursor-pointer group"
              onClick={() => navigate(service.route)}
            >
              {/* Icon */}
              <div className="mb-3 flex items-center justify-center">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

