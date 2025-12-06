import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AchievementFormProps {
  onSuccess: () => void;
}

export const AchievementForm = ({ onSuccess }: AchievementFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    icon_name: "",
    display_order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('achievements').insert(formData);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Achievement added successfully" });
    setFormData({ title: "", description: "", date: "", icon_name: "", display_order: 0 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-foreground">Title</Label>
        <Input 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          placeholder="e.g., First Place in CTF"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Description</Label>
        <Textarea 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})}
          placeholder="Brief description of the achievement"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Date</Label>
        <Input 
          type="date" 
          value={formData.date} 
          onChange={e => setFormData({...formData, date: e.target.value})}
          className="bg-[#161b22] border-border/50 text-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Icon Name (lucide-react)</Label>
        <Input 
          value={formData.icon_name} 
          onChange={e => setFormData({...formData, icon_name: e.target.value})} 
          placeholder="Trophy, Award, etc."
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
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
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-2" />
        Add Achievement
      </Button>
    </form>
  );
};
