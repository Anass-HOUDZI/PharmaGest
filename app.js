/* PharmaGest - Core Application Logic */

// --- DATA INITIALIZATION ---
const MOCK_MEDICATIONS = [
  { cip: "3400931201944", name: "Doliprane 1g", dci: "Paracétamol", stock: 48, alertLimit: 15, priceAchat: 0.85, pricePublic: 1.94, tva: 2.1, list: "Hors liste", shelf: "Tiroir A1", expiration: "2028-10-12" },
  { cip: "3400935399557", name: "Dafalgan 500mg", dci: "Paracétamol", stock: 4, alertLimit: 10, priceAchat: 0.70, pricePublic: 1.62, tva: 2.1, list: "Hors liste", shelf: "Tiroir A2", expiration: "2027-04-18" },
  { cip: "3400936636750", name: "Spedifen 400mg", dci: "Ibuprofène", stock: 25, alertLimit: 8, priceAchat: 1.45, pricePublic: 3.12, tva: 10.0, list: "Hors liste", shelf: "Tiroir A3", expiration: "2026-07-15" }, // Expiring soon!
  { cip: "3400931920845", name: "Kardegic 75mg", dci: "Acide acétylsalicylique", stock: 30, alertLimit: 10, priceAchat: 1.10, pricePublic: 2.85, tva: 2.1, list: "Liste II", shelf: "Tiroir B1", expiration: "2027-11-20" },
  { cip: "3400930234589", name: "Amoxicilline Biogaran 1g", dci: "Amoxicilline", stock: 18, alertLimit: 5, priceAchat: 1.20, pricePublic: 2.50, tva: 2.1, list: "Liste I", shelf: "Tiroir C1", expiration: "2027-09-05" },
  { cip: "3400931102941", name: "Augmentin Enfant", dci: "Amoxicilline + Acide Clavulanique", stock: 12, alertLimit: 4, priceAchat: 2.10, pricePublic: 4.80, tva: 2.1, list: "Liste I", shelf: "Frigo", expiration: "2026-08-01" }, // Expiring soon!
  { cip: "3400932549687", name: "Ventoline Spray 100µg", dci: "Salbutamol", stock: 22, alertLimit: 6, priceAchat: 3.20, pricePublic: 6.18, tva: 2.1, list: "Liste I", shelf: "Tiroir D2", expiration: "2028-02-14" },
  { cip: "3400934563821", name: "Gaviscon Suspension Flacon", dci: "Alginate de sodium + Bicarbonate", stock: 3, alertLimit: 5, priceAchat: 1.95, pricePublic: 3.90, tva: 10.0, list: "Hors liste", shelf: "Rayon R1", expiration: "2027-01-30" }, // Low stock!
  { cip: "3400932900983", name: "Spasfon Lyoc", dci: "Phloroglucinol", stock: 40, alertLimit: 10, priceAchat: 1.15, pricePublic: 2.99, tva: 10.0, list: "Hors liste", shelf: "Tiroir A4", expiration: "2029-03-22" },
  { cip: "3400935567823", name: "Aerius 5mg", dci: "Desloratadine", stock: 0, alertLimit: 10, priceAchat: 1.80, pricePublic: 3.82, tva: 2.1, list: "Liste II", shelf: "Tiroir B3", expiration: "2028-06-18" }, // Rupture!
  { cip: "3400930129487", name: "Previscan 20mg", dci: "Fluindione", stock: 15, alertLimit: 5, priceAchat: 1.50, pricePublic: 3.40, tva: 2.1, list: "Liste I", shelf: "Tiroir B2", expiration: "2027-05-10" },
  { cip: "3400931122338", name: "Imodium caps", dci: "Lopéramide", stock: 28, alertLimit: 8, priceAchat: 0.90, pricePublic: 2.25, tva: 10.0, list: "Hors liste", shelf: "Rayon R2", expiration: "2029-12-01" },
  { cip: "3400938899014", name: "Smecta Fraise", dci: "Diosmectite", stock: 16, alertLimit: 6, priceAchat: 1.40, pricePublic: 3.20, tva: 10.0, list: "Hors liste", shelf: "Rayon R2", expiration: "2028-05-15" },
  { cip: "3400936789124", name: "Celestene 0.05%", dci: "Bétaméthasone", stock: 9, alertLimit: 3, priceAchat: 2.10, pricePublic: 4.65, tva: 2.1, list: "Liste I", shelf: "Tiroir C2", expiration: "2027-08-14" },
  { cip: "3400930056112", name: "Inexium 20mg", dci: "Ésoméprazole", stock: 35, alertLimit: 8, priceAchat: 1.90, pricePublic: 4.10, tva: 2.1, list: "Liste II", shelf: "Tiroir B4", expiration: "2028-11-22" },
  { cip: "3400932244558", name: "Tahor 10mg", dci: "Atorvastatine", stock: 19, alertLimit: 5, priceAchat: 2.50, pricePublic: 5.60, tva: 2.1, list: "Liste I", shelf: "Tiroir B5", expiration: "2027-06-30" },
  { cip: "3400930089224", name: "Eludril Collutoire", dci: "Chlorhexidine + Chlorobutanol", stock: 6, alertLimit: 5, priceAchat: 1.80, pricePublic: 3.45, tva: 10.0, list: "Hors liste", shelf: "Rayon R3", expiration: "2026-06-30" }, // Expired or expiring in days!
  { cip: "3400935561122", name: "Rhinadvil Rhume", dci: "Ibuprofène + Pseudoéphédrine", stock: 14, alertLimit: 5, priceAchat: 2.10, pricePublic: 4.95, tva: 10.0, list: "Hors liste", shelf: "Caisse-OTC", expiration: "2028-01-15" },
  { cip: "3400930011224", name: "Stilnox 10mg", dci: "Zolpidem", stock: 8, alertLimit: 3, priceAchat: 1.10, pricePublic: 2.78, tva: 2.1, list: "Stupéfiant", shelf: "Coffre-Fort", expiration: "2027-02-28" },
  { cip: "3400936644229", name: "Tercian 25mg", dci: "Cyamémazine", stock: 11, alertLimit: 4, priceAchat: 2.40, pricePublic: 5.12, tva: 2.1, list: "Liste I", shelf: "Tiroir E1", expiration: "2027-10-30" }
];

const MOCK_PATIENTS = [
  {
    id: "p1",
    lastName: "Dupont",
    firstName: "Jean",
    dob: "1985-02-12",
    nir: "185027512545622",
    regime: "Régime Général (CPAM Paris)",
    secuRate: 0.65,
    mutuelle: "MGEN",
    mutuelleRate: 0.35, // Completes the ticket modérateur to 100%
    doctor: "Dr. Jean-Pierre Laroche",
    allergies: ["Amoxicilline"],
    history: [
      { date: "2026-05-10", name: "Doliprane 1g", qty: 2, price: 3.88 },
      { date: "2026-04-18", name: "Amoxicilline Biogaran 1g", qty: 1, price: 2.50 }
    ]
  },
  {
    id: "p2",
    lastName: "Martin",
    firstName: "Marie",
    dob: "1962-09-24",
    nir: "262099931245610",
    regime: "Régime Général (ALD - Affection Longue Durée)",
    secuRate: 1.00, // 100% covered by social security
    mutuelle: "Harmonie Mutuelle",
    mutuelleRate: 0.00, // Not needed due to ALD 100%
    doctor: "Dr. Sandrine Vasseur",
    allergies: ["Acide acétylsalicylique"],
    history: [
      { date: "2026-05-24", name: "Kardegic 75mg", qty: 3, price: 8.55 },
      { date: "2026-05-24", name: "Tahor 10mg", qty: 1, price: 5.60 }
    ]
  },
  {
    id: "p3",
    lastName: "Dubois",
    firstName: "Pierre",
    dob: "1978-11-03",
    nir: "178111306789412",
    regime: "Régime Général (CPAM Marseille)",
    secuRate: 0.65,
    mutuelle: "Sans Mutuelle",
    mutuelleRate: 0.00, // No supplementary insurance, pays ticket modérateur
    doctor: "Dr. Marc Valette",
    allergies: ["Ibuprofène"],
    history: [
      { date: "2026-03-02", name: "Spasfon Lyoc", qty: 2, price: 5.98 }
    ]
  },
  {
    id: "p4",
    lastName: "Lefèvre",
    firstName: "Sophie",
    dob: "1993-07-08",
    nir: "293077511223344",
    regime: "Régime Général (RSI/Artisans)",
    secuRate: 0.30, // 30% covered
    mutuelle: "Apicil (Formule Pro)",
    mutuelleRate: 0.70, // Covers 70% remaining
    doctor: "Dr. Amélie Bertrand",
    allergies: ["Salbutamol"],
    history: [
      { date: "2026-05-29", name: "Ventoline Spray 100µg", qty: 1, price: 6.18 },
      { date: "2026-05-29", name: "Aerius 5mg", qty: 1, price: 3.82 }
    ]
  },
  {
    id: "p5",
    lastName: "Bernard",
    firstName: "Lucas",
    dob: "2015-05-14",
    nir: "115059312578950",
    regime: "Régime Général (Ayant-droit enfant)",
    secuRate: 1.00, // Under 16 fully covered for most standard pediatric prescription items
    mutuelle: "MGEN (Famille)",
    mutuelleRate: 0.00,
    doctor: "Dr. Bruno Rossi (Pédiatre)",
    allergies: ["Desloratadine"],
    history: [
      { date: "2026-04-05", name: "Augmentin Enfant", qty: 1, price: 4.80 }
    ]
  }
];

const MOCK_SALES_HISTORY = [
  { date: "2026-06-03", total: 12.50, ord: 1, patient: "Jean Dupont" },
  { date: "2026-06-04", total: 4.80, ord: 1, patient: "Lucas Bernard" },
  { date: "2026-06-05", total: 22.10, ord: 2, patient: "Marie Martin" },
  { date: "2026-06-06", total: 8.50, ord: 0, patient: "Anonyme" },
  { date: "2026-06-07", total: 34.20, ord: 3, patient: "Sophie Lefèvre" },
  { date: "2026-06-08", total: 18.90, ord: 1, patient: "Pierre Dubois" },
  { date: "2026-06-09", total: 9.80, ord: 0, patient: "Anonyme" } // Today
];

