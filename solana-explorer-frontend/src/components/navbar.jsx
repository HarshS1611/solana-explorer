import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/navbar.css';

const Navbar = () => {
    const [price, setPrice] = useState(0);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const fetchPrice = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/market-chart-data`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        // console.log(response)
        setPrice(response.data[47].price)
    }
    useEffect(() => {
        fetchPrice()
    }, []);


    return (
        <>
            <nav className="flex w-full justify-between shadow-full rounded-3xl border-b-[1px]  bg-white items-center flex-wrap md:py-4 px-4">
                <div className='flex'>
                 
                    <div className="w-max flex ml-5 md:flex-0 items-center justify-start lg:w-fit">
                        <div className="text-sm md:text-md gap-2 md:gap-4 flex flex-col md:flex-row md:py-1">
                            <div className="flex gap-4 mt-2 text-lg font-lab-grotesque  cursor-pointer items-center lg:mt-2 md:mr-4 pb-2 "

                            ><div><img className='h-8 w-8' src='https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' /></div>
                                <p className=''> ${price && (price).toString().substring(0, 6)} </p>
                            </div>


                        </div>


                    </div>
                </div>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto md:mr-10" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <Link to={`/`} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:hover:border-b-[2px] md:rounded-none md:border-green-600 md:p-0  " aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to={`/transactions`} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:hover:border-b-[2px] md:rounded-none md:border-green-600 md:p-0 " aria-current="page">Transactions</Link>
                        </li>
                        <li>
                            <Link to={`/blocks`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-black md:rounded-none md:hover:border-b-[2px] md:border-green-600 md:p-0  ">Blocks</Link>
                        </li>
                        <li>
                            <Link to={`/validators`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:text-black md:rounded-none md:hover:border-b-[2px] md:border-green-600 md:p-0  ">Validators</Link>
                        </li>
                       
                    </ul>
                </div>


            </nav>
        </>

    )
}

export default Navbar;