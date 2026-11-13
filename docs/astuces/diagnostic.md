# Diagnostic : connaître l'état de son PC

Commandes à taper dans **PowerShell / Terminal** (certaines en administrateur) ou via `Win + R`.

## Santé du système

```powershell
# Vérifier et réparer les fichiers système (admin)
sfc /scannow

# Réparer l'image Windows en profondeur (admin)
DISM /Online /Cleanup-Image /RestoreHealth

# Vérifier le disque dur (admin, au prochain redémarrage)
chkdsk C: /f /r
```

## État du matériel

```powershell
# Informations système complètes
msinfo32

# Santé de la batterie (portable) — génère un rapport HTML
powercfg /batteryreport

# Test SMART des disques
Get-PhysicalDisk | Select-Object FriendlyName, HealthStatus, Size

# Températures et ressources en direct
resmon          # Moniteur de ressources
```

## Réseau

```powershell
ipconfig /all          # Configuration IP complète
ping 8.8.8.8           # Tester la connexion Internet
ping google.fr         # Tester la résolution DNS
netstat -ano           # Connexions réseau actives
Get-NetAdapter         # État des cartes réseau
```

## Performances

- `Ctrl + Maj + Échap` : **Gestionnaire des tâches** → onglet *Performance* (CPU, RAM, disque).
- Onglet *Démarrage* : désactivez les programmes inutiles au démarrage (gain de temps notable).
- `perfmon /rel` : **Moniteur de fiabilité** — historique des plantages et erreurs.

!!! tip "Réflexe en cas de lenteur"
    1. Gestionnaire des tâches → quel processus consomme ?
    2. `sfc /scannow` si fichiers corrompus suspectés.
    3. `perfmon /rel` pour voir quand les erreurs ont commencé.
