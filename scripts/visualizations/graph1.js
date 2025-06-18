chart = {
    const width = 500; // uncomment for responsive width
    const height = 500;
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");
  
    const data = [1,2,5,10,30];
    
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr('cx', (d, i) => 100 + d * 10)
        .attr('cy', 250)
        .attr('r', (i) => i)
        .style('fill', 'orange');
    
    return svg.node();
  }


  chart = {
    const width = 500; // uncomment for responsive width
    const height = 500;
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");
  
    const data = [1,2,5,10,30];
    
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => i * 30)
      .attr("y", d => 250 - d * 10)
      .attr("width", 20)
      .attr("height", d => d * 10)
        .attr("fill", "steelblue");
    return svg.node();
  }



  chart = {
    const width = 1000;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");
  
    let data = [3.25,2,2,4,2.25,4,3.75,0.5,3,3.75,3.5,2.75,4,3.5,4,3,4,3.75,3.75,4,3.75,4.25,3.5,3.75,3.25,3.25,3,3,4,4,4.25,3.5,4.25,3.5,3.5,4.25,4.25,4.5,3.25,4.5,3.75,3.75,3.75,4,3.75,4,4,3.75,4,4,3.5,4,2.75,3,4.5,4,4,3.75,3.75,3.25,3.25,3.75,4.5,3.75,4,3.5,4,3.75,4,3.25,2.75,4,4,3.5,3.5,3.25,3.75,4.5,3.75,3.5,3.75,3.75,1.75,1.75,3.75,2.75,3.75,4,2,3.75,4,4,3.75,3,3.5,3.75,4,4,4.5,3.75,3.5,3.25,3,3.75,4,3.75,4,4,4,3.25,3.75,4.5,2.75,4,3.75,4.5,3.25,3.75,3.75,3.75,3.5,3.75,3,3.75,3,4.5,3,4.5,3.75,3.75,3.5,4,4,3.25,4.5,3,2.5,4,4,4,3,4,3.5,5,1,2.75,4,3.5,3,3,3,4,4.25,3.5,2.5,3,3.5,3,2,3,3,3,4.25,4,3,3.5,3.25,4.5,4.75,3.25,3.5,3.75,4,4,3,3.25,3.5,4,3.25,3.5,2.75,4.25,4.25,3.5,4];
  
    data = data.sort((a, b) => a - b);
  
    const abcisse = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, innerWidth])
      .padding(0.1);
  
    const ordo = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight, 0]);
  
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const axisLeft = d3.axisLeft(ordo);
    const axisBottom = d3.axisBottom(abcisse).tickValues(abcisse.domain().filter(function(d,i){ return !(i%10)}));
  
  
    g.append("g")
      .call(axisLeft);
  
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(axisBottom);
  
    
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => abcisse(i))
      .attr("y", d => ordo(d))
      .attr("width", abcisse.bandwidth())
      .attr("height", d => innerHeight - ordo(d))
      .attr("fill", "steelblue");
  
  
    return svg.node();
  }
  