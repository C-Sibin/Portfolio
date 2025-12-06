import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  technologies: string[];
  featured: boolean;
  display_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string | null;
  tags: string[];
  published: boolean;
  slug: string;
  created_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id: string | null;
  credential_url: string | null;
  display_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon_name: string | null;
  display_order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon_name: string | null;
  display_order: number;
}

export interface Resume {
  id: string;
  file_url: string;
  file_name: string;
  file_size: number | null;
  updated_at: string;
}

export const usePortfolioData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, blogRes, certsRes, skillsRes, achievementsRes, resumeRes] = await Promise.all([
          supabase.from('projects').select('*').order('display_order'),
          supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false }),
          supabase.from('certifications').select('*').order('display_order'),
          supabase.from('skills').select('*').order('display_order'),
          supabase.from('achievements').select('*').order('display_order'),
          supabase.from('resume').select('*').order('updated_at', { ascending: false }).limit(1)
        ]);

        if (projectsRes.data) setProjects(projectsRes.data);
        if (blogRes.data) setBlogPosts(blogRes.data);
        if (certsRes.data) setCertifications(certsRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
        if (achievementsRes.data) setAchievements(achievementsRes.data);
        if (resumeRes.data && resumeRes.data.length > 0) setResume(resumeRes.data[0]);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscriptions
    const projectsChannel = supabase
      .channel('projects-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        supabase.from('projects').select('*').order('display_order').then(({ data }) => {
          if (data) setProjects(data);
        });
      })
      .subscribe();

    const blogChannel = supabase
      .channel('blog-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, () => {
        supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false }).then(({ data }) => {
          if (data) setBlogPosts(data);
        });
      })
      .subscribe();

    const certsChannel = supabase
      .channel('certs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certifications' }, () => {
        supabase.from('certifications').select('*').order('display_order').then(({ data }) => {
          if (data) setCertifications(data);
        });
      })
      .subscribe();

    const skillsChannel = supabase
      .channel('skills-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' }, () => {
        supabase.from('skills').select('*').order('display_order').then(({ data }) => {
          if (data) setSkills(data);
        });
      })
      .subscribe();

    const achievementsChannel = supabase
      .channel('achievements-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'achievements' }, () => {
        supabase.from('achievements').select('*').order('display_order').then(({ data }) => {
          if (data) setAchievements(data);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(blogChannel);
      supabase.removeChannel(certsChannel);
      supabase.removeChannel(skillsChannel);
      supabase.removeChannel(achievementsChannel);
    };
  }, []);

  return { projects, blogPosts, certifications, skills, achievements, resume, loading };
};
