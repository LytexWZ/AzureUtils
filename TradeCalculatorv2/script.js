class AzureMinesCalculator {
  constructor() {
    this.inputOres = [];
    this.outputOres = [];
    this.recentOres = this.loadRecentOres();
    this.isModalOpen = false;
    this.currentModalType = 'input';
    this.isDragging = false;
    this.lastUserAction = 0;
    this.userActionDelay = 500;
    this.sortMode = 'alphabetical';

    this.initializeElements();
    this.setupEventListeners();
    this.updateUI();
  }

  initializeElements() {
    this.inputOresContainer = document.getElementById('inputOres');
    this.outputOresContainer = document.getElementById('outputOres');
    this.totalAVElement = document.getElementById('totalAV');
    this.totalGainElement = document.getElementById('totalGain');

    this.modal = document.getElementById('oreModal');
    this.saveLoadModal = document.getElementById('saveLoadModal');
    this.oreGrid = document.getElementById('oreGrid');
    this.recentGrid = document.getElementById('recentGrid');
    this.searchInput = document.getElementById('oreSearch');
    this.sortSelect = document.getElementById('sortSelect');

    this.addInputOreBtn = document.getElementById('addInputOre');
    this.addOutputOreBtn = document.getElementById('addOutputOre');
    this.clearAllBtn = document.getElementById('clearAll');
    this.closeModalBtn = document.getElementById('closeModal');
    this.closeSaveLoadModalBtn = document.getElementById('closeSaveLoadModal');

    this.saveBtn = document.getElementById('saveConfig');
    this.loadBtn = document.getElementById('loadConfig');
    this.configName = document.getElementById('configName');
    this.saveConfigBtn = document.getElementById('saveConfigBtn');
    this.configList = document.getElementById('configList');

    this.roundNumbersToggle = document.getElementById('roundNumbers');
    this.fairModeToggle = document.getElementById('fairMode');
  }

  setupEventListeners() {
    this.addInputOreBtn.addEventListener('click', () =>
      this.openModal('input')
    );
    this.addOutputOreBtn.addEventListener('click', () =>
      this.openModal('output')
    );
    this.clearAllBtn.addEventListener('click', () => this.clearAll());
    this.closeModalBtn.addEventListener('click', () => this.closeModal());
    this.closeSaveLoadModalBtn.addEventListener('click', () =>
      this.closeSaveLoadModal()
    );

    this.saveBtn.addEventListener('click', () =>
      this.openSaveLoadModal('save')
    );
    this.loadBtn.addEventListener('click', () =>
      this.openSaveLoadModal('load')
    );
    this.saveConfigBtn.addEventListener('click', () =>
      this.saveConfiguration()
    );

    this.searchInput.addEventListener('input', (e) =>
      this.filterOres(e.target.value)
    );
    this.sortSelect.addEventListener('change', (e) => {
      this.sortMode = e.target.value;
      this.filterOres(this.searchInput.value);
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    this.saveLoadModal.addEventListener('click', (e) => {
      if (e.target === this.saveLoadModal) this.closeSaveLoadModal();
    });

    this.roundNumbersToggle.addEventListener('change', () => this.updateUI());
    this.fairModeToggle.addEventListener('change', () => this.updateUI());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeSaveLoadModal();
      }
    });
  }

  calculateTotalInputAV() {
    return this.inputOres.reduce((total, ore) => {
      if (!ore.data || ore.data.AV <= 0) return total;
      return total + ore.quantity / ore.data.AV;
    }, 0);
  }

  calculateTotalOutputAV() {
    return this.outputOres.reduce((total, ore) => {
      if (!ore.data || ore.data.AV <= 0) return total;
      return total + ore.quantity / ore.data.AV;
    }, 0);
  }

  calculateMaxQuantity(oreName, totalInputAV) {
    const oreData = oreValues[oreName];
    if (!oreData || oreData.AV <= 0) return 0;
    return Math.floor(totalInputAV * oreData.AV);
  }

  sortOres(ores) {
    const oreEntries = [...ores];

    switch (this.sortMode) {
      case 'rarity':
        return oreEntries.sort((a, b) => a[1].AV - b[1].AV);
      case 'rarity-desc':
        return oreEntries.sort((a, b) => b[1].AV - a[1].AV);
      case 'random':
        return oreEntries.sort(() => Math.random() - 0.5);
      case 'alphabetical':
      default:
        return oreEntries.sort((a, b) => a[0].localeCompare(b[0]));
    }
  }

  openModal(type) {
    this.currentModalType = type;
    this.modal.classList.add('show');
    this.isModalOpen = true;
    this.searchInput.value = '';
    this.filterOres('');
    this.updateRecentOres();
    this.searchInput.focus();
  }

  closeModal() {
    this.modal.classList.remove('show');
    this.isModalOpen = false;
  }

  openSaveLoadModal(type) {
    const title = document.getElementById('saveLoadTitle');
    const saveContent = document.getElementById('saveContent');
    const loadContent = document.getElementById('loadContent');

    if (type === 'save') {
      title.textContent = 'Save Configuration';
      saveContent.style.display = 'block';
      loadContent.style.display = 'none';
    } else {
      title.textContent = 'Load Configuration';
      saveContent.style.display = 'none';
      loadContent.style.display = 'block';
      this.updateConfigList();
    }

    this.saveLoadModal.classList.add('show');
  }

  closeSaveLoadModal() {
    this.saveLoadModal.classList.remove('show');
  }

  filterOres(searchTerm) {
    const filteredOres = Object.entries(oreValues).filter(([name]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedOres = this.sortOres(filteredOres);
    this.displayOres(sortedOres);
  }

  displayOres(ores) {
    this.oreGrid.innerHTML = '';
    const totalInputAV = this.calculateTotalInputAV();

    ores.forEach(([name, data]) => {
      const maxQuantity = this.calculateMaxQuantity(name, totalInputAV);
      const oreCard = this.createOreCard(name, data, maxQuantity);
      this.oreGrid.appendChild(oreCard);
    });
  }

  createOreCard(name, data, maxQuantity = 0) {
    const card = document.createElement('div');
    card.className = 'ore-card';
    card.innerHTML = `
          <img src="${
            data.icon
          }" alt="${name}" onerror="this.src='https://via.placeholder.com/48x48/6b21a8/ffffff?text=${
      name[0]
    }'">
          <h4>${name}</h4>
          <p>AV: ${data.AV}</p>
          <p>CV: ${this.formatNumber(data.CV)}</p>
          ${
            maxQuantity > 0 && this.currentModalType === 'output'
              ? `<p class="max-quantity">Max: ${this.formatNumber(
                  maxQuantity
                )}</p>`
              : ''
          }
      `;
    card.addEventListener('click', () => this.selectOre(name, data));
    return card;
  }

  selectOre(name, data) {
    this.addToRecentOres(name);

    if (this.currentModalType === 'input') {
      this.addInputOre(name, data);
    } else {
      this.addOutputOre(name, data);
    }

    this.closeModal();
  }

  addInputOre(name, data) {
    const existingOre = this.inputOres.find((ore) => ore.name === name);
    if (existingOre) {
      existingOre.quantity += 1;
    } else {
      this.inputOres.push({
        name,
        data,
        quantity: 1,
      });
    }
    this.updateUI();
  }

  addOutputOre(name, data) {
    const existingOre = this.outputOres.find((ore) => ore.name === name);
    if (!existingOre) {
      this.outputOres.push({
        name,
        data,
        quantity: 0,
        percentage: 0,
        locked: false,
      });
      this.redistributeOutput();
    }
    this.updateUI();
  }

  removeInputOre(index) {
    this.inputOres.splice(index, 1);
    this.updateUI();
  }

  removeOutputOre(index) {
    this.outputOres.splice(index, 1);
    this.redistributeOutput();
    this.updateUI();
  }

  updateInputQuantity(index, quantity) {
    quantity = Math.max(0, parseInt(quantity) || 0);
    this.inputOres[index].quantity = quantity;
    this.redistributeOutput();
    this.updateUI();
  }

  updateOutputQuantity(index, quantity) {
    this.lastUserAction = Date.now();
    quantity = Math.max(0, parseInt(quantity) || 0);

    if (this.fairModeToggle.checked) {
      const totalInputAV = this.calculateTotalInputAV();
      const ore = this.outputOres[index];
      const requestedAV = quantity / ore.data.AV;

      let otherOresAV = 0;
      this.outputOres.forEach((otherOre, otherIndex) => {
        if (otherIndex !== index) {
          otherOresAV += otherOre.quantity / otherOre.data.AV;
        }
      });

      if (requestedAV + otherOresAV > totalInputAV) {
        this.showWarningPopup(
          'That value exceeds the total AV you are offering!'
        );
        this.updateUI();
        return;
      }
    }

    this.outputOres[index].quantity = quantity;
    this.updateOutputFromQuantities();
    this.updateUI();
  }

  updateOutputFromQuantities() {
    const totalInputAV = this.calculateTotalInputAV();
    if (totalInputAV === 0) return;

    let totalUsedAV = 0;
    this.outputOres.forEach((ore) => {
      totalUsedAV += ore.quantity / ore.data.AV;
    });

    if (totalUsedAV > totalInputAV) {
      const scale = totalInputAV / totalUsedAV;
      this.outputOres.forEach((ore) => {
        if (!ore.locked) {
          ore.quantity = Math.floor(ore.quantity * scale);
        }
      });
    }

    this.updatePercentagesFromQuantities();
  }

  updatePercentagesFromQuantities() {
    const totalInputAV = this.calculateTotalInputAV();
    if (totalInputAV === 0) return;

    this.outputOres.forEach((ore) => {
      ore.percentage = (ore.quantity / ore.data.AV / totalInputAV) * 100;
    });
  }

  toggleLock(index) {
    this.outputOres[index].locked = !this.outputOres[index].locked;
    this.updateUI();
  }

  updateSlider(index, percentage) {
    percentage = Math.max(0, Math.min(100, parseFloat(percentage)));
    this.outputOres[index].percentage = percentage;
    this.redistributeFromSlider(index);
    this.updateQuantitiesFromPercentages();
    this.updateOutputOresDisplayOnly();
  }

  checkFairModeOnSliderDrop(index, percentage) {
    if (this.fairModeToggle.checked) {
      const totalInputAV = this.calculateTotalInputAV();
      const ore = this.outputOres[index];
      const requestedAV = (percentage / 100) * totalInputAV;
      const requestedQuantity = Math.floor(requestedAV * ore.data.AV);

      let otherOresAV = 0;
      this.outputOres.forEach((otherOre, otherIndex) => {
        if (otherIndex !== index) {
          otherOresAV += otherOre.quantity / otherOre.data.AV;
        }
      });

      if (requestedQuantity / ore.data.AV + otherOresAV > totalInputAV) {
        this.showWarningPopup(
          'That value exceeds the total AV you are offering!'
        );
        this.updateUI();
        return false;
      }
    }
    return true;
  }

  updateOutputOresDisplayOnly() {
    this.outputOres.forEach((ore, index) => {
      const oreElement = this.outputOresContainer.children[index];
      if (oreElement) {
        const quantityInput = oreElement.querySelector('.quantity-input');
        const percentageLabel = oreElement.querySelector('.percentage-label');
        const slider = oreElement.querySelector('.range-slider');
        const totalAVSpan = oreElement.querySelector('.ore-total-av');

        if (quantityInput) quantityInput.value = ore.quantity;
        if (percentageLabel)
          percentageLabel.textContent = `Percentage: ${this.formatNumber(
            ore.percentage
          )}%`;
        if (slider) slider.value = ore.percentage;
        if (totalAVSpan) {
          const oreAV = ore.quantity / ore.data.AV;
          totalAVSpan.textContent = `Total AV: ${this.formatNumber(oreAV)}`;
        }
      }
    });
    this.updateTotalAV();
    this.updateTotalGain();
  }

  redistributeFromSlider(changedIndex) {
    const totalInputAV = this.calculateTotalInputAV();
    if (totalInputAV === 0) return;

    const lockedOres = this.outputOres.filter((ore) => ore.locked);
    const unlockedOres = this.outputOres.filter(
      (ore, i) => !ore.locked && i !== changedIndex
    );

    let lockedPercentage = lockedOres.reduce(
      (sum, ore) => sum + ore.percentage,
      0
    );
    let changedPercentage = this.outputOres[changedIndex].percentage;

    let remainingPercentage = 100 - lockedPercentage - changedPercentage;

    if (remainingPercentage < 0) {
      changedPercentage = Math.max(0, 100 - lockedPercentage);
      this.outputOres[changedIndex].percentage = changedPercentage;
      remainingPercentage = 0;
    }

    if (unlockedOres.length > 0 && remainingPercentage >= 0) {
      const currentUnlockedTotal = unlockedOres.reduce(
        (sum, ore) => sum + ore.percentage,
        0
      );

      if (currentUnlockedTotal > 0) {
        const scale = remainingPercentage / currentUnlockedTotal;
        unlockedOres.forEach((ore) => {
          ore.percentage *= scale;
        });
      } else {
        const equalShare = remainingPercentage / unlockedOres.length;
        unlockedOres.forEach((ore) => {
          ore.percentage = equalShare;
        });
      }
    }
  }

  redistributeOutput() {
    if (this.outputOres.length === 0) return;

    const unlockedOres = this.outputOres.filter((ore) => !ore.locked);
    const lockedOres = this.outputOres.filter((ore) => ore.locked);

    let lockedPercentage = lockedOres.reduce(
      (sum, ore) => sum + ore.percentage,
      0
    );
    let remainingPercentage = Math.max(0, 100 - lockedPercentage);

    if (unlockedOres.length > 0) {
      const equalShare = remainingPercentage / unlockedOres.length;
      unlockedOres.forEach((ore) => {
        ore.percentage = equalShare;
      });
    }

    this.updateQuantitiesFromPercentages();
  }

  updateQuantitiesFromPercentages() {
    const totalInputAV = this.calculateTotalInputAV();

    this.outputOres.forEach((ore) => {
      const avForThisOre = (ore.percentage / 100) * totalInputAV;
      ore.quantity = Math.floor(avForThisOre * ore.data.AV);
    });
  }

  getTotalInputAV() {
    return this.calculateTotalInputAV();
  }

  addToRecentOres(oreName) {
    this.recentOres = this.recentOres.filter((name) => name !== oreName);
    this.recentOres.unshift(oreName);
    this.recentOres = this.recentOres.slice(0, 5);
    localStorage.setItem('recentOres', JSON.stringify(this.recentOres));
  }

  loadRecentOres() {
    try {
      return JSON.parse(localStorage.getItem('recentOres')) || [];
    } catch {
      return [];
    }
  }

  updateRecentOres() {
    this.recentGrid.innerHTML = '';
    this.recentOres.forEach((oreName) => {
      if (oreValues[oreName]) {
        const recentOre = document.createElement('div');
        recentOre.className = 'recent-ore';
        recentOre.textContent = oreName;
        recentOre.addEventListener('click', () =>
          this.selectOre(oreName, oreValues[oreName])
        );
        this.recentGrid.appendChild(recentOre);
      }
    });
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all ores?')) {
      this.inputOres = [];
      this.outputOres = [];
      this.updateUI();
    }
  }

  saveConfiguration() {
    const name = this.configName.value.trim();
    if (!name) {
      alert('Please enter a configuration name');
      return;
    }

    const config = {
      inputOres: this.inputOres,
      outputOres: this.outputOres,
      timestamp: new Date().toISOString(),
    };

    const savedConfigs = this.getSavedConfigurations();
    savedConfigs[name] = config;
    localStorage.setItem('savedConfigurations', JSON.stringify(savedConfigs));

    this.configName.value = '';
    this.closeSaveLoadModal();
    alert('Configuration saved successfully!');
  }

  getSavedConfigurations() {
    try {
      return JSON.parse(localStorage.getItem('savedConfigurations')) || {};
    } catch {
      return {};
    }
  }

  loadConfiguration(name) {
    const savedConfigs = this.getSavedConfigurations();
    const config = savedConfigs[name];

    if (config) {
      this.inputOres = config.inputOres || [];
      this.outputOres = config.outputOres || [];
      this.updateUI();
      this.closeSaveLoadModal();
    }
  }

  deleteConfiguration(name) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const savedConfigs = this.getSavedConfigurations();
      delete savedConfigs[name];
      localStorage.setItem('savedConfigurations', JSON.stringify(savedConfigs));
      this.updateConfigList();
    }
  }

  updateConfigList() {
    const savedConfigs = this.getSavedConfigurations();
    this.configList.innerHTML = '';

    Object.entries(savedConfigs).forEach(([name, config]) => {
      const configItem = document.createElement('div');
      configItem.className = 'config-item';
      configItem.innerHTML = `
              <div>
                  <strong>${name}</strong>
                  <small style="display: block; color: var(--text-secondary);">
                      ${new Date(config.timestamp).toLocaleString()}
                  </small>
              </div>
              <div style="display: flex; gap: 8px;">
                  <button onclick="calculator.loadConfiguration('${name}')">Load</button>
                  <button onclick="calculator.deleteConfiguration('${name}')" style="background: var(--danger-color);">Delete</button>
              </div>
          `;
      this.configList.appendChild(configItem);
    });

    if (Object.keys(savedConfigs).length === 0) {
      this.configList.innerHTML =
        '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No saved configurations</p>';
    }
  }

  showWarningPopup(message) {
    const existingPopup = document.querySelector('.warning-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'warning-popup';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) {
        popup.classList.add('hide');
        setTimeout(() => {
          if (popup.parentNode) {
            popup.remove();
          }
        }, 300);
      }
    }, 3000);
  }

  formatNumber(num) {
    if (this.roundNumbersToggle.checked) {
      return Math.floor(num).toString();
    }
    const formatted = num.toFixed(8);
    return formatted.replace(/\.?0+$/, '');
  }

  formatUnrounded(num) {
    const formatted = num.toFixed(8);
    return formatted.replace(/\.?0+$/, '');
  }

  updateUI() {
    this.updateInputOresDisplay();
    this.updateOutputOresDisplay();
    this.updateTotalAV();
    this.updateTotalGain();

    if (this.fairModeToggle.checked) {
      this.totalGainElement.style.display = 'none';
    } else {
      this.totalGainElement.style.display = 'block';
    }
  }

  updateInputOresDisplay() {
    this.inputOresContainer.innerHTML = '';

    this.inputOres.forEach((ore, index) => {
      const oreElement = document.createElement('div');
      oreElement.className = 'ore-item';
      oreElement.innerHTML = `
              <img src="${ore.data.icon}" alt="${ore.name}" class="ore-icon" onerror="this.src='https://via.placeholder.com/48x48/6b21a8/ffffff?text=${ore.name[0]}'">
              <div class="ore-info">
                  <div class="ore-name">${ore.name}</div>
                  <div class="ore-av">|| AV: ${ore.data.AV} || CV: ${ore.data.CV} ||</div>
                  <div class="ore-cv"></div>
              </div>
              <div class="ore-controls">
                  <input type="number" class="quantity-input" value="${ore.quantity}" min="0" 
                         onchange="calculator.updateInputQuantity(${index}, this.value)">
                  <button class="remove-btn" onclick="calculator.removeInputOre(${index})">&times;</button>
              </div>
          `;
      this.inputOresContainer.appendChild(oreElement);
    });
  }

  updateOutputOresDisplay() {
    this.outputOresContainer.innerHTML = '';
    const totalInputAV = this.calculateTotalInputAV();

    this.outputOres.forEach((ore, index) => {
      const maxQuantity = this.calculateMaxQuantity(ore.name, totalInputAV);
      const oreAV = ore.quantity / ore.data.AV;
      const unroundedQuantity = (ore.percentage / 100) * totalInputAV * ore.data.AV;

      const oreElement = document.createElement('div');
      oreElement.className = 'ore-item';
      oreElement.innerHTML = `
              <img src="${ore.data.icon}" alt="${
        ore.name
      }" class="ore-icon" onerror="this.src='https://via.placeholder.com/48x48/6b21a8/ffffff?text=${
        ore.name[0]
      }'">
              <div class="ore-info">
                  <div class="ore-name">${ore.name}</div>
                  <div class="ore-av">AV: ${ore.data.AV}</div>
                  <div class="ore-cv">CV: ${this.formatNumber(ore.data.CV)}</div>
              </div>
              <div class="ore-controls">
              <input type="number" class="quantity-input" value="${
                    ore.quantity
                  }" min="0"
                         onchange="calculator.updateOutputQuantity(${index}, this.value)">
                  <button class="lock-btn ${
                    ore.locked ? 'locked' : ''
                  }" onclick="calculator.toggleLock(${index})">
                      ${ore.locked ? '🔒' : '🔓'}
                  </button>
                  <button class="remove-btn" onclick="calculator.removeOutputOre(${index})">&times;</button>
              </div>
              <div class="ore-unrounded-display">
                  Precise: ${this.formatUnrounded(unroundedQuantity)}
              </div>
              <div class="slider-section">
                  <div class="percentage-label">Percentage: ${this.formatNumber(
                    ore.percentage
                  )}%</div>
                  <input type="range" class="range-slider" min="0" max="100" step="0.1" 
                         value="${ore.percentage}" 
                         ${ore.locked ? 'disabled' : ''}>
                  <div class="ore-stats">
                      <div class="ore-total-av">Total AV: ${this.formatNumber(
                        oreAV
                      )}</div>
                      <div class="ore-max">Max: ${this.formatNumber(
                        maxQuantity
                      )}</div>
                  </div>
              </div>
          `;

      const slider = oreElement.querySelector('.range-slider');
      if (slider && !ore.locked) {
        let isDragging = false;
        let startValue = ore.percentage;

        slider.addEventListener('mousedown', () => {
          isDragging = true;
          this.isDragging = true;
          startValue = ore.percentage;
        });

        slider.addEventListener('mousemove', (e) => {
          if (isDragging) {
            this.updateSlider(index, slider.value);
          }
        });

        slider.addEventListener('mouseup', () => {
          if (isDragging) {
            if (!this.checkFairModeOnSliderDrop(index, slider.value)) {
              this.outputOres[index].percentage = startValue;
              this.redistributeFromSlider(index);
              this.updateQuantitiesFromPercentages();
            }
          }
          isDragging = false;
          this.isDragging = false;
          this.updateUI();
        });

        slider.addEventListener('input', (e) => {
          this.updateSlider(index, e.target.value);
        });

        slider.addEventListener('change', (e) => {
          if (!this.isDragging) {
            if (!this.checkFairModeOnSliderDrop(index, e.target.value)) {
              return;
            }
          }
          this.updateUI();
        });

        slider.addEventListener('mouseleave', () => {
          if (isDragging) {
            if (!this.checkFairModeOnSliderDrop(index, slider.value)) {
              this.outputOres[index].percentage = startValue;
              this.redistributeFromSlider(index);
              this.updateQuantitiesFromPercentages();
            }
            isDragging = false;
            this.isDragging = false;
            this.updateUI();
          }
        });
      }

      this.outputOresContainer.appendChild(oreElement);
    });
  }

  updateTotalAV() {
    const total = this.calculateTotalInputAV();
    this.totalAVElement.textContent = this.formatNumber(total);
  }

  updateTotalGain() {
    if (!this.totalGainElement) return;

    const inputAV = this.calculateTotalInputAV();
    const outputAV = this.calculateTotalOutputAV();
    const gain = outputAV - inputAV;
    const gainPercentage = inputAV > 0 ? (gain / inputAV) * 100 : 0;

    const gainText =
      gain >= 0 ? `+${this.formatNumber(gain)}` : this.formatNumber(gain);
    const percentageText =
      gainPercentage >= 0
        ? `+${this.formatNumber(gainPercentage)}`
        : this.formatNumber(gainPercentage);

    this.totalGainElement.innerHTML = `
      <strong>Total Gain: ${gainText} AV (${percentageText}%)</strong>
    `;

    if (gain > 0) {
      this.totalGainElement.style.color = 'var(--success-color)';
    } else if (gain < 0) {
      this.totalGainElement.style.color = 'var(--danger-color)';
    } else {
      this.totalGainElement.style.color = 'var(--text-primary)';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.calculator = new AzureMinesCalculator();

  calculator.filterOres('');
});