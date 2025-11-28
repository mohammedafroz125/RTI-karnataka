import React from 'react';

export const KarnatakaFeaturedSection: React.FC = () => {
  const mediaFeatures = [
    { name: 'The Times of India', logo: 'TOI' },
    { name: 'Deccan Herald', logo: 'DH' },
    { name: 'The Hindu', logo: 'TH' },
    { name: 'Bangalore Mirror', logo: 'BM' },
    { name: 'Karnataka Today', logo: 'KT' },
    { name: 'Citizen Matters', logo: 'CM' },
  ];

  return (
    <section className="bg-primary-50 py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-[32px] md:text-[36px] font-semibold text-gray-900">
            FEATURED & PRAISED IN
          </h2>
          <div className="mx-auto h-1 w-24 bg-yellow-500"></div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {mediaFeatures.map((media, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <div className="mb-2 text-4xl font-semibold text-gray-900">{media.logo}</div>
              <div className="text-sm text-gray-600">{media.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

