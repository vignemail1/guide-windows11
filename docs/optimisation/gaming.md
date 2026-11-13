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

---

## 🔧 1. Drivers : la fondation

### GPU — installation propre obligatoire

| Fabricant | Outil | Méthode |
|-----------|-------|---------|
| **NVIDIA** | NVIDIA App ou drivers.nvidia.com | Cochez **« Installation personnalisée » → « Effectuer une nouvelle installation »** |
| **AMD** | AMD Software Adrenalin | Utilisez **AMD Cleanup Utility** avant d'installer |
| **Tous** | **DDU** (guru3d.com) | En cas de souci : désinstallation totale en **Mode sans échec**, puis réinstallation propre |

!!! tip "DDU règle la majorité des problèmes de performances GPU"
    Une installation de driver par-dessus une autre laisse des résidus.
    DDU permet de repartir de zéro.

### NVCleanstall — un driver NVIDIA allégé (utilisateurs NVIDIA)

Le package officiel NVIDIA installe de nombreux composants inutiles en jeu :
télémétrie, GeForce Experience/NVIDIA App, services d'arrière-plan,
drivers audio HDMI, USB-C, ShadowPlay…
**NVCleanstall** (techpowerup.com/download/nvcleanstall) permet de reconstruire
un installeur **sur mesure** qui ne contient que ce dont vous avez besoin.

**Mode d'emploi :**

