# 🚫 Mythes et tweaks à éviter

> **Tous les « tweaks de registre » ne se valent pas.** Certains sont obsolètes, d'autres sont conçus pour les serveurs, d'autres encore sont carrément contre-productifs. Voici les plus répandus — et pourquoi il faut s'en éloigner.

!!! warning "Règle générale"
    Si un tweak promet des gains spectaculaires sans explication technique crédible, c'est probablement du bruit. Les vrais gains de performance viennent des **drivers**, du **matériel**, des **températures** et de la **configuration en jeu** — pas de clés de registre exotiques.

---

## 🔍 Comment reconnaître un mauvais tweak ?

Avant d'appliquer quoi que ce soit, posez-vous ces questions :

| Signal d'alerte | Pourquoi c'est suspect |
|-----------------|------------------------|
| « Fonctionne sur Windows XP/7/10/11 » | Les mécanismes internes de Windows ont radicalement changé. Un tweak valable sur XP ne l'est presque jamais sur 11. |
| Aucune explication du mécanisme | Un tweak sérieux peut expliquer *ce qu'il modifie* et *pourquoi ça aide*. |
| Promesse de gains énormes (+30 % FPS) | Les gains réels de tuning logiciel se mesurent en **pourcents à un chiffre**. |
| Liste de 50 tweaks en un seul fichier `.reg` | Vous ne saurez jamais lequel a aidé ou cassé quelque chose. Impossible à déboguer. |
| « Désactive tout » | Chaque service désactivé est une fonctionnalité en moins. Certains ont des dépendances inattendues. |
| Pas de benchmark avant/après | Sans mesure, c'est de la superstition. |

!!! tip "Sources fiables"
    Privilégiez : la documentation Microsoft officielle, les tests mesurés (Guru3D, ComputerBase, Hardware Unboxed), les outils avec benchmarks intégrés (CapFrameX, 3DMark), et les développeurs des outils eux-mêmes (Chris Titus documente ce que font ses scripts).

---

## 💾 Mythes mémoire

### ❌ `LargeSystemCache = 1`

```reg
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management]
"LargeSystemCache"=dword:00000001
```

**Ce que prétend le mythe** : « Plus de cache système = meilleures performances. »

**Ce que ça fait réellement** : cette valeur bascule l'équilibre mémoire de Windows. Au lieu de privilégier le cache de **vos applications** (le défaut, `0`), Windows privilégie le **cache du système de fichiers** — au détriment des applications.

**Pourquoi c'est mauvais pour le gaming** :

1. Un jeu veut que **ses propres données** restent en RAM (textures, assets, géométrie).
2. Avec `LargeSystemCache = 1`, les pages du jeu sont **évincées plus agressivement** vers le pagefile.
3. Résultat : le jeu recharge depuis le disque en cours de session → **stutters et micro-saccades**.
4. Le gain théorique (cache fichier) ne sert quasiment jamais en jeu : les moteurs modernes gèrent leur propre streaming d'assets.

**Pour qui c'est conçu** : les **serveurs de fichiers** Windows qui servent des milliers de fichiers à des clients réseau. C'est un tweak Server 2003 recyclé sans vérification depuis 20 ans.

**Annuler** :
```cmd
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" /v LargeSystemCache /f
```

---

### ❌ `NoLazyMode` et la désactivation du Memory Compression

```cmd
:: Prétendument « libère de la RAM »
Disable-MMAgent -MemoryCompression
```

**Ce que prétend le mythe** : « La compression mémoire gaspille du CPU et de la RAM. »

**Réalité** : la compression mémoire de Windows 10/11 compresse les pages inactives au lieu de les envoyer sur le disque. La désactiver signifie :

- Plus de pression sur la RAM physique disponible.
- Plus d'écritures pagefile (lentes, même sur NVMe).
- Plus de stutters quand la RAM se remplit.

Le coût CPU de la compression est **négligeable** sur tout processeur de moins de 10 ans. Le gain supposé est un placebo mesuré nulle part.

**Annuler** :
```powershell
Enable-MMAgent -MemoryCompression
```

---

### ❌ `DisablePagingExecutive = 1`

```reg
"DisablePagingExecutive"=dword:00000001
```

**Ce que prétend le mythe** : « Forcer le noyau à rester en RAM accélère tout. »

**Réalité** : cette clé empêche Windows de paginer certains composants du noyau. Sur un système avec suffisamment de RAM, Windows fait déjà ça naturellement. La forcer :

- Retire au système sa capacité à gérer les pics de charge mémoire.
- Peut provoquer des stutters quand la RAM se remplit (le noyau ne peut plus céder de place).
- N'apporte **aucun gain mesurable** sur les systèmes modernes avec 16 Go+ de RAM.

---

## 🌐 Mythes réseau

