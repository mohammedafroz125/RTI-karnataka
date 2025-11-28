import React, { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: 'Can I file RTI to Karnataka Secretariat online?',
    a: 'Yes, you can file RTI applications to Karnataka Secretariat (Vidhana Soudha) and all state departments online through FileMyRTI. We handle drafting, submission, and tracking for you without requiring you to visit government offices.',
  },
  {
    q: 'Can RTI get land details from Bhoomi portal?',
    a: 'Yes, you can file RTI to get land records, RTC copies, mutation status, and revenue information from Karnataka Bhoomi portal and Revenue Department. We help you draft and file RTI applications for land-related queries.',
  },
  {
    q: 'What if I don\'t know the department?',
    a: 'No problem! Our expert team will identify the correct department and Public Information Officer (PIO) based on your query. Just tell us what information you need, and we\'ll handle the rest.',
  },
  {
    q: 'How long RTI reply takes in Karnataka?',
    a: 'As per RTI Act 2005, government departments in Karnataka must respond within 30 days. In case of information concerning the life or liberty of a person, the response must be provided within 48 hours. If the application is transferred to another authority, the response time is 35 days.',
  },
  {
    q: 'Can I file RTI without visiting government offices?',
    a: 'Yes, with FileMyRTI, you can file RTI applications completely online without visiting government offices. We handle all the paperwork, drafting, submission, and tracking for you. You\'ll receive all updates and documents via email.',
  },
  {
    q: 'What if my RTI is rejected in Karnataka?',
    a: 'If your RTI application is rejected, we\'ll inform you immediately with the reason. You can then file a First Appeal with the First Appellate Authority (FAA) within 30 days. We can also assist you with filing the First Appeal and Second Appeal with Karnataka Information Commission (KIC).',
  },
];

export const KarnatakaFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="mb-2 text-[32px] md:text-[36px] font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto h-1 w-24 bg-yellow-500 mb-4"></div>
          <p className="text-lg text-gray-600">
            Everything you need to know about filing RTI in Karnataka
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