// --- APP STATE ---
let parsedInventory = MOCK_MEDICATIONS;
let parsedPatients = MOCK_PATIENTS;
let parsedSalesHistory = MOCK_SALES_HISTORY;

try {
  const inv = localStorage.getItem('pg_inventory');
  if (inv) parsedInventory = JSON.parse(inv);
} catch (e) {
  console.error("Failed to parse pg_inventory from localStorage", e);
}

try {
  const pat = localStorage.getItem('pg_patients');
  if (pat) parsedPatients = JSON.parse(pat);
} catch (e) {
  console.error("Failed to parse pg_patients from localStorage", e);
}

try {
  const sales = localStorage.getItem('pg_sales');
  if (sales) parsedSalesHistory = JSON.parse(sales);
} catch (e) {
  console.error("Failed to parse pg_sales from localStorage", e);
}

let state = {
  inventory: parsedInventory || MOCK_MEDICATIONS,
  patients: parsedPatients || MOCK_PATIENTS,
  salesHistory: parsedSalesHistory || MOCK_SALES_HISTORY,
  cart: [],
  selectedPatient: null, // "Anonyme" by default
  currentView: "dashboard",
  cashEntered: "",
  theme: localStorage.getItem('pg_theme') || 'light',
  audioMuted: localStorage.getItem('pg_audio_muted') === 'true'
};

// Ensure patients have allergies in state
state.patients.forEach(p => {
  if (!p.allergies) {
    if (p.lastName === "Dupont") p.allergies = ["Amoxicilline"];
    else if (p.lastName === "Martin") p.allergies = ["Acide acétylsalicylique"];
    else if (p.lastName === "Dubois") p.allergies = ["Ibuprofène"];
    else if (p.lastName === "Lefèvre") p.allergies = ["Salbutamol"];
    else if (p.lastName === "Bernard") p.allergies = ["Desloratadine"];
    else p.allergies = [];
  }
});

// State persistence helpers
function saveState() {
  localStorage.setItem('pg_inventory', JSON.stringify(state.inventory));
  localStorage.setItem('pg_patients', JSON.stringify(state.patients));
  localStorage.setItem('pg_sales', JSON.stringify(state.salesHistory));
}

// --- DOM ELEMENTS ---
const dom = {
  // Navigation
  navItems: document.querySelectorAll('.nav-item'),
  views: document.querySelectorAll('.page-view'),
  topbarTitle: document.getElementById('topbar-view-title'),
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  themeIcon: document.getElementById('theme-icon'),
  audioToggleBtn: document.getElementById('audio-toggle-btn'),
  audioIcon: document.getElementById('audio-icon'),
  notifBadge: document.getElementById('notif-badge'),
  dateTimeDisplay: document.getElementById('current-date-time'),
  globalSearch: document.getElementById('global-search-input'),

  // Dashboard View
  kpiSalesToday: document.getElementById('kpi-sales-today'),
  kpiPrescriptionsToday: document.getElementById('kpi-prescriptions-today'),
  kpiLowStock: document.getElementById('kpi-low-stock'),
  kpiExpiringSoon: document.getElementById('kpi-expiring-soon'),
  dashboardAlerts: document.getElementById('dashboard-alerts-container'),
  topSellingDrugsBody: document.getElementById('top-selling-drugs-body'),
  statAverageBasket: document.getElementById('stat-average-basket'),
  statRuptureRate: document.getElementById('stat-rupture-rate'),
  btnDashboardOrderRefill: document.getElementById('btn-dashboard-order-refill'),
  
  // POS View
  btnSimulateVitale: document.getElementById('btn-simulate-vitale'),
  vitaleBtnText: document.getElementById('vitale-btn-text'),
  posPatientAvatar: document.getElementById('pos-patient-avatar'),
  posPatientName: document.getElementById('pos-patient-name'),
  posPatientSecu: document.getElementById('pos-patient-secu'),
  posPatientBadges: document.getElementById('pos-patient-badges'),
  badgeSecuPct: document.getElementById('badge-secu-pct'),
  badgeMutuellePct: document.getElementById('badge-mutuelle-pct'),
  posMedSearch: document.getElementById('pos-med-search'),
  posSearchResultsDropdown: document.getElementById('pos-search-results-dropdown'),
  btnScanBarcode: document.getElementById('btn-scan-barcode'),
  btnScanPrescription: document.getElementById('btn-scan-prescription'),
  safetyAlertCard: document.getElementById('safety-alert-card'),
  safetyAlertTitle: document.getElementById('safety-alert-title'),
  safetyAlertDesc: document.getElementById('safety-alert-desc'),
  posCartTableBody: document.getElementById('pos-cart-items-body'),
  cartCountBadge: document.getElementById('cart-item-count-badge'),
  
  // POS Calculations
  calcTotalPublic: document.getElementById('pos-calc-total-public'),
  calcSecuDeduct: document.getElementById('pos-calc-secu-deduct'),
  calcMutuelleDeduct: document.getElementById('pos-calc-mutuelle-deduct'),
  calcTva: document.getElementById('pos-calc-tva'),
  calcFinalPrice: document.getElementById('pos-calc-final-price'),
  paymentMethods: document.querySelectorAll('.btn-payment-method'),
  cashEnteredVal: document.getElementById('cash-entered-val'),
  cashChangeVal: document.getElementById('cash-change-val'),
  numpadBtns: document.querySelectorAll('.numpad-btn'),
  numpadBackspace: document.getElementById('numpad-backspace'),
  btnValidateTransaction: document.getElementById('btn-validate-transaction'),
  btnEmptyCart: document.getElementById('btn-empty-cart'),
  
  // Stock View
  stockFilterBtns: document.querySelectorAll('[data-stock-filter]'),
  stockItemsBody: document.getElementById('stock-items-body'),
  btnOpenAddProductModal: document.getElementById('btn-open-add-product-modal'),
  btnOpenSupplierModal: document.getElementById('btn-open-supplier-modal'),
  btnLoadKaggleDataset: document.getElementById('btn-load-kaggle-dataset'),
  
  // Patients View
  patientPaneSearch: document.getElementById('patient-pane-search'),
  patientCardsContainer: document.getElementById('patient-cards-container'),
  patientDetailsPlaceholder: document.getElementById('patient-details-placeholder'),
  patientDetailsContent: document.getElementById('patient-details-content'),
  detPatientAvatar: document.getElementById('det-patient-avatar'),
  detPatientName: document.getElementById('det-patient-name'),
  detPatientSecu: document.getElementById('det-patient-secu'),
  detPatientDob: document.getElementById('det-patient-dob'),
  detPatientRegime: document.getElementById('det-patient-regime'),
  detPatientRembRate: document.getElementById('det-patient-remb-rate'),
  detPatientMutuelle: document.getElementById('det-patient-mutuelle'),
  detPatientDoctor: document.getElementById('det-patient-doctor'),
  detPatientAllergies: document.getElementById('det-patient-allergies'),
  patientDeliveryHistory: document.getElementById('patient-delivery-history-container'),
  btnLoadPatientToPos: document.getElementById('btn-load-patient-to-pos'),

  // Modals
  productModal: document.getElementById('product-modal'),
  productForm: document.getElementById('product-form'),
  productModalTitle: document.getElementById('product-modal-title'),
  editProdIndex: document.getElementById('edit-prod-index'),
  btnCancelProductModal: document.getElementById('btn-cancel-product-modal'),
  btnCloseProductModal: document.getElementById('btn-close-product-modal'),
  
  prodCip: document.getElementById('prod-cip'),
  prodName: document.getElementById('prod-name'),
  prodDci: document.getElementById('prod-dci'),
  prodStock: document.getElementById('prod-stock'),
  prodAlert: document.getElementById('prod-alert'),
  prodPriceAchat: document.getElementById('prod-price-achat'),
  prodPricePublic: document.getElementById('prod-price-public'),
  prodTva: document.getElementById('prod-tva'),
  prodExpiration: document.getElementById('prod-expiration'),
  prodList: document.getElementById('prod-list'),

  prescriptionModal: document.getElementById('prescription-modal'),
  btnClosePrescriptionModal: document.getElementById('btn-close-prescription-modal'),
  prescriptionListContainer: document.getElementById('prescription-list-container'),

  supplierModal: document.getElementById('supplier-modal'),
  btnCloseSupplierModal: document.getElementById('btn-close-supplier-modal'),
  btnCancelSupplierModal: document.getElementById('btn-cancel-supplier-modal'),
  btnSubmitSupplierOrder: document.getElementById('btn-submit-supplier-order'),
  supplierOrderItemsBody: document.getElementById('supplier-order-items-body'),
  supplierOrderTotalCount: document.getElementById('supplier-order-total-count'),

  receiptModal: document.getElementById('receipt-modal'),
  receiptThermalPaper: document.getElementById('receipt-thermal-paper'),
  btnPrintReceipt: document.getElementById('btn-print-receipt'),
  btnNewSale: document.getElementById('btn-new-sale'),
  btnCloseReceiptModal: document.getElementById('btn-close-receipt-modal'),

  // Toasts
  toastContainer: document.getElementById('toast-container'),

  // Mobile / Responsive Layouts
  sidebarDrawer: document.getElementById('sidebar-drawer'),
  btnMobileMenuToggle: document.getElementById('btn-mobile-menu-toggle'),
  btnCloseSidebarMenu: document.getElementById('btn-close-sidebar-menu'),
  mobileThemeToggleBtn: document.getElementById('mobile-theme-toggle-btn'),
  bottomNavItems: document.querySelectorAll('.bottom-nav-item'),
  posTabBtns: document.querySelectorAll('.pos-tab-btn'),
  posLeftPane: document.getElementById('pos-left-pane'),
  posRightPane: document.getElementById('pos-right-pane'),
  btnBackToPatientsList: document.getElementById('btn-back-to-patients-list'),
  patientsDashboard: document.querySelector('.patients-dashboard')
};

