var data, cols;

async function loadData() {
	await d3.csv('assets/checkins.csv').then(function(csvData) {
		data = d3.rollup(
			csvData,
			v => v.length,
			d => d.brewery_name
		);
	})

	console.log(data);
}

async function main() {
	await loadData();

	const barHeight = 25;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 30;
  const width = 928;
  const height = Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;

	// Create the scales
  const x = null;
  const y = null;

  // Create a value format
  const format = x.tickFormat(20, "%");

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

	// attach to HTML
	d3.select("#viz-1").append(() => svg.node());
}

main();
