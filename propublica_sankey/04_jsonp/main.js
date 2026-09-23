// METHOD 04: JSONP. Instead of fetch(), load the API response as a <script>, which is
// never CORS-blocked. The response is wrapped in a call to our global callback.
// OBSERVED RESULT: 403 Forbidden — the server refused the request outright.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", () => {
    const svg = d3.select("#weather-svg").attr("height", 40);
    svg.selectAll("*").remove();

    // global function the API's response will call, with the data as its argument
            window.handleNonprofitData = function (data) {
              console.log("JSONP data:", data);
              svg.append("text").attr("x",4).attr("y",24).text("got " + (data.total_results ?? "?") + " results");
              const old = document.getElementById("propublica-jsonp");
              if (old) old.remove();
            };

    const script = document.createElement("script");
    script.id = "propublica-jsonp";
    script.src = "https://projects.propublica.org/nonprofits/api/v2/search.json?q=smithsonian&callback=handleNonprofitData";
    script.onerror = () => { svg.append("text").attr("x",4).attr("y",24).text("script failed (blocked/403)"); };
    document.body.appendChild(script);
  });
});
