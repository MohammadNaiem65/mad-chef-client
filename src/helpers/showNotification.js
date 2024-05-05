import toast from 'react-hot-toast';

export default function showNotification(notificationType, message, options) {
	// Check if the notificationType is 'promise'
	if (notificationType === 'promise') {
		// Ensure options is an object and has a promise property
		if (options && options?.promise) {
			// Use toast.promise to display a toast while the promise is pending
			return toast.promise(options.promise, {
				loading: message, // Message to display while the promise is pending
				success: options?.successMessage || 'Success', // Message to display on success
				error: options?.errorMessage || 'An error occurred', // Message to display on error
			});
		} else {
			throw new Error(
				'Options must include a promise property when notificationType is "promise"'
			);
		}
	} else {
		// For other notification types, use the regular toast method
		toast[notificationType](message, options);
	}
}
