/**
 * This function formats Firebase error messages based on the error code.
 *
 * @param {object} firebaseError - The Firebase error object.
 * @returns {string} - The formatted error message.
 */
export default function formatFirebaseError(firebaseError) {
	if (firebaseError.code) {
		switch (firebaseError.code) {
			// Authentication Errors
			case 'auth/user-not-found':
				return 'User not found. Please check the email address you entered.';
			case 'auth/invalid-email':
				return 'Invalid email address. Please enter a valid email address.';
			case 'auth/weak-password':
				return 'Password is too weak. Please choose a stronger password.';
			case 'auth/email-already-in-use':
				return 'Email address already in use. Please try signing in or use a different email address.';
			case 'auth/operation-not-allowed':
				return 'This operation is not allowed. Please contact support if you need assistance.';
			case 'auth/wrong-password':
				return 'Incorrect password. Please try again.';
			case 'auth/account-exists-with-different-credential':
				return 'An account already exists with the same email address but different sign-in credentials. Sign in with the appropriate provider or link your accounts.';
			case 'auth/too-many-requests':
				return 'Too many requests attempted. Please try again later.';
			case 'auth/invalid-verification-code':
				return 'Invalid verification code. Please check the code you entered and try again.';
			case 'auth/invalid-verification-id':
				return 'Invalid verification ID. Please request a new verification code.';
			case 'auth/code-expired':
				return 'Verification code has expired. Please request a new verification code.';
			case 'auth/user-disabled':
				return 'Your account has been disabled. Please contact support for assistance.';
			case 'auth/invalid-credential':
				return 'Invalid credentials. Please check your credentials and try again.';
			case 'auth/network-request-failed':
				return 'Network request failed. Please check your internet connection and try again.';
			case 'auth/user-token-expired':
				return 'Your session has expired. Please sign in again.';
			case 'auth/invalid-api-key':
				return 'Invalid API key. Please check your API key and try again.';
			case 'auth/app-not-authorized':
				return 'This app is not authorized to use Firebase Authentication. Please check your app configuration.';
			case 'auth/invalid-user-token':
				return 'Invalid user token. Please sign in again.';
			case 'auth/user-mismatch':
				return 'The user you are trying to sign in with does not match the user you are currently signed in with.';
			case 'auth/credential-already-in-use':
				return 'The credential you are trying to use is already in use by another account.';
			case 'auth/requires-recent-login':
				return 'This operation requires a recent login. Please sign in again and try again.';
			case 'auth/missing-android-pkg-name':
				return 'Missing Android package name. Please add the package name to your Firebase project configuration.';
			case 'auth/missing-continue-uri':
				return 'Missing continue URI. Please add the continue URI to your Firebase project configuration.';
			case 'auth/missing-ios-bundle-id':
				return 'Missing iOS bundle ID. Please add the bundle ID to your Firebase project configuration.';
			case 'auth/invalid-continue-uri':
				return 'Invalid continue URI. Please check the continue URI and try again.';
			case 'auth/unauthorized-domain':
				return 'Unauthorized domain. Please check the domain and try again.';
			case 'auth/invalid-action-code':
				return 'Invalid action code. Please check the action code and try again.';
			case 'auth/invalid-password':
				return 'Invalid password. Please check the password and try again.';
			case 'auth/invalid-provider-id':
				return 'Invalid provider ID. Please check the provider ID and try again.';
			case 'auth/invalid-oauth-provider':
				return 'Invalid OAuth provider. Please check the OAuth provider and try again.';
			case 'auth/oauth-provider-error':
				return 'OAuth provider error. Please check the OAuth provider and try again.';
			case 'auth/oauth-callback-cancelled':
				return 'OAuth callback cancelled. Please try again.';
			case 'auth/popup-blocked':
				return 'Popup blocked. Please allow popups for this site and try again.';
			case 'auth/popup-closed-by-user':
				return 'Popup closed by user. Please try again.';

			// Function Errors
			case 'functions/internal':
				return 'An internal server error occurred. Please try again later.';
			case 'functions/argument-error':
				return 'Invalid function argument. Please check your input and try again.';
			case 'functions/timeout':
				return 'The function call timed out. Please try again with a simpler operation.';

			// General Errors
			default:
				return (
					'An error occurred with Firebase (' +
					firebaseError.code +
					'). Please try again later.'
				);
			// Add more error code handling as needed
		}
	} else {
		return 'An error occurred. Please try again later.';
	}
}
