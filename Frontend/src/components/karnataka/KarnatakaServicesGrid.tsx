import React from 'react';
import { useNavigate } from 'react-router-dom';
import SOFIcon from '../../assets/images/SOFIcon.webp';
import AnonyIcon from '../../assets/images/AnonyIcon.webp';
import FirstIcon from '../../assets/images/FirstIcon.webp';
import BulkIcon from '../../assets/images/BulkIcon.webp';
import CustomIcon from '../../assets/images/CustomIcon.webp';
import Icon15min from '../../assets/images/15minIcon.webp';

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Revenue & Land Records (Bhoomi / RTC)',
    icon: SOFIcon,
    description: 'RTI for RTC, mutation status, land conversion, Tahsildar office records.',
    route: '/services/custom-rti',
  },
  {
    id: '2',
    name: 'BBMP & City Corporations',
    icon: AnonyIcon,
    description: 'RTI for property tax, Khata transfer, building plan approvals, trade licenses.',
    route: '/services/custom-rti',
  },
  {
    id: '3',
    name: 'Police Department (Karnataka State Police)',
    icon: FirstIcon,
    description: 'RTI for FIR copies, case status, charge sheets, traffic challans.',
    route: '/services/custom-rti',
  },
  {
    id: '4',
    name: 'Transport Department (RTO)',
    icon: BulkIcon,
    description: 'RTI for DL/LL status, RC details, permits, vehicle records.',
    route: '/services/custom-rti',
  },
  {
    id: '5',
    name: 'Education Department',
    icon: CustomIcon,
    description: 'RTI for SSLC/PUC records, teacher postings, school grants.',
    route: '/services/custom-rti',
  },
  {
    id: '6',
    name: 'Health & Family Welfare',
    icon: Icon15min,
    description: 'RTI for hospital staff, medicine supply, recruitment, health schemes.',
    route: '/services/custom-rti',
  },
  {
    id: '7',
    name: 'Housing & Development Authorities',
    icon: SOFIcon,
    description: 'RTI for BDA / Karnataka Housing Board sites, layout approvals, project status.',
    route: '/services/custom-rti',
  },
  {
    id: '8',
    name: 'Rural Development & Panchayat Raj',
    icon: AnonyIcon,
    description: 'RTI for gram panchayat works, NREGA, village development funds.',
    route: '/services/custom-rti',
  },
];

export const KarnatakaServicesGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container-responsive max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-gray-900 mb-4">
            Popular RTI Services in Karnataka
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert RTI drafting and filing for all Karnataka government departments
          </p>
        </div>

        {/* 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl hover:border-primary-400 transition-all duration-200 flex flex-col h-full group cursor-pointer"
              onClick={() => navigate(service.route)}
            >
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center">
                <img
                  src={service.icon}
                  loading="lazy"
                  decoding="async"
                  width="80"
                  height="80"
                  alt={service.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-[28px] font-semibold text-gray-900 mb-3 leading-tight">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-base md:text-lg">
                {service.description}
              </p>

              {/* CTA Link */}
              <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                <span>File RTI</span>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

