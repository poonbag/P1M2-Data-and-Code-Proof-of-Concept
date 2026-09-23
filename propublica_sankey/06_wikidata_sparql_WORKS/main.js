
const ENTITY = "Q455133"; // George Catlin, an artist in the Smithsonian American Art Museum

const SPARQL = `
SELECT ?person ?personLabel ?viaf WHERE {
  VALUES ?person { wd:${ENTITY} }
  OPTIONAL { ?person wdt:P214 ?viaf. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`;

//OPTIONAL kind of liek a left join

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const svg = d3.select("#weather-svg").attr("height", 120);
    svg.selectAll("*").remove();

    // (a) SPARQL: get the VIAF id
    const sparqlUrl = "https://query.wikidata.org/sparql?format=json&query=" + encodeURIComponent(SPARQL);
    const sres = await fetch(sparqlUrl);
    const sdata = await sres.json();
    const row = sdata.results.bindings[0] || {};
    const name = row.personLabel ? row.personLabel.value : ENTITY;
    const viaf = row.viaf ? row.viaf.value : "(none)";
    console.log("SPARQL says:", name, "VIAF", viaf);

          // (b) MediaWiki: were edits made? (revision history) — origin=* enables anonymous CORS
          const revUrl = "https://www.wikidata.org/w/api.php?action=query&prop=revisions&titles=" + ENTITY +
            "&rvprop=timestamp%7Cuser%7Ccomment&rvlimit=10&format=json&origin=*";
          const rres = await fetch(revUrl);
          const rdata = await rres.json();
            const pages = rdata.query.pages;
          const revs = pages[Object.keys(pages)[0]].revisions || [];
          console.log(revs.length + " recent edits:", revs);

    svg.append("text")
    .attr("x",4)
    .attr("y",24)
    .attr("font-weight","bold")
    .text(name + " — VIAF " + viaf);

    svg.append("text")
    .attr("x",4)
    .attr("y",52)
    .text(revs.length + " recent edits found (who/when in console)");
    
    revs.slice(0,10)
    .forEach((rv,i)=>{
      
        svg.append("text")
        .attr("x",4)
        .attr("y",76+i*20)
        .text(rv.timestamp.slice(0,16) + "  by " + (rv.user||"?"));
    });
  });
});
