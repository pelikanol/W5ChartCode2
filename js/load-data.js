d3.csv("../data/chinameat.csv", row => ({
    year: +row.year,
    beef: +row.beef,
    pig: +row.pig,
    poultry: +row.poultry,
    sheep: +row.sheep
  })).then(data => {
    console.log("Parsed data:", data); // Check if 'year' is being parsed correctly
    defineScales(data);
    drawDonutCharts(data);
    drawStackedBars(data);
    // addLegend();
  });
  