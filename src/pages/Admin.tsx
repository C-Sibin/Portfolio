import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, MessageSquare, Calendar, LogOut, Users, FileText, Award, Code, Trophy, Trash2, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { BlogForm } from "@/components/admin/BlogForm";
import { CertificationForm } from "@/components/admin/CertificationForm";
import { SkillForm } from "@/components/admin/SkillForm";
import { AchievementForm } from "@/components/admin/AchievementForm";
import { ResumeForm } from "@/components/admin/ResumeForm";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Project {
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

interface BlogPost {
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

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_id: string | null;
  credential_url: string | null;
  display_order: number;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon_name: string | null;
  display_order: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon_name: string | null;
  display_order: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'admin' | 'content'>('admin');
  const [adminTab, setAdminTab] = useState('messages');
  const [contentTab, setContentTab] = useState('skills');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const fetchAllData = async () => {
    try {
      const [messagesRes, projectsRes, blogRes, certsRes, skillsRes, achievementsRes] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('display_order'),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('certifications').select('*').order('display_order'),
        supabase.from('skills').select('*').order('display_order'),
        supabase.from('achievements').select('*').order('display_order')
      ]);

      if (messagesRes.error) throw messagesRes.error;
      if (projectsRes.error) throw projectsRes.error;
      if (blogRes.error) throw blogRes.error;
      if (certsRes.error) throw certsRes.error;
      if (skillsRes.error) throw skillsRes.error;
      if (achievementsRes.error) throw achievementsRes.error;

      setMessages(messagesRes.data || []);
      setProjects(projectsRes.data || []);
      setBlogPosts(blogRes.data || []);
      setCertifications(certsRes.data || []);
      setSkills(skillsRes.data || []);
      setAchievements(achievementsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Project deleted successfully" });
      fetchAllData();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Blog post deleted successfully" });
      fetchAllData();
    }
  };

  const handleDeleteCertification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Certification deleted successfully" });
      fetchAllData();
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Skill deleted successfully" });
      fetchAllData();
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Achievement deleted successfully" });
      fetchAllData();
    }
  };

  // Get unique contacts from messages
  const uniqueContacts = messages.reduce((acc, msg) => {
    if (!acc.find(c => c.email === msg.email)) {
      acc.push({ name: msg.name, email: msg.email });
    }
    return acc;
  }, [] as { name: string; email: string }[]);

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <nav className="border-b border-border/50 bg-[#0d1117]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                {view === 'admin' ? 'Admin Panel' : 'Content Manager'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setView(view === 'admin' ? 'content' : 'admin')}
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <LayoutGrid className="w-4 h-4" />
                {view === 'admin' ? 'Content Manager' : 'Admin Panel'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {view === 'admin' ? (
          /* Admin Panel - Messages & Contacts */
          <Tabs value={adminTab} onValueChange={setAdminTab} className="w-full">
            <TabsList className="bg-transparent border-b border-border/50 rounded-none w-auto h-auto p-0 mb-8">
              <TabsTrigger 
                value="messages" 
                className="gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                <Mail className="w-4 h-4" />
                Messages ({messages.length})
              </TabsTrigger>
              <TabsTrigger 
                value="contacts" 
                className="gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                <Users className="w-4 h-4" />
                Contacts ({uniqueContacts.length})
              </TabsTrigger>
            </TabsList>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inbox */}
                <div className="lg:col-span-1">
                  <h3 className="text-primary font-bold text-lg mb-4">Inbox ({messages.length})</h3>
                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <div className="bg-[#161b22] border border-border/30 rounded-lg p-6 text-center text-muted-foreground">
                        No messages yet
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div 
                          key={message.id} 
                          onClick={() => setSelectedMessage(message)}
                          className={`bg-[#161b22] border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 ${selectedMessage?.id === message.id ? 'border-primary' : 'border-border/30'}`}
                        >
                          <p className="font-semibold text-foreground">{message.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(message.created_at)}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2">
                  <div className="bg-[#161b22] border border-border/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                    {selectedMessage ? (
                      <div className="w-full">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{selectedMessage.name}</h3>
                            <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                              {selectedMessage.email}
                            </a>
                          </div>
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(selectedMessage.created_at)}
                          </span>
                        </div>
                        <div className="bg-[#0d1117] rounded-lg p-6 border border-border/30">
                          <p className="text-foreground/90 whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>
                        <Button 
                          className="mt-4 bg-primary hover:bg-primary/90"
                          onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                        >
                          Reply via Email
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Mail className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a message to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact List */}
                <div className="lg:col-span-1">
                  <div className="border border-primary/50 rounded-lg p-6">
                    <h3 className="text-primary font-bold text-lg mb-4">Contact List</h3>
                    {uniqueContacts.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No contacts yet</p>
                    ) : (
                      <div className="space-y-3">
                        {uniqueContacts.map((contact, idx) => (
                          <div key={idx} className="bg-[#161b22] border border-border/30 rounded-lg p-4">
                            <p className="font-semibold text-foreground">{contact.name}</p>
                            <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
                              {contact.email}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-2">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="bg-[#161b22] border border-border/30 rounded-lg p-6">
                      <p className="text-muted-foreground text-sm">Total Messages</p>
                      <p className="text-3xl font-bold text-primary">{messages.length}</p>
                    </div>
                    <div className="bg-[#161b22] border border-border/30 rounded-lg p-6">
                      <p className="text-muted-foreground text-sm">Unique Contacts</p>
                      <p className="text-3xl font-bold text-green-500">{uniqueContacts.length}</p>
                    </div>
                    <div className="bg-[#161b22] border border-border/30 rounded-lg p-6">
                      <p className="text-muted-foreground text-sm">Latest Message</p>
                      <p className="text-lg font-semibold text-foreground">
                        {messages.length > 0 ? formatDate(messages[0].created_at) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          /* Content Manager */
          <Tabs value={contentTab} onValueChange={setContentTab} className="w-full">
            <TabsList className="bg-transparent border-b border-border/50 rounded-none w-auto h-auto p-0 mb-8">
              <TabsTrigger 
                value="skills" 
                className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="certs" 
                className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                Certificates
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="blogs" 
                className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                Blogs
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="resume" 
                className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent bg-transparent text-muted-foreground"
              >
                Resume
              </TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-primary/50 rounded-lg p-6 bg-[#0d1117]">
                  <h3 className="text-primary font-bold text-lg mb-4">Add New Skill</h3>
                  <SkillForm onSuccess={fetchAllData} />
                </div>
                <div className="border border-border/30 rounded-lg p-6 bg-[#161b22]">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Skills List ({skills.length})</h3>
                  {skills.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No skills added yet</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {skills.map(skill => (
                        <div key={skill.id} className="bg-[#0d1117] border border-border/30 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{skill.name}</p>
                            <p className="text-sm text-muted-foreground">{skill.category} • {skill.proficiency}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(skill.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certs">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-primary/50 rounded-lg p-6 bg-[#0d1117]">
                  <h3 className="text-primary font-bold text-lg mb-4">Add New Certificate</h3>
                  <CertificationForm onSuccess={fetchAllData} />
                </div>
                <div className="border border-border/30 rounded-lg p-6 bg-[#161b22]">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Certificates List ({certifications.length})</h3>
                  {certifications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No certificates added yet</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {certifications.map(cert => (
                        <div key={cert.id} className="bg-[#0d1117] border border-border/30 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{cert.title}</p>
                            <p className="text-sm text-muted-foreground">{cert.issuer} • {new Date(cert.issue_date).toLocaleDateString()}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCertification(cert.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-primary/50 rounded-lg p-6 bg-[#0d1117]">
                  <h3 className="text-primary font-bold text-lg mb-4">Add New Achievement</h3>
                  <AchievementForm onSuccess={fetchAllData} />
                </div>
                <div className="border border-border/30 rounded-lg p-6 bg-[#161b22]">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Achievements List ({achievements.length})</h3>
                  {achievements.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No achievements added yet</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {achievements.map(achievement => (
                        <div key={achievement.id} className="bg-[#0d1117] border border-border/30 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-foreground">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteAchievement(achievement.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-primary/50 rounded-lg p-6 bg-[#0d1117]">
                  <h3 className="text-primary font-bold text-lg mb-4">Add New Blog Post</h3>
                  <BlogForm onSuccess={fetchAllData} />
                </div>
                <div className="border border-border/30 rounded-lg p-6 bg-[#161b22]">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Blog Posts ({blogPosts.length})</h3>
                  {blogPosts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No blog posts added yet</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {blogPosts.map(post => (
                        <div key={post.id} className="bg-[#0d1117] border border-border/30 rounded-lg p-4 flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{post.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                            <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteBlog(post.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-primary/50 rounded-lg p-6 bg-[#0d1117]">
                  <h3 className="text-primary font-bold text-lg mb-4">Add New Project</h3>
                  <ProjectForm onSuccess={fetchAllData} />
                </div>
                <div className="border border-border/30 rounded-lg p-6 bg-[#161b22]">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Projects List ({projects.length})</h3>
                  {projects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No projects added yet</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {projects.map(project => (
                        <div key={project.id} className="bg-[#0d1117] border border-border/30 rounded-lg p-4 flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{project.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                            <div className="flex gap-1 flex-wrap mt-2">
                              {project.technologies.slice(0, 3).map(tech => (
                                <span key={tech} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">{tech}</span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{project.technologies.length - 3}</span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume">
              <div className="max-w-xl">
                <div className="border border-primary/50 rounded-lg p-6 bg-[#0d1117]">
                  <h3 className="text-primary font-bold text-lg mb-4">Update Resume</h3>
                  <ResumeForm onSuccess={fetchAllData} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Admin;
