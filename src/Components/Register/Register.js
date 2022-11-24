import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

const Register = ({ onRouteChange, loadUser, showAlert }) => {
  //Note useNavigate can only be called at component level like this
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignUp = async () => {
    // const response = await fetch("http://localhost:8080/register",
    // const response = await fetch("https://arcane-ravine-33743.herokuapp.com/register",
    const response = await fetch(
      "https://smartbrain-api-d00l.onrender.com/register",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );
    const user = await response.json();
    if (user.email !== undefined) {
      loadUser(user);
      navigate("/home");
      onRouteChange("home");
    } else {
      showAlert("popup-modal-register");
    }
  };

  return (
    <section class="text-gray-600 body-font">
      <div className="flex flex-row">
        <ErrorComponent
          message={"Unable to register"}
          id="popup-modal-register"
          showAlert={showAlert}
        />
      </div>
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <div class="relative mb-4">
            <label htmlFor="name" class="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={onNameChange}
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
          <div class="relative mb-4">
            <label htmlFor="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={onEmailChange}
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
          <div class="relative mb-4">
            <label htmlFor="password" class="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              onChange={onPasswordChange}
              type="password"
              id="password"
              name="password"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
          <button
            onClick={onSubmitSignUp}
            type="submit"
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Log In
          </button>
          <p class="text-xs text-gray-500 mt-3">
            Detect faces from imageUrl using SmartBrain.
          </p>
        </div>
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 class="title-font font-medium text-3xl text-white">
            Face Detection For Developers.
          </h1>
          <p class="leading-relaxed mt-4 mb-10 text-white">
            EASILY DETECT FACES FOR FREE.
          </p>
          <p class="leading-relaxed mb-4 text-white">
            Already have an account?
          </p>
          <Link to="/">
            <button
              onClick={() => onRouteChange("signin")}
              class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Sign In
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
