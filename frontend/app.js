/* =========================================
   STOCKSENSE FRONTEND
   ========================================= */

const pageContent = document.getElementById("pageContent");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

let products = [
    {
        id: 1,
        name: "Steel Rods",
        sku: "STL-001",
        category: "Raw Material",
        unit: "kg",
        stock: 150,
        location: "Main Warehouse"
    },
    {
        id: 2,
        name: "Office Chairs",
        sku: "CHR-002",
        category: "Finished Goods",
        unit: "units",
        stock: 42,
        location: "Warehouse 2"
    },
    {
        id: 3,
        name: "Copper Wire",
        sku: "COP-003",
        category: "Raw Material",
        unit: "meters",
        stock: 18,
        location: "Main Warehouse"
    },
    {
        id: 4,
        name: "Aluminium Sheets",
        sku: "ALU-004",
        category: "Raw Material",
        unit: "sheets",
        stock: 75,
        location: "Warehouse 2"
    }
];

let movements = [
    {
        id: "MOV-001",
        type: "Receipt",
        product: "Steel Rods",
        quantity: "+50",
        location: "Main Warehouse",
        status: "Done",
        date: "26 Sep 2026"
    },
    {
        id: "MOV-002",
        type: "Delivery",
        product: "Office Chairs",
        quantity: "-10",
        location: "Warehouse 2",
        status: "Done",
        date: "26 Sep 2026"
    },
    {
        id: "MOV-003",
        type: "Transfer",
        product: "Copper Wire",
        quantity: "0",
        location: "Main → Production",
        status: "Done",
        date: "25 Sep 2026"
    }
];


/* =========================================
   PAGE ROUTING
   ========================================= */

const pages = {
    dashboard: {
        title: "Dashboard",
        subtitle: "Overview of your inventory operations"
    },

    products: {
        title: "Products",
        subtitle: "Manage products and stock availability"
    },

    receipts: {
        title: "Receipts",
        subtitle: "Manage incoming stock from suppliers"
    },

    deliveries: {
        title: "Delivery Orders",
        subtitle: "Manage outgoing stock and customer deliveries"
    },

    transfers: {
        title: "Internal Transfers",
        subtitle: "Move stock between locations"
    },

    adjustments: {
        title: "Inventory Adjustments",
        subtitle: "Correct stock differences and damaged items"
    },

    history: {
        title: "Move History",
        subtitle: "View all inventory movements"
    },

    warehouse: {
        title: "Warehouse",
        subtitle: "Manage warehouse locations"
    },

    profile: {
        title: "My Profile",
        subtitle: "Manage your account information"
    }
};


function navigate(page) {

    const config = pages[page];

    pageTitle.textContent = config.title;
    pageSubtitle.textContent = config.subtitle;

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === page) {
            item.classList.add("active");
        }
    });

    if (page === "dashboard") renderDashboard();
    if (page === "products") renderProducts();
    if (page === "receipts") renderReceipts();
    if (page === "deliveries") renderDeliveries();
    if (page === "transfers") renderTransfers();
    if (page === "adjustments") renderAdjustments();
    if (page === "history") renderHistory();
    if (page === "warehouse") renderWarehouse();
    if (page === "profile") renderProfile();
}


/* =========================================
   DASHBOARD
   ========================================= */

