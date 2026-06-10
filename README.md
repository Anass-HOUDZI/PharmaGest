# 🩺 PharmaGest — Système SaaS de Gestion de Pharmacie & POS

PharmaGest est une application web moderne (Single Page Application - SPA) de type SaaS, conçue pour optimiser, simplifier et sécuriser la gestion quotidienne d'une officine de pharmacie. Offrant un design épuré, digne de confiance et premium basé sur une charte graphique professionnelle (Bleu Roi propre et rassurant et Vert Émeraude vibrant), PharmaGest propose une expérience utilisateur (UX) fluide, dynamique et ultra-réactive pour les pharmaciens.

---

## 🚀 But & Contexte du Projet

Dans le milieu de la pharmacie, les logiciels de gestion d'officine (LGO) traditionnels sont souvent lourds visuellement, obsolètes ergonomiquement et complexes d'utilisation. **PharmaGest** a été pensé pour réinventer l'ergonomie de ces interfaces d'officine à travers trois axes :
1. **La centralisation des flux** : Encaissement rapide (caisse tactile/POS), gestion des stocks (inventaires, réapprovisionnement automatique) et dossiers patients sur une page unique (SPA) fluide, sans rechargement de page.
2. **Une lisibilité maximale** : Un design moderne, épuré et parfaitement aéré sur fond de contrastes doux (fonds bleutés ultra légers en mode clair et contrastes optimisés en mode sombre).
3. **Une robustesse optimale** : Des contrôles défensifs et des processus tolérants aux pannes (par exemple, gestion du stockage local et chargement dynamique des dépendances) assurant une continuité de service pour le pharmacien.

---

## 🛠️ Stack Technique

L'application est entièrement construite à l'aide de technologies standardisées du web moderne (Web Standards), garantissant une performance maximale et une maintenance facilitée sans dépendances lourdes :

* **HTML5 & CSS3 Standard** : Structure sémantique complète et design system basé sur des variables CSS, flexbox, grid layouts et animations fluides.
* **JavaScript ES6+ (Vanilla)** : Routeur interne personnalisé sans rechargement de page, gestion globale de l'état de l'application (State Management), et manipulations dynamiques du DOM.
* **Chart.js** : Librairie de visualisation de données pour les graphiques analytiques du Tableau de bord (ventes, ordonnances).
* **Vite** : Outil de build ultra-rapide pour le serveur de développement local et le packaging de production.

---

## 🎨 Design System & Esthétique Premium

PharmaGest utilise une charte graphique contemporaine axée sur la lisibilité et l'aspect médical professionnel :

### Charte Couleur (Variables CSS)
- **Couleur principale (Primary)** : `#2563eb` (Bleu Roi - inspire la confiance, le calme et la rigueur).
- **Survol principal (Primary Hover)** : `#1d4ed8` (Bleu de Prusse soutenu).
- **Couleur d'accentuation (Accent)** : `#10b981` (Vert Émeraude - rappelle la croix verte pharmaceutique et le soin).
- **Survol d'accentuation (Accent Hover)** : `#059669` (Vert forêt doux).
- **Fonds (Backgrounds)** : Dégradés et fonds bleutés ultra légers (`#eff6ff` à `#dbeafe`) en mode clair pour réduire la fatigue oculaire lors des longues gardes.
- **Mode Sombre** : Habillage HSL adapté avec des contrastes élevés (`#111827` à `#1f2937`) pour le confort de nuit.

### Typographie
- Chargement dynamique de polices modernes comme **Outfit** et **Inter** (via Google Fonts) pour une lecture rapide des noms de médicaments et des codes CIP.
- Utilisation de **JetBrains Mono** pour l'affichage brut des codes barres et des données numériques (tarifs, CIP, taux de remboursement).

### Animations et Micro-interactions
- Transitions de fondu-enchaîné lors du changement d'onglet.
- États de survol fluides avec ombres portées douces (`box-shadow`) sur les cartes interactives et les boutons d'action.
- Effets d'incursion fluides (`toastIn`) pour les notifications toasts du système.

