import React from 'react';

interface UserGroup {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const userGroups: UserGroup[] = [
  {
    title: 'Citizens & Tenants',
    description: 'Get land records, property documents, tax details, and civic services information through RTI.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Employees & Job Seekers',
    description: 'Access appointment orders, service records, pension details, and recruitment information via RTI.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Advocates, NGOs & Activists',
    description: 'File RTI for transparency, accountability, and access to government data for your causes.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export const KarnatakaWhoUsesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container-responsive max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-gray-900 mb-4">
            Who Uses FileMyRTI Karnataka?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Serving diverse groups across Karnataka
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {userGroups.map((group, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-8 hover:shadow-lg transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-primary-600 mb-6">
                {group.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {group.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

