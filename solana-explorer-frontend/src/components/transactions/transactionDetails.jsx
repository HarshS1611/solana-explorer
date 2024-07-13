
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import '../../styles/transaction.css';

const TransactionDetails = () => {


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
        setTransactionData(response.data)

    }


    useEffect(() => {

        TransactionAPI();
    }, []);

    return (
        <>
            <div>
                <div className=''>
                    

                    <div
                        className="relative flex flex-col gap-5 items-center justify-center rounded-lg border-[1px] shadow-xl bg-white p-[1.5em] "
                    >

                        {transactionData ? (
                            <div className='flex flex-col gap-5 w-full' id='scrSpySummary'>
                                <div className="flex justify-between w-full text-sm">
                                    <p>Transaction Hash</p> <p className='font-black text-purple-950'>{transactionData.transactionHash}</p>

                                </div>

                                <div className="flex justify-between w-full text-sm">
                                    <p>Recent BlockHash</p> <p className='font-black text-purple-950'>{transactionData.recentBlockhash}</p>
                                </div>
                                <div className='grid grid-cols-2 w-full gap-4'>
                                    <div className="flex justify-between w-full text-sm">
                                        <p>Timestamp</p><p className='font-black text-purple-950'>{transactionData.blocktime && timeAgo(transactionData.blocktime.absolute)}</p>
                                    </div>
                                    <div className="flex justify-between w-full text-sm pl-2 border-black border-s-[1px]">
                                        <p>Block</p><p className='font-black text-purple-950'>{transactionData.blockNumber}</p>
                                    </div>
                                    <div className="flex justify-between w-full text-sm">
                                        <p>Status</p><p className='font-black text-purple-950'>{transactionData.valid ? "Success" : "Failed"}</p>
                                    </div>
                                    <div className="flex justify-between w-full text-sm border-black border-s-[1px] pl-2">
                                        <p>Fee</p><p className='font-black text-purple-950'>{transactionData.meta && transactionData.meta.fee / 1e9} SOL</p>
                                    </div>
                                </div>
                            </div>
                        ) : <>Loading..</>}
                    </div>

                    <div>
                        <table className="table-auto bg-white rounded-xl w-full mt-10 ">
                            <thead>
                                <tr className='border-b-[1px]'>
                                    <th className="px-4 py-2">ACCOUNT INPUTS
                                    </th>
                                    <th className="flex justify-start px-4 py-2">POST BALANCE (SOL)	</th>
                                    <th className="px-4 py-2">CHANGE  (SOL)</th>
                                    <th className="px-4 py-2">DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='ml-4 border-b-[1px]'>
                                    <td className='px-4 py-4'>
                                        {transactionData && transactionData.accounts ? transactionData.accounts.map((acc, indx) => {
                                            return (
                                                <Link to={`/account/${acc.account.address}`} className="flex text-sm items-center gap-2 cursor-pointer text-blue-400">
                                                    <p>{acc.account.address}</p>
                                                </Link>
                                            )
                                        }) : <>Loading..</>}

                                    </td>
                                    <td>
                                        {transactionData && transactionData.meta && transactionData.meta.postBalances ? transactionData.meta.postBalances.slice(0, transactionData.accounts.length).map((acc, indx) => {
                                            return (
                                                <div className="flex text-sm items-center gap-2">
                                                    <p>{(acc / 1e9)} SOL</p>
                                                </div>
                                            )

                                        }) : <>Loading..</>}
                                    </td>
                                    <td>
                                        {transactionData && transactionData.meta && transactionData.meta.preBalances && transactionData.meta.postBalances ? transactionData.meta.postBalances.slice(0, transactionData.accounts.length).map((acc, indx) => {
                                            if ((acc - transactionData.meta.preBalances[indx]) > 0) {
                                                setPayer(indx)
                                            }
                                            return (
                                                <div className="flex text-sm items-center gap-2">
                                                    <p>{((acc - transactionData.meta.preBalances[indx]) / 1e9)} SOL</p>
                                                </div>
                                            )

                                        }) : <>Loading..</>}
                                    </td>
                                    <td>
                                        {transactionData && transactionData.accounts ? transactionData.accounts.map((acc, indx) => {
                                            return (
                                                <div className="flex text-sm justify-start items-center gap-1">
                                                    <p className='text-white'>{indx}</p>
                                                    <p>{indx == payer && "Payer"}</p>
                                                    <p>{!acc.writable && "ReadOnly"}</p>
                                                    <p>{acc.program && "Program"}</p>
                                                    <p>{acc.signer && "Signer"}</p>
                                                </div>
                                            )
                                        }) : <>Loading..</>}

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <div className=''>
                            {transactionData && transactionData.instructions ? transactionData.instructions.map((ins, indx) => {
                                return (
                                    <div className="flex flex-col gap-5 w-full bg-white p-4 rounded-xl my-5">
                                        <h1 className='flex justify-start text-2xl font-semibold'>0{indx + 1} Undecoded Instruction</h1>
                                        <div className="flex justify-between w-full text-sm">
                                            <p>Program	</p> <p className='font-black text-purple-950'>{ins.programId.name || ins.programId.address}</p>
                                        </div>
                                        {ins.raw && ins.raw.data && <div className="flex justify-between w-full text-sm">
                                            <p>Data</p>
                                            <div className='flex flex-col font-black text-purple-950 bg-gray-100 p-2 rounded-md items-start
                                             justify-start'>

                                                <p >{(ins.raw.data).substring(0, 29)}</p>
                                                <p>{(ins.raw.data).substring(29, 58)}</p>
                                                <p>{(ins.raw.data).substring(58, 87)}</p>
                                                <p>{(ins.raw.data).substring(87, 116)}</p>
                                                <p>{(ins.raw.data).substring(116, 145)}</p>
                                                <p>{(ins.raw.data).substring(145, 174)}</p>
                                                <p>{(ins.raw.data).substring(174, 203)}</p>
                                                <p>{(ins.raw.data).substring(203, 232)}</p>
                                            </div>
                                        </div>
                                        }
                                        {ins.parsed && ins.parsed.CreateAssociatedTokenAccount && <div className="flex justify-between w-full text-sm">
                                            <p>Associated Token Account</p> <p className='font-black text-purple-950'>{ins.parsed.CreateAssociatedTokenAccount.associatedTokenAccount.address}</p>
                                        </div>}
                                        {ins.parsed && ins.parsed.CreateAssociatedTokenAccount && <div className="flex justify-between w-full text-sm">
                                            <p>Funding Account</p> <p className='font-black text-purple-950'>{ins.parsed.CreateAssociatedTokenAccount.fundingAccount.address}</p>
                                        </div>}
                                        {ins.parsed && ins.parsed.CreateAssociatedTokenAccount && <div className="flex justify-between w-full text-sm">
                                            <p>Wallet Account</p> <p className='font-black text-purple-950'>{ins.parsed.CreateAssociatedTokenAccount.walletAccount.address}</p>
                                        </div>}
                                        {ins.parsed && ins.parsed.CreateAssociatedTokenAccount && <div className="flex justify-between w-full text-sm">
                                            <p>System Program</p> <p className='font-black text-purple-950'>{ins.parsed.CreateAssociatedTokenAccount.systemProgram.name}</p>
                                        </div>}
                                        {ins.parsed && ins.parsed.CloseAccount && <div className="flex justify-between w-full text-sm">
                                            <p>Destination Account</p> <p className='font-black text-purple-950'>{ins.parsed.CloseAccount.destinationAccount.address}</p>
                                        </div>}
                                        {ins.parsed && ins.parsed.CloseAccount && <div className="flex justify-between w-full text-sm">
                                            <p> Account</p> <p className='font-black text-purple-950'>{ins.parsed.CloseAccount.account.address}</p>
                                        </div>}

                                        {ins.raw && ins.raw.data && <div className="flex justify-between w-full text-sm">
                                            <p>Program Id Index	</p> <p className='font-black text-purple-950'>{ins.raw && ins.raw.programIdIndex && ins.raw.programIdIndex}</p>
                                        </div>}

                                        {ins.raw && ins.raw.data && <div className="flex justify-between w-full text-sm">
                                            <p>Stack Height	</p> <p className='font-black text-purple-950'>{ins.raw && ins.raw.stackHeight ? ins.raw.stackHeight : "null"}</p>
                                        </div>}
                                    </div>
                                )
                            }) : <>Loading..</>

                            }
                        </div>
                    </div>

                    <div>
                        <div className='flex flex-col gap-5 w-full bg-white p-4 rounded-xl my-5'>
                            <h1 className='flex justify-start text-2xl font-semibold'>Program Logs</h1>
                            <div className="flex flex-col justify-start items-start p-2 w-full text-sm bg-gray-100 rounded-xl">

                                {transactionData && transactionData.meta ? transactionData.meta.logMessages.map((ins, indx) => {
                                    return (
                                        <div className="flex text-xs justify-start w-full">
                                            {ins}
                                        </div>

                                    )
                                }) : <>Loading..</>

                                }                                    </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TransactionDetails;