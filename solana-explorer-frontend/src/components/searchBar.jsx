import React, { useEffect, useState } from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaExchangeAlt } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";

function SearchComponent() {

    const [searchType, setSearchType] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const determineSearchType = (query) => {
        console.log(query.length)
        if (query) {
            if (query.length === 43 || query.length === 44) {
                return 'address';
            } else if (query.length === 88) {
                return 'transaction';
            } else if (query.length === 9) {
                return 'block';
            } else if (query.startsWith('0x')) {
                return 'latestTransaction';
            } else {
                return 'unknown';
            }
        }
    };


    const GetInfo = (type, query) => {

        console.log(type, query)


        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `${import.meta.env.VITE_API_KEY}`
            },
        };

        switch (type) {
            case 'address':
                config.url = `${import.meta.env.VITE_API_URL}/account/${query}`;
                break;
            case 'transaction':
                config.url = `${import.meta.env.VITE_API_URL}/transaction/${query}`;
                break;
            case 'block':
                config.url = `${import.meta.env.VITE_API_URL}/block/${query}`;
                break;
            case 'latestTransaction':
                config.url = `${import.meta.env.VITE_API_URL}/txs?size=5`;
                break;
            default:
                console.log('Unknown search type');
                return;
        }

        axios(config)
            .then((response) => {
                console.log(response.data.type);
                if (response.data.type === 'vote') {
                    setSearchType('validator');
                    axios.get(`${import.meta.env.VITE_API_URL}/validator/${query}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                Authorization: `${import.meta.env.VITE_API_KEY}`
                            },
                        }
                    ).then((response) => {
                        setSearchResult(response.data);
                    }
                    )
                } else {
                    setSearchResult(response.data);

                }
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(searchResult)
    }

    const handleSearchChange = (e) => {
        // const { value } = e.target.value;
        // setSearchQuery(value);
        const type = determineSearchType(searchQuery);
        setSearchType(type)
        if (type !== 'unknown') {
            GetInfo(type, searchQuery);
        } else {
            console.log('Invalid search query');
        }
    };


    useEffect(() => {
        handleSearchChange();
    }, [searchQuery]);

    return (
        <div>
            <div className="flex flex-col w-full gap-4 text-white py-5">

                <form >
                    <div class="flex">


                        <div class="relative w-full">

                            <input type="text" id="default-search"
                                className="block rounded-2xl w-full p-4 text-xs lg:text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-gray-500 focus:border-gray-500 focus:outline-none  "
                                placeholder="Search for Slots / Address / Transactions / Validators"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearchChange();
                                }}
                                required />

                            <div className="flex items-center bg-pink-300 text-gray-800 absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                        </div>

                    </div>
                    {searchQuery && <div>{searchResult ? (
                        <div className="flex  w-full text-black mt-2 bg-white  rounded-md shadow">
                            <div className='flex justify-start bg-white rounded-md'>
                                <div className='flex w-full overflow-hidden'>{searchType === 'block' ? (<>
                                    <Link to={`/blocks/${searchResult.number}`} className="flex py-2 overflow-hidden md:py-5 flex-row gap-2 md:gap-4 justify-start mx-5">
                                        <div className='flex items-center border-[1px] h-10 bg-black rounded-full'>
                                            <BsBox className=' h-5 w-10 ' />
                                        </div>
                                        <div>
                                            <Link to={`/blocks/${searchResult.number}`} className="flex justify-start hover:underline">

                                                #{searchResult.number}
                                            </Link>
                                            <p className='text-xs'>{new Date(searchResult.timestamp * 1000).toLocaleString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', timeZone: 'Asia/Kolkata' })}</p>


                                        </div>
                                        <div className='flex items-center'>
                                            <IoIosReturnLeft className='font-bold h-6 w-6' />
                                        </div>

                                    </Link></>)
                                    : (<>{searchType === 'address' ? (<Link to={`/address/${searchResult.address}`} className='flex overflow-hidden items-center p-2 md:p-4 gap-2 text-xs md:text-md lg:text-lg md:gap-5'><MdAccountBalanceWallet /> <p>{searchResult.address}</p><div className='flex items-center'>
                                        <IoIosReturnLeft className='font-bold h-6 w-6' />
                                    </div></Link>) : (<Link to={`/txns/${searchResult.hash}`} className="flex py-5 flex-row gap-6 justify-start mx-5">
                                        <div className='flex items-center border-[1px] h-10 bg-black rounded-full'>
                                            <FaExchangeAlt className=' h-5 w-10 ' />
                                        </div>
                                        <div>
                                            <Link to={`/txns/${searchResult.hash}`} className="flex justify-start hover:underline">

                                                {searchResult && searchResult.hash && searchResult.hash.length > 0 && (searchResult.hash || "Loading").substring(0, 7)}...{(searchResult.hash || "Loading").substring(60, searchResult.hash && searchResult.hash.length)}                                        </Link>
                                            <p className='text-xs'>{new Date(searchResult.timestamp * 1000).toLocaleString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', timeZone: 'Asia/Kolkata' })}</p>

                                        </div>
                                        <div className='flex items-center'>
                                            <IoIosReturnLeft className='font-bold h-6 w-6' />
                                        </div>
                                    </Link>)}</>)}</div></div>
                        </div>
                    ) : (<div className='flex justify-start'>Loading...</div>)}</div>}
                </form>



            </div >
        </div>
    );
}

export default SearchComponent;