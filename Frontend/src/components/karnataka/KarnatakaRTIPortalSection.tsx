import React from 'react';

export const KarnatakaRTIPortalSection: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulse-whatsapp {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .float-animation-delay-1 {
          animation-delay: 0.6s;
        }
        .float-animation-delay-2 {
          animation-delay: 1.2s;
        }
        .whatsapp-pulse {
          animation: pulse-whatsapp 2.5s ease-in-out infinite;
        }
      `}</style>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-auto lg:flex-1 text-center lg:text-left">
              <h2 className="mb-4 text-[32px] md:text-[36px] font-semibold text-gray-900">
                WhatsApp RTI Help for Karnataka
              </h2>
              <div className="mb-6 h-1 w-24 bg-yellow-500 mx-auto lg:mx-0"></div>
              <p className="mb-6 text-lg text-gray-600">
                Get RTI support instantly on WhatsApp
              </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <svg className="h-6 w-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base md:text-lg text-gray-700">Get RTI help for any Karnataka Government department</span>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <svg className="h-6 w-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base md:text-lg text-gray-700">Share your documents and questions directly on WhatsApp</span>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <svg className="h-6 w-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base md:text-lg text-gray-700">Get clear RTI drafting guidance from our team</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/919911100589"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg 
                  className="whatsapp-pulse w-5 h-5 flex-shrink-0" 
                  fill="#25D366" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href="https://wa.me/919911100589"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                WhatsApp Help: +91-99111-00589
              </a>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="flex items-center justify-center h-full w-full lg:w-auto lg:flex-shrink-0 mt-8 lg:mt-0">
            <div className="relative flex items-center justify-center h-full">
              {/* Soft circular halo glow background - hidden on mobile */}
              <div 
                className="absolute inset-0 -z-10 rounded-full hidden lg:block"
                style={{
                  background: 'radial-gradient(circle, #E6F3FF 0%, rgba(230, 243, 255, 0.6) 40%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)',
                  width: '120%',
                  height: '120%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  filter: 'blur(20px)',
                }}
              />
              
              {/* Floating Chat Bubble 1 - Top Left */}
              <div className="absolute -top-6 -left-6 lg:-top-10 lg:-left-10 float-animation hidden sm:block z-20">
                <div className="bg-[#026CB6] rounded-2xl rounded-bl-none px-3 py-2.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-white font-medium">RTI Help</span>
                  </div>
                </div>
              </div>

              {/* Floating Chat Bubble 2 - Top Right */}
              <div className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 float-animation float-animation-delay-1 hidden sm:block z-20">
                <div className="bg-gray-200 rounded-2xl rounded-br-none px-3 py-2.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-700 font-medium">Info</span>
                  </div>
                </div>
              </div>

              {/* Floating Chat Bubble 3 - Bottom Right */}
              <div className="absolute -bottom-6 -right-2 lg:-bottom-10 lg:-right-6 float-animation float-animation-delay-2 hidden sm:block z-20">
                <div className="bg-[#026CB6] rounded-2xl rounded-br-none px-3 py-2.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs text-white font-medium">Typing...</span>
                  </div>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="w-full max-w-[300px] mx-auto lg:w-[280px] rounded-none lg:rounded-3xl border-0 lg:border-8 border-gray-900 bg-transparent shadow-none lg:shadow-2xl p-0 relative z-10 overflow-hidden aspect-[9/16] lg:h-[560px]">
                <div className="relative h-full w-full rounded-none lg:rounded-2xl overflow-hidden bg-gray-900">
                  <img 
                    src="/images/whatsapp_chat.png" 
                    alt="WhatsApp" 
                    className="absolute inset-0 h-full w-full object-cover rounded-none lg:rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

