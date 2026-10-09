export const centreName = "Bahari Maritime Academy";

export const adminLimit = 2;
export const lecturerLimit = 4;
export const studentLimit = 12;

export type Person = {
  id: string;
  name: string;
  email: string;
};

export type SectionId = "oow" | "short";

export type Resource = {
  id: string;
  title: string;
  summary: string;
  moment: string;
  section: SectionId;
  body: string | null;
};

export const sections: { id: SectionId; title: string }[] = [
  { id: "oow", title: "Officer of the Watch" },
  { id: "short", title: "Short courses" },
];

export type Db = {
  admins: Person[];
  lecturers: Person[];
  students: Person[];
};

export const STORAGE_VERSION = 3;

// Topic titles carried from the previous catalogue. The old pages, audio, and questions were not.
export const resources: Resource[] = [
  { id: "colregs", section: "oow", title: "COLREGs", summary: "Rules of the Road.", moment: "For the officer who has to decide, in the moment, who gives way.", body: null },
  { id: "cargo-operations", section: "oow", title: "Cargo Operations", summary: "Loading, stowage, stability and cargo documentation.", moment: "For the class on loading, and the officer who signs for the cargo.", body: null },
  { id: "bridge-equipment", section: "oow", title: "Bridge Equipment", summary: "Radar, ECDIS and bridge instrumentation.", moment: "What a lecturer sets out on the table before an afternoon class.", body: null },
  { id: "business-law", section: "oow", title: "Business & Law", summary: "Maritime law, contracts and shipboard administration.", moment: "The paperwork side of command, taught before someone has to face it alone.", body: null },
  { id: "environmental-regulations", section: "oow", title: "Environmental Regulations", summary: "Pollution prevention.", moment: "For the student who needs the rule before the inspection, not after.", body: null },
  { id: "meteorology", section: "oow", title: "Meteorology", summary: "Weather and routing.", moment: "For the passage that looks fine in port and changes overnight.", body: null },
  {
    id: "navigation-passage-planning",
    section: "oow",
    title: "Navigation & Passage Planning",
    summary: "Chart work, passage planning and voyage execution.",
    moment: "Where a student picks the subject back up after months away.",
    body: "A navigational watch is the time a named officer is responsible for the safe movement of the ship. This is the reading a lecturer can take into class: what the officer is watching, what gets written down, and when the master is called.",
  },
  { id: "safety-ism", section: "oow", title: "Safety & ISM Code", summary: "Shipboard safety and the ISM Code.", moment: "The safety talk, written so it can be taught the same way every intake.", body: null },
  { id: "gmdss-distress", section: "short", title: "GMDSS & Distress", summary: "Distress communication.", moment: "The call you hope not to make, practised until it is calm.", body: null },
  { id: "lsa-ffe-emergencies", section: "short", title: "LSA, FFE & Emergencies", summary: "Life-saving appliances, firefighting and emergency response.", moment: "A short course a whole class can take together.", body: null },
];

export const assumptions = [
  {
    question: "What is this?",
    decision: "One resource centre. The college admin adds lecturers. Lecturers and the admin add students. Students only read the materials.",
  },
  {
    question: "How many institutions are in the product?",
    decision: "One installation for one centre. There is no client list and no separate look per college.",
  },
  {
    question: "Who can open it?",
    decision: "It is meant to run on the institution’s own network, not as a public website. An account is still required. This sample listens only on this computer.",
  },
  {
    question: "What are the caps?",
    decision: `${lecturerLimit} lecturer logins and ${studentLimit} students, shared across the centre. Both numbers are placeholders. A student who leaves does not yet free a place, because that rule is not decided.`,
  },
  {
    question: "What came from the previous site?",
    decision: "The Officer of the Watch topic titles. Not the marketing site, checkout, clinics, certificates, role portals, or the empty server code.",
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
