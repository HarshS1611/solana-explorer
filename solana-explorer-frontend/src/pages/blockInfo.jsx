
import BlockDetails from '../components/blocks/blockDetails';
import SearchComponent from '../components/searchBar';
import { Link } from 'react-router-dom';

const BlockInfo = () => {
    return (
        <div className="home overflow-hidden">
            <div >
                <div className='md:flex justify-center w-full items-center gap-10 mt-20 md:mt-10'>
                    <div>
                        <Link to={'/'} className='flex justify-start text-gray-200  w-full'>
                            <button
                                type="button"
                                className="bg-white text-center w-20 rounded-lg h-10 relative font-sans text-black text-xl font-semibold group"
                            >
                                <div
                                    class="bg-sky-300 px-1 rounded-md h-8 w-max flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-500"
                                >
                                    <svg
                                        width="20"
                                        height="20px"
                                        viewBox="0 0 1024 1024"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#000000"
                                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                        ></path>
                                        <path
                                            fill="#000000"
                                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                        ></path>
                                    </svg>
                                </div>
                                <p class="text-xs translate-x-2 pl-2">Home</p>
                            </button>

                        </Link>
                    </div>
                    <div className='md:flex w-full'>
                        <div className='md:flex text-start w-full text-2xl lg:text-4xl mt-2 text-white font-bold'>Block Details

                        </div>
                        <div className='w-full'>
                            <SearchComponent />
                        </div>
                    </div>

                </div>

                <div className='flex  flex-col gap-10 py-8 xl:py-10'>
                    <BlockDetails />
                </div>
            </div>
        </div>
    );
}

export default BlockInfo;