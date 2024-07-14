import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Transactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


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

    const TransactionAPI = async (page) => {


        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-transactions?limit=${20 * page}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        setTransactions(response.data)

    }

    useEffect(() => {

        TransactionAPI(currentPage);


    }, [currentPage]);

    return (
        <>

            <div className='overflow-auto bg-white md:p-4 bg-opacity-50 rounded-xl'>
                <table class=" table-auto bg-white rounded-t-xl text-black md:w-full ">
                    <thead className="border-b-[1px] text-xs md:text-md w-full">
                        <tr className="text-gray-400 w-fit">
                            <th className="flex text-xs md:text-md py-2 w-fit justify-start  ml-5 ">Signature</th>
                            <th className="text-xs md:text-md"> Block</th>

                            <th className="text-xs md:text-md"> Validator</th>

                            <th className=" text-xs md:text-md">Fee (in SOL)</th>

                            <th className="text-xs md:text-md"> Time</th>


                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.map((transact, index) => {
                            // console.log(transact)
                            return (
                            <tr key={index} className="text-center border-b-[0.7px] text-xs md:text-sm lg:text-md xl:text-sm xl:mx-5 border-gray-400">
                                <td className="flex  w-fit gap-4 my-2 items-center ml-4">

                                    <Link to={`/transactions/${transact.transactionHash}`} className='lg:hidden cursor-pointer text-sky-600'>

                                        {(transact.transactionHash).substring(0, 4)}...{(transact.transactionHash).substring(85, transact.transactionHash.length)}

                                    </Link>

                                    <Link to={`/transactions/${transact.transactionHash}`} className='hidden text-center lg:block cursor-pointer text-sky-600'>

                                        {(transact.transactionHash).substring(0, 10)}...{(transact.transactionHash).substring(70, transact.transactionHash.length)}

                                    </Link>
                                </td>
                                <td>

                                    <Link to={`/blocks/${transact.blockNumber}`} className='cursor-pointer text-sky-600'>{transact.blockNumber}</Link>
                                </td>
                                <td>
                                    <Link to={`/address/${transact.accounts[0].account.address}`} className='lg:hidden cursor-pointer text-sky-600'>{(transact.accounts[0].account.address).substring(0, 4)}...{(transact.accounts[0].account.address).substring(40, transact.accounts[0].account.length)}</Link>

                                    <Link to={`/address/${transact.accounts[0].account.address}`} className='hidden lg:block cursor-pointer text-sky-600'>{(transact.accounts[0].account.address).substring(0, 10)}...{(transact.accounts[0].account.address).substring(30, transact.accounts[0].account.length)}</Link>

                                </td>
                                <td>
                                    <div className='text-xs'>{(transact.meta.fee / 1e9).toString().substring(0, 8)}</div>
                                </td>

                                <td>

                                    <p className='text-xs'>{timeAgo(transact.blocktime.absolute)}</p>
                                </td>
                            </tr>)
                        }
                        )}


                    </tbody>
                </table>
                <div onClick={(prev) => setCurrentPage(Number(currentPage) + 1)} className='bg-white w-full py-4 rounded-b-xl border-t-[1px] cursor-pointer hover:bg-gray-100 font-bold'>Load More</div>
            </div>
        </>
    )
}

export default Transactions;