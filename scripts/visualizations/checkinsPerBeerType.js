const containerId = 'viz-';
function main() {
  d3.csv("assets/checkins.csv").then(function(csv) { /* ici toute votre creation de la visualization */

    const filtered = csv.filter(d => +d.checkins_count > 20000);

    const averageRatingByStyle = d3.rollup(
      filtered,
      v => d3.mean(v, d => d.checkins_count),
      d => d.beer_style                      
    );

    var data = Array.from(averageRatingByStyle.values());
    data.sort((a,b) => a-b);

    var data2 = Array.from(averageRatingByStyle, ([style, checkins_count]) => ({ style, checkins_count }));
    data2.sort((a,b) => a.checkins_count-b.checkins_count);

  
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 150, left: 90 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const svgNS = "http://www.w3.org/2000/svg";
  
    // Création SVG
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.style.maxWidth = "100%";
    svg.style.height = "auto";
  
    // Groupe principal avec marge
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);
  
    // Échelles
    const xScale = (i) => (i * innerWidth / data.length);
    const barWidth = innerWidth / data.length * 0.9;
    const maxData = Math.max(...data);
  
    // Axe Y
    const yScale = d3.scaleLinear()
    .domain([0, maxData])           // valeurs en données
    .range([innerHeight, 0]);       // pixels SVG inversé (0 en haut)
  
    // Génération des ticks propres D3
    const ticks = yScale.ticks(5);
    
    ticks.forEach(yVal => {
      const yPos = yScale(yVal);
    
      // Ligne horizontale
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", 0);
      line.setAttribute("x2", innerWidth);
      line.setAttribute("y1", yPos);
      line.setAttribute("y2", yPos);
      line.setAttribute("stroke", "#ccc");
      line.setAttribute("stroke-width", "1");
      g.appendChild(line);
    
      // Texte du tick
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", -10);
      text.setAttribute("y", yPos + 4);
      text.setAttribute("text-anchor", "end");
      text.setAttribute("font-size", "12");
      text.textContent = d3.format(",")(yVal);
      g.appendChild(text);
    });
  
    // Axe X
    const yRef = innerHeight + 20; // position fixe sur Y

    for(let i = 0; i < data.length; i++) {
      const xPos = xScale(i) + barWidth / 2;
    
      // Tick
      const tick = document.createElementNS(svgNS, "line");
      tick.setAttribute("x1", xPos);
      tick.setAttribute("x2", xPos);
      tick.setAttribute("y1", innerHeight);
      tick.setAttribute("y2", innerHeight + 6);
      tick.setAttribute("stroke", "#000");
      g.appendChild(tick);
    
      // Label en diagonale
      const label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", xPos);
      label.setAttribute("y", yRef); // y fixe
      label.setAttribute("text-anchor", "end");
      label.setAttribute("font-size", "10");
    
      // Rotation autour du même point fixe (xPos, yRef)
      label.setAttribute("transform", `rotate(-45, ${xPos}, ${yRef})`);
    
      label.textContent = data2[i].style;
      g.appendChild(label);
    }
    // Barres
    data.forEach((d, i) => {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", xScale(i));
      rect.setAttribute("y", yScale(d));
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", innerHeight - yScale(d));
      rect.setAttribute("fill", "steelblue");
      g.appendChild(rect);
    });
  
    // Insérer dans le container ciblé
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Le conteneur avec id="${containerId}" est introuvable.`);
    }
    container.innerHTML = ""; // vider si besoin
    container.appendChild(svg);
  });
}

  main();