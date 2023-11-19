import { UserDetails } from '../components/RecipeDetails';
import { allFoodLg } from '../assets';

export default function RecipeDetails() {
	return (
		<section className='w-11/12 lg:w-1/2 mx-auto'>
			<h2 className='text-3xl lg:text-[2.8rem] text-slate-800 font-Popins font-bold'>
				Before Thanksgiving Turns Ugly
			</h2>

			{/* user details */}
			<UserDetails />

			<figure>
				<img
					src={allFoodLg}
					alt=''
					className='w-full max-h-[15.875rem] md:max-h-[52rem] mt-5'
				/>
				<figcaption className='text-slate-500 text-center mt-1'>
					Italian Dishes
				</figcaption>
			</figure>

			<div className='mt-8 text-slate-500'>
				<h3 className='text-xl text-slate-700 font-semibold'>
					Ingredients:
				</h3>
				<ul className='mt-2 ml-5 list-disc list-inside'>
					<li>Potato</li>
					<li>Potata</li>
					<li>Go on</li>
				</ul>
				<h3 className='mt-7 text-xl text-slate-700 font-semibold'>
					Method:
				</h3>
				<p className='text-justify'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Assumenda, dicta, atque dolorum necessitatibus hic sapiente
					dolor, fuga neque perspiciatis nostrum sed quos! Consectetur
					explicabo facere nobis sunt adipisci corrupti. Architecto
					sequi, molestiae accusantium sunt inventore, doloremque ab
					ipsum enim voluptatibus quis rerum nobis, nisi excepturi sit
					magnam quod reprehenderit veniam consectetur perferendis
					quasi veritatis minus! Voluptatibus aperiam laudantium quo
					optio dolor dignissimos repellendus sapiente, odio
					recusandae minus quia doloribus labore adipisci asperiores
					quibusdam tempora ullam sit reiciendis molestias molestiae
					quaerat repellat ea distinctio? Ullam, rerum veritatis.
					Repellendus numquam quidem dignissimos a suscipit qui iusto
					nobis quo accusantium fuga eum et officia, blanditiis eaque
					adipisci nisi culpa facilis, autem laudantium quas rerum
					necessitatibus illum iure. Pariatur dolorem veniam
					necessitatibus deleniti iure possimus labore molestiae
					similique quaerat cumque harum officia sapiente distinctio
					vero consectetur itaque voluptatibus saepe, a quis sequi eum
					enim? Ullam quaerat consectetur quae esse adipisci
					voluptates modi ipsam totam voluptate quibusdam! Beatae
					vitae recusandae nostrum eos modi iste numquam eius
					provident, earum sed repellat quidem ex, commodi alias in
					hic doloremque eaque. Iste voluptatibus ut voluptates
					accusamus quaerat necessitatibus reprehenderit,
					exercitationem magni eos voluptas maiores, minus, tempore
					laudantium? Id explicabo atque animi praesentium possimus
					aliquid mollitia, ad omnis esse provident, sequi maiores eos
					ullam tempora vel. Nam, eius culpa quas officia sapiente sed
					laboriosam optio nesciunt cumque exercitationem provident
					voluptatum nobis reprehenderit tenetur sit repellendus omnis
					molestiae quibusdam corrupti, recusandae blanditiis hic
					dolorem fuga! Possimus voluptatem quibusdam atque fugit
					numquam est cum sed iste alias, excepturi tempore pariatur
					sunt animi similique, ipsa aliquam. Dolores voluptate dicta
					illo saepe alias? Velit iste aliquam repellat. Quis officia
					dolorem blanditiis saepe quae nam nisi amet quod nulla, a,
					ut ex, qui aspernatur odit. Aliquid perspiciatis, error
					saepe eius aliquam obcaecati, ullam facilis mollitia cumque
					doloribus porro rerum modi provident ipsa inventore nihil.
				</p>
			</div>
		</section>
	);
}
