
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import '../../styles/transaction.css';

const BlockDetails = () => {


    const [blockData, setBlockData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);
    const { id } = useParams();
    const [payer, setPayer] = useState(0)

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

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/block/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        console.log(response.data)
        setBlockData(response.data)

        const blockTxns = await axios.get(`${import.meta.env.VITE_API_URL}/block-transactions/${id}?offet=0&limit=10`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        console.log(blockTxns.data)
        setTransactionData(blockTxns.data)

    }


    useEffect(() => {

        BlockAPI();
    }, []);

    return (
        <>
            <div>
                <div className=''>

                    <div
                        className="relative flex flex-col gap-5 items-center justify-center rounded-lg border-[1px] shadow-xl bg-white p-[1.5em] "
                    >

                        {blockData ? (
                            <div className='flex flex-col gap-5 w-full' >
                                <div className="flex justify-between w-full text-sm">
                                    <p className='font-semibold text-xl'>{blockData.blocknumber}</p>
                                </div>
                                <div className="flex justify-between w-full text-sm">
                                    <p>Block Hash</p> <p>{blockData.blockhash}</p>

                                </div>

                                <div className="flex justify-between w-full text-sm">
                                    <p>Previous BlockHash</p> <p>{blockData.previousblockhash}</p>
                                </div>
                                <div className="flex justify-between w-full text-sm">
                                    <p>Proposer</p><p >{blockData.proposerData && blockData.proposerData.name ? (<div className='flex items-center gap-2'><img className='w-5 h-5' src={blockData.proposerData.image} alt={blockData.proposer} /> {blockData.proposerData.name}</div>) : blockData.proposer}</p>
                                </div>

                            </div>
                        ) : <>Loading..</>}
                    </div>

                    <div>
                        <div >
                            {blockData && blockData.metrics &&

                                <div className="flex flex-col gap-5 w-full bg-white p-4 rounded-xl my-5">
                                    <h1 className='flex justify-start text-2xl font-semibold'>Instruction Breakdown
                                    </h1>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='flex justify-between text-sm'>
                                            <p>Number of Transactions
                                            </p>
                                            <p>{blockData.metrics.txcount}</p>
                                        </div>
                                        <div className='flex justify-between text-sm pl-2 border-black border-s-[1px]'>
                                            <p>Total fees

                                            </p>
                                            <p>{blockData.metrics.totalfees / 1e9} SOL</p>

                                        </div>
                                        <div className='flex justify-between text-sm'>
                                            <p>Transaction success rate

                                            </p>
                                            <p>{(blockData.metrics.sucessfultxs / blockData.metrics.txcount * 100).toString().substring(0, 5)} %</p>

                                        </div>
                                        <div className='flex justify-between text-sm pl-2 border-black border-s-[1px]'>
                                            <p>SOL moved

                                            </p>
                                            <p>{blockData.metrics.totalvaluemoved / 1e9} SOL</p>

                                        </div>
                                        <div className='flex justify-between text-sm'>
                                            <p>Total instructions

                                            </p>
                                            <p>{blockData.metrics.instructions}</p>

                                        </div>
                                        <div className='flex justify-between text-sm pl-2 border-black border-s-[1px]'>
                                            <p>Validator rewards

                                            </p>
                                            <p>{blockData.rewards[0].lamports / 1e9} SOL</p>

                                        </div>
                                    </div>

                                </div>


                            }
                        </div>
                    </div>


                    <div>
                        <table className="table-auto bg-white rounded-xl w-full mt-10 ">
                            <thead>
                                <tr className='border-b-[1px]'>
                                    <th className="px-4 py-2">TRANSACTION HASH	
                                    </th>
                                    <th className="flex justify-start px-4 py-2">INSTRUCTIONS	</th>
                                    <th className="px-4 py-2">STATUS</th>
                                    <th className="px-4 py-2">FEE</th>
                                    <th className="px-4 py-2">TIME</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                    {transactionData.data && transactionData.data.map((txn, index) => {
                                        return (
                                            <tr key={index} className='ml-4 py-2 border-b-[1px] w-full'>
                                                <td className="px-4 py-2">  
                                                <Link className='cursor-pointer text-blue-500' to={`/transactions/${txn.transactionHash}`}>                                         
                                                 {(txn.transactionHash).substring(0, 10)}...{(txn.transactionHash).substring(74, txn.transactionHash.length)}
                                                </Link>
                                                </td>
                                                <td className="grid grid-cols-3 py-4 text-xs justify-center items-center w-max gap-2">
                                                    {txn.instructions && txn.instructions.map((ins,id)=>{

                                                    return(
                                                            <p className='flex justify-start'>{Object.keys(ins)[0] == 'raw' ? "Unknown" : Object.keys(ins.parsed) }</p>
                                                       ) 
                                                })}</td>
                                                <td className="px-4 py-2">{txn.valid ? "Success" : "Failed"}</td>
                                                <td className="px-4 py-2">{txn.meta.fee}</td>
                                                <td className="px-4 py-2">{timeAgo(txn.blocktime.absolute)}</td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>

        </>
    )
}

export default BlockDetails;