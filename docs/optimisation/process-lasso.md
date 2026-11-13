# 🎯 Process Lasso — Configuration Gaming

> **Guide de configuration de Process Lasso pour maximiser les performances en jeu, sans nuire au reste du système.**

!!! warning "Principe de base : cibler, ne pas brutaliser"
    Process Lasso n'est **pas** un accélérateur magique. Mal configuré (priorités élevées partout, ProBalance agressif), il peut _dégrader_ les performances et la stabilité. La bonne approche : **des règles ciblées sur vos jeux uniquement**, le reste du système reste géré par Windows.

!!! info "Version gratuite suffisante"
    Toutes les fonctionnalités décrites ici sont disponibles dans la version **gratuite** de Process Lasso ([bitsum.com](https://bitsum.com)). La version Pro ajoute surtout des automatismes et supprime le nag-screen au démarrage.

---

## 🧠 Ce que Process Lasso fait (et ne fait pas)

| Fonction                         | Rôle réel                                                                 | Utile en jeu ?                      |
| -------------------------------- | ------------------------------------------------------------------------- | ----------------------------------- |
| **ProBalance**                   | Baisse temporairement la priorité des processus gourmands en arrière-plan | ⚠️ Oui, mais configuré doucement    |
| **Priorité CPU persistante**     | Force la priorité d'un processus à chaque lancement                       | ✅ Ciblé sur les jeux               |
| **Affinité CPU persistante**     | Assigne des cœurs précis à un processus                                   | 🟡 Cas particuliers (X3D, hybrides) |
| **Performance Mode**             | Bascule automatiquement le plan d'alimentation quand un jeu se lance      | ✅ Très utile                       |
| **Instance Balancer / Watchdog** | Règles avancées sur les processus                                         | ❌ Inutile pour le gaming           |

Ce que Process Lasso **ne fait pas** : il ne rend pas votre CPU plus rapide, ne libère pas de RAM « cachée », ne remplace pas un bon plan d'alimentation. Il **ordonnance** — rien de plus.

---

## ⚙️ 1. Installation et réglages de base

1. Téléchargez sur [bitsum.com](https://bitsum.com) et installez.
2. Au premier lancement, choisissez **« Gérer les processus de tous les utilisateurs »** (nécessaire pour les jeux lancés en admin).
3. **Options → General settings** :
    - ✅ _Start at login for all users_
    - ✅ _Reconfigure the way the core engine starts_ → **service** (pas de console visible, règles actives même fenêtre fermée)
    - ❌ Désactivez les notifications/balloons inutiles

!!! tip "Interface vs moteur"
    L'interface graphique n'a **pas besoin de rester ouverte**. Le moteur (`ProcessGovernor`) tourne en service et applique vos règles en permanence. Fermez la fenêtre, les règles continuent.

---

## 🎮 2. Performance Mode : la fonctionnalité n°1 pour le gaming

C'est la raison principale d'installer Process Lasso pour jouer.

**Configuration :**

1. **Options → Power → Performance Mode → Designate processes…**
2. Ajoutez vos jeux (exécutable par exécutable : `cs2.exe`, `Cyberpunk2077.exe`, etc.) — **pas les launchers**.
3. **Options → Power → Performance Mode → Settings** :
    - Plan d'alimentation en jeu : **Bitsum Highest Performance** (installé avec Lasso) ou **Ultimate Performance**
    - ✅ _Engage Performance Mode when these processes run_
    - ✅ Restauration automatique du plan « Équilibré » à la fermeture du jeu

**Résultat :** votre PC reste économe au quotidien, et passe automatiquement
en pleine puissance dès qu'un jeu se lance, sans manipulation.

!!! note "Bitsum Highest Performance vs Ultimate Performance"
    Le plan Bitsum est un Ultimate Performance avec en plus la désactivation du core parking et des états C profonds.
    Sur un PC de bureau gaming dédié, c'est idéal.
    Sur un portable, préférez Ultimate Performance pour limiter la chauffe.

---

## 🔝 3. Priorité CPU pour les jeux

**Règle :** un clic droit sur le processus du jeu (lancé) → **Priority class → Always → High**.

| Priorité         | Verdict              | Pourquoi                                                               |
| ---------------- | -------------------- | ---------------------------------------------------------------------- |
| **High**         | ✅ Recommandé        | Donne la priorité au jeu sur les tâches de fond, sans risque           |
| **Above normal** | 🟡 Alternative douce | Si High cause des saccades audio (Discord, musique)                    |
| **Realtime**     | ❌ **Jamais**        | Peut figer le système : les pilotes et le noyau se battent pour le CPU |

!!! danger "Realtime = piège classique"
    « Realtime » semble être le maximum, donc tentant. En réalité, le jeu peut monopoliser le CPU au détriment des pilotes audio, du stockage et même des interruptions clavier/souris. Résultat : cracklements audio, freeze, entrées ignorées. **Ne l'utilisez jamais.**

---

## 🧵 4. Affinité CPU : uniquement dans ces cas

### Cas 1 — CPU AMD X3D double CCD (7950X3D, 7900X3D)

Le CCD avec le cache 3D V-Cache est le meilleur pour les jeux, l'autre pour les applicatifs. Normalement le driver chipset AMD gère ça tout seul — **vérifiez d'abord que vos drivers chipset sont à jour**. Si le parking ne fonctionne pas :

- Clic droit sur le jeu → **CPU affinity → Always** → sélectionnez uniquement les cœurs du CCD V-Cache (généralement CPU 0–15 sur un 7950X3D, vérifiez avec HWiNFO).

### Cas 2 — CPU Intel hybrides (12e gen et +)

Normalement, le **Thread Director** d'Intel assigne correctement les jeux aux P-cores. N'y touchez pas, sauf si vous constatez qu'un jeu tourne sur les E-cores (visible dans le Gestionnaire des tâches) :

- Affinité → P-cores uniquement pour le jeu concerné.

### Cas 3 — Isoler les processus parasites

Plutôt que de donner tous les cœurs au jeu, **retirez des cœurs aux gros processus de fond** (navigateur avec 40 onglets, launchers, indexation) : clic droit → CPU affinity → Always → décochez les 2 premiers cœurs. Le jeu garde tout, le bruit de fond est contenu.

!!! warning "Ne touchez pas à l'affinité du jeu par défaut"
    Sur un CPU standard (un seul CCD, pas d'hybridité), forcer une affinité sur le jeu n'apporte **rien** et peut nuire : l'ordonnanceur Windows sait déjà migrer les threads efficacement. L'affinité est un outil de _correction de problème_, pas d'optimisation.

---

## ⚖️ 5. ProBalance : régler en douceur

ProBalance baisse la priorité des processus de fond qui s'emballent — utile pour éviter qu'une tâche soudaine (indexation, antivirus, mise à jour de launcher) ne vol du CPU à votre jeu.

**Options → ProBalance settings :**

| Réglage                                     | Valeur recommandée                                             |
| ------------------------------------------- | -------------------------------------------------------------- |
| Enable ProBalance                           | ✅ Activé                                                      |
| _Exclude processes of ProBalance restraint_ | Ajoutez **vos jeux** ici (ils ne doivent jamais être ralentis) |
| Lower CPU usage during restraint            | ❌ Décoché (trop agressif)                                     |
| Ignore processes with CPU usage below       | Laisser le défaut                                              |
| _Exclude foreground processes_              | ✅ Coché (ne jamais brider la fenêtre active)                  |

!!! important "Excluez vos jeux de ProBalance"
    C'est l'erreur classique : ProBalance détecte votre jeu à 100 % CPU… et le bride. **Options → ProBalance → Exclusions** → ajoutez chaque exécutable de jeu. Sans ça, Process Lasso travaille _contre_ vous.

---

## 🚫 6. Ce qu'il ne faut PAS configurer

| Tentation                                                  | Pourquoi l'éviter                                                                                                     |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Priorité élevée sur Discord, navigateur, etc.              | Contre-productif : plus de processus en priorité haute = moins de marge pour le jeu                                   |
| Règles Watchdog complexes                                  | Source de comportements imprévisibles, aucun gain gaming                                                              |
| Désactivation de processus Windows « pour libérer du CPU » | Ne faites pas ça dans Lasso ; utilisez les outils d'optimisation dédiés (voir [Chris Titus WinUtil](chris-titus.md))  |
| SmartTrim / « optimisation mémoire »                       | ❌ Désactivé — trimmer la RAM forcément = rechargements depuis le disque (voir [Tweaks à éviter](tweaks-a-eviter.md)) |
| CPU Sets / règles I/O et mémoire sur tout le système       | Réservé aux usages serveur/workstation                                                                                |

---

## 📋 7. Configuration type récapitulative

Pour un PC gaming standard (ex. Ryzen 7800X3D ou i5-13600K, 32 Go de RAM) :

1. ✅ **Performance Mode** activé, avec vos exécutables de jeux désignés → plan Bitsum Highest Performance en jeu, retour Équilibré après.
2. ✅ **Priorité High** persistante sur chaque jeu.
3. ✅ Jeux **exclus de ProBalance**.
4. ✅ ProBalance actif avec réglages doux, foreground exclu.
5. ❌ Aucune affinité forcée (sauf X3D double CCD ou problème avéré).
6. ❌ Aucune autre règle.

**Vérification :** lancez un jeu, ouvrez l'interface Lasso → la colonne _Rules_ doit montrer `High` et _Power profile_ doit afficher le plan haute performance. Mesurez ensuite l'effet réel avec [CapFrameX](benchmarks.md) — si rien ne change sur vos frametimes, c'est que Windows gérait déjà bien, et c'est une bonne nouvelle.

---

## 🧭 En résumé

| Action                       | Gain attendu                                            |
| ---------------------------- | ------------------------------------------------------- |
| Performance Mode automatique | 🟢 Réel — fini les oublis de plan d'alimentation        |
| Priorité High sur les jeux   | 🟢 Réel sur PC « chargés » (beaucoup de tâches de fond) |
| ProBalance doux + exclusions | 🟡 Préventif — évite les pics de saccades               |
| Affinité CPU                 | 🟡 Uniquement X3D double CCD / hybrides défaillants     |
| Règles avancées partout      | 🔴 Contre-productif                                     |

> 📊 **Règle d'or inchangée** : Process Lasso est un outil d'**ordonnancement**, pas de magie. 
> Configurez peu, ciblez vos jeux, mesurez avec [CapFrameX](benchmarks.md),
> et gardez uniquement ce qui apporte un gain mesurable sur votre machine.
