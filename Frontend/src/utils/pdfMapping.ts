/**
 * Maps department names to their corresponding PDF file paths
 * Handles variations in PDF file naming conventions
 */

interface PDFMapping {
  [key: string]: string;
}

// Helper function to create PDF path from state, category and department
// Returns the relative path that can be used with import.meta.url or fetch
const createPDFPath = (state: string, category: string, fileName: string): string => {
  // For Vite, we'll use the path relative to src/assets
  return `${state}/${category}/${fileName}`;
};

// Helper function to detect state from department name
const detectState = (departmentName: string): string => {
  if (departmentName.toLowerCase().includes('karnataka')) {
    return 'karnataka';
  }
  return 'delhi'; // Default to delhi
};

// Mapping of department display names to PDF file names
const departmentToPDFMap: PDFMapping = {
  // RTI Delhi Police & Security
  'RTI Delhi Police': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For Delhi Police.pdf'),
  'RTI Delhi Fire Services Department': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For Delhi Fire Services Department.pdf'),
  'RTI Delhi Prisons Department': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For Delhi Prisoners Department.pdf'),
  'RTI Delhi Home Department': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For Delhi Home Department.pdf'),
  'RTI Delhi Judicial Department': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For Delhi Judicial Department.pdf'),
  'RTI Delhi Law, Justice & Legislative Affairs Department': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For Delhi Law, Justice & Legislative Affairs Department.pdf'),
  'RTI Delhi Disaster Management Department': createPDFPath('delhi', 'RTI Delhi Police & Security', 'RTI Template For  Delhi Disaster Management Department.pdf'),

  // RTI Delhi Municipal & Housing
  'RTI Delhi Municipal Corporation (MCD)': createPDFPath('delhi', 'RTI Delhi Municipal & Housing', 'RTI Template For  Delhi Municipal Corporation (MCD).pdf'),
  'RTI Delhi Urban Development Department': createPDFPath('delhi', 'RTI Delhi Municipal & Housing', 'RTI Template For Delhi Urban Development Department.pdf'),
  'RTI Delhi Housing & Urban Development Department': createPDFPath('delhi', 'RTI Delhi Municipal & Housing', 'RTI Template For  Delhi Housing & Urban Development Department.pdf'),
  'RTI Delhi Public Works Department (PWD)': createPDFPath('delhi', 'RTI Delhi Municipal & Housing', 'RTI Template For Delhi Public Works Department (PWD).pdf'),
  'RTI Delhi Rural Development Department': createPDFPath('delhi', 'RTI Delhi Municipal & Housing', 'RTI Template For Delhi Rural Development Department.pdf'),

  // RTI Delhi Utilities & Infrastructure
  'RTI Delhi Jal Board (DJB)': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Templare For Delhi Jal Board (DJB).pdf'),
  'RTI Delhi Transco Limited (DTL)': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Template For Delhi Transco Limited (DTL).pdf'),
  'RTI Delhi Power Department': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Delhi Power Department.pdf'),
  'RTI Delhi Water Supply Department': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Template For Delhi Water Supply Department.pdf'),
  'RTI Delhi Ground Water Department': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Template for Delhi Ground Water Department.pdf'),
  'RTI Delhi Irrigation & Flood Control Department': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Template for Delhi Irrigation & Flood Control Department.pdf'),
  'RTI Delhi Renewable Energy Department': createPDFPath('delhi', 'RTI Delhi Utilities & Infrastructure', 'RTI Template for Delhi Renewable Energy Department.pdf'),

  // RTI Delhi Government Services
  'RTI Delhi Revenue Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Revenue Department.pdf'),
  'RTI Delhi Education Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Education Department.pdf'),
  'RTI Delhi Health & Family Welfare Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Health & Family Welfare.pdf'),
  'RTI Delhi Transport Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Transport Department.pdf'),
  'RTI Delhi Finance Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Finance Department.pdf'),
  'RTI Delhi Registration & Stamps Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Registration & Stamps Department.pdf'),
  'RTI Delhi Planning Department': createPDFPath('delhi', 'RTI Delhi Government Services', 'RTI Template for Delhi Planning Department.pdf'),

  // RTI Delhi Social Welfare
  'RTI Delhi Social Welfare Department': createPDFPath('delhi', 'RTI Delhi Social Welfare', 'RTI Template for Delhi Social Welfare Department.pdf'),
  'RTI Delhi Scheduled Castes & Scheduled Tribes Welfare Department': createPDFPath('delhi', 'RTI Delhi Social Welfare', 'RTI Template for Delhi Scheduled Castes & Scheduled Tribes Welfare Department.pdf'),
  'RTI Delhi Women & Child Development Department': createPDFPath('delhi', 'RTI Delhi Social Welfare', 'RTI Template for Delhi Women & Child Development Department.pdf'),
  'RTI Delhi Backward Classes Welfare Department': createPDFPath('delhi', 'RTI Delhi Social Welfare', 'RTI Template for Delhi Backward Classes Welfare Department.pdf'),
  'RTI Delhi Minority Affairs Department': createPDFPath('delhi', 'RTI Delhi Social Welfare', 'RTI Template for Delhi Minority Affairs Department.pdf'),
  'RTI Delhi Youth & Sports Department': createPDFPath('delhi', 'RTI Delhi Social Welfare', 'RTI Template for Delhi Youth & Sports Department.pdf'),

  // RTI Delhi Commerce & Industry
  'RTI Delhi Labour Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Labour Department.pdf'),
  'RTI Delhi Industries Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Industries Department.pdf'),
  'RTI Delhi Value Added Tax Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Value Added Tax Department.pdf'),
  'RTI Delhi Food, Civil Supplies & Consumer Affairs Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Food, Civil Supplies & Consumer Affairs Department.pdf'),
  'RTI Delhi Consumer Affairs Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Consumer Affairs Department.pdf'),
  'RTI Delhi Cooperation Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Cooperation Department.pdf'),
  'RTI Delhi Agricultural Marketing Department': createPDFPath('delhi', 'RTI Delhi Commerce & Industry', 'RTI Template for Delhi Agricultural Marketing Department.pdf'),

  // RTI Delhi Environment & Resources
  'RTI Delhi Environment Department': createPDFPath('delhi', 'RTI Delhi Environment & Resources', 'RTI Template for Delhi Environment Department.pdf'),
  'RTI Delhi Forest & Wildlife Department': createPDFPath('delhi', 'RTI Delhi Environment & Resources', 'RTI Template for Delhi Forest & Wildlife Department.pdf'),
  'RTI Delhi Mines & Geology Department': createPDFPath('delhi', 'RTI Delhi Environment & Resources', 'RTI Template for Delhi Mines & Geology Department.pdf'),
  'RTI Delhi Science & Technology Department': createPDFPath('delhi', 'RTI Delhi Environment & Resources', 'RTI Template for Delhi Science & Technology Department.pdf'),

  // RTI Delhi Culture & Tourism
  'RTI Delhi Tourism Department': createPDFPath('delhi', 'RTI Delhi Culture & Tourism', 'RTI Template for Delhi Tourism Department.pdf'),
  'RTI Delhi Art, Culture & Languages Department': createPDFPath('delhi', 'RTI Delhi Culture & Tourism', 'RTI Template for Delhi Art, Culture & Languages Department.pdf'),
  'RTI Delhi Archaeology Department': createPDFPath('delhi', 'RTI Delhi Culture & Tourism', 'RTI Template for Delhi Archaeology Department.pdf'),
  'RTI Delhi Handloom & Handicrafts Department': createPDFPath('delhi', 'RTI Delhi Culture & Tourism', 'RTI Template for Delhi Handloom & Handicrafts Department.pdf'),

  // RTI Delhi Information & Technology
  'RTI Delhi Information & Publicity Department': createPDFPath('delhi', 'RTI Delhi Information & Technology', 'RTI Template for Delhi Information & Publicity Department.pdf'),
  'RTI Delhi Information Technology Department': createPDFPath('delhi', 'RTI Delhi Information & Technology', 'RTI Template for Delhi Information Technology Department.pdf'),
  'RTI Delhi Telecommunications Department': createPDFPath('delhi', 'RTI Delhi Information & Technology', 'RTI Template for Delhi Telecommunications Department.pdf'),
  'RTI Delhi Postal Services Department': createPDFPath('delhi', 'RTI Delhi Information & Technology', 'RTI Template for Delhi Postal Services Department.pdf'),

  // RTI Delhi Financial Services
  'RTI Delhi Banking & Financial Services Department': createPDFPath('delhi', 'RTI Delhi Financial Services', 'RTI Template for Delhi Banking & Financial Services Department.pdf'),
  'RTI Delhi Insurance Department': createPDFPath('delhi', 'RTI Delhi Financial Services', 'RTI Template for Delhi Insurance Department.pdf'),
  'RTI Delhi Pension Department': createPDFPath('delhi', 'RTI Delhi Financial Services', 'RTI Template for Delhi Pension Department.pdf'),

  // ========== KARNATAKA DEPARTMENTS ==========
  // RTI Karnataka Police & Security
  'RTI Karnataka Home Department': createPDFPath('karnataka', 'RTI Karnataka Police & Security', 'RTI Template for Karnataka Home Department.pdf'),
  'RTI Karnataka Police Department': createPDFPath('karnataka', 'RTI Karnataka Police & Security', 'RTI Template for Karnataka Police Department.pdf'),
  'RTI Karnataka Fire Services Department': createPDFPath('karnataka', 'RTI Karnataka Police & Security', 'RTI Template for Karnataka Fire Services Department.pdf'),
  'RTI Karnataka Prisons Department': createPDFPath('karnataka', 'RTI Karnataka Police & Security', 'RTI Template for Karnataka Prisons Department.pdf'),
  'RTI Karnataka Law Department': createPDFPath('karnataka', 'RTI Karnataka Police & Security', 'RTI Template for Karnataka Law Department.pdf'),
  'RTI Karnataka Disaster Management Department': createPDFPath('karnataka', 'RTI Karnataka Police & Security', 'RTI Template for Karnataka Disaster Management Department.pdf'),

  // RTI Karnataka Finance & Revenue
  'RTI Karnataka Finance Department': createPDFPath('karnataka', 'RTI Karnataka Finance & Revenue', 'RTI Template for Karnataka Finance Department.pdf'),
  'RTI Karnataka Revenue Department': createPDFPath('karnataka', 'RTI Karnataka Finance & Revenue', 'RTI Template for Karnataka Revenue Department.pdf'),
  'RTI Karnataka Commercial Taxes Department': createPDFPath('karnataka', 'RTI Karnataka Finance & Revenue', 'RTI Template for Karnataka Commercial Taxes Department.pdf'),
  'RTI Karnataka Registration & Stamps Department': createPDFPath('karnataka', 'RTI Karnataka Finance & Revenue', 'RTI Template for Karnataka Registration & Stamps Department.pdf'),
  'RTI Karnataka Planning Department': createPDFPath('karnataka', 'RTI Karnataka Finance & Revenue', 'RTI Template for Karnataka Planning Department.pdf'),
  'RTI Karnataka Treasuries Department': createPDFPath('karnataka', 'RTI Karnataka Finance & Revenue', 'RTI Template for Karnataka Treasuries Department.pdf'),

  // RTI Karnataka Transport & Infrastructure
  'RTI Karnataka Transport Department': createPDFPath('karnataka', 'RTI Karnataka Transport & Infrastructure', 'RTI Template for Karnataka Transport Department.pdf'),
  'RTI Karnataka Public Works Department (PWD)': createPDFPath('karnataka', 'RTI Karnataka Transport & Infrastructure', 'RTI Template for Karnataka Public Works Department (PWD).pdf'),
  'RTI Karnataka Urban Development Department': createPDFPath('karnataka', 'RTI Karnataka Transport & Infrastructure', 'RTI Template for Karnataka Urban Development Department.pdf'),
  'RTI Karnataka Rural Development & Panchayat Raj Department': createPDFPath('karnataka', 'RTI Karnataka Transport & Infrastructure', 'RTI Template for Karnataka Rural Development & Panchayat Raj Department.pdf'),
  'RTI Karnataka Municipal Administration Department': createPDFPath('karnataka', 'RTI Karnataka Transport & Infrastructure', 'RTI Template for Karnataka Municipal Administration Department.pdf'),
  'RTI Karnataka Infrastructure Development Department': createPDFPath('karnataka', 'RTI Karnataka Transport & Infrastructure', 'RTI Template for Karnataka Infrastructure Development Department.pdf'),

  // RTI Karnataka Education & Health
  'RTI Karnataka Department of Primary & Secondary Education': createPDFPath('karnataka', 'RTI Karnataka Education & Health', 'RTI Template for Karnataka Department of Primary & Secondary Education.pdf'),
  'RTI Karnataka Higher Education Department': createPDFPath('karnataka', 'RTI Karnataka Education & Health', 'RTI Template for Karnataka Higher Education Department.pdf'),
  'RTI Karnataka Technical Education Department': createPDFPath('karnataka', 'RTI Karnataka Education & Health', 'RTI Template for Karnataka Technical Education Department.pdf'),
  'RTI Karnataka Health & Family Welfare Department': createPDFPath('karnataka', 'RTI Karnataka Education & Health', 'RTI Template for Karnataka Health & Family Welfare Department.pdf'),
  'RTI Karnataka Medical Education Department': createPDFPath('karnataka', 'RTI Karnataka Education & Health', 'RTI Template for Karnataka Medical Education Department.pdf'),

  // RTI Karnataka Agriculture & Rural Development
  'RTI Karnataka Agriculture Department': createPDFPath('karnataka', 'RTI Karnataka Agriculture & Rural Development', 'RTI Template for Karnataka Agriculture Department.pdf'),
  'RTI Karnataka Horticulture Department': createPDFPath('karnataka', 'RTI Karnataka Agriculture & Rural Development', 'RTI Template for Karnataka Horticulture Department.pdf'),
  'RTI Karnataka Animal Husbandry & Veterinary Services Department': createPDFPath('karnataka', 'RTI Karnataka Agriculture & Rural Development', 'RTI Template for Karnataka Animal Husbandry & Veterinary Services Department.pdf'),
  'RTI Karnataka Co-operation Department': createPDFPath('karnataka', 'RTI Karnataka Agriculture & Rural Development', 'RTI Template for Karnataka Co-operation Department.pdf'),

  // RTI Karnataka Social Welfare
  'RTI Karnataka Social Welfare Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Social Welfare Department.pdf'),
  'RTI Karnataka Scheduled Castes Development Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Scheduled Castes Development Department.pdf'),
  'RTI Karnataka Scheduled Tribes Welfare Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Scheduled Tribes Welfare Department.pdf'),
  'RTI Karnataka Women & Child Development Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Women & Child Development Department.pdf'),
  'RTI Karnataka Backward Classes Welfare Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Backward Classes Welfare Department.pdf'),
  'RTI Karnataka Minority Welfare Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Minority Welfare Department.pdf'),
  'RTI Karnataka Youth & Sports Department': createPDFPath('karnataka', 'RTI Karnataka Social Welfare', 'RTI Template for Karnataka Youth & Sports Department.pdf'),

  // RTI Karnataka Commerce & Industry
  'RTI Karnataka Industries & Commerce Department': createPDFPath('karnataka', 'RTI Karnataka Commerce & Industry', 'RTI Template for Karnataka Industries & Commerce Department.pdf'),
  'RTI Karnataka Labour Department': createPDFPath('karnataka', 'RTI Karnataka Commerce & Industry', 'RTI Template for Karnataka Labour Department.pdf'),
  'RTI Karnataka Food & Civil Supplies Department': createPDFPath('karnataka', 'RTI Karnataka Commerce & Industry', 'RTI Template for Karnataka Food & Civil Supplies Department.pdf'),
  'RTI Karnataka Handlooms & Textiles Department': createPDFPath('karnataka', 'RTI Karnataka Commerce & Industry', 'RTI Template for Karnataka Handlooms & Textiles Department.pdf'),
  'RTI Karnataka Mines & Geology Department': createPDFPath('karnataka', 'RTI Karnataka Commerce & Industry', 'RTI Template for Karnataka Mines & Geology Department.pdf'),

  // RTI Karnataka Environment & Resources
  'RTI Karnataka Environment Department': createPDFPath('karnataka', 'RTI Karnataka Environment & Resources', 'RTI Template for Karnataka Environment Department.pdf'),
  'RTI Karnataka Forest Department': createPDFPath('karnataka', 'RTI Karnataka Environment & Resources', 'RTI Template for Karnataka Forest Department.pdf'),
  'RTI Karnataka Water Resources Department': createPDFPath('karnataka', 'RTI Karnataka Environment & Resources', 'RTI Template for Karnataka Water Resources Department.pdf'),
  'RTI Karnataka Energy Department': createPDFPath('karnataka', 'RTI Karnataka Environment & Resources', 'RTI Template for Karnataka Energy Department.pdf'),
  'RTI Karnataka Irrigation & CAD Department': createPDFPath('karnataka', 'RTI Karnataka Environment & Resources', 'RTI Template for Karnataka Irrigation & CAD Department.pdf'),

  // RTI Karnataka Information & Technology
  'RTI Karnataka Information Technology Department': createPDFPath('karnataka', 'RTI Karnataka Information & Technology', 'RTI Template for Karnataka Information Technology Department.pdf'),
  'RTI Karnataka Information & Public Relations Department': createPDFPath('karnataka', 'RTI Karnataka Information & Technology', 'RTI Template for Karnataka Information & Public Relations Department.pdf'),
  'RTI Karnataka e-Governance Department': createPDFPath('karnataka', 'RTI Karnataka Information & Technology', 'RTI Template for Karnataka e-Governance Department.pdf'),

  // RTI Karnataka Culture & Tourism
  'RTI Karnataka Tourism Department': createPDFPath('karnataka', 'RTI Karnataka Culture & Tourism', 'RTI Template for Karnataka Tourism Department.pdf'),
  'RTI Karnataka Kannada & Culture Department': createPDFPath('karnataka', 'RTI Karnataka Culture & Tourism', 'RTI Template for Karnataka Kannada & Culture Department.pdf'),
  'RTI Karnataka Archaeology Department': createPDFPath('karnataka', 'RTI Karnataka Culture & Tourism', 'RTI Template for Karnataka Archaeology Department.pdf'),
  'RTI Karnataka Religious & Charitable Endowments Department': createPDFPath('karnataka', 'RTI Karnataka Culture & Tourism', 'RTI Template for Karnataka Religious & Charitable Endowments Department.pdf'),
};

/**
 * Get the state from a department name
 * @param departmentName - The display name of the department
 * @returns The state name ('karnataka' or 'delhi')
 */
export const getStateFromDepartment = (departmentName: string): string => {
  return detectState(departmentName);
};

/**
 * Get the PDF path for a given department name
 * @param departmentName - The display name of the department
 * @returns The path to the PDF file, or null if not found
 */
export const getPDFPath = (departmentName: string): string | null => {
  return departmentToPDFMap[departmentName] || null;
};

/**
 * Check if a PDF exists for a given department
 * @param departmentName - The display name of the department
 * @returns True if PDF mapping exists, false otherwise
 */
export const hasPDF = (departmentName: string): boolean => {
  return departmentName in departmentToPDFMap;
};

