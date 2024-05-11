import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BuyProPkg from '../components/Payment/BuyProPkg';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_PK);

export default function Payment() {
	return (
		<Elements stripe={stripePromise}>
			<BuyProPkg />
		</Elements>
	);
}
