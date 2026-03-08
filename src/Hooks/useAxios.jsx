import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://mk-sports-server.vercel.app",
});

const useAxiosSecure = () => {
  return useAxios;
};

export default useAxiosSecure;
