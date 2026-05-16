import { useProjectsFeed } from "../hooks/useProjectsFeed";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Terminal, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa"; // React Icons use kiya for GitHub
import { Link } from "react-router";

const ProjectFeed = () => {
  const {
    searchQuery,
    setSearchQuery,
    techFilter,
    setTechFilter,
    projects,
    isLoading
  } = useProjectsFeed();

  return (
    <div className="space-y-6">
      {/* Search and Discovery Section */}
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
          <Input
            placeholder="Search projects by title..."
            className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-64">
          <Terminal className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
          <Input
            placeholder="Filter by Tech Stack (e.g. React)..."
            className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-500"
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="animate-pulse h-85 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <p className="text-muted-foreground dark:text-slate-400 text-lg">No projects found matching your criteria.</p>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md dark:hover:shadow-slate-900/50 transition-all duration-200 rounded-xl overflow-hidden">
              <CardHeader className="p-0 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={project.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"}
                  alt={project.title}
                  className="w-full h-60 object-cover"
                />
              </CardHeader>

              <CardContent className="flex-1 p-4 space-y-3">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50 line-clamp-1">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack?.map((tech, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-200/50 dark:border-slate-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto transition-colors duration-200">
                {/* Author Info */}
                <Link
                  to={`/profile/${project.owner?._id}`}
                  className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
                >
                  <Avatar className="h-7 w-7 border border-slate-200 dark:border-slate-700 group-hover:border-primary transition-colors">
                    <AvatarImage src={project.owner?.profilePicture} />
                    <AvatarFallback className="dark:bg-slate-800 dark:text-slate-300 text-xs">
                      {project.owner?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors line-clamp-1">
                    {project.owner?.name}
                  </span>
                </Link>

                {/* External Links */}
                <div className="flex gap-1">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800">
                        <FaGithub size={18} />
                      </Button>
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800">
                        <ExternalLink size={16} />
                      </Button>
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectFeed;