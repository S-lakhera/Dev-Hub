import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X } from "lucide-react";

const ProfileEditModal = ({ isOpen, setIsOpen, hookProps }) => {
  const {
    profileUser,
    bio, setBio,
    skillsInput, setSkillsInput,
    skills, setSkills,
    socialLinks, setSocialLinks,
    profilePreview, setProfilePreview,
    bannerPreview, setBannerPreview,
    handleFileChange, handleSave, isUpdating
  } = hookProps;

  useEffect(() => {
    if (profileUser && isOpen) {
      setBio(profileUser.bio || "");
      setSkills(profileUser.skills || []);
      setProfilePreview(profileUser.profilePicture || "");
      setBannerPreview(profileUser.bannerImage || "");
      setSocialLinks({
        github: profileUser.socialLinks?.github || "",
        linkedin: profileUser.socialLinks?.linkedin || "",
        twitter: profileUser.socialLinks?.twitter || "",
        portfolio: profileUser.socialLinks?.portfolio || ""
      });
    }
  }, [profileUser, isOpen]);

  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = skillsInput.trim().replace(/,/g, "");
      if (trimmed && !skills.includes(trimmed)) {
        setSkills([...skills, trimmed]);
        setSkillsInput("");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] min-w-lg bg-white dark:bg-slate-900 border dark:border-slate-800 text-slate-900 dark:text-slate-50 overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription className="dark:text-slate-400">Update your profile details and branding.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleSave(e, () => setIsOpen(false))} className="space-y-5 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Profile Branding</label>
            <div className="relative border dark:border-slate-800 rounded-xl overflow-hidden h-28 bg-slate-100 dark:bg-slate-950">
              {bannerPreview ? (
                <img src={bannerPreview} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-linear-to-r from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-xs text-muted-foreground">No Banner Selected</div>
              )}
              <label className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full cursor-pointer transition-colors shadow">
                <Camera size={14} />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "banner")} />
              </label>
              <div className="absolute bottom-2 left-4 group w-16 h-16">
                <div className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200">
                  {profilePreview ? <img src={profilePreview} className="w-full h-full object-cover" /> : null}
                </div>
                <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer opacity-100 transition-opacity">
                  <Camera className="text-white" size={12} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "profile")} />
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Developer Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your tech stack journey..."
              rows={2}
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 resize-none text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Skills</label>
            <Input
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Press Enter to add skills"
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {skills.map((skill, idx) => (
                <span key={idx} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                  {skill}
                  <button type="button" onClick={() => setSkills(skills.filter((s) => s !== skill))}><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2 border-t dark:border-slate-800 pt-3">
            <label className="text-sm font-semibold">Social Portfolio Links</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="GitHub Profile URL"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              />
              <Input
                placeholder="LinkedIn Profile URL"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              />
              <Input
                placeholder="Twitter / X Profile URL"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              />
              <Input
                placeholder="Personal Portfolio URL"
                value={socialLinks.portfolio}
                onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t dark:border-slate-800">
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isUpdating}>{isUpdating ? "Saving..." : "Save Changes"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;