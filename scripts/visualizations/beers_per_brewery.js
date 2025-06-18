var data, cols;

async function loadData() {
	await d3.csv('assets/checkins.csv').then(function(csvData) {
		data = d3.rollup(
			csvData,
      (D) => D.length,
      (d) => d.brewery_name,
      (d) => d.beer_name,
		);
	})
}

async function main() {
	await loadData();
  
  let margin = {top: 20, right: 30, bottom: 40, left: 30};
  let width = 200 - margin.left - margin.right;
  let height = 200 - margin.top - margin.bottom; 

  let svg = d3.select("#viz-1")
    .append("svg")
    .attr("height", "min(100%, 90vh)")
    .attr("viewBox", `0 0 ${height} ${width}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

main();
