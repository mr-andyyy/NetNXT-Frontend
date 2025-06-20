// constants/url.js

export const PRODURL = "https://netnxt-backend.vercel.app";
export const LOCALURL = "http://localhost:5000";

// For local development, use LOCALURL. For production, use PRODURL.
export const API_BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? `${LOCALURL}/api`
  : `${PRODURL}/api`;

export const BLOG_API = {
  GET: `${API_BASE}/get-blogs`,
  POST: `${API_BASE}/post-blog`,
};

export const CAREER_API = {
  GET: `${API_BASE}/get-careers`,
  POST: `${API_BASE}/post-career`,
};

export const CASE_STUDY_API = {
  GET: `${API_BASE}/get-case-studies`,
  POST: `${API_BASE}/post-case-study`,
};

export const WEBINAR_API = {
  GET: `${API_BASE}/get-webinars`,
  POST: `${API_BASE}/post-webinar`,
};

export const USER_API = {
  GET: `${API_BASE}/get-users`,
  POST: `${API_BASE}/post-user`,
};

// --- API Call Functions ---

// Helper for GET requests
export async function getRequest(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`GET ${url} failed`);
  return response.json();
}

// Helper for POST requests
export async function postRequest(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`POST ${url} failed`);
  return response.json();
}

// Blog API
export const getBlogs = () => getRequest(BLOG_API.GET);
export const postBlog = (data) => postRequest(BLOG_API.POST, data);

// Career API
export const getCareers = () => getRequest(CAREER_API.GET);
export const postCareer = (data) => postRequest(CAREER_API.POST, data);

// Case Study API
export const getCaseStudies = () => getRequest(CASE_STUDY_API.GET);
export const postCaseStudy = (data) => postRequest(CASE_STUDY_API.POST, data);

// Webinar API
export const getWebinars = () => getRequest(WEBINAR_API.GET);
export const postWebinar = (data) => postRequest(WEBINAR_API.POST, data);

// User API
export const getUsers = () => getRequest(USER_API.GET);
export const postUser = (data) => postRequest(USER_API.POST, data);
