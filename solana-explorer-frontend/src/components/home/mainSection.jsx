import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../../styles/transaction.css'

import axios from 'axios';

function MainSection() {

    const [generalInfo, setGeneralInfo] = useState(null);
    const [volumeData, setVolumeData] = useState([]);
    const [volumeOptions, setVolumeOptions] = useState({});
    const [priceData, setPriceData] = useState([]);
    const [priceOptions, setPriceOptions] = useState({});
    const [selectedTab, setSelectedTab] = useState(1)

    const GetInfo = async () => {


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

        const response = await axios.get(`https://public-api.solanabeach.io/v1/market-chart-data?`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `${import.meta.env.VITE_API_KEY}`
                },
            }
        )

        const volData = response.data.map(item => {

            return [new Date(item.timestamp).toLocaleString("en-US",
                {
                    month: "short",
                    day: "2-digit",
                }), item.volume_24h];
        });

        const final = [["Time", "Txn Vol"], ...volData];
        setVolumeData(final);


        setVolumeOptions({
            chart: {
                title: "Transaction Volume (24h)",
            },
        });

        const pData = response.data.map(item => {
            return [new Date(item.timestamp).toLocaleString("en-US",
                {
                    month: "short",
                    day: "2-digit",
                }), item.price];
        });

        const finalPrice = [["Time", "Price $"], ...pData];
        setPriceData(finalPrice);

        setPriceOptions({
            chart: {
                title: "Solana Price (24h)",
            },
        });

    }


    useEffect(() => {
        GetInfo();

    }, []);



    return (
        <div className="flex flex-col gap-4 text-white">
            <div className='grid grid-cols-3 gap-10'>
                <div
                    className="relative text-md flex flex-col items-center justify-start rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-black"
                >

                    <h1 >
                        Total Stake (SOL)
                    </h1>
                    <p className='text-2xl font-nunito text-md font-black text-purple-950'>{generalInfo && generalInfo.activatedStake}</p>
                    <div className='flex gap-4 text-sm mt-5'>
                        <div>
                            <p>Current Stake</p> <p className='text-purple-950 font-semibold'>{generalInfo && generalInfo.delinquentStake}</p>
                        </div>
                        <div>
                            <p>Delinquent Stake</p> <p className='text-purple-950 font-semibold'>{generalInfo && (generalInfo.activatedStake - generalInfo.delinquentStake)}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="relative flex flex-col text-md gap-2 items-center justify-start rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-black"
                >

                    <h1 className="flex justify-start">
                        Total Transactions
                    </h1>
                    <p className='text-2xl font-nunito text-md font-black text-purple-950'>{generalInfo && generalInfo.totalSupply}</p>
                    <div className='flex gap-5'>
                        <div  >
                            <h1 >
                                Current Epoch
                            </h1>
                            <p className='text-3xl font-nunito font-black text-purple-950 '>{generalInfo && generalInfo.epoch}</p>
                        </div>
                        <div>
                            <div className='text-md'>
                                <p>Average TPS</p> <p className='text-3xl font-nunito text-md font-black text-purple-950'>{generalInfo && Math.ceil(generalInfo.avgTPS)} </p>
                            </div>


                        </div>
                    </div>
                </div>

                <div
                    className="relative flex flex-col gap-4 text-md text-black items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-2"
                >
                    <div className='flex flex-col -mt-5 gap-2'>
                        <h1 className="">
                            SOL Supply
                        </h1>
                        <p className='text-center font-nunito text-2xl font-black text-purple-950'>{generalInfo && generalInfo.totalSupply}</p>
                    </div>
                    <div className='flex gap-2 text-xs'>
                        <div>
                            <p>Circulating Supply</p> <p className='text-purple-950 font-semibold'>{generalInfo && generalInfo.circulatingSupply}  {generalInfo && Math.round(generalInfo.circulatingSupply / generalInfo.totalSupply * 100)}</p>
                        </div>
                        <div>
                            <p>Non-circulating Supply</p> <p className='text-purple-950 font-semibold'>{generalInfo && (generalInfo.totalSupply - generalInfo.circulatingSupply)} {generalInfo && Math.round((generalInfo.totalSupply - generalInfo.circulatingSupply) / generalInfo.totalSupply * 100)}</p>
                        </div>
                    </div>

                </div>



            </div>

            <div
                className="relative flex flex-col items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-black"
            >
                <div className="tab-container flex justify-start w-max">
                    <input type="radio" name="tab" id="tab1" className="tab tab--1" />
                    <label onClick={() => setSelectedTab(1)} className="tab_label text-black" for="tab1">Transaction Volume</label>

                    <input type="radio" name="tab" id="tab2" className="tab tab--2" />
                    <label onClick={() => setSelectedTab(2)} className="tab_label text-black" for="tab2">Price</label>


                    <div className="indicator"></div>
                </div>


                {generalInfo ? <>
                    {selectedTab === 1 && generalInfo && volumeData && <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={volumeData}
                        options={volumeOptions}
                    />
                    }

                    {selectedTab === 2 && generalInfo && priceData && (
                        <Chart
                            chartType="Line"
                            width="100%"
                            height="400px"
                            data={priceData}
                            options={priceOptions}
                        />
                    )}</> : <p>Loading...</p>}
            </div>

        </div >
    );
}

export default MainSection;
