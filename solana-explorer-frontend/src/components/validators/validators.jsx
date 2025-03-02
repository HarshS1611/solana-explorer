import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/loading.css'

const Validators = () => {

    const [validators, setValidators] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [generalInfo, setGeneralInfo] = useState(null);


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


    }

    useEffect(() => {

        ValidatorAPI(currentPage);

    }, []);

    console.log(validators, currentPage)
    return (
        <>
            <div>
                <div className='mb-6 bg-white p-4 rounded-2xl shadow-xl w-full items-center gap-10 '>
                    {generalInfo && validators ?
                        <div className='grid grid-cols-2 text-start lg:grid-cols-4 items-start gap-4 justify-center ml-5'>
                            <div>
                                <p className='lg:text-xl font-bold'>Validators    <div className="tooltip">
                                    <div class="icon">i</div>
                                    <div class="tooltiptext text-start text-xs">This is the number of active validators
                                        based on the networks activity in the past 24h</div>
                                </div></p><p className='text-blue-500 text-xl lg:text-2xl font-bold mt-2'>{validators.length}</p><p className='text-xs'>Superminority: {generalInfo.superminority.nr}</p></div>
                            <div><p className='lg:text-xl font-bold'>Weighted Skip Rate    <div className="tooltip">
                                <div class="icon">i</div>
                                <div class="tooltiptext text-start text-xs">If a validator fails to produce
                                    an entry during their assigned time
                                    window, this is considered a skip.
                                    The skip rate refers to the share of
                                    assigned leader slots that have not
                                    been fulfilled by the respective
                                    validator. The weighted skip rate
                                    takes the validators's stake into
                                    account.</div>
                            </div><p className='text-blue-500 text-xl lg:text-2xl mt-2'>{(generalInfo.skipRate.stakeWeightedSkipRate).toString().substring(0, 4)} %</p> </p><p className='text-xs'>Non-weighted: {((generalInfo.skipRate.skipRate - generalInfo.skipRate.stakeWeightedSkipRate) / generalInfo.skipRate.skipRate * 100).toString().substring(0, 4)} %</p>
                            </div>
                            <div><p className='lg:text-xl font-bold'>Nominal Staking APY    <div className="tooltip">
                                <div class="icon">i</div>
                                <div class="tooltiptext text-start text-xs">This is the Annual Percentage
                                    Yield earned by staking SOL.
                                    It is based on the network's
                                    performance i.t.o. actual slot
                                    times during the past 24 hours.
                                    Please note that this value does
                                    not take validator commission
                                    fees into account.</div>
                            </div><p className='text-blue-500 text-xl lg:text-2xl mt-2'>{(generalInfo.stakingYield).toString().substring(0, 4)} %</p></p>
                            </div>
                            <div><p className='lg:text-xl font-bold'>Node Versions    <div className="tooltip">
                                <div class="icon">i</div>
                                <div class="tooltiptext text-start text-xs">Distribution of node software
                                    versions run by the validators on
                                    Mainnet Beta.</div>
                            </div><p className='text-blue-500 text-xl lg:text-2xl mt-2'>{generalInfo.stakeWeightedNodeVersions[0].version}</p></p><p className='text-xs'>others: {(generalInfo.stakeWeightedNodeVersions[1].value).toString().substring(0, 4)} %</p>
                            </div>
                        </div>

                        : <div className='flex w-full justify-center items-center'>
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

                <div className='overflow-auto bg-white lg:p-2 xl:p-4 bg-opacity-50 rounded-xl'>
                    <table class=" table-auto bg-white rounded-t-xl text-black xl:w-full ">
                        <thead className="border-b-[1px] w-full">
                            <tr className="text-gray-400 text-sm w-fit">
                                <th className="flex  py-2 w-fit justify-start ml-2 ">#</th>
                                <th className="text-xs lg:text-md"> VALIDATOR</th>

                                <th className="text-xs lg:text-md"> STAKE</th>

                                <th className="text-xs lg:text-md ">CUMULATIVE STAKE
                                </th>

                                <th className="text-xs lg:text-md"> COMMISSION</th>

                                <th className="text-xs lg:text-md"> LAST VOTE</th>


                            </tr>
                        </thead>
                        <tbody>
                            {validators && validators.slice(0, 100 * currentPage).map((transact, index) => {

                                return (<tr key={index} className="border-b-[0.7px] text-xs md:text-sm lg:text-md xl:text-sm  mr-2 xl:mx-5 border-gray-400">
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td className="flex w-fit gap-4 my-2 items-center ml-2">
                                        <div className='flex  items-center border-[0.5px]  h-10  rounded-full'>
                                            {transact.pictureURL ? <img src={transact.pictureURL} className='h-5 w-5 lg:h-10 lg:w-10 rounded-full' /> : <p className='flex items-center text-md font-bold justify-center h-10 w-10 rounded-full'>{transact.moniker[0]}</p>}
                                        </div>
                                        <Link to={`/validator/${transact.votePubkey}`} className='cursor-pointer text-start text-xs lg:text-sm text-sky-600'>

                                            {transact.moniker ? transact.moniker : (transact.votePubkey).substring(0, 10)}...{(transact.votePubkey).substring(35, transact.votePubkey.length)}

                                        </Link>
                                    </td>
                                    <td>

                                        <div lassName='cursor-pointer text-xs text-sky-600'>{transact.activatedStake} ({transact.delegatorCount})</div>
                                    </td>
                                    <td>
                                        <div className=''>{transact.activatedStake && generalInfo && (transact.activatedStake / generalInfo.activatedStake * 100).toString().substring(0, 4)} %</div>
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