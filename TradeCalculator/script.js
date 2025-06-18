document.addEventListener("DOMContentLoaded", function () {
    const offerSection = document.getElementById("offer-section");
    const receiveSection = document.getElementById("receive-section");

    const oreMultipliers = {};
    let globalOfferMultiplier = 1;
    let globalReceiveMultiplier = 1;

    const modal = document.getElementById("multiplier-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalResetBtn = document.getElementById("modal-reset-btn");
    const modalSaveBtn = document.getElementById("modal-save-btn");
    const modalOreIcon = document.getElementById("modal-ore-icon");
    const modalOreName = document.getElementById("modal-ore-name");
    const modalMultiplierInput = document.getElementById("modal-multiplier-input");

    let currentModalOre = null;

    const globalOfferInput = document.getElementById("global-offer-multiplier");
    const globalReceiveInput = document.getElementById("global-receive-multiplier");

    const sortedOres = Object.keys(oreValues).sort();

    sortedOres.forEach(ore => oreMultipliers[ore] = 1);

    sortedOres.forEach(ore => {
        const { icon } = oreValues[ore];

        const oreDiv = document.createElement("div");
        oreDiv.classList.add("ore-item");
        oreDiv.innerHTML = `
            <img src="${icon}" class="ore-icon ore-mult-btn" data-ore="${ore}" style="cursor:pointer;">
            <span class="ore-name">${ore}</span>
            <input type="number" class="ore-input" id="input-${ore}" placeholder="0" min="0">
            <span class="ore-mult-label" title="Current multiplier">x<span id="mult-label-${ore}">1</span></span>
        `;

        offerSection.appendChild(oreDiv);
    });

    sortedOres.forEach(ore => {
        const { icon } = oreValues[ore];

        const oreDiv = document.createElement("div");
        oreDiv.classList.add("ore-item");
        oreDiv.innerHTML = `
        <img src="${icon}" class="ore-icon">
        <span class="ore-value-combined ore-exact-value" id="value-${ore}"></span>
    `;

        receiveSection.appendChild(oreDiv);
    });

    document.querySelectorAll(".ore-mult-btn").forEach(img => {
        img.addEventListener("click", function (e) {
            const ore = e.target.getAttribute("data-ore");
            openMultiplierModal(ore);
        });
    });

    function updateMultiplierLabels() {
        sortedOres.forEach(ore => {
            document.getElementById(`mult-label-${ore}`).innerText = oreMultipliers[ore];
        });
    }

    function openMultiplierModal(ore) {
        currentModalOre = ore;
        document.getElementById("modal-ore-title").innerText = ore;
        modalOreIcon.src = oreValues[ore].icon;
        modalMultiplierInput.value = oreMultipliers[ore];
        document.getElementById("modal-ore-desc").innerHTML = `
            <div>Here you can adjust the multiplier for this ore.</div>
            <div>This will affect your trade calculations.</div>
        `;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeMultiplierModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
        currentModalOre = null;
    }

    modalCloseBtn.onclick = closeMultiplierModal;
    modalResetBtn.onclick = function () {
        modalMultiplierInput.value = 1;
    };
    modalSaveBtn.onclick = function () {
        if (currentModalOre) {
            let val = parseFloat(modalMultiplierInput.value);
            if (isNaN(val) || val <= 0) val = 1;
            oreMultipliers[currentModalOre] = val;
            updateMultiplierLabels();
            updateValues();
        }
        closeMultiplierModal();
    };

    modal.addEventListener("click", function (e) {
        if (e.target === modal) closeMultiplierModal();
    });

    globalOfferInput.addEventListener("input", function () {
        let val = parseFloat(globalOfferInput.value);
        if (isNaN(val) || val <= 0) val = 1;
        globalOfferMultiplier = val;
        updateValues();
    });
    globalReceiveInput.addEventListener("input", function () {
        let val = parseFloat(globalReceiveInput.value);
        if (isNaN(val) || val <= 0) val = 1;
        globalReceiveMultiplier = val;
        updateValues();
    });

    document.querySelectorAll(".ore-input").forEach(input => {
        input.addEventListener("input", updateValues);
    });

    function formatNumber(value) {
        return value % 1 === 0 ? value.toString() : value.toFixed(8).replace(/\.?0+$/, "");
    }

    function updateValues() {
        let totalAV = 0;

        sortedOres.forEach(ore => {
            let inputAmount = Number(document.getElementById(`input-${ore}`).value) || 0;
            if (oreValues[ore].AV > 0) {
                totalAV += (inputAmount * oreMultipliers[ore] * globalOfferMultiplier) / oreValues[ore].AV;
            }
        });

        const showRounded = document.getElementById("mode-toggle")?.checked;

        sortedOres.forEach(targetOre => {
            const valueSpan = document.getElementById(`value-${targetOre}`);
            if (oreValues[targetOre].AV > 0) {
                let adjustedAV = oreValues[targetOre].AV * (oreMultipliers[targetOre] || 1);
                let equivalentAmount = totalAV * adjustedAV;

                if (oreMultipliers[targetOre] !== undefined && oreMultipliers[targetOre] !== 1) {
                    equivalentAmount /= oreMultipliers[targetOre];
            }

                equivalentAmount *= globalReceiveMultiplier;

                if (showRounded) {
                    valueSpan.innerText = Math.round(equivalentAmount);
                    valueSpan.classList.add("ore-rounded-value");
                    valueSpan.classList.remove("ore-exact-value");
                } else {
                    valueSpan.innerText = formatNumber(equivalentAmount);
                    valueSpan.classList.add("ore-exact-value");
                    valueSpan.classList.remove("ore-rounded-value");
                }
            } else {
                valueSpan.innerText = "0";
                valueSpan.classList.add("ore-exact-value");
                valueSpan.classList.remove("ore-rounded-value");
            }
        });
    }

    document.getElementById("mode-toggle").addEventListener("change", updateValues);

    window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("mode-toggle").checked = false;
        updateValues();
    });

    updateMultiplierLabels();

    document.getElementById("help-btn").onclick = function() {
      document.getElementById("help-modal").style.display = "block";
    };
    document.getElementById("close-modal").onclick = function() {
      document.getElementById("help-modal").style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == document.getElementById("help-modal")) {
        document.getElementById("help-modal").style.display = "none";
      }
    };
});
