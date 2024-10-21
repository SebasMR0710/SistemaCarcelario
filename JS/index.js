const dateTimeElement = document.getElementById("date-time");

function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    dateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();