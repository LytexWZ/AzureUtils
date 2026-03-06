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

  const stationImages = {
    miningOperation: "../src/Mining_Operation.png",
    dataAndAnalysis: "../src/Data_analysis.png",
    marketplace: "../src/Marketplace.png",
    researchAndDevelopment: "../src/Research_Development.png",
    storageManagement: "../src/Storage_management.png",
    teleporterArray: "../src/Teleporter_array.png",
    personalTunnel: "../src/Personal_tunnel.png"
  };

  const stationMaxLevels = {
    miningOperation: 27,
    dataAndAnalysis: 17,
    marketplace: 14,
    researchAndDevelopment: 15,
    storageManagement: 16,
    teleporterArray: 1,
    personalTunnel: 1
  };

  let stationLevels = {};
  Object.keys(stationMapping).forEach(id => {
    stationLevels[id] = 0;
  });

  window.stationLevels = stationLevels;

  let currentView = 'overview';
  let currentStation = null;
  
  const chartDataStore = {};
  
  const oreColorMap = {
    'Stone': '#9f9f9f',
    'Coal': '#333',
    'Sulfur': '#f0d166',
    'Opal': '#fce5f8',
    'Moonstone': '#d9e3e4',
    'Dragonstone': '#2b2635',
    'Copper': '#c27d5d',
    'Iron': '#aea49f',
    'Platinum': '#d3d2d2',
    'Gold': '#f8e85d',
    'Silver': '#e3e3e3',
    'Diamond': '#b3e5f7',
    'Amethyst': '#a86fe5',
    'Topaz': '#ffb85a',
    'Emerald': '#65d16e',
    'Ruby': '#de3e41',
    'Sapphire': '#1191db',
    'Nihilium': '#8846ED',
    'Garnet': '#721D1C',
    'Twitchite': '#8872c4',
    'Kappa': '#00dcbe',
    'Ambrosia': '#fc6',
    'Nightmarium': '#E60000',
    'Sinistyte E': '#FF73EF',
    'Sinistyte S': '#B7FFA5',
    'Sinistyte L': '#B85CFF',
    'Sinistyte M': '#FFDA99',
    'Pumpkinite': '#ff942f',
    'Frostarium': '#cbe9e3',
    'Giftium': '#DD1F19',
    'Frawstbyte': '#5ed5f2',
    'Gingerbreadium': '#ba7f61',
    'Peppermintium': '#da4732',
    'Noobite': '#56ab52',
    'Uranium': '#18ff14',
    'Plutonium': '#fe6a21',
    'Promethium': '#054A30',
    'Boomite': '#ff5a00',
    'Shadow Metal': '#32304e',
    'Illuminunium': '#63de21',
    'Serendibite': '#606060',
    'Baryte': '#5DA4F3',
    'Rainbonite': '#f9fb80',
    'Alexandrite': '#8B0FE8',
    'Tungsten': '#d7e0ba',
    'Azure': '#4927FF',
    'Orichalcum': '#c99956',
    'Mithril': '#6ddeff',
    'Painite': '#770000',
    'Nullstone': '#a62e3d',
    'Dragonglass': '#712ecb',
    'Firecrystal': '#ff8e00',
    'Symmetrium': '#6394ff',
    'Soulstone': '#d2f90f',
    'Corium': '#cf5000',
    'Newtonium': '#35ff00',
    'Solarium': '#fcd300',
    'Yunium': '#ffe577',
    'Redmatter': '#ff0000',
    'Antimatter': '#4476d2',
    'Darkmatter': '#3d3170',
    'Constellatium': '#c4b1cd',
    'Stellarite': '#41f0f7',
    'Frightstone': '#ce143b',
    'Valhalum': '#a0a0a0',
    'Mightstone': '#0442dc',
    'Element V': '#9d2fff',
    'Havium': '#c98222',
    'Titanium': '#899cc1',
    'Coins': '#fcd300',
    'Unobtainium': '#ff00ff'
  };

  function getOreColor(oreName) {
    return oreColorMap[oreName] || `hsl(${Math.random() * 360}, 70%, 55%)`;
  }

  function renderProgressBars(containerId, oreData, oreNames, total, scaleToTotal = false, unit = '') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (oreData.length === 0 || total === 0) {
      container.innerHTML = '<div class="empty-state">No data to display</div>';
      return;
    }
    
    // Scale to total for completion view (so bars match percentages), or to max for comparative views
    const scaleValue = scaleToTotal ? total : Math.max(...oreData);
    
    let html = '';
    oreData.forEach((value, index) => {
      const percentage = (value / scaleValue) * 100;
      const percentageOfTotal = ((value / total) * 100).toFixed(1);
      const color = getOreColor(oreNames[index]);
      
      html += `
        <div class="ore-progress-item">
          <div class="ore-progress-header">
            <span class="ore-progress-name" style="color: ${color};">${oreNames[index]}</span>
            <span class="ore-progress-value">
              ${value.toLocaleString()}${unit} 
              <span class="ore-progress-percent">(${percentageOfTotal}%)</span>
            </span>
          </div>
          <div class="ore-progress-bar-container">
            <div class="ore-progress-bar-fill" style="width: ${percentage}%; background: ${color};"></div>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }

  function generateVibrantColors(count) {
    const colors = [];
    const saturation = 70;
    const lightness = 55;
    
    for (let i = 0; i < count; i++) {
      const hue = (i * 360 / count) % 360;
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  }
  
  function getAngleFromPoint(centerX, centerY, x, y) {
    const dx = x - centerX;
    const dy = y - centerY;
    let angle = Math.atan2(dy, dx);
    angle = angle + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  }
  
  function isPointInDonut(centerX, centerY, x, y, innerRadius, outerRadius) {
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance >= innerRadius && distance <= outerRadius;
  }
  
  function setupChartHover(canvasId, tooltipId) {
    const canvas = document.getElementById(canvasId);
    const tooltip = document.getElementById(tooltipId);
    if (!canvas || !tooltip) return;
    
    const rect = canvas.getBoundingClientRect();
    
    canvas.addEventListener('mousemove', (e) => {
      const chartData = chartDataStore[canvasId];
      if (!chartData) return;
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const { segments, centerX, centerY } = chartData;
      
      const angle = getAngleFromPoint(centerX, centerY, x, y);
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Hover anims
      for (const segment of segments) {
        let startAngle = segment.startAngle;
        let endAngle = segment.endAngle;
        
        if (distance < segment.innerRadius || distance > segment.outerRadius) {
          continue;
        }
        
        // 0-2π range
        if (startAngle < 0) startAngle += 2 * Math.PI;
        if (endAngle < 0) endAngle += 2 * Math.PI;
        
        // Wraps
        if (startAngle > endAngle) {
          if (angle >= startAngle || angle <= endAngle) {
            showTooltip(tooltip, e.clientX, e.clientY, segment);
            canvas.style.cursor = 'pointer';
            return;
          }
        } else {
          if (angle >= startAngle && angle <= endAngle) {
            showTooltip(tooltip, e.clientX, e.clientY, segment);
            canvas.style.cursor = 'pointer';
            return;
          }
        }
      }
      
      tooltip.classList.add('hidden');
      canvas.style.cursor = 'default';
    });
    
    canvas.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
      canvas.style.cursor = 'default';
    });
  }
  
  function showTooltip(tooltip, x, y, segment) {
    tooltip.innerHTML = `
      <div class="tooltip-header" style="background: ${segment.color};">
        ${segment.name}
      </div>
      <div class="tooltip-body">
        <div class="tooltip-row">
          <span>Quantity:</span>
          <strong>${segment.value.toLocaleString()}</strong>
        </div>
        <div class="tooltip-row">
          <span>Percentage:</span>
          <strong>${segment.percentage}%</strong>
        </div>
      </div>
    `;
    tooltip.classList.remove('hidden');
    tooltip.style.left = (x + 15) + 'px';
    tooltip.style.top = (y + 15) + 'px';
  }

  function displayExcludedItems(containerId, excludedEntries) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (excludedEntries.length === 0) {
      container.innerHTML = '';
      return;
    }
    
    let html = '<div class="excluded-items-title">Excluded (for chart balance)</div>';
    excludedEntries.forEach(([name, qty]) => {
      html += `
        <div class="excluded-item">
          <span class="excluded-item-name">${name}</span>
          <span class="excluded-item-value">${qty.toLocaleString()}</span>
        </div>
      `;
    });
    container.innerHTML = html;
  }

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
    
    const remainingInventory = {};
    ores.forEach(ore => {
      remainingInventory[ore.id] = ore.owned;
    });
    
    const totalNeeded = {};
    for (let i = currentLevel; i < upgrades.length; i++) {
      const cost = upgrades[i];
      for (const resource in cost) {
        const required = cost[resource];
        const available = remainingInventory[resource] || 0;
        const used = Math.min(available, required);
        const stillNeeded = required - used;
        
        totalNeeded[resource] = (totalNeeded[resource] || 0) + stillNeeded;
        remainingInventory[resource] = available - used;
      }
    }
    return totalNeeded;
  }

  function getAllLevelsCost(stationId, currentLevel) {
    const key = stationMapping[stationId];
    const upgrades = upgradeData[key];
    if (!upgrades || currentLevel >= upgrades.length) {
      return [];
    }

    const remainingInventory = {};
    ores.forEach(ore => {
      remainingInventory[ore.id] = ore.owned;
    });

    const levels = [];
    for (let i = currentLevel; i < upgrades.length; i++) {
      const costData = upgrades[i];
      const netCost = {};
      
      for (const resource in costData) {
        const required = costData[resource];
        const available = remainingInventory[resource] || 0;
        const used = Math.min(available, required);
        netCost[resource] = required - used;
        remainingInventory[resource] = available - used;
      }
      
      levels.push({ level: i, cost: netCost });
    }
    return levels;
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
          html += `<div class="req-item-modern">
            <img src="${ore.icon}" alt="${ore.name}" title="${ore.name}" />
            <span class="req-qty">${quantity.toLocaleString()}</span>
            <span class="req-name">${ore.name}</span>
          </div>`;
        }
      }
    });
    return html || '<div class="empty-state">✓ All requirements met!</div>';
  }

  function calculateTotalGameRequirements() {
    const totalRequirements = {};
    
    for (const stationId in stationMapping) {
      const currentLevel = stationLevels[stationId];
      const key = stationMapping[stationId];
      const upgrades = upgradeData[key];
      
      if (upgrades) {
        for (let i = currentLevel; i < upgrades.length; i++) {
          const cost = upgrades[i];
          for (const resource in cost) {
            totalRequirements[resource] = (totalRequirements[resource] || 0) + cost[resource];
          }
        }
      }
    }
    
    return applyInventoryCost(totalRequirements);
  }

  function calculateGameProgress() {
    let totalCurrent = 0;
    let totalMax = 0;
    
    for (const stationId in stationMapping) {
      totalCurrent += stationLevels[stationId];
      totalMax += stationMaxLevels[stationId];
    }
    
    return totalMax ? Math.round((totalCurrent / totalMax) * 100) : 0;
  }

  function renderStationsProgressList() {
    // Progress list
    let stationsHTML = '';
    for (const stationId in stationMapping) {
      const name = stationMapping[stationId];
      const current = stationLevels[stationId];
      const max = stationMaxLevels[stationId];
      const percent = max > 0 ? Math.round((current / max) * 100) : 0;
      
      stationsHTML += `
        <div class="station-progress-item">
          <div class="station-progress-info">
            <span class="station-name">${name}</span>
            <span class="station-level-text">${current} / ${max}</span>
          </div>
          <div class="station-progress-bar">
            <div class="station-progress-fill" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    }
    document.getElementById('stations-progress-list').innerHTML = stationsHTML;
  }

  function renderOverviewView() {
    const progress = calculateGameProgress();
    const requirements = calculateTotalGameRequirements();
    
    const totalLevels = Object.values(stationMaxLevels).reduce((a, b) => a + b, 0);
    const currentLevels = Object.values(stationLevels).reduce((a, b) => a + b, 0);
    renderProgressBars(
      'progress-bars-completion',
      [currentLevels, totalLevels - currentLevels],
      ['Completed', 'Remaining'],
      totalLevels,
      true,
      ' levels'
    );
    document.getElementById('completion-percent').textContent = progress + '%';
    
    const oreEntries = Object.entries(requirements).filter(([_, qty]) => qty > 0);
    oreEntries.sort((a, b) => b[1] - a[1]); // Quantity DESCENSDING gng
    
    // Filter out Stone and Coins (The charts looked HORIBLE)
    const excludeItems = ['Stone', 'Coins'];
    const excludedEntries = [];
    const chartEntries = [];
    
    oreEntries.forEach(([oreId, qty]) => {
      const ore = ores.find(o => o.id === oreId);
      const oreName = ore ? ore.name : oreId;
      
      if (excludeItems.includes(oreName)) {
        excludedEntries.push([oreName, qty]);
      } else {
        chartEntries.push([oreId, oreName, qty]);
      }
    });
    
    const oreData = chartEntries.map(([_, __, qty]) => qty);
    const oreNames = chartEntries.map(([_, oreName, __]) => oreName);
    const oreTotal = oreData.reduce((a, b) => a + b, 0);
    
    renderProgressBars('progress-bars-ores', oreData, oreNames, oreTotal);
    displayExcludedItems('excluded-ores', excludedEntries);
    renderStationsProgressList();
    document.getElementById('overview-requirements').innerHTML = renderResourceList(requirements);
  }

  function renderInventoryView() {
    // Syncs, we are now google baby
    if (typeof window.syncToProgressTracker === 'function') {
      window.syncToProgressTracker();
    }
    
    // Renders
    let inventoryHTML = '';
    ores.forEach(ore => {
      inventoryHTML += `
        <div class="ore-input-modern">
          <img src="${ore.icon}" alt="${ore.name}" />
          <label>${ore.name}</label>
          <input type="number" id="${ore.id}-owned" value="${ore.owned}" min="0" />
        </div>
      `;
    });
    document.getElementById('inventory-grid').innerHTML = inventoryHTML;
    
    ores.forEach(ore => {
      const input = document.getElementById(`${ore.id}-owned`);
      if (input) {
        input.addEventListener('change', () => {
          ore.owned = Number(input.value) || 0;
          updateAllViews();
          if (typeof window.saveToLocalStorage === 'function') {
            window.saveToLocalStorage();
          }
          if (typeof window.syncFromProgressTracker === 'function') {
            window.syncFromProgressTracker();
          }
        });
      }
    });
    
    // Calculations
    const ownedOres = ores.filter(ore => ore.owned > 0);
    const ownedTypes = ownedOres.length;
    const totalValue = ores.reduce((sum, ore) => sum + ore.owned, 0);
    const mostValuable = ores.reduce((max, ore) => ore.owned > (max?.owned || 0) ? ore : max, null);
    
    document.getElementById('owned-types').textContent = ownedTypes;
    document.getElementById('total-value').textContent = totalValue.toLocaleString();
    document.getElementById('most-valuable').textContent = mostValuable && mostValuable.owned > 0 ? mostValuable.name : '-';
    
    const excludeItems = ['Stone', 'Coins'];
    const excludedInventory = [];
    const chartOwnedOres = [];
    
    ownedOres.forEach(ore => {
      if (excludeItems.includes(ore.name)) {
        excludedInventory.push([ore.name, ore.owned]);
      } else {
        chartOwnedOres.push(ore);
      }
    });
    
    const ownedData = chartOwnedOres.map(ore => ore.owned);
    const ownedNames = chartOwnedOres.map(ore => ore.name);
    const inventoryTotal = ownedData.reduce((a, b) => a + b, 0);
    
    renderProgressBars('progress-bars-inventory', ownedData, ownedNames, inventoryTotal);
    displayExcludedItems('excluded-inventory', excludedInventory);
  }

  function renderStationsView() {
    const container = document.getElementById('stations-overview-grid');
    if (!container) return;
    
    let html = '';
    
    for (const stationId in stationMapping) {
      const name = stationMapping[stationId];
      const currentLevel = stationLevels[stationId];
      const maxLevel = stationMaxLevels[stationId];
      const imageSrc = stationImages[stationId];
      const percent = maxLevel > 0 ? Math.round((currentLevel / maxLevel) * 100) : 0;
      const isMaxed = currentLevel >= maxLevel;
      const remainingLevels = maxLevel - currentLevel;
      
      const key = stationMapping[stationId];
      const upgrades = upgradeData[key];
      let totalCoins = 0;
      let nextLevelCoins = 0;
      let uniqueOres = new Set();
      
      if (upgrades) {
        for (let i = currentLevel; i < upgrades.length; i++) {
          const cost = upgrades[i];
          for (const resource in cost) {
            if (resource === 'coins') {
              totalCoins += cost[resource];
              if (i === currentLevel) {
                nextLevelCoins = cost[resource];
              }
            }
            uniqueOres.add(resource);
          }
        }
      }
      
      const badgeHTML = isMaxed ? '<div class="station-card-badge maxed">✓ MAXED</div>' : '';
      
      html += `
        <div class="station-card-overview" onclick="switchView('station', '${stationId}')">
          ${badgeHTML}
          <div class="station-card-header">
            <div class="station-card-image">
              <img src="${imageSrc}" alt="${name}" />
            </div>
            <div class="station-card-info">
              <h3>${name}</h3>
              <div class="station-card-level">
                Level <span class="station-card-level-number">${currentLevel}</span> / ${maxLevel}
              </div>
            </div>
          </div>
          <div class="station-card-body">
            <div class="station-progress-bar-wrapper">
              <div class="station-progress-label">
                <span>Progress</span>
                <span class="station-progress-percent">${percent}%</span>
              </div>
              <div class="station-progress-track">
                <div class="station-progress-bar-fill" style="width: ${percent}%"></div>
              </div>
            </div>
            <div class="station-card-stats">
              <div class="station-stat-item">
                <span class="station-stat-value">${remainingLevels}</span>
                <span class="station-stat-label">Levels Left</span>
              </div>
              <div class="station-stat-item">
                <span class="station-stat-value">${uniqueOres.size}</span>
                <span class="station-stat-label">Ore Types</span>
              </div>
              <div class="station-stat-item">
                <span class="station-stat-value">${isMaxed ? '—' : totalCoins.toLocaleString()}</span>
                <span class="station-stat-label">Total Coins</span>
              </div>
              <div class="station-stat-item">
                <span class="station-stat-value">${isMaxed ? '—' : nextLevelCoins.toLocaleString()}</span>
                <span class="station-stat-label">Next Level</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    container.innerHTML = html;
  }

  function renderStationView(stationId) {
    currentStation = stationId;
    const name = stationMapping[stationId];
    const currentLevel = stationLevels[stationId];
    const maxLevel = stationMaxLevels[stationId];
    const imageSrc = stationImages[stationId];
    
    document.getElementById('station-title').textContent = name;
    document.getElementById('station-description').textContent = `Manage and track ${name} progress`;
    document.getElementById('station-img').src = imageSrc;
    document.getElementById('station-current-level').textContent = currentLevel;
    document.getElementById('station-max-level').textContent = maxLevel;
    
    const slider = document.getElementById('station-slider');
    slider.min = 0;
    slider.max = maxLevel;
    slider.value = currentLevel;
    
    updateStationViewContent(stationId, false);
  }

  function updateAllViews(skipSlider = false) {
    const progress = calculateGameProgress();
    const sidebarProgress = document.getElementById('sidebar-progress');
    if (sidebarProgress) {
      sidebarProgress.textContent = progress + '%';
    }
    
    if (currentView === 'overview') {
      renderOverviewView();
    } else if (currentView === 'inventory') {
      renderInventoryView();
    } else if (currentView === 'stations') {
      renderStationsView();
    } else if (currentView === 'station' && currentStation) {
      updateStationViewContent(currentStation, skipSlider);
    }
  }

  function updateStationViewContent(stationId, skipSlider = false) {
    const currentLevel = stationLevels[stationId];
    const maxLevel = stationMaxLevels[stationId];
    
    document.getElementById('station-current-level').textContent = currentLevel;
    
    if (!skipSlider) {
      const slider = document.getElementById('station-slider');
      slider.value = currentLevel;
    }
    
    const nextCost = applyInventoryCost(getNextUpgradeCost(stationId, currentLevel) || {});
    const maxCost = getMaxOutCost(stationId, currentLevel) || {};
    const allLevels = getAllLevelsCost(stationId, currentLevel);
    
    document.getElementById('station-req-next').innerHTML = renderResourceList(nextCost);
    document.getElementById('station-req-max').innerHTML = renderResourceList(maxCost);
    
    let allLevelsHTML = '';
    if (allLevels.length === 0) {
      allLevelsHTML = '<div class="empty-state">✅ Station maxed out!</div>';
    } else {
      allLevels.forEach(levelData => {
        const entries = Object.entries(levelData.cost).filter(([_, qty]) => qty > 0);
        if (entries.length > 0) {
          allLevelsHTML += `
            <div class="level-requirement-modern">
              <h4>Level ${levelData.level} → ${levelData.level + 1}</h4>
              <div class="level-req-list-modern">
                ${entries.map(([resource, quantity]) => {
                  const ore = ores.find(o => o.id === resource);
                  return ore ? `<div class="req-item-modern">
                    <img src="${ore.icon}" alt="${ore.name}" />
                    <span class="req-qty">${quantity.toLocaleString()}</span>
                  </div>` : '';
                }).join('')}
              </div>
            </div>
          `;
        } else {
          allLevelsHTML += `
            <div class="level-requirement-modern">
              <h4>Level ${levelData.level} → ${levelData.level + 1}</h4>
              <div class="empty-state">✓ Resources available</div>
            </div>
          `;
        }
      });
    }
    document.getElementById('station-req-all').innerHTML = allLevelsHTML;
    
    const oreCosts = {};
    const key = stationMapping[stationId];
    const upgrades = upgradeData[key];
    if (upgrades) {
      for (let i = currentLevel; i < upgrades.length; i++) {
        const cost = upgrades[i];
        for (const resource in cost) {
          oreCosts[resource] = (oreCosts[resource] || 0) + cost[resource];
        }
      }
    }
    
    const oreEntries = Object.entries(oreCosts).filter(([_, qty]) => qty > 0);
    oreEntries.sort((a, b) => b[1] - a[1]);
    
    const excludeItems = ['Stone', 'Coins'];
    const excludedStationOres = [];
    const chartStationEntries = [];
    
    oreEntries.forEach(([oreId, qty]) => {
      const ore = ores.find(o => o.id === oreId);
      const oreName = ore ? ore.name : oreId;
      
      if (excludeItems.includes(oreName)) {
        excludedStationOres.push([oreName, qty]);
      } else {
        chartStationEntries.push([oreId, oreName, qty]);
      }
    });
    
    const oreData = chartStationEntries.map(([_, __, qty]) => qty);
    const oreNames = chartStationEntries.map(([_, oreName, __]) => oreName);
    const oreTotal = oreData.reduce((a, b) => a + b, 0);
    
    renderProgressBars('progress-bars-station', oreData, oreNames, oreTotal);
    displayExcludedItems('excluded-station-ores', excludedStationOres);
  }

  function switchView(view, stationId = null) {
    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    const sidebarTitle = document.getElementById('sidebar-title');
    if (sidebarTitle && sidebarTitle.textContent !== 'Progress Panel') {
      sidebarTitle.textContent = 'Progress Panel';
    }
    
    if (view === 'overview') {
      document.getElementById('view-overview').classList.add('active');
      document.querySelector('[data-view="overview"]')?.classList.add('active');
      currentView = 'overview';
      renderOverviewView();
    } else if (view === 'inventory') {
      document.getElementById('view-inventory').classList.add('active');
      document.querySelector('[data-view="inventory"]')?.classList.add('active');
      currentView = 'inventory';
      renderInventoryView();
    } else if (view === 'stations') {
      document.getElementById('view-stations').classList.add('active');
      document.querySelector('[data-view="stations"]')?.classList.add('active');
      currentView = 'stations';
      renderStationsView();
    } else if (view === 'settings') {
      document.getElementById('view-settings').classList.add('active');
      document.querySelector('[data-view="settings"]')?.classList.add('active');
      currentView = 'settings';
    } else if (view === 'station' && stationId) {
      document.getElementById('view-station').classList.add('active');
      document.querySelector(`[data-station="${stationId}"]`)?.classList.add('active');
      currentView = 'station';
      renderStationView(stationId);
    }
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      const stationId = item.getAttribute('data-station');
      switchView(view, stationId);
    });
  });

  document.getElementById('station-slider').addEventListener('input', (e) => {
    if (currentStation) {
      const newLevel = Number(e.target.value);
      stationLevels[currentStation] = newLevel;
      document.getElementById('station-current-level').textContent = newLevel;
      updateStationViewContent(currentStation, true);

      const progress = calculateGameProgress();
      const sidebarProgress = document.getElementById('sidebar-progress');

      if (sidebarProgress) {
        sidebarProgress.textContent = progress + '%';
      }
    }
  });

  document.getElementById('station-slider').addEventListener('change', (e) => {
    if (currentStation) {
      renderStationsProgressList();

      const progress = calculateGameProgress();
      const sidebarProgress = document.getElementById('sidebar-progress');

      if (sidebarProgress) {
        sidebarProgress.textContent = progress + '%';
      }

      const stationsGrid = document.getElementById('stations-overview-grid');

      if (stationsGrid && stationsGrid.innerHTML) {
        renderStationsView();
      }

      if (typeof window.saveToLocalStorage === 'function') {
        window.saveToLocalStorage();
      }
    }
  });

  document.querySelectorAll('.tab-btn-modern').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      const container = btn.closest('.station-requirements-card');
      
      container.querySelectorAll('.tab-btn-modern').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      container.querySelectorAll('.req-section-modern').forEach(section => {
        section.classList.remove('active');
        if (section.getAttribute('data-tab-content') === tab) {
          section.classList.add('active');
        }
      });
    });
  });

  window.switchView = switchView;

  switchView('overview');
});
