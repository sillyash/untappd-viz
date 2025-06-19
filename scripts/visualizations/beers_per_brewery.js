var data, cols;

async function loadData() {
  await d3.csv("assets/checkins.csv").then(function (csvData) {
    /** Group by 'brewery_name'.
     * For each brewery group (v), create a Set of unique 'beer_name's
     * and get its size, i.e. count of unique beers.
     */
    const breweryData = d3.rollup(
      csvData,
      (v) => new Set(v.map((d) => d.beer_name)).size,
      (d) => d.brewery_name
    );

    data = Array.from(breweryData, ([brewery_name, num_beers]) => ({
      brewery_name,
      num_beers,
    }));
    
    // Sort by number of beers
    data.sort((a, b) => b.num_beers - a.num_beers);

    // Only keep biggest
    data = data.slice(0, 25);
  });
}

function makeSVG(width, height, margin) {
  const totalWidth = width + margin.left + margin.right;
  const totalHeight = height + margin.top + margin.bottom;
  
  let ret = d3
    .select("#viz-1")
    .append("svg")
    .attr("viewBox", `0 0 ${totalWidth} ${totalHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return ret;
}

function makeXaxis(width, data) {
  // X axis for brewery names
  let x = d3
    .scaleBand()
    .domain(data.map((d) => d.brewery_name))
    .range([0, width])
    .padding(0.1);

  return x;
}

function makeYaxis(height, data) {
  // Y axis for number of beers
  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.num_beers)])
    .range([height, 0]);

  return y;
}

async function main() {
  await loadData();

  const margin = { top: 20, right: 30, bottom: 180, left: 60 }; // Increased bottom margin for brewery names
  const width = 900 - margin.left - margin.right; // Increased width
  const height = 800 - margin.top - margin.bottom; // Adjusted height

  // Create SVG
  var svg = makeSVG(width, height, margin);

  // X axis (brewery names)
  var x = makeXaxis(width, data);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)"); // Rotate labels for readability

  // Y axis (number of beers)
  var y = makeYaxis(height, data);
  svg.append("g").call(d3.axisLeft(y));

  // Add Y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Different Beers");

  // Create bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.brewery_name))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.num_beers))
    .attr("height", (d) => height - y(d.num_beers))
    .style("fill", "#69b3a2");

  // Add value labels on top of bars
  svg
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => x(d.brewery_name) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.num_beers) - 5)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text((d) => d.num_beers);
}

main();