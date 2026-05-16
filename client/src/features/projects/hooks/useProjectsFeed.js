import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

const fetchProjectsFeed = async ({ queryKey }) => {
  const [_, searchQuery, techFilter] = queryKey;
  let url = "/projects/feed";
  const params = [];
  
  if (searchQuery) params.push(`search=${searchQuery}`);
  if (techFilter) params.push(`tech=${techFilter}`);
  
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }
  
  const { data } = await api.get(url);
  return data;
};

export const useProjectsFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedTech, setDebouncedTech] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setDebouncedTech(techFilter);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery, techFilter]);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projectsFeed", debouncedSearch, debouncedTech],
    queryFn: fetchProjectsFeed,
    placeholderData: (previousData) => previousData, // UI smooth rakhne ke liye v7 standard
  });

  return {
    searchQuery,
    setSearchQuery,
    techFilter,
    setTechFilter,
    projects,
    isLoading
  };
};