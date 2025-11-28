/**
 * Karnataka Departments organized by sections
 * Used for RTI department listing page
 * Structure matches Delhi format for consistent rendering
 */

export interface KarnatakaDepartmentSection {
  category: string;
  items: string[];
}

export const karnatakaDepartments: KarnatakaDepartmentSection[] = [
  {
    category: 'RTI Karnataka Police & Security',
    items: [
      'RTI Karnataka Home Department',
      'RTI Karnataka Police Department',
      'RTI Karnataka Fire Services Department',
      'RTI Karnataka Prisons Department',
      'RTI Karnataka Law Department',
      'RTI Karnataka Disaster Management Department',
    ],
  },
  {
    category: 'RTI Karnataka Finance & Revenue',
    items: [
      'RTI Karnataka Finance Department',
      'RTI Karnataka Revenue Department',
      'RTI Karnataka Commercial Taxes Department',
      'RTI Karnataka Registration & Stamps Department',
      'RTI Karnataka Planning Department',
      'RTI Karnataka Treasuries Department',
    ],
  },
  {
    category: 'RTI Karnataka Transport & Infrastructure',
    items: [
      'RTI Karnataka Transport Department',
      'RTI Karnataka Public Works Department (PWD)',
      'RTI Karnataka Urban Development Department',
      'RTI Karnataka Municipal Administration Department',
      'RTI Karnataka Rural Development & Panchayat Raj Department',
      'RTI Karnataka Infrastructure Development Department',
    ],
  },
  {
    category: 'RTI Karnataka Education & Health',
    items: [
      'RTI Karnataka Department of Primary & Secondary Education',
      'RTI Karnataka Higher Education Department',
      'RTI Karnataka Technical Education Department',
      'RTI Karnataka Health & Family Welfare Department',
      'RTI Karnataka Medical Education Department',
    ],
  },
  {
    category: 'RTI Karnataka Agriculture & Rural Development',
    items: [
      'RTI Karnataka Agriculture Department',
      'RTI Karnataka Horticulture Department',
      'RTI Karnataka Animal Husbandry & Veterinary Services Department',
      'RTI Karnataka Co-operation Department',
      'RTI Karnataka Rural Development & Panchayat Raj Department',
    ],
  },
  {
    category: 'RTI Karnataka Social Welfare',
    items: [
      'RTI Karnataka Social Welfare Department',
      'RTI Karnataka Scheduled Castes Development Department',
      'RTI Karnataka Scheduled Tribes Welfare Department',
      'RTI Karnataka Women & Child Development Department',
      'RTI Karnataka Backward Classes Welfare Department',
      'RTI Karnataka Minority Welfare Department',
    ],
  },
  {
    category: 'RTI Karnataka Commerce & Industry',
    items: [
      'RTI Karnataka Industries & Commerce Department',
      'RTI Karnataka Labour Department',
      'RTI Karnataka Food & Civil Supplies Department',
      'RTI Karnataka Handlooms & Textiles Department',
      'RTI Karnataka Mines & Geology Department',
    ],
  },
  {
    category: 'RTI Karnataka Environment & Resources',
    items: [
      'RTI Karnataka Environment Department',
      'RTI Karnataka Forest Department',
      'RTI Karnataka Water Resources Department',
      'RTI Karnataka Energy Department',
      'RTI Karnataka Irrigation & CAD Department',
    ],
  },
  {
    category: 'RTI Karnataka Information & Technology',
    items: [
      'RTI Karnataka Information Technology Department',
      'RTI Karnataka Information & Public Relations Department',
      'RTI Karnataka e-Governance Department',
    ],
  },
  {
    category: 'RTI Karnataka Culture & Tourism',
    items: [
      'RTI Karnataka Tourism Department',
      'RTI Karnataka Kannada & Culture Department',
      'RTI Karnataka Archaeology Department',
      'RTI Karnataka Religious & Charitable Endowments Department',
    ],
  },
];
