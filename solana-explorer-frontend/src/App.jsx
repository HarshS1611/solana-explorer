import './App.css'
import Navbar from './components/navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllTransactions from './pages/transactions';
import AllBlocks from './pages/blocks';
import TransactionInfo from './pages/transactionInfo';
import BlockInfo from './pages/blockInfo';
import AllValidators from './pages/validator';
import ValidatorInfo from './pages/validatorInfo';
import AccountInfo from './pages/accountInfo';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/transactions" element={<AllTransactions />} />
          <Route path="/blocks" element={<AllBlocks />} />
          <Route path="/transactions/:id" element={<TransactionInfo />} />
          <Route path="/blocks/:id" element={<BlockInfo />} />
          <Route path="/validators" element={<AllValidators/>} />
          <Route path="/validator/:id" element={<ValidatorInfo/>} />
          <Route path="/account/:id" element={<AccountInfo/>} />

        </Routes>
      </div></BrowserRouter>
  )
}

export default App
