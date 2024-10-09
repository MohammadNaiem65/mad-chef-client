export default function RecipeSection({ img, imgTitle, ingredients, method }) {
    return (
        <>
            <figure>
                <img
                    src={img}
                    alt='Dish image'
                    className='w-full max-h-[15.875rem] md:max-h-[26rem] mt-5 object-cover'
                />
                {imgTitle && (
                    <figcaption className='text-slate-500 text-center mt-1'>
                        {imgTitle}
                    </figcaption>
                )}
            </figure>

            <div className='mt-8 mb-10 text-slate-500'>
                <h3 className='text-xl text-slate-700 font-semibold'>
                    Ingredients:
                </h3>
                <ul className='mt-2 ml-5 list-disc list-inside'>
                    {ingredients?.map((ingredient, index) => (
                        <li key={index} className='capitalize'>
                            {ingredient}
                        </li>
                    ))}
                </ul>
                <h3 className='mt-7 text-xl text-slate-700 font-semibold'>
                    Method:
                </h3>
                <p className='text-justify'>{method}</p>
            </div>
        </>
    );
}