---

## 📦 Description des Modules Applicatifs

### 1. 📊 Tableau de Bord (Dashboard)
- **KPIs en Temps Réel** : Chiffre d'affaires journalier brut, volume d'ordonnances traitées, nombre de produits sous le seuil d'alerte critique et lots proches de la péremption.
- **Graphiques analytiques** : 
  - *Ventes hebdomadaires* : Graphique linéaire affichant la courbe de revenus.
  - *Répartition par classification* : Diagramme en anneau segmentant l'inventaire en Liste I, Liste II, Stupéfiants et Hors liste.
- **Alertes Urgentes** : Panneau récapitulatif listant dynamiquement les ruptures totales, les stocks bas et les dates de péremption dépassées ou proches.
- **Performances & Approvisionnement** : Affiche le panier moyen client et le taux de rupture global, accompagné d'un bouton d'action rapide pour générer une commande de réapprovisionnement automatique.

### 2. 🛒 Caisse & POS (Point de Vente)
- **Gestion des patients par carte Vitale** : Lecture simulée d'une carte Vitale ouvrant un profil patient, ce qui applique automatiquement son taux de prise en charge RO (Sécurité Sociale) et RC (Mutuelle) aux calculs de tarification.
- **Panier dynamique** : Ajout rapide de produits par code CIP, DCI ou nom. Gestion à la volée des quantités (contrôlée par le stock réel disponible) et suppressions.
- **Moteur de calcul financier** : Ventilation en temps réel du total public brut, de la part Sécurité Sociale (Régime Obligatoire), de la part Mutuelle (Régime Complémentaire), de la TVA cumulée, et du reste à payer net pour le patient.
- **Module d'encaissement et monnaie** : Clavier numérique tactile pour saisir les espèces reçues et calculer le rendu de monnaie en temps réel.
- **Ticket thermique** : Génération et aperçu d'un ticket de caisse thermique officiel de pharmacie avec possibilité de simulation d'impression physique (`window.print()`).

### 3. 📦 Gestion des Stocks (Inventaire)
- **Filtrage à facettes vertical** : Tri instantané de l'inventaire en 4 catégories : Tous, Stocks Bas, En Rupture, Périmés (< 3 mois).
- **Importation Dataset EMA** : Bouton d'action permettant de précharger un registre réaliste de plus de 60 médicaments issus de l'Agence Européenne des Médicaments (EMA).
- **Ajout & Édition de Produits** : Formulaire modal soigné en grille à deux colonnes gérant les codes CIP (13 chiffres), les noms commerciaux, les DCI, les stocks initiaux, les seuils d'alerte, les prix d'achat/public, la TVA (2.1%, 10.0%, 20.0%), les dates de péremption et la classification réglementaire.

