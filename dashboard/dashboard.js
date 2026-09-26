// ===============================
// StockSense Dashboard
// ===============================

// Temporary mock data
// Later this will come from the backend API.

const dashboardData = {
    totalProducts: 248,
    lowStock: 12,
    outOfStock: 4,
    pendingReceipts: 8,
    pendingDeliveries: 15,
    scheduledTransfers: 6
};


// ===============================
// UPDATE KPI CARDS
// ===============================

function updateKPIs() {

    document.getElementById("totalProducts").textContent =
        dashboardData.totalProducts;

    document.getElementById("lowStock").textContent =
        dashboardData.lowStock;

    document.getElementById("outOfStock").textContent =
        dashboardData.outOfStock;

    document.getElementById("pendingReceipts").textContent =
        dashboardData.pendingReceipts;

    document.getElementById("pendingDeliveries").textContent =
        dashboardData.pendingDeliveries;

    document.getElementById("scheduledTransfers").textContent =
        dashboardData.scheduledTransfers;
}


// ===============================
// FILTERS
// ===============================

const filters = document.querySelectorAll(".filters select");

filters.forEach(filter => {

    filter.addEventListener("change", () => {

        const documentType =
            document.getElementById("documentFilter").value;

        const status =
            document.getElementById("statusFilter").value;

        const warehouse =
            document.getElementById("warehouseFilter").value;

        const category =
            document.getElementById("categoryFilter").value;

        console.log("Filters selected:", {
            documentType,
            status,
            warehouse,
            category
        });

    });

});


// ===============================
// VIEW HISTORY BUTTON
// ===============================

document
    .getElementById("viewHistoryBtn")
    .addEventListener("click", () => {

        alert("Move History module will open here.");

    });


// ===============================
// INITIALIZE DASHBOARD
// ===============================

updateKPIs();

console.log("StockSense Dashboard loaded successfully.");

const ctx = document.getElementById("stockChart");

new Chart(ctx, {
    type: "bar",

    data: {
        labels: [
            "Steel Rods",
            "Aluminium Sheets",
            "Plastic Covers",
            "Office Chairs",
            "Copper Wires"
        ],

        datasets: [{
            label: "Available Stock",

            data: [120, 85, 45, 70, 95]
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false
       const documentFilter = document.querySelector("select");

documentFilter.addEventListener("change", function () {

    if (this.value === "All Documents") {
        console.log("Showing all documents");
    } 
    else {
        console.log("Selected:", this.value);
    }

});
});
    }
});
