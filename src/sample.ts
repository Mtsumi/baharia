export const centreName = "Bahari Maritime Academy";

export const adminLimit = 2;
export const lecturerLimit = 4;
export const studentLimit = 12;

export type Person = {
  id: string;
  name: string;
  email: string;
};

export type CourseId = "nautical-science" | "marine-engineering" | "port-operations";
export type LevelId = "level5" | "level6";

export type Course = {
  id: CourseId;
  title: string;
  summary: string;
  status: "open" | "coming";
};

export type Level = {
  id: LevelId;
  courseId: CourseId;
  title: string;
  knqf: string;
  code: string;
  outcome: string;
  hours: number;
  blurb: string;
};

export type LessonPart = {
  title: string;
  body: string;
};

export type Unit = {
  id: string;
  courseId: CourseId;
  levelId: LevelId;
  title: string;
  hours: number;
  tag: string;
  description: string;
  outcomes: string[];
  /** In-app reading. Empty means outline only for the demo. */
  lessons?: LessonPart[];
  teachingNotes?: string[];
};

export const courses: Course[] = [
  {
    id: "nautical-science",
    title: "Nautical Science",
    summary: "Deck ratings and officers of the watch — KNQF Level 5 and Level 6.",
    status: "open",
  },
  {
    id: "marine-engineering",
    title: "Marine Engineering",
    summary: "Engine-room pathway for ratings and officers. Units to be added next.",
    status: "coming",
  },
  {
    id: "port-operations",
    title: "Port Operations",
    summary: "Shore-side operations and logistics for port and terminal teams.",
    status: "coming",
  },
];

export const levels: Level[] = [
  {
    id: "level5",
    courseId: "nautical-science",
    title: "Level 5",
    knqf: "KNQF Level 5",
    code: "1041 454 A",
    outcome: "Able Seafarer Deck pathway",
    hours: 1780,
    blurb: "For ratings working toward Able Seafarer Deck (STCW Reg II/5).",
  },
  {
    id: "level6",
    courseId: "nautical-science",
    title: "Level 6",
    knqf: "KNQF Level 6",
    code: "1041 554 A",
    outcome: "Officer of the Watch pathway",
    hours: 2800,
    blurb: "For officers training toward STCW Reg II/1 — Officer in Charge of a Navigational Watch.",
  },
];

