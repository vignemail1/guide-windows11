# 🎮 Tuning Gaming Haute Performance

> **Optimisation avancée de Windows 11 pour les jeux vidéo compétitifs et immersifs.**

!!! danger "Avertissement — À lire avant toute modification"
    Les réglages décrits sur cette page touchent au cœur de Windows (base de registre, options de démarrage, drivers). Ils sont **fournis à titre indicatif**, sans garantie : chaque machine et chaque configuration réagit différemment.

    **Vous les appliquez à vos risques et périls.** L'auteur de ce guide décline toute responsabilité en cas de plantage, de perte de données, de baisse de performances ou de tout autre désagrément résultant de l'application de ces réglages.

    **Avant de commencer, je备份ez votre système** (point de restauration minimum, image complète idéalement) et testez chaque modification **une par une**. Si quelque chose ne fonctionne pas : revenez à votre sauvegarde, cherchez à comprendre, mais ne continuez pas à empiler les réglages à l'aveugle.

---

## 🧭 Philosophie

Le tuning gaming ne consiste **pas** à désactiver tout Windows à l'aveugle. L'approche correcte :

1. **Mesurez d'abord** — installez un benchmark (CapFrameX, 3DMark) et notez vos performances de base.
2. **Changez une chose à la fois** — sinon vous ne saurez jamais ce qui a fonctionné (ou cassé).
3. **Mesurez à nouveau** — gardez uniquement les réglages qui apportent un gain réel sur VOTRE machine.

---

## 🔧 1. Drivers : la fondation

### GPU — installation propre obligatoire

| Fabricant | Outil | Méthode |
|-----------|-------|---------|
| **NVIDIA** | [NVIDIA App](https://www.nvidia.com) ou drivers.nvidia.com | Cochez **« Installation personnalisée » → « Effectuer une nouvelle installation »** |
| **AMD** | [AMD Software Adrenalin](https://www.amd.com) | Utilisez **AMD Cleanup Utility** avant d'installer |
| **Tous** | **[DDU](https://www.guru3d.com/files-details/display-driver-uninstaller-download.html)** | En cas de souci : désinstallation totale en **Mode sans échec**, puis réinstallation propre |

!!! tip "DDU = régle les 90 % des problèmes de performances GPU"
    Une installation de driver par-dessus une autre laisse des résidus. DDU repart de zéro.

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
| Synchronisation verticale | **Désactivée globalement** (gérez-la in-game) |
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
| `SystemResponsiveness` | `0` (hex `0`) | Réserve 0 % du CPU aux tâches d'arrière-plan pendant le jeu |
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

Puis sélectionnez-le dans **Panneau de configuration → Options d'alimentation**, ou réglez le mode d'alimentation sur **« Meilleures performances »** dans Paramètres → Système → Alimentation.

### Paramètres → Jeux

- **Mode Jeu** : ✅ Activé (priorise le processus de jeu).
- **Xbox Game Bar** : ❌ Désactivée (sauf si vous l'utilisez vraiment).

### Graphismes → Planification GPU matérielle

**Paramètres → Système → Affichage → Graphismes → Modifier les paramètres graphiques par défaut** → activez **« Planification du GPU à accélération matérielle »** (redémarrage requis).

### Réseau — latence

```cmd
:: TCP optimisé pour la latence (admin)
netsh int tcp set supplemental custom
netsh int tcp set global autotuninglevel=normal
```

- Basculez votre DNS sur `1.1.1.1` / `1.0.0.1` (Cloudflare) ou `9.9.9.9` (Quad9).
- Préférez **toujours le câble Ethernet** au Wi-Fi pour le jeu compétitif.

---

## 🧰 5. Logiciels pour maintenir les performances

| Outil | Rôle | Lien |
|-------|------|------|
| **MSI Afterburner** + **RivaTuner** | Monitoring temps réel (frametime, températures) + limiteur FPS — plafonnez vos FPS 2-3 sous le taux de rafraîchissement pour lisser l'image | [guru3d.com](https://www.guru3d.com/files-details/msi-afterburner-beta-download.html) |
| **CapFrameX** ou **PresentMon** | Analyse des frametimes — LA mesure objective avant/après chaque tweak | [capframex.com](https://www.capframex.com) |
| **DDU** | Réinstallation propre des drivers GPU à chaque gros souci | [guru3d.com](https://www.guru3d.com/files-details/display-driver-uninstaller-download.html) |
| **Process Lasso** | Affinité CPU automatique, empêche les apps de fond de voler des cœurs pendant une session | [bitsum.com](https://bitsum.com) |
| **ISLC** (Intelligent Standby List Cleaner) | Vide la mémoire standby qui cause des micro-saccades après plusieurs heures de jeu | [majorgeeks.com](https://www.majorgeeks.com/files/details/intelligent_standby_list_cleaner.html) |
| **HWiNFO64** | Surveillance capteurs (throttling thermique = ennemi n°1 des perfs stables) | [hwinfo.com](https://www.hwinfo.com) |
| **CrystalDiskMark** | Vérifier que votre SSD NVMe tourne à pleine vitesse (un SSD ralenti charge les textures à la traîne) | [crystalmark.info](https://crystalmark.info) |

!!! tip "Routine de maintenance mensuelle"
    1. Vérifier les mises à jour GPU + chipset.
    2. Nettoyer les fichiers temporaires (`cleanmgr` ou Paramètres → Stockage).
    3. Vérifier les températures sous HWiNFO après 30 min de jeu — si le GPU dépasse 83 °C ou le CPU 95 °C, le problème est **physique** (poussière, pâte thermique), pas logiciel.
    4. Relancer un benchmark CapFrameX sur votre jeu de référence pour détecter toute dérive.

---

## 🎯 6. En résumé

| Priorité | Action | Gain attendu |
|----------|--------|--------------|
| 🥇 | Drivers GPU/chipset propres (DDU si besoin) | Énorme |
| 🥈 | Plan d'alimentation haute performance + planification GPU matérielle | Fort |
| 🥉 | Limiteur FPS (RivaTuner) pour lisser les frametimes | Fort (fluidité) |
| 4 | Registre (responsiveness, throttling réseau) | Modéré |
| 5 | BCDEdit (timer, TSC) | Variable — à tester |

> 📊 **Règle d'or** : si un changement n'apporte aucun gain mesurable sur VOTRE machine avec VOS jeux… revenez en arrière. Le meilleur réglage est celui que vous avez validé vous-même.
