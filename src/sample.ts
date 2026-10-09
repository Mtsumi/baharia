export const centreName = "Bahari Maritime Academy";

export const adminLimit = 2;
export const lecturerLimit = 4;
export const studentLimit = 12;

export type Person = {
  id: string;
  name: string;
  email: string;
};

export type SectionId = "knqf5" | "knqf6" | "short";

export type Resource = {
  id: string;
  title: string;
  summary: string;
  moment: string;
  section: SectionId;
  kind: "unit" | "programme";
  hours?: number;
  body: string | null;
  pdfUrl?: string;
};

export type Programme = {
  id: SectionId;
  title: string;
  shortTitle: string;
  outcome: string;
  code: string;
  hours: number;
  pdfUrl?: string;
  source: string;
};

export const programmes: Programme[] = [
  {
    id: "knqf5",
    shortTitle: "Level 5",
    title: "Nautical Science · KNQF Level 5",
    outcome: "Able Seafarer Deck pathway (STCW Reg II/5).",
    code: "1041 454 A",
    hours: 1780,
    pdfUrl: "/curricula/nautical-science-knqf-level-5.pdf",
    source: "Bandari Maritime Academy competency-based curriculum, 2024.",
  },
  {
    id: "knqf6",
    shortTitle: "Level 6",
    title: "Nautical Science Technology · KNQF Level 6",
    outcome: "Officer in Charge of a Navigational Watch pathway (STCW Reg II/1).",
    code: "1041 554 A",
    hours: 2800,
    pdfUrl: "/curricula/nautical-science-knqf-level-6.pdf",
    source: "Bandari Maritime Academy competency-based curriculum, 2024.",
  },
  {
    id: "short",
    shortTitle: "Short courses",
    title: "Short courses & CPD",
    outcome: "Targeted upskilling beside the full KNQF programmes.",
    code: "CPD",
    hours: 0,
    source: "Sample short-course shelf for the demo.",
  },
];

export const sections = programmes.map((programme) => ({
  id: programme.id,
  title: programme.shortTitle === "Short courses" ? programme.shortTitle : programme.title,
}));

export type Db = {
  admins: Person[];
  lecturers: Person[];
  students: Person[];
};

export const STORAGE_VERSION = 4;

