import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SkillFormProps {
  onSuccess: () => void;
}

export const SkillForm = ({ onSuccess }: SkillFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: "intermediate" as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    icon_name: "",
    display_order: 0
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let logoUrl = formData.icon_name;
    
    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('skill-logos')
        .upload(fileName, logoFile);

      if (uploadError) {
        toast({ title: "Error uploading logo", description: uploadError.message, variant: "destructive" });
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from('skill-logos').getPublicUrl(fileName);
      logoUrl = publicUrl;
    }
    
    const { error } = await supabase.from('skills').insert({ ...formData, icon_name: logoUrl });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Skill added successfully" });
    setFormData({ name: "", category: "", proficiency: "intermediate", icon_name: "", display_order: 0 });
    setLogoFile(null);
    setLogoPreview(null);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-foreground">Skill Name</Label>
        <Input 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          placeholder="e.g., Python"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Category</Label>
        <Input 
          value={formData.category} 
          onChange={e => setFormData({...formData, category: e.target.value})} 
          placeholder="e.g., Programming"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Proficiency</Label>
        <Select value={formData.proficiency} onValueChange={(value: any) => setFormData({...formData, proficiency: value})}>
          <SelectTrigger className="bg-[#161b22] border-border/50 text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#161b22] border-border/50">
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-foreground">Skill Logo (Image)</Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handleLogoChange}
          className="bg-[#161b22] border-border/50 text-foreground file:bg-primary file:text-primary-foreground file:border-0"
        />
        {logoPreview && (
          <div className="mt-2">
            <img src={logoPreview} alt="Logo preview" className="w-16 h-16 object-contain border border-border/50 rounded bg-[#161b22]" />
          </div>
        )}
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
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-2" />
        Add Skill
      </Button>
    </form>
  );
};
