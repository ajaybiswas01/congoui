import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <ul className="nav nav-tabs main-tabs" id="pills-tab" role="tablist">
          <li className="nav-item">
              <img src={process.env.PUBLIC_URL + '/assets/adobe_red_tag.jpg'} className="App-logo" alt="logo" />
          </li>
          <li className="nav-item app-title">
              <span><a style={{color: 'white', textDecoration: 'none'}}>Adobe Dart</a></span>
          </li>
          <li className="nav-item" data-url="search">
              <a className={"nav-link active"} data-toggle="pill" href="#pills-search" role="tab" aria-controls="pills-search" aria-selected="true"><i className="icon icon-search"></i>Search</a>
          </li>
      </ul>
    </div>
  );
}

export default App;
