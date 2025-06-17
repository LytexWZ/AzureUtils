window.addEventListener('DOMContentLoaded', () => {
  if (typeof oreValues !== "object") return;

  const ambrosiaAV = oreValues["Ambrosia"].AV;

  const categories = [
    {
      id: "basic-minerals-tbody",
      ores: ["Stone", "Coal", "Sulfur", "Opal", "Moonstone", "Dragonstone"]
    },
    {
      id: "common-metals-tbody",
      ores: ["Copper", "Iron", "Platinum", "Gold", "Silver"]
    },
    {
      id: "common-jewels-tbody",
      ores: ["Diamond", "Amethyst", "Topaz", "Emerald", "Ruby", "Sapphire"]
    },
    {
      id: "rare-oddities-tbody",
      ores: ["Nihilium", "Garnet", "Twitchite", "Kappa", "Ambrosia"]
    },
    {
      id: "halloween-tbody",
      ores: ["Nightmarium", "Sinistyte E", "Sinistyte S", "Sinistyte L", "Sinistyte M", "Pumpkinite"]
    },
    {
      id: "holidays-tbody",
      ores: ["Frostarium", "Giftium", "Frawstbyte", "Gingerbreadium", "Peppermintium", "Noobite"]
    },
    {
      id: "unstable-forms-tbody",
      ores: ["Uranium", "Plutonium", "Promethium"]
    },
    {
      id: "scary-caverns-tbody",
      ores: ["Boomite", "Shadow Metal", "Illuminunium", "Serendibite"]
    },
    {
      id: "azure-caverns-tbody",
      ores: ["Baryte", "Rainbonite", "Alexandrite", "Tungsten", "Azure", "Orichalcum", "Mithril"]
    },
    {
      id: "underworld-tbody",
      ores: ["Painite", "Nullstone", "Dragonglass", "Firecrystal", "Symmetrium", "Soulstone"]
    },
    {
      id: "radioactive-zone-tbody",
      ores: ["Corium", "Newtonium", "Solarium", "Yunium"]
    },
    {
      id: "dreamscape-tbody",
      ores: ["Redmatter", "Antimatter", "Darkmatter", "Constellatium", "Stellarite", "Frightstone"]
    },
    {
      id: "unknown-tbody",
      ores: ["Valhalum", "Mightstone"]
    },
    {
      id: "enigmatic-specimens-tbody",
      ores: ["Element V", "Havium"]
    },
    {
      id: "rare-metals-tbody",
      ores: ["Titanium"]
    }
  ];
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem("oreQuantities") || "{}");
  } catch { saved = {}; }

  function getPercentClass(percent) {
    if (percent >= 100) return 'percent-over100';
    if (percent >= 90)  return 'percent-90';
    if (percent >= 80)  return 'percent-80';
    if (percent >= 70)  return 'percent-70';
    if (percent >= 60)  return 'percent-60';
    if (percent >= 50)  return 'percent-50';
    if (percent >= 40)  return 'percent-40';
    if (percent >= 30)  return 'percent-30';
    if (percent >= 20)  return 'percent-20';
    if (percent >= 10)  return 'percent-10';
    return 'percent-0';
  }
  const marketOres = [
    "Stone", "Opal", "Moonstone", "Coal", "Silver", "Iron", "Copper", "Sapphire", "Ruby", "Emerald", "Gold", "Diamond", "Topaz", "Amethyst", "Platinum", "Uranium", "Plutonium", "Serendibite", "Baryte", "Azure", "Rainbonite", "Dragonglass", "Painite", "Newtonium", "Promethium", "Antimatter", "Darkmatter", "Havium"
  ];

  const marketIconHTML = `<img class="market-icon" src="../src/market.png" alt="Market" title="This ore can be sold and purchased in the market!">`;

  function makeOreRow(ore) {
    const val = oreValues[ore];
    if (!val) {
      return `<tr><td colspan="5" style="color:red;">Missing ore in values.js: ${ore}</td></tr>`;
    }
    const oreClass = "ore-name ore-" + ore.toLowerCase().replace(/[^a-z0-9]/g, '');
    const icon = val.icon || '';
    const qty = saved[ore] || 0;
    const avs = (qty / val.AV);
    const percent = avs * 100;
    const percentClass = getPercentClass(percent);
    const marketIcon = marketOres.includes(ore) ? marketIconHTML : "";
    return `
      <tr>
        <td class="${oreClass}">
          <img class="ore-icon" src="${icon}" alt="${ore}"><span>${ore}</span>${marketIcon}
        </td>
        <td class="av-percent ${percentClass}" data-ore="${ore}">${percent.toFixed(1)}%</td>
        <td><input type="number" min="0" value="${qty}" class="ore-input" data-ore="${ore}" style="width:60px"></td>
        <td class="avs" data-ore="${ore}">${avs.toFixed(2)}</td>
        <td>${val.AV}</td>
      </tr>
    `;
  }

  categories.forEach(cat => {
    const tbody = document.getElementById(cat.id);
    if (tbody) tbody.innerHTML = cat.ores.map(makeOreRow).join('');
  });

  function updateStatsMenu() {
    let totalOres = 0;
    let totalAV = 0;
    let highest = null;
    let lowest = null;

    Object.keys(oreValues).forEach(ore => {
      const val = oreValues[ore];
      const qty = Number(saved[ore]) || 0;
      totalOres += qty;
      const avs = qty / val.AV;
      totalAV += avs;

      if (qty > 0) {
        if (!highest || avs > highest.avs) highest = { ore, avs };
        if (!lowest || avs < lowest.avs) lowest = { ore, avs };
      }
    });

    document.getElementById("stat-total-ores").textContent = totalOres;
    document.getElementById("stat-total-av").textContent = totalAV.toFixed(2);
    document.getElementById("stat-highest-ore").textContent = highest ? `${highest.ore} (${highest.avs.toFixed(2)} AVs)` : "-";
    document.getElementById("stat-lowest-ore").textContent = lowest ? `${lowest.ore} (${lowest.avs.toFixed(2)} AVs)` : "-";
  }

  function updateTableStats() {
    categories.forEach(cat => {
      let totalQty = 0;
      let totalAV = 0;
      let highest = null;
      let avSum = 0;
      let oreCount = 0;

      cat.ores.forEach(ore => {
        const val = oreValues[ore];
        if (!val) return;
        const qty = Number(saved[ore]) || 0;
        const avs = qty / val.AV;
        totalQty += qty;
        totalAV += avs;
        if (qty > 0) {
          if (!highest || avs > highest.avs) highest = { ore, avs };
        }
        avSum += avs;
        oreCount++;
      });

      const avCompletion = oreCount ? (avSum / oreCount) * 100 : 0;
      const statsDiv = document.getElementById(cat.id.replace("-tbody", "-stats"));
      if (statsDiv) {
        statsDiv.innerHTML = `
          <span>➜ <strong>AV Completion:</strong> ${avCompletion.toFixed(1)}%</span>
          <span>➜ <strong>Total AV:</strong> ${totalAV.toFixed(2)} AV</span>
          <span>➜ <strong>Highest AV:</strong> ${highest ? `${highest.ore} (${highest.avs.toFixed(2)} AV)` : "-"}</span>
        `;
      }
    });
  }

  document.addEventListener('input', function(e) {
    if (!e.target.classList.contains('ore-input')) return;
    const input = e.target;
    const ore = input.dataset.ore;
    const qty = parseFloat(input.value) || 0;
    saved[ore] = qty;
    localStorage.setItem("oreQuantities", JSON.stringify(saved));
    const val = oreValues[ore];
    if (!val) return;
    const avs = qty / val.AV;
    const percent = avs * 100;
    const percentClass = getPercentClass(percent);

    const row = input.closest('tr');
    if (row) {
      const avPercentCell = row.querySelector('.av-percent');
      if (avPercentCell) {
        avPercentCell.textContent = percent.toFixed(1) + "%";
        avPercentCell.className = `av-percent ${percentClass}`;
      }
      const avsCell = row.querySelector('.avs');
      if (avsCell) {
        avsCell.textContent = avs.toFixed(2);
      }
    }

    updateStatsMenu();
    updateTableStats();
  });

  updateStatsMenu();
  updateTableStats();
});

window.addEventListener('DOMContentLoaded', () => {
  const helpBtn = document.getElementById("help-btn");
  const helpModal = document.getElementById("help-modal");
  const closeModal = document.getElementById("close-modal");

  helpBtn.addEventListener("click", () => {
    helpModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
  closeModal.addEventListener("click", () => {
    helpModal.style.display = "none";
    document.body.style.overflow = "";
  });
  window.addEventListener("click", (event) => {
    if (event.target === helpModal) {
      helpModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const marketModal = document.getElementById("market-modal");
  const closeMarketModal = document.getElementById("close-market-modal");

  document.body.addEventListener("click", function(e) {
    if (e.target.classList.contains("market-icon")) {
      marketModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  });

  closeMarketModal.addEventListener("click", () => {
    marketModal.style.display = "none";
    document.body.style.overflow = "";
  });

  window.addEventListener("click", (event) => {
    if (event.target === marketModal) {
      marketModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

console.log("Azure Mines Inventory Manager loaded.");
console.log(Object.keys(oreValues));
