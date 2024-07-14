
import BlockDetails from '../components/blocks/blockDetails';
import SearchComponent from '../components/searchBar';
import { Link } from 'react-router-dom';
import ValidatorDetails from '../components/validators/validatorDetails';

const ValidatorInfo = () => {
    return (
        <div className="home overflow-hidden">
            <div >
            <div className='md:flex justify-center w-full items-center gap-8 mt-20 md:mt-10'>
                
                    <div className='md:flex w-full items-center'>
                        <div className='flex justify-start text-xl mt-2 lg:text-4xl w-full text-white font-bold'>Validator Details

                        </div>
                        <div className='w-full'>
                            <SearchComponent />
                        </div>
                    </div>

                </div>


                <div className='flex  flex-col gap-10 py-8 xl:py-10'>
                    <ValidatorDetails />
                </div>
            </div>
        </div>
    );
}

export default ValidatorInfo;