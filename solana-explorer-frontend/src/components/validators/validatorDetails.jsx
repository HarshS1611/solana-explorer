
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../../styles/loading.css';
import '../../styles/transaction.css';

const ValidatorDetails = () => {


    const [validatorData, setValidatorData] = useState([]);
    const [generalInfo, setGeneralInfo] = useState(null);
    const [transactionData, setTransactionData] = useState([]);
    const { id } = useParams();
    const [totalShares, setTotalShares] = useState(0)
    const [currentPage, setCurrentPage] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

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

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/validator/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        console.log(response.data, currentPage)
        setValidatorData(response.data)

        const total = response.data.validator.delegatingStakeAccounts.reduce((acc, item) => acc + item.data.stake.delegation.stake, 0)
        // console.log(total)
        setTotalShares(total)

        const totalPages = Math.ceil(response.data.validator.delegatingStakeAccounts.length / 10)
        setTotalPages(totalPages)
        console.log(totalPages)

        const generalInfo = await axios.get(`https://public-api.solanabeach.io/v1/general-info?`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        setGeneralInfo(generalInfo.data)

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

                        {validatorData && validatorData.validator ? (
                            <div className='flex flex-col gap-5 w-full' >
                                <div className="flex justify-start items-center gap-4 w-full text-xl">
                                    <div className='flex  items-center border-[0.5px]  h-10  rounded-full'>
                                        {validatorData.validator.pictureURL ? <img src={validatorData.validator.pictureURL} className='h-10 w-10 rounded-full' /> : <p className='flex items-center text-md font-bold justify-center h-10 w-10 p-2 rounded-full'>{validatorData.validator.moniker}</p>}
                                    </div>
                                    <div className=''>

                                        <Link to={`/account/${validatorData.validator.votePubkey}`} className='flex justify-start cursor-pointer'>
                                            {validatorData.validator.moniker ? validatorData.validator.moniker :

                                                <p>{(validatorData.validator.votePubkey).substring(0, 10)}...{(validatorData.validator.votePubkey).substring(35, validatorData.validator.votePubkey.length)}</p>}
                                        </Link>
                                        <p className='md:block hidden text-start text-xs'>Vote Key: {validatorData.validator.votePubkey}</p>
                                        <p className='md:block hidden text-start text-xs'>Identity: {validatorData.validator.nodePubkey}</p>
                                        <p className='md:hidden flex text-start text-xs'>Vote Key: {(validatorData.validator.votePubkey).substring(0,15)}...</p>
                                        <p className='md:hidden flex text-start text-xs'>Identity: {(validatorData.validator.nodePubkey).substring(0,15)}...</p>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full text-sm">
                                    {validatorData.validator.website && <><p>Website</p> <a className='text-blue-500' href={validatorData.validator.website} target='blank' >{validatorData.validator.website}</a></>}

                                </div>

                                <div className="flex justify-between w-full text-sm">
                                    <p>Commission</p> <p className='font-black text-purple-950'>{validatorData.validator.commission} %</p>
                                </div>
                                <div className="flex justify-between w-full text-sm">
                                    <p>Slot success rate</p><p className='font-black text-purple-950'> {validatorData.validator.blockProduction && Math.ceil((validatorData.validator.blockProduction.leaderSlots - validatorData.validator.blockProduction.skippedSlots) / validatorData.validator.blockProduction.leaderSlots * 100)} %</p>
                                </div>

                                <div className="flex justify-between w-full text-sm">
                                    <p>Stake</p> <p className='font-black text-purple-950'>{validatorData.validator.activatedStake && generalInfo && (validatorData.validator.activatedStake / generalInfo.activatedStake * 100).toString().substring(0, 4)} % ({Math.floor(validatorData.validator.activatedStake / 1e9)}) SOL</p>
                                </div>
                                <div className="flex justify-between w-full text-sm">
                                    <p>ASN</p><p className='font-black text-purple-950'>{validatorData.validator.asn.organization}</p>
                                </div>

                            </div>
                        ) : <div className='flex w-full justify-center items-center'>
                            <div className="spinner my-10">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>}
                    </div>




                    <div className='overflow-auto bg-white md:p-4 bg-opacity-50 rounded-xl mt-10'>
                        <table className="table-auto bg-white rounded-t-xl w-full  ">
                            <thead>
                                <tr className='border-b-[1px]'>
                                    <th className="text-start lg:text-center ml-10 px-10 py-2">STAKE ACCOUNT
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
                                            <td className="md:px-6 py-2">
                                                {txn.pubkey && <>
                                                    <Link to={`/account/${txn.pubkey}`} className="hidden md:block  text-sm items-center gap-2 cursor-pointer text-blue-400">
                                                        <p>{(txn.pubkey)}</p>
                                                    </Link>
                                                    <Link to={`/account/${txn.pubkey}`} className="block md:hidden text-sm items-center gap-2 cursor-pointer text-blue-400">
                                                        <p>{(txn.pubkey).substring(0,10)}...</p>
                                                    </Link>
                                                    </>}

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
                            {validatorData.validator && validatorData.validator.delegatingStakeAccounts && validatorData.validator.delegatingStakeAccounts.slice(0, 10).map((txn, index) => {
                                return (
                                    <button onClick={() => setCurrentPage((index + 1) * 10)} className={currentPage === (index + 1) * 10 ? 'flex text-xs cursor-pointer p-2 bg-gray-200 rounded-full' : 'flex text-xs cursor-pointer p-2 hover:bg-gray-100 rounded-full'}>
                                        {index + 1}
                                    </button>
                                )
                            })
                            }
                        </div>

                    </div>


                </div>
            </div>

        </>
    )
}

export default ValidatorDetails;