const containerId = 'viz-1';

function main() {
  d3.csv(CSV_URI).then(function(csv) {

    // Filtrer IPA
    var ratings = csv
        .filter(d => d.rating_score && d.rating_score >= 0.0)
        .map(d => d.rating_score);


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
    const xScale = d3.scaleLinear()
      .domain([0, 5])
      .range([0, innerWidth]);

    const barWidth = xScale(binSize) - xScale(0);

    const maxFreq = Math.max(...bins);
    const yScale = d3.scaleLinear()
      .domain([0, maxFreq])
      .range([innerHeight, 0]);

    // Axe X avec labels des intervalles
    const tickValues = d3.range(0, 5.1, binSize); 
    const axisBottom = d3.axisBottom(xScale)
      .tickValues(tickValues)
      .tickFormat(d => d.toFixed(2));
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
      const xPos = xScale(i * binSize); // Position au début de l'intervalle
      rect.setAttribute("x", xPos);
      rect.setAttribute("y", yScale(count));
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", innerHeight - yScale(count));
      rect.setAttribute("fill", "#663399");
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
