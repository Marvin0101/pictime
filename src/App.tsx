import React from 'react';
import './App.css';
import DragDropBox from "./components/DragDropBox";
import Footer from './components/Footer';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <DragDropBox/>
      <Footer/>
    </div>
  );
}

export default App;
