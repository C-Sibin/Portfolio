-- Create skill-logos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('skill-logos', 'skill-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public access to skill logos
CREATE POLICY "Public Access to skill logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'skill-logos');

-- Create policy for authenticated users to upload skill logos
CREATE POLICY "Authenticated users can upload skill logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'skill-logos' AND auth.uid() IS NOT NULL);

-- Create policy for authenticated users to update skill logos
CREATE POLICY "Authenticated users can update skill logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'skill-logos' AND auth.uid() IS NOT NULL);

-- Create policy for authenticated users to delete skill logos
CREATE POLICY "Authenticated users can delete skill logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'skill-logos' AND auth.uid() IS NOT NULL);