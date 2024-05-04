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