export const units: Unit[] = [
  {
    id: "l5-seamanship",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Seamanship Practices",
    hours: 80,
    tag: "Core",
    description: "Deck seamanship for Able Seafarer ratings: ropes, knots, shipboard work and safe practice on deck.",
    outcomes: [
      "Carry out seamanship tasks on deck under instruction",
      "Handle ropes, wires and deck fittings safely",
      "Support routine shipboard maintenance",
    ],
  },
  {
    id: "l5-watchkeeping",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Watchkeeping Practices",
    hours: 80,
    tag: "Core",
    description: "Safe watchkeeping as a deck rating: lookout, reporting and supporting the officer of the watch.",
    outcomes: [
      "Keep an effective lookout",
      "Report traffic, lights and hazards clearly",
      "Support a safe navigational watch",
    ],
  },
  {
    id: "l5-deck-machinery",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Deck Machinery & Cargo Gear",
    hours: 70,
    tag: "Core",
    description: "Safe operation and care of deck machinery, cargo handling gear and related equipment.",
    outcomes: [
      "Identify deck machinery and cargo gear",
      "Operate equipment under supervision",
      "Follow safe working practices around moving gear",
    ],
  },
  {
    id: "l5-mooring",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Berthing, Anchoring & Mooring",
    hours: 70,
    tag: "Core",
    description: "Mooring, berthing and anchoring work as part of the deck team.",
    outcomes: [
      "Prepare and handle mooring lines",
      "Support anchoring operations",
      "Work safely during berthing",
    ],
  },
  {
    id: "l5-cargo",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Cargo Handling & Stowage",
    hours: 80,
    tag: "Core",
    description: "Cargo handling and stowage duties for deck ratings.",
    outcomes: [
      "Support cargo operations on deck",
      "Follow stowage and securing instructions",
      "Recognise common cargo hazards",
    ],
  },
  {
    id: "l5-ship-handling",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Ship Handling & Manoeuvring",
    hours: 70,
    tag: "Core",
    description: "How ratings support ship handling and manoeuvring alongside and at sea.",
    outcomes: [
      "Understand stations during manoeuvres",
      "Support helm and lookout duties as required",
      "Work safely during arrival and departure",
    ],
  },
  {
    id: "l5-emergencies",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Emergencies at Sea and in Port",
    hours: 60,
    tag: "Core",
    description: "Responding to emergencies on board and in port as a deck rating.",
    outcomes: [
      "Follow emergency stations and alarms",
      "Support fire, abandon-ship and rescue drills",
      "Act under the officer in charge during an emergency",
    ],
  },
  {
    id: "l5-chartwork",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Basic Chartwork Practices",
    hours: 80,
    tag: "Core",
    description: "Introductory chartwork for ratings continuing toward higher nautical study.",
    outcomes: [
      "Read basic chart symbols and scales",
      "Plot simple positions under guidance",
      "Use charts as a support to the watch",
    ],
  },
  {
    id: "l5-stability",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Ship Stability Principles",
    hours: 80,
    tag: "Common",
    description: "Foundations of ship stability for deck ratings.",
    outcomes: [
      "Explain basic stability terms",
      "Recognise how loading affects the ship",
      "Report conditions that affect seaworthiness",
    ],
  },
  {
    id: "l5-stcw-safety",
    courseId: "nautical-science",
    levelId: "level5",
    title: "Basic Sea Safety (STCW)",
    hours: 50,
    tag: "Common",
    description: "STCW basic safety training required before and during sea service.",
    outcomes: [
      "Apply personal survival techniques",
      "Support fire prevention and firefighting",
      "Follow elementary first aid and personal safety practices",
    ],
  },

  {
    id: "l6-seamanship",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Seamanship Practices",
    hours: 100,
    tag: "Core",
    description: "Seamanship at officer level: planning and supervising deck work, not only carrying it out.",
    outcomes: [
      "Plan and supervise seamanship tasks",
      "Apply safe working practices on deck",
      "Lead ratings during routine and special operations",
    ],
  },
  {
    id: "l6-navigation",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Navigation Principles",
    hours: 120,
    tag: "Core",
    description:
      "Competencies required to apply navigation principles: Earth features, charts and publications, compass errors, sailing methods, position fixing, tides and great-circle sailing.",
    outcomes: [
      "Identify Earth features for navigation",
      "Identify charts and nautical publications",
      "Correct compass errors",
      "Apply parallel, plane and Mercator sailing",
      "Apply principles of position fixing",
      "Apply tidal and great-circle sailing principles",
    ],
    teachingNotes: [
      "Open with the shape of the Earth and why latitude and longitude matter on a chart.",
      "Have students correct a sample compass error before you move to sailing methods.",
      "Finish by linking tides and great-circle sailing to a short passage-planning exercise.",
    ],
    lessons: [
      {
        title: "The Earth as a navigation surface",
        body: "Navigation starts with a model of the Earth. Meridians run from pole to pole. Parallels of latitude run east–west. A position is fixed by latitude and longitude on an agreed datum. When you change chart or publication, check that you are still working on the same reference.",
      },
      {
        title: "Charts and nautical publications",
        body: "A chart is a working tool, not a picture. Read the title block, scale, units, and correction status before you plot. Publications such as sailing directions, light lists and tide tables sit beside the chart. The officer’s job is to choose the right document for the question in front of them.",
      },
      {
        title: "Compass error and sailing methods",
        body: "Courses and bearings are useless until compass error is allowed for. Parallel and plane sailing work for shorter distances. Mercator sailing is the practical method on most ocean charts. Great-circle sailing shortens long ocean legs but needs care near the poles and with intermediate waypoints.",
      },
      {
        title: "Position fixing and tides",
        body: "A fix is only as good as the lines that made it. Cross visual bearings, radar ranges and electronic positions, and treat a single source with caution. Tides change depth and current. Apply tidal principles before you commit the ship to a shallow passage or a tight berth.",
      },
    ],
  },
  {
    id: "l6-chartwork",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Chartwork Practices",
    hours: 90,
    tag: "Core",
    description: "Chartwork for the officer of the watch: plotting, courses, dangers and coastal navigation practice.",
    outcomes: [
      "Plot courses and positions on the chart",
      "Allow for set, drift and compass error",
      "Identify coastal dangers and clearing marks",
    ],
  },
  {
    id: "l6-celestial",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Celestial Navigation",
    hours: 100,
    tag: "Core",
    description: "Celestial navigation for ocean passages when electronic systems are not the only source of position.",
    outcomes: [
      "Take and reduce celestial sights",
      "Obtain a celestial fix",
      "Use celestial methods to check the compass",
    ],
  },
  {
    id: "l6-bridge",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Bridge Equipment & Systems",
    hours: 80,
    tag: "Core",
    description: "Bridge systems the officer of the watch must understand and operate.",
    outcomes: [
      "Identify bridge equipment and its purpose",
      "Operate bridge systems for a safe watch",
      "Recognise faults and report them correctly",
    ],
  },
  {
    id: "l6-electronic-nav",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Electronic Navigation Equipment",
    hours: 80,
    tag: "Core",
    description: "Radar, ECDIS and related electronic aids used on the navigational watch.",
    outcomes: [
      "Set up and interpret radar information",
      "Use ECDIS for monitoring the passage",
      "Cross-check electronic positions with other methods",
    ],
  },
  {
    id: "l6-cargo",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Cargo Handling & Stowage",
    hours: 90,
    tag: "Core",
    description: "Managing cargo operations as a junior officer, including stowage, securing and documentation.",
    outcomes: [
      "Plan and monitor cargo operations",
      "Apply stowage and securing principles",
      "Maintain cargo records and communications",
    ],
  },
  {
    id: "l6-watchkeeping",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Watchkeeping Duties",
    hours: 150,
    tag: "Core",
    description:
      "Perform watchkeeping duties: taking and handing over the watch, anchorage and port watches, lookout, vessels in any visibility, distress signals, coastal waters, lights, shapes and sound signals, and procedures with a pilot on board.",
    outcomes: [
      "Execute watch taking and handing over",
      "Perform watchkeeping at anchorage and in port",
      "Utilise meteorological information for a safe watch",
      "Perform lookout duties and conduct the vessel in any visibility",
      "Transmit distress signals when required",
      "Keep watch in coastal and congested waters",
      "Recognise lights, shapes and sound signals",
      "Implement navigational watch procedures with a pilot on board",
    ],
    teachingNotes: [
      "Run a live handover drill: one student hands over, another takes over, class scores what was missed.",
      "Separate clear-weather watch from restricted visibility before you mix COLREGs into the lesson.",
      "End with pilot-on-board responsibilities so students do not treat the pilot as a replacement for the watch.",
    ],
    lessons: [
      {
        title: "Taking over and handing over the watch",
        body: "A watch begins before you say you have it. Check position, course, speed, traffic, weather, pending orders and the master’s standing orders. When you hand over, leave the next officer with a clear picture — not a surprise. If something is uncertain, say so before you leave the bridge.",
      },
      {
        title: "Lookout and conducting the vessel",
        body: "Lookout is continuous and by all available means. Sight, hearing, radar and AIS support each other; none replaces the others alone. In clear weather and in restricted visibility the officer still owns the con. Calling the master early is part of a good watch, not a failure of it.",
      },
      {
        title: "Anchorage, port and coastal watches",
        body: "At anchor you watch position, swinging room and traffic. In port you watch the berth, access and cargo-related risks. In coastal and congested waters the traffic picture changes fast — slow down the plan in your head before the ship runs out of sea room.",
      },
      {
        title: "Signals, distress and the pilot",
        body: "Lights, shapes and sound signals are the language of the rules. Know them before you need them. Distress signals are rare and must be unmistakable. With a pilot on board the ship still has an officer of the watch. The pilot advises; the master and the watch remain responsible for the safe navigation of the ship.",
      },
    ],
  },
  {
    id: "l6-voyage",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Voyage Planning & Ocean Passage",
    hours: 100,
    tag: "Core",
    description:
      "Plan and execute the passage: appraisal, planning, execution and monitoring from berth to berth, including ocean passages.",
    outcomes: [
      "Appraise the passage using charts and publications",
      "Prepare a berth-to-berth voyage plan",
      "Monitor the plan and revise it when conditions change",
      "Know when to call the master",
    ],
  },
  {
    id: "l6-ship-handling",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Ship Handling",
    hours: 80,
    tag: "Core",
    description: "Ship handling and manoeuvring principles for the officer of the watch.",
    outcomes: [
      "Explain how ship handling characteristics affect manoeuvres",
      "Support arrival, departure and anchoring manoeuvres",
      "Apply safe practices when manoeuvring near other vessels",
    ],
  },
  {
    id: "l6-emergencies",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Emergency Response",
    hours: 70,
    tag: "Core",
    description: "Responding to navigation and shipboard emergencies as an officer.",
    outcomes: [
      "Recognise developing emergencies on the bridge",
      "Apply emergency procedures and communications",
      "Coordinate the team until the master takes over",
    ],
  },
  {
    id: "l6-shipping-biz",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Shipping Business Management",
    hours: 80,
    tag: "Core",
    description: "Commercial and operational aspects of ship management relevant to junior officers.",
    outcomes: [
      "Explain the commercial parties around a ship",
      "Apply basic shipping documentation",
      "Connect bridge decisions to commercial consequences",
    ],
  },
  {
    id: "l6-colregs",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Collision Prevention Regulations",
    hours: 80,
    tag: "Common",
    description: "COLREGs for the officer of the watch: who gives way, and how to act in any visibility.",
    outcomes: [
      "Apply the rules in sight of other vessels",
      "Apply the rules in restricted visibility",
      "Recognise lights, shapes and sound signals correctly",
    ],
  },
  {
    id: "l6-meteorology",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Meteorology",
    hours: 80,
    tag: "Common",
    description: "Weather systems, forecasting and routing decisions for the navigational watch.",
    outcomes: [
      "Interpret weather information for the watch",
      "Recognise weather that affects the passage",
      "Use meteorology in voyage planning",
    ],
  },
  {
    id: "l6-law",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Maritime Law & Conventions",
    hours: 70,
    tag: "Common",
    description: "Maritime law and conventions the officer must apply on board.",
    outcomes: [
      "Identify key conventions affecting the watch",
      "Apply shipboard legal responsibilities at officer level",
      "Record and report as required by law and company procedure",
    ],
  },
  {
    id: "l6-stability",
    courseId: "nautical-science",
    levelId: "level6",
    title: "Ship Stability Principles",
    hours: 90,
    tag: "Common",
    description: "Stability principles for officers responsible for the seaworthiness of the ship.",
    outcomes: [
      "Apply stability terms to real loading conditions",
      "Recognise threats to stability",
      "Support decisions that keep the ship seaworthy",
    ],
  },
];