// Global variables
let salesChart = null;
let categoryChart = null;

// --- INITIALIZE APPLICATION ---
document.addEventListener("DOMContentLoaded", () => {
  initDateTime();
  initTheme();
  initAudio();
  initRouter();
  initCharts();
  renderDashboard();
  renderStockTable("all");
  renderPatientsList();
  setupEventListeners();
  checkAlertsCount();
});

// --- AUDIO SYNTHESIZER (Web Audio API) ---
const audio = {
  ctx: null,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playBeep() {
    if (state.audioMuted) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime); // 1000Hz
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08); // 80ms fade out
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio Error:", e);
    }
  },
  playChime() {
    if (state.audioMuted) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();
      
      osc1.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      gain1.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      
      osc2.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1); // E5
      gain2.gain.setValueAtTime(0.06, this.ctx.currentTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      
      osc1.start();
      osc1.stop(this.ctx.currentTime + 0.15);
      osc2.start(this.ctx.currentTime + 0.1);
      osc2.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.warn("Audio Error:", e);
    }
  },
  playAlarm() {
    if (state.audioMuted) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      // Low pitched pulse alarm
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, this.ctx.currentTime); // C3 low buzz
      
      // Frequency LFO modulation for alarm effect
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 6; // 6Hz modulation
      lfoGain.gain.value = 30; // 30Hz frequency swing
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + 0.15);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35); // 350ms buzzer
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      lfo.start();
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
      lfo.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.warn("Audio Error:", e);
    }
  }
};

function initAudio() {
  updateAudioIcon();
}

function toggleAudioMute() {
  state.audioMuted = !state.audioMuted;
  localStorage.setItem('pg_audio_muted', state.audioMuted);
  updateAudioIcon();
  
  if (!state.audioMuted) {
    audio.playBeep();
  }
}

function updateAudioIcon() {
  if (state.audioMuted) {
    dom.audioToggleBtn.classList.add('muted');
    dom.audioIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z" stroke-width="2" stroke="currentColor" fill="none"/><line x1="23" y1="9" x2="17" y2="15" stroke-width="2" stroke="currentColor"/><line x1="17" y1="9" x2="23" y2="15" stroke-width="2" stroke="currentColor"/>`;
  } else {
    dom.audioToggleBtn.classList.remove('muted');
    dom.audioIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke-width="2" stroke="currentColor" fill="none"/>`;
  }
}

// --- DATE AND TIME ---
function initDateTime() {
  function updateTime() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (dom.dateTimeDisplay) {
      dom.dateTimeDisplay.textContent = now.toLocaleDateString('fr-FR', options);
    }
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// --- THEME SYSTEM ---
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('pg_theme', state.theme);
  updateThemeIcon();
  
  // Re-draw chart to match colors
  initCharts();
}

function updateThemeIcon() {
  if (state.theme === 'dark') {
    dom.themeIcon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke-width="2" stroke="currentColor" fill="none"/>`;
  } else {
    dom.themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke="currentColor" fill="none"/>`;
  }
}

// --- TOAST SYSTEM ---
function showToast(message, type = "success") {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = "";
  if (type === "success") icon = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
  else if (type === "danger") icon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  else if (type === "warning") icon = `<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  else icon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  
  toast.innerHTML = `
    <div class="toast-icon ${type}">${icon}</div>
    <span>${message}</span>
  `;
  dom.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- NAVIGATION & ROUTER ---
function initRouter() {
  dom.navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = item.getAttribute('data-tab');
      switchView(tabName);
    });
  });
}

