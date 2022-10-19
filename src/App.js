import "./App.css";
import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Particles from "./Components/Particles/Particles";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
    this.setState({ imageUrl: "" });
  };

  calculateFaceLocation = (data) => {
    const image = document.querySelector("#inputimage");
    const width = Number.parseInt(image.width);
    const height = Number.parseInt(image.height);
    const faces = data.outputs[0].data.regions;
    const boxes = [];
    for (let inst of faces) {
      let clarifaiFace = inst.region_info.bounding_box;
      let box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        color: "blue",
      };
      boxes.push(box);
    }
    return boxes;
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = async () => {
    this.setState({ imageUrl: this.state.input });

    // let response = await fetch("http://localhost:8080/imageURL", {
    let response = await fetch("https://arcane-ravine-33743.herokuapp.com/imageURL", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      }),
    })
    response = response.json()
    response.then(async (response) => {
      try {
        if (response.outputs[0].data.regions.length) {
          const boxes = this.calculateFaceLocation(response);
          this.displayFaceBox(boxes);
  
          // let entryCount = await fetch("http://localhost:8080/image", {
          let entryCount = await fetch("https://arcane-ravine-33743.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
              faceCount: boxes.length,
            }),
          });
          entryCount = entryCount.json();
          //Don't know why but entry count is still a promise here insted of json. Hence,
          entryCount.then((entryCount) =>
            this.setState(Object.assign(this.state.user, { entries: entryCount }))
          );
        }
      } catch {
        const boxes = [
          {
            leftCol: 0,
            topRow: 0,
            rightCol: 0,
            bottomRow: 0,
            color: "red",
          },
        ];
        this.displayFaceBox(boxes);
        window.alert("No faces detected");
      }
    })
  };

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }

    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes, user } = this.state;
    const { name, entries } = user;
    let page = null;
    if (route === "home") {
      page = (
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onPictureSubmit={this.onPictureSubmit}
          name={name}
          entries={entries}
          boxes={boxes}
          imageUrl={imageUrl}
        />
      );
    } else if (route === "signin") {
      page = (
        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    } else {
      page = (
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }
    return (
      <div className="App">
        <div class="lower-z-index">
          <Particles />
        </div>
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {page}
      </div>
    );
  }
}

export default App;
