import React from 'react';

interface WhyStat {
  icon: React.ReactNode;
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
}

export const KarnatakaWhySection: React.FC = () => {
  const whyChooseStats: WhyStat[] = [
    {
      icon: (
        <svg className="h-[45px] w-[45px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Karnataka's Premier",
      subtitleLine1: 'RTI Service Platform',
      subtitleLine2: 'Most trusted platform'
    },
    {
      icon: (
        <svg className="h-[45px] w-[45px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: '25,000+',
      subtitleLine1: 'Five Star',
      subtitleLine2: 'User Reviews'
    },
    {
      icon: (
        <svg className="h-[45px] w-[45px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: '50,000+',
      subtitleLine1: 'RTI Applications',
      subtitleLine2: 'Filed Across Karnataka'
    },
    {
      icon: (
        <svg className="h-[45px] w-[45px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '10+ Years',
      subtitleLine1: 'Experience in RTI',
      subtitleLine2: 'Decade of expertise'
    },
    {
      icon: (
        <svg className="h-[45px] w-[45px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: '5,000+',
      subtitleLine1: 'Legal Documents',
      subtitleLine2: 'Successfully processed'
    },
    {
      icon: (
        <svg className="h-[45px] w-[45px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: '100+',
      subtitleLine1: 'Expert Team',
      subtitleLine2: 'Ready to assist'
    }
  ];

  return (
    <section className="pt-3 pb-6 md:pt-4 md:pb-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-3 text-center">
          <h2 className="mb-1.5 text-[32px] md:text-[36px] font-semibold text-gray-900">
            WHY FILEMYRTI KARNATAKA
          </h2>
          <div className="mx-auto h-1 w-24 bg-yellow-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-[20px]">
          {whyChooseStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg text-center py-4 px-4 hover:shadow-xl hover:-translate-y-1 hover:border-primary-400 transition-all duration-200 ease-in-out"
            >
              <div className="mb-2 flex justify-center">
                <div 
                  className="flex h-[70px] w-[70px] items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(2,108,182,0.10)' }}
                >
                  <div className="text-[#026CB6]">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <h3 className="mb-1 text-[24px] font-semibold text-gray-900">{stat.title}</h3>
              <p className="text-[14px] text-gray-600 mb-0.5">{stat.subtitleLine1}</p>
              <p className="text-[12px] text-gray-600">{stat.subtitleLine2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
