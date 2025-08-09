import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router"; 

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          signOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => {
              console.error("Error signing out:", err);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
