// Notes pour IPA

export function createChart4(containerId) {
    d3.csv("assets/checkins.csv").then(function(csv) { /* ici toute votre creation de la visualization */

      var ipaData = csv.filter(function(d) {
        return d.beer_style.substring(0,3) === 'IPA';  // Filtrer par type de bière
      });

      var data = ipaData.map(function(d) { return d.avg_rating; })

      data.sort((a,b) => a-b);
    
      const width = 1000;
      const height = 500;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
      const yScale = (val) => innerHeight - (val / maxData) * innerHeight;
    
      // Axe Y
      for(let i=0; i<=5; i++) {
        const yVal = (maxData / 5) * i;
        const yPos = yScale(yVal);
    
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", 0);
        line.setAttribute("x2", innerWidth);
        line.setAttribute("y1", yPos);
        line.setAttribute("y2", yPos);
        line.setAttribute("stroke", "#ccc");
        line.setAttribute("stroke-width", "1");
        g.appendChild(line);
    
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", -10);
        text.setAttribute("y", yPos + 4);
        text.setAttribute("text-anchor", "end");
        text.setAttribute("font-size", "12");
        text.textContent = yVal.toFixed(2);
        g.appendChild(text);
      }
    
      // Axe X
      for(let i=0; i < data.length; i += 100) {
        const xPos = xScale(i) + barWidth / 2;
    
        const tick = document.createElementNS(svgNS, "line");
        tick.setAttribute("x1", xPos);
        tick.setAttribute("x2", xPos);
        tick.setAttribute("y1", innerHeight);
        tick.setAttribute("y2", innerHeight + 6);
        tick.setAttribute("stroke", "#000");
        g.appendChild(tick);
    
        const label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", xPos);
        label.setAttribute("y", innerHeight + 20);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "12");
        label.textContent = i;
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