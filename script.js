
//Stations
const upgradeData = {
    "Mining Operation": [
        { iron: 1, coal: 3 },
        { iron: 3, silver: 3, coal: 5 },
        { iron: 20, silver: 15, coal: 15 },
        { iron: 40, silver: 35, ruby: 1, sapphire: 1 },
        { iron: 50, silver: 40, diamond: 1 },
        { iron: 90, silver: 70, uranium: 1 },
        { iron: 150, silver: 100, plutonium: 1 },
        { iron: 200, silver: 150, plutonium: 3, opal: 1 },
        { iron: 300, silver: 200, plutonium: 5 },
        { iron: 400, silver: 300, azure: 1 },
        { unobtainium: 5, silver: 500, baryte: 15, azure: 1 },
        { unobtainium: 10, iron: 750, baryte: 30, azure: 3 },
        { unobtainium: 15, iron: 900, baryte: 50, serendibite: 5 },
        { unobtainium: 20, iron: 1000, stone: 100000, azure: 10 },
        { unobtainium: 25, stone: 200000, diamond: 100, azure: 20 },
        { unobtainium: 30, diamond: 200, painite: 50, rainbonite: 10 },
        { unobtainium: 35, diamond: 300, painite: 100, dragonglass: 100 },
        { unobtainium: 40, diamond: 400, painite: 250, dragonglass: 250 },
        { unobtainium: 45, diamond: 500, emerald: 300, mithril: 50 },
        { unobtainium: 50, platinum: 100, painite: 500, azure: 50 },
        { unobtainium: 50, dragonstone: 100, dragonglass: 300, firecrystal: 25 },
        { unobtainium: 50, dragonstone: 200, dragonglass: 400, newtonium: 25, uranium: 40 },
        { unobtainium: 50, dragonstone: 300, newtonium: 50, plutonium: 80 },
        { unobtainium: 50, dragonstone: 400, newtonium: 75, promethium: 35 },
        { unobtainium: 75, dragonstone: 1000, newtonium: 100, promethium: 50, uranium: 80, plutonium: 120, illuminunium: 30 },
        { unobtainium: 100, dragonstone: 1000, newtonium: 250, uranium: 200, plutonium: 225, corium: 70, solarium: 45, yunium: 50, promethium: 75 },
        { unobtainium: 200, antimatter: 250, constellatium: 200, darkmatter: 350, elementV: 1, frightstone: 1000, coins: 3000000, stellarite: 300, ambrosia: 1, amethyst: 100, azure: 100, baryte: 100, 
          boomite: 100, coal: 100, copper: 100, corium: 100, diamond: 100, dragonstone: 100, dragonglass: 100, emerald: 100, firecrystal: 100, garnet: 100, gold: 100, illuminunium: 100, iron: 100, 
          mithril: 100, moonstone: 100, newtonium: 100, opal: 100, painite: 100, platinum: 100, plutonium: 100, promethium: 100, rainbonite: 100, ruby: 100, sapphire: 100, serendibite: 100, silver: 100, 
          solarium: 100, sulfur: 100, topaz: 100, uranium: 100, yunium: 100 }
    ],
    "Data & Analysis": [
        { copper: 5, iron: 5 },
        { coins: 70, copper: 5, iron: 30 },
        { coins: 400, copper: 35, iron: 30 },
        { coins: 750, copper: 50, iron: 45 },
        { coins: 1500, copper: 75, iron: 100, gold: 30 },
        { coins: 4000, copper: 200, unobtainium: 5, gold: 50 },
        { coins: 10000, copper: 350, unobtainium: 10 },
        { coins: 30000, copper: 500, unobtainium: 15, plutonium: 5 },
        { coins: 100000, copper: 750, unobtainium: 25, azure: 10 },
        { coins: 250000, copper: 1000, unobtainium: 40, illuminunium: 1 },
        { coins: 500000, copper: 1500, unobtainium: 50, garnet: 1 },
        { coins: 900000, copper: 2000, unobtainium: 60, serendibite: 25 },
        { coins: 1000000, copper: 2500, unobtainium: 65, dragonstone: 100, dragonglass: 250 },
        { coins: 500000, copper: 2000, unobtainium: 70, dragonstone: 150, firecrystal: 60 },
        { coins: 250000, copper: 3500, unobtainium: 75, dragonstone: 250, newtonium: 100, promethium: 45 },
        { coins: 1750000, copper: 4000, unobtainium: 100, dragonstone: 400, silver: 5400, promethium: 55, corium: 50, yunium: 50 },
        { coins: 2000000, unobtainium: 100, darkmatter: 350, antimatter: 250, constellatium: 100, stellarite: 200, frightstone: 500, element_v: 1 }
    ],
    "Marketplace": [
        { ruby: 1 },
        { coins: 1000, topaz: 3 },
        { coins: 2500, topaz: 5, diamond: 3 },
        { coins: 6000, topaz: 10, diamond: 5, opal: 3 },
        { coins: 15000, rainbonite: 1, topaz: 25 },
        { coins: 40000, rainbonite: 3, serendibite: 10 },
        { coins: 75000, rainbonite: 5, baryte: 15, azure: 5 },
        { coins: 100000, rainbonite: 10, baryte: 25, azure: 20 },
        { coins: 200000, rainbonite: 20, baryte: 50, mithril: 35, serendibite: 25 },
        { coins: 300000, rainbonite: 60, painite: 40, topaz: 60, dragonglass: 200 },
        { coins: 400000, rainbonite: 80, firecrystal: 30, dragonstone: 150, topaz: 80 },
        { coins: 500000, rainbonite: 100, topaz: 100, ruby: 100, emerald: 100, sapphire: 100, diamond: 100, amethyst: 100, newtonium: 75, promethium: 60, dragonstone: 500 },
        { coins: 750000, rainbonite: 250, topaz: 500, ruby: 500, emerald: 500, sapphire: 500, diamond: 500, amethyst: 500, newtonium: 250, promethium: 75, dragonstone: 500, corium: 60, yunium: 35, solarium: 50 },
        { coins: 1000000, frightstone: 500, antimatter: 125, darkmatter: 190, stellarite: 75, constellatium: 80, element_v: 1, unobtainium: 100 }
    ],
    "Research & Development": [
        { sapphire: 1 },
        { coins: 70, iron: 5, emerald: 1 },
        { coins: 1000, iron: 10, diamond: 1 },
        { coins: 5000, platinum: 1, unobtainium: 3 },
        { coins: 15000, serendibite: 1, unobtainium: 5 },
        { coins: 40000, baryte: 20, amethyst: 1, unobtainium: 15 },
        { coins: 100000, baryte: 40, azure: 1, unobtainium: 15 },
        { coins: 150000, azure: 5, rainbonite: 3, unobtainium: 20 },
        { coins: 200000, azure: 10, dragonglass: 100, unobtainium: 25 },
        { coins: 300000, azure: 50, garnet: 1, unobtainium: 40 },
        { coins: 400000, painite: 50, firecrystal: 40, dragonglass: 200, dragonstone: 300, unobtainium: 45 },
        { coins: 500000, newtonium: 100, dragonstone: 400, uranium: 50, plutonium: 75, unobtainium: 50 },
        { coins: 600000, newtonium: 120, dragonstone: 500, illuminunium: 20, promethium: 35, uranium: 80, plutonium: 100, unobtainium: 55 },
        { coins: 600000, newtonium: 280, dragonstone: 500, promethium: 35, yunium: 45, corium: 80, solarium: 50, unobtainium: 55 },
        { coins: 1000000, darkmatter: 150, frightstone: 500, antimatter: 100, constellatium: 75, element_v: 1, stellarite: 50, unobtainium: 100 }
    ],
    "Storage Management": [
        { silver: 3 },
        { coins: 100, silver: 25, ruby: 3 },
        { coins: 2000, silver: 70, sapphire: 10 },
        { coins: 5000, silver: 120, emerald: 15 },
        { coins: 12500, silver: 250, diamond: 20 },
        { coins: 20000, silver: 400, unobtainium: 5, uranium: 5 },
        { coins: 50000, silver: 550, unobtainium: 10, plutonium: 5 },
        { coins: 100000, silver: 700, unobtainium: 15, opal: 10 },
        { coins: 250000, silver: 900, unobtainium: 25, dragonglass: 25 },
        { coins: 500000, silver: 1500, unobtainium: 40, moonstone: 5 },
        { coins: 700000, unobtainium: 50, painite: 200, garnet: 1 },
        { coins: 900000, unobtainium: 60, painite: 300, dragonglass: 200 },
        { coins: 1115000, unobtainium: 65, firecrystal: 50, dragonglass: 300, dragonstone: 300 },
        { coins: 1350000, unobtainium: 70, dragonstone: 600, newtonium: 150, promethium: 80 },
        { coins: 1500000, unobtainium: 120, dragonstone: 700, newtonium: 750, promethium: 80, corium: 75, solarium: 35, yunium: 100 },
        { coins: 2000000, unobtainium: 125, constellatium: 80, stellarite: 100, antimatter: 200, darkmatter: 300, frightstone: 500, element_v: 1 }
    ],
    "Teleporter Array": [
        { coins: 25 }
    ],
    "Personal Tunnel": [
        { unobtainium: 300 }
    ]
}




  const oreTypes = ["Ambrosia", "Amethyst", "Antimatter", "Azure", "Baryte", "Boomite", "Coal", "Coins", "Constellatium", "Copper", "Corium", "Darkmatter", "Diamond", "Dragonglass", "Dragonstone", "Element V", "Emerald", "Firecrystal", "Frawstbyte", "Frightstone", "Frostarium", "Garnet", "Giftium", "Gingerbreadium", "Gold", "Illuminunium", "Iron", "Kappa", "Mithril", "Moonstone", "Newtonium", "Nightmarium", "Nihilium", "Noobite", "Opal", "Orichalcum", "Painite", "Peppermintium", "Platinum", "Plutonium", "Pumpkinite", "Promethium", "Rainbonite", "Redmatter", "Ruby", "Sapphire", "Serendibite", "Shadow Metal", "Silver", "Sinistyte E", "Sinistyte L", "Sinistyte M", "Sinistyte S", "Solarium", "Soulstone", "Stellarite", "Stone", "Sulfur", "Symmetrium", "Topaz", "Twitchite", "Unobtainium", "Uranium", "Valhalum", "Yunium"];
  
  const inventoryInputs = {
  coins: document.getElementById("coins-owned"),

  ambrosia: document.getElementById("ambrosia-owned"),
  amethyst: document.getElementById("amethyst-owned"),
  antimatter: document.getElementById("antimatter-owned"),
  azure: document.getElementById("azure-owned"),
  baryte: document.getElementById("baryte-owned"),
  boomite: document.getElementById("boomite-owned"),
  coal: document.getElementById("coal-owned"),
  constellatium: document.getElementById("constellatium-owned"),
  copper: document.getElementById("copper-owned"),
  corium: document.getElementById("corium-owned"),
  darkmatter: document.getElementById("darkmatter-owned"),
  diamond: document.getElementById("diamond-owned"),
  dragonglass: document.getElementById("dragonglass-owned"),
  dragonstone: document.getElementById("dragonstone-owned"),
  elementv: document.getElementById("elementv-owned"),
  emerald: document.getElementById("emerald-owned"),
  firecrystal: document.getElementById("firecrystal-owned"),
  frawstbyte: document.getElementById("frawstbyte-owned"),
  frightstone: document.getElementById("frightstone-owned"),
  frostarium: document.getElementById("frostarium-owned"),
  garnet: document.getElementById("garnet-owned"),
  giftium: document.getElementById("giftium-owned"),
  gingerbreadium: document.getElementById("gingerbreadium-owned"),
  gold: document.getElementById("gold-owned"),
  illuminunium: document.getElementById("illuminunium-owned"),
  iron: document.getElementById("iron-owned"),
  kappa: document.getElementById("kappa-owned"),
  mithril: document.getElementById("mithril-owned"),
  moonstone: document.getElementById("moonstone-owned"),
  newtonium: document.getElementById("newtonium-owned"),
  nightmarium: document.getElementById("nightmarium-owned"),
  nihilium: document.getElementById("nihilium-owned"),
  noobite: document.getElementById("noobite-owned"),
  opal: document.getElementById("opal-owned"),
  orichalcum: document.getElementById("orichalcum-owned"),
  painite: document.getElementById("painite-owned"),
  peppermintium: document.getElementById("peppermintium-owned"),
  platinum: document.getElementById("platinum-owned"),
  plutonium: document.getElementById("plutonium-owned"),
  pumpkinite: document.getElementById("pumpkinite-owned"),
  promethium: document.getElementById("promethium-owned"),
  rainbonite: document.getElementById("rainbonite-owned"),
  redmatter: document.getElementById("redmatter-owned"),
  ruby: document.getElementById("ruby-owned"),
  sapphire: document.getElementById("sapphire-owned"),
  serendibite: document.getElementById("serendibite-owned"),
  shadowmetal: document.getElementById("shadowmetal-owned"),
  silver: document.getElementById("silver-owned"),
  sinistytee: document.getElementById("sinistytee-owned"),
  sinistytel: document.getElementById("sinistytel-owned"),
  sinistytem: document.getElementById("sinistytem-owned"),
  sinistytes: document.getElementById("sinistytes-owned"),
  solarium: document.getElementById("solarium-owned"),
  soulstone: document.getElementById("soulstone-owned"),
  stellarite: document.getElementById("stellarite-owned"),
  stone: document.getElementById("stone-owned"),
  sulfur: document.getElementById("sulfur-owned"),
  symmetrium: document.getElementById("symmetrium-owned"),
  topaz: document.getElementById("topaz-owned"),
  twitchite: document.getElementById("twitchite-owned"),
  unobtainium: document.getElementById("unobtainium-owned"),
  uranium: document.getElementById("uranium-owned"),
  valhalum: document.getElementById("valhalum-owned"),
  yunium: document.getElementById("yunium-owned")
};
  
  
document.addEventListener("DOMContentLoaded", function () {
    initializeCharts();
});

