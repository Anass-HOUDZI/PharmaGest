# PharmaGest - Système SaaS de gestion de pharmacie & POS

PharmaGest est une application web moderne (Single Page Application - SPA) de type SaaS, conçue pour optimiser, simplifier et sécuriser la gestion quotidienne d'une officine de pharmacie. Offrant un design épuré, digne de confiance et premium basé sur une charte graphique professionnelle (Bleu Roi propre et rassurant et Vert Émeraude vibrant), PharmaGest propose une expérience utilisateur (UX) fluide, dynamique et ultra-réactive pour les pharmaciens.

<img width="1919" height="1021" alt="Capture d&#39;écran 2026-06-10 155201" src="https://github.com/user-attachments/assets/594bf2f7-6a4b-4cca-8311-551710cd1607" />

---

<img width="1918" height="1000" alt="Capture d&#39;écran 2026-06-10 155221" src="https://github.com/user-attachments/assets/1864ad4d-3c5f-46d0-8b9d-34dd51e4be6f" />

---

## Contexte du projet

Dans le milieu de la pharmacie, les logiciels de gestion d'officine (LGO) traditionnels sont souvent lourds visuellement, obsolètes ergonomiquement et complexes d'utilisation. **PharmaGest** a été pensé pour réinventer l'ergonomie de ces interfaces d'officine à travers trois axes :
1. **La centralisation des flux** : Encaissement rapide (caisse tactile/POS), gestion des stocks (inventaires, réapprovisionnement automatique) et dossiers patients sur une page unique (SPA) fluide, sans rechargement de page.
2. **Une lisibilité maximale** : Un design moderne, épuré et parfaitement aéré sur fond de contrastes doux (fonds bleutés ultra légers en mode clair et contrastes optimisés en mode sombre).
3. **Une robustesse optimale** : Des contrôles défensifs et des processus tolérants aux pannes (par exemple, gestion du stockage local et chargement dynamique des dépendances) assurant une continuité de service pour le pharmacien.

---

## Stack technique

L'application est entièrement construite à l'aide de technologies standardisées du web moderne (Web Standards), garantissant une performance maximale et une maintenance facilitée sans dépendances lourdes :

* **HTML5 & CSS3 Standard** : Structure sémantique complète et design system basé sur des variables CSS, flexbox, grid layouts et animations fluides.
* **JavaScript ES6+ (Vanilla)** : Routeur interne personnalisé sans rechargement de page, gestion globale de l'état de l'application (State Management), et manipulations dynamiques du DOM.
* **Chart.js** : Librairie de visualisation de données pour les graphiques analytiques du Tableau de bord (ventes, ordonnances).
* **Vite** : Outil de build ultra-rapide pour le serveur de développement local et le packaging de production.

---

## Description des modules applicatifs

### 1. Tableau de bord (Dashboard)
- **KPIs en Temps Réel** : Chiffre d'affaires journalier brut, volume d'ordonnances traitées, nombre de produits sous le seuil d'alerte critique et lots proches de la péremption.
- **Graphiques analytiques** : 
  - *Ventes hebdomadaires* : Graphique linéaire affichant la courbe de revenus.
  - *Répartition par classification* : Diagramme en anneau segmentant l'inventaire en Liste I, Liste II, Stupéfiants et Hors liste.
- **Alertes Urgentes** : Panneau récapitulatif listant dynamiquement les ruptures totales, les stocks bas et les dates de péremption dépassées ou proches.
- **Performances & Approvisionnement** : Affiche le panier moyen client et le taux de rupture global, accompagné d'un bouton d'action rapide pour générer une commande de réapprovisionnement automatique.

### 2. Caisse & POS (Point de Vente)
- **Gestion des patients par carte Vitale** : Lecture simulée d'une carte Vitale ouvrant un profil patient, ce qui applique automatiquement son taux de prise en charge RO (Sécurité Sociale) et RC (Mutuelle) aux calculs de tarification.
- **Panier dynamique** : Ajout rapide de produits par code CIP, DCI ou nom. Gestion à la volée des quantités (contrôlée par le stock réel disponible) et suppressions.
- **Moteur de calcul financier** : Ventilation en temps réel du total public brut, de la part Sécurité Sociale (Régime Obligatoire), de la part Mutuelle (Régime Complémentaire), de la TVA cumulée, et du reste à payer net pour le patient.
- **Module d'encaissement et monnaie** : Clavier numérique tactile pour saisir les espèces reçues et calculer le rendu de monnaie en temps réel.
- **Ticket thermique** : Génération et aperçu d'un ticket de caisse thermique officiel de pharmacie avec possibilité de simulation d'impression physique (`window.print()`).

### 3. Gestion des stocks (Inventaire)
- **Filtrage à facettes vertical** : Tri instantané de l'inventaire en 4 catégories : Tous, Stocks Bas, En Rupture, Périmés (< 3 mois).
- **Importation Dataset EMA** : Bouton d'action permettant de précharger un registre réaliste de plus de 60 médicaments issus de l'Agence Européenne des Médicaments (EMA).
- **Ajout & édition de produits** : Formulaire modal soigné en grille à deux colonnes gérant les codes CIP (13 chiffres), les noms commerciaux, les DCI, les stocks initiaux, les seuils d'alerte, les prix d'achat/public, la TVA (2.1%, 10.0%, 20.0%), les dates de péremption et la classification réglementaire.

### 4. Patients & dossiers
- **Fiches Profils Patients** : Liste de recherche à gauche, panneau de détails administratifs et médicaux à droite.
- **Données Administratives** : Date de naissance (avec calcul de l'âge), numéro de sécurité sociale (NIR formaté selon les normes françaises), régime d'assurance maladie et médecin traitant.
- **Historique de délivrance** : Chronologie détaillée de tous les médicaments délivrés au patient (date, nom, quantité et prix).

---

## 📂 Structure du projet

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

## 🚀 Installation & démarrage

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
