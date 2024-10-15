import TopRatedRecipes from './TopRatedRecipes';
import RecentReviews from './RecentReviews';

export default function Sidebar({ chefId }) {
    return (
        <section className='px-1 py-2 lg:p-6 bg-[#eff1f4]'>
            <TopRatedRecipes chefId={chefId} />
            <RecentReviews chefId={chefId} />
        </section>
    );
}