export const resources: Resource[] = [
  {
    id: "knqf5-overview",
    section: "knqf5",
    kind: "programme",
    title: "Programme overview",
    summary: "Able Seafarer Deck Rating · KNQF Level 5.",
    moment: "Full curriculum PDF for lecturers and students on this pathway.",
    hours: 1780,
    pdfUrl: "/curricula/nautical-science-knqf-level-5.pdf",
    body: "This programme builds the competencies for an Able Seafarer Deck Rating. It covers basic, common and core units, plus industrial attachment. Open the curriculum PDF for unit codes, hours, learning outcomes and assessment.",
  },
  { id: "l5-seamanship", section: "knqf5", kind: "unit", title: "Seamanship Practices", summary: "Core deck seamanship.", moment: "Hands-on deck work for ratings.", hours: 80, body: null },
  { id: "l5-watchkeeping", section: "knqf5", kind: "unit", title: "Watchkeeping Practices", summary: "Safe watchkeeping as a deck rating.", moment: "Keeping a safe watch under supervision.", hours: 80, body: null },
  { id: "l5-deck-machinery", section: "knqf5", kind: "unit", title: "Deck Machinery & Cargo Gear", summary: "Operation and maintenance of deck machinery and cargo handling gear.", moment: "Working the gear safely on deck.", hours: 70, body: null },
  { id: "l5-mooring", section: "knqf5", kind: "unit", title: "Berthing, Anchoring & Mooring", summary: "Mooring operations alongside and at anchor.", moment: "Lines, anchors and the berth.", hours: 70, body: null },
  { id: "l5-cargo", section: "knqf5", kind: "unit", title: "Cargo Handling & Stowage", summary: "Cargo work for ratings.", moment: "Loading and stowing as part of the deck team.", hours: 80, body: null },
  { id: "l5-ship-handling", section: "knqf5", kind: "unit", title: "Ship Handling & Manoeuvring", summary: "Assisting with ship handling.", moment: "What the rating does during manoeuvres.", hours: 70, body: null },
  { id: "l5-emergencies", section: "knqf5", kind: "unit", title: "Emergencies at Sea and in Port", summary: "Responding to emergencies.", moment: "When the alarm goes, on the berth or at sea.", hours: 60, body: null },
  { id: "l5-chartwork", section: "knqf5", kind: "unit", title: "Basic Chartwork Practices", summary: "Introductory chartwork.", moment: "Reading the chart before the next level of study.", hours: 80, body: null },
  { id: "l5-stability", section: "knqf5", kind: "unit", title: "Ship Stability Principles", summary: "Common unit · stability fundamentals.", moment: "Why the ship sits the way it does.", hours: 80, body: null },
  { id: "l5-stcw-safety", section: "knqf5", kind: "unit", title: "Basic Sea Safety (STCW)", summary: "Common unit · STCW basic safety.", moment: "The safety baseline before sea service.", hours: 50, body: null },

  {
    id: "knqf6-overview",
    section: "knqf6",
    kind: "programme",
    title: "Programme overview",
    summary: "Officer of the Watch pathway · KNQF Level 6.",
    moment: "Full curriculum PDF aligned to STCW Reg II/1.",
    hours: 2800,
    pdfUrl: "/curricula/nautical-science-knqf-level-6.pdf",
    body: "This programme builds the competencies for an Officer in Charge of a Navigational Watch. It covers passage planning, safe navigational watch, electronic navigation, cargo operations, ship handling and ship management. Open the curriculum PDF for the full unit pack, STCW mapping and assessment rules.",
  },
  { id: "l6-seamanship", section: "knqf6", kind: "unit", title: "Seamanship Practices", summary: "Core seamanship for junior officers.", moment: "Deck practice at officer level.", hours: 100, body: null },
  { id: "l6-navigation", section: "knqf6", kind: "unit", title: "Navigation Principles", summary: "Core navigation theory and practice.", moment: "How the ship finds and holds its way.", hours: 100, body: null },
  { id: "l6-chartwork", section: "knqf6", kind: "unit", title: "Chartwork Practices", summary: "Chartwork for the navigational watch.", moment: "Paper and plot before the electronic layer.", hours: 90, body: null },
  { id: "l6-celestial", section: "knqf6", kind: "unit", title: "Celestial Navigation", summary: "Celestial fixes and sight reduction.", moment: "When electronics are not the only answer.", hours: 100, body: null },
  { id: "l6-bridge", section: "knqf6", kind: "unit", title: "Bridge Equipment & Systems", summary: "Bridge systems the OOW must operate.", moment: "Knowing the kit on the bridge.", hours: 80, body: null },
  { id: "l6-electronic-nav", section: "knqf6", kind: "unit", title: "Electronic Navigation Equipment", summary: "Radar, ECDIS and related systems.", moment: "Electronic aids in a real watch.", hours: 80, body: null },
  { id: "l6-cargo", section: "knqf6", kind: "unit", title: "Cargo Handling & Stowage", summary: "Managing cargo operations.", moment: "Cargo as an officer responsibility.", hours: 90, body: null },
  { id: "l6-watchkeeping", section: "knqf6", kind: "unit", title: "Watchkeeping Duties", summary: "Maintaining a safe navigational watch.", moment: "The OOW on the bridge.", hours: 80, body: null },
  {
    id: "l6-voyage",
    section: "knqf6",
    kind: "unit",
    title: "Voyage Planning & Ocean Passage",
    summary: "Planning and executing the passage.",
    moment: "From berth to berth, planned properly.",
    hours: 100,
    body: "A navigational watch is the time a named officer is responsible for the safe movement of the ship. This unit is where passage planning and ocean passage sit in the Level 6 pack: what is planned, what is monitored, and when the master is called.",
  },
  { id: "l6-ship-handling", section: "knqf6", kind: "unit", title: "Ship Handling", summary: "Manoeuvring and ship handling.", moment: "Conning with understanding.", hours: 80, body: null },
  { id: "l6-emergencies", section: "knqf6", kind: "unit", title: "Emergency Response", summary: "Navigation and shipboard emergencies.", moment: "When the watch becomes an emergency.", hours: 70, body: null },
  { id: "l6-shipping-biz", section: "knqf6", kind: "unit", title: "Shipping Business Management", summary: "Commercial and operational ship management.", moment: "The business side of the certificate.", hours: 80, body: null },
  { id: "l6-colregs", section: "knqf6", kind: "unit", title: "Collision Prevention Regulations", summary: "Common unit · COLREGs.", moment: "Who gives way, and why.", hours: 80, body: null },
  { id: "l6-meteorology", section: "knqf6", kind: "unit", title: "Meteorology", summary: "Common unit · weather and routing.", moment: "Weather that changes the plan.", hours: 80, body: null },
  { id: "l6-law", section: "knqf6", kind: "unit", title: "Maritime Law & Conventions", summary: "Common unit · law and conventions.", moment: "The rules the officer must apply.", hours: 70, body: null },
  { id: "l6-stability", section: "knqf6", kind: "unit", title: "Ship Stability Principles", summary: "Common unit · stability.", moment: "Stability decisions that protect the ship.", hours: 90, body: null },

  { id: "gmdss-distress", section: "short", kind: "unit", title: "GMDSS & Distress", summary: "Distress communication.", moment: "The call you hope not to make, practised until it is calm.", body: null },
  { id: "lsa-ffe-emergencies", section: "short", kind: "unit", title: "LSA, FFE & Emergencies", summary: "Life-saving appliances, firefighting and emergency response.", moment: "A short course a whole class can take together.", body: null },
];

