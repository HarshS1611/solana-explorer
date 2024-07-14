import React, { useEffect, useState } from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/loading.css';
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
            }
             else {
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
                    setSearchType('address')
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
        <div className='flex justify-end'>
            <div className="flex flex-col justify-end w-96 lg:w-[80%] xl:w-full gap-4 text-white py-5">

                <form >
                    <div class="flex">


                        <div class="relative w-full bg-white p-2 rounded-xl bg-opacity-50">

                            <input type="text" id="default-search"
                                className="block rounded-2xl w-full p-4 text-xs lg:text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-gray-500 focus:border-gray-500 focus:outline-none  "
                                placeholder="Search for Slots / Address / Transactions / Validators"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchResult(null);
                                    setSearchQuery(e.target.value);
                                    handleSearchChange();
                                }}
                                required />

                            <div className="flex items-center bg-pink-300 text-gray-800 absolute right-5 bottom-4 lg:bottom-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                        </div>

                    </div>
                    {searchQuery && <div className='z-30 overflow-hidden'
                    >{searchResult ? (
                        <>
                            {searchType === 'address' && searchResult.value && (
                                <a href={`/account/${searchResult.value.base.address.address || searchResult.value.base.address}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-2 text-gray-500 text-sm'>
                                            <p className=' w-full'>Account </p>
                                            <p className='font-bold '>{searchResult.value.base.address.address || searchResult.value.base.address}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </a>)}
                            {searchType === 'transaction' && searchResult.transactionHash && (
                                <Link to={`/transactions/${searchResult.transactionHash}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-2 text-gray-500 text-sm'>
                                            <p className=' w-full'>Transaction</p>
                                            <p className='font-bold '>{(searchResult.transactionHash).substring(0, 60)}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </Link>)}
                            {searchType === 'block' && searchResult.blocknumber && (
                                <Link to={`/blocks/${searchResult.blocknumber}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-4 text-gray-500 text-sm'>
                                            <p className=' w-full'>Block</p>
                                            <p className='font-bold '>#{searchResult.blocknumber}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </Link>)
                            }
                            {searchType === 'validator' && searchResult.validator && (
                                <Link to={`/validator/${searchResult.validator.votePubkey}`} className="flex items-center cursor-pointer hover:bg-gray-100 justify-between px-4 z-30 w-full text-black mt-2 bg-white  rounded-md shadow">

                                    <div className='flex justify-start  w-full  hover:bg-gray-100 py-5 bg-white rounded-md'>
                                        <div className='flex  gap-2 text-gray-500 text-sm'>
                                            <p className=' w-full'>Validator</p>
                                            <p className='font-bold '>{searchResult.validator.votePubkey}</p>
                                        </div></div><IoIosReturnLeft className='h-5 w-5' />
                                </Link>)}

                            {searchType === 'unknown' && (
                                <div className="flex  w-full text-black mt-2 bg-white  rounded-md shadow">
                                    <div className='flex justify-center px-4 py-5 bg-white rounded-md'>
                                        <p className='text-black'>No results Found</p>
                                    </div>
                                </div>
                            )}

                        </>




                    ) : (<div className="flex  w-full text-black mt-2 bg-white  rounded-md shadow">
                        <div className='flex justify-center px-4 py-2 bg-white rounded-md'>
                            <div className="loading">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>)}</div>}
                </form>



            </div >
        </div>
    );
}

export default SearchComponent;