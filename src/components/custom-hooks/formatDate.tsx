export function formatDate(date: Date){
    const currentDate = new Date(date);
    const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>');
    return formattedDate;
}

export function newFormatDate(dateString: Date) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
    const year = date.getUTCFullYear(); // Get full year

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
}

