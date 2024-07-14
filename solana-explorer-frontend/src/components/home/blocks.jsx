import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/loading.css'

const Blocks = () => {

    const [blocks, setBlocks] = useState([]);

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

    const BlockAPI = async () => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/latest-blocks?limit=7`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )
        // console.log(response.data)
        setBlocks(response.data)


    }

    useEffect(() => {

        BlockAPI();
    }, []);

    return (
        <div className='w-full bg-white md:p-4 bg-opacity-50 rounded-xl'>
            <table class="table-auto overflow-auto shadow-xl bg-white rounded-lg text-black w-full ">
                <thead className="rounded-lg border-b-[1px] text-md w-full">
                    <tr className=" text-md  w-full">
                        <th className="flex text-start  py-4 ml-5  text-sm">Latest Blocks</th>



                    </tr>
                    <tr className='text-sm'>
                        <th className='w-40 text-start pl-10'>SLOT</th>
                        <th>VALIDATOR</th>
                        <th className='flex justify-end w-10'>TXS</th>
                        <th className=''>TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {blocks ? blocks.map((transact, index) => {
                        return (
                            <tr key={index} className="border-b-[0.7px] border-gray-400 text-xs md:text-md md:px-4">
                                <td className="flex py-4 w-max items-center flex-row gap-2 justify-start ml-5">

                                    <div className='flex justify-start '>
                                        <Link to={`/blocks/${transact.blocknumber}`} className="flex justify-start cursor-pointer text-sky-600">

                                            {transact.blocknumber}
                                        </Link>

                                    </div>

                                </td>
                                <td className='w-max'>
                                    <div>
                                        <div className="flex md:block gap-2 justify-start text-sky-600 ">
                                            <Link to={`/validator/${transact.proposer}`} className='cursor-pointer'>
                                                {(transact.proposer).substring(0, 4)}...{(transact.proposer).substring(38, transact.proposer.length)}

                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td className='flex w-max justify-end'>
                                    <p>   {(transact.metrics.txcount)}</p>
                                </td>
                                <td className='w-max '>

                                    {transact.blocktime.absolute.absolute ?
                                        <p>{timeAgo(transact.blocktime.absolute.absolute)}</p>
                                        : <p>{timeAgo(transact.blocktime.absolute)}</p>
                                    }
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

export default Blocks;