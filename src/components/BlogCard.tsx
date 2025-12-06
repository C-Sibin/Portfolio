import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlogPost } from "@/hooks/usePortfolioData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 overflow-hidden group">
          {/* Featured Image */}
          <div className="h-48 overflow-hidden relative bg-secondary/30">
            {post.image_url && post.image_url.startsWith('http') ? (
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-primary/40 mx-auto mb-2" />
                  <span className="text-muted-foreground text-xs">Blog Article</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>
          
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.filter(tag => tag).slice(0, 2).map((tag) => (
                <Badge key={tag} className="bg-primary/20 text-primary border-primary/30">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* Read More */}
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
              Read Article
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
