import React, { Component } from 'react';
import logo from './daisy.png';
import './App.css';
import Json from './Json';
// import Parallax from './parallax';
import background from './DSC08033-1024x680.jpg';
import Map from './Map';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Gardens for the People</h1>
        </header>
        <img src={background} alt="community gardens" className="background"/>
        <article className="article-main">
          
          <Json />
          <div className="extra">
            <Map />
          </div>
        </article>
      </div>
    );
  }
}

export default App;
