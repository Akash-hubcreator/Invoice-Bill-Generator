document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;

    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addInvoiceItem);
    }

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

function showInvoiceForm() {
    document.getElementById("selectionContainer").style.display = "none";
    document.getElementById("invoiceContainer").style.display = "block";
}

function previewInvoice() {
    alert("Preview Invoice Feature Coming Soon!");
}

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

function shareInvoice() {
    const { jsPDF } = window.jspdf;

    const customerName = document.getElementById('customerName').value.trim() || "Customer";
    const invoiceDate = document.getElementById('invoiceDate').value || "Date";

    const sanitizedCustomerName = customerName.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
    const formattedDate = invoiceDate.replace(/-/g, '_');
    const fileName = `Invoice_${sanitizedCustomerName}_${formattedDate}.pdf`;

    const invoiceContainer = document.getElementById('invoiceContainer');

    html2canvas(invoiceContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

        pdf.save(fileName);

        setTimeout(() => {
            alert("Invoice PDF has been downloaded with full layout!");
        }, 500);
    });
}
