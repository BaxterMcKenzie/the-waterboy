import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Links from "./components/Links";

const App = () => {

  return (
    <>
    <HashRouter>
      <Navbar/>
      <Links/>
      <Footer/>
    </HashRouter>
    </>
  )
}

export default App
