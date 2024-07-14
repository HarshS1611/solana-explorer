import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/loading.css'

const Blocks = () => {

    const [blocks, setBlocks] = useState([]);
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

    const BlockAPI = async (page) => {

        // console.log(page)

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-blocks?limit=${20 * page}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        setBlocks(response.data)

    }

    useEffect(() => {

        BlockAPI(currentPage);

    }, [currentPage]);

    // console.log(blocks, currentPage)
    return (
        <>


            <div className='overflow-auto bg-white md:p-4 bg-opacity-50 rounded-xl'>
                <table class=" table-auto bg-white rounded-t-xl text-black w-full ">
                    <thead className="border-b-[1px] w-full">
                        <tr className="text-gray-400 w-fit">
                            <th className="flex  py-2 w-fit justify-start text-xs md:text-md ml-5 ">Transaction Hash</th>
                            <th className="text-xs md:text-md"> Block</th>

                            <th className="text-xs md:text-md">
                                Validator</th>

                            <th className=" text-xs md:text-md">Reward (in SOL)</th>

                            <th className="text-xs md:text-md"> Time</th>


                        </tr>
                    </thead>
                    <tbody>
                        {blocks ? blocks.map((transact, index) => {
                            // console.log(transact)
                            return (
                                <tr key={index} className="border-b-[0.7px] text-xs px-4 md:text-sm lg:text-sm xl:text-sm xl:mx-5 border-gray-400">
                                    <td className="flex w-fit gap-1 my-4 items-center ml-2">

                                        <Link to={`/transactions/${transact.blockhash}`} className='hidden xl:block cursor-pointer text-sky-600'>

                                            {(transact.blockhash)}

                                        </Link>

                                        <Link to={`/transactions/${transact.blockhash}`} className='hidden md:block xl:hidden cursor-pointer text-sky-600'>

                                            {(transact.blockhash).substring(0, 20)}...

                                        </Link>
                                        <Link to={`/transactions/${transact.blockhash}`} className='block md:hidden cursor-pointer text-sky-600'>

                                            {(transact.blockhash).substring(0, 10)}...

                                        </Link>
                                    </td>
                                    <td>

                                        <Link to={`/blocks/${transact.blocknumber}`} className='cursor-pointer text-sky-600'>{transact.blocknumber}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/validator/${transact.proposer}`} className='hidden xl:block cursor-pointer text-sky-600'>{(transact.proposer)}</Link>
                                        <Link to={`/validator/${transact.proposer}`} className='hidden md:block xl:hidden cursor-pointer text-sky-600'>{(transact.proposer).substring(0, 20)}...</Link>
                                        <Link to={`/validator/${transact.proposer}`} className='block md:hidden cursor-pointer text-sky-600'>{(transact.proposer).substring(0, 10)}...</Link>


                                    </td>
                                    <td>
                                        <div className='text-xs'>{(transact.rewards[0].lamports / 1e9).toString().substring(0, 8)}</div>
                                    </td>

                                    <td className='text-xs mr-2'>
                                        {transact.blocktime.absolute.absolute ?
                                            <p>{timeAgo(transact.blocktime.absolute.absolute)}</p>
                                            : <p>{timeAgo(transact.blocktime.absolute)}</p>
                                        }
                                    </td>
                                </tr>)
                        }
                        ) : <div>
                            <div className="spinner my-10">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>}


                    </tbody>
                </table>
                <div onClick={(prev) => setCurrentPage(Number(currentPage) + 1)} className='bg-white w-full py-4 rounded-b-xl border-t-[1px] cursor-pointer hover:bg-gray-100 font-bold'>Load More</div>
            </div>
        </>
    )
}

export default Blocks;