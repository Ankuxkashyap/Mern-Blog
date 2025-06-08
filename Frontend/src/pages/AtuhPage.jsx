import { useState, useEffect } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import InputBox from "../components/inputBox.component";
import { CiUser } from "react-icons/ci";
function AuthPage({ type }) {
 

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center ">
        <form className="w-[80%] max-h-[400px]">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                {type === "Sing-In" ? "Welcome Back" : "Join Us Today"}
            </h1>
            { type === "Sing-In" ? 
            <InputBox 
            name = "Full Name"
            type = "text"
            placeholder = "Full Name"
            value = ""
            id = "fullName"
            icons ="<CiUser/>" 
            /> : ""
            }   
        </form>
    </section>
  );
}

export default AuthPage;