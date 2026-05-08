// find-donor.js - Search and Display Donors & Urgent Requests

// 1. Static donor list with donation dates
const defaultDonors = [
    { name: "Daw Sein", group: "O+", location: "Yangon", phone: "09793999754", lastDonated: "15 Mar 2026" },
    { name: "Daw Phyu", group: "A+", location: "Mandalay", phone: "09667990246", lastDonated: "01 Apr 2026" },
    { name: "Daw Nyo", group: "B+", location: "Yangon", phone: "09778998565", lastDonated: "10 Feb 2026" },
    { name: "Daw Mya", group: "AB+", location: "Yangon", phone: "09264108827", lastDonated: "05 Apr 2026" },
];

/**
 * Function to filter and display donors
 */
function searchDonors() {
    const selectElement = document.getElementById('bloodSelect');
    const listContainer = document.getElementById('donorList');

    if (!selectElement || !listContainer) return;

    const selectedGroup = selectElement.value;
    listContainer.innerHTML = ""; 

    // Retrieve registered donors from localStorage
    const registeredDonors = JSON.parse(localStorage.getItem('donors')) || [];
    
    // Combine default list and new registrations
    const allDonors = [...defaultDonors, ...registeredDonors];

    // Filter logic
    const filtered = allDonors.filter(d => selectedGroup === "all" || d.group === selectedGroup);

    if (filtered.length === 0) {
        listContainer.innerHTML = '<p class="text-center text-gray-400 py-10">No donors found.</p>';
        return;
    }

    filtered.forEach(donor => {
        // Ensure the date shows correctly by checking lastDonated or date keys
        const dateDisplay = donor.lastDonated || donor.date || 'Not recorded';

        listContainer.innerHTML += `
            <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center mb-4 transition-all hover:shadow-md">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="bg-rose-100 text-rose-600 font-bold px-3 py-1 rounded-lg text-xs">${donor.group}</span>
                        <h4 class="font-bold text-gray-800">${donor.name}</h4>
                    </div>
                    <div class="flex flex-col gap-1 mt-2">
                        <p class="text-gray-500 text-xs">📍 ${donor.location || 'Yangon'}</p>
                        <p class="text-rose-400 text-[10px] font-bold uppercase tracking-tighter">📅 Last Donated: ${dateDisplay}</p>
                    </div>
                </div>
                <a href="tel:${donor.phone}" class="bg-green-500 text-white p-3 rounded-full shadow-lg active:scale-90 transition">
                    <i class="fas fa-phone-alt"></i>
                </a>
            </div>`;
    });
}

/**
 * Function to display urgent request from localStorage
 */
function displayUrgentRequest() {
    // Synced with the key name 'urgentRequest'
    const urgentData = JSON.parse(localStorage.getItem('urgentRequest'));

    // ID Check for UI elements
    const uName = document.getElementById('urgentPatientName');
    const uGroup = document.getElementById('urgentBloodGroup');
    const uLoc = document.getElementById('urgentLocation');
    const uHosp = document.getElementById('urgentHospital');
    const uCall = document.getElementById('urgentCall');

    if (urgentData && uName && uGroup && uLoc && uHosp) {
        uName.innerText = urgentData.patientName;
        uGroup.innerText = urgentData.bloodGroup + " Positive"; 
        uLoc.innerText = urgentData.location;
        uHosp.innerText = urgentData.hospital;

        // Make the Call button work with the phone number
        if (uCall && urgentData.phone) {
            uCall.href = "tel:" + urgentData.phone;
        }
    }
}

// Initialize on window load
window.onload = function() {
    searchDonors();
    displayUrgentRequest();
};