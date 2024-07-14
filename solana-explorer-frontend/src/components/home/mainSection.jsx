import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import '../../styles/transaction.css'
import '../../styles/loading.css'
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
        console.log(generalInfo.data)

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
                }), (item.price)];
        });

        const finalPrice = [["Time", "Price $"], ...pData];
        setPriceData(finalPrice);
        console.log(finalPrice)

        setPriceOptions({
            chart: {
                title: "Solana Price (24h)",
            },
        });

    }


    useEffect(() => {
        GetInfo();

        setInterval(() => {
            GetInfo();
        }, 10000);

    }, []);



    return (
        <div className="flex flex-col gap-4 text-white">
            {generalInfo ? <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                <div
                    className="relative text-md flex flex-col items-center justify-start rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-black"
                >

                    <h1 className='text-start font-bold w-full'>
                        Total Supply (SOL)
                    </h1>
                    <p className=' text-start w-full font-nunito text-sm lg:text-xl font-black text-purple-600'>{generalInfo && generalInfo.activatedStake}</p>
                    <div className='xl:flex justify-start w-full gap-4 text-sm mt-2 xl:mt-5'>
                        <div>
                            <p className='text-start w-full'>Current Stake</p> <p className='text-purple-600 text-start font-semibold'>{generalInfo && (generalInfo.activatedStake - generalInfo.delinquentStake)}</p>
                        </div>
                        <div>
                            <p className='text-start w-full'>Delinquent Stake</p><p className='text-purple-600 text-start font-semibold'>{generalInfo && generalInfo.delinquentStake}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="relative flex flex-col w-full text-md items-center justify-start rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-black"
                >

                    <h1 className="flex font-bold  text-start w-full justify-start">
                        Total Transactions
                    </h1>
                    <p className='text-sm lg:text-xl text-start w-full  font-nunito font-black text-purple-600'>{generalInfo && generalInfo.totalSupply}</p>
                    <div className='flex justify-start w-full xl:gap-5 py-2'>
                        <div className='font-bold text-start w-full' >
                            <div >
                                Current Epoch 
                                <div className="tooltip">
                                    <div class="icon">i</div>
                                    <div class="tooltiptext text-start text-xs">Epoch Info<br />

                                        Epoch start date: {new Date(generalInfo.epochInfo.epochStartTime * 1000).toLocaleString()}<br />
                                        Slots in Epoch: {generalInfo.epochInfo.slotsInEpoch}</div>
                                </div>
                            </div>
                            <p className='text-sm lg:text-xl font-nunito font-black text-purple-600 '>{generalInfo && generalInfo.epoch}</p>
                        </div>
                        <div className='font-bold text-start w-full'>
                            <div className='text-md'>
                                <div>Average TPS <div className="tooltip">
                                    <div class="icon">i</div>
                                    <div class="tooltiptext text-xs">Solana TPS excludes vote transactions</div>
                                </div></div> <p className='text-sm lg:text-xl font-nunito font-black text-purple-600'>{generalInfo && Math.ceil(generalInfo.avgTPS)} </p>
                            </div>


                        </div>
                    </div>
                </div>

                <div
                    className="relative flex w-full px-6 flex-col text-md text-black items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white py-4 p-2"
                >
                    <h1 className="flex text-start items-start font-bold w-full ">
                        SOL Stake
                    </h1>
                    <p className='text-start w-full font-nunito text-sm lg:text-xl font-black text-purple-600'>{generalInfo && generalInfo.totalSupply}</p>
                    <div className='flex flex-col justify-start w-full gap-2 mt-2 text-xs'>
                        <div>
                            <p className='text-start w-full'>Circulating Supply ({generalInfo && Math.round(generalInfo.circulatingSupply / generalInfo.totalSupply * 100)}%)</p> <p className='text-purple-600 font-semibold text-start'>{generalInfo && generalInfo.circulatingSupply}  </p>
                        </div>
                        <div>
                            <p className='text-start w-full'>Non-circulating Supply ({generalInfo && Math.round((generalInfo.totalSupply - generalInfo.circulatingSupply) / generalInfo.totalSupply * 100)}%)</p> <p className='text-purple-600 font-semibold text-start'>{generalInfo && (generalInfo.totalSupply - generalInfo.circulatingSupply)} </p>
                        </div>
                    </div>

                </div>



            </div> : <div
                className="relative flex flex-col items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-black"
            >
                <div className='flex w-full justify-center items-center'>
                    <div className="spinner my-10">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>}
            <div className='mb-6 bg-white p-4 rounded-2xl shadow-xl w-full items-center gap-10 '>






                {generalInfo ? <>
                    <div className="tab-container flex justify-start ml-10 mb-5 w-max">
                        <input type="radio" name="tab" id="tab1" className="tab tab--1" />
                        <label onClick={() => setSelectedTab(1)} className="tab_label text-black" for="tab1">Transaction Volume</label>

                        <input type="radio" name="tab" id="tab2" className="tab tab--2" />
                        <label onClick={() => setSelectedTab(2)} className="tab_label text-black" for="tab2">Price</label>


                        <div className="indicator"></div>
                    </div>
                    {selectedTab === 1 && volumeData && volumeData.length > 0 && <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={volumeData}
                        options={volumeOptions}
                    />
                    }

                    {selectedTab === 2 && priceData && priceData.length > 0 && (
                        <Chart
                            chartType="Line"
                            width="100%"
                            height="400px"
                            data={priceData}
                            options={priceOptions}
                        />
                    )}</> : <div className='flex w-full justify-center items-center'>
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

        </div >
    );
}

export default MainSection;
