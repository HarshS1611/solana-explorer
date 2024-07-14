
import BlockDetails from '../components/blocks/blockDetails';
import SearchComponent from '../components/searchBar';
import { Link } from 'react-router-dom';

const BlockInfo = () => {
    return (
        <div className="home overflow-hidden">
            <div >
                <div className='md:flex justify-center w-full items-center gap-10 mt-20 md:mt-10'>
                  
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