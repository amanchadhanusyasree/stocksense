{
  "users": [],
  "products": [
    {"id":"P-1042","name":"Steel Rods","sku":"STL-001","category":"Raw materials","unit":"kg","stock":248,"min":100,"location":"Main Warehouse","icon":"▤"},
    {"id":"P-1038","name":"Oak Dining Chair","sku":"FUR-014","category":"Furniture","unit":"pcs","stock":42,"min":50,"location":"Production Floor","icon":"▰"},
    {"id":"P-1035","name":"Brass Hinges","sku":"HRD-022","category":"Hardware","unit":"pcs","stock":16,"min":40,"location":"Main Warehouse","icon":"⚙"},
    {"id":"P-1029","name":"Canvas Fabric","sku":"TXT-008","category":"Textiles","unit":"m","stock":320,"min":80,"location":"East Depot","icon":"▥"},
    {"id":"P-1024","name":"Walnut Plank","sku":"WD-006","category":"Raw materials","unit":"pcs","stock":8,"min":30,"location":"Main Warehouse","icon":"▱"},
    {"id":"P-1018","name":"Packing Boxes","sku":"PKG-031","category":"Packaging","unit":"pcs","stock":186,"min":100,"location":"East Depot","icon":"▣"},
    {"id":"P-1012","name":"Steel Fasteners","sku":"STL-009","category":"Hardware","unit":"pcs","stock":0,"min":60,"location":"Production Floor","icon":"⛓"},
    {"id":"P-1007","name":"Cotton Thread","sku":"TXT-012","category":"Textiles","unit":"spool","stock":94,"min":40,"location":"East Depot","icon":"◉"}
  ],
  "operations": [
    {"id":"REC-2841","type":"Receipt","party":"Apex Steel Co.","lines":"Steel Rods, Steel Fasteners","qty":150,"warehouse":"Main Warehouse","date":"2026-09-26","status":"Ready"},
    {"id":"DEL-1092","type":"Delivery","party":"Urban Living Co.","lines":"Oak Dining Chair","qty":12,"warehouse":"Production Floor","date":"2026-09-26","status":"Waiting"},
    {"id":"TRF-0518","type":"Internal","party":"Main Warehouse → Production Floor","lines":"Steel Rods","qty":40,"warehouse":"Main Warehouse","date":"2026-09-25","status":"Done"},
    {"id":"REC-2840","type":"Receipt","party":"Loom & Co.","lines":"Canvas Fabric, Cotton Thread","qty":85,"warehouse":"East Depot","date":"2026-09-25","status":"Done"},
    {"id":"ADJ-0136","type":"Adjustment","party":"Cycle count","lines":"Walnut Plank","qty":-2,"warehouse":"Main Warehouse","date":"2026-09-24","status":"Done"},
    {"id":"DEL-1091","type":"Delivery","party":"Forma Studio","lines":"Oak Dining Chair, Brass Hinges","qty":8,"warehouse":"Production Floor","date":"2026-09-24","status":"Ready"},
    {"id":"TRF-0517","type":"Internal","party":"East Depot → Main Warehouse","lines":"Packing Boxes","qty":30,"warehouse":"East Depot","date":"2026-09-23","status":"Waiting"},
    {"id":"REC-2839","type":"Receipt","party":"Northline Hardware","lines":"Brass Hinges, Steel Fasteners","qty":120,"warehouse":"Main Warehouse","date":"2026-09-22","status":"Done"}
  ],
  "warehouses": ["Main Warehouse", "Production Floor", "East Depot"]
}
