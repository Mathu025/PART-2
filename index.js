// Guest List
const guests = []

// The HTML Input Element
const fieldElement = document.querySelector('.field');
// The HTML List Element 
const listElement = document.querySelector('.list');

document.addEventListener('submit', function (e) {
    e.preventDefault(); // prevents the page from reloading
    const guestName = fieldElement.value // get the value entered in the input field
    if (!guestName) {
        return alert('Please enter the guest name!'); // deny if the input field is empty
    } 
    if (guests.length >= 10) {
        return alert('A maximum number of 10 guests is allowed!')
    }
    // create a guest object with their name, attending status and time added and add it to the guests list
    guests.push({name:guestName, attending: false, time: new Date().toLocaleString('en-UK')});
    fieldElement.value = ''; //reset the input field
    renderGuests(); // Display the updated list to the user.  
})

// This function renders the guest array as html and adds it to the list element
    const renderGuests = () => {
        listElement.innerHTML = guests.reduce((initial, guest, guestIndex) => {
            return initial + `
            <div class="list-item">
                <p>${guest.name}- ${guest.attending ? 'Attending': 'Not Attending'} - Added on ${guest.time}</p>
                <div>
                <button onclick="toggleGuestAttendance(${guestIndex})" type="submit" class="remove" id="RSVP">RSVP</button>
                <button onclick="deleteGuestHandler(${guestIndex})" type="submit" class="remove" id="remove">Remove</button>
                </div>
            </div>
            `;
        }, '');
    } 

    const toggleGuestAttendance = (guestIndex) => {
        const foundGuest = guests.find((guest, index) => index === guestIndex); // looking for the guest in the guests list based on the index passed in the argument
        if (foundGuest) {
            // if guest is found, replace the existing guest details at the passed index with a new object but changed attendance status
            guests.splice(guestIndex, 1, {...foundGuest, attending: !foundGuest.attending})
        }
        renderGuests();
    }
    const deleteGuestHandler = (guestIndex) => {
        // remove the guest based on the index passed as a parameter and renders the guests list to the user
        guests.splice(guestIndex, 1);
        renderGuests();
    }


