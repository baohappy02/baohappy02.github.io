import api from "@/api/config";

export const fetchGuessDaily = async params => {
	const res = await api.get("daily", { params });
	return res;
};

export const fetchGuessRandom = async params => {
	const res = await api.get("random", { params });
	return res;
};

export const fetchGuessWord = async (word, params) => {
	const res = await api.get(`word/${word}`, { params });
	return res;
};
