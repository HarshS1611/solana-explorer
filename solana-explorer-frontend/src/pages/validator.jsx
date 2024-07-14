
import SearchComponent from '../components/searchBar';
import { Link } from 'react-router-dom';
import Validators from '../components/validators/validators';

const AllValidators = () => {
    return (
        <div className="home overflow-hidden">
            <div >
                <div className='lg:flex justify-center w-full items-center gap-10  mt-20 md:mt-10'>
                 
                    <div className='md:flex items-center w-full'>
                        <div className='flex justify-start text-2xl mt-2 md:text-4xl w-full text-white font-bold'>All Validators

                        </div>
                        <div className='w-full'>
                            <SearchComponent />
                        </div>
                    </div>

                </div>

                <div className='flex  flex-col gap-10 py-8 xl:py-10'>
                    <Validators />
                </div>
            </div>
        </div>
    );
}

export default AllValidators;