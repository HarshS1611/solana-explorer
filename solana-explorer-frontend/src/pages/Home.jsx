import { useEffect, useState } from 'react'

import axios from 'axios'

export default function Home() {
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
        <div>
            <h1 className='text-white'>Home</h1>
        </div>
    )
}