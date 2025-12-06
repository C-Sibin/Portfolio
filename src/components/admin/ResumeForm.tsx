import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ResumeFormProps {
  onSuccess: () => void;
}

export const ResumeForm = ({ onSuccess }: ResumeFormProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({ title: "Error", description: "Only PDF files are allowed", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const timestamp = Date.now();
      const uploadFileName = `${timestamp}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(uploadFileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('resumes').getPublicUrl(uploadFileName);
      
      setFileUrl(data.publicUrl);
      setFileName(file.name);
      
      toast({ title: "Success", description: "Resume uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload resume", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileUrl) {
      toast({ title: "Error", description: "Please upload a resume file", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from('resume').upsert({
      file_url: fileUrl,
      file_name: fileName,
      file_size: 0,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Success", description: "Resume updated successfully" });
    setFileUrl("");
    setFileName("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-foreground">Resume PDF</Label>
        <Input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange} 
          disabled={uploading}
          className="bg-[#161b22] border-border/50 text-foreground file:bg-primary file:text-primary-foreground file:border-0"
        />
        {fileUrl && (
          <div className="mt-3 p-4 bg-[#161b22] border border-border/50 rounded-lg">
            <p className="text-sm text-green-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {fileName}
            </p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block">
              Preview →
            </a>
          </div>
        )}
      </div>
      <Button type="submit" disabled={uploading || !fileUrl} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? "Uploading..." : "Update Resume"}
      </Button>
    </form>
  );
};
