import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const createProjectApi = async (formData) => {
  // Multipart form-data 
  const { data } = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const useProjectUpload = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  
  // Image states
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: () => {
      toast.success("Project published successfully! 🎉");
      queryClient.invalidateQueries(["projectsFeed"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload project");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = techInput.trim().replace(/,/g, "");
      if (trimmedValue && !techStack.includes(trimmedValue)) {
        setTechStack([...techStack, trimmedValue]);
        setTechInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTechStack(techStack.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (techStack.length === 0) {
      return toast.error("Please add at least one tech stack tag");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("githubLink", githubLink);
    formData.append("liveLink", liveLink);
    formData.append("techStack", JSON.stringify(techStack)); 
    
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    
    mutate(formData);
  };

  return {
    title, setTitle,
    description, setDescription,
    githubLink, setGithubLink,
    liveLink, setLiveLink,
    imagePreview, handleImageChange,
    techInput, setTechInput,
    techStack, handleKeyDown, removeTag,
    handleSubmit, isPending,
  };
};