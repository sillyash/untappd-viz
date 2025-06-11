// scripts/visualizations/test.js

// Import the class from the other module
import { CSV } from "../csv_tools.js";

var data, cols;

async function loadData() {
	await CSV.readCSV();
	data = CSV.getCSV();
	cols = CSV.getColums();
}

async function main() {
	await loadData();
  const svg = d3.create("svg");
	d3.select("viz-1").append(svg);
}

main();
