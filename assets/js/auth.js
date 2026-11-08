// Authentication Simulation

async function handleLogin(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value; // Plain text in demo
    const msgDiv = document.getElementById('loginAlertMessage');
    
    // Clear previous messages
    msgDiv.innerHTML = '';
    
    if (!usernameInput || !passwordInput) {
        msgDiv.innerHTML = "Please enter your credentials!";
        return;
    }

    // SHA1 Hash of "password" is 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
    // The database uses: 7288edd0fc3ffcbe93a0cf06e3568e28521687bc
    // For the demo, let's just accept "password" as the plaintext override to make it easy to test.
    // In a real SHA1 setup, the hash would be 5baa61e...
    
    const data = await loadAppData();
    if (!data) {
        msgDiv.innerHTML = "System error: Could not load database.";
        return;
    }

    const user = data.users.find(u => u.username === usernameInput);

    if (!user) {
        msgDiv.innerHTML = "Invalid Username or Password! Try Again...";
        return;
    }

    if (user.activation == 0) {
        msgDiv.innerHTML = "Your account is not activated! Please contact your system administrator...";
        return;
    }

    // Basic password check for demo (Accept "password" for all users)
    if (passwordInput !== 'password') {
        msgDiv.innerHTML = "Invalid Username or Password! Try Again...";
        return;
    }

    // Create Session
    const role = data.roles.find(r => r.ID === user.roleID);
    const sessionData = {
        userID: user.userID,
        name: `${user.firstname} ${user.lastname}`,
        username: user.username,
        email: user.email,
        roleID: user.roleID,
        roleName: role ? role.role : 'User'
    };

    localStorage.setItem('workvisa_session', JSON.stringify(sessionData));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

function checkAuth() {
    const session = localStorage.getItem('workvisa_session');
    if (!session) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(session);
}

function logout() {
    localStorage.removeItem('workvisa_session');
    window.location.href = 'login.html';
}

// Ensure this runs on load for protected pages
// Uncomment this if you want to enforce auth on page load
// document.addEventListener('DOMContentLoaded', checkAuth);