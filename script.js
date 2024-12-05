function generateUniqueIDs() {
     // Use a Set to ensure uniqueness

  
        const id = Math.floor(Math.random() * 90000) + 10000; // Generates a 5-digit number
        // Add to the Set
    return id
}

// Example usage
const uniqueID = generateUniqueIDs(); // Generate 10 unique IDs

document.getElementById("generateBtn").addEventListener("click", function () {
  // Get input values
  const customerName = document.getElementById("customerName").value;
  const paymentAmount = document.getElementById("paymentAmount").value;
  const paymentDate = document.getElementById("paymentDate").value;


  // Validate inputs
  if (!customerName || !paymentAmount || !paymentDate) {
    alert("Please fill out all fields.");
    return;
  }

  // Display receipt
  document.getElementById("displayCustomerName").textContent = customerName;
  document.getElementById("displayPaymentAmount").textContent = paymentAmount;
  document.getElementById("displayPaymentDate").textContent = paymentDate;

  // Display logo
  

  // Show receipt
  document.getElementById("receipt").style.display = "block";
});

document.getElementById("printBtn").addEventListener("click", function () {
  window.print();
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const receipt = document.getElementById("receipt");

  // Ensure receipt is visible before capturing
  if (!receipt || receipt.style.display === "none") {
    alert("Please generate the receipt first!");
    return;
  }

  // Use html2canvas to capture the receipt
  html2canvas(receipt, {
    scale: 2, // Increase resolution for mobile clarity
  }).then((canvas) => {
    // Create a downloadable link
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 1.0); // High-quality JPG
    link.download = `payment_receipt${uniqueID}.jpg`;
    link.click(); // Trigger download
  }).catch((error) => {
    console.error("Error generating receipt image:", error);
    alert("Failed to generate the receipt image. Please try again.");
  });
});

document.getElementById("downloadBtnPdf").addEventListener("click", function () {
  const receipt = document.getElementById("receipt");

  if (!receipt || receipt.style.display === "none") {
    alert("Please generate the receipt first!");
    return;
  }

  html2canvas(receipt, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add image to PDF (full page size)
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Adjust dimensions as needed
    pdf.save(`payment_receipt${uniqueID}.pdf`); // Save as PDF
  }).catch((error) => {
    console.error("Error generating PDF:", error);
    alert("Failed to generate the PDF. Please try again.");
  });
});
