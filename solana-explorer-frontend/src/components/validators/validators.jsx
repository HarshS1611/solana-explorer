import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Validators = () => {

    const [validators, setValidators] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [generalInfo, setGeneralInfo] = useState(null);
    const [totalStake, setTotalStake] = useState(0)


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

    const ValidatorAPI = async (page) => {

        console.log(page)

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/validators/all`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )

        setValidators(response.data)

        const generalInfo = await axios.get(`https://public-api.solanabeach.io/v1/general-info?`,
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

        const totalStake = response.data.map((validator) => validator.activatedStake).reduce((a, b) => a + b, 0)
        setTotalStake(totalStake)

    }

    useEffect(() => {

        ValidatorAPI(currentPage);

    }, []);

    console.log(validators, currentPage)
    return (
        <>
            <div>
                <div className='mb-6 bg-white p-4 rounded-2xl shadow-xl w-full items-center gap-10  mt-10'>
                    {generalInfo && validators &&
                        <div className='flex justify-around'>
                            <div>
                                <p className='text-xl font-bold'>Validators</p><p className='text-blue-500 text-2xl font-bold mt-2'>{validators.length}</p><p className='text-xs'>Superminority: {generalInfo.superminority.nr}</p></div>
                            <div><p className='text-xl font-bold'>Weighted Skip Rate <p className='text-blue-500 text-2xl mt-2'>{(generalInfo.skipRate.stakeWeightedSkipRate).toString().substring(0, 4)} %</p> </p><p className='text-xs'>Non-weighted: {((generalInfo.skipRate.skipRate - generalInfo.skipRate.stakeWeightedSkipRate) / generalInfo.skipRate.skipRate * 100).toString().substring(0, 4)} %</p>
                            </div>
                            <div><p className='text-xl font-bold'>Nominal Staking APY <p className='text-blue-500 text-2xl mt-2'>{(generalInfo.stakingYield).toString().substring(0, 4)} %</p></p>
                            </div>
                            <div><p className='text-xl font-bold'>Node Versions <p className='text-blue-500 text-2xl mt-2'>{generalInfo.stakeWeightedNodeVersions[0].version}</p></p><p className='text-xs'>others: {(generalInfo.stakeWeightedNodeVersions[1].value).toString().substring(0, 4)} %</p>
                            </div>
                        </div>
                    }
                </div>

                <div className='overflow-auto bg-white p-4 bg-opacity-50 rounded-xl'>
                    <table class=" table-auto bg-white rounded-t-xl text-black xl:w-full ">
                        <thead className="border-b-[1px] w-full">
                            <tr className="text-gray-400 text-sm w-fit">
                                <th className="flex  py-2 w-fit justify-start ml-2 ">#</th>
                                <th className=""> VALIDATOR</th>

                                <th className=""> STAKE</th>

                                <th className=" ">CUMULATIVE STAKE
                                </th>

                                <th className=""> COMMISSION</th>

                                <th className=""> LAST VOTE</th>


                            </tr>
                        </thead>
                        <tbody>
                            {validators && validators.slice(0, 100 * currentPage).map((transact, index) => {

                                return (<tr key={index} className="border-b-[0.7px] text-xs md:text-sm lg:text-md xl:text-sm xl:mx-5 border-gray-400">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td className="flex w-fit gap-4 my-2 items-center ml-2">
                                        <div className='flex  items-center border-[0.5px]  h-10  rounded-full'>
                                            {transact.pictureURL ? <img src={transact.pictureURL} className='h-10 w-10 rounded-full' /> : <p className='flex items-center text-md font-bold justify-center h-10 w-10 rounded-full'>{transact.moniker[0]}</p>}
                                        </div>
                                        <Link to={`/validator/${transact.moniker}`} className='cursor-pointer text-sm text-sky-600'>

                                            {transact.moniker ? transact.moniker : (transact.votePubkey).substring(0, 10)}...{(transact.votePubkey).substring(35, transact.votePubkey.length)}

                                        </Link>
                                    </td>
                                    <td>

                                        <div lassName='cursor-pointer text-xs text-sky-600'>{transact.activatedStake} ({transact.delegatorCount})</div>
                                    </td>
                                    <td>
                                        <div className=''>{(transact.activatedStake / totalStake * 100).toString().substring(0, 4)} %</div>
                                    </td>
                                    <td>
                                        <div className='text-xs'>{(transact.commission)}</div>
                                    </td>

                                    <td>

                                        <p>{transact.lastVote}</p>
                                    </td>
                                </tr>)
                            }
                            )}


                        </tbody>
                    </table>
                    <div onClick={(prev) => setCurrentPage(Number(currentPage) + 1)} className='bg-white w-full py-4 rounded-b-xl border-t-[1px] cursor-pointer hover:bg-gray-100 font-bold'>Load More</div>
                </div>
            </div>
        </>
    )
}

export default Validators;