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
// STOCK CHART
// ===============================

const ctx = document.getElementById("stockChart");

const stockChart = new Chart(ctx, {

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
    }
});


// ===============================
// DOCUMENT FILTER
// ===============================

const documentFilter = document.querySelector("select");

documentFilter.addEventListener("change", function () {

    const selected = this.value;

    if (selected === "Receipts") {

        stockChart.data.datasets[0].data =
            [150, 110, 60, 90, 120];

    }

    else if (selected === "Deliveries") {

        stockChart.data.datasets[0].data =
            [80, 55, 30, 45, 70];

    }

    else if (selected === "Internal Transfers") {

        stockChart.data.datasets[0].data =
            [100, 75, 40, 60, 85];

    }

    else if (selected === "Adjustments") {

        stockChart.data.datasets[0].data =
            [90, 65, 35, 50, 75];

    }

    else {

        stockChart.data.datasets[0].data =
            [120, 85, 45, 70, 95];
    }

    stockChart.update();

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
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="dashboard.js"></script>

</body>
</html>
