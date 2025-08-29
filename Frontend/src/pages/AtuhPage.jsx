import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import InputBox from "../components/inputBox.component";
import { useAuthStore } from "../store/auth";

function AuthPage({ type }) {
  const { login, register } = useAuthStore();

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

    let result;

    if (type === "Sign-Up") {
      result = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
    } else {
      result = await login({
        email: formData.email,
        password: formData.password
      });
    }

    if (result.success) {
      // console.log("Auth success:", result);
    } else {
      console.error("Auth failed:", result.message);
    }
  };

  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <form className="w-[80%] max-h-[400px]" onSubmit={handleSubmit}>
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
