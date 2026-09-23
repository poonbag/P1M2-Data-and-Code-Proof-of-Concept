// METHOD 02: route through corsproxy.io, which is supposed to add the CORS header.
// OBSERVED RESULT: 401 Unauthorized. The proxy received the call and refused it
// (key/plan/origin issue). Different wall from method 01: we reached a server, it said no.
const KEY = "YOUR_CORSPROXY_KEY"; // we tested with 263eb960
const TARGET = "https://projects.propublica.org/nonprofits/api/v2/search.json?q=smithsonian";
const URL = "https://corsproxy.io/?key=" + KEY + "&url=" + encodeURIComponent(TARGET);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const svg = d3.select("#weather-svg").attr("height", 40);
    svg.selectAll("*").remove();
try {
  const res = await fetch(URL);
  console.log("status:", res.status);
  const data = await res.json();
  console.log(data);
  svg.append("text").attr("x",4).attr("y",24).text("status " + res.status);
} catch (err) {
  console.log("failed:", err.message);
      svg.append("text").attr("x",4).attr("y",24).text("failed: " + err.message);
    }
  });
});
