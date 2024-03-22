import "./index.css";
import React from 'react';
import News from "../pages/News";
import NavBar from "../components/NavBar";

import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<News />} />
        {/* <Route path='/Login' element={<Login />} /> */}
        
       
      </Routes>
    </>
  );
  
}

export default App;

