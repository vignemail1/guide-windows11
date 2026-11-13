# Guide Windows 11 (24H2 → 26H2)

Site de documentation statique généré avec **[Zensical](https://zensical.org)** et déployé automatiquement sur **GitHub Pages** via GitHub Actions.

🌐 **Site en ligne** : https://vignemail1.github.io/guide-windows11/

## Contenu

- **Installation** : création de la clé USB (MediaCreationTool / Rufus), installation avec **compte local uniquement** (5 méthodes détaillées : Rufus, `OOBE\BYPASSNRO`, `start ms-cxh:localonly`, registre BypassNRO, fausse adresse), installation des pilotes
- **Optimisation** : Chris Titus Tech **WinUtil** et **O&O ShutUp10++** (mode recommandé, désactivation des fonctionnalités IA : Copilot, Recall…)
- **Trucs et astuces** : commandes de diagnostic (`sfc`, `DISM`, `Get-PnpDevice`…), maintenance (`winget upgrade --all`, points de restauration), raccourcis et exemples PowerShell concrets

## Développement local

```bash
pip install zensical
zensical serve   # http://localhost:8000
```

## Déploiement

Chaque push sur `main` déclenche le workflow `.github/workflows/deploy.yml` qui construit le site et le publie sur GitHub Pages (source : *GitHub Actions* à activer dans Settings → Pages).
