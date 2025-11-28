import React from 'react';

export const KarnatakaConsultationCTA: React.FC = () => {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Contact Bar */}
        <div className="bg-gray-100 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-gray-700">Call Us :</span>
          <a href="tel:919911100589" className="text-primary-600 hover:text-primary-700 font-semibold underline">
            91-99111-00589
          </a>
        </div>

        {/* Main Heading */}
        <h2 className="text-[32px] md:text-[36px] font-semibold text-gray-900 mb-4">
          Book Your Free Micro Consultation!
        </h2>

        {/* Separator Line */}
        <div className="w-full h-0.5 bg-gray-900 mb-6"></div>

        {/* Supporting Paragraph */}
        <p className="text-lg text-gray-700 max-w-3xl">
          The FileMyRTI team is here to help you take the first step toward asserting your legal rights. 
          Get expert guidance on filing RTI applications for Karnataka government departments and access 
          the information you need transparently.
        </p>
      </div>
    </section>
  );
};

