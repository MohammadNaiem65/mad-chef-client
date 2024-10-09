import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

/**
 * A rating component that displays a certain number of stars based on the rating value.
 * Each star can be clicked to set the rating to that value.
 * @param {Object} props
 * @prop {number} rating The current rating, a value between 0 and 5.
 * @prop {function} setRating An optional function to set the rating, takes a number as argument.
 * @returns {JSX.Element} A JSX element representing the rating stars.
 */
export default function Rating({ rating, setRating }) {
    const handleSetRating = (value) => {
        if (typeof setRating === 'function') {
            setRating(value);
        }
    };

    return Array.from({ length: 5 }, (_, i) => {
        if (rating >= i + 1) {
            return <FaStar key={i} onClick={() => handleSetRating(i + 1)} />;
        } else if (rating >= i + 0.5) {
            return (
                <FaStarHalfAlt key={i} onClick={() => handleSetRating(i + 1)} />
            );
        } else {
            return <FaRegStar key={i} onClick={() => handleSetRating(i + 1)} />;
        }
    });
}
