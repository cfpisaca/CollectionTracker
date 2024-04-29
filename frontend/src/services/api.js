async function fetchListings() {
    try {
        const response = await fetch('http://localhost:8080/listings');
        if (!response.ok) {
            throw new Error('Failed to fetch listings: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw error; 
    }
}

export { fetchListings };
