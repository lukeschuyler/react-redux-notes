import React, { Component } from 'react';
import Header from './Header';

export default ({ children }) => {
  return (
    <div className="App">
      <Header /> 
      {children}
    </div>
  );
}
