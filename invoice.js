document.addEventListener('DOMContentLoaded', function () {
    // Set today's date in the invoice form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;

    // Attach event listener for Add Item button
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addInvoiceItem);
    }

    // Handle login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            handleLogin();
        });
    }
});

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Set the correct username and password
    const correctUsername = "akash";
    const correctPassword = "Akash@1603";

    if (username === correctUsername && password === correctPassword) {
        alert("Login successful!");

        // Show invoice form and hide login form
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('invoiceContainer').style.display = 'block';
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

let itemCounter = 0;

function addInvoiceItem() {
    itemCounter++;
    const newItemRow = `
    <tr id="ItemRow${itemCounter}">
        <td>
            <select class="form-control" id="description${itemCounter}" required>
                <option value="">Select Description</option>
                <option value="2lit">2lit</option>
                <option value="1lit">1lit</option>
                <option value="500ml">500ml</option>
                <option value="300ml">300ml</option>
                <option value="cane">Cane</option>
            </select>
        </td>
        <td><input type="number" class="form-control quantity" id="quantity${itemCounter}" placeholder="Enter Quantity" required></td>
        <td><input type="number" class="form-control unitprice" id="unitprice${itemCounter}" placeholder="Enter Unit Price" required></td>
        <td><input type="text" class="form-control totalItem" id="totalItem${itemCounter}" disabled readonly></td>
        <td><button type="button" class="btn btn-danger" onclick="removeInvoiceItem(${itemCounter})">Remove</button></td>
    </tr>`;
    
    document.getElementById("invoiceItems").insertAdjacentHTML('beforeend', newItemRow);
    updateTotalAmount();
}

function removeInvoiceItem(itemId) {
    document.getElementById(`ItemRow${itemId}`).remove();
    updateTotalAmount();
}

function updateTotalAmount() {
    let totalAmount = 0;

    document.querySelectorAll(".quantity").forEach(function (quantityInput, index) {
        const quantity = parseFloat(quantityInput.value) || 0;
        const unitPrice = parseFloat(document.querySelectorAll(".unitprice")[index].value) || 0;
        const totalItem = quantity * unitPrice;

        document.querySelectorAll(".totalItem")[index].value = totalItem.toFixed(2);
        totalAmount += totalItem;
    });

    document.getElementById("totalAmount").value = totalAmount.toFixed(2);
}

function shareInvoice() {
    // Get invoice details
    let customerName = document.getElementById('customerName').value || "Customer";
    let invoiceDate = document.getElementById('invoiceDate').value || "Date Not Available";
    let totalAmount = document.getElementById('totalAmount').value || "0.00";
    
    // Generate invoice content
    let invoiceText = `Invoice Details:\nCustomer: ${customerName}\nDate: ${invoiceDate}\nTotal: ₹${totalAmount}\n\n- Sent via AKASH AQUA ENTERPRISES`;

    // Create WhatsApp share link
    let whatsappLink = `https://wa.me/?text=${encodeURIComponent(invoiceText)}`;

    // Create mailto link for email sharing
    let emailSubject = "Invoice from AKASH AQUA ENTERPRISES";
    let emailBody = invoiceText;
    let emailLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Copy link function
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Invoice copied to clipboard!");
        }).catch(err => {
            console.error("Could not copy text: ", err);
        });
    }

    // Create share options dynamically
    let shareOptions = `
        <div id="shareOptions" class="mt-3">
            <a href="${whatsappLink}" target="_blank" class="btn btn-success">Share via WhatsApp</a>
            <a href="${emailLink}" class="btn btn-primary">Share via Email</a>
            <button type="button" class="btn btn-secondary" onclick="copyToClipboard('${invoiceText}')">Copy to Clipboard</button>
        </div>
    `;

    // Display share options
    let invoiceContainer = document.getElementById("invoiceContainer");
    let existingShareDiv = document.getElementById("shareOptions");
    if (existingShareDiv) {
        existingShareDiv.remove(); // Remove previous options if they exist
    }
    invoiceContainer.insertAdjacentHTML('beforeend', shareOptions);
}
