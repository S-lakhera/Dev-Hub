import { useProjectUpload } from "../hooks/useProjectUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Code2, ImageIcon, FolderPlus } from "lucide-react";

const ProjectUpload = () => {
  const {
    title, setTitle,
    description, setDescription,
    githubLink, setGithubLink,
    liveLink, setLiveLink,
    imagePreview, handleImageChange,
    techInput, setTechInput,
    techStack,
    handleKeyDown,
    removeTag,
    handleSubmit,
    isPending,
  } = useProjectUpload();

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <FolderPlus className="text-primary" /> Showcase Your Project
          </CardTitle>
          <CardDescription className="dark:text-slate-400">
            Share your hard work with the developer community.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/* Project Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Title *</label>
              <Input
                placeholder="e.g. DevHub Platform"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description *</label>
              <Textarea
                placeholder="What does your project do? What problem does it solve?"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 resize-none"
              />
            </div>

            {/* Tech Stack Array UI */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Code2 size={16} /> Tech Stack * <span className="text-xs font-normal text-muted-foreground">(Press Enter or Comma to add)</span>
              </label>
              <Input
                placeholder="React, Node.js, Tailwind..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
              {/* Dynamic Badges Block */}
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/60 rounded-lg">
                  {techStack.map((tech, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground text-xs px-2.5 py-1 rounded-md font-medium border border-primary/20">
                      {tech}
                      <button type="button" onClick={() => removeTag(tech)} className="hover:text-destructive transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">GitHub Repository Link</label>
                <Input
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Live Demo Link</label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Custom File Upload Uploader UI with Live Preview */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ImageIcon size={16} /> Project Cover Thumbnail *
              </label>
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-950/40 text-center transition-all duration-200 mb-5">
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border dark:border-slate-800">
                    <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => handleImageChange({ target: { files: [] } })} // Clear file trigger
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer py-6 w-full flex flex-col items-center justify-center">
                    <ImageIcon size={36} className="text-muted-foreground dark:text-slate-500 mb-2 animate-pulse" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Click to upload project cover image</span>
                    <span className="text-xs text-muted-foreground dark:text-slate-500 mt-1">Supports PNG, JPG, JPEG, WEBP</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      required 
                      onChange={handleImageChange} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t dark:border-slate-800 pt-4 flex justify-end gap-3">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto px-6">
              {isPending ? "Publishing & Uploading..." : "Publish Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProjectUpload;