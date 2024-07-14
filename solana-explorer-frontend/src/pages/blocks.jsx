

import Blocks from '../components/blocks/blocks';
import SearchComponent from '../components/searchBar';
import Transactions from '../components/transactions/transactions';
import { Link } from 'react-router-dom';

const AllBlocks = () => {
    return (
        <div className="home overflow-hidden">
            <div >
                <div className='md:flex justify-center w-full items-center gap-10  mt-20 md:mt-10'>
                
                    <div className='md:flex  items-center gap-10 w-full'>
                        <div className='flex justify-start items-center text-2xl lg:text-4xl w-full mt-2 text-white font-bold'>All Blocks

                        </div>
                        <div className='w-full'>
                            <SearchComponent />
                        </div>
                    </div>

                </div>

                <div className='flex  flex-col gap-10 py-8 xl:py-10'>
                    <Blocks />
                </div>
            </div>
        </div>
    );
}

export default AllBlocks;