import { useEffect, useState } from 'react'

import axios from 'axios'
import SearchComponent from '../components/searchBar'
import MainSection from '../components/home/mainSection'
import Transactions from '../components/home/transactions'
import Blocks from '../components/home/blocks'

export default function Home() {

    
    return (
        <div>
            <div className='flex justify-center w-full items-center mt-10'>
                <div className='flex justify-start text-3xl w-full text-white font-bold'>Explore Solana Blockchain

                </div>
                <div className='w-full'>
                    <SearchComponent />
                </div>

            </div>
            <div>
                <MainSection/>
            </div>
            <div className='flex gap-10 mt-10'>
            <Blocks/>
                <Transactions/>
                
            </div>
        </div>
    )
}