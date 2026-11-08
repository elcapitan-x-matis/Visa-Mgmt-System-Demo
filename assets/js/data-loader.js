// Centralized Data Loader
window.APP_DATA = null;

async function loadAppData() {
    if (window.APP_DATA) return window.APP_DATA;
    
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        window.APP_DATA = await response.json();
        
        // Override with localStorage changes if they exist (for CRUD simulation)
        const localDataStr = localStorage.getItem('workvisa_db');
        if (localDataStr) {
            window.APP_DATA = JSON.parse(localDataStr);
        } else {
            // Save initial seed
            localStorage.setItem('workvisa_db', JSON.stringify(window.APP_DATA));
        }
        
        return window.APP_DATA;
    } catch (error) {
        console.error('Failed to load data:', error);
        return null;
    }
}

// Global save function for CRUD operations
function saveAppData() {
    if (window.APP_DATA) {
        localStorage.setItem('workvisa_db', JSON.stringify(window.APP_DATA));
    }
}