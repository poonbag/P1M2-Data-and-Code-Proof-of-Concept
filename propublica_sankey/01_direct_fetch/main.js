// METHOD 01: call ProPublica directly from the browser.
// OBSERVED RESULT: blocked by CORS. "Failed to fetch", no status number,
// because the browser refuses the cross-origin call before you can read it.
const URL = "https://projects.propublica.org/nonprofits/api/v2/search.json?q=smithsonian";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", async () => {
const svg = d3.select("#weather-svg").attr("height", 40);
svg.selectAll("*").remove();
try {
  const res = await fetch(URL);
  console.log("status:", res.status);
  const data = await res.json();
  console.log(data);
  svg
    .append("text")
    .attr("x", 4)
    .attr("y", 24)
    .text("status " + res.status);
} catch (err) {
  console.log("failed:", err.message);
  svg
    .append("text")
    .attr("x", 4)
    .attr("y", 24)
    .text("blocked: " + err.message);
}
});
});
