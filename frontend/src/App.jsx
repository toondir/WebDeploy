
import './App.css'
import React, { useEffect, useState } from 'react';

import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Note from './pages/Note';
import Maps from './pages/Maps';


function App() {
  return (
    <Router>
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/note" element={<Note />} />
        <Route path="/map" element={<Maps />} />

      </Routes>
    </Router>
  );
}

export default App;