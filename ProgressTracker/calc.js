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
      document.querySelectorAll('.station-card').forEach(card => updateStationRequirements(card));
      updateCompleteGameRequirements();
  }

  const toggleInventoryBtn = document.getElementById('toggle-inventory');
  const inventorySection = document.getElementById('inventory-section');

  toggleInventoryBtn.addEventListener('click', () => {
    inventorySection.classList.toggle('hidden');
    toggleInventoryBtn.textContent = inventorySection.classList.contains('hidden')
      ? 'Show Inventory'
      : 'Hide Inventory';
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

  function renderResourceList(costData) {
    const entries = Object.entries(costData);
    entries.sort((a, b) => b[1] - a[1]);
  
    let html = '';
    entries.forEach(([resource, quantity]) => {
      if (quantity > 0) {
        const ore = ores.find(o => o.id === resource);
        if (ore) {
          html += `<div class="req-item">
            <img src="${ore.icon}" alt="${ore.name}" title="${ore.name}" />
            <span>${quantity}</span>
          </div>`;
        } else {
          html += `<div class="req-item">
            <span>${resource}: ${quantity}</span>
          </div>`;
        }
      }
    });
    return html || '<p>All requirements met!</p>';
  }
  
  function updateStationRequirements(stationCard) {
    const stationId = stationCard.getAttribute('data-station');
    const slider = stationCard.querySelector('.station-slider');
    const currentLevel = Number(slider.value);
    const nextCostRaw = getNextUpgradeCost(stationId, currentLevel) || {};
    const maxCostRaw = getMaxOutCost(stationId, currentLevel) || {};
    const nextCost = applyInventoryCost(nextCostRaw);
    const maxCost = applyInventoryCost(maxCostRaw);

    const reqLists = stationCard.querySelectorAll('.req-list');
    reqLists.forEach(list => {
      const type = list.getAttribute('data-type');
      if (type === 'next') {
        list.innerHTML = renderResourceList(nextCost);
      } else if (type === 'max') {
        list.innerHTML = renderResourceList(maxCost);
      }
    });
  }

  function updateCompleteGameRequirements() {
    const totalRequirements = {};
    for (const stationId in stationMapping) {
      const stationCard = document.querySelector(`.station-card[data-station="${stationId}"]`);
      if (stationCard) {
        const slider = stationCard.querySelector('.station-slider');
        const currentLevel = Number(slider.value);
        const rawCost = getMaxOutCost(stationId, currentLevel) || {};
        for (const resource in rawCost) {
          totalRequirements[resource] = (totalRequirements[resource] || 0) + rawCost[resource];
        }
      }
    }
    const netTotalRequirements = applyInventoryCost(totalRequirements);
    const container = document.getElementById('complete-game-requirements');
    container.innerHTML = renderResourceList(netTotalRequirements);
  }
  

  function updateProgressBar() {
    const stationCards = document.querySelectorAll('.station-card');
    let totalCurrent = 0;
    let totalMax = 0;
    stationCards.forEach(card => {
      const slider = card.querySelector('.station-slider');
      totalCurrent += Number(slider.value);
      totalMax += Number(slider.max);
    });
    const percentage = totalMax ? Math.round((totalCurrent / totalMax) * 100) : 0;
    document.getElementById('game-progress').value = percentage;
    document.getElementById('progress-percentage').textContent = percentage + '%';
  }

  function updateStationLevel(e) {
    const slider = e.target;
    const stationCard = slider.closest('.station-card');
    const levelSpan = stationCard.querySelector('.station-level');
    levelSpan.textContent = Number(slider.value);
    updateStationRequirements(stationCard);
    updateCompleteGameRequirements();
    updateProgressBar();
  }

  function attachToggleListeners() {
    const toggleBtns = document.querySelectorAll('.toggle-requirements');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const reqContainer = btn.nextElementSibling;
        reqContainer.classList.toggle('hidden');
      });
    });
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
  attachToggleListeners();
  attachEventListeners();
  document.querySelectorAll('.station-card').forEach(card => updateStationRequirements(card));
  updateCompleteGameRequirements();
  updateProgressBar();
});
