import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import app from '../../firebase.config';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// sign up user with password
const signUpWithPassword = (email, password) =>
	createUserWithEmailAndPassword(auth, email, password);
// create/sign in user with google

const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

// sign in user with password
const signInWithPassword = (email, password) =>
	signInWithEmailAndPassword(auth, email, password);

export { signUpWithPassword, signInWithPassword, signInWithGoogle };
