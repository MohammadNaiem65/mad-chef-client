/**
 * Parses a date string into a formatted date string.//+
 *
 * @param {string} dateToParse - The date string to parse.//+
 * @param {string} monthType - The type of month to use in the formatted date.//+
 *  Can be either 'long' or 'short'.//+
 *
 * @returns {string} - The formatted date string in the format 'day month year'.//+
 *
 * @example//+
 * perseDate('2022-05-15', 'long') => '15 May 2022'//+
 * perseDate('2022-05-15', 'short') => '15 May 2022'//+
 */

export default function perseDate(dateToParse, monthType) {
    // Parse the updatedAt into a Date object
    const date = new Date(dateToParse);

    // Extract the day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: monthType });
    const year = date.getFullYear();

    // Construct the final string
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
}
