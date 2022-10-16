import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Particles from './Components/Particles/Particles';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Clarifai, { COLOR_MODEL } from 'clarifai'


const app = new Clarifai.App({
  apiKey: '6a378514618f4575ac8c8f49c549a351'
})

class App extends Component {
  constructor(){
    super()
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
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
    this.setState({imageUrl: ""})
  }

  calculateFaceLocation = (data) => {
    const image = document.querySelector("#inputimage")
    const width = Number.parseInt(image.width)
    const height = Number.parseInt(image.height)
    const faces = data.outputs[0].data.regions
    const boxes = []
    for(let inst of faces){
      let clarifaiFace = inst.region_info.bounding_box
      let box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
        color: "blue"
      }
      boxes.push(box)
    }
    console.log(boxes)
    return boxes
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        //This will only increase score if a face exists in the image
        if(response.outputs[0].data.regions[0].region_info.bounding_box) {
          const boxes = this.calculateFaceLocation(response)
          this.displayFaceBox(boxes)
          fetch("http://localhost:8080/image", {
            "method": "put",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify({
              id: this.state.user.id,
              faceCount: boxes.length 
            })
          })
          .then(response => response.json())
          .then(entryCount => {
            this.setState(Object.assign(this.state.user, { entries: entryCount }))
          })
        }
      })
      .catch(err => {
        const boxes = [{
          leftCol: 0,
          topRow: 0,
          rightCol: 0,
          bottomRow: 0,
          color: "red"
        }]
        this.displayFaceBox(boxes)
        window.alert("No faces detected")
      })
  }

  onRouteChange = (route) => {
    if(route === "home"){
      this.setState({ isSignedIn: true })
    }
    else{
      this.setState({ isSignedIn: false })
    }

    this.setState({ route: route })
  }

  render() {
    const {isSignedIn, imageUrl, route, boxes, user} = this.state;
    const {name, entries} = user
    return (
      <div className='App'>
        {/* <Particles /> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { 
          (
            route === "home"
            ? <>
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} name={name} entries={entries} boxes={boxes} imageUrl={imageUrl}/>
              </> 
            : (
                route === "signin"
                ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              )
          )
        }
      </div>
    );
  }
}

export default App;
