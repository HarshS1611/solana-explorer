import React, { useEffect, useState } from 'react';
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaTachometerAlt } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";
import { MdCurrencyExchange } from "react-icons/md";

import axios from 'axios';

function MainSection() {

    const [generalInfo, setGeneralInfo] = useState(null);



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
        console.log(generalInfo.data)
        setGeneralInfo(generalInfo.data)

    }

    useEffect(() => {
        if (!generalInfo) {
            GetInfo();
        }
    }, [generalInfo]);


    return (
        <div className="flex flex-col gap-4 text-white">
            <div className='grid grid-cols-3 gap-10'>
                    <div
                        className="relative flex items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-lime-300"
                    >
                        <div
                            className="group absolute top-5 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[rgba(107,33,168,0.24)] backdrop-blur-[6px] duration-[500ms] hover:h-[10em] hover:top-1/2 hover:left-1/2 hover:w-[16em] hover:rounded-[1.5em]"
                        >
                            <svg
                                className="h-10 w-10 duration-300 group-hover:opacity-0"
                                viewBox="0 0 48 48"
                                fill="none"
                                height="10"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#a)">
                                    <path
                                        clip-rule="evenodd"
                                        d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z"
                                        fill-rule="evenodd"
                                        fill="#fff"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h48v48H0z" fill="#fff"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                            <div
                                className="items-left duration-600 absolute left-0 top-0 flex h-[10em] w-[16em] translate-y-[100%] flex-col justify-between p-[1.5em] font-nunito text-[hsl(0,0%,85%)] group-hover:translate-y-0"
                            >
                                <div className="items-left flex flex-col justify-center">
                                    <h1 className="text-[1.5em] font-bold leading-[0.8em]">Heading</h1>
                                    <p className="text-sm ">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                                        magni repudiandae tenetur odio
                                    </p>
                                </div>

                                <p className="cursor-pointer text-[0.7em] underline">learn more</p>
                            </div>
                        </div>
                        <h1 className="text-center font-nunito text-md font-black text-purple-950">
                            SOL Supply
                        </h1>
                        <p>{generalInfo && generalInfo.totalSupply}</p>
                        <div>
                            <div>
                                <p>Circulating Supply</p> <p>{generalInfo && generalInfo.circulatingSupply }  {generalInfo && Math.round(generalInfo.circulatingSupply/generalInfo.totalSupply * 100)}</p>
                            </div>
                            <div>
                                <p>Non-circulating Supply</p> <p>{generalInfo && (generalInfo.totalSupply - generalInfo.circulatingSupply)} {generalInfo && Math.round((generalInfo.totalSupply - generalInfo.circulatingSupply)/generalInfo.totalSupply * 100)}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="relative flex items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-lime-300"
                    >
                        <div
                            className="group absolute top-5 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[rgba(107,33,168,0.24)] backdrop-blur-[6px] duration-[500ms] hover:h-[10em] hover:top-1/2 hover:left-1/2 hover:w-[16em] hover:rounded-[1.5em]"
                        >
                            <svg
                                className="h-10 w-10 duration-300 group-hover:opacity-0"
                                viewBox="0 0 48 48"
                                fill="none"
                                height="10"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#a)">
                                    <path
                                        clip-rule="evenodd"
                                        d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z"
                                        fill-rule="evenodd"
                                        fill="#fff"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h48v48H0z" fill="#fff"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                            <div
                                className="items-left duration-600 absolute left-0 top-0 flex h-[10em] w-[16em] translate-y-[100%] flex-col justify-between p-[1.5em] font-nunito text-[hsl(0,0%,85%)] group-hover:translate-y-0"
                            >
                                <div className="items-left flex flex-col justify-center">
                                    <h1 className="text-[1.5em] font-bold leading-[0.8em]">Heading</h1>
                                    <p className="text-sm ">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                                        magni repudiandae tenetur odio
                                    </p>
                                </div>

                                <p className="cursor-pointer text-[0.7em] underline">learn more</p>
                            </div>
                        </div>
                        <h1 className="text-center font-nunito text-md font-black text-purple-950">
                            SOL Supply
                        </h1>
                        <p>{generalInfo && generalInfo.totalSupply}</p>
                        <div>
                            <div>
                                <p>Circulating Supply</p> <p>{generalInfo && generalInfo.circulatingSupply }  {generalInfo && Math.round(generalInfo.circulatingSupply/generalInfo.totalSupply * 100)}</p>
                            </div>
                            <div>
                                <p>Non-circulating Supply</p> <p>{generalInfo && (generalInfo.totalSupply - generalInfo.circulatingSupply)} {generalInfo && Math.round((generalInfo.totalSupply - generalInfo.circulatingSupply)/generalInfo.totalSupply * 100)}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="relative flex items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-lime-300"
                    >
                        <div
                            className="group absolute top-5 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[rgba(107,33,168,0.24)] backdrop-blur-[6px] duration-[500ms] hover:h-[10em] hover:top-1/2 hover:left-1/2 hover:w-[16em] hover:rounded-[1.5em]"
                        >
                            <svg
                                className="h-10 w-10 duration-300 group-hover:opacity-0"
                                viewBox="0 0 48 48"
                                fill="none"
                                height="10"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#a)">
                                    <path
                                        clip-rule="evenodd"
                                        d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z"
                                        fill-rule="evenodd"
                                        fill="#fff"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h48v48H0z" fill="#fff"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                            <div
                                className="items-left duration-600 absolute left-0 top-0 flex h-[10em] w-[16em] translate-y-[100%] flex-col justify-between p-[1.5em] font-nunito text-[hsl(0,0%,85%)] group-hover:translate-y-0"
                            >
                                <div className="items-left flex flex-col justify-center">
                                    <h1 className="text-[1.5em] font-bold leading-[0.8em]">Heading</h1>
                                    <p className="text-sm ">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                                        magni repudiandae tenetur odio
                                    </p>
                                </div>

                                <p className="cursor-pointer text-[0.7em] underline">learn more</p>
                            </div>
                        </div>
                        <h1 className="text-center font-nunito text-md font-black text-purple-950">
                            SOL Supply
                        </h1>
                        <p>{generalInfo && generalInfo.totalSupply}</p>
                        <div>
                            <div>
                                <p>Circulating Supply</p> <p>{generalInfo && generalInfo.circulatingSupply }  {generalInfo && Math.round(generalInfo.circulatingSupply/generalInfo.totalSupply * 100)}</p>
                            </div>
                            <div>
                                <p>Non-circulating Supply</p> <p>{generalInfo && (generalInfo.totalSupply - generalInfo.circulatingSupply)} {generalInfo && Math.round((generalInfo.totalSupply - generalInfo.circulatingSupply)/generalInfo.totalSupply * 100)}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="relative flex items-center justify-center rounded-[1.5em] border-[1px] shadow-xl bg-white p-[1.5em] text-lime-300"
                    >
                        <div
                            className="group absolute top-5 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[rgba(107,33,168,0.24)] backdrop-blur-[6px] duration-[500ms] hover:h-[10em] hover:top-1/2 hover:left-1/2 hover:w-[16em] hover:rounded-[1.5em]"
                        >
                            <svg
                                className="h-10 w-10 duration-300 group-hover:opacity-0"
                                viewBox="0 0 48 48"
                                fill="none"
                                height="10"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#a)">
                                    <path
                                        clip-rule="evenodd"
                                        d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z"
                                        fill-rule="evenodd"
                                        fill="#fff"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h48v48H0z" fill="#fff"></path>
                                    </clipPath>
                                </defs>
                            </svg>
                            <div
                                className="items-left duration-600 absolute left-0 top-0 flex h-[10em] w-[16em] translate-y-[100%] flex-col justify-between p-[1.5em] font-nunito text-[hsl(0,0%,85%)] group-hover:translate-y-0"
                            >
                                <div className="items-left flex flex-col justify-center">
                                    <h1 className="text-[1.5em] font-bold leading-[0.8em]">Heading</h1>
                                    <p className="text-sm ">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                                        magni repudiandae tenetur odio
                                    </p>
                                </div>

                                <p className="cursor-pointer text-[0.7em] underline">learn more</p>
                            </div>
                        </div>
                        <h1 className="text-center font-nunito text-md font-black text-purple-950">
                            SOL Supply
                        </h1>
                        <p>{generalInfo && generalInfo.totalSupply}</p>
                        <div>
                            <div>
                                <p>Circulating Supply</p> <p>{generalInfo && generalInfo.circulatingSupply }  {generalInfo && Math.round(generalInfo.circulatingSupply/generalInfo.totalSupply * 100)}</p>
                            </div>
                            <div>
                                <p>Non-circulating Supply</p> <p>{generalInfo && (generalInfo.totalSupply - generalInfo.circulatingSupply)} {generalInfo && Math.round((generalInfo.totalSupply - generalInfo.circulatingSupply)/generalInfo.totalSupply * 100)}</p>
                            </div>
                        </div>
                    </div>

            </div>


        </div >
    );
}

export default MainSection;