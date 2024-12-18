import Recipes from './Recipes';

export default function MainSection({ chefData }) {
    return (
        <main className='col-span-4 md:col-span-3 p-6 bg-[#eff1f4] rounded'>
            <Recipes chefId={chefData?._id} />
        </main>
    );
}
