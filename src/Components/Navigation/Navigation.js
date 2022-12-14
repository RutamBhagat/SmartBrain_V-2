import "./Navigation.css";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  let button = null;
  if (isSignedIn) {
    button = (
      <button
        onClick={() => onRouteChange("signin")}
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      >
        Sign Out
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
    );
  } else {
    button = <span></span>;
  }
  return (
    <Fragment>
      <header class="text-gray-600 body-font custom-bg">
        <div class="container-fluid mx-10 flex flex-wrap p-5 flex-col md:flex-row items-center">
          <button
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span class="ml-3 text-xl text-white">SmartBrain V-1</span>
          </button>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {
              // <a class="mr-5 hover:text-gray-900">First Link</a>
              // <a class="mr-5 hover:text-gray-900">Second Link</a>
              // <a class="mr-5 hover:text-gray-900">Third Link</a>
              // <a class="mr-5 hover:text-gray-900">Fourth Link</a>
            }
          </nav>
          <Link to="/">{button}</Link>
        </div>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
