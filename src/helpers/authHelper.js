import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail as sendPasswordResetEmailByFirebase,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import app from '../../firebase.config';

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

const sendPasswordResetEmail = (email) =>
    sendPasswordResetEmailByFirebase(auth, email);

// Send email to verify user email
const verifyEmailAddress = async () => {
    const user = auth.currentUser;

    const url = `https://mad-chef-server.vercel.app/users/user/verify-email?uid=${user.uid}`;

    return sendEmailVerification(user, { url });
};

export {
    signUpWithPassword,
    signInWithPassword,
    signInWithGoogle,
    sendPasswordResetEmail,
    verifyEmailAddress,
};
