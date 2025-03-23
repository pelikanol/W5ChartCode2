const drawStackedBars = (data) => {
  
  const svg = d3.select("#bars")
    .append("svg")
      .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

const stackGenerator = d3.stack()  
  .keys(formatsInfo.map(f => f.id))
  .order(d3.stackOrderDescending)
  .offset(d3.stackOffsetExpand);
  
  

const annotatedData = stackGenerator(data);

console.log("annotatedData", annotatedData);

const maxUpperBoundary = d3.max(annotatedData[annotatedData.length - 1], d => d[1]);
    
const yScale = d3.scaleLinear()
    // .domain([0, maxUpperBoundary])
    .domain([0, 1])
    .range([innerHeight, 0])
    .nice();

    annotatedData.forEach(series => { 

      innerChart
          .selectAll(`.bar-${series.key}`)           
          .data(series)                               
          .join("rect")                             
          .attr("class", d => `bar-${series.key}`) 
          
      
          .attr("x", d => xScale(d.data.year))            
          .attr("y", d => yScale(d[1]))                    
          .attr("width", xScale.bandwidth())                
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("fill", colorScale(series.key));            
        
        });

const bottomAxis = d3.axisBottom(xScale)  
  .tickValues(d3.range(1991, 2024,5))   
  .tickSizeOuter(0);           

innerChart                                              
  .append("g")                                        
    .attr("transform", `translate(0, ${innerHeight})`) 
    .call(bottomAxis);                                 

const leftAxis = d3.axisLeft(yScale)
  .tickFormat(d3.format(".0%"))
  .ticks(5)
  .tickSizeOuter(0); 

innerChart                            
  .append("g")                        
    .call(leftAxis);

    };