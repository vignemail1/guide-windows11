# 📊 Benchmarks : mesurer et interpréter les performances

> **Sans mesure, pas d'optimisation.** Cette page explique comment utiliser les principaux outils de benchmark et, surtout, comment lire correctement leurs résultats avant et après chaque tweak.

!!! warning "Le piège n°1 : tirer des conclusions d'un seul chiffre"
    Un benchmark isolé ne prouve rien. Les variations normales d'une exécution à l'autre peuvent atteindre **3 à 5 %** sans aucune modification de votre part. On ne valide un changement que sur une **moyenne de plusieurs runs**, dans des conditions identiques.

---

## 🧭 Méthodologie générale

### La procédure en 6 étapes

1. **Établissez une ligne de base (baseline)** — avant tout tweak, mesurez vos performances actuelles et notez-les.
2. **Standardisez les conditions** — même jeu, même scène, même résolution, mêmes options graphiques, même température de départ (laissez le PC refroidir entre les sessions).
3. **Fermez tout le reste** — navigateur, Discord, overlays inutiles, téléchargements en arrière-plan.
4. **Appliquez UN seul changement** — jamais deux à la fois.
5. **Refaites au moins 3 runs** — et comparez la moyenne, pas le meilleur score.
6. **Décidez** — gain ≥ 3 % : gardez. Aucun gain ou régression : revenez en arrière.

!!! tip "Tenez un carnet de bord"
    Un simple fichier texte ou tableur avec : date, tweak appliqué, outil utilisé, résultats des 3 runs, moyenne, décision. En cas de problème des semaines plus tard, vous saurez exactement ce qui a été changé.

---

## 🎮 CapFrameX — le frametime, la métrique qui compte

Le FPS moyen seul est trompeur. Ce qui se **ressent** en jeu, ce sont les **frametimes** (le temps de rendu de chaque image) et leurs irrégularités. CapFrameX les enregistre proprement.

### Installation et configuration

1. Téléchargez CapFrameX depuis son site officiel (capframex.com) et installez-le.
2. Ouvrez l'onglet **Capture** et configurez :
   - **Capture hotkey** : une touche dédiée, par ex. `F11` (pour démarrer/arrêter la capture).
   - **Capture time** : 20 secondes est un bon compromis (laissez 0 pour un arrêt manuel).
   - Activez l'**overlay** pour voir le compte à rebours de capture en jeu.
3. Choisissez votre **scène de référence** : un endroit du jeu que vous pouvez reproduire à l'identique (benchmark intégré du jeu, spawn fixe, trajet en véhicule…).

### Protocole de capture

1. Lancez le jeu, chargez la scène, **attendez 30 secondes** que les shaders se compilent et le framerate se stabilise.
2. Appuyez sur la hotkey → capture de 20 s pendant que vous reproduisez exactement la même action.
3. Répétez **3 fois minimum**.

### Interpréter les résultats

Dans l'onglet **Analysis**, concentrez-vous sur quatre indicateurs :

| Indicateur | Ce qu'il mesure | Comment le lire |
|------------|-----------------|------------------|
| **Average FPS** | Fluidité générale | Utile mais insuffisant seul |
| **1 % low (P1)** | Les 1 % d'images les plus lentes | **Le plus important** : un bon 1 % low = jeu fluide ressenti, même si la moyenne est identique |
| **0.1 % low (P0.1)** | Les micro-saccades franches | Si le 0.1 % low s'effondre → stuttering (souvent mémoire standby, shaders, driver) |
| **Frametime graph** | Régularité image par image | Cherchez une courbe **plate** ; les pics répétés = saccades perceptibles |

!!! example "Exemple concret"
    - **Avant tweak** : moyenne 118 FPS, 1 % low à 74 FPS, pics de frametime à 28 ms.
    - **Après** désactivation de Game DVR : moyenne 119 FPS (+1 %, négligeable), **1 % low à 92 FPS (+24 %)**, pics lissés.
    - **Conclusion** : la moyenne n'a presque pas bougé, mais le jeu est objectivement plus fluide. Sans les 1 % low, vous auriez conclu à tort que le tweak était inutile.

---

## 📈 PresentMon — l'alternative légère

