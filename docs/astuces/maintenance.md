# Mises à jour et maintenance

## Windows Update

```powershell
# Ouvrir Windows Update
ms-settings:windowsupdate

# Installer les mises à jour en ligne de commande (admin)
winget upgrade --all    # Met à jour TOUS les logiciels installés via winget
```

!!! tip "winget : le gestionnaire de paquets de Windows"
    ```powershell
    winget search 7zip           # Rechercher un logiciel
    winget install 7zip.7zip     # Installer
    winget upgrade --all         # Tout mettre à jour
    winget uninstall Nom.Logiciel
    ```
    Lancer `winget upgrade --all` une fois par mois garde tous vos logiciels à jour et sécurisés.

## Routine mensuelle recommandée

1. `winget upgrade --all` (logiciels)
2. Windows Update (système + pilotes)
3. Nettoyage de disque :

```powershell
cleanmgr                     # Nettoyage de disque classique
# ou : Paramètres → Système → Stockage → Assistant Stockage
```

4. Optimiser le disque (SSD : TRIM automatique, ne pas défragmenter manuellement) :

```powershell
defrag C: /O    # Optimisation adaptée au type de disque
```

## Points de restauration et sauvegarde

- Activer la protection du système : `Win + R` → `SystemPropertiesProtection` → configurer le disque C: (5 % suffisent).
- Créer un point de restauration manuel avant toute modification :

```powershell
Checkpoint-Computer -Description "Avant optimisation" -RestorePointType "MODIFY_SETTINGS"
```

- Sauvegarde de fichiers : **Historique des fichiers** (Paramètres → Comptes → Sauvegarde Windows) vers un disque externe.

## Planifier un redémarrage propre

Les mises à jour s'installent mieux si le PC redémarre régulièrement (et pas seulement mis en veille) :

```powershell
shutdown /r /t 0     # Redémarrer maintenant
shutdown /s /t 3600  # Éteindre dans 1 heure
```
