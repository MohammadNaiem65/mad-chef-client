import toast from 'react-hot-toast';

export default function showNotification(notificationType, message, options) {
	toast[notificationType](message, options && options);
}
