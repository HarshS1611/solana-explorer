import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blocks = () => {

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
            return Math.floor(interval) + "d ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + "h ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + "m ago";
        }
        return Math.floor(seconds) + "s ago";
    };

    const BlockAPI = async () => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-blocks?limit=7`,
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
        <div className='w-full bg-white p-4 bg-opacity-50 rounded-xl'>
            <table class="table-auto overflow-auto shadow-xl bg-white rounded-lg text-black w-full ">
                <thead className="rounded-lg border-b-[1px] text-md w-full">
                    <tr className=" text-md  w-full">
                        <th className="flex justify-start py-4 ml-5  text-sm">Latest Blocks</th>
                        <th className='text-white'>e</th>
                        <th className='text-white'>ew</th>
                        <th className="py-2 text-sm"><Link className='text-sky-700' to={'/blocks'}>View All</Link></th>

                    </tr>
                    <tr className='text-sm'>
                        <th className='w-40'>SLOT</th>
                        <th>VALIDATOR</th>
                        <th className='flex justify-end w-10'>TXS</th>
                        <th className=''>TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((transact, index) => {
                        console.log(transact)
                        return (
                            <tr key={index} className="border-b-[0.7px] border-gray-400 text-xs md:text-md md:px-4">
                                <td className="flex py-4 w-max items-center flex-row gap-2 justify-start ml-5">
                                    <div className='flex items-center border-[1px] h-5 bg-black rounded-full'>
                                        <FaExchangeAlt className=' h-5 w-5' />
                                    </div>
                                    <div className='flex justify-start '>
                                        <Link to={`/blocks/${transact.blocknumber}`} className="flex justify-start cursor-pointer text-sky-600">

                                            {transact.blocknumber}
                                        </Link>

                                    </div>

                                </td>
                                <td className='w-max'>
                                    <div>
                                        <div className="flex md:block gap-2 justify-start text-sky-600 ">
                                            <Link to={`/validator/${transact.proposer}`} className='cursor-pointer'>
                                            {(transact.proposer).substring(0, 4)}...{(transact.proposer).substring(40, transact.proposer.length)}

                                                </Link>
                                        </div>
                                    </div>
                                </td>
                                <td className='flex w-max justify-end'>
                                    <p>   {(transact.metrics.txcount)}</p>
                                </td>
                                <td className='w-max '>

                                {transact.blocktime.absolute.absolute ?
                                        <p>{timeAgo(transact.blocktime.absolute.absolute)}</p>
                                        : <p>{timeAgo(transact.blocktime.absolute)}</p>
                                    }
                                </td>
                            </tr>)
                    }
                    )}


                </tbody>
            </table></div>
    )
}

export default Blocks;