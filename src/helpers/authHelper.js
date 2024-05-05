import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import app from '../../firebase.config';
import showNotification from './showNotification';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Sign up user with password
const signUpWithPassword = (email, password) =>
	createUserWithEmailAndPassword(auth, email, password);

// Create/Sign in user with google
const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

// Sign in user with password
const signInWithPassword = (email, password) =>
	signInWithEmailAndPassword(auth, email, password);

// Send email to verify user email
const verifyEmailAddress = () => {
	showNotification('promise', 'Sending verification email', {
		promise: sendEmailVerification(auth.currentUser),
		successMessage: 'Message successfully sent',
		errorMessage: 'An error occurred while sending the verification email',
	});
};

export {
	signUpWithPassword,
	signInWithPassword,
	signInWithGoogle,
	verifyEmailAddress,
};