function waitForCanvasAndInit() {
    const checkExist = setInterval(() => {
        const canvasExists = document.querySelector("#chartCanvas") !== null;
        if (canvasExists) {
            clearInterval(checkExist);
            initializeCharts();
        }
    }, 100);
}

function initializeCharts() {
    const ctx = document.getElementById("chartCanvas");
    if (!ctx) return console.error("Chart canvas elements are missing from the DOM.");

    const chartData = {
        labels: oreTypes,
        datasets: [{
            label: "Ore Costs",
            data: new Array(oreTypes.length).fill(0),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
        }]
    };

    window.myChart = new Chart(ctx.getContext("2d"), {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
        }
    });
}


function calculateUpgradeCost(upgradeType, level) {
    const upgradeLevels = upgradeData[upgradeType];
    if (!upgradeLevels || level >= upgradeLevels.length) {
        console.warn("Invalid upgrade level or missing data.");
        return {};
    }

    return upgradeLevels[level];
}

function updateChart(upgradeType, level) {
    if (!window.myChart) {
        console.error("Chart has not been initialized.");
        return;
    }

    const costData = calculateUpgradeCost(upgradeType, level);
    const updatedValues = oreTypes.map(ore => costData[ore.toLowerCase()] || 0);

    window.myChart.data.datasets[0].data = updatedValues;
    window.myChart.update();
}

document.getElementById("upgradeSelect").addEventListener("change", function () {
    const selectedUpgrade = this.value;
    const level = parseInt(document.getElementById("levelSelect").value, 10);
    updateChart(selectedUpgrade, level);
});

document.getElementById("levelSelect").addEventListener("change", function () {
    const selectedUpgrade = document.getElementById("upgradeSelect").value;
    const level = parseInt(this.value, 10);
    updateChart(selectedUpgrade, level);
});


waitForCanvasAndInit();
