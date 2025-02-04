document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('calculateBtn').addEventListener('click', calculateResult);
  document.getElementById('clearBtn').addEventListener('click', clearResult);

  populateDropdowns();
});

const talentBooksData = {
  2: { star2: 3, star3: 0, star4: 0 },
  3: { star2: 0, star3: 2, star4: 0 },
  4: { star2: 0, star3: 4, star4: 0 },
  5: { star2: 0, star3: 6, star4: 0 },
  6: { star2: 0, star3: 9, star4: 0 },
  7: { star2: 0, star3: 0, star4: 4 },
  8: { star2: 0, star3: 0, star4: 6 },
  9: { star2: 0, star3: 0, star4: 12 },
  10: { star2: 0, star3: 0, star4: 16 },
};

const enhancementMaterialsData = {
  2: { star1: 6, star2: 0, star3: 0 },
  3: { star1: 0, star2: 3, star3: 0 },
  4: { star1: 0, star2: 4, star3: 0 },
  5: { star1: 0, star2: 6, star3: 0 },
  6: { star1: 0, star2: 9, star3: 0 },
  7: { star1: 0, star2: 0, star3: 4 },
  8: { star1: 0, star2: 0, star3: 6 },
  9: { star1: 0, star2: 0, star3: 9 },
  10: { star1: 0, star2: 0, star3: 12 },
};

const moraData = {
  2: 12500,
  3: 17500,
  4: 25000,
  5: 30000,
  6: 37500, 
  7: 120000,
  8: 260000,
  9: 450000,
  10: 700000,
}

const weeklyBossDropData = {
  7: 1,
  8: 1,
  9: 2,
  10: 2,
};

const crownData = {
  10: 1,
};

const populateDropdowns = () => {
  const dropdowns = document.querySelectorAll('select');
  dropdowns.forEach((dropdown) => {
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      dropdown.appendChild(option);
    }
  });
};

const calculateMaterials = (start, end, data) => {
  let total = { star1: 0, star2: 0, star3: 0, star4: 0 };
  for (let level = start + 1; level <= end; level++) {
    if (data[level]) {
      total.star1 += data[level].star1 || 0;
      total.star2 += data[level].star2 || 0;
      total.star3 += data[level].star3 || 0;
      total.star4 += data[level].star4 || 0;
    }
  }
  return total;
};

const calculateWeeklyBossDrop = (start, end) => {
  let total = 0;
  for (let level = start + 1; level <= end; level++) {
    if (weeklyBossDropData[level]) {
      total += weeklyBossDropData[level];
    }
  }
  return total;
};

const calculateMora = (start, end) => {
  let total = 0;
  for (let level = start + 1; level <= end; level++) {
    if (moraData[level]) {
      total += moraData[level];
    }
  }
  return total;
};

const calculateCrown = (start, end) => {
  let total = 0;
  for (let level = start + 1; level <= end; level++) {
    if (crownData[level]) {
      total += crownData[level];
    }
  }
  return total;
};

const calculateResult = () => {
  const formData = new FormData(document.getElementById('talentForm'));
  let totalTalentBooks = { star2: 0, star3: 0, star4: 0 };
  let totalEnhancementMaterials = { star1: 0, star2: 0, star3: 0 };
  let totalWeeklyBossDrop = 0;
  let totalMora = 0;
  let totalCrown = 0;
  let error;
  let start;
  let end;


  for (let i = 1; i <= 3; i++) {
    start = parseInt(formData.get(`field${i}_1`));
    end = parseInt(formData.get(`field${i}_2`));

    const talentMaterials = calculateMaterials(start, end, talentBooksData);
    totalTalentBooks.star2 += talentMaterials.star2;
    totalTalentBooks.star3 += talentMaterials.star3;
    totalTalentBooks.star4 += talentMaterials.star4;

    const enhancementMaterials = calculateMaterials(start, end, enhancementMaterialsData);
    totalEnhancementMaterials.star1 += enhancementMaterials.star1;
    totalEnhancementMaterials.star2 += enhancementMaterials.star2;
    totalEnhancementMaterials.star3 += enhancementMaterials.star3;

    totalMora += calculateMora(start, end);

    if (end >= 7) {
      totalWeeklyBossDrop += calculateWeeklyBossDrop(start, end);
    }

    if (end == 10) {
      totalCrown += calculateCrown(start, end);
    }
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<h2>Result:</h2>
  <hr>
  <p class="result-title"><strong>Talent Books needed:</strong></p>
  ${totalTalentBooks.star2 ? `
  <div class="result-item">
    <img src="img/talent1.png" class="result-icon">
    <span><strong>x${totalTalentBooks.star2}</strong> - 2 stars book (⭐⭐)</span>
  </div>` : ''}
  ${totalTalentBooks.star3 ? `
  <div class="result-item">
    <img src="img/talent2.png" class="result-icon">
    <span><strong>x${totalTalentBooks.star3}</strong> - 3 stars book (⭐⭐⭐)</span>
  </div>` : ''}
  ${totalTalentBooks.star4 ? `
  <div class="result-item">
    <img src="img/talent3.png" class="result-icon">
    <span><strong>x${totalTalentBooks.star4}</strong> - 4 stars book (⭐⭐⭐⭐)</span>
  </div>` : ''}
  <hr>
  
  <p class="result-title"><strong>Enhancement Materials needed:</strong></span>
  ${totalEnhancementMaterials.star1 ? `
  <div class="result-item">
    <img src="img/mob1.png" class="result-icon">
    <span><strong>x${totalEnhancementMaterials.star1}</strong> - 1 star material (⭐)</span>
  </div>` : ''}
  ${totalEnhancementMaterials.star2 ? `
  <div class="result-item">
    <img src="img/mob2.png" class="result-icon">
    <span><strong>x${totalEnhancementMaterials.star2}</strong> - 2 stars material (⭐⭐)</span>
  </div>` : ''}
  ${totalEnhancementMaterials.star3 ? `
  <div class="result-item">
    <img src="img/mob3.png" class="result-icon">
    <span><strong>x${totalEnhancementMaterials.star3}</strong> - 3 stars material (⭐⭐⭐)</span>
  </div>` : ''}
  <hr>

  ${totalWeeklyBossDrop ? `
  <div class="result-item">
    <img src="img/weeklyboss.png" class="result-icon">
    <span>Weekly Boss Drops: <strong>x${totalWeeklyBossDrop}</strong></span>
  </div>` : ''}

  ${totalMora ? `
  <div class="result-item">
    <img src="img/mora.png" class="result-icon">
    <span>Mora needed: <strong>x${totalMora}</strong</span>
  </div>` : ''}

  ${totalCrown ? `
  <hr>
  <div class="result-item">
    <img src="img/crown.png" class="result-icon">
    <span>Crowns of Insight needed: <strong>x${totalCrown}</strong></span>
  </div>` : ''}`;
}


const clearResult = () => {
  document.getElementById('talentForm').reset();
  document.getElementById('result').innerHTML = '';
};