import toast from 'react-hot-toast';

/**
 * Dismisses all active toast notifications.
 *
 * This function utilizes the `react-hot-toast` library to clear all currently displayed
 * toast notifications from the screen. It does not take any parameters and does not
 * return any values.
 */
export default function removeNotifications() {
	toast.dismiss();
}
