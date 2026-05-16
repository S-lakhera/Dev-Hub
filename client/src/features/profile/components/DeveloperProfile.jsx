import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { useProfile } from "../hooks/useProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Code, User, Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ProfileEditModal from "./ProfileEditModal";

const DeveloperProfile = () => {
  const { id: userId } = useParams();
  const { user: loggedInUser } = useContext(AuthContext);

  const hookProps = useProfile(userId, loggedInUser?._id);
  const { profileUser, isLoading, isOwner, showModal, setShowModal, modalType, setModalType } = hookProps;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const triggerEditModal = () => {
    setModalType({
      title: "⚙️ Edit Profile Settings",
      desc: "Modify your professional presence and update portfolio configurations."
    });
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <ProfileEditModal 
        isOpen={showModal} 
        setIsOpen={setShowModal} 
        hookProps={hookProps} 
        title={modalType.title}
        description={modalType.desc}
      />

      <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-sm">
        <div className="h-36 relative bg-slate-200 dark:bg-slate-950 w-full overflow-hidden">
          {profileUser?.bannerImage ? (
            <img src={profileUser.bannerImage} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-900 dark:to-indigo-900" />
          )}
        </div>

        <CardContent className="relative pt-0 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-4 gap-4">
            <Avatar className="w-28 h-28 border-4 border-white dark:border-slate-900 shadow-md">
              <AvatarImage src={profileUser?.profilePicture} />
              <AvatarFallback className="text-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {profileUser?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {isOwner && (
              <Button onClick={triggerEditModal} variant="outline" className="gap-1.5 self-start sm:self-auto dark:border-slate-700 dark:text-slate-200">
                <Edit2 size={16} /> Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{profileUser?.name}</h2>
                <p className="text-sm text-muted-foreground dark:text-slate-400">{profileUser?.email}</p>
              </div>
              
              {profileUser?.socialLinks && (
                <div className="flex items-center gap-2">
                  {profileUser.socialLinks.github && (
                    <a href={profileUser.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 border dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary dark:hover:border-primary transition-all">
                      <FaGithub size={18} />
                    </a>
                  )}
                  {profileUser.socialLinks.linkedin && (
                    <a href={profileUser.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 border dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary dark:hover:border-primary transition-all">
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {profileUser.socialLinks.twitter && (
                    <a href={profileUser.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 border dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary dark:hover:border-primary transition-all">
                      <FaXTwitter size={18} />
                    </a>
                  )}
                  {profileUser.socialLinks.portfolio && (
                    <a href={profileUser.socialLinks.portfolio} target="_blank" rel="noreferrer" className="p-2 border dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary dark:hover:border-primary transition-all">
                      <Globe size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <User size={15} /> About Me
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                {profileUser?.bio || "No bio added yet. Click Edit Profile to tell the world about your journey!"}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Code size={15} /> Skills & Core Tech
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profileUser?.skills?.length > 0 ? (
                  profileUser.skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-200/40 dark:border-slate-700/40">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic">No skills listed yet.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperProfile;