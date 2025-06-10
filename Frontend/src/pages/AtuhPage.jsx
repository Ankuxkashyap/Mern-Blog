import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import axios from "axios";
import InputBox from "../components/inputBox.component";
import useAuthStore from "../store/auth";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

function AuthPage({ type }) {

  const { setUser, isAuthenticated, user } = useAuthStore(
  (state) => ({
    setUser: state.setUser,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }),
  shallow
);

 useEffect(() => {
    console.log("User:", user);
    console.log("Authenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      type === "Sign-Up"
        ? "http://localhost:3000/api/users/"
        : "http://localhost:3000/api/users/login";

    try {
      const { data } = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Response Data:", data);
      setUser(data);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <form
          className="w-[80%] max-h-[400px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "Sign-In" ? "Welcome Back" : "Join Us Today"}
          </h1>

          {type === "Sign-Up" && (
            <InputBox
              name="Full Name"
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              icons={<CiUser />}
            />
          )}

          <InputBox
            name="Email"
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            icons={<MdOutlineMail />}
          />

          <InputBox
            name="Password"
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            icons={<IoKeyOutline />}
          />

          <button
            className="whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80 block mx-auto mt-14"
            type="submit"
          >
            {type.replace("-", " ")}
          </button>

          {type === "Sign-In" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don’t have an account?
              <Link to="/singup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link to="/singin" className="underline text-black text-xl ml-1">
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
      <Outlet />
    </>
  );
}

export default AuthPage;