PresentMon (d'Intel, open source) enregistre les mêmes données de présentation que CapFrameX, sans overlay sophistiqué.

- **Quand l'utiliser** : pour logger en arrière-plan pendant une vraie session de jeu (plusieurs minutes), là où une capture de 20 s ne suffit pas.
- **Analyse** : le fichier CSV généré peut être rouvert dans CapFrameX ou un tableur pour calculer moyennes et percentiles.
- **Variante intégrée** : l'overlay d'Intel PresentMon propose aussi un affichage temps réel (FPS, frame pacing, GPU busy) utile pour repérer si le goulot d'étranglement est CPU ou GPU.

!!! tip "Lire la métrique « GPU Busy »"
    - **GPU Busy ≈ Frame Time** → le GPU est le facteur limitant (normal et souhaitable en jeu).
    - **GPU Busy très inférieur au Frame Time** → le CPU bride la carte graphique : inutile d'investir dans un meilleur GPU avant d'avoir optimisé le processeur (drivers chipset, plan d'alimentation, XMP/EXPO, etc.).

---

## 🏆 3DMark et benchmarks synthétiques

Les benchmarks synthétiques ne reproduisent pas un jeu réel, mais ils sont **parfaitement reproductibles** — idéaux pour valider qu'un changement global (drivers, BCDEdit, plan d'alimentation) n'a rien cassé.

| Outil | Usage recommandé |
|-------|------------------|
| **3DMark Time Spy** (DX12) | Référence GPU/CPU gaming — un score qui chute après un tweak = signal d'alerte |
| **3DMark Steel Nomad** | API modernes, utile sur configurations récentes |
| **Unigine Superposition** | Gratuit, bon test de stabilité + boucle pour le monitoring thermique |
| **Cinebench** | CPU pur — vérifie que le processeur monte bien en fréquence et ne throttle pas |

**Protocole** : 3 runs consécutifs, écart-type inférieur à 1 %, comparer la moyenne. Un écart de moins de 2 % entre deux configurations est du bruit, pas un gain.

---

## 💾 CrystalDiskMark — vérifier le stockage

Des temps de chargement lents ou des textures qui popent peuvent venir d'un SSD qui ne tourne pas à sa vitesse nominale.

### Procédure

1. Fermez les applications lourdes, laissez le SSD au repos 5 minutes.
2. Lancez un profil **SEQ1M Q8T1** (débit séquentiel) et **RND4K Q32T1** (aléatoire).
3. Comparez aux spécifications officielles du SSD.

### Interprétation

| Observation | Diagnostic probable |
|-------------|---------------------|
| Séquentiel à ~50 % du nominal sur NVMe | Le SSD est branché sur un slot PCIe ×2, ou en mode PCIe 3.0 au lieu de 4.0 → vérifier le slot et le BIOS |
| 4K aléatoire très faible | SSD presque plein (> 85 %) → libérer de l'espace ; ou TRIM désactivé (`fsutil behavior query DisableDeleteNotify` doit retourner `0`) |
| Scores qui s'effondrent après quelques minutes | Throttling thermique du SSD → vérifier la présence d'un dissipateur |

---

## 🌡️ HWiNFO64 — surveiller pendant le bench

Un benchmark sans monitoring thermique ne vaut rien : si le GPU throttle à 83 °C, vous mesurez la chaleur, pas le tweak.

**Capteurs à afficher pendant vos runs** (mode Sensors-only) :

- **GPU Temperature** et **GPU Thermal Limit** (drapeau « Yes » = throttling).
- **CPU Package** et les flags **Thermal Throttling** par cœur.
- **GPU Power** : si la carte n'atteint jamais sa limite de puissance, un autre composant la bride.
- **Effective Clock** CPU/GPU : fréquences réelles, plus fiables que les fréquences affichées.

!!! warning "Ordre de diagnostic"
    Si vos scores sont bas : regardez **d'abord** les températures et les flags de throttling dans HWiNFO, **ensuite** seulement cherchez côté logiciel. Une pâte thermique sèche fausse tous les benchmarks du monde.

---

## 🧪 Mettre tout ensemble : une session de test type

1. **Préparation** : redémarrage, 10 min de repos (températures basses), fermeture des apps, lancement de HWiNFO (logging activé).
2. **Baseline synthétique** : 3 runs 3DMark Time Spy → notez la moyenne.
3. **Baseline en jeu** : 3 captures CapFrameX de 20 s sur la scène de référence → notez moyenne FPS, 1 % low, 0.1 % low.
4. **Tweak** : appliquez **une** modification (ex. `bcdedit /set disabledynamictick yes`), redémarrez si nécessaire.
5. **Re-mesure** : recommencez les étapes 2 et 3 dans les mêmes conditions.
6. **Analyse** : comparez les moyennes. Gain ≥ 3 % sur la moyenne **ou** amélioration nette des 1 % low → gardez. Sinon → revert.
7. **Archivage** : notez tout dans votre carnet de bord avec les exports CapFrameX.

---

## 📚 Résumé : quel outil pour quelle question ?

| Question | Outil | Métrique clé |
|----------|-------|--------------|
| « Mon jeu est-il plus fluide ? » | CapFrameX | 1 % low, courbe de frametime |
| « Qui me bride : CPU ou GPU ? » | PresentMon (GPU Busy) | Écart GPU Busy / Frame Time |
| « Mon tweak global n'a rien cassé ? » | 3DMark | Score moyen sur 3 runs |
| « Mon CPU monte-t-il bien en fréquence ? » | Cinebench + HWiNFO | Score + flags de throttling |
| « Mon SSD est-il à pleine vitesse ? » | CrystalDiskMark | SEQ1M et RND4K vs specs |
| « Suis-je limité par la chaleur ? » | HWiNFO64 | Thermal Throttling flags |

> 📊 **Règle d'or** : un tweak qui ne montre aucun gain **mesurable et reproductible** sur votre machine n'a aucune raison d'être conservé — quelle que soit sa popularité sur Internet.
