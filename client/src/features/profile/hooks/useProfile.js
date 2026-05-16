import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import { toast } from "react-hot-toast";

const fetchUserProfile = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const { data } = await api.get(`/users/profile/${userId}`);
  return data;
};

const updateProfileApi = async (formData) => {
  // CORRECTION: Ab isko directly raw formData milega bina kisi object encapsulation ke
  const { data } = await api.patch("/users/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const useProfile = (userId, loggedInUserId) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState({ title: "", desc: "" });

  const [bio, setBio] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [socialLinks, setSocialLinks] = useState({ github: "", linkedin: "", twitter: "", portfolio: "" });

  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  const { data: profileUser, isLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: fetchUserProfile,
    enabled: !!userId,
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      toast.success("Profile updated successfully! 🎉");
      queryClient.invalidateQueries(["userProfile", userId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

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

  const handleSave = (e, successCallback) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("skills", JSON.stringify(skills));
    formData.append("socialLinks", JSON.stringify(socialLinks));
    
    if (profileFile) formData.append("profilePicture", profileFile);
    if (bannerFile) formData.append("bannerImage", bannerFile);

    // CORRECTION: mutate ko pehla parameter raw formData denge. 
    // Callback ko second parameter ke onSuccess event handler me fire karenge.
    updateProfile(formData, {
      onSuccess: () => {
        if (successCallback) successCallback();
      }
    });
  };

  return {
    profileUser, isLoading, showModal, setShowModal, modalType, setModalType,
    bio, setBio, skillsInput, setSkillsInput, skills, setSkills,
    socialLinks, setSocialLinks, profilePreview, setProfilePreview, bannerPreview, setBannerPreview,
    handleFileChange, handleSave, isUpdating,
    isOwner: userId === loggedInUserId
  };
};