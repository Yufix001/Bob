# 🛠️ BOB.AI - L'Assistant de Maintenance Intelligent

> **Automatiser le diagnostic, simplifier l'intervention, valoriser l'expérience locative.**

BOB.AI est une plateforme SaaS/PWA conçue pour révolutionner la gestion technique immobilière (Airbnb, Hôtels, Gestion locative). En plaçant l'IA générative au cœur de la détection de pannes, BOB.AI réduit les interventions inutiles et optimise la chaîne de valeur du dépannage.

---

## 🎯 Enjeux et Vision (The "Why")

La maintenance immobilière souffre de trois frictions majeures que BOB.AI résout :
1.  **Le bruit opérationnel** : 40% des demandes de maintenance sont résolvables par l'utilisateur. BOB.AI agit comme un filtre intelligent.
2.  **L'asymétrie d'information** : Les techniciens arrivent souvent sans avoir les bons outils. L'expertise multimodale de BOB fournit un pré-diagnostic précis (Photo + Modèle).
3.  **La preuve de dommage (AirCover)** : BOB.AI collecte immédiatement les preuves facilitant les demandes de remboursement.

---

## 🧠 Logique du Projet (The "How")

### 1. Le Moteur de Diagnostic (Wizard v2)
Contrairement aux chatbots classiques, BOB.AI utilise un **flux itératif dynamique** piloté par Gemini 2.5 Flash. L'IA dicte l'interface via un flux **JSON-Direct-Rendering**.

### 2. Écosystème Multi-Rôles
Le projet est un **ERP de maintenance léger** connectant Locataires, Gestionnaires et Techniciens.

---

## 🏢 Expérience Utilisateur & Dashboards (User Stories)

Le Dashboard de BOB.AI est conçu pour transformer des données brutes de pannes en actions de gestion fluides.

### 🔑 Pour la Conciergerie (Gestionnaire Immobilière)
*L'objectif est la centralisation et la réactivité.*

*   **Gestion des Incidents** : *"En tant que gestionnaire, je veux une vue consolidée de tous les problèmes en cours sur mon parc immobilier, triés par priorité (IA), afin de traiter les urgences (ex: fuite d'eau) en priorité absolue."*
*   **Arbitrage AirCover** : *"En tant que concierge, je souhaite identifier instantanément si une panne est due à l'usure normale ou à une mauvaise utilisation du voyageur (via le diagnostic IA), afin de générer un dossier de réclamation documenté avec photos."*
*   **Workflow Financier** : *"En tant que gestionnaire, je veux pouvoir valider un devis d'artisan en un clic et suivre mes factures en attente de paiement pour maintenir une comptabilité saine."*

### 🛠️ Pour les Artisans (Techniciens Spécialisés)
*L'objectif est la qualification et l'optimisation des tournées.*

*   **Qualification des Leads** : *"En tant qu'artisan, je veux recevoir des demandes d'intervention contenant déjà le modèle exact de l'appareil et un résumé du problème par l'IA, afin de savoir exactement quelle pièce de rechange emporter."*
*   **Gestion du Planning** : *"En tant que technicien, je souhaite visualiser mes interventions acceptées sur un calendrier dédié avec les coordonnées du locataire et l'itinéraire GPS, pour minimiser mes temps de trajet."*
*   **Visibilité et Réputation** : *"En tant qu'expert, je veux gérer mon profil public (compétences, zone d'intervention) et consulter mes avis clients pour valoriser mon expertise et recevoir des missions plus qualifiées."*
*   **Suivi de Trésorerie** : *"En tant que professionnel, je souhaite renseigner mon IBAN une seule fois et suivre mon solde à venir ainsi que l'historique de mes virements reçus via la plateforme."*

---

## 🏗️ Stratégie de Conception et Développement

### Choix de l'Architecture
*   **React 19 & TypeScript** : Pour une robustesse maximale des types de données.
*   **Modèle "AI-first"** : Déplacement de l'intelligence métier du code vers le Prompt Engineering.
*   **Approche Multimodale** : Support natif de la vision pour identifier les pannes via photo.

### Sécurité et Performance
*   **Optimisation des Tokens** : Réponses de l'IA en moins de 2 secondes.
*   **Découplage IA/UI** : Interface résiliente avec bascule automatique sur formulaire en cas d'échec IA.

---

## 🚀 Stack Technique

*   **Frontend** : Vite + React 19 + TypeScript.
*   **Design** : Tailwind CSS (Glassmorphism & Mobile-first).
*   **Intelligence** : Google Generative AI (Gemini 2.5 Flash).
*   **Data/Backend** : Firebase (Scalabilité & Temps réel).

---

## 🛠️ Guide d'Installation Rapide

1.  **Clonage & Install** : `npm install`
2.  **Configuration** : Créer un `.env.local` avec `GEMINI_API_KEY`.
3.  **Lancement** : `npm run dev`

---

*BOB.AI transforme chaque problème technique en une expérience fluide et documentée.*
