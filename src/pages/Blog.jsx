import { Helmet } from "react-helmet-async";

export default function Blog() {
    return (
		<section>
			<Helmet>
				<title>Blog - Mad Chef</title>
			</Helmet>
			
			
			<div className="mt-[13rem] md:mt-[18rem] text-center">No blogs uploaded yet.</div>
		</section>
	);
}