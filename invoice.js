document.addEventListener('DOMContentLoaded', function () {
    // Set today's date in the invoice form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;

    // Attach event listener for Add Item button
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addInvoiceItem);
    }

    // Handle login submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleLogin();
        });
    }
});

// Function to handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Correct username and password (replace as needed)
    const correctUsername = "akash";
    const correctPassword = "Akash@1603";

    if (username === correctUsername && password === correctPassword) {
        alert("Login successful!");
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('selectionContainer').style.display = 'block';
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Function to show invoice form
function showInvoiceForm() {
    document.getElementById("selectionContainer").style.display = "none";
    document.getElementById("invoiceContainer").style.display = "block";
}

// Function to preview invoice (currently a placeholder)
function previewInvoice() {
    alert("Preview Invoice Feature Coming Soon!");
}

// Function to add a new invoice item
function addInvoiceItem() {
    let row = `
    <tr>
        <td>
            <select class="form-control description">
                <option value="">Select Description</option>
                <option value="2lit">2lit</option>
                <option value="1lit">1lit</option>
                <option value="500ml">500ml</option>
                <option value="300ml">300ml</option>
                <option value="cane">Cane</option>
            </select>
        </td>
        <td><input type="number" class="form-control quantity" placeholder="Quantity" min="1"></td>
        <td><input type="number" class="form-control unitprice" placeholder="Unit Price" min="0" step="0.01"></td>
        <td class="total">0.00</td>
        <td><button type="button" class="btn btn-danger btn-sm remove-item">X</button></td>
    </tr>`;

    document.getElementById("invoiceItems").insertAdjacentHTML('beforeend', row);
}

// Function to update the total invoice amount
function updateTotalAmount() {
    let total = 0;

    document.querySelectorAll(".quantity").forEach((quantity, index) => {
        let unitPrice = parseFloat(document.querySelectorAll(".unitprice")[index].value) || 0;
        let itemTotal = (parseInt(quantity.value) || 0) * unitPrice;
        document.querySelectorAll(".total")[index].innerText = itemTotal.toFixed(2);
        total += itemTotal;
    });

    document.getElementById("totalAmount").value = total.toFixed(2);
}

// Function to generate and share invoice as PDF
function shareInvoice() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let customerName = document.getElementById('customerName').value || "Customer";
    let invoiceDate = document.getElementById('invoiceDate').value || "Date Not Available";
    let totalAmount = document.getElementById('totalAmount').value || "0.00";

    // Add invoice details to the PDF
    doc.text("AKASH AQUA ENTERPRISES", 10, 10);
    doc.text("Kumbakonam Main Road, Villupuram 605103", 10, 20);
    doc.text("Ph: 7418872122, 9894872122", 10, 30);
    doc.text(`Customer: ${customerName}`, 10, 40);
    doc.text(`Date: ${invoiceDate}`, 10, 50);
    doc.text(`Total Amount: ₹${totalAmount}`, 10, 60);

    doc.save("invoice.pdf");

    setTimeout(() => {
        alert("Invoice PDF has been downloaded. You can now share it via WhatsApp.");
    }, 500);
}