function switchView(viewName) {
  state.currentView = viewName;
  
  dom.navItems.forEach(nav => {
    if (nav.getAttribute('data-tab') === viewName) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });

  // Sync mobile bottom navigation items
  if (dom.bottomNavItems) {
    dom.bottomNavItems.forEach(item => {
      if (item.getAttribute('data-tab') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  dom.views.forEach(view => {
    if (view.id === `view-${viewName}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Set Topbar Title
  const titles = {
    dashboard: "Tableau de Bord",
    pos: "Caisse & POS (Point de Vente)",
    stock: "Gestion des Stocks & Inventaire",
    patients: "Fiches Patients & Ordonnances"
  };
  if (dom.topbarTitle) {
    dom.topbarTitle.textContent = titles[viewName] || "PharmaGest";
  }

  // Refresh Views
  if (viewName === "dashboard") {
    renderDashboard();
    initCharts();
  } else if (viewName === "stock") {
    renderStockTable("all");
  } else if (viewName === "patients") {
    renderPatientsList();
  }
}

// --- DASHBOARD RENDER & CHARTS ---
function renderDashboard() {
  // Sales Today
  const today = "2026-06-09";
  const todaySales = state.salesHistory
    .filter(s => s.date === today)
    .reduce((sum, s) => sum + s.total, 0);
  dom.kpiSalesToday.textContent = todaySales.toFixed(2).replace('.', ',') + " €";
  
  // Prescriptions Today
  const todayOrds = state.salesHistory
    .filter(s => s.date === today)
    .reduce((sum, s) => sum + s.ord, 0);
  dom.kpiPrescriptionsToday.textContent = todayOrds;
  
  // Stock alerts count
  const lowStockItems = state.inventory.filter(item => item.stock <= item.alertLimit);
  dom.kpiLowStock.textContent = lowStockItems.length;
  
  // Expiring items
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  const expiringSoonItems = state.inventory.filter(item => {
    const expDate = new Date(item.expiration);
    return expDate <= threeMonthsFromNow && expDate >= new Date();
  });
  dom.kpiExpiringSoon.textContent = expiringSoonItems.length;

  // Stats indicators calculations
  const totalRevenue = state.salesHistory.reduce((sum, s) => sum + s.total, 0);
  const numSales = state.salesHistory.length;
  const avgBasket = numSales > 0 ? totalRevenue / numSales : 0;
  dom.statAverageBasket.textContent = avgBasket.toFixed(2).replace('.', ',') + " €";

  const outOfStockCount = state.inventory.filter(item => item.stock === 0).length;
  const ruptureRate = state.inventory.length > 0 ? (outOfStockCount / state.inventory.length) * 100 : 0;
  dom.statRuptureRate.textContent = ruptureRate.toFixed(0) + "%";
  if (ruptureRate > 15) {
    dom.statRuptureRate.className = "stat-indicator-value danger-text";
  } else if (ruptureRate > 5) {
    dom.statRuptureRate.className = "stat-indicator-value warning-text";
  } else {
    dom.statRuptureRate.className = "stat-indicator-value success-text";
  }

  // Render Top Selling Drugs Table
  dom.topSellingDrugsBody.innerHTML = "";
  const drugStats = {};
  state.patients.forEach(p => {
    p.history.forEach(h => {
      if (!drugStats[h.name]) {
        drugStats[h.name] = { name: h.name, qty: 0, revenue: 0, dci: "", list: "" };
        const invItem = state.inventory.find(item => item.name === h.name);
        if (invItem) {
          drugStats[h.name].dci = invItem.dci;
          drugStats[h.name].list = invItem.list;
        } else {
          drugStats[h.name].dci = "Molécule standard";
          drugStats[h.name].list = "Hors liste";
        }
      }
      drugStats[h.name].qty += h.qty;
      drugStats[h.name].revenue += h.price;
    });
  });
  const topSelling = Object.values(drugStats).sort((a, b) => b.qty - a.qty).slice(0, 5);
  
  if (topSelling.length === 0) {
    dom.topSellingDrugsBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:15px; color:var(--text-muted);">Aucune vente enregistrée.</td></tr>`;
  } else {
    topSelling.forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${d.name}</strong></td>
        <td style="color:var(--text-muted); font-style:italic;">${d.dci}</td>
        <td><span style="font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; ${d.list === 'Stupéfiant' ? 'background: #fee2e2; color: #ef4444;' : d.list !== 'Hors liste' ? 'background: #fef3c7; color: #d97706;' : 'background: #d1fae5; color: #059669;'}">${d.list}</span></td>
        <td>${d.qty} bte(s)</td>
        <td><strong>${d.revenue.toFixed(2).replace('.', ',')} €</strong></td>
      `;
      dom.topSellingDrugsBody.appendChild(tr);
    });
  }

  // Render Alerts List
  dom.dashboardAlerts.innerHTML = "";
  const alerts = [];
  
  // Expiration alerts
  expiringSoonItems.forEach(item => {
    alerts.push({
      type: "danger",
      title: "Péremption proche",
      desc: `${item.name} (${item.cip}) se périme le ${formatFrenchDate(item.expiration)}`,
      time: "Alerte système"
    });
  });

  // Low stock alerts
  lowStockItems.forEach(item => {
    alerts.push({
      type: item.stock === 0 ? "danger" : "warning",
      title: item.stock === 0 ? "Rupture totale de stock" : "Stock critique",
      desc: `${item.name} : reste ${item.stock} boîte(s) (Seuil : ${item.alertLimit})`,
      time: `Emplacement : ${item.shelf}`
    });
  });

  if (alerts.length === 0) {
    dom.dashboardAlerts.innerHTML = `
      <div class="alert-item success">
        <div class="alert-icon">✓</div>
        <div class="alert-info">
          <div class="alert-title">Aucune alerte urgente</div>
          <div class="alert-desc">Tous les niveaux de stocks et dates de péremption sont normaux.</div>
        </div>
      </div>
    `;
  } else {
    alerts.forEach(al => {
      const div = document.createElement('div');
      div.className = `alert-item ${al.type}`;
      div.innerHTML = `
        <div class="alert-icon">${al.type === 'danger' ? '🔴' : '⚠️'}</div>
        <div class="alert-info">
          <div class="alert-title">${al.title}</div>
          <div class="alert-desc">${al.desc}</div>
          <div class="alert-time">${al.time}</div>
        </div>
      `;
      dom.dashboardAlerts.appendChild(div);
    });
  }
}

function checkAlertsCount() {
  const lowStockCount = state.inventory.filter(item => item.stock <= item.alertLimit).length;
  const threeMonths = new Date();
  threeMonths.setMonth(threeMonths.getMonth() + 3);
  const expiringCount = state.inventory.filter(item => new Date(item.expiration) <= threeMonths).length;
  
  if (lowStockCount > 0 || expiringCount > 0) {
    dom.notifBadge.style.display = "block";
  } else {
    dom.notifBadge.style.display = "none";
  }
}

function initCharts() {
  if (typeof Chart === 'undefined') {
    console.warn("Chart.js is not defined. Skipping chart initialization.");
    return;
  }
  if (salesChart) {
    salesChart.destroy();
    salesChart = null;
  }
  if (categoryChart) {
    categoryChart.destroy();
    categoryChart = null;
  }

  const salesCanvas = document.getElementById('sales-chart');
  const catCanvas = document.getElementById('category-chart');
  if (!salesCanvas || !catCanvas) return;

  const ctx = salesCanvas.getContext('2d');
  const catCtx = catCanvas.getContext('2d');
  
  // Retrieve last 7 days of sales
  const dates = [];
  const sums = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Format for display
    const label = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    dates.push(label);
    
    const daySales = state.salesHistory
      .filter(s => s.date === dateStr)
      .reduce((sum, s) => sum + s.total, 0);
    sums.push(daySales);
  }

  const isDark = state.theme === 'dark';
  const textColor = isDark ? '#9ca3af' : '#64748b';
  const gridColor = isDark ? '#374151' : '#e2e8f0';

  // 1. Line Chart: Sales
  salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Chiffre d\'Affaires (€)',
        data: sums,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#10b981',
        pointHoverBackgroundColor: '#2563eb',
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            callback: function(value) {
              return value + ' €';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: textColor
          }
        }
      }
    }
  });

  // 2. Doughnut Chart: Classifications distribution
  const counts = { "Liste I": 0, "Liste II": 0, "Stupéfiant": 0, "Hors liste": 0 };
  state.inventory.forEach(item => {
    if (counts[item.list] !== undefined) {
      counts[item.list]++;
    } else {
      counts["Hors liste"]++;
    }
  });

  categoryChart = new Chart(catCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: ['#f43f5e', '#f59e0b', '#2563eb', '#10b981'],
        borderWidth: isDark ? 2 : 1,
        borderColor: isDark ? '#111827' : '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: textColor,
            font: { size: 10, family: 'Sora' }
          }
        }
      },
      cutout: '65%'
    }
  });
}

// --- STOCK MANAGEMENT ---
function renderStockTable(filter = "all") {
  dom.stockItemsBody.innerHTML = "";
  
  let list = state.inventory;
  const threeMonths = new Date();
  threeMonths.setMonth(threeMonths.getMonth() + 3);

  if (filter === "low") {
    list = list.filter(item => item.stock <= item.alertLimit && item.stock > 0);
  } else if (filter === "out") {
    list = list.filter(item => item.stock === 0);
  } else if (filter === "expiring") {
    list = list.filter(item => new Date(item.expiration) <= threeMonths);
  }

  if (list.length === 0) {
    dom.stockItemsBody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 40px; color: var(--text-muted);">
          Aucun produit ne correspond à ces critères.
        </td>
      </tr>
    `;
    return;
  }

  list.forEach((item, index) => {
    // Find absolute index in state.inventory
    const stateIndex = state.inventory.findIndex(invItem => invItem.cip === item.cip);
    
    // Determine stock status class
    let badgeClass = "ok";
    let badgeLabel = "En Stock";
    if (item.stock === 0) {
      badgeClass = "rupture";
      badgeLabel = "Rupture";
    } else if (item.stock <= item.alertLimit) {
      badgeClass = "bas";
      badgeLabel = `Bas (${item.stock})`;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">${item.cip}</td>
      <td style="font-weight: 600;">
        ${item.name} 
        ${item.list !== 'Hors liste' ? `<span style="font-size: 0.65rem; padding: 2px 4px; border-radius: 4px; font-weight: 700; margin-left: 6px; ${item.list === 'Stupéfiant' ? 'background: #fee2e2; color: #ef4444;' : 'background: #fef3c7; color: #d97706;'}">${item.list}</span>` : ''}
      </td>
      <td style="color: var(--text-muted); font-style: italic;">${item.dci}</td>
      <td><strong>${item.stock}</strong></td>
      <td><span class="stock-badge ${badgeClass}">${badgeLabel}</span></td>
      <td>${item.pricePublic.toFixed(2)} €</td>
      <td>${item.tva}%</td>
      <td style="color: ${new Date(item.expiration) <= threeMonths ? 'var(--danger)' : 'inherit'}; font-weight: ${new Date(item.expiration) <= threeMonths ? '600' : 'normal'};">
        ${formatFrenchDate(item.expiration)}
      </td>
      <td class="action-buttons">
        <button class="btn-icon" onclick="editProduct(${stateIndex})" title="Modifier">
          <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-icon delete" onclick="deleteProduct(${stateIndex})" title="Supprimer">
          <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </td>
    `;
    dom.stockItemsBody.appendChild(tr);
  });
}

// Product Modal handlers
function openAddProductModal() {
  dom.productModalTitle.textContent = "Nouveau Médicament";
  dom.editProdIndex.value = "";
  dom.productForm.reset();
  
  // Set default expiration date 2 years out
  const twoYearsOut = new Date();
  twoYearsOut.setFullYear(twoYearsOut.getFullYear() + 2);
  dom.prodExpiration.value = twoYearsOut.toISOString().split('T')[0];
  
  dom.productModal.classList.add('active');
}

window.editProduct = function(index) {
  const item = state.inventory[index];
  dom.productModalTitle.textContent = "Modifier Médicament";
  dom.editProdIndex.value = index;
  
  dom.prodCip.value = item.cip;
  dom.prodName.value = item.name;
  dom.prodDci.value = item.dci;
  dom.prodStock.value = item.stock;
  dom.prodAlert.value = item.alertLimit;
  dom.prodPriceAchat.value = item.priceAchat;
  dom.prodPricePublic.value = item.pricePublic;
  dom.prodTva.value = item.tva;
  dom.prodExpiration.value = item.expiration;
  dom.prodList.value = item.list;
  
  dom.productModal.classList.add('active');
};

window.deleteProduct = function(index) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${state.inventory[index].name} de la base de données ?`)) {
    const deletedName = state.inventory[index].name;
    state.inventory.splice(index, 1);
    saveState();
    renderStockTable("all");
    checkAlertsCount();
    showToast(`Produit supprimé : ${deletedName}`, "danger");
  }
};

function handleProductFormSubmit(e) {
  e.preventDefault();
  
  const index = dom.editProdIndex.value;
  const newItem = {
    cip: dom.prodCip.value,
    name: dom.prodName.value,
    dci: dom.prodDci.value,
    stock: parseInt(dom.prodStock.value, 10),
    alertLimit: parseInt(dom.prodAlert.value, 10),
    priceAchat: parseFloat(dom.prodPriceAchat.value),
    pricePublic: parseFloat(dom.prodPricePublic.value),
    tva: parseFloat(dom.prodTva.value),
    expiration: dom.prodExpiration.value,
    list: dom.prodList.value,
    shelf: index !== "" ? state.inventory[index].shelf : "Tiroir A1"
  };

  if (index !== "") {
    // Edit mode
    state.inventory[index] = newItem;
    showToast(`Médicament mis à jour : ${newItem.name}`);
  } else {
    // Add mode
    // Check if CIP already exists
    if (state.inventory.some(item => item.cip === newItem.cip)) {
      showToast("Erreur : Un médicament possède déjà ce code CIP.", "danger");
      return;
    }
    state.inventory.push(newItem);
    showToast(`Médicament enregistré : ${newItem.name}`);
  }

  saveState();
  dom.productModal.classList.remove('active');
  renderStockTable("all");
  checkAlertsCount();
}

// --- PATIENT MANAGEMENT ---
function renderPatientsList(searchQuery = "") {
  dom.patientCardsContainer.innerHTML = "";
  
  const query = searchQuery.toLowerCase().trim();
  const filtered = state.patients.filter(p => {
    return p.firstName.toLowerCase().includes(query) ||
           p.lastName.toLowerCase().includes(query) ||
           p.nir.includes(query);
  });

  if (filtered.length === 0) {
    dom.patientCardsContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 24px; font-size: 0.85rem;">
        Aucun patient trouvé.
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = `patient-list-card ${state.selectedPatient && state.selectedPatient.id === p.id ? 'active' : ''}`;
    card.innerHTML = `
      <div class="patient-list-avatar">${p.firstName.charAt(0)}${p.lastName.charAt(0)}</div>
      <div class="patient-list-info">
        <span class="patient-list-name">${p.lastName.toUpperCase()} ${p.firstName}</span>
        <span class="patient-list-secu">${p.nir}</span>
      </div>
    `;
    card.addEventListener('click', () => selectPatient(p));
    dom.patientCardsContainer.appendChild(card);
  });
}

function selectPatient(patient) {
  // Update selection CSS
  const cards = dom.patientCardsContainer.querySelectorAll('.patient-list-card');
  cards.forEach((c, idx) => {
    const p = state.patients[idx]; // Align with DOM
    if (p && p.id === patient.id) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  // Load details panel
  dom.patientDetailsPlaceholder.style.display = "none";
  dom.patientDetailsContent.style.display = "block";
  
  if (dom.patientsDashboard) {
    dom.patientsDashboard.classList.add('show-details');
  }
  
  dom.detPatientAvatar.textContent = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
  dom.detPatientName.textContent = `${patient.lastName.toUpperCase()} ${patient.firstName}`;
  
  // Format Social security number
  dom.detPatientSecu.textContent = formatNIR(patient.nir);
  
  // Calculate age
  const age = calculateAge(patient.dob);
  dom.detPatientDob.textContent = `${formatFrenchDate(patient.dob)} (${age} ans)`;
  dom.detPatientRegime.textContent = patient.regime;
  dom.detPatientRembRate.textContent = `${patient.secuRate * 100}% (Tiers payant autorisé)`;
  dom.detPatientMutuelle.textContent = `${patient.mutuelle} (${patient.mutuelleRate > 0 ? (patient.mutuelleRate * 100) + '%' : 'Pas de prise en charge'})`;
  dom.detPatientDoctor.textContent = patient.doctor;

  // Render Allergies
  dom.detPatientAllergies.innerHTML = "";
  if (!patient.allergies || patient.allergies.length === 0) {
    dom.detPatientAllergies.innerHTML = `<span style="font-size: 0.775rem; color: var(--text-muted); font-style: italic;">Aucune allergie connue sur ce dossier patient.</span>`;
  } else {
    patient.allergies.forEach(all => {
      const span = document.createElement('span');
      span.className = "allergy-badge";
      span.textContent = all;
      dom.detPatientAllergies.appendChild(span);
    });
  }

  // History timeline
  dom.patientDeliveryHistory.innerHTML = "";
  if (patient.history.length === 0) {
    dom.patientDeliveryHistory.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; padding: 20px;">
        Aucune délivrance enregistrée sur ce dossier.
      </div>
    `;
  } else {
    patient.history.forEach(hist => {
      const div = document.createElement('div');
      div.className = "history-item";
      div.innerHTML = `
        <span class="history-item-date">${formatFrenchDate(hist.date)}</span>
        <span class="history-item-name">${hist.name}</span>
        <span class="history-item-qty-price">Qté: ${hist.qty} | ${hist.price.toFixed(2)} €</span>
      `;
      dom.patientDeliveryHistory.appendChild(div);
    });
  }

  // Hook POS loader
  dom.btnLoadPatientToPos.onclick = () => {
    loadPatientToCart(patient);
    switchView("pos");
  };
}

function loadPatientToCart(patient) {
  state.selectedPatient = patient;
  
  // Update Patient UI in POS
  dom.posPatientAvatar.textContent = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;
  dom.posPatientAvatar.classList.add('loaded');
  dom.posPatientName.textContent = `${patient.lastName.toUpperCase()} ${patient.firstName}`;
  dom.posPatientSecu.textContent = `N° SS: ${formatNIR(patient.nir)} | ${patient.regime}`;
  
  dom.vitaleBtnText.textContent = "Éjecter Carte Vitale";
  dom.btnSimulateVitale.classList.add('ejected');
  
  dom.posPatientBadges.style.display = "flex";
  dom.badgeSecuPct.textContent = `Sécurité Sociale: ${patient.secuRate * 100}%`;
  dom.badgeMutuellePct.textContent = `Mutuelle: ${patient.mutuelle} (${patient.mutuelleRate * 100}%)`;
  
  showToast(`Carte Vitale lue : ${patient.firstName} ${patient.lastName.toUpperCase()}`);
  
  // Recalculate cart totals because of insurance changes
  calculateCartTotals();
  runDrugSafetyChecks();
}

function ejectPatientFromCart() {
  state.selectedPatient = null;
  
  dom.posPatientAvatar.textContent = "V";
  dom.posPatientAvatar.classList.remove('loaded');
  dom.posPatientName.textContent = "Patient Anonyme (Vente Comptoir)";
  dom.posPatientSecu.textContent = "Pas de carte vitale lue";
  
  dom.vitaleBtnText.textContent = "Insérer Carte Vitale";
  dom.btnSimulateVitale.classList.remove('ejected');
  
  dom.posPatientBadges.style.display = "none";
  
  showToast("Carte Vitale éjectée. Vente au comptoir.", "info");
  
  calculateCartTotals();
  runDrugSafetyChecks();
}

// --- POINT OF SALE (POS) & CHECKOUT ---

// Quick Search Dropdown logic
function handlePOSSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length < 2) {
    dom.posSearchResultsDropdown.classList.remove('active');
    return;
  }

  const results = state.inventory.filter(item => {
    return item.name.toLowerCase().includes(query) ||
           item.dci.toLowerCase().includes(query) ||
           item.cip.includes(query);
  });

  if (results.length === 0) {
    dom.posSearchResultsDropdown.innerHTML = `
      <div style="padding: 12px 18px; font-size: 0.85rem; color: var(--text-muted); text-align: center;">
        Aucun médicament trouvé pour "${e.target.value}"
      </div>
    `;
    dom.posSearchResultsDropdown.classList.add('active');
    return;
  }

  dom.posSearchResultsDropdown.innerHTML = "";
  results.slice(0, 5).forEach(item => {
    let stockClass = "ok";
    let stockLabel = `Stock: ${item.stock}`;
    if (item.stock === 0) {
      stockClass = "out";
      stockLabel = "RUPTURE";
    } else if (item.stock <= item.alertLimit) {
      stockClass = "low";
      stockLabel = `Stock Bas: ${item.stock}`;
    }

    const div = document.createElement('div');
    div.className = "search-result-item";
    div.innerHTML = `
      <div class="search-result-info">
        <span class="search-result-name">${item.name}</span>
        <span class="search-result-desc">${item.dci} — CIP: ${item.cip}</span>
      </div>
      <div class="search-result-price-stock">
        <span class="search-result-price">${item.pricePublic.toFixed(2)} €</span>
        <span class="search-result-stock ${stockClass}">${stockLabel}</span>
      </div>
    `;
    div.addEventListener('click', () => {
      addItemToCart(item);
      dom.posMedSearch.value = "";
      dom.posSearchResultsDropdown.classList.remove('active');
    });
    dom.posSearchResultsDropdown.appendChild(div);
  });
  
  dom.posSearchResultsDropdown.classList.add('active');
}

function addItemToCart(item) {
  if (item.stock === 0) {
    showToast(`Désolé, ${item.name} est en rupture de stock.`, "danger");
    return;
  }

  const existing = state.cart.find(c => c.cip === item.cip);
  if (existing) {
    if (existing.qty >= item.stock) {
      showToast(`Stock maximal atteint (${item.stock} unités) pour ${item.name}.`, "warning");
      return;
    }
    existing.qty++;
  } else {
    state.cart.push({
      cip: item.cip,
      name: item.name,
      dci: item.dci,
      qty: 1,
      price: item.pricePublic,
      tva: item.tva,
      list: item.list
    });
  }

  showToast(`${item.name} ajouté au panier.`);
  audio.playBeep();
  renderCart();
  runDrugSafetyChecks();
}

function changeCartQty(cip, delta) {
  const cartItem = state.cart.find(c => c.cip === cip);
  if (!cartItem) return;

  const stockItem = state.inventory.find(i => i.cip === cip);
  const newQty = cartItem.qty + delta;

  if (newQty <= 0) {
    state.cart = state.cart.filter(c => c.cip !== cip);
    showToast(`${cartItem.name} retiré du panier.`, "info");
  } else {
    if (newQty > stockItem.stock) {
      showToast(`Stock disponible insuffisant (${stockItem.stock} max).`, "warning");
      return;
    }
    if (delta > 0) audio.playBeep();
    cartItem.qty = newQty;
  }
  
  renderCart();
  runDrugSafetyChecks();
}

function removeCartItem(cip) {
  state.cart = state.cart.filter(c => c.cip !== cip);
  showToast("Article retiré.");
  renderCart();
  runDrugSafetyChecks();
}

function clearCart() {
  if (state.cart.length === 0) return;
  if (confirm("Voulez-vous vraiment vider tout le panier ?")) {
    state.cart = [];
    renderCart();
    runDrugSafetyChecks();
    showToast("Le panier a été vidé.", "info");
  }
}

function renderCart() {
  dom.posCartTableBody.innerHTML = "";
  
  if (state.cart.length === 0) {
    dom.posCartTableBody.innerHTML = `
      <tr class="empty-cart-row">
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">
          Le panier est vide. Recherchez un médicament ou insérez une Carte Vitale pour débuter la délivrance.
        </td>
      </tr>
    `;
    dom.btnValidateTransaction.disabled = true;
  } else {
    state.cart.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="font-weight: 600;">${c.name}</div>
          <div style="font-size: 0.725rem; color: var(--text-muted);">${c.dci} | CIP: ${c.cip}</div>
        </td>
        <td class="col-qty">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeCartQty('${c.cip}', -1)">-</button>
            <span class="qty-val">${c.qty}</span>
            <button class="qty-btn" onclick="changeCartQty('${c.cip}', 1)">+</button>
          </div>
        </td>
        <td>${c.price.toFixed(2)} €</td>
        <td>${c.tva}%</td>
        <td class="col-price">${(c.price * c.qty).toFixed(2)} €</td>
        <td class="col-action">
          <button class="btn-remove-item" onclick="removeCartItem('${c.cip}')" title="Supprimer">
            <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </td>
      `;
      dom.posCartTableBody.appendChild(tr);
    });
    dom.btnValidateTransaction.disabled = false;
  }

  // Count items
  const itemsCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  dom.cartCountBadge.textContent = `${itemsCount} Article${itemsCount > 1 ? 's' : ''}`;

  calculateCartTotals();
}

// DRUG SAFETY ENGINE
function runDrugSafetyChecks() {
  const alertCard = dom.safetyAlertCard;
  alertCard.className = "prescription-safety-card";
  alertCard.style.display = "none";
  
  if (state.cart.length === 0) return;

  // 0. Allergy checks (Critical Warning)
  if (state.selectedPatient && state.selectedPatient.allergies && state.selectedPatient.allergies.length > 0) {
    for (const allergy of state.selectedPatient.allergies) {
      const allergyLower = allergy.toLowerCase();
      
      const matchingDrug = state.cart.find(c => 
        (c.dci && c.dci.toLowerCase().includes(allergyLower)) || 
        (c.name && c.name.toLowerCase().includes(allergyLower))
      );
      
      if (matchingDrug) {
        dom.safetyAlertTitle.textContent = `Alerte Allergie Critique : ${allergy}`;
        dom.safetyAlertDesc.textContent = `Le patient ${state.selectedPatient.firstName} ${state.selectedPatient.lastName} présente une allergie connue à la substance active "${allergy}". Le médicament "${matchingDrug.name}" prescrit ou scanné contient ce composé actif. Risque de choc allergique sévère !`;
        alertCard.className = "prescription-safety-card critical-allergy";
        alertCard.style.display = "flex";
        audio.playAlarm();
        return;
      }
    }
  }

  const molecules = state.cart.map(c => c.dci.toLowerCase());
  
  // 1. Ibuprofen + Aspirin Interaction (Severe Danger)
  const hasIbuprofen = molecules.some(m => m.includes("ibuprofène"));
  const hasAspirin = molecules.some(m => m.includes("aspirine") || m.includes("acétylsalicylique"));
  const hasAnticoagulant = molecules.some(m => m.includes("fluindione"));
  
  if (hasIbuprofen && hasAspirin) {
    dom.safetyAlertTitle.textContent = "Interaction Grave : Ibuprofène + Aspirine";
    dom.safetyAlertDesc.textContent = "L'association de ces anti-inflammatoires majeurs décuple le risque de saignements digestifs et diminue l'activité cardio-protectrice de l'aspirine. Veuillez contacter le médecin ou proposer une alternative thérapeutique.";
    alertCard.classList.add("warning-interaction");
    alertCard.style.display = "flex";
    return;
  }

  if (hasIbuprofen && hasAnticoagulant) {
    dom.safetyAlertTitle.textContent = "Interaction Grave : AINS + Anticoagulant";
    dom.safetyAlertDesc.textContent = "L'association de Spedifen (Ibuprofène) avec Previscan (Anticoagulant oral) augmente de manière critique le risque d'hémorragie sévère.";
    alertCard.classList.add("warning-interaction");
    alertCard.style.display = "flex";
    return;
  }

  // 2. Paracetamol Overdose Warning (e.g. Doliprane + Dafalgan)
  const paracetamolItems = state.cart.filter(c => c.dci.toLowerCase().includes("paracétamol"));
  const paracetamolTotalQty = paracetamolItems.reduce((sum, c) => sum + c.qty, 0);
  
  if (paracetamolItems.length >= 2) {
    dom.safetyAlertTitle.textContent = "Alerte Surdosage : Doublon Paracétamol";
    dom.safetyAlertDesc.textContent = "Le panier contient plusieurs marques de Paracétamol (Doliprane et Dafalgan). Risque majeur de toxicité hépatique (dose max. adulte : 4g par 24h).";
    alertCard.classList.add("warning-overdose");
    alertCard.style.display = "flex";
    return;
  }
  
  // Simple single brand paracetamol high dose alert
  const dolipraneItem = state.cart.find(c => c.name.includes("Doliprane 1g"));
  if (dolipraneItem && dolipraneItem.qty >= 3) {
    dom.safetyAlertTitle.textContent = "Alerte Posologie : Paracétamol Fort volume";
    dom.safetyAlertDesc.textContent = "La quantité de Doliprane 1g délivrée est importante. Rappeler au patient de respecter l'intervalle de 4 à 6 heures entre chaque prise de 1g.";
    alertCard.classList.add("warning-overdose");
    alertCard.style.display = "flex";
    return;
  }
}

// Financial Calculations
function calculateCartTotals() {
  let subtotal = 0;
  let secuDeduct = 0;
  let mutuelleDeduct = 0;
  let totalTva = 0;

  state.cart.forEach(c => {
    const itemTotal = c.price * c.qty;
    subtotal += itemTotal;
    
    // TVA
    const tvaFrac = c.tva / (100 + c.tva);
    totalTva += itemTotal * tvaFrac;

    // Check insurance if patient loaded
    if (state.selectedPatient) {
      // OTC items (10% VAT generally or Hors Liste) are not reimbursed in France unless special prescription status, 
      // let's assume Lister items (Liste I / Liste II) are reimbursable by default.
      const isReimbursable = c.list !== "Hors liste" || c.name.includes("Doliprane") || c.name.includes("Dafalgan"); // Doliprane is commonly reimbursable
      
      if (isReimbursable) {
        const itemSecuDeduct = itemTotal * state.selectedPatient.secuRate;
        secuDeduct += itemSecuDeduct;
        
        // Mutuelle covers ticket modérateur: (itemTotal - itemSecuDeduct) * mutuelleRate
        const remaining = itemTotal - itemSecuDeduct;
        const itemMutuelleDeduct = remaining * state.selectedPatient.mutuelleRate;
        mutuelleDeduct += itemMutuelleDeduct;
      }
    }
  });

  const finalPrice = subtotal - secuDeduct - mutuelleDeduct;

  // DOM Write
  dom.calcTotalPublic.textContent = subtotal.toFixed(2).replace('.', ',') + " €";
  dom.calcSecuDeduct.textContent = `- ${secuDeduct.toFixed(2).replace('.', ',')} €`;
  dom.calcMutuelleDeduct.textContent = `- ${mutuelleDeduct.toFixed(2).replace('.', ',')} €`;
  dom.calcTva.textContent = totalTva.toFixed(2).replace('.', ',') + " €";
  dom.calcFinalPrice.textContent = finalPrice.toFixed(2).replace('.', ',') + " €";
  
  // Update cash math
  updateCashDrawerChange(finalPrice);
}

// Payment method changes
function selectPaymentMethod(element) {
  dom.paymentMethods.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  
  const method = element.getAttribute('data-method');
  const finalPriceStr = dom.calcFinalPrice.textContent.replace(' €', '').replace(',', '.');
  const finalPrice = parseFloat(finalPriceStr);
  
  const numpadTitle = document.getElementById('numpad-title');
  const numpadWrapper = document.getElementById('numpad-wrapper');
  const cashChangeCalc = document.getElementById('cash-change-calculator');

  if (method === 'cash') {
    state.cashEntered = "";
    dom.cashEnteredVal.textContent = "0.00 €";
    dom.cashChangeVal.textContent = "0.00 €";
    if (numpadTitle) numpadTitle.style.display = 'block';
    if (numpadWrapper) numpadWrapper.style.display = 'grid';
    if (cashChangeCalc) cashChangeCalc.style.display = 'flex';
  } else {
    if (numpadTitle) numpadTitle.style.display = 'none';
    if (numpadWrapper) numpadWrapper.style.display = 'none';
    if (cashChangeCalc) cashChangeCalc.style.display = 'none';
  }
}

// Numpad key handlers
function handleNumpadPress(key) {
  const methodActive = document.querySelector('.btn-payment-method.active').getAttribute('data-method');
  if (methodActive !== 'cash') return;

  if (key === 'backspace') {
    state.cashEntered = state.cashEntered.slice(0, -1);
  } else if (key === '.') {
    if (!state.cashEntered.includes('.')) {
      state.cashEntered += '.';
    }
  } else {
    // Limit to 2 decimals
    if (state.cashEntered.includes('.')) {
      const parts = state.cashEntered.split('.');
      if (parts[1].length >= 2) return;
    }
    state.cashEntered += key;
  }

  const val = parseFloat(state.cashEntered) || 0;
  dom.cashEnteredVal.textContent = val.toFixed(2) + " €";
  
  const finalPrice = parseFloat(dom.calcFinalPrice.textContent.replace(' €', '').replace(',', '.'));
  updateCashDrawerChange(finalPrice);
}

function updateCashDrawerChange(finalPrice) {
  const val = parseFloat(state.cashEntered) || 0;
  const change = val - finalPrice;
  if (change > 0) {
    dom.cashChangeVal.textContent = change.toFixed(2).replace('.', ',') + " €";
  } else {
    dom.cashChangeVal.textContent = "0,00 €";
  }
}

// Transaction Validation
function validateTransaction() {
  if (state.cart.length === 0) return;

  const finalPrice = parseFloat(dom.calcFinalPrice.textContent.replace(' €', '').replace(',', '.'));
  const methodActive = document.querySelector('.btn-payment-method.active').getAttribute('data-method');

  // Verify cash amount if cash method selected
  if (methodActive === 'cash' && state.cashEntered !== "") {
    const val = parseFloat(state.cashEntered) || 0;
    if (val < finalPrice) {
      showToast("Erreur : Somme d'espèces insuffisante.", "danger");
      return;
    }
  }

  // Deduct Stocks
  state.cart.forEach(item => {
    const stockItem = state.inventory.find(i => i.cip === item.cip);
    if (stockItem) {
      stockItem.stock = Math.max(0, stockItem.stock - item.qty);
    }
  });

  // Record Sales history
  const todayStr = "2026-06-09";
  const patientName = state.selectedPatient ? `${state.selectedPatient.lastName.toUpperCase()} ${state.selectedPatient.firstName}` : "Anonyme";
  const hasPrescription = state.cart.some(c => c.list !== "Hors liste");

  state.salesHistory.push({
    date: todayStr,
    total: finalPrice,
    ord: hasPrescription ? 1 : 0,
    patient: patientName
  });

  // Add delivery record to patient database if loaded
  if (state.selectedPatient) {
    const patientRecord = state.patients.find(p => p.id === state.selectedPatient.id);
    if (patientRecord) {
      state.cart.forEach(c => {
        patientRecord.history.unshift({
          date: todayStr,
          name: c.name,
          qty: c.qty,
          price: c.price * c.qty
        });
      });
    }
  }

  saveState();
  showToast("Vente validée et enregistrée en base.");
  audio.playChime();

  // Generate Receipt
  generateThermalReceipt(methodActive);
  
  // Show Receipt Modal
  dom.receiptModal.classList.add('active');
}

function generateThermalReceipt(paymentMethod) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR');
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const cashier = "Anass HOUDZI";
  
  let patientBlock = "";
  if (state.selectedPatient) {
    patientBlock = `
PATIENT: ${state.selectedPatient.lastName.toUpperCase()} ${state.selectedPatient.firstName}
SS: ${formatNIR(state.selectedPatient.nir)}
COUV RO: ${(state.selectedPatient.secuRate * 100)}% | RC: MGEN
--------------------------------`;
  } else {
    patientBlock = `
PATIENT: Vente Comptoir Anonyme
--------------------------------`;
  }

  let itemsRows = "";
  let subtotal = 0;
  let secuDeduct = 0;
  let mutuelleDeduct = 0;

  state.cart.forEach(c => {
    const itemTotal = c.price * c.qty;
    subtotal += itemTotal;

    let reimbDetails = "";
    if (state.selectedPatient) {
      const isReimbursable = c.list !== "Hors liste" || c.name.includes("Doliprane") || c.name.includes("Dafalgan");
      if (isReimbursable) {
        const ro = itemTotal * state.selectedPatient.secuRate;
        const rc = (itemTotal - ro) * state.selectedPatient.mutuelleRate;
        reimbDetails = `\n  SS:-${ro.toFixed(2)} Mut:-${rc.toFixed(2)}`;
        secuDeduct += ro;
        mutuelleDeduct += rc;
      }
    }

    itemsRows += `
${c.name.padEnd(20).substring(0, 20)} x${c.qty} ${(c.price * c.qty).toFixed(2).padStart(8)}€${reimbDetails}`;
  });

  const finalPrice = subtotal - secuDeduct - mutuelleDeduct;
  let payStr = "";
  if (paymentMethod === 'cash') {
    const cashVal = parseFloat(state.cashEntered) || finalPrice;
    payStr = `
ESPECES REÇUES:      ${cashVal.toFixed(2).padStart(8)}€
RENDU:               ${(cashVal - finalPrice).toFixed(2).padStart(8)}€`;
  } else {
    const paymentLabel = paymentMethod === 'card' ? 'CARTE BANCAIRE' : 'CHEQUE';
    payStr = `
MODE REGLEMENT:      ${paymentLabel}`;
  }

  dom.receiptThermalPaper.innerHTML = `
<div class="receipt-center">
  <div class="receipt-title">PHARMACIE CENTRALE</div>
  <div>75 Avenue des Champs-Élysées</div>
  <div>75008 Paris - 01 40 20 10 30</div>
  <div>RPPS: 10001234567</div>
</div>
<div class="receipt-divider"></div>
<div class="receipt-grid-row">
  <span>Date: ${dateStr}</span>
  <span>Heure: ${timeStr}</span>
</div>
<div>Opérateur: ${cashier}</div>
<div class="receipt-divider"></div>
${patientBlock}
<div class="receipt-items-list">
  ${itemsRows}
</div>
<div class="receipt-double-divider"></div>
<div class="receipt-bold-row">
  <span>TOTAL PUBLIC BRUT:</span>
  <span>${subtotal.toFixed(2)} €</span>
</div>
<div class="receipt-grid-row" style="font-size: 0.7rem;">
  <span>Tiers-Payant Sécu (RO):</span>
  <span>-${secuDeduct.toFixed(2)} €</span>
</div>
<div class="receipt-grid-row" style="font-size: 0.7rem;">
  <span>Part Complémentaire (RC):</span>
  <span>-${mutuelleDeduct.toFixed(2)} €</span>
</div>
<div class="receipt-bold-row large">
  <span>NET A PAYER PATIENT:</span>
  <span>${finalPrice.toFixed(2)} €</span>
</div>
${payStr}
<div class="receipt-divider"></div>
<div class="receipt-center" style="font-size: 0.65rem;">
  Recapitulatif TVA:
  TVA 2.10% (Remb.) / TVA 10.00% (OTC)
  Merci de votre visite.<br>
  Soignez-vous bien !
</div>
  `;
}

function handleNewSaleInit() {
  state.cart = [];
  renderCart();
  runDrugSafetyChecks();
  dom.receiptModal.classList.remove('active');
  state.cashEntered = "";
  dom.cashEnteredVal.textContent = "0.00 €";
  dom.cashChangeVal.textContent = "0.00 €";
  
  const cardBtn = Array.from(dom.paymentMethods).find(btn => btn.getAttribute('data-method') === 'card');
  if (cardBtn) {
    selectPaymentMethod(cardBtn);
  }
}

// Simulated Vitale loader triggers modal of choices
function simulateCarteVitaleInsert() {
  if (state.selectedPatient) {
    ejectPatientFromCart();
    return;
  }

  // Create overlay modal of mock patients to pick one
  const backdrop = document.createElement('div');
  backdrop.className = "modal-overlay active";
  backdrop.style.zIndex = "2000";
  
  const card = document.createElement('div');
  card.className = "modal-card";
  card.style.width = "400px";
  
  card.innerHTML = `
    <div class="modal-header">
      <h3>Lecteur Carte Vitale (Simulé)</h3>
      <button class="btn-close-modal" id="btn-close-vitale-sim">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body" style="padding: 20px;">
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Veuillez sélectionner une Carte Vitale à insérer dans le lecteur :</p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${state.patients.map(p => `
          <button class="btn-cancel" style="text-align: left; padding: 12px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 0.85rem;" data-pat-id="${p.id}">
            <span>${p.lastName.toUpperCase()} ${p.firstName}</span>
            <span style="font-family: monospace; font-size: 0.725rem;">SS: ${p.nir.substring(0,3)}...</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  backdrop.appendChild(card);
  document.body.appendChild(backdrop);

  // Bind clicks
  card.querySelectorAll('[data-pat-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-pat-id');
      const patient = state.patients.find(p => p.id === id);
      if (patient) {
        loadPatientToCart(patient);
      }
      backdrop.remove();
    });
  });

  card.querySelector('#btn-close-vitale-sim').addEventListener('click', () => {
    backdrop.remove();
  });
  
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
}

// Simulated barcode scanner
function simulateBarcodeScan() {
  // Grab a random medication from inventory that has stock
  const instock = state.inventory.filter(i => i.stock > 0);
  if (instock.length === 0) {
    showToast("Aucun produit en stock à scanner !", "warning");
    return;
  }
  const randomMed = instock[Math.floor(Math.random() * instock.length)];
  showToast(`🔍 Scan CIP détecté : ${randomMed.cip}`);
  addItemToCart(randomMed);
}

// --- SETUP EVENT LISTENERS ---
function setupEventListeners() {
  // Create and inject mobile sidebar backdrop overlay dynamically
  const sidebarOverlay = document.createElement('div');
  sidebarOverlay.className = 'sidebar-overlay';
  sidebarOverlay.id = 'sidebar-backdrop-overlay';
  document.body.appendChild(sidebarOverlay);

  // Mobile Hamburger Toggle
  if (dom.btnMobileMenuToggle) {
    dom.btnMobileMenuToggle.addEventListener('click', () => {
      dom.sidebarDrawer.classList.add('open');
      sidebarOverlay.classList.add('active');
    });
  }

  // Mobile Sidebar Close button
  if (dom.btnCloseSidebarMenu) {
    dom.btnCloseSidebarMenu.addEventListener('click', () => {
      dom.sidebarDrawer.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Backdrop overlay click
  sidebarOverlay.addEventListener('click', () => {
    dom.sidebarDrawer.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });

  // Mobile Theme Toggle
  if (dom.mobileThemeToggleBtn) {
    dom.mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Mobile Bottom Nav Bar Tab Switcher
  dom.bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      switchView(tabName);
      
      // Update active nav item style
      dom.bottomNavItems.forEach(b => b.classList.remove('active'));
      item.classList.add('active');
      
      // Auto close sidebar if open
      dom.sidebarDrawer.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  });

  // POS Mobile Switcher Tabs
  dom.posTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.posTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const pane = btn.getAttribute('data-pos-pane');
      if (pane === 'left') {
        dom.posLeftPane.classList.add('mobile-active-pane');
        dom.posRightPane.classList.remove('mobile-active-pane');
      } else {
        dom.posLeftPane.classList.remove('mobile-active-pane');
        dom.posRightPane.classList.add('mobile-active-pane');
      }
    });
  });

  // Patient Mobile Back Button
  if (dom.btnBackToPatientsList) {
    dom.btnBackToPatientsList.addEventListener('click', () => {
      dom.patientsDashboard.classList.remove('show-details');
    });
  }

  // Search panels
  if (dom.globalSearch) {
    dom.globalSearch.addEventListener('input', (e) => {
      const query = e.target.value;
      if (state.currentView !== 'patients') {
        switchView('patients');
        dom.patientPaneSearch.value = query;
        renderPatientsList(query);
      } else {
        dom.patientPaneSearch.value = query;
        renderPatientsList(query);
      }
    });
  }

  dom.patientPaneSearch.addEventListener('input', (e) => {
    renderPatientsList(e.target.value);
  });

  dom.posMedSearch.addEventListener('input', handlePOSSearch);
  
  // Close search overlay on click outside
  document.addEventListener('click', (e) => {
    if (e.target !== dom.posMedSearch && !dom.posSearchResultsDropdown.contains(e.target)) {
      dom.posSearchResultsDropdown.classList.remove('active');
    }
  });

  // Buttons POS
  dom.btnSimulateVitale.addEventListener('click', simulateCarteVitaleInsert);
  dom.btnScanBarcode.addEventListener('click', simulateBarcodeScan);
  dom.btnEmptyCart.addEventListener('click', clearCart);
  dom.btnValidateTransaction.addEventListener('click', validateTransaction);
  
  // Theme Toggle
  dom.themeToggleBtn.addEventListener('click', toggleTheme);

  // Payment Methods clicks
  dom.paymentMethods.forEach(btn => {
    btn.addEventListener('click', () => selectPaymentMethod(btn));
  });

  // Numpad clicks
  dom.numpadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-num');
      handleNumpadPress(key);
    });
  });

  // Modal Stock closures
  dom.btnOpenAddProductModal.addEventListener('click', openAddProductModal);
  dom.btnCancelProductModal.addEventListener('click', () => dom.productModal.classList.remove('active'));
  dom.btnCloseProductModal.addEventListener('click', () => dom.productModal.classList.remove('active'));
  dom.productForm.addEventListener('submit', handleProductFormSubmit);
  
  // Kaggle Dataset Import
  if (dom.btnLoadKaggleDataset) {
    dom.btnLoadKaggleDataset.addEventListener('click', loadEMADataSet);
  }
  
  // Stock Filters
  dom.stockFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.stockFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-stock-filter');
      renderStockTable(filter);
    });
  });

  // Print modal closures
  dom.btnCloseReceiptModal.addEventListener('click', () => dom.receiptModal.classList.remove('active'));
  dom.btnNewSale.addEventListener('click', handleNewSaleInit);
  dom.btnPrintReceipt.addEventListener('click', () => {
    window.print();
  });

  // F12 key listener for POS validation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' && state.currentView === 'pos' && !dom.btnValidateTransaction.disabled) {
      e.preventDefault();
      validateTransaction();
    }
  });

  // Audio Toggle
  dom.audioToggleBtn.addEventListener('click', toggleAudioMute);

  // Prescription Modal
  dom.btnScanPrescription.addEventListener('click', () => {
    initPrescriptionScanner();
    dom.prescriptionModal.classList.add('active');
  });
  dom.btnClosePrescriptionModal.addEventListener('click', () => {
    dom.prescriptionModal.classList.remove('active');
  });
  dom.prescriptionModal.addEventListener('click', (e) => {
    if (e.target === dom.prescriptionModal) dom.prescriptionModal.classList.remove('active');
  });

  // Supplier Modal
  if (dom.btnOpenSupplierModal) {
    dom.btnOpenSupplierModal.addEventListener('click', openSupplierModal);
  }
  if (dom.btnDashboardOrderRefill) {
    dom.btnDashboardOrderRefill.addEventListener('click', openSupplierModal);
  }
  dom.btnCloseSupplierModal.addEventListener('click', () => {
    dom.supplierModal.classList.remove('active');
  });
  dom.btnCancelSupplierModal.addEventListener('click', () => {
    dom.supplierModal.classList.remove('active');
  });
  dom.supplierModal.addEventListener('click', (e) => {
    if (e.target === dom.supplierModal) dom.supplierModal.classList.remove('active');
  });
  dom.btnSubmitSupplierOrder.addEventListener('click', submitSupplierOrder);
}

