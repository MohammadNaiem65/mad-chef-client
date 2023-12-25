import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithPopup,
} from 'firebase/auth';
import app from '../../firebase.config';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// create user with goggle
const signInWithGoogle = () => {
	return signInWithPopup(auth, new GoogleAuthProvider());
};

const signUpWithPassword = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export { signInWithGoogle, signUpWithPassword };
