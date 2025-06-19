// Histogramme des notes générales

const containerId = 'viz-2';
function main() {
    d3.csv(CSV_URI).then(function(csv) {
  
      const filtered = csv.filter(d => +d.checkins_count > 20000);

      const grouped = d3.group(filtered, d => d.beer_name);
    
      const data = Array.from(grouped, ([beer_name, records]) => +records[0].checkins_count);

      data.sort((a,b) => a-b);
  
      const width = 1000;
      const height = 500;
      const margin = { top: 20, right: 20, bottom: 40, left: 50 };
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
      .domain(d3.range(data.length))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight, 0]);
  
      // Axe Y
      const axisLeft = d3.axisLeft(yScale)
      .ticks(6)                    // ~6 ticks automatiques
      .tickFormat(d3.format(".2s"))

      // Axe X avec un label
      const axisBottom = d3.axisBottom(xScale)
      .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90]);
      // Groupe pour l'axe Y
      const yAxisGroup = document.createElementNS(svgNS, "g");
      d3.select(yAxisGroup).call(axisLeft);
      g.appendChild(yAxisGroup);

      // Groupe pour l'axe X
      const xAxisGroup = document.createElementNS(svgNS, "g");
      xAxisGroup.setAttribute("transform", `translate(0,${innerHeight})`);
      d3.select(xAxisGroup).call(axisBottom);
      g.appendChild(xAxisGroup);
  
      // Barres
      data.forEach((count, i) => {
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

  