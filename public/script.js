document.getElementById("confirmButton").addEventListener("click", function () {
    const concertDate = document.getElementById("concertDate").value;
    const ticketType = document.getElementById("ticketType").value;
    const ticketQuantity = document.getElementById("ticketQuantity").value;
    const errorMessage = document.getElementById("errorMessage");
    const summary = document.getElementById("summary");

    if (!concertDate || !ticketType || !ticketQuantity) {
        errorMessage.textContent = "Please select all required fields.";
        return;
    }

    const totalPrice = ticketType * ticketQuantity;

    document.getElementById("summaryConcert").textContent = `Concert: ${concertDate}`;
    document.getElementById("summaryTicketType").textContent = `Ticket Type: ${ticketType === "80" ? "General Admission" : "VIP"}`;
    document.getElementById("summaryQuantity").textContent = `Quantity: ${ticketQuantity}`;
    document.getElementById("summaryTotalPrice").textContent = `Total Price: $${totalPrice}`;

    fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: '+1234567890',  // Replace with user's phone number
            message: 'Your booking is confirmed! Enjoy the concert!'
        })
    })
    .then(response => response.json())
    .then(data => console.log('SMS Sent:', data))
    .catch(error => console.error('Error:', error));

    document.querySelector(".booking-form").style.display = "none";
    summary.style.display = "block";
    errorMessage.textContent = "";
});
