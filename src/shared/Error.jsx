export default function Error({ message, className }) {
    return (
        <p
            className={`mt-6 p-2 font-semibold text-red-700 text-center bg-red-200 rounded-sm ${className}`}
        >
            {message
                ? message
                : 'Something went wrong. Please try again later.'}
        </p>
    );
}
