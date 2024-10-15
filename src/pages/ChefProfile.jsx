import { useParams } from 'react-router-dom';
import {
    Banner,
    MainSection,
    Ratings,
    Sidebar,
} from '../components/ChefProfile';
import { useWindowSize } from '../hooks';
import { useGetChefQuery } from '../features/chef/chefApi';

export default function ChefProfile() {
    const { chefId } = useParams();
    const { width } = useWindowSize();

    const { data } = useGetChefQuery({
        chef_id: chefId,
    });
    const chefData = data?.data || {};

    return (
        <section className='w-full xl:w-4/5 mx-auto grid grid-cols-4 gap-x-2 gap-y-10'>
            <Banner chefData={chefData} />
            <MainSection chefData={chefData} />

            {/* Render Sidebar only for smaller devices */}
            {width < 768 || <Sidebar chefId={chefId} />}

            <Ratings chefId={chefId} />
        </section>
    );
}
