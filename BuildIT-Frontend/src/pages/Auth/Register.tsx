import React, { useState } from "react";
import logo from "../../../public/buildit-logo.png";
import "../../styles/Register.css";
import { register } from "../../utils/api_router";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    pseudo: "",
    mail: "",
    tagname: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const checkPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPassword(formData.password, formData.confirmPassword)) {
      alert("Passwords do not match");
      return;
    }
    const { confirmPassword, ...dataToSend } = formData;
    register(dataToSend);
  };

  return (
    <div>
      <div className="logo flex items-center justify-center bg-bgPrimary p-5">
        <img
          src={logo}
          alt="BuildIT Logo"
          className="w-12 h-12 object-contain"
        />
        <h2 className="font-bold text-2xl ml-2 text-center">
          BUILD<span className="text-secondary">IT</span>
        </h2>
      </div>
      <div className="main-div flex flex-col items-center justify-center bg-bgPrimary w-screen">
        <h1 className="font-thin mb-10">Create an account</h1>
        <div className="registerForm flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex mt-2 mb-2">
              <div className="flex flex-col w-1/2">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-1/2 ml-5">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex flex-col w-1/2">
                <label>Pseudo</label>
                <input
                  type="text"
                  name="pseudo"
                  className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                  value={formData.pseudo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-1/2 ml-5">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <label>Email</label>
              <input
                type="email"
                name="mail"
                className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                value={formData.mail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Tagname</label>
              <input
                type="text"
                name="tagname"
                className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                value={formData.tagname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mb-2">
              <div className="flex flex-col w-1/2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col w-1/2 ml-5">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full h-10 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mt-5 items-center justify-center">
              <button
                type="submit"
                className="w-1/2 border-none rounded-full bg-secondary hover:scale-105 hover:shadow-lg hover:shadow-slate-700 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
          <p className="mt-5 flex items-center justify-center">
            Already have an account ?{" "}
            <a href="/login" className="text-secondary ml-2">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
