var data, cols;

async function loadData() {
  await d3.csv(CSV_URI).then(function (csvData) {
    /** Group by 'brewery_name'.
     * For each brewery group (v), create a Set of unique 'beer_name's
     * and get its size, i.e. count of unique beers.
     * Also, take the first 'brewery_type' from the group (same brewery, same brewery_type).
     */
    const breweryData = d3.rollup(
      csvData,
      (v) => ({
        num_beers: new Set(v.map((d) => d.beer_name)).size,
        brewery_type: v[0].brewery_type
      }),
      (d) => d.brewery_name
    );

    data = Array.from(breweryData, ([brewery_name, { num_beers, brewery_type }]) => ({
      brewery_name,
      num_beers,
      brewery_type
    }));

    // Sort by number of beers
    data.sort((a, b) => b.num_beers - a.num_beers);

    // Only keep biggest
    data = data.slice(0, 20);
  });
}

function makeSVG(width, height, margin) {
  const totalWidth = width + margin.left + margin.right;
  const totalHeight = height + margin.top + margin.bottom;
  
  let ret = d3
    .select("#viz-3")
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

  const margin = { top: 30, right: 30, bottom: 180, left: 60 };
  const width = 900 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Color scale
  const types = Array.from(new Set(data.map(d => d.brewery_type)));
  const color = d3.scaleOrdinal()
    .domain(types)
    .range(d3.schemeCategory10);

  var svg = makeSVG(width, height, margin);

  var x = makeXaxis(width, data);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  var y = makeYaxis(height, data);
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Different Beers");

  // Bars with color by brewery_type
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.brewery_name))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.num_beers))
    .attr("height", (d) => height - y(d.num_beers))
    .style("fill", (d) => color(d.brewery_type));

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

  // Add color legend for brewery_type
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 140}, 10)`);

  types.forEach((type, i) => {
    legend.append("rect")
      .attr("x", 0)
      .attr("y", i * 22)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color(type));

    legend.append("text")
      .attr("x", 26)
      .attr("y", i * 22 + 13)
      .text(type)
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle");
  });
}

main();
