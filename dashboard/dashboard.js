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
