function updateLowStockAlerts() {

    const lowStockList =
        document.getElementById("lowStockList");

    const lowStockProducts =
        products.filter(product => product.stock < 50);

    lowStockList.innerHTML = "";

    lowStockProducts.forEach(product => {

        const item = document.createElement("div");

        item.className = "alert-item";

        item.innerHTML = `
            <span>${product.name}</span>
            <strong>${product.stock} units</strong>
        `;

        lowStockList.appendChild(item);

    });
}

updateLowStockAlerts();


// ===============================
// SEARCH INVENTORY
// ===============================

const inventorySearch =
    document.getElementById("inventorySearch");

inventorySearch.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const rows =
        document.querySelectorAll("#movementTable tr");

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        row.style.display =
            text.includes(searchText) ? "" : "none";

    });

});


// ===============================
// UPDATE LOW STOCK ALERTS
// ===============================

function updateLowStockAlerts() {

    const lowStockList =
        document.getElementById("lowStockList");

    const lowStockProducts = products.filter(
        product => product.stock < 50
    );

    lowStockList.innerHTML = "";

    lowStockProducts.forEach(product => {

        const item = document.createElement("div");

        item.className = "alert-item";

        item.innerHTML = `
            <span>${product.name}</span>
            <strong>${product.stock} units</strong>
        `;

        lowStockList.appendChild(item);

    });
}

updateLowStockAlerts();
