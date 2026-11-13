# Commandes utiles au quotidien

## Commandes « Exécuter » (++win+R++)

| Commande | Effet |
|---|---|
| `appwiz.cpl` | Désinstaller des programmes |
| `devmgmt.msc` | Gestionnaire de périphériques |
| `services.msc` | Services Windows |
| `msconfig` | Configuration du démarrage |
| `control` | Panneau de configuration |
| `mrt` | Outil de suppression de logiciels malveillants (analyse gratuite Microsoft) |
| `winver` | Version exacte de Windows (24H2, 25H2…) |
| `dxdiag` | Diagnostic DirectX / carte graphique |
| `snippingtool` | Capture d'écran |
| `taskschd.msc` | Planificateur de tâches |

## Raccourcis clavier essentiels

| Raccourci | Effet |
|---|---|
| ++win+e++ | Explorateur de fichiers |
| ++win+i++ | Paramètres |
| ++win+x++ | Menu avancé (Terminal admin, Gestionnaire…) |
| ++win+v++ | Historique du presse-papiers |
| ++win+shift+s++` | Capture d'écran partielle |
| ++win+num-separator++| Émojis |
| ++win+up++ | Ancrer les fenêtres (Snap) |
| ++win+down++ | Ancrer les fenêtres (Snap) |
| ++win+left++ | Ancrer les fenêtres (Snap) |
| ++win+right++ | Ancrer les fenêtres (Snap) |
| ++ctrl+shift+esc++ | Gestionnaire des tâches |
| ++alt+f4++ | Fermer l'application (arrêter le PC depuis le bureau) |

## PowerShell : exemples concrets

```powershell
# Où est passé mon espace disque ? (dossiers les plus volumineux)
Get-ChildItem C:\ -Directory | ForEach-Object {
  [PSCustomObject]@{ Dossier = $_.Name;
    "Taille (Go)" = [math]::Round((Get-ChildItem $_.FullName -Recurse -ErrorAction SilentlyContinue |
      Measure-Object Length -Sum).Sum / 1GB, 2) }
} | Sort-Object "Taille (Go)" -Descending

# Uptime : depuis quand le PC n'a pas redémarré ?
(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime

# Lister les programmes au démarrage
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command

# Trouver le processus qui consomme le plus de mémoire
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10
```

## Compte local : gérer les utilisateurs

- ++win+r++ → `netplwiz` : gérer les comptes, désactiver la demande de mot de passe au démarrage.
- Paramètres → Comptes : ajouter un compte **local** pour un autre membre de la famille (Autres utilisateurs → « Je ne connais pas les informations de connexion » → « Ajouter un utilisateur sans compte Microsoft »).

!!! tip "Sécurité minimale"
    - Gardez **Microsoft Defender** actif (suffisant, pas besoin d'antivirus payant).
    - Ne désactivez jamais le pare-feu Windows.
    - Utilisez un compte **standard** pour l'usage quotidien et gardez le compte administrateur pour l'installation de logiciels.
