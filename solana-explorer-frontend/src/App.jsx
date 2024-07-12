import './App.css'
import Navbar from './components/navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllTransactions from './pages/transactions';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/transactions" element={<AllTransactions />} />

        </Routes>
      </div></BrowserRouter>
  )
}

export default App
