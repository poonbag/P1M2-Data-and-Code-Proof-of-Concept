const NONPROFIT_SEARCH_URL = "org.json";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const res = await fetch(NONPROFIT_SEARCH_URL);
    const data = await res.json();
    console.log(data)
    const filings = data.filings_with_data;

    const svg = d3.select("#weather-svg")
      .attr("height", filings.length * 20 + 20);

    svg.selectAll("text")
      .data(filings)
      .join("text")
        .attr("x", 4)
        .attr("y", (d, i) => 20 + i * 20)
        .text(d => d.tax_prd_yr + ": $" + d.totrevenue.toLocaleString());
  });
});