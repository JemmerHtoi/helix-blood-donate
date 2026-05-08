// donate.js

function registerDonor() {
    // 1. Get values from HTML including the new Location field
    const name = document.getElementById('fullName').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const lastDateValue = document.getElementById('lastDate').value;
    const phone = document.getElementById('phoneNumber').value;
    const location = document.getElementById('pLocation').value; // New Location field

    // 2. Validation: Check if required fields are empty (Fixed symbols here)
    if (!name || !lastDateValue || !phone || !location) {
        alert("Please fill in all required fields including your location.");
        return;
    }

    // 3. Date Logic: Check if 4 months (120 days) have passed
    const lastDonatedDate = new Date(lastDateValue);
    const today = new Date();
    const diffTime = today - lastDonatedDate; // Calculated normally
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 120 && diffTime > 0) {
        alert("Sorry, you must wait at least 4 months since your last donation.");
        return;
    }

    // --- Added: Convert date format to "DD Month YYYY" for find-donor page ---
    const dateObj = new Date(lastDateValue);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // ရက်စွဲကို find-donor.html ထဲက format နဲ့ တူအောင် '02 May 2026' ပုံစံ ပြောင်းခြင်း
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${day} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    // -------------------------------------------------------------------------

    // 4. Storage Logic: Save donor with Location info
    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    donors.push({ 
        name: name, 
        group: bloodGroup, 
        location: location, 
        phone: phone,
        date: lastDateValue, 
        lastDonated: formattedDate // This key makes the date appear in your list
    });

    localStorage.setItem('donors', JSON.stringify(donors));
    alert("Registration Successful! Thank you for being a donor.");

    // Redirect to find-donor.html
    window.location.href = "find-donor.html"; 
}

// Button Click Event
if (document.getElementById('registerBtn')) {
    document.getElementById('registerBtn').onclick = registerDonor;
}

// Logic to display Urgent Requests on page load
window.onload = function() {
    // Synced with the key name used in your find-donor.html
    const savedUrgent = localStorage.getItem('urgentRequest') || localStorage.getItem('urgentData');
    if (savedUrgent) {
        const data = JSON.parse(savedUrgent);
        const patientNameEl = document.getElementById('urgentPatientName');
        const bloodGroupEl = document.getElementById('urgentBloodGroup');
        const locationEl = document.getElementById('urgentLocation');
        const hospitalEl = document.getElementById('urgentHospital');

        if (patientNameEl) patientNameEl.innerText = data.patientName;
        if (bloodGroupEl) bloodGroupEl.innerText = data.bloodGroup;
        if (locationEl) locationEl.innerText = data.location;
        if (hospitalEl) hospitalEl.innerText = data.hospital || data.hospitalName;
    }
}