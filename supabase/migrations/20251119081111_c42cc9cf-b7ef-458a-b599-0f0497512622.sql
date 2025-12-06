-- Create enum for skill proficiency levels
CREATE TYPE public.proficiency_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- Create projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  demo_url text,
  github_url text,
  technologies text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create certifications table
CREATE TABLE public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text NOT NULL,
  issuer text NOT NULL,
  issue_date date NOT NULL,
  credential_id text,
  credential_url text,
  display_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Certifications policies
CREATE POLICY "Anyone can view certifications"
  ON public.certifications FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage certifications"
  ON public.certifications FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create skills table
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  proficiency proficiency_level NOT NULL DEFAULT 'intermediate',
  icon_name text,
  display_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Skills policies
CREATE POLICY "Anyone can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage skills"
  ON public.skills FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create achievements table
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  icon_name text,
  display_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Achievements policies
CREATE POLICY "Anyone can view achievements"
  ON public.achievements FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage achievements"
  ON public.achievements FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create resume table (single entry)
CREATE TABLE public.resume (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size integer
);

ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;

-- Resume policies
CREATE POLICY "Anyone can view resume"
  ON public.resume FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage resume"
  ON public.resume FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create blog_posts table (for storing actual blog posts)
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Admin',
  image_url text,
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  slug text UNIQUE NOT NULL
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage blog posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create update triggers for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resume_updated_at
  BEFORE UPDATE ON public.resume
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();