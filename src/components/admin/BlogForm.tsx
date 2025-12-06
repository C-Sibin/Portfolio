import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogFormProps {
  onSuccess: () => void;
}

export const BlogForm = ({ onSuccess }: BlogFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin",
    image_url: "",
    tags: "",
    slug: "",
    published: false
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
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
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
    const { error } = await supabase.from('blog_posts').insert({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim())
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Blog post added" });
    setFormData({ title: "", excerpt: "", content: "", author: "Admin", image_url: "", tags: "", slug: "", published: false });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-foreground">Title</Label>
        <Input 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          placeholder="Blog post title"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Slug</Label>
        <Input 
          value={formData.slug} 
          onChange={e => setFormData({...formData, slug: e.target.value})} 
          placeholder="my-blog-post"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Excerpt</Label>
        <Textarea 
          value={formData.excerpt} 
          onChange={e => setFormData({...formData, excerpt: e.target.value})}
          placeholder="Brief summary"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Content</Label>
        <Textarea 
          value={formData.content} 
          onChange={e => setFormData({...formData, content: e.target.value})} 
          rows={6}
          placeholder="Full blog content"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Author</Label>
        <Input 
          value={formData.author} 
          onChange={e => setFormData({...formData, author: e.target.value})}
          className="bg-[#161b22] border-border/50 text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground">Blog Image</Label>
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
        <Label className="text-foreground">Tags (comma-separated)</Label>
        <Input 
          value={formData.tags} 
          onChange={e => setFormData({...formData, tags: e.target.value})} 
          placeholder="security, hacking, tools"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center gap-3">
        <Switch 
          checked={formData.published} 
          onCheckedChange={checked => setFormData({...formData, published: checked})} 
        />
        <Label className="text-foreground">Published</Label>
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-2" />
        Add Blog Post
      </Button>
    </form>
  );
};
