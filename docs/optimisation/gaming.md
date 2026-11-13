# 🎮 Tuning Gaming Haute Performance

> **Optimisation avancée de Windows 11 pour les jeux vidéo compétitifs et immersifs.**

!!! danger "Avertissement — À lire avant toute modification"
    Les réglages décrits sur cette page touchent au cœur
    de Windows (base de registre, options de démarrage, drivers).
    Ils sont **fournis à titre indicatif**, sans garantie :
    chaque machine et chaque configuration réagit différemment.

    **Vous les appliquez à vos risques et périls.**
    L'auteur de ce guide décline toute responsabilité en cas de plantage,
    de perte de données, de baisse de performances
    ou de tout autre désagrément résultant de l'application de ces réglages.

    **Avant de commencer, sauvegardez votre système**
    (point de restauration minimum, image complète idéalement) et testez
    chaque modification **une par une**.
    Si quelque chose ne fonctionne pas :
    revenez à votre sauvegarde, cherchez à comprendre,
    mais ne continuez pas à empiler les réglages à l'aveugle.

---

## 🧭 Philosophie

Le tuning gaming ne consiste **pas** à désactiver tout Windows à l'aveugle.
L'approche correcte :

1. **Mesurez d'abord** — installez un benchmark (CapFrameX, 3DMark) et notez vos performances de base.
2. **Changez une chose à la fois** — sinon vous ne saurez jamais ce qui a fonctionné (ou cassé).
3. **Mesurez à nouveau** — gardez uniquement les réglages qui apportent un gain réel sur VOTRE machine.

!!! info "Page dédiée aux benchmarks"
    La procédure complète de mesure (CapFrameX, PresentMon, 3DMark, CrystalDiskMark, HWiNFO)
    et l'interprétation des résultats sont détaillées sur la page
    **[Benchmarks et mesures](benchmarks.md)**.

---

## 🔧 1. Drivers : la fondation

### GPU — installation propre obligatoire

| Fabricant  | Outil                            | Méthode                                                                                     |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| **NVIDIA** | NVIDIA App ou drivers.nvidia.com | Cochez **« Installation personnalisée » → « Effectuer une nouvelle installation »**         |
| **AMD**    | AMD Software Adrenalin           | Utilisez **AMD Cleanup Utility** avant d'installer                                          |
| **Tous**   | **DDU** (guru3d.com)             | En cas de souci : désinstallation totale en **Mode sans échec**, puis réinstallation propre |

!!! tip "DDU règle la majorité des problèmes de performances GPU"
    Une installation de driver par-dessus une autre laisse des résidus.
    DDU permet de repartir de zéro.

#### NVCleanstall — un driver NVIDIA allégé

Le package officiel NVIDIA installe de nombreux composants dont la plupart des joueurs
n'ont pas besoin : télémétrie, NVIDIA App, services d'arrière-plan, drivers audio HDMI,
USB-C… **NVCleanstall** (techpowerup.com) reconstruit un installeur sur mesure.

**Mode d'emploi :**

