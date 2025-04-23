import About from './components/Pages/LandingPage/About';
import ButtonContainer from './components/Pages/LandingPage/ButtonContainer';
import Footer from './components/Pages/LandingPage/Footer';
import Headers from './components/Pages/LandingPage/Headers';
import Home from './components/Pages/LandingPage/Home';
import MenuCards from './components/Cards/MenuCards/MenuCards'

import { GlobalProvider } from './components/UseContext/GlobalProvider';

import './App.css'

import { Toaster } from "react-hot-toast";


function App() {
  return (
    <GlobalProvider> 
      <>
        <Toaster/>
      <div>
        <Headers />
        <Home />
        <ButtonContainer />
        <MenuCards />
        <About />
        <Footer />
       
      </div>
      </>
    </GlobalProvider>
  );
}

export default App;
