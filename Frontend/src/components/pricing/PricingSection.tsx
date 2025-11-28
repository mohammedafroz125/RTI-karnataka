import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConsultationModal } from '../services/ConsultationModal';
import { rtiModels, getRTIModelBySlug } from '../../data/rtiModels';
import { useConsultationForm } from '../../hooks/useConsultationForm';
import { usePayment } from '../../hooks/usePayment';

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModelSlug, setSelectedModelSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm
  } = useConsultationForm();

  const { paymentState, initiatePayment, resetPayment } = usePayment();

  const handleApplyClick = (modelSlug: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    navigate(`/services/${modelSlug}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedModelSlug(null);
    resetForm();
    resetPayment();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModelSlug || !rtiModel) return;

    await handleSubmit(async (data) => {
      try {
        await initiatePayment(
          rtiModel,
          {
            name: data.fullName,
            email: data.email,
            mobile: data.mobile
          },
          async (paymentId: string, orderId: string) => {
            // Payment successful - you can handle the submission here
            console.log('Payment successful:', { paymentId, orderId, model: selectedModelSlug });
            handleModalClose();
          },
          (errorMessage: string) => {
            alert(`Payment failed: ${errorMessage}`);
          },
          () => {
            // Payment cancelled - close modal and reset form
            handleModalClose();
          }
        );
      } catch (error) {
        console.error('Payment initialization failed:', error);
        alert('Failed to initialize payment. Please try again.');
      }
    });
  };

  // Get the selected RTI model
  const rtiModel = selectedModelSlug ? getRTIModelBySlug(selectedModelSlug) : null;

  // Get all 6 RTI models in order
  const allModels = [
    rtiModels['seamless-online-filing'],
    rtiModels['anonymous'],
    rtiModels['1st-appeal'],
    rtiModels['bulk'],
    rtiModels['custom-rti'],
    rtiModels['15-minute-consultation']
  ];

  // Determine which plan is "Most Popular" (Anonymous RTI or Seamless Online Filing)
  const mostPopularSlug = 'anonymous'; // Anonymous RTI Filing

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container-responsive max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* B. Plans as Individual Cards */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allModels.map((model) => {
              const modelSlug = Object.keys(rtiModels).find(key => rtiModels[key].id === model.id) || '';
              const hasDiscount = model.originalPrice > model.price && model.price > 0;
              const isMostPopular = modelSlug === mostPopularSlug;

              // Get key features for each plan (3-5 bullets)
              const planFeatures: Record<string, string[]> = {
                'seamless-online-filing': [
                  'Expert drafting service',
                  'Online submission to Karnataka departments',
                  'Timely dispatch via registered post',
                  'Application tracking & status updates',
                  'Proper formatting as per Karnataka RTI rules'
                ],
                'anonymous': [
                  'Complete anonymity guaranteed',
                  'Discreet filing service',
                  'Identity protection',
                  'Confidential process throughout',
                  'Secure submission to Karnataka authorities'
                ],
                '1st-appeal': [
                  'Expert appeal drafting',
                  'Quick review process',
                  'Online submission to First Appellate Authority',
                  'Appeal tracking & follow-up',
                  'Legal guidance for Karnataka appeal procedures'
                ],
                'bulk': [
                  'Multiple RTI management',
                  'Bulk submission support',
                  'Cost-effective pricing',
                  'Professional handling',
                  'Centralized tracking for all applications'
                ],
                'custom-rti': [
                  'Personalized RTI design',
                  'Custom application creation',
                  'Expert consultation included',
                  'Tailored solutions for unique needs',
                  'Individual attention to your requirements'
                ],
                '15-minute-consultation': [
                  'Expert legal consultation',
                  'Personalized RTI guidance',
                  'Quick 15-minute session',
                  'Professional advice',
                  'Application drafting help'
                ]
              };

              const features = planFeatures[modelSlug] || model.features.slice(0, 5);

              return (
                <div
                  key={model.id}
                  className={`bg-white rounded-xl shadow-md border-2 transition-all duration-200 hover:shadow-lg flex flex-col relative ${
                    isMostPopular
                      ? 'border-primary-500 shadow-lg'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {/* Most Popular Badge */}
                  {isMostPopular && (
                    <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Plan Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {model.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mb-6">
                      {model.price === 0 ? (
                        <div className="mb-2">
                          <span className="text-3xl font-bold text-primary-600">Request Quote</span>
                        </div>
                      ) : (
                        <>
                          {hasDiscount && (
                            <div className="mb-2">
                              <span className="text-sm text-gray-500 line-through">
                                ₹{model.originalPrice.toLocaleString()}.00
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-3xl font-bold text-primary-600">
                              ₹{model.price.toLocaleString()}.00
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6 flex-grow">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Apply Button */}
                    <button
                      onClick={(e) => handleApplyClick(modelSlug, e)}
                      className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                        isMostPopular
                          ? 'bg-primary-600 hover:bg-primary-700 text-white'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                      aria-label={`Apply for ${model.name}`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GST Note */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">GST 18% included</span> - All prices are inclusive of all taxes
              </p>
            </div>
          </div>
        </div>

        {/* C. What's Included in Every Plan Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            What's Included in Every Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Dedicated Support</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our expert team is always available to assist you throughout your RTI filing process, ensuring a smooth experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Hassle-Free Submission</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We handle all the paperwork and submission process for you, making RTI filing as simple as possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Precise Filing</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We ensure your RTI application is filed accurately with the correct Karnataka authority, reducing the chances of rejection.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Drafting</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our legal experts draft your RTI application professionally, ensuring it meets all Karnataka RTI rules and maximizes your chances of success.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Processing</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We process and file your RTI application within 1-2 business days, ensuring timely submission to Karnataka authorities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Secure & Confidential</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your personal information and RTI queries are protected with industry-standard security measures and complete confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Plan CTA */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Need a Custom Plan?
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              If your RTI needs are unique, we're here to help. Call{' '}
              <a href="tel:+919911100589" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                91 99111 00589
              </a>
              {' '}or email{' '}
              <a href="mailto:admin@filemyrti.com" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                admin@filemyrti.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      {rtiModel && (
        <ConsultationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          model={rtiModel}
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          paymentStatus={paymentState.status}
          paymentError={paymentState.error}
          onFieldChange={updateField}
          onSubmit={handleFormSubmit}
        />
      )}
    </section>
  );
};