function renderDashboard() {

    pageContent.innerHTML = `

        <div class="cards">

            <div class="card">
                <div class="card-label">Total Products in Stock</div>
                <div class="card-value">${products.length}</div>
                <div class="card-info green">Active products</div>
            </div>

            <div class="card">
                <div class="card-label">Low Stock Items</div>
                <div class="card-value">
                    ${products.filter(p => p.stock < 30).length}
                </div>
                <div class="card-info orange">Needs attention</div>
            </div>

            <div class="card">
                <div class="card-label">Pending Receipts</div>
                <div class="card-value">3</div>
                <div class="card-info orange">Awaiting validation</div>
            </div>

            <div class="card">
                <div class="card-label">Pending Deliveries</div>
                <div class="card-value">5</div>
                <div class="card-info orange">Ready for processing</div>
            </div>

        </div>


        <div class="page-header">
            <div>
                <h2>Recent Inventory Movements</h2>
                <p>Latest stock activity</p>
            </div>
        </div>


        <div class="table-container">

            <table>

                <thead>
                    <tr>
                        <th>Movement ID</th>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    ${movements.map(m => `
                        <tr>
                            <td><strong>${m.id}</strong></td>
                            <td>${m.type}</td>
                            <td>${m.product}</td>
                            <td>${m.quantity}</td>
                            <td>${m.location}</td>
                            <td>
                                <span class="status status-success">
                                    ${m.status}
                                </span>
                            </td>
                        </tr>
                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================
   PRODUCTS
   ========================================= */

function renderProducts() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Product Management</h2>
                <p>Create and manage inventory products</p>
            </div>

            <button class="btn btn-primary" onclick="openProductModal()">
                + Add Product
            </button>

        </div>


        <div class="table-container">

            <div class="table-toolbar">

                <input
                    class="search"
                    id="productSearch"
                    placeholder="Search product or SKU..."
                    onkeyup="filterProducts()"
                >

                <div class="filters">

                    <select id="categoryFilter" onchange="filterProducts()">
                        <option value="">All Categories</option>
                        <option value="Raw Material">Raw Material</option>
                        <option value="Finished Goods">Finished Goods</option>
                    </select>

                    <select>
                        <option>All Locations</option>
                        <option>Main Warehouse</option>
                        <option>Warehouse 2</option>
                    </select>

                </div>

            </div>


            <table>

                <thead>
                    <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody id="productTable">

                    ${productRows(products)}

                </tbody>

            </table>

        </div>
    `;
}


function productRows(list) {

    return list.map(p => {

        let status = "In Stock";
        let statusClass = "status-success";

        if (p.stock === 0) {
            status = "Out of Stock";
            statusClass = "status-danger";
        }
        else if (p.stock < 30) {
            status = "Low Stock";
            statusClass = "status-warning";
        }

        return `
            <tr>

                <td>
                    <strong>${p.name}</strong>
                </td>

                <td>${p.sku}</td>

                <td>${p.category}</td>

                <td>
                    <strong>${p.stock}</strong> ${p.unit}
                </td>

                <td>${p.location}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${status}
                    </span>
                </td>

            </tr>
        `;

    }).join("");
}


function filterProducts() {

    const search =
        document.getElementById("productSearch")
            ?.value
            .toLowerCase() || "";

    const category =
        document.getElementById("categoryFilter")
            ?.value || "";

    const filtered = products.filter(p => {

        const matchesSearch =
            p.name.toLowerCase().includes(search) ||
            p.sku.toLowerCase().includes(search);

        const matchesCategory =
            !category || p.category === category;

        return matchesSearch && matchesCategory;
    });

    document.getElementById("productTable").innerHTML =
        productRows(filtered);
}


/* =========================================
   PRODUCT MODAL
   ========================================= */

function openProductModal() {

    modalTitle.textContent = "Add New Product";

    modalContent.innerHTML = `

        <form id="productForm">

            <div class="form-group">
                <label>Product Name</label>
                <input id="productName" required>
            </div>

            <div class="form-group">
                <label>SKU / Code</label>
                <input id="productSku" required>
            </div>

            <div class="form-group">

                <label>Category</label>

                <select id="productCategory">

                    <option>Raw Material</option>
                    <option>Finished Goods</option>
                    <option>Components</option>

                </select>

            </div>

            <div class="form-group">
                <label>Unit of Measure</label>
                <input id="productUnit" placeholder="kg / units / meters" required>
            </div>

            <div class="form-group">
                <label>Initial Stock</label>
                <input id="productStock" type="number" min="0" value="0">
            </div>

            <div class="form-group">

                <label>Location</label>

                <select id="productLocation">

                    <option>Main Warehouse</option>
                    <option>Warehouse 2</option>
                    <option>Production Floor</option>

                </select>

            </div>


            <div class="form-actions">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()">
                    Cancel
                </button>

                <button
                    type="submit"
                    class="btn btn-primary">
                    Create Product
                </button>

            </div>

        </form>
    `;

    modalOverlay.classList.add("show");

    document
        .getElementById("productForm")
        .addEventListener("submit", createProduct);
}


function createProduct(e) {

    e.preventDefault();

    const newProduct = {

        id: Date.now(),

        name: document.getElementById("productName").value,

        sku: document.getElementById("productSku").value,

        category: document.getElementById("productCategory").value,

        unit: document.getElementById("productUnit").value,

        stock: Number(
            document.getElementById("productStock").value
        ),

        location: document.getElementById("productLocation").value

    };

    products.push(newProduct);

    closeModal();

    navigate("products");
}


function closeModal() {
    modalOverlay.classList.remove("show");
}


/* =========================================
   RECEIPTS
   ========================================= */

function renderReceipts() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Incoming Stock</h2>
                <p>Receive goods from vendors</p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openTransactionModal('receipt')">
                + New Receipt
            </button>

        </div>


        <div class="table-container">

            <table>

                <thead>

                    <tr>
                        <th>Receipt ID</th>
                        <th>Supplier</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td><strong>REC-001</strong></td>
                        <td>ABC Metals</td>
                        <td>Steel Rods</td>
                        <td>50 kg</td>
                        <td>
                            <span class="status status-warning">
                                Waiting
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td><strong>REC-002</strong></td>
                        <td>Wire Industries</td>
                        <td>Copper Wire</td>
                        <td>100 m</td>
                        <td>
                            <span class="status status-success">
                                Done
                            </span>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================
   DELIVERY
   ========================================= */

function renderDeliveries() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Delivery Orders</h2>
                <p>Manage outgoing stock</p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openTransactionModal('delivery')">
                + New Delivery
            </button>

        </div>


        <div class="table-container">

            <table>

                <thead>

                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td><strong>DEL-001</strong></td>
                        <td>XYZ Furniture</td>
                        <td>Office Chairs</td>
                        <td>10 units</td>
                        <td>
                            <span class="status status-blue">
                                Ready
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td><strong>DEL-002</strong></td>
                        <td>ABC Office</td>
                        <td>Steel Rods</td>
                        <td>20 kg</td>
                        <td>
                            <span class="status status-success">
                                Done
                            </span>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================
   INTERNAL TRANSFERS
   ========================================= */

function renderTransfers() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Internal Transfers</h2>
                <p>Move stock between company locations</p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openTransactionModal('transfer')">
                + New Transfer
            </button>

        </div>


        <div class="info-box">

            <h3>Warehouse → Production Floor</h3>

            <p>
                Internal transfers move stock between locations
                without changing the total inventory quantity.
            </p>

            <br>

            <button
                class="btn btn-primary"
                onclick="openTransactionModal('transfer')">
                Create Transfer
            </button>

        </div>
    `;
}


