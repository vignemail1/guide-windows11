# Installation avec compte local uniquement

Depuis Windows 11 22H2, Microsoft impose un compte Microsoft à l'installation (éditions Famille et Professionnel incluses en 24H2+). Voici **toutes les méthodes** pour l'éviter, de la plus simple à la plus récente.

## Méthode 1 : Rufus (recommandée) ⭐

Cochez l'option « Supprimer l'exigence d'un compte Microsoft » lors de la création de la clé (voir [Préparation](preparation.md)). L'installation proposera directement la création d'un **compte local**. Rien d'autre à faire.

## Méthode 2 : La commande `OOBE\BYPASSNRO` (24H2 et versions antérieures)

!!! warning "Fonctionne sur 24H2 — retirée progressivement dans les builds 25H2/26H2"

1. Procédez à l'installation jusqu'à l'écran **« Connectons-vous à un réseau »**.
2. Appuyez sur `Maj + F10` pour ouvrir l'invite de commandes.
3. Tapez :

       OOBE\BYPASSNRO

4. Le PC redémarre. De retour à l'écran réseau, une option **« Je n'ai pas d'Internet »** apparaît.
5. Cliquez dessus → **« Continuer avec une installation limitée »**.
6. Créez votre compte local (nom + mot de passe facultatif).

## Méthode 3 : Débrancher le réseau + `ms-cxh:localonly` (25H2 / 26H2) ⭐ récente

Méthode la plus fiable sur les versions récentes : le PC **ne doit pas être connecté à Internet** (débranchez le câble Ethernet, ne vous connectez pas au Wi-Fi).

1. À l'écran de connexion réseau/compte Microsoft, appuyez sur `Maj + F10`.
2. Tapez :

       start ms-cxh:localonly

3. Une fenêtre de création de **compte local** s'ouvre directement.
4. Renseignez le nom d'utilisateur et le mot de passe, puis poursuivez l'installation.

!!! tip
    Si le PC est déjà connecté en Wi-Fi via l'OOBE, ouvrez `Maj + F10` et tapez `ipconfig /release` pour couper la connexion avant la commande.

## Méthode 4 : Modifier le registre (alternative 25H2+)

Si `OOBE\BYPASSNRO` est bloqué :

1. `Maj + F10` → tapez `regedit`.
2. Naviguez jusqu'à :

       HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\OOBE

3. Créez une valeur **DWORD (32 bits)** nommée `BypassNRO` avec la valeur `1`.
4. Fermez, tapez `shutdown /r /t 0` pour redémarrer, puis l'option « Je n'ai pas d'Internet » sera disponible.

## Méthode 5 : Fausse adresse e-mail (fonctionne parfois)

1. À l'écran de connexion du compte Microsoft, entrez `a@a.com` et un mot de passe quelconque.
2. Après le message d'erreur « Ce compte est verrouillé », cliquez sur **« Options de connexion »** → **« Compte hors connexion »**.

!!! note
    Microsoft corrige régulièrement cette astuce ; préférez les méthodes 1 à 4.

## Finaliser l'installation

Après création du compte local :

1. **Refusez** les options de télémétrie sur les écrans de confidentialité (localisation, diagnostics, annonces personnalisées…).
2. Refusez l'essai de Microsoft 365 / Game Pass si proposé.
3. Arrivé sur le bureau, passez à l'[installation des pilotes](pilotes.md).

!!! warning "Ne branchez le réseau qu'après la création du compte local"
    Si vous connectez Internet avant, Windows peut forcer la conversion vers un compte Microsoft.
