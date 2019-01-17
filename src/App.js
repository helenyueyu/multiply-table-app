import React, { Component } from 'react';
import './App.css';

import Add from './components/Add'
import Multiply from './components/Multiply'

const App = () => (
  <div className="App">
    <h1>Mad Minutes</h1>
    <Add />
    <Multiply />
  </div>
)

export default App;
