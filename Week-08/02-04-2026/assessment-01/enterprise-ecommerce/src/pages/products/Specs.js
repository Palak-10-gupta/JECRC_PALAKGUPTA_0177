import React from "react";
import { useOutletContext } from "react-router-dom";

const specsMap = {
  Electronics: [
    ["Connectivity", "Bluetooth 5.3, USB-C"],
    ["Battery Life", "Up to 30 hours"],
    ["Charging Time", "2 hours (fast charge)"],
    ["Driver Size", "40mm dynamic drivers"],
    ["Frequency Response", "20Hz – 20kHz"],
    ["Weight", "250g"],
    ["Colors Available", "Midnight Black, Pearl White, Navy Blue"],
    ["Warranty", "2 years manufacturer warranty"],
  ],
  Accessories: [
    ["Material", "Full-grain genuine leather"],
    ["Movement", "Swiss quartz"],
    ["Case Diameter", "40mm"],
    ["Water Resistance", "50m (5 ATM)"],
    ["Strap Width", "20mm"],
    ["Case Material", "316L stainless steel"],
    ["Glass", "Sapphire crystal"],
    ["Warranty", "1 year international warranty"],
  ],
  Furniture: [
    ["Material", "Premium mesh + aluminum frame"],
    ["Max Load", "150kg"],
    ["Seat Height", "42–54cm adjustable"],
    ["Armrests", "4D adjustable"],
    ["Lumbar Support", "Adjustable depth & height"],
    ["Recline", "90°–135°"],
    ["Warranty", "5 years structural warranty"],
    ["Assembly", "Required (tools included)"],
  ],
  Stationery: [
    ["Pages", "192 pages per notebook"],
    ["Paper Weight", "100gsm acid-free"],
    ["Formats", "Dot-grid, Lined, Blank"],
    ["Cover", "Soft-touch hardcover"],
    ["Dimensions", "A5 (148 × 210mm)"],
    ["Binding", "Lay-flat sewn binding"],
    ["Ribbon", "2 satin bookmarks"],
    ["Closure", "Elastic band"],
  ],
};

const Specs = () => {
  const { product } = useOutletContext();
  const specs = specsMap[product.category] || specsMap["Electronics"];

  return (
    <div className="specs-section">
      <h3 className="specs-title">Technical Specifications</h3>
      <div className="specs-table">
        {specs.map(([key, val]) => (
          <div key={key} className="spec-row">
            <span className="spec-key">{key}</span>
            <span className="spec-val">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specs;