/* =========================================
   ADJUSTMENTS
   ========================================= */

function renderAdjustments() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Inventory Adjustments</h2>
                <p>Correct physical and recorded stock differences</p>
            </div>

            <button
                class="btn btn-primary"
                onclick="openTransactionModal('adjustment')">
                + New Adjustment
            </button>

        </div>


        <div class="info-box">

            <h3>Stock Adjustment</h3>

            <p>
                Use this when physical stock does not match
                the quantity recorded in the system.
            </p>

            <br>

            <button
                class="btn btn-primary"
                onclick="openTransactionModal('adjustment')">
                Create Adjustment
            </button>

        </div>
    `;
}


/* =========================================
   TRANSACTION MODAL
   ========================================= */

function openTransactionModal(type) {

    let title = "New Transaction";

    if (type === "receipt")
        title = "Create Receipt";

    if (type === "delivery")
        title = "Create Delivery Order";

    if (type === "transfer")
        title = "Create Internal Transfer";

    if (type === "adjustment")
        title = "Create Stock Adjustment";

    modalTitle.textContent = title;

    modalContent.innerHTML = `

        <form id="transactionForm">

            <div class="form-group">

                <label>Product</label>

                <select id="transactionProduct">

                    ${products.map(p => `
                        <option value="${p.id}">
                            ${p.name} (${p.stock} ${p.unit})
                        </option>
                    `).join("")}

                </select>

            </div>

            <div class="form-group">

                <label>Quantity</label>

                <input
                    id="transactionQuantity"
                    type="number"
                    min="1"
                    required
                >

            </div>

            <div class="form-group">

                <label>Location</label>

                <select id="transactionLocation">

                    <option>Main Warehouse</option>
                    <option>Warehouse 2</option>
                    <option>Production Floor</option>

                </select>

            </div>


            <div class="form-actions">

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="closeModal()">
                    Cancel
                </button>

                <button
                    type="submit"
                    class="btn btn-primary">
                    Confirm
                </button>

            </div>

        </form>
    `;

    modalOverlay.classList.add("show");

    document
        .getElementById("transactionForm")
        .addEventListener("submit", function(e) {

            e.preventDefault();

            const productId =
                Number(document.getElementById("transactionProduct").value);

            const quantity =
                Number(document.getElementById("transactionQuantity").value);

            const product =
                products.find(p => p.id === productId);

            if (!product) return;

            if (type === "receipt") {

                product.stock += quantity;

            }

            if (type === "delivery") {

                if (product.stock < quantity) {

                    alert("Not enough stock available.");

                    return;
                }

                product.stock -= quantity;

            }

            if (type === "adjustment") {

                product.stock = quantity;

            }


            movements.unshift({

                id: "MOV-" + String(Date.now()).slice(-5),

                type:
                    type.charAt(0).toUpperCase() +
                    type.slice(1),

                product: product.name,

                quantity:
                    type === "receipt"
                        ? "+" + quantity
                        : type === "delivery"
                            ? "-" + quantity
                            : quantity,

                location:
                    document.getElementById(
                        "transactionLocation"
                    ).value,

                status: "Done",

                date: "26 Sep 2026"

            });


            closeModal();

            navigate("history");

        });
}


/* =========================================
   MOVE HISTORY
   ========================================= */

function renderHistory() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Stock Ledger</h2>
                <p>Complete history of inventory movements</p>
            </div>

        </div>


        <div class="table-container">

            <table>

                <thead>

                    <tr>
                        <th>Movement ID</th>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    ${movements.map(m => `

                        <tr>

                            <td>
                                <strong>${m.id}</strong>
                            </td>

                            <td>${m.type}</td>

                            <td>${m.product}</td>

                            <td>${m.quantity}</td>

                            <td>${m.location}</td>

                            <td>${m.date}</td>

                            <td>
                                <span class="status status-success">
                                    ${m.status}
                                </span>
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================
   WAREHOUSE
   ========================================= */

