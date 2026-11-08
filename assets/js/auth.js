// Authentication Simulation

async function handleLogin(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;
    const msgDiv = document.getElementById('loginAlertMessage');
    
    msgDiv.innerHTML = '';
    
    if (!usernameInput || !passwordInput) {
        msgDiv.innerHTML = "Please enter your credentials!";
        return;
    }

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

    // Demo password check
    if (passwordInput !== 'password' && passwordInput !== user.password) {
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

async function logout() {
    const confirmed = await confirmAction(
        'Logging Out', 
        'Are you sure you want to log out of the system?', 
        'Yes, log me out'
    );
    
    if (confirmed) {
        localStorage.removeItem('workvisa_session');
        window.location.href = 'login.html';
    }
}