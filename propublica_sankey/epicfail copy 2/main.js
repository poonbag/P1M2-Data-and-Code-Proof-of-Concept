const NONPROFIT_SEARCH_URL = "org.json";

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#get-weather").addEventListener("click", async () => {
    const res = await fetch(NONPROFIT_SEARCH_URL);
    const data = await res.json();

    const filings = data.filings_with_data;

    // which columns to show, and the label for each
    const columns = [
      { key: "tax_prd_yr",   label: "Year" },
      { key: "totrevenue",   label: "Revenue" },
      { key: "totfuncexpns", label: "Expenses" },
      { key: "totnetassetend", label: "Net assets" }
      { key: "tax_prd_yr",   label: "Year" },
      { key: "totrevenue",   label: "Revenue" },
      { key: "totfuncexpns", label: "Expenses" },
      { key: "totnetassetend", label: "Net assets" }
      { key: "tax_prd_yr",   label: "Year" },
      { key: "totrevenue",   label: "Revenue" },
      { key: "totfuncexpns", label: "Expenses" },
      { key: "totnetassetend", label: "Net assets" }
    ];

    const rowHeight = 24;
    const colWidth = 160;

    const svg = d3.select("#weather-svg")
      .attr("height", (filings.length + 1) * rowHeight + 10);

    // clear anything drawn before, so repeat clicks don't stack
    svg.selectAll("*").remove();

    // header row
    svg.selectAll("text.header")
      .data(columns)
      .join("text")
        .attr("class", "header")
        .attr("x", (d, i) => 4 + i * colWidth)
        .attr("y", 18)
        .attr("font-weight", "bold")
        .text(d => d.label);

    // one group per filing (per year)
    const rows = svg.selectAll("g.row")
      .data(filings)
      .join("g")
        .attr("class", "row")
        .attr("transform", (d, i) => "translate(0," + ((i + 1) * rowHeight + 18) + ")");

    // one cell per column, inside each row
    rows.selectAll("text.cell")
      .data(filing => columns.map(col => filing[col.key]))
      .join("text")
        .attr("class", "cell")
        .attr("x", (d, i) => 4 + i * colWidth)
        .text(d => typeof d === "number" ? d.toLocaleString() : d);
  });
});