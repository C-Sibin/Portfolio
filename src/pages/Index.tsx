import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Award, Trophy, Lock, BookOpen, Download, Github, Linkedin, Twitter, Mail, Phone, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/ContactForm";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BlogCard } from "@/components/BlogCard";
import { usePortfolioData } from "@/hooks/usePortfolioData";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import vaptIcon from "@/assets/vapt-icon.png";
import TypingAnimation from "@/components/TypingAnimation";
import profilePhoto from "@/assets/Sibin.png";
import webPentestIcon from "@/assets/web-pentest-icon.png";
import networkPentestIcon from "@/assets/network-pentest-icon.png";
import apiPentestIcon from "@/assets/api-pentest-icon.png";
import androidPentestIcon from "@/assets/android-pentest-icon.png";
import iosPentestIcon from "@/assets/ios-pentest-icon.png";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { projects, blogPosts, certifications, skills, achievements, resume, loading } = usePortfolioData();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-foreground relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/98 backdrop-blur-md border-b border-border z-50 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sibin</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-all hover:scale-110">About</button>
              <button onClick={() => scrollToSection("platforms")} className="hover:text-primary transition-all hover:scale-110">Platforms</button>
              <button onClick={() => scrollToSection("skills")} className="hover:text-primary transition-all hover:scale-110">Skills</button>
              <button onClick={() => scrollToSection("technologies")} className="hover:text-primary transition-all hover:scale-110">Technologies</button>
              <button onClick={() => scrollToSection("certifications")} className="hover:text-primary transition-all hover:scale-110">Certifications</button>
              <button onClick={() => scrollToSection("projects")} className="hover:text-primary transition-all hover:scale-110">Projects</button>
              <button onClick={() => scrollToSection("achievements")} className="hover:text-primary transition-all hover:scale-110">Achievements</button>
              <button onClick={() => scrollToSection("blog")} className="hover:text-primary transition-all hover:scale-110">Blog</button>
              <button onClick={() => scrollToSection("resume")} className="hover:text-primary transition-all hover:scale-110">Resume</button>
              <button onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-primary via-accent to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all shadow-lg">Contact</button>
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeSwitcher />
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/98 backdrop-blur-md border-b border-border shadow-xl">
            <div className="container mx-auto px-6 py-4 space-y-2">
              <button onClick={() => scrollToSection("about")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">About</button>
              <button onClick={() => scrollToSection("platforms")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Platforms</button>
              <button onClick={() => scrollToSection("skills")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Skills</button>
              <button onClick={() => scrollToSection("technologies")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Technologies</button>
              <button onClick={() => scrollToSection("certifications")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Certifications</button>
              <button onClick={() => scrollToSection("projects")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Projects</button>
              <button onClick={() => scrollToSection("achievements")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Achievements</button>
              <button onClick={() => scrollToSection("blog")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Blog</button>
              <button onClick={() => scrollToSection("resume")} className="w-full text-left px-4 py-3 hover:bg-secondary rounded-lg">Resume</button>
              <button onClick={() => scrollToSection("contact")} className="w-full text-left px-4 py-3 bg-gradient-to-r from-primary via-accent to-purple-600 text-white rounded-lg">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10 overflow-hidden">
        <div className="container mx-auto text-center max-w-4xl relative">
          <div className="relative inline-block mb-6">
            <div className="w-48 h-48 rounded-full border-4 border-primary mx-auto bg-gradient-to-br from-card to-secondary flex items-center justify-center animate-glow">
              <img src={profilePhoto} alt="Sibin C" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up glow-text">
            <span className="text-primary">Sibin C</span>
          </h1>
          <p className="text-2xl text-primary mb-8 animate-fade-in-up h-8" style={{ animationDelay: "0.2s" }}>
            <TypingAnimation words={["Penetration Tester", "Bug Bounty Hunter"]} />
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
      </section>

      {/* Tech Logos Row */}
      <section className="py-8 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="animate-float bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "0s" }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-10 h-10" />
            </div>
            <div className="animate-float-slow bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "0.2s" }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-10 h-10" />
            </div>
            <div className="animate-float-reverse bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "0.4s" }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-10 h-10" />
            </div>
            <div className="animate-float bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "0.6s" }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg" alt="RedHat" className="w-10 h-10" />
            </div>
            <div className="animate-float-slow bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "0.8s" }}>
              <img src="https://www.wireshark.org/assets/icons/wireshark-fin.png" alt="Wireshark" className="w-10 h-10" />
            </div>
            <div className="animate-float-reverse bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "1s" }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" className="w-10 h-10" />
            </div>
            <div className="animate-float bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "1.2s" }}>
              <img src="https://nmap.org/images/nmap-logo-256x256.png" alt="Nmap" className="w-10 h-10" />
            </div>
            <div className="animate-float bg-card/90 backdrop-blur-sm p-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/20" style={{ animationDelay: "1.2s" }}>
              <img src="https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg" alt="Nmap" className="w-10 h-10" />
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-20 px-6 bg-card/30 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8 text-primary animate-fade-in-up glow-text">About Me</h2>
          <p className="text-center text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Dedicated cybersecurity professional with expertise in penetration testing, incident response, and security architecture.
          </p>
        </div>
      </section>

      {/* Platform Rankings */}
      <section id="platforms" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Platform Rankings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: "HackTheBox", 
                logo: "https://www.hackthebox.com/images/logo-htb.svg",
                rank: "Pro Hacker",
                points: "Coming Soon",
                profile: "#",
                color: "from-green-500 to-green-700"
              },
              { 
                name: "TryHackMe", 
                logo: "https://tryhackme.com/img/favicon.png",
                rank: "Elite",
                points: "Coming Soon",
                profile: "#",
                color: "from-red-500 to-red-700"
              },
              { 
                name: "PentesterLab", 
                logo: "https://pentesterlab.com/favicon.ico",
                rank: "Advanced",
                points: "Coming Soon",
                profile: "#",
                color: "from-blue-500 to-blue-700"
              },
              { 
                name: "PortSwigger Academy", 
                logo: "https://portswigger.net/burp/images/header-logo-orange.svg",
                rank: "Practitioner",
                points: "Coming Soon",
                profile: "#",
                color: "from-orange-500 to-orange-700"
              },
              { 
                name: "VulnHub", 
                logo: "https://www.vulnhub.com/favicon.ico",
                rank: "Active",
                points: "Coming Soon",
                profile: "#",
                color: "from-purple-500 to-purple-700"
              },
              { 
                name: "PicoCTF", 
                logo: "https://picoctf.org/favicon.ico",
                rank: "Competitor",
                points: "Coming Soon",
                profile: "#",
                color: "from-cyan-500 to-cyan-700"
              },
            ].map((platform, index) => (
              <Card key={platform.name} className="group bg-card border-primary/30 p-6 hover:border-primary transition-all hover:scale-105 glow-card cursor-pointer animate-fade-in-up overflow-hidden relative" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center p-2">
                      <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{platform.name}</h3>
                      <Badge variant="outline" className="text-xs border-primary/50 text-primary">{platform.rank}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Points: {platform.points}</p>
                    <a href={platform.profile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                      View Profile →
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - Pentesting Services */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "VAPT", icon: vaptIcon },
              { name: "Web Pentesting", icon: webPentestIcon },
              { name: "Network Pentesting", icon: networkPentestIcon },
              { name: "API Pentesting", icon: apiPentestIcon },
              { name: "Android Pentesting", icon: androidPentestIcon },
              { name: "iOS Pentesting", icon: iosPentestIcon },
            ].map((skill, index) => (
              <Card key={skill.name} className="group bg-card border-primary/30 p-6 hover:border-primary transition-all hover:scale-110 glow-card cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center">
                  <img src={skill.icon} alt={skill.name} className="w-14 h-14 mx-auto mb-3 object-contain rounded-lg" />
                  <p className="text-sm font-semibold">{skill.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section id="technologies" className="py-20 px-6 bg-card/30 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Technologies</h2>
          
          {/* Programming Languages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-center mb-6 text-muted-foreground">Languages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
              ].map((tech, index) => (
                <Card key={tech.name} className="group bg-card border-primary/30 p-4 hover:border-primary transition-all hover:scale-110 glow-card cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-center">
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 mx-auto mb-2 object-contain" />
                    <p className="text-xs font-semibold">{tech.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Operating Systems */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-center mb-6 text-muted-foreground">Operating Systems</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
                { name: "Kali Linux", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg" },
                { name: "RedHat", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg" },
                { name: "Windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
                { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
                { name: "iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
              ].map((tech, index) => (
                <Card key={tech.name} className="group bg-card border-primary/30 p-4 hover:border-primary transition-all hover:scale-110 glow-card cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-center">
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 mx-auto mb-2 object-contain" />
                    <p className="text-xs font-semibold">{tech.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Tools */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-muted-foreground">Security Tools</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Burp Suite", icon: "https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg" },
                { name: "Nessus", icon: "https://cdn.brandfetch.io/idUAiB4pBI/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1762460382053" },
                { name: "Metasploit", icon: "https://www.kali.org/tools/metasploit-framework/images/metasploit-framework-logo.svg" },
                { name: "Nmap", icon: "https://nmap.org/images/nmap-logo-256x256.png" },
                { name: "Wireshark", icon: "https://www.wireshark.org/assets/icons/wireshark-fin.png" },
                { name: "OWASP ZAP", icon: "https://www.kali.org/tools/zaproxy/images/zaproxy-logo.svg" },
                { name: "Nikto", icon: "https://www.kali.org/tools/nikto/images/nikto-logo.svg" },
                { name: "SQLMap", icon: "https://www.kali.org/tools/sqlmap/images/sqlmap-logo.svg" },
                { name: "Hydra", icon: "https://www.kali.org/tools/hydra/images/hydra-logo.svg" },
                { name: "John the Ripper", icon: "https://www.kali.org/tools/john/images/john-logo.svg" },
                { name: "Netcat", icon: "https://www.kali.org/tools/netcat/images/netcat-logo.svg" },
                { name: "Autopsy", icon: "https://www.kali.org/tools/autopsy/images/autopsy-logo.svg" },
              ].map((tech, index) => (
                <Card key={tech.name} className="group bg-card border-primary/30 p-4 hover:border-primary transition-all hover:scale-110 glow-card cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="text-center">
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 mx-auto mb-2 object-contain" />
                    <p className="text-xs font-semibold">{tech.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Professional Certifications</h2>
          {loading ? (
            <div className="text-center">Loading certifications...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <Card key={cert.id} className="bg-card border-primary/50 p-8 hover:border-primary transition-colors glow-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">Issuer: {cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mb-4">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                  {cert.credential_id && <p className="text-xs text-muted-foreground">ID: {cert.credential_id}</p>}
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">View Credential →</a>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Security Projects</h2>
          {loading ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={project.id} className="group bg-card border-primary/50 overflow-hidden hover:border-primary transition-all glow-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  {project.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4"><Lock className="w-6 h-6 text-primary" /></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Live Demo →</a>}
                      {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">GitHub →</a>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-20 px-6 bg-card/30 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Professional Achievements</h2>
          {loading ? (
            <div className="text-center">Loading achievements...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={achievement.id} className="bg-card border-primary/50 p-8 hover:border-primary transition-colors glow-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Trophy className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground mb-3">{achievement.description}</p>
                  <p className="text-sm text-muted-foreground">Date: {new Date(achievement.date).toLocaleDateString()}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Latest Insights</h2>
          {loading ? (
            <div className="text-center">Loading blog posts...</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
              {blogPosts.length > 3 && (
                <div className="text-center mt-10">
                  <Link to="/blog">
                    <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      View All Blogs
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Resume Download */}
      <section id="resume" className="py-20 px-6 bg-card/30 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <Card className="bg-card border-primary/30 p-8 md:p-12 relative overflow-hidden glow-card animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="text-primary">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-primary">Download Resume</h3>
              </div>
              {resume ? (
                <a href={resume.file_url} download={resume.file_name} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                    <Download className="mr-2 w-5 h-5" />
                    Download PDF
                  </Button>
                </a>
              ) : (
                <Button size="lg" className="bg-primary/50 text-primary-foreground px-6 py-3" disabled>
                  <Download className="mr-2 w-5 h-5" />
                  No Resume Available
                </Button>
              )}
            </div>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-secondary/50 border border-border/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-primary mb-2">Professional Summary</h4>
                <p className="text-muted-foreground text-sm">Comprehensive overview of skills, experience, and achievements</p>
              </div>
              <div className="bg-secondary/50 border border-border/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-primary mb-2">Technical Skills</h4>
                <p className="text-muted-foreground text-sm">Detailed breakdown of technical expertise and certifications</p>
              </div>
              <div className="bg-secondary/50 border border-border/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-primary mb-2">Project Portfolio</h4>
                <p className="text-muted-foreground text-sm">Showcase of key projects and professional achievements</p>
              </div>
            </div>
            
            {/* Note */}
            <div className="bg-secondary/30 border-l-4 border-primary rounded-r-lg p-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Note: </span>
                The resume includes detailed information about my professional experience, technical skills, certifications, and notable achievements in cybersecurity.
              </p>
            </div>
            
            {/* Decorative diagonal gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-purple-600"></div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary animate-fade-in-up glow-text">Get In Touch</h2>
          
          <div className="space-y-12">
            <div>
              <ContactForm />
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-primary">Follow Me</h4>
              <div className="flex gap-4 justify-center">
                <a href="#" className="p-3 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all"><Github className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">Sibin C</span>
              </div>
              <p className="text-muted-foreground">Penetration Tester dedicated to securing digital infrastructure</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-primary">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection("about")} className="block text-muted-foreground hover:text-primary">About</button>
                <button onClick={() => scrollToSection("projects")} className="block text-muted-foreground hover:text-primary">Projects</button>
                <button onClick={() => scrollToSection("blog")} className="block text-muted-foreground hover:text-primary">Blog</button>
                <button onClick={() => scrollToSection("contact")} className="block text-muted-foreground hover:text-primary">Contact</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-primary">Follow Me</h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all"><Github className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-secondary hover:bg-primary hover:text-white rounded-lg transition-all"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-muted-foreground pt-8 border-t border-border">
            <p>&copy; 2024 Sibin C. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