// --- UTILITY HELPER FUNCTIONS ---
function formatFrenchDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatNIR(nir) {
  if (!nir || nir.length !== 15) return nir;
  // Format: 1 85 02 75 125 456 22
  return `${nir.substring(0, 1)} ${nir.substring(1, 3)} ${nir.substring(3, 5)} ${nir.substring(5, 7)} ${nir.substring(7, 10)} ${nir.substring(10, 13)} ${nir.substring(13, 15)}`;
}

function calculateAge(dobStr) {
  const birthday = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

function loadEMADataSet() {
  showToast("Chargement du dataset en cours...", "info");
  
  fetch('imported_drugs.json')
    .then(response => {
      if (!response.ok) throw new Error("Fichier introuvable");
      return response.json();
    })
    .then(data => {
      let addedCount = 0;
      data.forEach(importedItem => {
        if (!state.inventory.some(existing => existing.cip === importedItem.cip)) {
          state.inventory.push(importedItem);
          addedCount++;
        }
      });
      
      if (addedCount > 0) {
        saveState();
        renderStockTable("all");
        checkAlertsCount();
        showToast(`${addedCount} médicaments importés avec succès depuis le dataset EMA !`, "success");
      } else {
        showToast("Le dataset EMA est déjà importé.", "info");
      }
    })
    .catch(error => {
      console.error(error);
      showToast("Erreur lors du chargement du dataset. Vérifiez le serveur.", "danger");
    });
}

// --- PRESCRIPTION SCANNER SIMULATOR & SUPPLIER REORDERING ---

function initPrescriptionScanner() {
  const prescriptions = [
    {
      id: "ord1",
      patientId: "p1",
      patientName: "Jean Dupont",
      doctor: "Dr. Jean-Pierre Laroche",
      date: "10/06/2026",
      items: [
        { cip: "3400930234589", qty: 1 }, // Amoxicilline Biogaran 1g (Allergène !)
        { cip: "3400931201944", qty: 2 }  // Doliprane 1g
      ]
    },
    {
      id: "ord2",
      patientId: "p2",
      patientName: "Marie Martin",
      doctor: "Dr. Sandrine Vasseur",
      date: "10/06/2026",
      items: [
        { cip: "3400932244558", qty: 1 }, // Tahor 10mg
        { cip: "3400931201944", qty: 2 }  // Doliprane 1g
      ]
    },
    {
      id: "ord3",
      patientId: "p3",
      patientName: "Pierre Dubois",
      doctor: "Dr. Marc Valette",
      date: "10/06/2026",
      items: [
        { cip: "3400936636750", qty: 1 }, // Spedifen 400mg (Ibuprofène - Allergène !)
        { cip: "3400931920845", qty: 1 }  // Kardegic 75mg
      ]
    },
    {
      id: "ord4",
      patientId: "p4",
      patientName: "Sophie Lefèvre",
      doctor: "Dr. Amélie Bertrand",
      date: "10/06/2026",
      items: [
        { cip: "3400932549687", qty: 1 }, // Ventoline Spray 100µg (Salbutamol - Allergène !)
        { cip: "3400930056112", qty: 1 }  // Inexium 20mg
      ]
    }
  ];

  dom.prescriptionListContainer.innerHTML = "";
  prescriptions.forEach(p => {
    const pCard = document.createElement("div");
    pCard.className = "prescription-import-item";
    pCard.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    
    const patient = state.patients.find(pt => pt.id === p.patientId);
    let allergenInfo = "";
    if (patient && patient.allergies && patient.allergies.length > 0) {
      allergenInfo = `<span style="font-size: 0.7rem; color: var(--danger); font-weight: 600;">(Allergie : ${patient.allergies.join(", ")})</span>`;
    }

    pCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-weight: 700; font-size: 0.85rem; color: var(--text-main);">${p.patientName} ${allergenInfo}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${p.doctor} | ${p.date}</span>
      </div>
      <button class="btn-submit" style="padding: 6px 12px; font-size: 0.75rem; background: rgba(124, 58, 237, 0.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 99px;">
        Importer
      </button>
    `;

    pCard.addEventListener("mouseenter", () => {
      pCard.style.borderColor = "var(--primary)";
      pCard.style.background = "rgba(124, 58, 237, 0.05)";
    });
    pCard.addEventListener("mouseleave", () => {
      pCard.style.borderColor = "var(--border)";
      pCard.style.background = "var(--bg-card)";
    });

    pCard.addEventListener("click", () => {
      importPrescription(p);
    });

    dom.prescriptionListContainer.appendChild(pCard);
  });
}

function importPrescription(p) {
  const patient = state.patients.find(pt => pt.id === p.patientId);
  if (patient) {
    loadPatientToCart(patient);
  } else {
    showToast("Patient non trouvé", "danger");
    return;
  }

  // Clear cart
  state.cart = [];

  let loadedCount = 0;
  p.items.forEach(pItem => {
    const invItem = state.inventory.find(i => i.cip === pItem.cip);
    if (invItem) {
      state.cart.push({
        cip: invItem.cip,
        name: invItem.name,
        dci: invItem.dci,
        qty: pItem.qty,
        price: invItem.pricePublic,
        tva: invItem.tva,
        list: invItem.list
      });
      loadedCount++;
    }
  });

  renderCart();
  runDrugSafetyChecks();
  
  dom.prescriptionModal.classList.remove('active');
  audio.playBeep();
  showToast(`Ordonnance de ${p.patientName} importée (${loadedCount} produits)`);
  switchView("pos");
}

function openSupplierModal() {
  const lowStockItems = state.inventory.filter(item => item.stock <= item.alertLimit);
  
  dom.supplierOrderItemsBody.innerHTML = "";
  
  if (lowStockItems.length === 0) {
    dom.supplierOrderItemsBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">
          Aucun produit ne nécessite de réapprovisionnement. Tous les stocks sont au-dessus des seuils d'alerte.
        </td>
      </tr>
    `;
    dom.supplierOrderTotalCount.textContent = "0";
    dom.btnSubmitSupplierOrder.disabled = true;
    dom.btnSubmitSupplierOrder.style.opacity = "0.5";
    dom.btnSubmitSupplierOrder.style.cursor = "not-allowed";
  } else {
    dom.btnSubmitSupplierOrder.disabled = false;
    dom.btnSubmitSupplierOrder.style.opacity = "1";
    dom.btnSubmitSupplierOrder.style.cursor = "pointer";
    
    let totalOrdered = 0;
    
    lowStockItems.forEach(item => {
      const orderQty = Math.max(10, item.alertLimit * 3 - item.stock);
      totalOrdered += orderQty;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--text-main);">${item.name}</td>
        <td><span class="badge ${item.stock === 0 ? 'badge-danger' : 'badge-warning'}">${item.stock}</span></td>
        <td>${item.alertLimit}</td>
        <td style="font-weight: 700; color: var(--primary);">+${orderQty}</td>
      `;
      dom.supplierOrderItemsBody.appendChild(tr);
    });
    
    dom.supplierOrderTotalCount.textContent = totalOrdered;
  }
  
  dom.supplierModal.classList.add("active");
}

function submitSupplierOrder() {
  const lowStockItems = state.inventory.filter(item => item.stock <= item.alertLimit);
  if (lowStockItems.length === 0) return;
  
  let refilledCount = 0;
  lowStockItems.forEach(item => {
    const orderQty = Math.max(10, item.alertLimit * 3 - item.stock);
    item.stock += orderQty;
    refilledCount++;
  });
  
  saveState();
  renderStockTable("all");
  checkAlertsCount();
  
  dom.supplierModal.classList.remove("active");
  audio.playChime();
  showToast(`Commande envoyée ! ${refilledCount} références réapprovisionnées avec succès.`, "success");
  
  // Update dashboard if currently active
  if (state.currentView === "dashboard") {
    renderDashboard();
    initCharts();
  }
}
