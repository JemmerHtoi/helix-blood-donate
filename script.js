/**
 * Main function to handle page load activities
 */
window.onload = function() {
    checkLoginStatus();
    displayUserProfile();
    setupFindDonorProtection(); // New Addition: To protect Find Donor links
};

/**
 * Update UI based on User Login Status (Navbar & Mobile Menu)
 * Keeps your original logic and adds a check for the 'isLoggedIn' flag
 */
function checkLoginStatus() {
    const name = localStorage.getItem('helixUserName');
    const email = localStorage.getItem('helixUserEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Desktop UI Elements
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const dName = document.getElementById('desktopUserName');
    const dEmail = document.getElementById('desktopUserEmail');

    // Mobile UI Elements
    const mLoginBtn = document.getElementById('mobileLoginBtn');
    const mUserSection = document.getElementById('mobileUserSection');
    const mName = document.getElementById('mobileUserName');
    const mEmail = document.getElementById('mobileUserEmail');
    const mLogoutBtn = document.getElementById('mobileLogoutBtn');

    if (name && isLoggedIn === 'true') {
        // Apply changes to Desktop Navbar
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userProfile) userProfile.classList.remove('hidden');
        if (dName) dName.innerText = name;
        if (dEmail) dEmail.innerText = email || 'user@gmail.com';

        // Apply changes to Mobile Menu
        if (mLoginBtn) mLoginBtn.classList.add('hidden');
        if (mUserSection) mUserSection.classList.remove('hidden');
        if (mName) mName.innerText = name;
        if (mEmail) mEmail.innerText = email || 'user@gmail.com';
        if (mLogoutBtn) mLogoutBtn.classList.remove('hidden');
    }
}

/**
 * NEW: Logic to protect Find Donor access
 * Ensures user is logged in before navigating to find-donor.html
 */
function setupFindDonorProtection() {
    const findDonorLinks = [
        document.getElementById('findDonorLink'),
        document.getElementById('mobileFindDonorLink')
    ];

    findDonorLinks.forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                const isLoggedIn = localStorage.getItem('isLoggedIn');

                if (isLoggedIn !== 'true') {
                    e.preventDefault(); 
                    alert("Please login first to access the Find Donor feature!");
                    window.location.href = "auth.html";
                } else {
                    window.location.href = "find-donor.html";
                }
            });
        }
    });
}

/**
 * Display stored user info on Profile pages or Forms
 * Keeps your original functionality
 */
function displayUserProfile() {
    const userName = localStorage.getItem('helixUserName') || 'Guest User';
    const userEmail = localStorage.getItem('helixUserEmail') || 'guest@example.com';

    const nameDisplay = document.getElementById('displayUserName');
    const emailDisplay = document.getElementById('displayUserEmail');

    if (nameDisplay) nameDisplay.innerText = userName;
    if (emailDisplay) emailDisplay.innerText = userEmail;
}

/**
 * Logic to check blood donation eligibility (4-month rule)
 * Keeps your original eligibility logic exactly the same
 */
function registerDonor() {
    const lastDateInput = document.getElementById('lastDate');
    if (!lastDateInput) return;

    const lastDateValue = lastDateInput.value;
    if (!lastDateValue) {
        alert("Please select the date of your last donation.");
        return;
    }

    const lastDonatedDate = new Date(lastDateValue);
    const today = new Date();

    const diffTime = today - lastDonatedDate;
    
    if (diffTime < 0) {
        alert("Invalid date. Please select a date from the past.");
        return;
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const months = diffDays / 30;
    if (months < 4) {
        alert("Sorry! You must wait at least 4 months after your last donation.");
    } else {
        alert("Congratulations! You are eligible to register as a donor.");
    }
}

/**
 * Toggle Mobile Navigation Menu visibility
 * Keeps your original menu logic
 */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

/**
 * Clear session and logout
 * Keeps your original logout functionality
 */
function logout() {
    localStorage.clear();
    alert("Logged out successfully.");
    window.location.href = 'index.html';
}