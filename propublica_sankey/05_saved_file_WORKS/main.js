// METHOD 05: the one that works. Fetch our OWN saved file (same-origin, no CORS),
// which we downloaded once from the API by opening the URL in a browser tab.
// This is the fetch-once-and-cache pattern real data pipelines use.
const NONPROFIT_SEARCH_URL = "org.json";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const res = await fetch(NONPROFIT_SEARCH_URL);
    const data = await res.json();
const filings = data.filings_with_data;

const columns = [
  { key: "tax_prd_yr",     label: "Year" },
  { key: "totrevenue",     label: "Revenue" },
  { key: "totfuncexpns",   label: "Expenses" },
  { key: "totnetassetend", label: "Net assets" },
  { key: "totcntrbgfts",     label: "Gift" },
  { key: "totprgmrevnue",     label: "Program Revenue" },
  { key: "invstmntinc",   label: "Investment" }
];
const rowHeight = 24, colWidth = 160;

const svg = d3.select("#weather-svg").attr("height", (filings.length + 1) * rowHeight + 10);
svg.selectAll("*").remove();

svg.selectAll("text.header").data(columns).join("text")
  .attr("class","header").attr("x",(d,i)=>4+i*colWidth).attr("y",18)
  .attr("font-weight","bold").text(d=>d.label);

const rows = svg.selectAll("g.row").data(filings).join("g")
  .attr("class","row").attr("transform",(d,i)=>"translate(0,"+((i+1)*rowHeight+18)+")");

    rows.selectAll("text.cell")
      .data(filing => columns.map(col => filing[col.key]))
      .join("text").attr("class","cell").attr("x",(d,i)=>4+i*colWidth)
      .text(d => typeof d === "number" ? d.toLocaleString() : d);
  });
});
