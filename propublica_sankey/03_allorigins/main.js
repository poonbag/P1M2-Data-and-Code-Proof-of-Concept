// METHOD 03: route through allorigins, a keyless proxy. The /get endpoint wraps the
// answer in a "contents" string, so we JSON.parse that.
// OBSERVED RESULT: 522 (upstream timeout) / intermittent. When the proxy fails it also
// can't attach the CORS header, so you may see a CORS line too. Free proxies are unreliable.
const TARGET = "https://projects.propublica.org/nonprofits/api/v2/search.json?q=smithsonian";
const URL = "https://api.allorigins.win/get?url=" + encodeURIComponent(TARGET);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const svg = d3.select("#weather-svg").attr("height", 40);
    svg.selectAll("*").remove();
    try {
      const res = await fetch(URL);
      console.log("status:", res.status);
      const wrapper = await res.json();
      const data = JSON.parse(wrapper.contents);
      console.log(data);
      svg.append("text").attr("x",4).attr("y",24).text("got " + (data.total_results ?? "?") + " results");
    } catch (err) {
      console.log("failed:", err.message);
      svg.append("text").attr("x",4).attr("y",24).text("failed: " + err.message);
    }
  });
});
