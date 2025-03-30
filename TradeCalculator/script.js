document.addEventListener("DOMContentLoaded", function () {
    const offerSection = document.getElementById("offer-section");
    const receiveSection = document.getElementById("receive-section");

    const sortedOres = Object.keys(oreValues).sort();

    sortedOres.forEach(ore => {
        const { icon } = oreValues[ore];

        const oreDiv = document.createElement("div");
        oreDiv.classList.add("ore-item");
        oreDiv.innerHTML = `
            <img src="${icon}" class="ore-icon">
            <span class="ore-name">${ore}</span>
            <input type="number" class="ore-input" id="input-${ore}" placeholder="0" min="0">
        `;

        offerSection.appendChild(oreDiv);
    });

    sortedOres.forEach(ore => {
        const { icon } = oreValues[ore];

        const oreDiv = document.createElement("div");
        oreDiv.classList.add("ore-item");
        oreDiv.innerHTML = `
            <img src="${icon}" class="ore-icon">
            <span class="ore-value" id="value-${ore}">0.00</span>
        `;

        receiveSection.appendChild(oreDiv);
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
                totalAV += inputAmount / oreValues[ore].AV;
            }
        });
    
        sortedOres.forEach(ore => {
            document.getElementById(`value-${ore}`).innerText = "0";
        });
    
        sortedOres.forEach(targetOre => {
            if (oreValues[targetOre].AV > 0) {
                let equivalentAmount = totalAV * oreValues[targetOre].AV;
                document.getElementById(`value-${targetOre}`).innerText = formatNumber(equivalentAmount);
            }
        });
    }
});
