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
        console.log(config.url)

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
                        console.log(response.data);
                    }
                    )
                } else {
                    setSearchResult(response.data);
                    console.log(response.data);

                }
            })
            .catch((error) => {
                console.log(error);
            });

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


                        <div class="relative w-full bg-white p-2 rounded-xl bg-opacity-50">

                            <input type="text" id="default-search"
                                className="block rounded-2xl w-full p-4 text-xs lg:text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-gray-500 focus:border-gray-500 focus:outline-none  "
                                placeholder="Search for Slots / Address / Transactions / Validators"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearchChange();
                                }}
                                required />

                            <div className="flex items-center bg-pink-300 text-gray-800 absolute right-5 bottom-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                        </div>

                    </div>
                    {searchQuery && <div className='z-30'
                    >{searchResult ? (
                        <>
                            {searchType === 'address' && (
                                <a href={`/account/${searchResult.value.base.address.address}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-2 text-gray-500 text-sm'>
                                            <p className=' w-full'>Account </p>
                                            <p className='font-bold '>{searchResult.value.base.address.address}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </a>)}
                            {searchType === 'transaction' && (
                                <Link to={`/transactions/${searchResult.transactionHash}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-2 text-gray-500 text-sm'>
                                            <p className=' w-full'>Transaction</p>
                                            <p className='font-bold '>{(searchResult.transactionHash).substring(0,60)}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </Link>)}
                            {searchType === 'block' && (
                                <Link to={`/blocks/${searchResult.blocknumber}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-4 text-gray-500 text-sm'>
                                            <p className=' w-full'>Block</p>
                                            <p className='font-bold '>#{searchResult.blocknumber}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </Link>)
                            }
                            {searchType === 'validator' && (
                                <Link to={`/validator/${searchResult.validator.votePubkey}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-2 text-gray-500 text-sm'>
                                            <p className=' w-full'>Validator</p>
                                            <p className='font-bold '>{searchResult.validator.votePubkey}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </Link>)}

                        </>




                    ) : (<div className="flex  w-full text-black mt-2 bg-white  rounded-md shadow">
                        <div className='flex justify-start px-4 py-2 bg-white rounded-md'>
                            Loading...
                        </div>
                    </div>)}</div>}
                </form>



            </div >
        </div>
    );
}

export default SearchComponent;