1. Lancez NVCleanstall (aucune installation requise, exécutable portable).
2. Laissez-le **détecter le meilleur driver** pour votre carte, ou choisissez une version précise.
3. **Décochez tout ce qui est superflu** :
      - ❌ NVIDIA App / GeForce Experience (si vous ne streamez pas)
      - ❌ Telemetry (télémétrie)
      - ❌ Drivers audio HDMI (si votre écran n'a pas de haut-parleurs utilisés)
      - ❌ USB-C, PhysX (gardez PhysX uniquement si vos jeux l'exigent — la plupart des jeux modernes non)
4. Gardez au minimum : **Display Driver** (obligatoire) et éventuellement **HD Audio** selon votre setup.
5. Installez le package généré, redémarrez.

!!! tip "Gain réel"
    Moins de services en arrière-plan = moins de RAM consommée,
    moins de processus qui se réveillent pendant une partie.
    Combinez NVCleanstall **après** un passage de DDU pour une base vraiment propre.

!!! warning "Sans NVIDIA App / GeForce Experience"
    Vous perdez la mise à jour automatique des drivers et les overlays ShadowPlay/Ansel.
    Il faudra vérifier les nouveaux drivers **manuellement** (relancez simplement
    NVCleanstall de temps en temps : il détecte les nouvelles versions).

### NVIDIA Profile Inspector — le panneau de contrôle débloqué

**NVIDIA Profile Inspector** (github.com/Orbmu2k/nvidiaProfileInspector) donne accès
à **tous les réglages cachés des profils de drivers NVIDIA**, bien au-delà de ce
que le NVIDIA Control Panel affiche. Chaque jeu possède un profil driver interne :
cet outil permet de le modifier finement.

**Réglages utiles pour le gaming compétitif :**

| Réglage | Valeur recommandée | Effet |
|---------|--------------------|-------|
| **Ultra Low Latency Mode** | `Ultra` (ou géré par le jeu) | Réduit la file d'attente de rendu → moins de latence d'entrée |
| **Maximum Pre-Rendered Frames** | `1` | Une seule image en attente → input lag minimal |
| **Shader Cache Size** | `10 GB` ou `Unlimited` | Évite les saccades de compilation de shaders |
| **Texture filtering – Quality** | `High performance` | Priorise les performances sur la qualité de filtrage |
| **Power management mode** | `Prefer maximum performance` | Le GPU ne descend plus en fréquence entre les scènes |
| **Preferred refresh rate** | `Highest available` | Force le taux de rafraîchissement maximal |
| **Vertical Sync** | `Off` (gérez en jeu) | Évite la latence de la VSync globale |

**Mode d'emploi :**

1. Téléchargez l'archive, extrayez, lancez `nvidiaProfileInspector.exe` (portable).
2. En haut, choisissez le **profil du jeu** concerné dans la liste déroulante
   (ou `_GLOBAL_DRIVER_PROFILE` pour appliquer à tout).
3. Modifiez les valeurs, cliquez sur **« Apply changes »** en haut à droite.
4. Relancez le jeu — pas de redémarrage nécessaire.

!!! warning "Modifiez profil par profil, jamais tout d'un coup"
    Un réglage qui fluidifie un jeu peut en casser un autre (plantage, artefacts).
    Notez la valeur d'origine avant chaque changement : le bouton **« Restore »**
    remet le profil aux valeurs NVIDIA par défaut.

!!! note "Conflit possible avec le NVIDIA Control Panel"
    Si vous réglez une option ici, laissez-la sur **« Laisser l'application 3D décider »**
    dans le Control Panel pour éviter que les deux se contredisent.

### Chipset — souvent oublié, jamais inutile

- **AMD** : installez le dernier **AMD Chipset Driver** (gère le parking des cœurs sur Ryzen, critique sur les X3D).
- **Intel** : installez **Intel Chipset INF Utility** + **Intel ME** (Management Engine).

### Audio et réseau

| Composant | Recommandation |
|-----------|----------------|
| **LAN** | Pilotes constructeur de la carte mère (Realtek/Intel) — pas ceux de Windows Update |
| **Wi-Fi** | Désactivez les économies d'énergie du module dans le Gestionnaire de périphériques |
| **Audio** | Gardez les drivers standards sauf si vous utilisez un DAC/ampli |

### Réglages clés NVIDIA Control Panel

| Réglage | Valeur gaming |
|---------|---------------|
| Mode de gestion de l'alimentation | **Performance maximale privilégiée** |
| Taille du cache du nuanceur | **10 Go** (évite les recompilations de shaders en jeu) |
| Synchronisation verticale | **Désactivée globalement** (gérez-la en jeu) |
| G-Sync | Activé (fenêtré + plein écran) si votre écran le supporte |
| Threaded optimization | **Automatique** |

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

| Clé (DWORD) | Valeur | Effet |
|-------------|--------|-------|
| `SystemResponsiveness` | `0` | Réserve 0 % du CPU aux tâches d'arrière-plan pendant le jeu |
| `NetworkThrottlingIndex` | `ffffffff` | Désactive le bridage réseau multimédia |

### Planification GPU matérielle

Chemin : `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers`

| Clé (DWORD) | Valeur | Effet |
|-------------|--------|-------|
| `HwSchMode` | `2` | Active la planification GPU matérielle (réduit la latence d'entrée) |

### Désactiver la capture Xbox Game Bar

Chemin : `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR`

| Clé (DWORD) | Valeur | Effet |
|-------------|--------|-------|
| `AppCaptureEnabled` | `0` | Désactive l'enregistrement en arrière-plan |

Chemin : `HKEY_CURRENT_USER\System\GameConfigStore`

| Clé (DWORD) | Valeur | Effet |
|-------------|--------|-------|
| `GameDVR_Enabled` | `0` | Désactive complètement Game DVR |

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

**Paramètres → Système → Affichage → Graphismes → Modifier les paramètres graphiques par défaut** → activez **« Planification du GPU à accélération matérielle »** (redémarrage requis).

### Réseau — latence

```cmd
:: TCP optimisé pour la latence (invite admin)
netsh int tcp set supplemental custom
```

- Basculez votre DNS sur `1.1.1.1` / `1.0.0.1` (Cloudflare) ou `9.9.9.9` (Quad9).
- Préférez **toujours le câble Ethernet** au Wi-Fi pour le jeu compétitif.

---

## 🧰 5. Logiciels pour maintenir les performances

| Outil | Rôle |
|-------|------|
| **NVCleanstall** | Installation de drivers NVIDIA allégés, sans télémétrie ni composants inutiles |
| **NVIDIA Profile Inspector** | Réglages avancés et cachés des profils de drivers NVIDIA (latence, cache shaders…) |
| **MSI Afterburner + RivaTuner** | Monitoring temps réel + limiteur FPS (plafonnez 2-3 FPS sous le taux de rafraîchissement) |
| **CapFrameX** / **PresentMon** | Analyse des frametimes — la mesure objective avant/après chaque tweak |
| **DDU** | Réinstallation propre des drivers GPU |
| **Process Lasso** | Affinité CPU automatique, empêche les apps de fond de perturber le jeu |
| **ISLC** (Intelligent Standby List Cleaner) | Vide la mémoire standby source de micro-saccades |
| **HWiNFO64** | Surveillance capteurs (le throttling thermique est l'ennemi n°1) |
| **CrystalDiskMark** | Vérifie que votre SSD NVMe tourne à pleine vitesse |

!!! tip "Routine de maintenance mensuelle"
    1. Vérifier les mises à jour GPU (relancez NVCleanstall pour voir les nouveaux drivers) + chipset.
    2. Nettoyer les fichiers temporaires.
    3. Contrôler les températures sous HWiNFO après 30 min de jeu (GPU > 83 °C ou CPU > 95 °C = problème **physique**, pas logiciel).
    4. Relancer un benchmark CapFrameX sur votre jeu de référence.

---

## 🎯 6. En résumé

| Priorité | Action | Gain attendu |
|----------|--------|--------------|
| 🥇 | Drivers GPU/chipset propres (DDU + NVCleanstall pour NVIDIA) | Énorme |
| 🥈 | Plan d'alimentation haute performance + planification GPU matérielle | Fort |
| 🥉 | Limiteur FPS (RivaTuner) + Ultra Low Latency (Profile Inspector) | Fort (fluidité / latence) |
| 4 | Registre (responsiveness, throttling réseau) | Modéré |
| 5 | BCDEdit (timer, TSC) | Variable — à tester |

> 📊 **Règle d'or** : si un changement n'apporte aucun gain mesurable sur VOTRE machine avec VOS jeux… revenez en arrière. Le meilleur réglage est celui que vous avez validé vous-même.
