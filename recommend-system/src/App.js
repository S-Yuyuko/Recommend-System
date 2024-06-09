import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Right from './components/Right/Right';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Right />
      <Footer />
    </div>
  );
};

export default App;
