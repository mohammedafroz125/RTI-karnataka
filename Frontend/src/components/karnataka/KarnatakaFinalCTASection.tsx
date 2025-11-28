import React from 'react';
import { useNavigate } from 'react-router-dom';

export const KarnatakaFinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="mb-4 text-[32px] md:text-[36px] font-semibold text-gray-900">
          Ready to Exercise Your Right to Information?
        </h2>
        <p className="mb-8 text-lg text-gray-600 max-w-3xl mx-auto">
          Join 50,000+ Karnataka citizens who trust us with their RTI applications. 
          Get started today and access government information transparently.
        </p>
        <button
          onClick={() => navigate('/services/custom-rti')}
          className="bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          FILE YOUR RTI APPLICATION NOW
        </button>
      </div>
    </section>
  );
};

