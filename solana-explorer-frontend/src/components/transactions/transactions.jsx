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
            return Math.floor(interval) + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    };

    const TransactionAPI = async (page) => {

        console.log(page)

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
        
    }, [ currentPage]);

    console.log(transactions, currentPage)
    return (
        <>

<div className='overflow-auto bg-white p-4 bg-opacity-50 rounded-xl'>
                <table class=" table-auto bg-white rounded-t-xl text-black xl:w-full ">
                    <thead className="border-b-[1px] w-full">
                        <tr className="text-gray-400 w-fit">
                            <th className="flex  py-2 w-fit justify-start  ml-5 ">Signature</th>
                            <th className=""> Block</th>

                            <th className=""> Validator</th>

                            <th className=" ">Fee (in SOL)</th>

                            <th className=""> Time</th>


                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.map((transact, index) => {
                            // console.log(transact)
                            return (<tr key={index} className="border-b-[0.7px] text-xs md:text-sm lg:text-md xl:text-sm xl:mx-5 border-gray-400">
                                <td className="flex w-fit gap-4 my-2 items-center ml-2">
                                    <div className='flex  items-center border-[0.5px]  h-10 bg-black rounded-full'>
                                        <FaExchangeAlt className='h-5 w-10 ' />
                                    </div>
                                    <Link to={`/transactions/${transact.transactionHash}`} className='cursor-pointer text-sky-600'>

                                        {(transact.transactionHash).substring(0, 30)}...{(transact.transactionHash).substring(70, transact.transactionHash.length)}

                                    </Link>
                                </td>
                                <td>

                                    <Link to={`/blocks/${transact.blockNumber}`} className='cursor-pointer text-sky-600'>{transact.blockNumber}</Link>
                                </td>
                                <td>
                                    <Link to={`/address/${transact.accounts[0].account.address}`} className='cursor-pointer text-sky-600'>{(transact.accounts[0].account.address).substring(0, 10)}...{(transact.accounts[0].account.address).substring(30, transact.accounts[0].account.length)}</Link>
                                </td>
                                <td>
                                    <div className='text-xs'>{(transact.meta.fee / 1e9).toString().substring(0, 8)}</div>
                                </td>

                                <td>

                                    <p>{timeAgo(transact.blocktime.absolute)}</p>
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