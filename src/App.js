import {  Routes, Route } from "react-router-dom";
import './App.scss';
import { Header } from "./components";
import { Coin, CoinPage, Home } from "./pages";


function App() {
  return (
     <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/coins" element={<Coin/>} />
          <Route path="coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    
  );
}

export default App;
