document.addEventListener('DOMContentLoaded', () => {
    const stationMapping = {
      miningOperation: "Mining Operation",
      dataAndAnalysis: "Data & Analysis",
      marketplace: "Marketplace",
      researchAndDevelopment: "Research & Development",
      storageManagement: "Storage Management",
      teleporterArray: "Teleporter Array",
      personalTunnel: "Personal Tunnel"
    };
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
  