export const assumptions = [
  {
    question: "What is this?",
    decision: "One resource centre. The college admin adds lecturers. Lecturers and the admin add students. Students only read the materials.",
  },
  {
    question: "What curricula are loaded?",
    decision: "Bandari Maritime Academy KNQF Level 5 and Level 6 Nautical Science PDFs, with core (and key common) units listed in the sidebar. Copyright remains with BMA.",
  },
  {
    question: "Who can open it?",
    decision: "Meant for the institution’s own network. An account is still required. This sample can also run as a hosted preview.",
  },
  {
    question: "What are the caps?",
    decision: `${lecturerLimit} lecturer logins and ${studentLimit} students, shared across the centre. Placeholder numbers.`,
  },
];

export function initialDb(): Db {
  return {
    admins: [
      { id: "adm-emily", name: "Emily Mutua", email: "emily.mutua@example.com" },
    ],
    lecturers: [
      { id: "lec-james", name: "James Okello", email: "james.okello@example.com" },
      { id: "lec-sara", name: "Sara Njeri", email: "sara.njeri@example.com" },
    ],
    students: [
      { id: "stu-amina", name: "Amina Yusuf", email: "amina.yusuf@example.com" },
      { id: "stu-peter", name: "Peter Kamau", email: "peter.kamau@example.com" },
      { id: "stu-grace", name: "Grace Wanjiku", email: "grace.wanjiku@example.com" },
      { id: "stu-david", name: "David Otieno", email: "david.otieno@example.com" },
      { id: "stu-fatma", name: "Fatma Ali", email: "fatma.ali@example.com" },
      { id: "stu-brian", name: "Brian Mwangi", email: "brian.mwangi@example.com" },
      { id: "stu-lydia", name: "Lydia Chebet", email: "lydia.chebet@example.com" },
      { id: "stu-hassan", name: "Hassan Mohamed", email: "hassan.mohamed@example.com" },
    ],
  };
}

export function findResource(id: string): Resource | undefined {
  return resources.find((resource) => resource.id === id);
}

export function findProgramme(id: SectionId): Programme | undefined {
  return programmes.find((programme) => programme.id === id);
}
