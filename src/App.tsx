import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Assumptions, Landing, Login, Materials, People, ResourcePage, SectionNav } from "./screens";
import { useStore } from "./store";

let leaving = false;

function Shell({ children }: { children: React.ReactNode }) {
  const { session, current, signOut } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const publicPage = location.pathname === "/" || location.pathname === "/login";
  if (publicPage || !session || !current) return children;

  return (
    <div className="app">
      <aside className="side">
        <Link className="side-brand" to="/materials">
          <span className="mark">B</span>
          <span>
            <strong>Bahari</strong>
            <small>Resource centre</small>
          </span>
        </Link>
        <SectionNav />
        <nav>
          {session.role === "admin" && (
            <NavLink to="/people" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>People</NavLink>
          )}
        </nav>
        <div className="side-foot">
          <p>{current.name}</p>
          <p className="role">{session.role === "admin" ? "College admin" : session.role}</p>
          <div className="side-actions">
            <button
              type="button"
              className="linkish"
              onClick={() => {
                leaving = true;
                navigate("/", { replace: true });
                signOut();
              }}
            >
              Log out
            </button>
            <Link className="quiet-link" to="/assumptions">Notes for the team</Link>
          </div>
        </div>
      </aside>
      <div className="content">{children}</div>
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session } = useStore();
  const location = useLocation();
  if (!session) {
    if (leaving) {
      if (location.pathname === "/") leaving = false;
      return null;
    }
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return children;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session } = useStore();
  if (!session) return null;
  if (session.role !== "admin") return <Navigate to="/materials" replace />;
  return children;
}

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assumptions" element={<Assumptions />} />
        <Route path="/materials" element={<RequireAuth><Materials /></RequireAuth>} />
        <Route path="/materials/:resourceId" element={<RequireAuth><ResourcePage /></RequireAuth>} />
        <Route path="/people" element={<RequireAuth><RequireAdmin><People /></RequireAdmin></RequireAuth>} />
        <Route path="*" element={<p>That page is not in this version.</p>} />
      </Routes>
    </Shell>
  );
}
