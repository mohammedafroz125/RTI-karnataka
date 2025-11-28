export interface StateHero {
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

export interface StateFAQ {
  q: string;
  a: string;
}

export interface StateData {
  name: string;
  slug: string;
  languages: string[];
  hero: StateHero;
  departments: string[];
  highlights: string[];
  faqs: StateFAQ[];
  description?: string;
  rtiPortalUrl?: string;
  process?: {
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  };
  commission?: string;
  fee?: string;
  designTheme?: 'default'; // Design theme for different layouts
}

export const states: Record<string, StateData> = {
  'karnataka': {
    name: "Karnataka",
    slug: "karnataka",
    languages: ["English", "Kannada"],
    designTheme: "default",
    hero: {
      title: "File RTI Online for Karnataka Government Departments",
      subtitle: "Get expert-drafted RTI applications for Revenue, Police, BBMP, Education, Transport and more – without visiting offices.",
      image: "/images/karnataka-banner.jpg",
      cta: "File RTI for Karnataka",
    },
    departments: [
      "Karnataka Secretariat (Vidhana Soudha)",
      "Karnataka Revenue Department",
      "Karnataka Police Department",
      "Karnataka Education Department",
      "Karnataka Health & Family Welfare Department",
      "Karnataka Transport Department (RTO)",
      "BBMP (Bruhat Bengaluru Mahanagara Palike)",
      "Karnataka Public Works Department (PWD)",
      "Karnataka Irrigation & CAD Department",
      "Karnataka Rural Development & Panchayat Raj Department",
      "Karnataka Municipal Administration & Urban Development Department",
      "Karnataka Registration & Stamps Department",
      "Karnataka Commercial Taxes Department",
      "Karnataka Labour Department",
      "Karnataka Social Welfare Department",
      "Karnataka Scheduled Castes Development Department",
      "Karnataka Scheduled Tribes Welfare Department",
      "Karnataka Women & Child Development Department",
      "Karnataka Backward Classes Welfare Department",
      "Karnataka Minority Welfare Department",
      "Karnataka Youth & Sports Department",
      "Karnataka Information & Public Relations Department",
      "Karnataka Finance Department",
      "Karnataka Planning Department",
      "Karnataka Home Department",
      "Karnataka Law Department",
      "Karnataka Forest Department",
      "Karnataka Environment Department",
      "Karnataka Mines & Geology Department",
      "Karnataka Industries & Commerce Department",
      "Karnataka Information Technology Department",
      "Karnataka Tourism & Culture Department",
      "Karnataka Housing Department",
      "Karnataka Water Resources Department",
      "Karnataka Energy Department",
      "Karnataka Agriculture & Cooperation Department",
      "Karnataka Food & Civil Supplies Department",
      "Karnataka Urban Development Department",
      "Karnataka Medical & Health Department",
      "Karnataka School Education Department",
      "Karnataka Higher Education Department",
      "Karnataka Technical Education Department",
      "Karnataka Animal Husbandry Department",
      "Karnataka Fisheries Department",
      "Karnataka Horticulture Department",
      "Karnataka Sericulture Department",
      "Karnataka Handlooms & Textiles Department",
      "Karnataka Endowments Department",
      "BDA (Bangalore Development Authority)",
      "Karnataka Housing Board",
    ],
    highlights: [
      "Covered: Karnataka Secretariat (Vidhana Soudha) & State Departments",
      "Expert-drafted RTI questions",
      "Online filing and tracking support",
      "Service across all 31 districts of Karnataka",
    ],
    faqs: [
      { q: "Can I file RTI to Karnataka Secretariat online?", a: "Yes, you can file RTI applications to Karnataka Secretariat (Vidhana Soudha) and all state departments online through FileMyRTI. We handle drafting, submission, and tracking for you." },
      { q: "How long does RTI reply take in Karnataka?", a: "As per RTI Act 2005, government departments in Karnataka must respond within 30 days. In case of information concerning life or liberty, the response must be provided within 48 hours." },
      { q: "Can I file RTI for land records and Bhoomi portal in Karnataka?", a: "Yes, you can file RTI applications for land records, RTC copies, mutation status, and related information from Karnataka Revenue Department, Bhoomi portal, and other relevant authorities." },
      { q: "Can I file RTI without visiting government offices?", a: "Yes, with FileMyRTI, you can file RTI applications completely online without visiting government offices. We handle all the paperwork and submission for you." },
    ],
    process: {
      steps: [
        {
          step: 1,
          title: "Share your RTI details for Karnataka department or office",
          description: "Tell us what information you need from any Karnataka Government department or office.",
        },
        {
          step: 2,
          title: "Our team drafts your RTI as per RTI Act, 2005 and Karnataka rules",
          description: "Our experts draft a professional RTI application compliant with RTI Act 2005 and Karnataka Information Commission (KIC) guidelines.",
        },
        {
          step: 3,
          title: "We file, track, and help you with replies or appeals",
          description: "We handle submission, fee payment, tracking, and assist with first/second appeals to Karnataka Information Commission if needed.",
        },
      ],
    },
    commission: "Karnataka Information Commission (KIC)",
    fee: "₹10",
  },
};

export const getStateBySlug = (slug: string): StateData | undefined => {
  return states[slug.toLowerCase()];
};

export const getAllStateSlugs = (): string[] => {
  return Object.keys(states);
};
