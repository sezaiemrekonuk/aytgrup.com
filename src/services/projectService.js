/**
 * Project Service — Firestore CRUD for the `projects` collection.
 *
 * Falls back to SEED_PROJECTS (constants/index.js) when Firebase is
 * not configured or network is unavailable, so the UI always has data.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS, SEED_PROJECTS } from '../constants';

const projectsRef = () => collection(db, COLLECTIONS.PROJECTS);

// ─── Helpers ───────────────────────────────────────────────────────────────────
function isFirebaseConfigured() {
  return Boolean(process.env.REACT_APP_FIREBASE_PROJECT_ID);
}

/** Normalize a Firestore document snapshot to a plain JS object */
function fromDoc(snap) {
  return { id: snap.id, ...snap.data() };
}

// ─── Read Operations ───────────────────────────────────────────────────────────

/**
 * Get all projects, optionally filtered by status/category.
 * @param {{ status?: string, category?: string }} filters
 * @returns {Promise<Array>}
 */
export async function getProjects({ status, category } = {}) {
  if (!isFirebaseConfigured()) {
    return filterSeed({ status, category });
  }

  try {
    let q = query(projectsRef(), orderBy('order', 'asc'));

    if (status && status !== 'all') {
      q = query(projectsRef(), where('status', '==', status), orderBy('order', 'asc'));
    }
    if (category && category !== 'all') {
      q = query(projectsRef(), where('category', '==', category), orderBy('order', 'asc'));
    }
    if (status && status !== 'all' && category && category !== 'all') {
      q = query(
        projectsRef(),
        where('status', '==', status),
        where('category', '==', category),
        orderBy('order', 'asc'),
      );
    }

    const snap = await getDocs(q);
    return snap.docs.map(fromDoc);
  } catch (err) {
    console.warn('[projectService] Firestore error, using seed data:', err.message);
    return filterSeed({ status, category });
  }
}

/**
 * Get featured projects for the home page.
 * @param {number} [count=3]
 * @returns {Promise<Array>}
 */
export async function getFeaturedProjects(count = 3) {
  if (!isFirebaseConfigured()) {
    return SEED_PROJECTS.filter((p) => p.featured).slice(0, count);
  }

  try {
    const q = query(
      projectsRef(),
      where('featured', '==', true),
      orderBy('order', 'asc'),
      limit(count),
    );
    const snap = await getDocs(q);
    if (snap.empty) return SEED_PROJECTS.filter((p) => p.featured).slice(0, count);
    return snap.docs.map(fromDoc);
  } catch (err) {
    console.warn('[projectService] Firestore error:', err.message);
    return SEED_PROJECTS.filter((p) => p.featured).slice(0, count);
  }
}

/**
 * Get a single project by slug or document ID.
 * @param {string} slugOrId
 * @returns {Promise<Object|null>}
 */
export async function getProject(slugOrId) {
  if (!isFirebaseConfigured()) {
    return SEED_PROJECTS.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null;
  }

  try {
    // Try by slug first
    const q = query(projectsRef(), where('slug', '==', slugOrId), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) return fromDoc(snap.docs[0]);

    // Fall back to document ID
    const docSnap = await getDoc(doc(db, COLLECTIONS.PROJECTS, slugOrId));
    return docSnap.exists() ? fromDoc(docSnap) : null;
  } catch (err) {
    console.warn('[projectService] Firestore error:', err.message);
    return SEED_PROJECTS.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null;
  }
}

// ─── Write Operations (admin / seed) ──────────────────────────────────────────

/**
 * Add a new project document.
 * @param {Object} data
 * @returns {Promise<string>} new document ID
 */
export async function addProject(data) {
  const ref = await addDoc(projectsRef(), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * Update an existing project document.
 * @param {string} id
 * @param {Object} data
 */
export async function updateProject(id, data) {
  await updateDoc(doc(db, COLLECTIONS.PROJECTS, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a project document.
 * @param {string} id
 */
export async function deleteProject(id) {
  await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
}

/**
 * Seed Firestore with SEED_PROJECTS (run once from browser console or a script).
 * Import and call this manually: `import { seedProjects } from './services/projectService'`
 */
export async function seedProjects() {
  for (const project of SEED_PROJECTS) {
    await addDoc(projectsRef(), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  console.info('[projectService] ✅ Seed complete.');
}

// ─── Internal ─────────────────────────────────────────────────────────────────
function filterSeed({ status, category } = {}) {
  return SEED_PROJECTS.filter((p) => {
    const matchStatus   = !status   || status   === 'all' || p.status   === status;
    const matchCategory = !category || category === 'all' || p.category === category;
    return matchStatus && matchCategory;
  });
}
