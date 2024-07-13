
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import '../../styles/transaction.css';

const AccountDetails = () => {


    const [accountData, setAccountData] = useState([]);
    const [generalInfo, setGeneralInfo] = useState(null);
    const [transactionData, setTransactionData] = useState([]);
    const { id } = useParams();
    const [totalShares, setTotalShares] = useState(0)
    const [currentPage, setCurrentPage] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalToken, setTotalToken] = useState(0)

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

    const AccountAPI = async () => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/account/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        console.log(response.data, currentPage)
        setAccountData(response.data)

        // const total = response.data.validator.delegatingStakeAccounts.reduce((acc, item) => acc + item.data.stake.delegation.stake, 0)
        // // console.log(total)
        // setTotalShares(total)

        // const totalPages = Math.ceil(response.data.validator.delegatingStakeAccounts.length / 10)
        // setTotalPages(totalPages)
        // console.log(totalPages)

        const generalInfo = await axios.get(`https://public-api.solanabeach.io/v1/account/${id}/tokens`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        console.log(generalInfo.data)
        setGeneralInfo(generalInfo.data)

        const tokenTotal = generalInfo.data.reduce((acc, item) => acc + item.price, 0)
        console.log(tokenTotal)
        setTotalToken(tokenTotal)



        const blockTxns = await axios.get(`${import.meta.env.VITE_API_URL}/account/${id}/transactions`,
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

        AccountAPI();
    }, []);

    return (
        <>
            <div>
                <div className=''>

                    <div
                        className="relative flex flex-col gap-5 items-center justify-center rounded-lg border-[1px] shadow-xl bg-white p-[1.5em] "
                    >

                        {accountData && accountData.value ? (
                            <div className='flex flex-col gap-5 w-full' >
                                <div className="flex justify-between w-full text-sm">
                                    <p>Address</p> <p>{accountData.value.base.address.address}</p>

                                </div>

                                <div className="flex justify-between w-full text-sm">
                                    <p>Owner Program</p> <p>{accountData.value.base.owner.name}</p>
                                </div>
                                <div className='grid grid-cols-2 w-full gap-4'>
                                    <div className="flex justify-between w-full text-sm">
                                        <p>Balance</p><p>{(accountData.value.base.balance)}</p>
                                    </div>
                                    <div className="flex justify-between w-full text-sm pl-2 border-black border-s-[1px]">
                                        <p>Account Type</p><p>{accountData.type}</p>
                                    </div>
                                    <div className="flex justify-between w-full text-sm">
                                        <p>Token Balance</p><p>${totalToken} ({generalInfo.length} Tokens)</p>
                                    </div>
                                    <div className="flex justify-between w-full text-sm border-black border-s-[1px] pl-2">
                                        <p>Rent Exempt Reserve</p><p>{accountData.value.base.rentExemptReserve}</p>
                                    </div>
                                </div>
                            </div>
                        ) : <>Loading..</>}
                    </div>




                    {/* <div className='overflow-auto bg-white p-4 bg-opacity-50 rounded-xl mt-10'>
                        <table className="table-auto bg-white rounded-t-xl w-full  ">
                            <thead>
                                <tr className='border-b-[1px]'>
                                    <th className="px-4 py-2">STAKE ACCOUNT
                                    </th>
                                    <th className="flex justify-center px-4 py-2">ACTIVATION EPOCH	</th>
                                    <th className="px-4 py-2">AMOUNT</th>
                                    <th className="px-4 py-2">SHARE</th>
                                </tr>
                            </thead>
                            <tbody>

                                {validatorData.validator && validatorData.validator.delegatingStakeAccounts && validatorData.validator.delegatingStakeAccounts.slice(currentPage - 10, currentPage).map((txn, index) => {
                                    return (
                                        <tr key={index} className='ml-4 py-2 border-b-[1px] w-full'>
                                            <td className="px-4 py-2">
                                                {(txn.pubkey)}
                                            </td>

                                            <td className="px-4 py-2">{txn.data.stake.delegation.activation_epoch}</td>
                                            <td className="px-4 py-2">{Math.ceil(txn.data.stake.delegation.stake / 1e9)} SOL</td>
                                            <td className="px-4 py-2">{(txn.data.stake.delegation.stake / totalShares * 100).toString().substring(0, 4)} %</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className='flex justify-center gap-1 bg-white w-full py-4 rounded-b-xl border-t-[1px] '>
                            {validatorData.validator && validatorData.validator.delegatingStakeAccounts && validatorData.validator.delegatingStakeAccounts.slice(0, totalPages).map((txn, index) => {
                                return (
                                    <button onClick={() => setCurrentPage((index + 1) * 10)} className={currentPage === (index + 1) * 10 ? 'flex text-xs cursor-pointer p-2 bg-gray-200 rounded-full' : 'flex text-xs cursor-pointer p-2 hover:bg-gray-100 rounded-full'}>
                                        {index + 1}
                                    </button>
                                )
                            })
                            }
                        </div>

                    </div> */}


                </div>
            </div>

        </>
    )
}

export default AccountDetails;