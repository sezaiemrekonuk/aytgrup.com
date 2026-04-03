import { useState, useEffect, useCallback } from 'react';
import { getProjects, getFeaturedProjects, getProject } from '../services/projectService';

/**
 * Hook — paginated/filtered project list.
 * @param {{ status?: string, category?: string }} filters
 */
export function useProjects(filters = {}) {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects(filters);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.category]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}

/**
 * Hook — featured projects for the home page.
 * @param {number} [count=3]
 */
export function useFeaturedProjects(count = 3) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    getFeaturedProjects(count)
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [count]);

  return { projects, loading, error };
}

/**
 * Hook — single project detail.
 * @param {string} slugOrId
 */
export function useProject(slugOrId) {
  const [project, setProject]  = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slugOrId) return;
    setLoading(true);
    setError(null);
    setNotFound(false);

    getProject(slugOrId)
      .then((data) => {
        if (!data) setNotFound(true);
        else setProject(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slugOrId]);

  return { project, loading, error, notFound };
}
