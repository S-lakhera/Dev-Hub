import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X } from "lucide-react";

const GlobalOnboardingModal = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [bio, setBio] = useState("");
    const [skillsInput, setSkillsInput] = useState("");
    const [skills, setSkills] = useState([]);
    const [socialLinks, setSocialLinks] = useState({ github: "", linkedin: "", twitter: "", portfolio: "" });

    const [profileFile, setProfileFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [bannerFile, setBannerFile] = useState(null);
    const [bannerPreview, setBannerPreview] = useState("");


    useEffect(() => {
        if (user) {
            if (!user.skills || user.skills.length === 0) {
                setIsOpen(true);
            }
        }
    }, [user]);

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

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === "profile") {
                setProfileFile(file);
                setProfilePreview(URL.createObjectURL(file));
            } else if (type === "banner") {
                setBannerFile(file);
                setBannerPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("skills", JSON.stringify(skills));
        formData.append("socialLinks", JSON.stringify(socialLinks));

        if (profileFile) formData.append("profilePicture", profileFile);
        if (bannerFile) formData.append("bannerImage", bannerFile);

        try {
            const { data } = await api.patch("/users/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Profile completed successfully! 🎉");
            setUser(data.user);
            setIsOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Onboarding failed");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-xl max-h-[90vh] min-w-lg bg-white dark:bg-slate-900 border dark:border-slate-800 text-slate-900 dark:text-slate-50 overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold"> Complete Your Profile</DialogTitle>
                    <DialogDescription className="dark:text-slate-400">
                        Set up your developer ecosystem so others can discover your creations.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                    <div className="space-y-2">
                        <label className=" text-sm font-semibold">Profile Branding</label>
                        <div className="relative border dark:border-slate-800 rounded-xl overflow-hidden h-28 bg-slate-100 dark:bg-slate-950 mt-1">
                            {bannerPreview ? (
                                <img src={bannerPreview} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-linear-to-r from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-xs text-muted-foreground">No Banner Selected</div>
                            )}
                            <label className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full cursor-pointer transition-colors shadow">
                                <Camera size={14} />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "banner")} />
                            </label>

                            <div className="absolute bottom-2 left-4 group w-14 h-14">
                                <div className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200">
                                    {profilePreview ? <img src={profilePreview} className="w-full h-full object-cover" /> 
                                    : <img src={user?.profilePicture} className="w-full h-full object-cover" />}
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
                            className="mt-1 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 resize-none text-slate-900 dark:text-slate-100"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold">Skills (required)</label>
                        <Input
                            required
                            value={skillsInput}
                            onChange={(e) => setSkillsInput(e.target.value)}
                            onKeyDown={handleAddSkill}
                            placeholder="Press Enter to add skills (React, Node...)"
                            className=" mt-1 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
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
                        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Skip</Button>
                        <Button type="submit" disabled={isUpdating}>{isUpdating ? "Saving..." : "Save & Continue"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GlobalOnboardingModal;