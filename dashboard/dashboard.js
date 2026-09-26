// ===============================
// StockSense Dashboard
// ===============================


// ===============================
// DASHBOARD DATA
// ===============================

const dashboardData = {
    totalProducts: 248,
    lowStock: 12,
    outOfStock: 4,
    pendingReceipts: 8,
    pendingDeliveries: 15,
    scheduledTransfers: 6
};


// ===============================
// PRODUCT DATA
// ===============================

const products = [
    {
        name: "Steel Rods",
        stock: 120,
        type: "receipt",
        status: "done",
        warehouse: "main",
        category: "raw"
    },

    {
        name: "Aluminium Sheets",
        stock: 85,
        type: "receipt",
        status: "ready",
        warehouse: "production",
        category: "raw"
    },

    {
        name: "Plastic Covers",
        stock: 45,
        type: "adjustment",
        status: "done",
        warehouse: "main",
        category: "raw"
    },

    {
        name: "Office Chairs",
        stock: 70,
        type: "delivery",
        status: "done",
        warehouse: "main",
        category: "finished"
    },

    {
        name: "Copper Wires",
        stock: 95,
        type: "transfer",
        status: "ready",
        warehouse: "production",
        category: "raw"
    }
];


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
// GET FILTERED PRODUCTS
// ===============================

function getFilteredProducts() {

    const documentValue =
        document.getElementById("documentFilter").value;

    const statusValue =
        document.getElementById("statusFilter").value;

    const warehouseValue =
        document.getElementById("warehouseFilter").value;

    const categoryValue =
        document.getElementById("categoryFilter").value;

    return products.filter(product => {

        const documentMatch =
            documentValue === "all" ||
            product.type === documentValue;

        const statusMatch =
            statusValue === "all" ||
            product.status === statusValue;

        const warehouseMatch =
            warehouseValue === "all" ||
            product.warehouse === warehouseValue;

        const categoryMatch =
            categoryValue === "all" ||
            product.category === categoryValue;

        return (
            documentMatch &&
            statusMatch &&
            warehouseMatch &&
            categoryMatch
        );
    });
}


// ===============================
// UPDATE STOCK GRAPH
// ===============================

function updateStockGraph() {

    const filteredProducts = getFilteredProducts();

    const bars =
        document.querySelectorAll(".bar-chart .bar");

    const labels =
        document.querySelectorAll(".bar-chart .bar-item span");

    bars.forEach((bar, index) => {

        bar.style.height = "0px";

        if (labels[index]) {
            labels[index].style.opacity = "0.35";
        }

    });

    filteredProducts.forEach(product => {

        const index =
            products.findIndex(item =>
                item.name === product.name
            );

        if (index !== -1 && bars[index]) {

            bars[index].style.height =
                product.stock + "px";

            if (labels[index]) {
                labels[index].style.opacity = "1";
            }

        }

    });
}


// ===============================
// UPDATE MOVEMENT TABLE
// ===============================

function updateMovementTable() {

    const table =
        document.getElementById("movementTable");

    const filteredProducts =
        getFilteredProducts();

    table.innerHTML = "";

    filteredProducts.forEach(product => {

        let quantity = product.stock;
        let movementType = "Receipt";

        if (product.type === "delivery") {

            movementType = "Delivery";
            quantity = -10;

        } else if (product.type === "transfer") {

            movementType = "Transfer";
            quantity = 20;

        } else if (product.type === "adjustment") {

            movementType = "Adjustment";
            quantity = -3;
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>

            <td>${movementType}</td>

            <td>
                ${quantity > 0 ? "+" : ""}${quantity}
            </td>

            <td>
                ${
                    product.warehouse === "main"
                    ? "Main Warehouse"
                    : "Production Floor"
                }
            </td>

            <td>
                ${
                    product.status.charAt(0).toUpperCase()
                    + product.status.slice(1)
                }
            </td>
        `;

        table.appendChild(row);

    });

    if (filteredProducts.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No inventory records match the selected filters.
                </td>
            </tr>
        `;
    }
}


// ===============================
// UPDATE LOW STOCK ALERTS
// ===============================

function updateLowStockAlerts() {

    const lowStockList =
        document.getElementById("lowStockList");

    const lowStockProducts =
        products.filter(product => product.stock < 50);

    lowStockList.innerHTML = "";

    if (lowStockProducts.length === 0) {

        lowStockList.innerHTML = `
            <div class="alert-item">
                <span>No low stock items</span>
                <strong>✓</strong>
            </div>
        `;

        return;
    }

    lowStockProducts.forEach(product => {

        const item =
            document.createElement("div");

        item.className = "alert-item";

        item.innerHTML = `
            <span>${product.name}</span>
            <strong>${product.stock} units</strong>
        `;

        lowStockList.appendChild(item);

    });
}


// ===============================
// APPLY FILTERS
// ===============================

function applyFilters() {

    updateStockGraph();

    updateMovementTable();

}


// ===============================
// FILTER EVENT LISTENERS
// ===============================

document
    .getElementById("documentFilter")
    .addEventListener("change", applyFilters);

document
    .getElementById("statusFilter")
    .addEventListener("change", applyFilters);

document
    .getElementById("warehouseFilter")
    .addEventListener("change", applyFilters);

document
    .getElementById("categoryFilter")
    .addEventListener("change", applyFilters);


// ===============================
// HISTORY MODAL
// ===============================

const historyModal =
    document.getElementById("historyModal");

const viewHistoryBtn =
    document.getElementById("viewHistoryBtn");

const closeHistoryBtn =
    document.getElementById("closeHistoryBtn");


viewHistoryBtn.addEventListener("click", function () {

    historyModal.style.display = "flex";

});


closeHistoryBtn.addEventListener("click", function () {

    historyModal.style.display = "none";

});


historyModal.addEventListener("click", function (event) {

    if (event.target === historyModal) {

        historyModal.style.display = "none";

    }

});


// ===============================
// SEARCH INVENTORY
// ===============================

const inventorySearch =
    document.getElementById("inventorySearch");

inventorySearch.addEventListener("input", function () {

    const searchText =
        this.value.toLowerCase();

    const rows =
        document.querySelectorAll("#movementTable tr");

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        row.style.display =
            text.includes(searchText)
            ? ""
            : "none";

    });

});


// ===============================
// INITIALIZE DASHBOARD
// ===============================

updateKPIs();

applyFilters();

updateLowStockAlerts();

console.log(
    "StockSense Dashboard loaded successfully."
);