function renderWarehouse() {

    pageContent.innerHTML = `

        <div class="page-header">

            <div>
                <h2>Warehouse Management</h2>
                <p>Manage inventory storage locations</p>
            </div>

            <button
                class="btn btn-primary"
                onclick="alert('Warehouse creation will be connected to backend.')">
                + Add Warehouse
            </button>

        </div>


        <div class="cards">

            <div class="card">
                <div class="card-label">Warehouse</div>
                <div class="card-value">2</div>
                <div class="card-info green">Active locations</div>
            </div>

            <div class="card">
                <div class="card-label">Main Warehouse</div>
                <div class="card-value">248</div>
                <div class="card-info">Units / quantities stored</div>
            </div>

            <div class="card">
                <div class="card-label">Warehouse 2</div>
                <div class="card-value">117</div>
                <div class="card-info">Units / quantities stored</div>
            </div>

        </div>


        <div class="table-container">

            <table>

                <thead>
                    <tr>
                        <th>Warehouse</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td><strong>Main Warehouse</strong></td>
                        <td>Main Store</td>
                        <td>
                            <span class="status status-success">
                                Active
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td><strong>Warehouse 2</strong></td>
                        <td>Secondary Store</td>
                        <td>
                            <span class="status status-success">
                                Active
                            </span>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    `;
}


/* =========================================
   PROFILE
   ========================================= */
function renderProfile() {
    pageContent.innerHTML = `
        <div class="page-header">
            <div>
                <h2>My Profile</h2>
                <p>Manage your StockSense account</p>
            </div>
        </div>
        <div class="card" style="max-width:600px">
            <div class="user" style="margin-bottom:25px">
                <div class="avatar"
                     style="width:60px;height:60px;font-size:20px">
                    A
                </div>
                <div>
                    <strong style="font-size:18px">
                        Admin User
                    </strong>
                    <small>
                        Inventory Manager
                    </small>
                </div>
            </div>
            <div class="form-group">
                <label>Full Name</label>
                <input
                    value="Admin User"
                    style="width:100%;padding:11px;border:1px solid #e5e7eb;border-radius:7px"
                >
            </div>
            <div class="form-group">
                <label>Email</label>
                <input
                    value="admin@stocksense.com"
                    style="width:100%;padding:11px;border:1px solid #e5e7eb;border-radius:7px"
                >
            </div>
            <div class="form-group">
                <label>Role</label>
                <input
                    value="Inventory Manager"
                    disabled
                    style="width:100%;padding:11px;border:1px solid #e5e7eb;border-radius:7px"
                >
            </div>
            <button
                class="btn btn-primary"
                onclick="alert('Profile update will be connected to backend.')">
                Save Changes
            </button>

        </div>
    `;
}
/* =========================================
   NAVIGATION EVENTS
   ========================================= */

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {

        navigate(item.dataset.page);

    });

});
/* =========================================
   MODAL EVENTS
   ========================================= */
document
    .getElementById("closeModal")
    .addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function(e) {

    if (e.target === modalOverlay) {
        closeModal();
    }

});
/* =========================================
   LOGOUT
   ========================================= */
document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

        alert("Logout will be connected to authentication backend.");
    });
/* =========================================
   INITIAL PAGE
   ========================================= */

navigate("dashboard");
