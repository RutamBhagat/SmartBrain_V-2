import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Particles from "./Components/Particles/Particles";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const image = document.querySelector("#inputimage");
    const width = Number.parseInt(image.width);
    const height = Number.parseInt(image.height);
    const faces = data.outputs[0].data.regions;
    const boxesArray = [];
    for (let inst of faces) {
      let clarifaiFace = inst.region_info.bounding_box;
      let box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        color: "blue",
      };
      boxesArray.push(box);
    }
    return boxesArray;
  };

  const onPictureSubmit = async () => {
    setImageUrl(input);
    // let response = await fetch("http://localhost:8080/imageURL",
    let response = await fetch(
      "https://smartbrain-api-d00l.onrender.com/imageURL",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input,
        }),
      }
    );
    response = await response.json();
    try {
      if (response.outputs[0].data.regions.length !== 0) {
        const boxesArray = calculateFaceLocation(response);
        setBoxes(boxesArray);

        // const data = await fetch("http://localhost:8080/image",
        const data = await fetch(
          "https://smartbrain-api-d00l.onrender.com/image",
          {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              faceCount: boxesArray.length,
            }),
          }
        );
        const entryCount = await data.json();
        setUser({ ...user, entries: entryCount })
      } else {
        throw new Error("No faces detected");
      }
    } catch {
      const boxesArray = [
        {
          leftCol: 0,
          topRow: 0,
          rightCol: 0,
          bottomRow: 0,
          color: "red",
        },
      ];
      setBoxes(boxesArray);
      showAlert("popup-modal-home");
    }
  };

  const onRouteChange = (route) => {
    if (route === "home") {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
      // You need to do this otherwise when a user logs-out and new user logs-in the imageurl will still be the privious one
      setImageUrl("");
    }
  };

  const showAlert = (id) => {
    const alert = document.querySelector(`#${id}`);
    alert.classList.toggle("hidden");
    alert.classList.toggle("bg-black");
    alert.classList.toggle("bg-opacity-75");
  };

  return (
    <div className="App">
      <div class="lower-z-index">
        <Particles />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
          }
        >
          <Route
            index
            element={
              <Signin
                onRouteChange={onRouteChange}
                loadUser={loadUser}
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="signout"
            element={
              <Register
                onRouteChange={onRouteChange}
                loadUser={loadUser}
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="home"
            element={
              <ImageLinkForm
                onInputChange={onInputChange}
                onPictureSubmit={onPictureSubmit}
                name={user.name}
                entries={user.entries}
                boxes={boxes}
                imageUrl={imageUrl}
                showAlert={showAlert}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
