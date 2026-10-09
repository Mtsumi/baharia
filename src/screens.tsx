import { FormEvent, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  assumptions,
  course,
  findLevel,
  findUnit,
  lecturerLimit,
  levels,
  studentLimit,
  unitsForLevel,
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
          <h1>Maritime resources and upskilling, to an international standard.</h1>
          <p className="sub light">
            Give your lecturers industry-curated material, and put the same resources in front of your students.
          </p>
          <div className="hero-actions">
            <a className="btn solid-light" href="mailto:hello@baharimaritime.com?subject=Bahari%20resource%20centre">Book a call</a>
          </div>
        </section>
        <div className="hero-bands">
          {levels.map((level) => (
            <article key={level.id} className="hero-band">
              <p className="kicker light">{level.knqf}</p>
              <h2>{level.outcome}</h2>
              <p>{level.blurb}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="alive-strip">
        <p className="alive-quote">Your college should not have to assemble a syllabus from scraps. The course is ready. Your people teach and learn from it.</p>
      </section>

      <section className="points">
        <article className="point">
          <span className="point-num">01</span>
          <h2>Lecturers</h2>
          <p>Curated Nautical Science units they can teach from — Level 5 for ratings, Level 6 for officers of the watch.</p>
        </article>
        <article className="point">
          <span className="point-num">02</span>
          <h2>Students</h2>
          <p>Top-tier material to an international standard, studied in the centre — not chased as downloads.</p>
        </article>
        <article className="point">
          <span className="point-num">03</span>
          <h2>The institution</h2>
          <p>Stop worrying about curriculum. Enrol your people, and run the course on your own network.</p>
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
  const unitId = location.pathname.startsWith("/materials/") ? location.pathname.slice("/materials/".length) : "";
  const current = findUnit(unitId);
  const [open, setOpen] = useState<Record<LevelId, boolean>>({
    level5: current?.levelId === "level5",
    level6: !current || current.levelId === "level6",
  });

  return (
    <div className="sections">
      <p className="side-course">{course.title}</p>
      {levels.map((level) => {
        const items = unitsForLevel(level.id);
        const expanded = open[level.id];
        return (
          <div key={level.id}>
            <button
              type="button"
              className="section-toggle"
              aria-expanded={expanded}
              onClick={() => setOpen((state) => ({ ...state, [level.id]: !state[level.id] }))}
            >
              {level.title}
              <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
            </button>
            {expanded && (
              <div className="section-items">
                {items.map((unit) => (
                  <NavLink
                    key={unit.id}
                    to={`/materials/${unit.id}`}
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                  >
                    {unit.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UnitGrid({ levelId }: { levelId: LevelId }) {
  const level = findLevel(levelId);
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
        {unitsForLevel(levelId).map((unit) => (
          <Link key={unit.id} className="unit-card" to={`/materials/${unit.id}`}>
            <span className="chip">{unit.tag}</span>
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
  return (
    <main>
      <header className="page-head course-head">
        <p className="kicker">Course</p>
        <h1>{course.title}</h1>
        <p className="sub">{course.summary}</p>
      </header>
      <UnitGrid levelId="level6" />
      <UnitGrid levelId="level5" />
    </main>
  );
}

export function ResourcePage() {
  const { resourceId } = useParams();
  const unit = findUnit(resourceId ?? "");
  const level = unit ? findLevel(unit.levelId) : undefined;
  if (!unit || !level) return <p>That unit is not in this course.</p>;

  return (
    <main className="unit-page">
      <p className="note-line"><Link className="back" to="/materials">{course.title}</Link> · {level.title}</p>
      <p className="kicker">{unit.tag} unit · {unit.hours} hours</p>
      <h1>{unit.title}</h1>
      <p className="lede">{unit.description}</p>

      <section className="study-panel">
        <h2>What you will be able to do</h2>
        <ol className="outcomes">
          {unit.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ol>
      </section>

      <section className="study-panel soft">
        <h2>Study this unit</h2>
        <p>
          Work through the outcomes above with your lecturer. Video lessons and practice questions will sit here later.
          For now, this is the unit outline you teach and study from inside the centre.
        </p>
      </section>
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
