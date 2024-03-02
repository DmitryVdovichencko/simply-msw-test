import axios from "axios";

const api = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
});

// api.interceptors.response.use(function ({ data }) {
// 	return { data };
// }, function (error) {
// 	return Promise.reject(error);
// });

const login = (username: string, password: string) => {
	console.log({ username, password });
	return api.post("/login", { username, password });
};

export default {
	profile:{
		login
	}
}