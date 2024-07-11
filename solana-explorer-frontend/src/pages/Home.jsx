import { useEffect, useState } from 'react'

import axios from 'axios'
import SearchComponent from '../components/searchBar'

export default function Home() {
    const fetchTransactions = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-blocks?limit=10`,
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
    }, []);
    return (
        <div>
            <div className='flex justify-center w-full items-center mt-10'>
                <div className='flex justify-start text-3xl w-full text-white font-bold'>Explore Solana Blockchain

                </div>
                <div className='w-full'>
                    <SearchComponent />
                </div>

            </div>
            <h1 className='text-white'>Home</h1>
        </div>
    )
}