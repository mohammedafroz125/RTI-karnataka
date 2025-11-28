import React, { lazy, Suspense, useDeferredValue } from 'react';
import { Helmet } from 'react-helmet-async';
import { useStateData } from '../hooks/useStateData';
import { LazyChatbot } from '../components/common/LazyChatbot';

// Lazy load Navbar and Footer for better initial load
const Navbar = lazy(() => import('../components/common/Navbar').then(m => ({ default: m.Navbar })));
const Footer = lazy(() => import('../components/common/Footer').then(m => ({ default: m.Footer })));

// Lazy load Karnataka-specific components
const KarnatakaHero = lazy(() => import('../components/karnataka/KarnatakaHero').then(m => ({ default: m.KarnatakaHero })));
const KarnatakaTrustStrip = lazy(() => import('../components/karnataka/KarnatakaTrustStrip').then(m => ({ default: m.KarnatakaTrustStrip })));
const KarnatakaAllServicesSection = lazy(() => import('../components/karnataka/KarnatakaAllServicesSection').then(m => ({ default: m.KarnatakaAllServicesSection })));
const KarnatakaTestimonialsSection = lazy(() => import('../components/karnataka/KarnatakaTestimonialsSection').then(m => ({ default: m.KarnatakaTestimonialsSection })));
const KarnatakaWhySection = lazy(() => import('../components/karnataka/KarnatakaWhySection').then(m => ({ default: m.KarnatakaWhySection })));
const KarnatakaClientsSection = lazy(() => import('../components/karnataka/KarnatakaClientsSection').then(m => ({ default: m.KarnatakaClientsSection })));
const KarnatakaRTIPortalSection = lazy(() => import('../components/karnataka/KarnatakaRTIPortalSection').then(m => ({ default: m.KarnatakaRTIPortalSection })));
const KarnatakaFeaturedSection = lazy(() => import('../components/karnataka/KarnatakaFeaturedSection').then(m => ({ default: m.KarnatakaFeaturedSection })));
const KarnatakaGuidesSection = lazy(() => import('../components/karnataka/KarnatakaGuidesSection').then(m => ({ default: m.KarnatakaGuidesSection })));
const KarnatakaDepartmentsSection = lazy(() => import('../components/karnataka/KarnatakaDepartmentsSection').then(m => ({ default: m.KarnatakaDepartmentsSection })));
const KarnatakaFinalCTASection = lazy(() => import('../components/karnataka/KarnatakaFinalCTASection').then(m => ({ default: m.KarnatakaFinalCTASection })));
const KarnatakaConsultationCTA = lazy(() => import('../components/karnataka/KarnatakaConsultationCTA').then(m => ({ default: m.KarnatakaConsultationCTA })));
const KarnatakaFAQ = lazy(() => import('../components/karnataka/KarnatakaFAQ').then(m => ({ default: m.KarnatakaFAQ })));

// ComponentLoader removed - using inline placeholders for better performance

export const Home: React.FC = () => {
  // Default to Karnataka for home page - always ensure we have data
  const { stateData, isLoading } = useStateData('karnataka');

  // Defer non-critical state updates to reduce TBT
  const deferredStateData = useDeferredValue(stateData);

  // Show minimal loading state only if no static data available
  if (isLoading && !stateData) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <LazyChatbot />
        </div>
      </>
    );
  }

  // Fallback if stateData is null (shouldn't happen with static data)
  // Use stateData for the check, deferredStateData might be null initially
  if (!stateData) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load state data</h1>
              <p className="text-gray-600">Please try again later.</p>
            </div>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <LazyChatbot />
        </div>
      </>
    );
  }

  // Use stateData for rendering (deferredStateData might be null initially)
  const dataToUse = deferredStateData || stateData;

  // SEO Metadata - use current data
  const pageTitle = `File RTI Online in Karnataka - FileMyRTI`;
  const pageDescription = `File RTI online in Karnataka with FileMyRTI. Get expert-drafted RTI applications and appeals for Karnataka Government departments, Secretariat and district offices from home.`;
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : `https://filemyrti.com/`;
  const ogImage = `https://filemyrti.com/src/assets/icons/logo.webp`;

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FileMyRTI",
    "url": "https://filemyrti.com",
    "logo": "https://filemyrti.com/src/assets/icons/logo.webp",
    "description": pageDescription,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [],
    "areaServed": {
      "@type": "State",
      "name": dataToUse.name
    },
    "serviceType": "RTI Filing Service",
    "offers": {
      "@type": "Offer",
      "description": "RTI Filing Services",
      "areaServed": dataToUse.name
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://filemyrti.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `RTI in ${dataToUse.name}`,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`RTI, ${dataToUse.name}, Right to Information, File RTI Online, ${dataToUse.name} RTI, RTI Act 2005, ${dataToUse.name} government information, RTI filing ${dataToUse.name}, RTI application ${dataToUse.name}`} />
        <meta name="author" content="FileMyRTI" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="FileMyRTI" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      <Suspense fallback={<div className="h-12 bg-white sticky top-0 z-[100]" />}>
        <Navbar />
      </Suspense>
      <div className="min-h-screen flex flex-col">
        <main id="main-content" className="flex-grow" role="main" aria-label="Main content">
          {/* Section A - Karnataka Hero with Form */}
          <Suspense fallback={
            <div className="bg-primary-600 pt-12 pb-12" data-loading>
              <div className="container-responsive max-w-7xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  File RTI Online for Karnataka Government Departments
                </h1>
              </div>
            </div>
          }>
            <KarnatakaHero stateName={dataToUse.name} />
          </Suspense>

          {/* Section C - Trust Strip */}
          <Suspense fallback={<div className="min-h-[120px] bg-primary-600" />}>
            <KarnatakaTrustStrip />
          </Suspense>

          {/* Section D - All Services Section */}
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <KarnatakaAllServicesSection />
          </Suspense>

          {/* Section E - Testimonials Section */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <KarnatakaTestimonialsSection />
          </Suspense>

          {/* Section F - Why Choose Us */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <KarnatakaWhySection />
          </Suspense>

          {/* Section G - Clients Section */}
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <KarnatakaClientsSection />
          </Suspense>

          {/* Section H - RTI Portal App Section */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <KarnatakaRTIPortalSection />
          </Suspense>

          {/* Section I - Blog/Guides Section */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <KarnatakaGuidesSection />
          </Suspense>

          {/* Section K - Final CTA Section */}
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <KarnatakaFinalCTASection />
          </Suspense>

          {/* Section L - Karnataka Departments */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <KarnatakaDepartmentsSection />
          </Suspense>

          {/* Section M - Karnataka FAQ */}
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <KarnatakaFAQ />
          </Suspense>
        </main>
        <footer role="contentinfo">
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </footer>
        <LazyChatbot />
      </div>
    </>
  );
};

