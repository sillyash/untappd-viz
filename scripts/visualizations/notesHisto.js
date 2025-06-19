const containerId = 'viz-1';

function main() {
  d3.csv("../../assets/checkins.csv").then(function(csv) {

    // Filtrer IPA
    var ratings = csv.map(d => +d.rating_score);

    const binSize = 0.25;
    const binsCount = Math.ceil(5 / binSize); // 20 bins pour 0->5

    // Initialiser les bins à 0
    const bins = new Array(binsCount).fill(0);

    // Remplir les bins
    ratings.forEach(r => {
      let binIndex = Math.floor(r / binSize);
      if (binIndex >= binsCount) binIndex = binsCount - 1;
      if (binIndex < 0) binIndex = 0;
      bins[binIndex]++;
    });

    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.style.maxWidth = "100%";
    svg.style.height = "auto";

    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    // Échelles
    const xScale = d3.scaleBand()
      .domain(d3.range(binsCount))
      .range([0, innerWidth])
      .padding(0.1);

    const maxFreq = Math.max(...bins);
    const yScale = d3.scaleLinear()
      .domain([0, maxFreq])
      .range([innerHeight, 0]);

    // Axe X avec labels des intervalles
    const axisBottom = d3.axisBottom(xScale)
    .tickFormat(i => {
      const start = i * binSize;
      const end = (i + 1) * binSize;
      const avg = (start + end) / 2;
      return avg.toFixed(1);
    });
    const xAxisGroup = document.createElementNS(svgNS, "g");
    xAxisGroup.setAttribute("transform", `translate(0,${innerHeight})`);
    d3.select(xAxisGroup).call(axisBottom);
    g.appendChild(xAxisGroup);

    // Axe Y
    const axisLeft = d3.axisLeft(yScale).ticks(5);
    const yAxisGroup = document.createElementNS(svgNS, "g");
    d3.select(yAxisGroup).call(axisLeft);
    g.appendChild(yAxisGroup);

    // Barres
    bins.forEach((count, i) => {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", xScale(i));
      rect.setAttribute("y", yScale(count));
      rect.setAttribute("width", xScale.bandwidth());
      rect.setAttribute("height", innerHeight - yScale(count));
      rect.setAttribute("fill", "steelblue");
      g.appendChild(rect);
    });

    // Ajouter SVG au container
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container #${containerId} introuvable`);
    container.innerHTML = "";
    container.appendChild(svg);
  });
}

main();
