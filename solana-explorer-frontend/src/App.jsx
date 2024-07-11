import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios  from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const fetchTransactions = async () => {
    const response = await axios.get('https://api.solanabeach.io/v1/latest-blocks?limit=10',
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `${import.meta.env.VITE_API_KEY}`
        },
      }
    )
    console.log(response.data)
  }
  useEffect(() => {
    fetchTransactions()
  },[]);


  return (
    <>
      
    </>
  )
}

export default App
