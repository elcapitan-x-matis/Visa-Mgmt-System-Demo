// Global Utility Functions

// Date formatters matching PHP helper
function dateToText(dateString) {
    if (!dateString || dateString === '0000-00-00') return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
}

function datetimeToText(datetimeString) {
    if (!datetimeString || datetimeString === '0000-00-00 00:00:00') return '';
    const d = new Date(datetimeString.replace(' ', 'T'));
    if (isNaN(d.getTime())) return datetimeString;
    
    const datePart = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    const timePart = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    return `${datePart} at ${timePart}`;
}

// Bootstrap badge generators
function getStatusBadge(status) {
    let badgeClass = 'bg-secondary';
    if (status === 'Active') badgeClass = 'bg-success';
    else if (status === 'Expired') badgeClass = 'bg-danger';
    else if (status === 'Under Renewal') badgeClass = 'bg-warning text-dark';
    
    return `<span class="badge ${badgeClass}">${status}</span>`;
}

function getActivationBadge(activation) {
    if (activation == 1) {
        return `<span class="badge rounded-pill bg-success"><i class="bi-check-circle"></i>&nbsp;Activated</span>`;
    }
    return `<span class="badge rounded-pill bg-danger"><i class="bi-x-circle"></i>&nbsp;De-Activated</span>`;
}

function permissionsBadge(permission) {
    if (permission == 1) {
        return `<i style="color: green;" class="bi-check-circle fs-5"></i>`;
    }
    return `<i style="color: red;" class="bi-x-circle fs-5"></i>`;
}

// Custom Confirm Alerts (Uses SweetAlert2 if loaded, else native alert)
function showAlert(title, text, icon) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({ title: title, text: text, icon: icon, confirmButtonColor: '#FB9041' });
    } else {
        alert(`${title}: ${text}`);
    }
}

// Function to inject HTML partials (replaces PHP require)
async function includeHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        element.innerHTML = html;
        
        // Re-execute scripts inside the injected HTML
        const scripts = element.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    } catch (error) {
        console.error(error);
        element.innerHTML = '<div class="alert alert-danger">Error loading layout component.</div>';
    }
}