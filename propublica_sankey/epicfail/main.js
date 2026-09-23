const NONPROFIT_SEARCH_URL = "smithsonian.json";
 
document.addEventListener("DOMContentLoaded", () => {
 
  // Search
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const res = await fetch(NONPROFIT_SEARCH_URL);
    const data = await res.json();

    const orgs = data.organizations;

    const svg = d3.select("#weather-svg")
      .attr("height", orgs.length * 20 + 20);

    svg.selectAll("text")
      .data(orgs)
      .join("text")
        .attr("x", 4)
        .attr("y", (d, i) => 20 + i * 20)
        .text(d => d.name + " — " + d.ein);
  });
});