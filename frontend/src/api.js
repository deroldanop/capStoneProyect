import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleError = (error) => {
  if (
    (error.response && error.response.status === 401) ||
    error.response.status === 403
  ) {
    throw new Error("Unauthorized access");
  } else if (error.response && error.response.data) {
    throw error.response.data;
  } else {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    const { token } = response.data;
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post("/signup", userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getNews = async () => {
  try {
    const response = await api.get("/news");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// This is hacky endpoint. Unfortunately news api does not provide news id or proper search by title.
// This is done to simulate search by title.
export const getNewsByTitle = async (title) => {
  try {
    const response = await api.get("/news");
    const filteredArticles = response.data.articles.filter(
      (news) => news.title === title,
    );
    return filteredArticles.length
      ? { articles: filteredArticles }
      : { articles: [response.data.articles[0]] };
  } catch (error) {
    handleError(error);
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCommentsByNewsTitle = async (newsTitle) => {
  try {
    const response = await api.get(`/comments/${newsTitle}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateComment = async (commentId, newText) => {
  try {
    const response = await api.put(`/comments/${commentId}`, { text: newText });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
