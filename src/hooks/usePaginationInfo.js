/**
 * Extracts pagination information from a given page string.
 *
 * @param {string} pageString - The page string containing the current and total pages separated by a '/'.
 * @returns {object} An object containing the active page and total pages.
 * @property {number} activePage - The current page number.
 * @property {number} totalPages - The total number of pages.
 *
 * @example
 * // Example usage:
 * const pageString = '3/10';
 * const paginationInfo = usePaginationInfo(pageString);
 * console.log(paginationInfo); // Output: { activePage: 3, totalPages: 10 }
 */
function usePaginationInfo(pageString) {
    // Extract the page details
    const pageDetails = pageString?.split('/');
    const currPage = pageDetails?.length && parseInt(pageDetails[0]);
    const totalPages = pageDetails?.length && parseInt(pageDetails[1]);

    return { activePage: currPage, totalPages: totalPages };
}

export default usePaginationInfo;