### ❌ TCP Optimizer et les « ping tweaks »

**Ce que prétend le mythe** : modifier des dizaines de paramètres TCP (`TCPNoDelay`, `TcpAckFrequency`, `NetworkThrottlingIndex`…) réduit le ping en jeu.

**Réalité** :

1. **La latence est physique** : votre ping dépend de la distance au serveur, de votre FAI, et du routage. Aucun réglage TCP local ne peut raccourcir un câble.
2. `TCPNoDelay` / `TcpAckFrequency` désactivent l'algorithme de Nagle, qui regroupe les petits paquets. Pour un jeu qui envoie déjà ses paquets immédiatement, l'effet est **nul**.
3. Ces réglages peuvent **dégrader** le streaming audio/vidéo et le téléchargement en ajoutant de l'overhead.
4. Le seul réglage réseau qui a un impact réel : **utiliser un câble Ethernet** au lieu du Wi-Fi.

**Ce qui aide vraiment le ping** :

- Câble Ethernet.
- Serveur de jeu géographiquement proche.
- QoS sur le routeur si d'autres appareils utilisent le réseau.
- DNS rapide (mais ça n'affecte que la résolution de noms, pas le ping en jeu).

---

## ⏱️ Mythes timers et démarrage

### ❌ Désactiver HPET

```cmd
bcdedit /deletevalue useplatformclock
```

*(parfois recommandé avec `useplatformclock false`, ce qui est encore pire)*

**Ce que prétend le mythe** : « HPET est lent, le désactiver réduit la latence. »

**Réalité** : HPET (High Precision Event Timer) est un timer matériel. Windows 10/11 **n'utilise plus HPET par défaut** — il utilise le TSC (Time Stamp Counter) du processeur, bien plus rapide. Le tweak est donc **inutile** dans le meilleur des cas.

### ⚠️ Le vrai piège : `useplatformclock true`

Certaines cartes mères récentes (notamment avec des chipsets AMD) activent HPET par défaut dans le BIOS, ce qui force Windows à utiliser un timer **plus lent** que le TSC.

**La bonne action** : vérifier que la valeur n'existe pas, ou la supprimer :

```cmd
:: Vérifier l'état actuel
bcdedit /enum | findstr useplatformclock

:: Si présente, la supprimer (JAMAIS la mettre à true)
bcdedit /deletevalue useplatformclock
```

!!! danger "Ne jamais faire"
    `bcdedit /set useplatformclock true` — force un timer lent, dégrade les frametimes et l'input lag. Si un guide vous dit de faire ça, fermez le guide.

---

### ❌ Timer Resolution forcé à 0.5 ms

Des outils comme *Timer Resolution* ou *SetTimerResolution* forcent la résolution du timer Windows à 0,5 ms en permanence.

**Réalité** :

- Windows 11 gère dynamiquement la résolution du timer depuis la version 2004. Les applications qui en ont besoin (les jeux) la demandent elles-mêmes.
- Forcer 0,5 ms en permanence **augmente la consommation** (le CPU ne descend plus en état de veille profonde) de 10-15 W au repos.
- Les gains mesurés sont marginaux sur les jeux anciens, **nuls ou négatifs** sur les moteurs récents.

---

## 🖥️ Mythes CPU et GPU

### ❌ « CPU Unpark » tools

Des outils comme *Unpark CPU* ou *ParkControl* prétendent « débloquer tous vos cœurs ».

**Réalité** : le **core parking** (mise en veille de cœurs inactifs) était problématique sous Windows 7 avec de mauvais drivers. Sous Windows 10/11 avec les drivers chipset AMD/Intel à jour :

- Le parking est géré intelligemment par le scheduler.
- Les cœurs se réveillent en **microsecondes** quand c'est nécessaire.
- Forcer tous les cœurs actifs en permanence augmente la consommation et les températures **sans gain** en jeu.

**Ce qui compte vraiment** : les drivers chipset à jour (AMD Chipset Drivers incluent les plans d'alimentation optimisés Ryzen).

---

### ❌ MSI Util v3 — activer le MSI Mode sur **tout**

*MSI Util v3* permet de passer les périphériques PCI en mode Message Signaled Interrupts. Le tweak populaire consiste à tout cocher.

**Réalité** :

- Le MSI mode est bénéfique pour le **GPU** (et c'est souvent déjà activé par défaut).
- L'activer sur **tous** les périphériques d'un coup (contrôleurs USB, SATA, audio, réseau) sans tester individuellement provoque :
    - Des bugs USB (périphériques qui se déconnectent).
    - Des craquements audio.
    - Une instabilité générale.

**Si vous voulez tester** : uniquement le GPU, un périphérique à la fois, avec benchmark avant/après.

---

### ❌ `Win32PrioritySeparation = 26`

```reg
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\PriorityControl]
"Win32PrioritySeparation"=dword:00000026
```

**Ce que prétend le mythe** : « 26 est la valeur magique pour le gaming. »

**Réalité** : cette valeur contrôle comment le scheduler partage le temps CPU entre les processus prioritaires et les tâches de fond.

| Valeur | Signification |
|--------|---------------|
| `38` (défaut) | Priorité aux applications au premier plan — **optimal pour le desktop/gaming** |
| `26` | Quantum fixe et long — conçu pour les **serveurs** |
| `40` | Quantum court et variable — parfois légèrement meilleur en gaming |

La valeur `26` est un tweak serveur. Pour le gaming, gardez `38` (défaut) ou testez `40` si vous voulez expérimenter.

---

## 📦 Mythes « tout-en-un »

### ❌ Les fichiers `.reg` « all tweaks gaming »

Des dizaines de sites proposent un fichier `.reg` unique avec 30 à 100 modifications.

**Pourquoi c'est dangereux** :

1. Vous appliquez des dizaines de changements **sans savoir ce que chacun fait**.
2. La moitié sont obsolètes (XP/7), un quart sont des tweaks serveur, un quart sont des placebos.
3. Si quelque chose casse, vous ne savez pas **lequel** des 50 réglages est responsable.
4. Pas de retour arrière possible sauf si vous avez un point de restauration.

**La bonne approche** : un changement à la fois, mesuré, documenté. C'est plus lent, mais c'est le seul moyen de savoir ce qui fonctionne sur **votre** machine.

---

### ❌ Le nettoyage de registre (CCleaner & co.)

**Ce que prétend le mythe** : « Un registre propre = un PC plus rapide. »

**Réalité** :

- Le registre Windows est une base de données **indexée**. Le temps de lecture d'une clé ne dépend pas du nombre total de clés.
- Supprimer des clés « orphelines » ne libère **aucun espace disque significatif** et n'accélère **rien**.
- Le risque est réel : supprimer une clé encore utilisée peut casser une application ou un composant Windows.
- Microsoft elle-même [ne recommande pas](https://support.microsoft.com/en-us/windows) les nettoyeurs de registre.

**Ce qui aide vraiment** : ne pas installer ce qui rend le nettoyage « nécessaire ». Désinstallez proprement les applications que vous n'utilisez plus.

---

## 📊 Tableau récapitulatif

| Tweak | Le mythe | La réalité | Verdict |
|-------|----------|------------|---------|
| `LargeSystemCache = 1` | Plus de cache = plus rapide | Conçu pour les serveurs de fichiers, évince les jeux de la RAM | ❌ |
| Désactiver Memory Compression | Libère de la RAM | Plus de pagefile, plus de stutters | ❌ |
| `DisablePagingExecutive = 1` | Le noyau reste en RAM | Aucun gain, risque de stutters en charge | ❌ |
| TCP Optimizer / ping tweaks | Réduit le ping | La latence est physique, effet nul ou négatif | ❌ |
| Désactiver HPET | Timer plus rapide | Windows n'utilise plus HPET par défaut | 🟡 Inutile |
| `useplatformclock true` | Force un timer précis | Force un timer **lent**, dégrade les performances | ❌⚠️ |
| Timer Resolution 0,5 ms | Meilleure précision | +10-15 W consommation, gains nuls sur jeux récents | 🟡 |
| CPU Unpark | Débloque tous les cœurs | Le parking n'est plus un problème sous W10/11 | 🟡 Obsolète |
| MSI Util sur tout | Moins de latence IRQ | Bugs USB/audio si appliqué aveuglément | ⚠️ GPU seul |
| `Win32PrioritySeparation = 26` | Valeur magique gaming | C'est une valeur **serveur** | ❌ |
| Fichiers `.reg` tout-en-un | Optimisation complète | 50 tweaks aveugles, impossible à déboguer | ❌ |
| Nettoyage de registre | Registre propre = rapide | Aucun impact, risque de casse | ❌ |

---

## 🧪 Comment vérifier soi-même

Ne me croyez pas sur parole — **mesurez** :

1. Installez **CapFrameX** et choisissez un jeu de référence.
2. Lancez un benchmark de 60 secondes sur une scène reproductible.
3. Notez les **FPS moyens**, les **1 % low** et les **0,1 % low**.
4. Appliquez **un seul** tweak.
5. Redémarrez, relancez le benchmark dans les mêmes conditions.
6. Comparez. Si le gain est inférieur à 2 % (marge d'erreur), le tweak ne fait rien.

Consultez la page [Benchmarks](benchmarks.md) pour la procédure complète.

!!! quote "Règle d'or"
    Si un tweak n'apporte aucun gain mesurable sur **votre** machine avec **vos** jeux, il ne sert à rien — peu importe combien de forums le recommandent.
