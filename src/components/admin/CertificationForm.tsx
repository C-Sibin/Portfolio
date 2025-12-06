import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CertificationFormProps {
  onSuccess: () => void;
}

export const CertificationForm = ({ onSuccess }: CertificationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issue_date: "",
    credential_id: "",
    credential_url: "",
    display_order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('certifications').insert(formData);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Certification added successfully" });
    setFormData({ title: "", issuer: "", issue_date: "", credential_id: "", credential_url: "", display_order: 0 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-foreground">Title</Label>
        <Input 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          placeholder="e.g., AWS Solutions Architect"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Issuer</Label>
        <Input 
          value={formData.issuer} 
          onChange={e => setFormData({...formData, issuer: e.target.value})} 
          placeholder="e.g., Amazon Web Services"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Issue Date</Label>
        <Input 
          type="date" 
          value={formData.issue_date} 
          onChange={e => setFormData({...formData, issue_date: e.target.value})}
          className="bg-[#161b22] border-border/50 text-foreground"
          required 
        />
      </div>
      <div>
        <Label className="text-foreground">Credential ID</Label>
        <Input 
          value={formData.credential_id} 
          onChange={e => setFormData({...formData, credential_id: e.target.value})}
          placeholder="Optional"
          className="bg-[#161b22] border-border/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground">Credential URL</Label>
        <Input 
          value={formData.credential_url} 
          onChange={e => setFormData({...formData, credential_url: e.target.value})}
          placeholder="Optional"
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
        Add Certificate
      </Button>
    </form>
  );
};
