# Préparation de l'installation

## Matériel nécessaire

- Une **clé USB de 8 Go minimum** (elle sera entièrement effacée).
- Un PC cible compatible Windows 11 (TPM 2.0, Secure Boot, processeur supporté).

## Télécharger Windows 11

1. Rendez-vous sur le site officiel : <https://www.microsoft.com/fr-fr/software-download/windows11>
2. Téléchargez le **fichier ISO** (option « Télécharger l'image de disque Windows 11 (ISO) »)
   ou l'**outil de création de support**.

## Créer la clé USB d'installation

### Option 1 : Outil de création de support (le plus simple)

1. Lancez `MediaCreationTool.exe`.
2. Choisissez « Créer un support d'installation » → sélectionnez votre clé USB.
3. Attendez la fin du processus.

### Option 2 : Rufus (recommandé — permet de préconfigurer le compte local)

1. Téléchargez [Rufus](https://rufus.ie) (gratuit, portable).
2. Sélectionnez la clé USB et l'ISO Windows 11.
3. Cliquez sur **Démarrer**. Une fenêtre « Personnaliser l'installation » apparaît :
    - ✅ **Supprimer l'exigence d'un compte Microsoft en ligne** ← *cochez cette case !*
    - ✅ Créer un compte local avec le nom : *(votre prénom)*
    - ✅ Désactiver la collecte de données
4. Validez : la clé installera Windows **directement avec un compte local**, sans manipulation supplémentaire.

!!! tip "Astuce"
    Avec Rufus 4.x et cette option cochée, aucune des méthodes de contournement
    de la page suivante ne sera nécessaire.
    C'est la méthode la plus simple pour un débutant.

## Démarrer sur la clé USB

1. Branchez la clé sur le PC cible éteint.
2. Allumez le PC et appuyez sur la touche de **menu de démarrage** selon la marque :
    - ASUS : ++f8++ ou ++esc++
    - MSI : ++f11++
    - Gigabyte : ++f12++
    - HP : ++f9++
    - Dell : ++f12++
    - Lenovo : ++f12++
3. Sélectionnez la clé USB dans la liste.
