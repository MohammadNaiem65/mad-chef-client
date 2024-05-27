/**
 * Converts a given time in 24-hour format to 12-hour format.
 *
 * @param {string} time24 - The time in 24-hour format (HH:mm).
 * @returns {string} The time in 12-hour format (HH:mm AM/PM).
 *
 * @example
 * convertTo12HourFormat('13:45') // returns '01:45 PM'
 * convertTo12HourFormat('00:00') // returns '12:00 AM'
 * convertTo12HourFormat('23:59') // returns '11:59 PM'
 */
export default function convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(':').map(Number);
    let period = 'AM';
    let hour12 = hour;

    if (hour >= 12) {
        period = 'PM';
        if (hour > 12) {
            hour12 = hour - 12;
        }
    }

    if (hour12 === 0) {
        hour12 = 12; // 0 hour in 12-hour format is 12 AM
    }

    return `${hour12.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')} ${period}`;
}
