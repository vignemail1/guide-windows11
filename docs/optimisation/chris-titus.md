# Optimisation avec Chris Titus Tech WinUtil

**WinUtil** est un outil gratuit et open source de Chris Titus Tech qui permet d'installer des logiciels, appliquer des réglages (tweaks), supprimer les applications préinstallées (bloatware) et configurer Windows proprement.

## Lancement

Ouvrez **PowerShell en administrateur** (clic droit sur Démarrer → *Terminal (administrateur)*) et tapez :

```powershell
irm "https://christitus.com/win" | iex
```

## Onglet « Install » : logiciels utiles

Cochez et installez en un clic vos logiciels (navigateur, 7-Zip, VLC, Notepad++, lecteur PDF…). WinUtil utilise `winget`, le gestionnaire de paquets officiel de Microsoft.

## Onglet « Tweaks » : réglages recommandés

1. Cliquez sur le bouton **« Desktop »** ou **« Laptop »** selon votre machine : cela sélectionne automatiquement les réglages **recommandés et sûrs**.
2. Parmi les réglages clés appliqués :
   - Désactivation de la **télémétrie** et du pistage publicitaire,
   - Désactivation de **Copilot / Recall** et autres **fonctionnalités IA**,
   - Désactivation des suggestions et publicités dans le menu Démarrer,
   - Ajustements d'interface (afficher les extensions de fichiers, menus classiques).
3. Cliquez sur **« Run Tweaks »**.

!!! info "Fonctionnalités IA désactivées"
    WinUtil peut désactiver : **Windows Copilot**, **Recall** (capture d'écran continue), la recherche IA et les suggestions cloud — des fonctionnalités gourmandes en ressources et intrusives pour la vie privée.

## Onglet « Config » et « Updates »

- **Config** : activer les fonctions Windows utiles (sandbox, etc.).
- **Updates** : régler la politique de mise à jour. Le réglage **« Security »** retarde les mises à jour de fonctionnalités tout en conservant les mises à jour de sécurité — recommandé pour un débutant.

!!! warning "Prudence"
    - Créez un **point de restauration** avant (WinUtil le propose).
    - Ne cochez pas les réglages marqués « advanced » sans les comprendre.
    - Ne supprimez pas le Microsoft Store si vous comptez l'utiliser.
