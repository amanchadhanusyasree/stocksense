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
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="dashboard.js"></script>

</body>
</html>
