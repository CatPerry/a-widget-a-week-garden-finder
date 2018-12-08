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
          <h1>Garden for the People</h1>
        </header>
        <section id="heroes">
          <div id="heroes-text">
            <p className="left-para">
              <h2 className="subhead1">Eat.</h2><h2 className="subhead2">Share.</h2><h2 className="subhead3">Grow.</h2>
            </p>
            <p className="right-para">
              NY community gardens offering <mark>free,</mark> <mark>organic food</mark> for <mark>all people.</mark><br/>
              Healthy eating is a right — not a privilege. 
            </p>
          </div>
          <img src={background} alt="community gardens" className="background" />
        </section>
        <article id="article-main">
          
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
