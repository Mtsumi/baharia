import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STORAGE_VERSION, initialDb, lecturerLimit, studentLimit, type Db, type Person } from "./sample";

export type Role = "admin" | "lecturer" | "student";
export type Session = { role: Role; personId: string };

type Result = { ok: true } | { ok: false; message: string };

type Store = {
  db: Db;
  session: Session | null;
  current: Person | null;
  signIn: (email: string) => Result;
  signOut: () => void;
  reset: () => void;
  addLecturer: (name: string, email: string) => Result;
  addStudent: (name: string, email: string) => Result;
};

const StoreContext = createContext<Store | null>(null);
const STORAGE_KEY = "resource-centre";

function load(): { db: Db; session: Session | null } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { db: initialDb(), session: null };
    const parsed = JSON.parse(raw) as { version: number; db: Db; session: Session | null };
    if (parsed.version !== STORAGE_VERSION) return { db: initialDb(), session: null };
    return { db: parsed.db, session: parsed.session };
  } catch {
    return { db: initialDb(), session: null };
  }
}

function clean(value: string): string {
  return value.trim().toLowerCase();
}

function person(name: string, email: string): Person {
  return { id: crypto.randomUUID(), name: name.trim(), email: clean(email) };
}

function findPerson(db: Db, session: Session): Person | null {
  const list = session.role === "admin" ? db.admins : session.role === "lecturer" ? db.lecturers : db.students;
  return list.find((item) => item.id === session.personId) ?? null;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<Db>(() => load().db);
  const [session, setSession] = useState<Session | null>(() => load().session);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, db, session }));
  }, [db, session]);

  const store = useMemo<Store>(() => {
    const current = session ? findPerson(db, session) : null;

    function taken(email: string): boolean {
      const value = clean(email);
      return (
        db.admins.some((item) => item.email === value)
        || db.lecturers.some((item) => item.email === value)
        || db.students.some((item) => item.email === value)
      );
    }

    return {
      db,
      session: current ? session : null,
      current,
      signIn: (email) => {
        const value = clean(email);
        const admin = db.admins.find((item) => item.email === value);
        if (admin) {
          setSession({ role: "admin", personId: admin.id });
          return { ok: true };
        }
        const lecturer = db.lecturers.find((item) => item.email === value);
        if (lecturer) {
          setSession({ role: "lecturer", personId: lecturer.id });
          return { ok: true };
        }
        const student = db.students.find((item) => item.email === value);
        if (student) {
          setSession({ role: "student", personId: student.id });
          return { ok: true };
        }
        return { ok: false, message: "That email is not on this centre. Ask your college admin or lecturer." };
      },
      signOut: () => setSession(null),
      reset: () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setDb(initialDb());
        setSession(null);
      },
      addLecturer: (name, email) => {
        if (session?.role !== "admin") return { ok: false, message: "Only the college admin can add lecturers." };
        if (!name.trim() || !email.trim()) return { ok: false, message: "Enter a name and an email." };
        if (taken(email)) return { ok: false, message: "That email is already on this centre." };
        if (db.lecturers.length >= lecturerLimit) {
          return { ok: false, message: `The lecturer cap is ${lecturerLimit}.` };
        }
        const next = person(name, email);
        setDb((currentDb) => ({ ...currentDb, lecturers: [...currentDb.lecturers, next] }));
        return { ok: true };
      },
      addStudent: (name, email) => {
        if (session?.role !== "admin") {
          return { ok: false, message: "Only the college admin can add students." };
        }
        if (!name.trim() || !email.trim()) return { ok: false, message: "Enter a name and an email." };
        if (taken(email)) return { ok: false, message: "That email is already on this centre." };
        if (db.students.length >= studentLimit) {
          return { ok: false, message: `The student cap is ${studentLimit}.` };
        }
        const next = person(name, email);
        setDb((currentDb) => ({ ...currentDb, students: [...currentDb.students, next] }));
        return { ok: true };
      },
    };
  }, [db, session]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store missing");
  return store;
}
