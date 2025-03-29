document.addEventListener('DOMContentLoaded', () => {
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
    };
  
    const stationMapping = {
      miningOperation: "Mining Operation",
      dataAndAnalysis: "Data & Analysis",
      marketplace: "Marketplace",
      researchAndDevelopment: "Research & Development",
      storageManagement: "Storage Management",
      teleporterArray: "Teleporter Array",
      personalTunnel: "Personal Tunnel"
    };
  
    const ores = [
      { id: 'ambrosia', name: 'Ambrosia', icon: './src/Ambrosia.png', owned: 0 },
      { id: 'amethyst', name: 'Amethyst', icon: './src/Amethyst.png', owned: 0 },
      { id: 'antimatter', name: 'Antimatter', icon: './src/Antimatter.png', owned: 0 },
      { id: 'azure', name: 'Azure', icon: './src/Azure.png', owned: 0 },
      { id: 'baryte', name: 'Baryte', icon: './src/Baryte.png', owned: 0 },
      { id: 'boomite', name: 'Boomite', icon: './src/Boomite.png', owned: 0 },
      { id: 'coal', name: 'Coal', icon: './src/Coal.png', owned: 0 },
      { id: 'coins', name: 'Coins', icon: './src/Coin.png', owned: 0 },
      { id: 'constellatium', name: 'Constellatium', icon: './src/Constellatium.png', owned: 0 },
      { id: 'copper', name: 'Copper', icon: './src/Copper.png', owned: 0 },
      { id: 'corium', name: 'Corium', icon: './src/Corium.png', owned: 0 },
      { id: 'darkmatter', name: 'Darkmatter', icon: './src/Darkmatter.png', owned: 0 },
      { id: 'diamond', name: 'Diamond', icon: './src/Diamond.png', owned: 0 },
      { id: 'dragonglass', name: 'Dragonglass', icon: './src/Dragonglass.png', owned: 0 },
      { id: 'dragonstone', name: 'Dragonstone', icon: './src/Dragonstone.png', owned: 0 },
      { id: 'elementv', name: 'Element V', icon: './src/ElementV.png', owned: 0 },
      { id: 'emerald', name: 'Emerald', icon: './src/Emerald.png', owned: 0 },
      { id: 'firecrystal', name: 'Firecrystal', icon: './src/Firecrystal.png', owned: 0 },
      { id: 'frawstbyte', name: 'Frawstbyte', icon: './src/Frawstbyte.png', owned: 0 },
      { id: 'frightstone', name: 'Frightstone', icon: './src/Frightstone.png', owned: 0 },
      { id: 'frostarium', name: 'Frostarium', icon: './src/Frostarium.png', owned: 0 },
      { id: 'garnet', name: 'Garnet', icon: './src/Garnet.png', owned: 0 },
      { id: 'giftium', name: 'Giftium', icon: './src/Giftium.png', owned: 0 },
      { id: 'gingerbreadium', name: 'Gingerbreadium', icon: './src/Gingerbreadium.png', owned: 0 },
      { id: 'gold', name: 'Gold', icon: './src/Gold.png', owned: 0 },
      { id: 'illuminunium', name: 'Illuminunium', icon: './src/Illuminunium.png', owned: 0 },
      { id: 'iron', name: 'Iron', icon: './src/Iron.png', owned: 0 },
      { id: 'kappa', name: 'Kappa', icon: './src/Kappa.png', owned: 0 },
      { id: 'mithril', name: 'Mithril', icon: './src/Mithril.png', owned: 0 },
      { id: 'moonstone', name: 'Moonstone', icon: './src/Moonstone.png', owned: 0 },
      { id: 'newtonium', name: 'Newtonium', icon: './src/Newtonium.png', owned: 0 },
      { id: 'nightmarium', name: 'Nightmarium', icon: './src/Nightmarium.png', owned: 0 },
      { id: 'nihilium', name: 'Nihilium', icon: './src/Nihilium.png', owned: 0 },
      { id: 'noobite', name: 'Noobite', icon: './src/Noobite.png', owned: 0 },
      { id: 'opal', name: 'Opal', icon: './src/Opal.png', owned: 0 },
      { id: 'orichalcum', name: 'Orichalcum', icon: './src/Orichalcum.png', owned: 0 },
      { id: 'painite', name: 'Painite', icon: './src/Painite.png', owned: 0 },
      { id: 'peppermintium', name: 'Peppermintium', icon: './src/Peppermintium.png', owned: 0 },
      { id: 'platinum', name: 'Platinum', icon: './src/Platinum.png', owned: 0 },
      { id: 'plutonium', name: 'Plutonium', icon: './src/Plutonium.png', owned: 0 },
      { id: 'pumpkinite', name: 'Pumpkinite', icon: './src/Pumpkinite.png', owned: 0 },
      { id: 'promethium', name: 'Promethium', icon: './src/Promethium.png', owned: 0 },
      { id: 'rainbonite', name: 'Rainbonite', icon: './src/Rainbonite.png', owned: 0 },
      { id: 'redmatter', name: 'Redmatter', icon: './src/Redmatter.png', owned: 0 },
      { id: 'ruby', name: 'Ruby', icon: './src/Ruby.png', owned: 0 },
      { id: 'sapphire', name: 'Sapphire', icon: './src/Sapphire.png', owned: 0 },
      { id: 'serendibite', name: 'Serendibite', icon: './src/Serendibite.png', owned: 0 },
      { id: 'shadowmetal', name: 'Shadow Metal', icon: './src/Shadowmetal.png', owned: 0 },
      { id: 'silver', name: 'Silver', icon: './src/Silver.png', owned: 0 },
      { id: 'sinistytee', name: 'Sinistyte E', icon: './src/Sinistytee.png', owned: 0 },
      { id: 'sinistytel', name: 'Sinistyte L', icon: './src/Sinistytel.png', owned: 0 },
      { id: 'sinistytem', name: 'Sinistyte M', icon: './src/Sinistytem.png', owned: 0 },
      { id: 'sinistytes', name: 'Sinistyte S', icon: './src/Sinistytes.png', owned: 0 },
      { id: 'solarium', name: 'Solarium', icon: './src/Solarium.png', owned: 0 },
      { id: 'soulstone', name: 'Soulstone', icon: './src/Soulstone.png', owned: 0 },
      { id: 'stellarite', name: 'Stellarite', icon: './src/Stellarite.png', owned: 0 },
      { id: 'stone', name: 'Stone', icon: './src/Stone.png', owned: 0 },
      { id: 'sulfur', name: 'Sulfur', icon: './src/Sulfur.png', owned: 0 },
      { id: 'symmetrium', name: 'Symmetrium', icon: './src/Symmetrium.png', owned: 0 },
      { id: 'topaz', name: 'Topaz', icon: './src/Topaz.png', owned: 0 },
      { id: 'twitchite', name: 'Twitchite', icon: './src/Twitchite.png', owned: 0 },
      { id: 'unobtainium', name: 'Unobtainium', icon: './src/Unobtainium.png', owned: 0 },
      { id: 'uranium', name: 'Uranium', icon: './src/Uranium.png', owned: 0 },
      { id: 'valhalum', name: 'Valhalum', icon: './src/Valhalum.png', owned: 0 },
      { id: 'yunium', name: 'Yunium', icon: './src/Yunium.png', owned: 0 }
    ];

    
    const charts = {};
    
    function generateOreInputs() {
      const inventoryContainer = document.querySelector('.inventory-container');
      if (!inventoryContainer) return;
      inventoryContainer.innerHTML = '';
      ores.forEach(ore => {
        const oreDiv = document.createElement('div');
        oreDiv.className = 'ore-input';
        oreDiv.innerHTML = `
          <img src="${ore.icon}" alt="${ore.name}" />
          <label for="${ore.id}-owned">${ore.name}:</label>
          <input type="number" id="${ore.id}-owned" value="${ore.owned}" />
        `;
        inventoryContainer.appendChild(oreDiv);
      });
    }
    
    function updateOwnedOres() {
      ores.forEach(ore => {
        const input = document.getElementById(`${ore.id}-owned`);
        if (input) {
          ore.owned = Number(input.value);
        }
      });
      calculateAndDisplayResults();
    }
    
    const toggleBtn = document.getElementById('toggle-inventory');
    const inventorySection = document.getElementById('inventory-section');
            
    toggleBtn.addEventListener('click', () => {
        inventorySection.classList.toggle('hidden');
              
        if (inventorySection.classList.contains('hidden')) {
          toggleBtn.textContent = 'Show Inventory';
        } else {
          toggleBtn.textContent = 'Hide Inventory';
        }
    });
    
    function getNextUpgradeCost(stationId, currentLevel) {
        const key = stationMapping[stationId];
        const upgrades = upgradeData[key];
        if (!upgrades) return null;
        return upgrades[currentLevel] || null;
    }
  
    function getMaxOutCost(stationId, currentLevel) {
      const key = stationMapping[stationId];
      const upgrades = upgradeData[key];
      if (!upgrades) return null;
      const totalCost = {};
      for (let i = currentLevel; i < upgrades.length; i++) {
        const cost = upgrades[i];
        for (const resource in cost) {
          totalCost[resource] = (totalCost[resource] || 0) + cost[resource];
        }
      }
      return totalCost;
    }
    
    function getOwnedAmount(resourceId) {
      const ore = ores.find(o => o.id === resourceId);
      return ore ? ore.owned : 0;
    }
    
    function applyInventoryCost(costData) {
      const netCost = {};
      for (const resource in costData) {
        const required = costData[resource];
        const owned = getOwnedAmount(resource);
        netCost[resource] = Math.max(0, required - owned);
      }
      return netCost;
    }
    
    function updateChart(stationId, type, costData) {
      const canvasId = `chart-${stationId}-${type}`;
      const ctx = document.getElementById(canvasId);
      if (!ctx) return;
    
      let coinCost = costData.coins;

      const filteredCost = { ...costData };
      delete filteredCost.coins;

      const labels = Object.keys(filteredCost);
      const data = labels.map(key => filteredCost[key]);
    
      const chartConfig = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cost',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: type === 'next' ? 'Next Upgrade Cost' : 'Max Out Cost'
            }
          }
        }
      };
    
      if (charts[canvasId]) {
        charts[canvasId].data = chartConfig.data;
        charts[canvasId].options = chartConfig.options;
        charts[canvasId].update();
      } else {
        charts[canvasId] = new Chart(ctx, chartConfig);
      }

    
      const chartContainer = ctx.parentElement;
      let coinInfo = chartContainer.querySelector('.coin-info');
      if (!coinInfo) {
        coinInfo = document.createElement('div');
        coinInfo.className = 'coin-info';
        chartContainer.appendChild(coinInfo);
      }
      if (coinCost !== undefined) {
        coinInfo.textContent = `Coins needed: ${coinCost}`;
      } else {
        coinInfo.textContent = 'No coin cost';
      }
    }
    
    function setStationSliderMaxes() {
      const stationCards = document.querySelectorAll('.station-card');
      stationCards.forEach(card => {
        const stationId = card.getAttribute('data-station');
        const key = stationMapping[stationId];
        const upgrades = upgradeData[key];
        const slider = card.querySelector('.station-slider');
        if (slider && upgrades) {
          slider.max = upgrades.length;
        }
      });
    }
    
    function updateStationLevel(e) {
        const slider = e.target;
        const stationCard = slider.closest('.station-card');
        const stationId = stationCard.getAttribute('data-station');
        const levelSpan = stationCard.querySelector('.station-level');
        const chartContainer = stationCard.querySelector('.chart-container');
        let maxLevelText = stationCard.querySelector('.max-level-text');
        const newLevel = Number(slider.value);
      
        if (levelSpan) levelSpan.textContent = newLevel;
      
        if (!maxLevelText) {
          maxLevelText = document.createElement('div');
          maxLevelText.className = 'max-level-text';
          maxLevelText.textContent = 'Max Level Reached';
          chartContainer.parentElement.appendChild(maxLevelText);
        }
      
        if (newLevel >= slider.max) {
          chartContainer.style.display = 'none';
          maxLevelText.style.display = 'block';
        } else {
          chartContainer.style.display = 'block';
          maxLevelText.style.display = 'none';
        }
      
        calculateAndDisplayResults();
    }

    
    function calculateAndDisplayResults() {
      for (const stationId in stationMapping) {
        const stationCard = document.querySelector(`.station-card[data-station="${stationId}"]`);
        if (stationCard) {
          const slider = stationCard.querySelector('.station-slider');
          const currentLevel = Number(slider.value);
          const rawNextCost = getNextUpgradeCost(stationId, currentLevel) || {};
          const rawMaxCost = getMaxOutCost(stationId, currentLevel) || {};
    
          const nextCost = applyInventoryCost(rawNextCost);
          const maxCost = applyInventoryCost(rawMaxCost);
    
          updateChart(stationId, 'next', nextCost);
          updateChart(stationId, 'max', maxCost);
        }
      }
    }
    
    function attachEventListeners() {
      ores.forEach(ore => {
        const input = document.getElementById(`${ore.id}-owned`);
        if (input) {
          input.addEventListener('input', updateOwnedOres);
        }
      });
      const stationSliders = document.querySelectorAll('.station-slider');
      stationSliders.forEach(slider => {
        slider.addEventListener('input', updateStationLevel);
      });
    }
      
    generateOreInputs();
    setStationSliderMaxes();
    attachEventListeners();
    calculateAndDisplayResults();
  });
  
