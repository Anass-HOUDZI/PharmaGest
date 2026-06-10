const https = require('https');
const fs = require('fs');
const path = require('path');

const CSV_URL = 'https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2023/2023-03-14/drugs.csv';
const OUTPUT_FILE = path.join(__dirname, 'imported_drugs.json');

console.log("Téléchargement du dataset EMA (TidyTuesday/Kaggle) en cours...");

https.get(CSV_URL, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    console.log("Téléchargement terminé. Traitement des données...");
    try {
      parseAndSaveCSV(rawData);
    } catch (e) {
      console.error("Erreur lors de l'analyse :", e);
    }
  });
}).on('error', (err) => {
  console.error("Erreur de téléchargement :", err.message);
});

// A robust CSV parser that handles double quotes and commas
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',') {
      if (inQuotes) {
        row[row.length - 1] += c;
      } else {
        row.push("");
      }
    } else if (c === '\r' || c === '\n') {
      if (inQuotes) {
        row[row.length - 1] += c;
      } else {
        if (c === '\r' && next === '\n') i++;
        lines.push(row);
        row = [""];
      }
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  return lines;
}

function parseAndSaveCSV(csvText) {
  const parsed = parseCSV(csvText);
  if (parsed.length < 2) {
    console.error("CSV invalide ou vide.");
    return;
  }

  const headers = parsed[0];
  const rows = parsed.slice(1);

  // Map column index
  const getIdx = (name) => headers.indexOf(name);
  const catIdx = getIdx('category');
  const nameIdx = getIdx('medicine_name');
  const dciIdx = getIdx('active_substance');
  const statusIdx = getIdx('authorisation_status');
  const genericIdx = getIdx('generic');
  const orphanIdx = getIdx('orphan_medicine');

  console.log(`Nombre total de lignes chargées : ${rows.length}`);

  // Filter human authorized medicines with active substances
  const filteredRows = rows.filter(r => {
    return r[catIdx] === 'human' && 
           r[statusIdx] === 'authorised' && 
           r[nameIdx] && 
           r[dciIdx] && 
           r[dciIdx].toLowerCase() !== 'na';
  });

  console.log(`Médicaments humains autorisés filtrés : ${filteredRows.length}`);

  // Take a sample of 60 drugs to enrich the system
  const sample = filteredRows.slice(0, 60);

  const importedDrugs = sample.map((r, index) => {
    const name = r[nameIdx];
    let dci = r[dciIdx];
    // Clean DCI (it might have multiple substances or brackets)
    dci = dci.split(';')[0].split('[')[0].trim();
    // Capitalize first letter of DCI
    dci = dci.charAt(0).toUpperCase() + dci.slice(1);

    const isGeneric = r[genericIdx] === 'TRUE';
    const isOrphan = r[orphanIdx] === 'TRUE';

    // Generate unique CIP code
    // Standard French CIP13 starts with 34009, then 8 digits
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
    const cip = `34009${randomDigits}`;

    // Randomize stock (including some low stocks and ruptures)
    let stock = Math.floor(Math.random() * 45); // 0 to 44
    if (Math.random() < 0.15) stock = 0; // 15% chance of rupture

    const alertLimit = Math.floor(3 + Math.random() * 8); // 3 to 10

    // Randomize prices
    const priceAchat = parseFloat((1.20 + Math.random() * 45.00).toFixed(2));
    const pricePublic = parseFloat((priceAchat * 1.45 + 0.50).toFixed(2));

    // Randomize list category
    let list = "Hors liste";
    if (isOrphan) list = "Stupéfiant";
    else if (isGeneric) list = Math.random() > 0.4 ? "Liste I" : "Liste II";
    else list = Math.random() > 0.6 ? "Liste I" : "Hors liste";

    // Reimbursable logic: generally Liste I/II and some others are reimbursable (2.1% VAT)
    // Non-reimbursable OTC is 10.0% VAT
    const tva = list !== "Hors liste" ? 2.1 : (Math.random() > 0.5 ? 10.0 : 20.0);

    // Random shelf assignment
    const shelves = ["Tiroir A", "Tiroir B", "Tiroir C", "Tiroir D", "Tiroir E", "Rayon R"];
    const shelf = shelves[Math.floor(Math.random() * shelves.length)] + Math.floor(1 + Math.random() * 9);

    // Randomize expiration dates (including a few close to expiration)
    const today = new Date();
    const expirationDate = new Date();
    if (Math.random() < 0.15) {
      // 15% chance of expiring in less than 3 months
      const daysAhead = Math.floor(10 + Math.random() * 70);
      expirationDate.setDate(today.getDate() + daysAhead);
    } else {
      // 1 to 3 years in the future
      const daysAhead = Math.floor(180 + Math.random() * 800);
      expirationDate.setDate(today.getDate() + daysAhead);
    }
    const expiration = expirationDate.toISOString().split('T')[0];

    return {
      cip,
      name,
      dci,
      stock,
      alertLimit,
      priceAchat,
      pricePublic,
      tva,
      list,
      shelf,
      expiration
    };
  });

  // Prepend Doliprane 1g as the default product
  importedDrugs.unshift({
    cip: "3400930000000",
    name: "Doliprane 1g",
    dci: "Paracétamol",
    stock: 10,
    alertLimit: 5,
    priceAchat: 1.20,
    pricePublic: 2.10,
    tva: 2.1,
    list: "Hors liste",
    shelf: "Tiroir A1",
    expiration: "2028-06-09"
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(importedDrugs, null, 2), 'utf-8');
  console.log(`Importation réussie. ${importedDrugs.length} médicaments enregistrés dans : ${OUTPUT_FILE}`);
}
