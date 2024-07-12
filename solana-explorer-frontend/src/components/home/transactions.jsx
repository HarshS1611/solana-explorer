import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Transactions = () => {

    const [transactions, setTransactions] = useState([]);

    const timeAgo = (timestamp) => {
        const seconds = Math.floor((new Date() - new Date(timestamp * 1000)) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " mins ago";
        }
        return Math.floor(seconds) + " secs ago";
    };

    const BlockAPI = async () => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-transactions?limit=10`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        // console.log(response.data)
        setTransactions(response.data)


    }

    useEffect(() => {

        if (transactions.length <= 0) {
            BlockAPI();
        }




    }, [transactions]);

    return (
        <>
            <table class="table-auto overflow-auto bg-gray-800 rounded-lg text-white w-full ">
                <thead className="rounded-lg border-b-[1px] w-full">
                    <tr className="  w-full">
                        <th className="flex justify-start py-4 ml-5 ">Latest Transactions</th>
                        <th className="py-4 "><Link className='text-sky-700' to={'/txns'}>View All</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((transact, index) => {
                        console.log(transact.blocktime.absolute)
                        return (<tr key={index} className="border-b-[0.7px] border-black text-xs md:text-lg md:px-4">
                            <td className="flex py-5 flex-row gap-4 justify-start mx-5">
                                <div className='flex items-center border-[1px] h-10 bg-black rounded-full'>
                                    <FaExchangeAlt className=' h-5 w-10 ' />
                                </div>
                                <div>
                                    <Link to={`/txns/${transact.hash}`} className="flex justify-start hover:underline">

                                        {(transact.transactionHash).substring(0, 7)}...{(transact.transactionHash).substring(60, transact.transactionHash.length)}
                                    </Link>
                                   
                                </div>
                                
                            </td>
                            <td>
                                <div>
                                <p className="flex md:block gap-2 justify-start">
                                        from <Link to={`/address/${transact.from}`} className='hover:underline'>{transact.mostImportantInstruction.name}</Link>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <p>   {(transact.blockNumber)}</p>
                            </td>
                            <td>
                             
                                <p>{timeAgo(transact.blocktime.absolute)}</p>
                            </td>
                        </tr>)
                    }
                    )}


                </tbody>
            </table></>
    )
}

export default Transactions;