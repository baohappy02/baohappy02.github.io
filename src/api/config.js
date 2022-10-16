import axios from "axios";

const service = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
	// headers: { "Access-Control-Allow-Origin": "*" },
	timeout: 20000,
});

service.interceptors.request.use(async config => {
	let token = localStorage.getItem("TOKEN");

	if (!token) {
		// const params = new URLSearchParams(window.location.search);
		// token = params.get("token");
	}

	config.headers.Authorization = "Bearer " + token;

	return config;
});

service.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		if (error.response && error.response.data) {
			return Promise.reject(error.response?.data);
		}
		return Promise.reject(error);
	}
);

export default service;
