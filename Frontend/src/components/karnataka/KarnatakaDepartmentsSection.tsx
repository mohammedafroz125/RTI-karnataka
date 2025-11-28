import React from 'react';
import { RTIByDepartment } from '../common/RTIByDepartment';

export const KarnatakaDepartmentsSection: React.FC = () => {
  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-primary-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <RTIByDepartment state="karnataka" />
      </div>
    </section>
  );
};

