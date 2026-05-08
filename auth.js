// auth.js - Registration, OTP & Login Logic

let timeLeft = 30;
let timerInterval;

/**
 * 1. Generate a random 4-digit OTP
 */
function generateOTP() {
    let newOTP = Math.floor(1000 + Math.random() * 9000);
    const display = document.getElementById('otpDisplay');
    if (display) {
        display.innerText = newOTP;
    }
}

/**
 * 2. Start the OTP Refresh Timer
 */
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = 30;
    generateOTP();

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            generateOTP();
            timeLeft = 30;
        } else {
            timeLeft--;
        }
        const timerText = document.getElementById('timerDisplay');
        if (timerText) {
            timerText.innerText = "Refreshes in: " + timeLeft + "s";
        }
    }, 1000);
}

/**
 * 3. OTP Verification Logic
 */
const verifyBtn = document.getElementById('verifyBtn');
if (verifyBtn) {
    verifyBtn.addEventListener('click', function() {
        const otpInput = document.getElementById('otpInput').value;
        const currentOTP = document.getElementById('otpDisplay').innerText;

        if (otpInput === currentOTP) {
            // Get user information from registration fields
            const fullName = document.getElementById('regName').value;
            const regEmail = document.getElementById('regEmail').value;
            const regPassword = document.getElementById('regPassword').value;

            // Save user info for profile/settings
            localStorage.setItem('helixUserName', fullName);
            localStorage.setItem('helixUserEmail', regEmail);

            // Save user object for Login authentication
            const userData = { 
                name: fullName, 
                email: regEmail, 
                password: regPassword 
            };
            localStorage.setItem('user', JSON.stringify(userData));

            alert("Verification Successful!");
            clearInterval(timerInterval); 
            
            // UI Transition: Hide registration modal, show login box
            document.getElementById('otpModal').classList.add('hidden');
            document.getElementById('registerBox').classList.add('hidden');
            document.getElementById('loginBox').classList.remove('hidden');
        } else {
            alert("Invalid OTP! Please enter the code: " + currentOTP);
            document.getElementById('otpInput').value = "";
        }
    });
}

/**
 * 4. Login Logic
 */
const finalLoginBtn = document.getElementById('finalLoginBtn');
if (finalLoginBtn) {
    finalLoginBtn.addEventListener('click', function() {
        const emailInput = document.getElementById('loginEmail').value.trim();
        const passInput = document.getElementById('loginPw').value.trim();

        // Retrieve stored User data from LocalStorage
        const storedData = localStorage.getItem('user');

        if (storedData) {
            const user = JSON.parse(storedData);

            // Validate credentials (Email and Password check)
            if (emailInput === user.email && passInput === user.password) {
                alert("Login Successful!");

                // Track that the user is now authenticated
                localStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to the home page (index.html)
                window.location.href = "index.html"; 
            } else {
                alert("Incorrect Email or Password.");
            }
        } else {
            alert("This email is not registered yet.");
        }
    });
}