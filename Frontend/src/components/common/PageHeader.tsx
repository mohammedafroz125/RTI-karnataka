import React from 'react';

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ label, title, subtitle }) => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-responsive max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-primary-600 uppercase tracking-wide mb-4">
            {label}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

