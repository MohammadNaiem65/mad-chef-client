import toast from 'react-hot-toast';

/**
 * Displays a notification using the react-hot-toast library.
 *
 * @param {string} notificationType - The type of notification to display. Can be 'success', 'error', 'loading', or 'promise'.
 * @param {string} message - The message to display in the notification.
 * @param {Object} options - Additional options for the notification. If notificationType is 'promise', this must include a 'promise' property.
 * @param {Promise} options.promise - The promise to track if notificationType is 'promise'.
 * @param {string} [options.successMessage] - The message to display on promise success. Defaults to 'Success'.
 * @param {string} [options.errorMessage] - The message to display on promise error. Defaults to 'An error occurred'.
 * @returns {void|Promise} - Returns a promise if notificationType is 'promise', otherwise returns void.
 * @throws {Error} - Throws an error if notificationType is 'promise' and options does not include a promise property.
 */
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
            return toast.loading(message);
        }
    } else {
        // For other notification types, use the regular toast method
        toast[notificationType](message, options);
    }
}
