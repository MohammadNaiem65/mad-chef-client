import Recipes from './Recipes';

export default function MainSection({ chefData }) {
    return (
        <main className='col-span-4 md:col-span-3 p-6 bg-Primary/20 rounded'>
            <Recipes chefId={chefData?._id} />
        </main>
    );
}
