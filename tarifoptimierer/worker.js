self.importScripts("data.js");
self.importScripts("helpers.js");


// ================= GRAPH =================
let graph = {};

function addEdge(a,b,type,zone){
  if(!graph[a]) graph[a]=[];
  if(!graph[b]) graph[b]=[];

  graph[a].push({to:b,type,zone});
  graph[b].push({to:a,type,zone});
}

// ================= BUILD =================
function buildGraph(){

  for(let z in lokal){
    let list = lokal[z];
    for(let i=0;i<list.length;i++){
      for(let j=i+1;j<list.length;j++){
        addEdge(norm(list[i]), norm(list[j]), "LOKAL", z);
      }
    }
  }

  for(let z in regio){
    let list = regio[z];
    for(let i=0;i<list.length;i++){
      for(let j=i+1;j<list.length;j++){
        addEdge(norm(list[i]), norm(list[j]), "REGIO", z);
      }
    }
  }
}

// ================= PRIORITY QUEUE =================
class PQ {
  constructor(){ this.a=[]; }
  push(x){ this.a.push(x); }
  pop(){
    this.a.sort((x,y)=>x.score-y.score);
    return this.a.shift();
  }
  size(){ return this.a.length; }
}

// ================= DIJKSTRA =================
function solve(start, ziel, pricing){

  start = norm(start);
  ziel = norm(ziel);
  
if (start === ziel) {
    const zone = findLocalZone(start);
    
    return {
        cost: PREISE.LOKAL[pricing],
        tickets: 1,
        path: [start],
        steps: [{
        from: start,
        to: ziel,
        type: "LOKAL",
        zone: zone
        }]
    };
}


  let pq = new PQ();

  pq.push({
    node:start,
    cost:0,
    tickets:0,
    lastType:null,
    lastZone:null,
    path:[start],
    steps:[],
    score:0
  });

  let best = {};
  let bestResult = null;

  while(pq.size()){

    let cur = pq.pop();

    let key = cur.node + "|" + cur.lastType + "|" + cur.lastZone;

    if(best[key] !== undefined && best[key] <= cur.cost) continue;
    best[key] = cur.cost;

    if(cur.node === ziel){

      let candidate = {
        cost: cur.cost,
        tickets: cur.tickets,
        path: cur.path,
        steps: cur.steps
      };

      if(
        !bestResult ||
        candidate.cost < bestResult.cost ||
        (candidate.cost === bestResult.cost && candidate.tickets < bestResult.tickets)
      ){
        bestResult = candidate;
      }

      continue;
    }

    for(let e of (graph[cur.node] || [])){

      let newCost = cur.cost;
      let newTickets = cur.tickets;

      // neues Ticket nur bei Wechsel
      if(cur.lastType !== e.type || cur.lastZone !== e.zone){
        const price = (e.type === "LOKAL" || e.type === "REGIO")
            ? PREISE[e.type][pricing]
            : PREISE.MAXIMO[pricing];

        newCost += price;
        newTickets += 1;
      }

      pq.push({
        node: e.to,
        cost: newCost,
        tickets: newTickets,
        lastType: e.type,
        lastZone: e.zone,
        path: [...cur.path, e.to],
        steps: [...cur.steps, {
          from: cur.node,
          to: e.to,
          type: e.type,
          zone: e.zone
        }],
        score: newCost * 1000 + newTickets
      });
    }
  }

        const maximoResult = {
    cost: PREISE.MAXIMO[pricing],
    tickets: 1,
    path: [start, ziel],
    steps: [{
        from: start,
        to: ziel,
        type: "MAXIMO",
        zone: "Direkt"
    }]
    };

    function better(a, b){
    if(!a) return b;
    if(!b) return a;

    if(a.cost !== b.cost) return a.cost < b.cost ? a : b;
    return a.tickets <= b.tickets ? a : b;
    }

    return better(bestResult, maximoResult);
}

// ================= INIT =================
buildGraph();

self.onmessage = (e) => {

  const data = e.data;

  // ================= AUTOCOMPLETE =================
    if (data.type === "cities") {
    self.postMessage({
        type: "cities",
        data: getAllCities().map(formatCity)
    });
    return;
    }

  // ================= ROUTING =================
  self.postMessage(
    solve(data.start, data.ziel, data.pricing)
  );
};

function getAllCities(){

  let set = new Set();

  for(let z in lokal){
    lokal[z].forEach(c => set.add(norm(c)));
  }

  for(let z in regio){
    regio[z].forEach(c => set.add(norm(c)));
  }

  return [...set];
}

function findLocalZone(city){
  const n = norm(city);

  for (let zone in lokal){
    if (lokal[zone].map(norm).includes(n)){
      return zone;
    }
  }

  return "LOKAL"; // fallback
}