"use client";
import { useEffect, useRef, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export function useSiteContent(section: string, fallback: any = {}) {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(false); // Changed to false - don't block rendering
  // Callers often pass a fresh object literal each render; keep the latest
  // value in a ref instead of a dependency so the effect doesn't loop.
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  useEffect(() => {
    const loadContent = async () => {
      if (!isSupabaseConfigured) {
        setContent(fallbackRef.current);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('section', section)
          .single();

        if (error) {
          console.warn(`Failed to load content for ${section}:`, error);
          setContent(fallbackRef.current);
        } else {
          setContent(data?.content || fallbackRef.current);
        }
      } catch (err) {
        console.warn(`Content load error for ${section}:`, err);
        setContent(fallbackRef.current);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [section]);

  return { content, loading };
}

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      if (!isSupabaseConfigured) {
        // Load static projects if no database
        const { staticProjects } = await import('../data/staticProjects');
        setProjects(staticProjects);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Failed to load projects:', error);
          // Fallback to static projects
          const { staticProjects } = await import('../data/staticProjects');
          setProjects(staticProjects);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.warn('Projects load error:', err);
        const { staticProjects } = await import('../data/staticProjects');
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading };
}

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      if (!isSupabaseConfigured) {
        setServices([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (error) {
          console.warn('Failed to load services:', error);
          setServices([]);
        } else {
          setServices(data || []);
        }
      } catch (err) {
        console.warn('Services load error:', err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, loading };
}
