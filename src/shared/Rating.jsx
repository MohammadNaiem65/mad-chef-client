import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function Rating({ rating }) {
	Array.from({ length: 5 }, (_, i) => {
		if (rating >= i + 1) {
			return <FaStar key={i} />;
		} else if (rating >= i + 0.5) {
			return <FaStarHalfAlt key={i} />;
		} else {
			return <FaRegStar key={i} />;
		}
	});
}
