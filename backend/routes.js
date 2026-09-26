const express = require("express");
const router = express.Router();

const { readData, writeData } = require("./database");


// ======================================================
// HEALTH CHECK
// ======================================================

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "StockSense API is working"
    });
});


// ======================================================
// PRODUCTS
// ======================================================

// GET ALL PRODUCTS
router.get("/products", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        products: data.products
    });
});


// CREATE PRODUCT
router.post("/products", (req, res) => {
    const data = readData();

    const {
        name,
        sku,
        category,
        unit,
        stock,
        reorderLevel,
        location
    } = req.body;

    if (!name || !sku) {
        return res.status(400).json({
            success: false,
            message: "Product name and SKU are required"
        });
    }

    const existingProduct = data.products.find(
        p => p.sku === sku
    );

    if (existingProduct) {
        return res.status(400).json({
            success: false,
            message: "Product with this SKU already exists"
        });
    }

    const product = {
        id: Date.now().toString(),
        name,
        sku,
        category: category || "",
        unit: unit || "pcs",
        stock: Number(stock) || 0,
        reorderLevel: Number(reorderLevel) || 0,
        location: location || "",
        createdAt: new Date().toISOString()
    };

    data.products.push(product);

    writeData(data);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    });
});


// ======================================================
// RECEIPTS
// ======================================================

router.get("/receipts", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        receipts: data.receipts
    });
});


router.post("/receipts", (req, res) => {
    const data = readData();

    const {
        sku,
        quantity,
        location,
        reference
    } = req.body;

    const qty = Number(quantity);

    if (!sku || !quantity || qty <= 0) {
        return res.status(400).json({
            success: false,
            message: "SKU and valid quantity are required"
        });
    }

    const product = data.products.find(
        p => p.sku === sku
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product.stock = Number(product.stock || 0) + qty;

    const receipt = {
        id: Date.now().toString(),
        sku: product.sku,
        productName: product.name,
        quantity: qty,
        location: location || product.location,
        reference: reference || "",
        status: "Validated",
        date: new Date().toISOString()
    };

    data.receipts.push(receipt);

    data.ledger.push({
        id: Date.now().toString() + "-ledger",
        date: new Date().toISOString(),
        type: "Receipt",
        sku: product.sku,
        productName: product.name,
        quantity: qty,
        location: location || product.location,
        reference: receipt.id
    });

    writeData(data);

    res.status(201).json({
        success: true,
        message: "Receipt validated and stock updated",
        receipt,
        newStock: product.stock
    });
});


// ======================================================
// DELIVERIES
// ======================================================

router.get("/deliveries", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        deliveries: data.deliveries
    });
});


router.post("/deliveries", (req, res) => {
    const data = readData();

    const {
        sku,
        quantity,
        location,
        reference
    } = req.body;

    const qty = Number(quantity);

    if (!sku || !quantity || qty <= 0) {
        return res.status(400).json({
            success: false,
            message: "SKU and valid quantity are required"
        });
    }

    const product = data.products.find(
        p => p.sku === sku
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if (Number(product.stock) < qty) {
        return res.status(400).json({
            success: false,
            message: "Insufficient stock"
        });
    }

    product.stock = Number(product.stock) - qty;

    const delivery = {
        id: Date.now().toString(),
        sku: product.sku,
        productName: product.name,
        quantity: qty,
        location: location || product.location,
        reference: reference || "",
        status: "Validated",
        date: new Date().toISOString()
    };

    data.deliveries.push(delivery);

    data.ledger.push({
        id: Date.now().toString() + "-ledger",
        date: new Date().toISOString(),
        type: "Delivery",
        sku: product.sku,
        productName: product.name,
        quantity: -qty,
        location: location || product.location,
        reference: delivery.id
    });

    writeData(data);

    res.status(201).json({
        success: true,
        message: "Delivery validated and stock updated",
        delivery,
        newStock: product.stock
    });
});


// ======================================================
// TRANSFERS
// ======================================================

router.get("/transfers", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        transfers: data.transfers
    });
});


router.post("/transfers", (req, res) => {
    const data = readData();

    const {
        sku,
        quantity,
        fromLocation,
        toLocation
    } = req.body;

    const qty = Number(quantity);

    if (
        !sku ||
        !quantity ||
        !fromLocation ||
        !toLocation ||
        qty <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "SKU, quantity, source and destination are required"
        });
    }

    const product = data.products.find(
        p => p.sku === sku
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if (Number(product.stock) < qty) {
        return res.status(400).json({
            success: false,
            message: "Insufficient stock for transfer"
        });
    }

    product.stock = Number(product.stock) - qty;

    const transfer = {
        id: Date.now().toString(),
        sku: product.sku,
        productName: product.name,
        quantity: qty,
        fromLocation,
        toLocation,
        status: "Completed",
        date: new Date().toISOString()
    };

    data.transfers.push(transfer);

    data.ledger.push({
        id: Date.now().toString() + "-ledger",
        date: new Date().toISOString(),
        type: "Transfer",
        sku: product.sku,
        productName: product.name,
        quantity: -qty,
        location: fromLocation,
        reference: transfer.id
    });

    writeData(data);

    res.status(201).json({
        success: true,
        message: "Transfer completed",
        transfer,
        newStock: product.stock
    });
});


// ======================================================
// STOCK ADJUSTMENTS
// ======================================================

router.get("/adjustments", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        adjustments: data.adjustments
    });
});


router.post("/adjustments", (req, res) => {
    const data = readData();

    const {
        sku,
        quantity,
        reason,
        location
    } = req.body;

    const adjustmentQty = Number(quantity);

    if (!sku || quantity === undefined || !reason) {
        return res.status(400).json({
            success: false,
            message: "SKU, quantity and reason are required"
        });
    }

    const product = data.products.find(
        p => p.sku === sku
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    const newStock =
        Number(product.stock || 0) + adjustmentQty;

    if (newStock < 0) {
        return res.status(400).json({
            success: false,
            message: "Adjustment cannot make stock negative"
        });
    }

    product.stock = newStock;

    const adjustment = {
        id: Date.now().toString(),
        sku: product.sku,
        productName: product.name,
        quantity: adjustmentQty,
        reason,
        location: location || product.location,
        date: new Date().toISOString()
    };

    data.adjustments.push(adjustment);

    data.ledger.push({
        id: Date.now().toString() + "-ledger",
        date: new Date().toISOString(),
        type: "Adjustment",
        sku: product.sku,
        productName: product.name,
        quantity: adjustmentQty,
        location: location || product.location,
        reference: adjustment.id
    });

    writeData(data);

    res.status(201).json({
        success: true,
        message: "Stock adjustment completed",
        adjustment,
        newStock: product.stock
    });
});


// ======================================================
// LEDGER
// ======================================================

router.get("/ledger", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        ledger: data.ledger
    });
});


// ======================================================
// LOCATIONS
// ======================================================

router.get("/locations", (req, res) => {
    const data = readData();

    res.json({
        success: true,
        locations: data.locations
    });
});


module.exports = router;
