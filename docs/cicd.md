# Déploiement CI/CD avec GitHub Pages

Ce site est généré avec **[Zensical](https://zensical.org)** (successeur moderne de MkDocs Material) et déployé automatiquement sur **GitHub Pages** à chaque push sur `main`.

## Fonctionnement

1. Le contenu est écrit en **Markdown** dans le dossier `docs/`.
2. La structure est déclarée dans `zensical.toml`.
3. Le workflow `.github/workflows/deploy.yml` :
   - installe Zensical (`pip install zensical`),
   - construit le site (`zensical build`),
   - publie le dossier `site/` sur GitHub Pages.

## Utilisation en local

```bash
pip install zensical
zensical serve    # prévisualisation sur http://localhost:8000
zensical build    # génération dans ./site
```

## Activer GitHub Pages (une seule fois)

1. Dans le dépôt → **Settings** → **Pages**.
2. *Source* : **GitHub Actions**.
3. Le site est publié à l'adresse : <https://vignemail1.github.io/guide-windows11/>