export type Db = {
  admins: Person[];
  lecturers: Person[];
  students: Person[];
};

export const STORAGE_VERSION = 5;

export const assumptions = [
  {
    question: "Who adds people?",
    decision: "Only the college admin. Lecturers teach and study; they do not enrol people.",
  },
  {
    question: "What courses are in the catalogue?",
    decision: "Nautical Science is open (Level 5 and Level 6). Marine Engineering and Port Operations are listed as coming next. More courses can be added the same way.",
  },
  {
    question: "Where did the unit outlines come from?",
    decision: "Bandari Maritime Academy KNQF Level 5 and Level 6 Nautical Science curricula (2024). Copyright remains with BMA.",
  },
];

export function initialDb(): Db {
  return {
    admins: [{ id: "adm-emily", name: "Emily Mutua", email: "emily.mutua@example.com" }],
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

export function findCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function findUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

export function findLevel(courseId: CourseId, levelId: LevelId): Level | undefined {
  return levels.find((level) => level.courseId === courseId && level.id === levelId);
}

export function levelsForCourse(courseId: CourseId): Level[] {
  return levels.filter((level) => level.courseId === courseId);
}

export function unitsForLevel(courseId: CourseId, levelId: LevelId): Unit[] {
  return units.filter((unit) => unit.courseId === courseId && unit.levelId === levelId);
}

export function unitsForCourse(courseId: CourseId): Unit[] {
  return units.filter((unit) => unit.courseId === courseId);
}
