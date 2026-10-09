import { FormEvent, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { assumptions, findResource, lecturerLimit, resources, sections, studentLimit } from "./sample";
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
      </div>

      <section className="points">
        <article className="point">
          <span className="point-num">01</span>
          <h2>Lecturers</h2>
          <p>Industry-curated material they can teach from. Courses from COLREGs and navigation through to GMDSS and emergency response.</p>
        </article>
        <article className="point">
          <span className="point-num">02</span>
          <h2>Students</h2>
          <p>Give your students top-tier material to an international standard — the same resources their lecturers use.</p>
        </article>
        <article className="point">
          <span className="point-num">03</span>
          <h2>The institution</h2>
          <p>Stop chasing curriculum from abroad. Run the resources on your own network, for the people you enrol.</p>
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
  const currentId = location.pathname.startsWith("/materials/") ? location.pathname.slice("/materials/".length) : "";
  const current = findResource(currentId);
  const [open, setOpen] = useState<Record<string, boolean>>({
    oow: !current || current.section === "oow",
    short: current?.section === "short",
  });

  return (
    <div className="sections">
      {sections.map((section) => {
        const items = resources.filter((resource) => resource.section === section.id);
        const expanded = open[section.id];
        return (
          <div key={section.id}>
            <button
              type="button"
              className="section-toggle"
              aria-expanded={expanded}
              onClick={() => setOpen((state) => ({ ...state, [section.id]: !state[section.id] }))}
            >
              {section.title}
              <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
            </button>
            {expanded && (
              <div className="section-items">
                {items.map((resource) => (
                  <NavLink
                    key={resource.id}
                    to={`/materials/${resource.id}`}
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                  >
                    {resource.title}
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

export function Materials() {
  return (
    <main className="reading">
      <h1>Resources</h1>
      <p className="sub">Open a section.</p>
    </main>
  );
}

export function ResourcePage() {
  const { resourceId } = useParams();
  const resource = findResource(resourceId ?? "");
  const section = sections.find((item) => item.id === resource?.section);
  if (!resource || !section) return <p>That subject is not in this centre.</p>;
  return (
    <main className="reading">
      <p className="kicker">{section.title}</p>
      <h1>{resource.title}</h1>
      <p className="moment">{resource.moment}</p>
      {resource.body ? <p className="sub">{resource.body}</p> : <p className="sub">{resource.summary} Reading not added yet.</p>}
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
        <p className="sub">Add lecturers and students. Lecturers can add students on their own; they cannot add lecturers.</p>
      </header>
      <AccountList title="Lecturers" noun="lecturer" used={db.lecturers.length} limit={lecturerLimit} people={db.lecturers} onAdd={addLecturer} />
      <AccountList title="Students" noun="student" used={db.students.length} limit={studentLimit} people={db.students} onAdd={addStudent} />
    </main>
  );
}

export function Students() {
  const { db, addStudent } = useStore();
  return (
    <main>
      <header className="page-head">
        <p className="kicker">Lecturer</p>
        <h1>Students</h1>
        <p className="sub">Add the students who should read the materials. New lecturers are added by the college admin.</p>
      </header>
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
