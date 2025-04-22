import React from 'react';
import { GlobalProvider } from './components/UseContext/GlobalProvider';
import About from './components/Pages/LandingPage/About';
import ButtonContainer from './components/Pages/LandingPage/ButtonContainer';
import Footer from './components/Pages/LandingPage/Footer';
import Headers from './components/Pages/LandingPage/Headers';
import Home from './components/Pages/LandingPage/Home';
// import MenuBtn from './components/MenuBtn';
import MenuCards from './components/Cards/MenuCards/MenuCards'
import './App.css'


function App() {
  return (
    <GlobalProvider> {/* Wrap the components inside this provider */}
      <div>
        <Headers />
        <Home />
        <ButtonContainer />
        <MenuCards />
        <About />
        <Footer />
       
      </div>
    </GlobalProvider>
  );
}

export default App;
