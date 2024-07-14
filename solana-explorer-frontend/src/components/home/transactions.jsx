import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/loading.css'
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

    const TransactionAPI = async () => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-transactions?limit=7`,
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

        TransactionAPI();

        setInterval(() => {
            TransactionAPI()
        }, 10000);

    }, []);

    return (
        <div className='w-full bg-white md:p-4 mt-5 lg:mt-0 bg-opacity-50 rounded-xl'>
            <table class="table-auto overflow-auto shadow-xl bg-white  rounded-lg text-black w-full ">
                <thead className="rounded-lg border-b-[1px] w-full">
                    <tr className="   w-full">
                        <th className="flex text-start py-4 ml-5 text-xs md:text-sm">Latest Transactions</th>


                    </tr>
                    <tr className='text-xs md:text-sm'>
                        <th className='text-start pl-5 w-10 md:w-40'>TX HASH</th>
                        <th>INSTRUCTIONS <div className="tooltip">
                            <div class="icon text-xs">i</div>
                            <div class="tooltiptext text-start text-xs"> Instructions are the smallest unit
                                of a program that clients can
                                include in a transaction. They are
                                executed sequentially and atomically
                                for each transaction, which can
                                contain numerous instructions.</div>
                        </div>
                        </th>
                        <th className='flex justify-end w-10'>SLOT</th>
                        <th className=''>TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions ? transactions.map((transact, index) => {
                        // console.log(transact)
                        return (
                            <tr key={index} className="border-b-[0.7px] border-gray-400 text-xs md:text-md md:px-4">
                                <td className="flex py-4 w-max items-center flex-row gap-2 justify-start ml-5">

                                    <div className='flex justify-start'>
                                        <Link to={`/transactions/${transact.transactionHash}`} className="lg:hidden  flex justify-start cursor-pointer text-sky-600">

                                            {(transact.transactionHash).substring(0, 4)}...{(transact.transactionHash).substring(83, transact.transactionHash.length)}
                                        </Link>
                                        <Link to={`/transactions/${transact.transactionHash}`} className="hidden md:block justify-start cursor-pointer text-sky-600">

                                            {(transact.transactionHash).substring(0, 10)}...{(transact.transactionHash).substring(80, transact.transactionHash.length)}
                                        </Link>


                                    </div>

                                </td>
                                <td className='w-max h-max'>
                                    <p className="flex gap-2 justify-center">
                                        <div >{(transact.mostImportantInstruction.name).substring(0, 12)}</div>
                                    </p>
                                </td>
                                <td className='flex w-max text-sky-600 cursor-pointer justify-end'>
                                    <p>   {(transact.blockNumber)}</p>
                                </td>
                                <td className='w-max '>

                                    <p>{timeAgo(transact.blocktime.absolute)}</p>
                                </td>
                            </tr>)
                    }
                    ) : <div className="spinner my-10">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>}


                </tbody>
            </table></div>
    )
}

export default Transactions;