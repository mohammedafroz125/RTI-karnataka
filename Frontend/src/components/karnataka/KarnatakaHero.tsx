import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface KarnatakaHeroProps {
  stateName: string;
}

export const KarnatakaHero: React.FC<KarnatakaHeroProps> = ({ stateName }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    termsAccepted: false,
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      const { consultationsAPI } = await import('../../services/api');
      await consultationsAPI.createPublic({
        full_name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address || null,
        pincode: formData.pincode || null,
        state_slug: 'karnataka',
        source: 'hero_form',
      });
      
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          address: '',
          pincode: '',
          termsAccepted: false,
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('idle');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-700 pt-16 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16">
      <div className="container-responsive max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 xl:gap-16 relative items-start lg:items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center text-white relative order-1 lg:order-1">
            <div className="max-w-lg">
              <h1 className="mb-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-[56px]">
                Your Trusted Partner for Karnataka RTI Services
              </h1>
              <p className="mb-4 text-lg text-white/90 md:text-xl">
                We simplify Right to Information applications and government filings,
                so that you focus less on paperwork and more on getting the information you need.
              </p>
            </div>
            
            <div className="space-y-1.5 mb-4 relative">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm md:text-base">Access All Karnataka Departments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm md:text-base">Quick RTI Application Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm md:text-base">Expert Legal Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm md:text-base">100% Secure & Transparent</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex items-start lg:items-center justify-center lg:justify-end order-2 lg:order-2">
            <div className="w-full max-w-sm bg-white p-4 shadow-2xl rounded-lg md:p-5">
              {/* Main Heading */}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Book Your Free Micro Consultation!
              </h2>

              {/* Separator Line */}
              <div className="w-full h-0.5 bg-gray-900 mb-2"></div>

              {/* Supporting Paragraph */}
              <p className="text-xs text-gray-700 mb-3 leading-tight">
                The FileMyRTI team is here to help you take the first step toward asserting your legal rights. 
                Get expert guidance on filing RTI applications for Karnataka government departments.
              </p>
              {submitStatus === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">Thank you! We'll call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name"
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="E-mail Id"
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    placeholder="Mobile"
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pin Code"
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="flex items-center justify-between">
                    <label htmlFor="whatsapp-updates" className="text-xs text-gray-700 leading-tight cursor-pointer">
                      Get updates through WhatsApp
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, termsAccepted: !prev.termsAccepted }))}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                        formData.termsAccepted ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={formData.termsAccepted}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.termsAccepted ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <input
                    type="hidden"
                    name="termsAccepted"
                    value={formData.termsAccepted ? 'true' : 'false'}
                  />
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-2 text-xs rounded-md transition-colors disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? 'PLEASE WAIT. . .' : 'GET STARTED NOW'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

