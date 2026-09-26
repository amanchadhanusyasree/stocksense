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


    // Hide all bars first

    bars.forEach((bar, index) => {

        bar.style.height = "0px";
        labels[index].style.opacity = "0.35";

    });


    // Display filtered products

    filteredProducts.forEach(product => {

        const index =
            products.findIndex(item =>
                item.name === product.name
            );


        if (index !== -1) {

            bars[index].style.height =
                product.stock + "px";

            labels[index].style.opacity = "1";

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
        }

        if (product.type === "transfer") {
            movementType = "Transfer";
            quantity = 20;
        }

        if (product.type === "adjustment") {
            movementType = "Adjustment";
            quantity = -3;
        }


        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${product.name}</td>
            <td>${movementType}</td>
            <td>${quantity > 0 ? "+" : ""}${quantity}</td>
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


    // Show message if nothing matches

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
// APPLY ALL FILTERS
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
// VIEW HISTORY BUTTON
// ===============================

document
    .getElementById("viewHistoryBtn")
    .addEventListener("click", function () {

        alert(
            "Move History\n\n" +
            "Steel Rods — Receipt — +50\n" +
            "Office Chairs — Delivery — -10\n" +
            "Aluminium Sheets — Transfer — +20\n" +
            "Plastic Covers — Adjustment — -3"
        );

    });


// ===============================
// INITIALIZE DASHBOARD
// ===============================

updateKPIs();

applyFilters();
const documentFilter = document.getElementById("documentFilter");

documentFilter.addEventListener("change", function () {

    const selected = this.value;

    const bars = document.querySelectorAll(".bar");

    if (selected === "receipt") {
        bars[0].style.height = "150px";
        bars[1].style.height = "110px";
        bars[2].style.height = "50px";
        bars[3].style.height = "70px";
        bars[4].style.height = "100px";
    }

    else if (selected === "delivery") {
        bars[0].style.height = "80px";
        bars[1].style.height = "60px";
        bars[2].style.height = "40px";
        bars[3].style.height = "120px";
        bars[4].style.height = "70px";
    }

    else if (selected === "transfer") {
        bars[0].style.height = "110px";
        bars[1].style.height = "80px";
        bars[2].style.height = "55px";
        bars[3].style.height = "65px";
        bars[4].style.height = "130px";
    }

    else if (selected === "adjustment") {
        bars[0].style.height = "60px";
        bars[1].style.height = "50px";
        bars[2].style.height = "100px";
        bars[3].style.height = "45px";
        bars[4].style.height = "75px";
    }

    else {
        bars[0].style.height = "120px";
        bars[1].style.height = "85px";
        bars[2].style.height = "45px";
        bars[3].style.height = "70px";
        bars[4].style.height = "95px";
    }

});
console.log("StockSense Dashboard loaded successfully.");
