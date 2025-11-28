import React, { memo, useCallback, useState } from 'react';
import { PDFDownloadModal } from './PDFDownloadModal';
import { hasPDF } from '../../utils/pdfMapping';
import { karnatakaDepartments } from '../../data/karnatakaDepartments';

interface RTIByDepartmentProps {
  state?: 'karnataka';
}

const RTIByDepartmentComponent: React.FC<RTIByDepartmentProps> = ({ state = 'karnataka' }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use Karnataka departments
  const departments = karnatakaDepartments;
  const stateName = 'Karnataka';

  const handleDepartmentClick = useCallback((departmentName: string) => {
    // Check if PDF exists for this department
    if (hasPDF(departmentName)) {
      setSelectedDepartment(departmentName);
      setIsModalOpen(true);
    } else {
      // If no PDF, show alert
      console.warn(`No PDF found for department: ${departmentName}`);
      alert('PDF template not available for this department yet. Please contact support.');
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  }, []);

  // Render Karnataka with multi-column text layout
  return (
    <>
      <section className="bg-primary-50 pb-12 md:pb-16 lg:pb-20" aria-label={`RTI Services by ${stateName} Department`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-3">
            <h2 className="mb-2 text-[32px] md:text-[36px] font-semibold text-gray-900">
              RTI TEMPLATES FOR KARNATAKA DEPARTMENTS
            </h2>
            <div className="mx-auto h-1 w-24 bg-yellow-500"></div>
          </div>

          {/* Compact Multi-Column Layout */}
          <nav aria-label="RTI Department Navigation" className="mt-8">
            <div className="bg-white rounded-lg px-6 md:px-8 lg:px-10 py-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-4">
                {departments.map((column, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{column.category}</h3>
                    <ul className="space-y-0.5">
                      {column.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <button
                            onClick={() => handleDepartmentClick(item)}
                            className="text-xs leading-tight text-gray-700 hover:text-primary-600 cursor-pointer transition-colors duration-150 block text-left w-full"
                            aria-label={`Download RTI template for ${item}`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* PDF Download Modal */}
      {selectedDepartment && (
        <PDFDownloadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          departmentName={selectedDepartment}
        />
      )}
    </>
  );
};

export const RTIByDepartment = memo(RTIByDepartmentComponent);

