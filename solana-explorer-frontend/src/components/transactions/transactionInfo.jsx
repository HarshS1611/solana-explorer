
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const TransactionDetails = () => {


    const [transactionData, setTransactionData] = useState([]);
    const { id } = useParams();

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

    const TransactionAPI = async () => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/transaction/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        console.log(response.data)
        setTransactionData(response.data)

    }

    useEffect(() => {

        TransactionAPI();


    }, []);
    return (
        <>
            {/* <div className='text-white overflow-hidden  flex flex-col gap-5 justify-start w-full'>
                <div className='flex gap-5'>
                    <p className='flex justify-start text-lg md:text-4xl font-bold'>Transaction </p>
                    <p className='flex items-center  px-4 text-md bg-green-600 rounded-full'>Success</p>
                </div>
                <p className='flex justify-start text-xs md:text-lg text-gray-400'> {transactions && transactions.hash && (transactions.hash)}</p>
                <div className='py-5 '>
                    <div className='flex flex-col bg-gray-800  justify-start rounded-xl py-2 px-5 border-black shadow-lg text-white'>
                        <div className='flex justify-between border-gray-600 border-b-[1px]'>
                            <div className='text-lg py-2 font-semibold'>Transaction Details </div>
                            <div className='text-sm py-1'> {timeAgo(transactions.timestamp)}
                                ∙ {new Date(transactions.timestamp * 1000).toLocaleString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', timeZone: 'Asia/Kolkata' })}
                            </div>
                        </div>
                        <div className='my-5 overflow-auto border-b-[1px] border-gray-600'>
                            <div className='flex py-4 justify-start gap-2 md:gap-6'>From <Link to={`/address/${transactions.from}`}>{transactions.from}</Link></div>
                            <div className=''><FaArrowDown /></div>
                            <div className='flex py-4 justify-start gap-4 md:gap-10'>To <Link to={`/address/${transactions.from}`}>{transactions.to}</Link></div>

                        </div>
                        <div className='border-b-[1px] border-gray-600'>
                            <div className='flex py-4 justify-start gap-10'> RON Transferred <p>{(parseFloat(transactions.value, 16) / 1e18)} RON</p> </div>
                        </div>
                        <details className='relative flex justify-start py-4 border-gray-600 border-b-[1px]'>
                            <summary className='flex justify-start items-center gap-2'>Advance Details <IoIosArrowDown className='text-white' /></summary>
                            <div className='border-[1px] rounded-xl border-gray-600 my-5 p-5'>
                                <div className='flex py-4 justify-start gap-16'>Block : <p>{transactions.block_number}</p></div>
                                <div className='flex py-4 justify-start gap-10'>Gas Price : <p>{transactions.gas_price} GWEI</p></div>
                                <div className='flex py-4 justify-start gap-16'>Nonce : <p>{transactions.nonce}</p></div>
                                <div className='flex py-4 justify-start gap-20'>Fee : <p>Free</p></div>
                                <div className='flex py-4 justify-start gap-8'>Gas Used : <p>{transactions.gas_used}</p></div>

                            </div>
                        </details>
                        <div className='py-5'>
                            <div className='flex justify-start'>Logs</div>
                            <div className='flex flex-col gap-5 border-[1px] border-gray-600 rounded-lg my-5 p-5 overflow-x-auto text-sm xl:text-md'>{transactions && transactions.logs && transactions.logs.map((log, idx) => (
                                <div className='flex flex-col  justify-start' key={idx}>
                                    <div className='flex justify-start'>Address : {log.address}</div>
                                    <div className='flex lg:gap-4'> Topics: <div className='flex flex-col'>{log.topics.map((t, i) => (<div key={i} className='flex'>{i} : {t}</div>))}</div></div>
                                </div>
                            ))}</div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}

export default TransactionDetails;