### 4. 👥 Patients & Dossiers
- **Fiches Profils Patients** : Liste de recherche à gauche, panneau de détails administratifs et médicaux à droite.
- **Données Administratives** : Date de naissance (avec calcul de l'âge), numéro de sécurité sociale (NIR formaté selon les normes françaises), régime d'assurance maladie et médecin traitant.
- **Historique de délivrance** : Chronologie détaillée de tous les médicaments délivrés au patient (date, nom, quantité et prix).

---

## 🛡️ Moteur de Sécurité Thérapeutique (Safety Engine)

L'une des fonctionnalités phares de PharmaGest est son analyse automatique de la sécurité lors de la préparation du panier en caisse. À chaque changement d'article, le système effectue des vérifications croisées :

1. **Alerte Allergie Critique** : Si le patient chargé présente une allergie (par exemple à l'Amoxicilline ou à l'Ibuprofène) et qu'un médicament contenant cette substance active est ajouté au panier, une alerte rouge critique s'affiche et un signal sonore d'alarme retentit pour bloquer la délivrance.
2. **Interaction Médicamenteuse Grave** :
   - *AINS + Aspirine* : L'association d'Ibuprofène (Spedifen) et d'Acide acétylsalicylique (Kardegic) augmente drastiquement le risque de saignements gastro-intestinaux.
   - *AINS + Anticoagulant oral* : L'association d'Ibuprofène et de Fluindione (Previscan) multiplie les risques hémorragiques.
3. **Alerte Doublon / Surdosage de Paracétamol** : Détecte l'ajout simultané de plusieurs marques contenant du paracétamol (par exemple Doliprane et Dafalgan) pour prévenir les risques d'hépatotoxicité.
4. **Volume Important** : Alerte de posologie si une quantité anormalement élevée de paracétamol fort dosage (1g) est ajoutée au panier.

---

## 🔊 Synthétiseur Audio Intégré (Web Audio API)

Afin d'imiter le fonctionnement matériel des caisses d'officine réelles sans surcharger le projet avec des fichiers audio lourds (MP3/WAV), PharmaGest utilise l'API **Web Audio** pour générer des signaux synthétiques directement en code :
- **Bip standard (Scanner)** : Onde sinusoïdale de 1000 Hz d'une durée de 80ms avec fondu exponentiel pour simuler la lecture d'un code-barres.
- **Carillon de succès (Validation)** : Suite d'accords harmoniques majeurs (Do5 puis Mi5) pour valider l'enregistrement d'une vente.
- **Buzzer d'alerte (Danger Thérapeutique)** : Onde en dent de scie à basse fréquence (120 Hz) modulée par un LFO (oscillateur basse fréquence) de 6 Hz pour générer un son d'alarme vibrant.
- *Option de coupure sonore (Mute)* : Un bouton dans le header permet de couper/activer les sons à tout moment.

---

## ⚙️ Résilience et Robustesse du Code

L'application a été blindée pour éviter tout plantage global de l'interface en production :
- **Résilience JSON LocalStorage** : Les accès aux données de `localStorage` sont entièrement encadrés par des blocs `try...catch`. Si les données du navigateur sont corrompues, PharmaGest se réinitialise gracieusement avec les données mockées par défaut sans interrompre l'expérience utilisateur.
- **Sécurisation du CDN Chart.js** : La fonction `initCharts` vérifie la présence de la variable globale `Chart`. Si le CDN de Chart.js est indisponible (coupure réseau ou blocage du script tiers), l'application désactive silencieusement les graphiques tout en maintenant opérationnels les onglets de caisse, d'inventaire et d'encaissement.
- **Contrôles Défensifs du DOM** : Tous les éléments manipulés dynamiquement qui peuvent être omis du HTML (ex: barre de recherche globale, affichage date-heure, titre de la topbar) sont protégés par des tests d'existence du nœud DOM avant modification ou écoute d'événement.

---

## 📂 Structure du Projet

```text
pharmacy-pos/
├── README.md               # Documentation complète du projet
├── index.html              # Fichier HTML principal (SPA, structure, icônes & modales)
├── styles-v10.css          # Feuille de style unifiée (variables, layouts, responsive & scrollbars)
├── app.js                  # Logique applicative (State, Routeur, POS, Sécurité & Audio)
├── import_dataset.js       # Script Node de filtrage et formatage du dataset EMA
├── imported_drugs.json     # Dataset de 60 médicaments issus de l'EMA
├── package.json            # Scripts de build et configuration Vite
└── package-lock.json       # Fichier de verrouillage des dépendances npm
```

---

## 🚀 Installation & Démarrage

### Prérequis
Avoir installé **Node.js** (v16 ou supérieur) sur sa machine.

### 1. Cloner et installer les dépendances
Ouvrez votre terminal dans le répertoire du projet et exécutez :
```bash
npm install
```

### 2. Importer le jeu de données EMA (Optionnel)
Pour mettre à jour ou régénérer le fichier JSON de l'inventaire :
```bash
node import_dataset.js
```

### 3. Lancer l'application localement
Démarrez le serveur de développement rapide basé sur Vite :
```bash
npm run dev
```
Vite démarrera le projet et ouvrira automatiquement votre navigateur par défaut à l'adresse [http://localhost:3000](http://localhost:3000).
