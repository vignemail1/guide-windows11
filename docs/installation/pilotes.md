# Installation des pilotes

Une fois sur le bureau (et maintenant connecté à Internet), installez les pilotes dans cet ordre.

## 1. Windows Update (pilotes automatiques)

1. `Paramètres` → `Windows Update` → **Rechercher les mises à jour**.
2. Installez tout, y compris les **mises à jour facultatives** :
   `Paramètres` → `Windows Update` → `Options avancées` → `Mises à jour facultatives` → cochez les pilotes proposés.
3. Redémarrez.

## 2. Pilotes du fabricant (recommandé)

Téléchargez sur le site du fabricant de votre PC ou carte mère :

| Pilote | Priorité | Où |
|---|---|---|
| **Chipset** (Intel INF / AMD Chipset) | ⭐⭐⭐ En premier | Site Intel / AMD |
| **Carte graphique** (NVIDIA / AMD / Intel) | ⭐⭐⭐ | nvidia.com, amd.com, intel.com |
| **Réseau (LAN + Wi-Fi)** | ⭐⭐ | Site du fabricant du PC |
| **Audio** | ⭐ | Site du fabricant |
| **Bluetooth, lecteur d'empreinte, webcam** | ⭐ | Site du fabricant |

!!! tip "Liens utiles"
    - NVIDIA : <https://www.nvidia.fr/Download/index.aspx?lang=fr>
    - AMD : <https://www.amd.com/support>
    - Intel (détection auto) : *Intel Driver & Support Assistant*
    - Utilitaires tout-en-un du fabricant : *MyASUS*, *Lenovo Vantage*, *Dell SupportAssist*, *HP Support Assistant*, *MSI Center*

## 3. Vérifier qu'il ne manque rien

1. Clic droit sur le bouton Démarrer → **Gestionnaire de périphériques** (`devmgmt.msc`).
2. Aucun périphérique ne doit avoir de **triangle jaune ⚠️** ni apparaître comme « Périphérique inconnu ».

En ligne de commande (PowerShell) :

```powershell
# Lister les périphériques en erreur
Get-PnpDevice | Where-Object { $_.Status -eq "Error" }
```

!!! warning
    Évitez les logiciels tiers de « mise à jour de pilotes » (Driver Booster, etc.) : sources non fiables et logiciels publicitaires. Restez sur Windows Update + site du fabricant.
