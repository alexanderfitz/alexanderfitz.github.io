const DISPLAY_MAP = {};

function buildDisplayMap(){
  function add(list){
    list.forEach(name => {
      const key = norm(name);
      if (!DISPLAY_MAP[key]) {
        DISPLAY_MAP[key] = name; // ORIGINAL aus data.js
      }
    });
  }

  for (let z in lokal) add(lokal[z]);
  for (let z in regio) add(regio[z]);
}

buildDisplayMap();

// ================= NORMALISIERUNG =================
function norm(s){
  return (s || "")
    .toLowerCase()
    .replace(/\./g,"")
    .replace(/\s+/g," ")
    .trim();
}

function formatCity(s){
  if(!s) return s;

  return DISPLAY_MAP[norm(s)] || s;
}