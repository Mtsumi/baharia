import { FormEvent, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  assumptions,
  courses,
  findCourse,
  findLevel,
  findUnit,
  lecturerLimit,
  levelsForCourse,
  studentLimit,
  unitsForCourse,
  unitsForLevel,
  type CourseId,
  type LevelId,
} from "./sample";
import { useStore } from "./store";

function initials(name: string): string {
  return name.split(" ").slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();
}

export function Landing() {
  return (
    <div className="public">
      <div className="sea">
        <header className="public-bar">
          <div className="brand">
            <strong>Bahari</strong>
            <small>Maritime Academy</small>
          </div>
          <div className="bar-actions">
            <a className="btn ghost-light" href="mailto:hello@baharimaritime.com?subject=Bahari%20resource%20centre">Book a call</a>
            <Link className="btn solid-light" to="/login">Log in</Link>
          </div>
        </header>
        <section className="hero">
          <p className="kicker light">For maritime colleges and training centres</p>
          <h1>Better notes for the modules your college already teaches.</h1>
          <p className="sub light">
            Schools cover similar modules in different ways. We give lecturers and students clearer notes, in a guided order they can teach and study from.
          </p>
          <div className="hero-actions">
            <a className="btn solid-light" href="mailto:hello@baharimaritime.com?subject=Bahari%20resource%20centre">Book a call</a>
          </div>
        </section>
        <div className="hero-bands">
          {courses.map((item) => (
            <article key={item.id} className="hero-band">
              <p className="kicker light">{item.status === "open" ? "Open now" : "Coming next"}</p>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="alive-strip">
        <p className="alive-quote">Same modules. Stronger notes. A clear path through the course for both the lecturer and the student.</p>
      </section>

      <section className="points">
        <article className="point">
          <span className="point-num">01</span>
          <h2>Lecturers</h2>
          <p>Teach from better notes on the modules you already cover, set out in an order that guides the class.</p>
        </article>
        <article className="point">
          <span className="point-num">02</span>
          <h2>Students</h2>
          <p>Study the same modules in a clear sequence, with notes written for learning, not for filing away.</p>
        </article>
        <article className="point">
          <span className="point-num">03</span>
          <h2>The institution</h2>
          <p>Keep your own modules. Add people. Run the guided notes on your network.</p>
        </article>
      </section>
    </div>
  );
}

export function Login() {
  const { db, signIn } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function enter(value: string) {
    const result = signIn(value);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    const target = next && next.startsWith("/") && !next.startsWith("/login") ? next : "/materials";
    navigate(target);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    enter(email);
  }

  const samples = [
    ...db.admins.map((person) => ({ ...person, role: "College admin" })),
    ...db.lecturers.slice(0, 1).map((person) => ({ ...person, role: "Lecturer" })),
    ...db.students.slice(0, 1).map((person) => ({ ...person, role: "Student" })),
  ];

  return (
    <div className="gate">
      <section className="gate-brand">
        <Link className="brand" to="/">
          <strong style={{ color: "white" }}>Bahari</strong>
          <small>Maritime Academy</small>
        </Link>
        <div className="gate-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
      <section className="gate-panel">
        <h2>Log in</h2>
        <form className="form-card" onSubmit={submit}>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@example.com" required />
          </label>
          <button className="btn" type="submit">Continue</button>
          {message && <p className="error">{message}</p>}
        </form>
        <div className="account-list">
          {samples.map((person) => (
            <button key={person.id} className="account" type="button" onClick={() => enter(person.email)}>
              <span className="avatar">{initials(person.name)}</span>
              <span>
                {person.name}
                <small>{person.role}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SectionNav() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const courseId = parts[0] === "materials" ? parts[1] : undefined;
  const unitId = parts[0] === "materials" && parts.length >= 3 ? parts[2] : undefined;
  const currentUnit = unitId ? findUnit(unitId) : undefined;
  const [openCourse, setOpenCourse] = useState<CourseId | null>(
    (currentUnit?.courseId ?? (courseId as CourseId) ?? "nautical-science") as CourseId,
  );

  return (
    <div className="sections">
      <p className="side-course">Courses</p>
      {courses.map((item) => {
        const expanded = openCourse === item.id;
        const courseUnits = unitsForCourse(item.id);
        return (
          <div key={item.id}>
            {item.status === "open" ? (
              <>
                <button
                  type="button"
                  className="section-toggle"
                  aria-expanded={expanded}
                  onClick={() => setOpenCourse(expanded ? null : item.id)}
                >
                  {item.title}
                  <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
                </button>
                {expanded && (
                  <div className="section-items">
                    <NavLink to={`/materials/${item.id}`} end className={({ isActive }) => (isActive && !unitId ? "active" : undefined)}>
                      Course home
                    </NavLink>
                    {courseUnits.map((unit) => (
                      <NavLink
                        key={unit.id}
                        to={`/materials/${item.id}/${unit.id}`}
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                      >
                        {unit.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="section-toggle muted-toggle">
                {item.title}
                <span>Soon</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UnitGrid({ courseId, levelId }: { courseId: CourseId; levelId: LevelId }) {
  const level = findLevel(courseId, levelId);
  if (!level) return null;
  return (
    <section className="level-block">
      <div className="level-head">
        <div>
          <p className="kicker">{level.knqf}</p>
          <h2>{level.outcome}</h2>
          <p className="sub">{level.blurb}</p>
        </div>
        <p className="level-meta">{level.hours} hrs · {level.code}</p>
      </div>
      <div className="unit-grid">
        {unitsForLevel(courseId, levelId).map((unit) => (
          <Link key={unit.id} className="unit-card" to={`/materials/${courseId}/${unit.id}`}>
            <span className="chip">{unit.lessons?.length ? "Ready to study" : unit.tag}</span>
            <h3>{unit.title}</h3>
            <p>{unit.description}</p>
            <span className="unit-hours">{unit.hours} hours</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Materials() {
  const { session, current } = useStore();
  const firstName = current?.name.split(" ")[0] ?? "";
  const roleLine =
    session?.role === "admin"
      ? "Guided notes for the modules your college teaches. Nautical Science is open; more courses follow."
      : session?.role === "lecturer"
        ? `${firstName}, open a course for clearer notes in a teaching order. Start with Nautical Science.`
        : `${firstName}, open a course and follow the module order. Start with Nautical Science.`;

  return (
    <main>
      <header className="page-head course-head">
        <p className="kicker">Catalogue</p>
        <h1>Courses</h1>
        <p className="sub">{roleLine}</p>
      </header>
      <div className="course-grid">
        {courses.map((item) => (
          item.status === "open" ? (
            <Link key={item.id} className="course-card" to={`/materials/${item.id}`}>
              <span className="chip">Open</span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </Link>
          ) : (
            <div key={item.id} className="course-card soon">
              <span className="chip wait">Coming next</span>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </div>
          )
        ))}
      </div>
    </main>
  );
}

export function CoursePage() {
  const { courseId } = useParams();
  const course = findCourse(courseId ?? "");
  if (!course) return <p>That course is not in the catalogue.</p>;
  if (course.status !== "open") {
    return (
      <main>
        <p className="note-line"><Link className="back" to="/materials">Courses</Link></p>
        <h1>{course.title}</h1>
        <p className="sub">This course is listed for the college and will open when its units are ready.</p>
      </main>
    );
  }

  const courseLevels = levelsForCourse(course.id);
  return (
    <main>
      <p className="note-line"><Link className="back" to="/materials">Courses</Link></p>
      <header className="page-head course-head">
        <p className="kicker">Course</p>
        <h1>{course.title}</h1>
        <p className="sub">{course.summary}</p>
      </header>
      {courseLevels.map((level) => (
        <UnitGrid key={level.id} courseId={course.id} levelId={level.id} />
      ))}
    </main>
  );
}

export function ResourcePage() {
  const { courseId, unitId } = useParams();
  const { session } = useStore();
  const course = findCourse(courseId ?? "");
  const unit = findUnit(unitId ?? "");
  const level = unit && course ? findLevel(unit.courseId, unit.levelId) : undefined;
  const [done, setDone] = useState(false);
  if (!course || !unit || !level || unit.courseId !== course.id) {
    return <p>That unit is not in this course.</p>;
  }

  const isLecturer = session?.role === "lecturer" || session?.role === "admin";
  const hasLessons = Boolean(unit.lessons?.length);

  return (
    <main className="unit-page">
      <p className="note-line">
        <Link className="back" to="/materials">Courses</Link>
        {" · "}
        <Link className="back" to={`/materials/${course.id}`}>{course.title}</Link>
        {" · "}
        {level.title}
      </p>
      <div className="role-pill">{isLecturer ? "Lecturer view" : "Student view"}</div>
      <p className="kicker">{unit.tag} unit · {unit.hours} hours</p>
      <h1>{unit.title}</h1>
      <p className="lede">{unit.description}</p>

      {isLecturer && unit.teachingNotes && (
        <section className="study-panel teach">
          <h2>Teaching notes</h2>
          <ul className="outcomes teach-list">
            {unit.teachingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="study-panel">
        <h2>{isLecturer ? "Learning outcomes for the class" : "What you will be able to do"}</h2>
        <ol className="outcomes">
          {unit.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ol>
      </section>

      {hasLessons ? (
        <section className="study-stack">
          <h2 className="study-stack-title">{isLecturer ? "Student reading" : "Study reading"}</h2>
          {unit.lessons!.map((part, index) => (
            <article key={part.title} className="lesson-block">
              <p className="lesson-index">Part {index + 1}</p>
              <h3>{part.title}</h3>
              <p>{part.body}</p>
            </article>
          ))}
          {!isLecturer && (
            <div className="complete-row">
              <button className="btn" type="button" onClick={() => setDone(true)} disabled={done}>
                {done ? "Marked as studied" : "Mark as studied"}
              </button>
              {done && <p className="ok">Saved on this device for the demo.</p>}
            </div>
          )}
        </section>
      ) : (
        <section className="study-panel soft">
          <h2>Outline ready</h2>
          <p>
            {isLecturer
              ? "This unit is listed for the course. Full reading can be added the same way as Watchkeeping Duties and Navigation Principles."
              : "Your lecturer will open the full reading for this unit soon. Try Watchkeeping Duties or Navigation Principles to see how study works in the centre."}
          </p>
        </section>
      )}
    </main>
  );
}

export function People() {
  const { db, addLecturer, addStudent } = useStore();
  return (
    <main>
      <header className="page-head">
        <p className="kicker">College admin</p>
        <h1>People</h1>
        <p className="sub">Add lecturers and students. Lecturers use the course; they do not enrol people.</p>
      </header>
      <AccountList title="Lecturers" noun="lecturer" used={db.lecturers.length} limit={lecturerLimit} people={db.lecturers} onAdd={addLecturer} />
      <AccountList title="Students" noun="student" used={db.students.length} limit={studentLimit} people={db.students} onAdd={addStudent} />
    </main>
  );
}

function AccountList({
  title,
  noun,
  used,
  limit,
  people,
  onAdd,
}: {
  title: string;
  noun: string;
  used: number;
  limit: number;
  people: { id: string; name: string; email: string }[];
  onAdd: (name: string, email: string) => { ok: true } | { ok: false; message: string };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const ratio = used / limit;
  const meter = ratio >= 1 ? "full" : ratio >= 0.8 ? "warn" : "";

  function submit(event: FormEvent) {
    event.preventDefault();
    const result = onAdd(name, email);
    setOk(result.ok);
    setMessage(result.ok ? `${name.trim()} can now log in.` : result.message);
    if (result.ok) {
      setName("");
      setEmail("");
    }
  }

  return (
    <section className="person-card">
      <div className="card-top">
        <h2>{title}</h2>
        <div className="meter">
          <div className="meter-top">
            <span>{used} of {limit} in use</span>
            <span>{Math.max(limit - used, 0)} left</span>
          </div>
          <div className={`track ${meter}`}><span style={{ width: `${Math.min(ratio * 100, 100)}%` }} /></div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>
                <div className="who">
                  <span className="avatar">{initials(person.name)}</span>
                  {person.name}
                </div>
              </td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="adder" onSubmit={submit}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        </label>
        <button className="btn" type="submit">Add {noun}</button>
        {message && <p className={ok ? "ok" : "error"} style={{ gridColumn: "1 / -1" }}>{message}</p>}
      </form>
    </section>
  );
}

export function Assumptions() {
  const { reset, session } = useStore();
  const navigate = useNavigate();
  const body = (
    <main>
      <header className="page-head">
        <p className="kicker">For the team</p>
        <h1>What this version assumes</h1>
      </header>
      <div className="notes">
        {assumptions.map((item) => (
          <article key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.decision}</p>
          </article>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          reset();
          navigate("/");
        }}
        style={{ marginTop: 18 }}
      >
        <button className="btn ghost" type="submit">Reset sample accounts</button>
      </form>
    </main>
  );

  if (session) return body;
  return <div className="public"><div className="content">{body}</div></div>;
}