1. Lancez NVCleanstall et laissez-le détecter la dernière version du driver.
2. Décochez les composants superflus :
    - ❌ **Telemetry** (télémétrie)
    - ❌ **NVIDIA App / GeForce Experience** (si vous ne l'utilisez pas)
    - ❌ **HD Audio Driver** (si votre écran n'a pas de haut-parleurs ou si vous n'utilisez pas le son via HDMI/DisplayPort)
    - ❌ **USB-C Driver** (si votre carte n'a pas de port USB-C utilisé)
    - ❌ **PhysX** (uniquement si aucun de vos jeux anciens ne l'utilise — gardez-le en cas de doute)
3. Gardez uniquement le **Display Driver** (obligatoire) et, si besoin, **PhysX**.
4. Cliquez sur **Install** — l'outil télécharge le driver officiel et le réinstalle en version allégée.

!!! tip "Combinaison recommandée"
    Pour une base vraiment propre : **DDU en mode sans échec**, puis installation via **NVCleanstall**.

!!! warning "Conséquence"
    Sans la NVIDIA App, les mises à jour de driver ne seront plus notifiées automatiquement :
    pensez à vérifier manuellement tous les 1-2 mois. Vous perdez aussi ShadowPlay (enregistrement).

#### NVIDIA Profile Inspector — le panneau de contrôle débloqué

**NVIDIA Profile Inspector** expose des centaines de réglages de driver que le panneau de
configuration officiel masque, profil par profil (un profil = un jeu).

**Réglages utiles pour le gaming compétitif :**

| Réglage                         | Valeur conseillée              | Effet                                                            |
| ------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| **Ultra Low Latency**           | **Ultra**                      | Réduit la file d'attente de rendu → moins de latence d'entrée    |
| **Maximum Pre-Rendered Frames** | `1`                            | Équivalent classique (appliqué si Ultra Low Latency est « Off ») |
| **Shader Cache Size**           | **10 GB**                      | Limite les recompilations de shaders en jeu (stuttering)         |
| **Texture filtering - Quality** | **High performance**           | Gain marginal de FPS, perte visuelle quasi nulle                 |
| **Power management mode**       | **Prefer maximum performance** | Évite les baisses de fréquence du GPU en jeu                     |
| **Preferred refresh rate**      | **Highest available**          | Force le taux de rafraîchissement maximal                        |

**Mode d'emploi :**

1. Téléchargez NVIDIA Profile Inspector (github.com/Orbmu2k/nvidiaProfileInspector).
2. En haut, sélectionnez le **profil du jeu** dans la liste déroulante (ou `_GLOBAL_DRIVER_PROFILE` pour un réglage global).
3. Modifiez les valeurs, puis cliquez sur **Apply changes** (en haut à droite).
4. Pas de redémarrage nécessaire — relancez simplement le jeu.

!!! warning "Précautions"
    - Ne modifiez que les profils des jeux concernés plutôt que le profil global, sauf si vous savez ce que vous faites.
    - Notez la valeur d'origine avant chaque changement (ou utilisez le bouton **Restore** pour revenir aux valeurs NVIDIA par défaut).

!!! note "Conflit avec le NVIDIA Control Panel"
    Si un réglage existe dans les deux outils, le dernier appliqué gagne. Pour éviter les confusions,
    laissez le NVIDIA Control Panel sur « Laisser l'application 3D décider » pour ces options et
    gérez-les exclusivement dans Profile Inspector.

### Chipset — souvent oublié, jamais inutile

- **AMD** : installez le dernier **AMD Chipset Driver** (gère le parking des cœurs sur Ryzen, critique sur les X3D).
- **Intel** : installez **Intel Chipset INF Utility** + **Intel ME** (Management Engine).

### Audio et réseau

| Composant | Recommandation                                                                     |
| --------- | ---------------------------------------------------------------------------------- |
| **LAN**   | Pilotes constructeur de la carte mère (Realtek/Intel) — pas ceux de Windows Update |
| **Wi-Fi** | Désactivez les économies d'énergie du module dans le Gestionnaire de périphériques |
| **Audio** | Gardez les drivers standards sauf si vous utilisez un DAC/ampli                    |

### Réglages clés NVIDIA Control Panel

| Réglage                           | Valeur gaming                                             |
| --------------------------------- | --------------------------------------------------------- |
| Mode de gestion de l'alimentation | **Performance maximale privilégiée**                      |
| Taille du cache du nuanceur       | **10 Go** (évite les recompilations de shaders en jeu)    |
| Synchronisation verticale         | **Désactivée globalement** (gérez-la en jeu)              |
| G-Sync                            | Activé (fenêtré + plein écran) si votre écran le supporte |
| Threaded optimization             | **Automatique**                                           |

---

## ⚙️ 2. Options de démarrage — BCDEdit

!!! warning "HPET / Dynamic Tick : testez AVANT et APRÈS"
    Ces réglages divisent la communauté. Sur certaines machines ils lissent les frametimes, sur d'autres ils ajoutent de la latence. **Benchmark obligatoire.**

Ouvrez une invite de commandes **en administrateur** :

```cmd
:: Désactive le timer dynamique (stabilité des frametimes)
bcdedit /set disabledynamictick yes

:: Force le TSC comme référence horloge
bcdedit /set useplatformtick yes

:: Supprime une éventuelle valeur HPET forcée
bcdedit /deletevalue useplatformclock

:: Synchronisation TSC améliorée
bcdedit /set tscsyncpolicy Enhanced
```

**Pour revenir en arrière :**

```cmd
bcdedit /deletevalue disabledynamictick
bcdedit /deletevalue useplatformtick
bcdedit /deletevalue tscsyncpolicy
```

---

## 📋 3. Registre — les clés qui comptent

### Multimedia System Profile

Chemin : `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile`

| Clé (DWORD)              | Valeur     | Effet                                                       |
| ------------------------ | ---------- | ----------------------------------------------------------- |
| `SystemResponsiveness`   | `0`        | Réserve 0 % du CPU aux tâches d'arrière-plan pendant le jeu |
| `NetworkThrottlingIndex` | `ffffffff` | Désactive le bridage réseau multimédia                      |

### Planification GPU matérielle

Chemin : `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers`

| Clé (DWORD) | Valeur | Effet                                                               |
| ----------- | ------ | ------------------------------------------------------------------- |
| `HwSchMode` | `2`    | Active la planification GPU matérielle (réduit la latence d'entrée) |

### Désactiver la capture Xbox Game Bar

Chemin : `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR`

| Clé (DWORD)         | Valeur | Effet                                      |
| ------------------- | ------ | ------------------------------------------ |
| `AppCaptureEnabled` | `0`    | Désactive l'enregistrement en arrière-plan |

Chemin : `HKEY_CURRENT_USER\System\GameConfigStore`

| Clé (DWORD)       | Valeur | Effet                           |
| ----------------- | ------ | ------------------------------- |
| `GameDVR_Enabled` | `0`    | Désactive complètement Game DVR |

!!! note "Fichier .reg tout-en-un"
    Créez un fichier `gaming-tweaks.reg` avec ce contenu, fusionnez-le, redémarrez :

    ```reg
    Windows Registry Editor Version 5.00

    [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile]
    "SystemResponsiveness"=dword:00000000
    "NetworkThrottlingIndex"=dword:ffffffff

    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers]
    "HwSchMode"=dword:00000002

    [HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR]
    "AppCaptureEnabled"=dword:00000000

    [HKEY_CURRENT_USER\System\GameConfigStore]
    "GameDVR_Enabled"=dword:00000000
    ```

---

## ⚡ 4. Réglages Windows natifs

### Mode d'alimentation « Performances optimales »

Le plan **Ultimate Performance** est caché sur Windows 11. Pour l'activer :

```cmd
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
```

Puis sélectionnez-le dans **Panneau de configuration → Options d'alimentation**.

### Paramètres → Jeux

- **Mode Jeu** : ✅ Activé (priorise le processus de jeu).
- **Xbox Game Bar** : ❌ Désactivée (sauf si vous l'utilisez vraiment).

### Planification GPU matérielle

**Paramètres**
  → **Système**
  → **Écran**
  → **Graphismes**
  → **Paramètres graphiques avancées**
  → activez **« Planification du processeur graphique à accélération matérielle »** (redémarrage requis).

### Réseau — latence

```cmd
:: TCP optimisé pour la latence (invite admin)
netsh int tcp set supplemental custom
```

- Basculez votre DNS sur `1.1.1.1` / `1.0.0.1` (Cloudflare) ou `9.9.9.9` (Quad9).
- Préférez **toujours le câble Ethernet** au Wi-Fi pour le jeu compétitif.

---

## 🧰 5. Logiciels pour maintenir les performances

| Outil                                       | Rôle                                                                                      |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **NVCleanstall**                            | Installation allégée et maîtrisée des drivers NVIDIA                                      |
| **NVIDIA Profile Inspector**                | Accès aux réglages de driver cachés (latence, shader cache, filtrage)                     |
| **MSI Afterburner + RivaTuner**             | Monitoring temps réel + limiteur FPS (plafonnez 2-3 FPS sous le taux de rafraîchissement) |
| **CapFrameX** / **PresentMon**              | Analyse des frametimes — la mesure objective avant/après chaque tweak                     |
| **DDU**                                     | Réinstallation propre des drivers GPU                                                     |
| **Process Lasso**                           | Affinité CPU automatique, empêche les apps de fond de perturber le jeu                    |
| **ISLC** (Intelligent Standby List Cleaner) | Vide la mémoire standby source de micro-saccades                                          |
| **HWiNFO64**                                | Surveillance capteurs (le throttling thermique est l'ennemi n°1)                          |
| **CrystalDiskMark**                         | Vérifie que votre SSD NVMe tourne à pleine vitesse                                        |

!!! tip "Routine de maintenance mensuelle" 1. Vérifier les mises à jour GPU (avec NVCleanstall) + chipset. 2. Nettoyer les fichiers temporaires. 3. Contrôler les températures sous HWiNFO après 30 min de jeu (GPU > 83 °C ou CPU > 95 °C = problème **physique**, pas logiciel). 4. Relancer un benchmark CapFrameX sur votre jeu de référence.

---

## 🎯 6. En résumé

| Priorité | Action                                                               | Gain attendu               |
| -------- | -------------------------------------------------------------------- | -------------------------- |
| 🥇       | Drivers GPU/chipset propres (DDU + NVCleanstall)                     | Énorme                     |
| 🥈       | Plan d'alimentation haute performance + planification GPU matérielle | Fort                       |
| 🥉       | Limiteur FPS (RivaTuner) + Ultra Low Latency (Profile Inspector)     | Fort (fluidité et latence) |
| 4        | Registre (responsiveness, throttling réseau)                         | Modéré                     |
| 5        | BCDEdit (timer, TSC)                                                 | Variable — à tester        |

> 📊 **Règle d'or** : si un changement n'apporte aucun gain mesurable sur VOTRE machine avec VOS jeux… revenez en arrière. Le meilleur réglage est celui que vous avez validé vous-même. Voir **[Benchmarks et mesures](benchmarks.md)** pour savoir comment mesurer correctement.
