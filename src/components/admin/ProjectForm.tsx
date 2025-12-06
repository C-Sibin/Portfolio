import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormProps {
  onSuccess: () => void;
}

export const ProjectForm = ({ onSuccess }: ProjectFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    demo_url: "",
    github_url: "",
    technologies: "",
    featured: false,
    display_order: 0
  });
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
      toast({ title: "Success", description: "Image uploaded" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert({
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Project added" });
    setFormData({ title: "", description: "", image_url: "", demo_url: "", github_url: "", technologies: "", featured: false, display_order: 0 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-foreground">Title</Label>
        <Input 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          placeholder="Project title"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Description</Label>
        <Textarea 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})}
          placeholder="Project description"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Project Image</Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          disabled={uploading}
          className="bg-[#161b22] border-border/50 text-foreground file:bg-primary file:text-primary-foreground file:border-0"
        />
        {formData.image_url && (
          <div className="mt-2">
            <img src={formData.image_url} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-border/50" />
            <p className="text-xs text-green-400 mt-1">✓ Image uploaded</p>
          </div>
        )}
      </div>
      <div>
        <Label className="text-foreground">Demo URL</Label>
        <Input 
          value={formData.demo_url} 
          onChange={e => setFormData({...formData, demo_url: e.target.value})}
          placeholder="https://demo.example.com"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground">GitHub URL</Label>
        <Input 
          value={formData.github_url} 
          onChange={e => setFormData({...formData, github_url: e.target.value})}
          placeholder="https://github.com/..."
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground">Technologies (comma-separated)</Label>
        <Input 
          value={formData.technologies} 
          onChange={e => setFormData({...formData, technologies: e.target.value})} 
          placeholder="Python, React, Docker"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Display Order</Label>
        <Input 
          type="number" 
          value={formData.display_order} 
          onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})}
          className="bg-[#161b22] border-border/50 text-foreground"
        />
      </div>
      <div className="flex items-center gap-3">
        <Switch 
          checked={formData.featured} 
          onCheckedChange={checked => setFormData({...formData, featured: checked})} 
        />
        <Label className="text-foreground">Featured</Label>
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </form>
  );
};
