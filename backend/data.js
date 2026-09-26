{
  "users": [
    {
      "id": "5215d909-abfc-433d-9424-bc93a5c3c08c",
      "name": "veda",
      "email": "24wh1a04b3@bvrithyderabad.edu.in",
      "workspace": "vegah",
      "salt": "e7d8c80c37900921cf8ad86971f49ca3",
      "passwordHash": "3896f3348351f15f48466efca8c5b08413b6aee43b5e71591ab56259910df9df"
    },
    {
      "id": "b6776303-34f3-4b5a-b91c-04a15a0c59b6",
      "name": "SRI VEDA VATSAVAYA",
      "email": "24wh1a04b2@bvrithyderabad.edu.in",
      "workspace": "vegah",
      "salt": "2ef1c8ba5b435cdf7b80b2a9b9dc6059",
      "passwordHash": "faccb0e2d21946dd48599a79682de2b02731c2e098d255b606f2e4541b4243e9"
    },
    {
      "id": "3ec33024-3fec-47d9-b8fa-1a64c5b8e3fa",
      "name": "veda sri",
      "email": "veda123@gmail.com",
      "workspace": "vedash",
      "phone": "+919876543210",
      "salt": "88d9f16ee4208053e802398b653f0ea8",
      "passwordHash": "8083524800244cd72034df137488c1629344c8a42ecb58147254fa511aa3804c"
    },
    {
      "id": "c947c516-3a8b-41a2-8547-ca12bfdb4f36",
      "name": "rajesh",
      "email": "rajesh123@gmail.com",
      "workspace": "rajeev's",
      "phone": "+919876543217",
      "salt": "d61f44bc421ad67a810623dd495d2f31",
      "passwordHash": "21ce696b78881c4f1d92c6cea74a9063bbcabf8ef43b7c4922ef3dd40259ac54"
    }
  ],
  "products": [
    {
      "id": "P-9619",
      "name": "oak table",
      "sku": "1234",
      "category": "Furniture",
      "unit": "1pcs",
      "stock": 1,
      "min": 2,
      "location": "Main Warehouse",
      "icon": "◫"
    },
    {
      "id": "P-1042",
      "name": "Steel Rods",
      "sku": "STL-001",
      "category": "Raw materials",
      "unit": "kg",
      "stock": 247,
      "min": 100,
      "location": "Production Floor",
      "icon": "▤"
    },
    {
      "id": "P-1038",
      "name": "Oak Dining Chair",
      "sku": "FUR-014",
      "category": "Furniture",
      "unit": "pcs",
      "stock": 42,
      "min": 50,
      "location": "Production Floor",
      "icon": "▰"
    },
    {
      "id": "P-1035",
      "name": "Brass Hinges",
      "sku": "HRD-022",
      "category": "Hardware",
      "unit": "pcs",
      "stock": 16,
      "min": 40,
      "location": "Main Warehouse",
      "icon": "⚙"
    },
    {
      "id": "P-1029",
      "name": "Canvas Fabric",
      "sku": "TXT-008",
      "category": "Textiles",
      "unit": "m",
      "stock": 320,
      "min": 80,
      "location": "East Depot",
      "icon": "▥"
    },
    {
      "id": "P-1024",
      "name": "Walnut Plank",
      "sku": "WD-006",
      "category": "Raw materials",
      "unit": "pcs",
      "stock": 8,
      "min": 30,
      "location": "Main Warehouse",
      "icon": "▱"
    },
    {
      "id": "P-1018",
      "name": "Packing Boxes",
      "sku": "PKG-031",
      "category": "Packaging",
      "unit": "pcs",
      "stock": 186,
      "min": 100,
      "location": "East Depot",
      "icon": "▣"
    },
    {
      "id": "P-1012",
      "name": "Steel Fasteners",
      "sku": "STL-009",
      "category": "Hardware",
      "unit": "pcs",
      "stock": 0,
      "min": 60,
      "location": "Production Floor",
      "icon": "⛓"
    },
    {
      "id": "P-1007",
      "name": "Cotton Thread",
      "sku": "TXT-012",
      "category": "Textiles",
      "unit": "spool",
      "stock": 94,
      "min": 40,
      "location": "East Depot",
      "icon": "◉"
    }
  ],
  "operations": [
    {
      "id": "ADJ-2158",
      "type": "Adjustment",
      "party": "Cycle count",
      "lines": "oak table",
      "qty": 1,
      "warehouse": "Main Warehouse",
      "date": "2026-09-26",
      "status": "Done"
    },
    {
      "id": "TRF-5283",
      "type": "Internal",
      "party": "Main Warehouse → Production Floor",
      "lines": "Steel Rods",
      "qty": 1,
      "warehouse": "Main Warehouse",
      "date": "2026-09-26",
      "status": "Done"
    },
    {
      "id": "REC-2841",
      "type": "Receipt",
      "party": "Apex Steel Co.",
      "lines": "Steel Rods, Steel Fasteners",
      "qty": 150,
      "warehouse": "Main Warehouse",
      "date": "2026-09-26",
      "status": "Ready"
    },
    {
      "id": "DEL-1092",
      "type": "Delivery",
      "party": "Urban Living Co.",
      "lines": "Oak Dining Chair",
      "qty": 12,
      "warehouse": "Production Floor",
      "date": "2026-09-26",
      "status": "Waiting"
    },
    {
      "id": "TRF-0518",
      "type": "Internal",
      "party": "Main Warehouse → Production Floor",
      "lines": "Steel Rods",
      "qty": 40,
      "warehouse": "Main Warehouse",
      "date": "2026-09-25",
      "status": "Done"
    },
    {
      "id": "REC-2840",
      "type": "Receipt",
      "party": "Loom & Co.",
      "lines": "Canvas Fabric, Cotton Thread",
      "qty": 85,
      "warehouse": "East Depot",
      "date": "2026-09-25",
      "status": "Done"
    },
    {
      "id": "ADJ-0136",
      "type": "Adjustment",
      "party": "Cycle count",
      "lines": "Walnut Plank",
      "qty": -2,
      "warehouse": "Main Warehouse",
      "date": "2026-09-24",
      "status": "Done"
    },
    {
      "id": "DEL-1091",
      "type": "Delivery",
      "party": "Forma Studio",
      "lines": "Oak Dining Chair, Brass Hinges",
      "qty": 8,
      "warehouse": "Production Floor",
      "date": "2026-09-24",
      "status": "Ready"
    },
    {
      "id": "TRF-0517",
      "type": "Internal",
      "party": "East Depot → Main Warehouse",
      "lines": "Packing Boxes",
      "qty": 30,
      "warehouse": "East Depot",
      "date": "2026-09-23",
      "status": "Waiting"
    },
    {
      "id": "REC-2839",
      "type": "Receipt",
      "party": "Northline Hardware",
      "lines": "Brass Hinges, Steel Fasteners",
      "qty": 120,
      "warehouse": "Main Warehouse",
      "date": "2026-09-22",
      "status": "Done"
    }
  ],
  "warehouses": [
    "Main Warehouse",
    "Production Floor",
    "East Depot"
  ]
}
