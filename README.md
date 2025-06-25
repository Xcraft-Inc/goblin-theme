# 📘 goblin-theme

## Aperçu

Le module `goblin-theme` est un système de gestion de thèmes visuels pour l'écosystème Xcraft. Il fournit un framework complet pour composer, éditer et appliquer des thèmes graphiques dynamiques aux applications. Le module permet de créer des thèmes personnalisés en combinant différents éléments : couleurs, espacements, temporisations et styles visuels.

## Sommaire

- [Structure du module](#structure-du-module)
- [Fonctionnement global](#fonctionnement-global)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Interactions avec d'autres modules](#interactions-avec-dautres-modules)
- [Configuration avancée](#configuration-avancée)
- [Détails des sources](#détails-des-sources)

## Structure du module

Le module s'organise autour de plusieurs composants principaux :

- **Acteur theme-composer** : Gestionnaire central des thèmes et compositions (type Goblin)
- **Acteur theme-editor** : Service d'édition et d'application des thèmes (type Goblin)
- **Widgets d'édition** : Interface utilisateur pour créer et modifier les thèmes
- **Bibliothèques utilitaires** : Outils de manipulation des couleurs et unités
- **Builders par défaut** : Constructeurs pour générer les différents aspects d'un thème
- **Collections prédéfinies** : Palettes de couleurs, espacements et styles

## Fonctionnement global

Le système fonctionne selon une architecture modulaire où chaque thème est composé de quatre éléments principaux :

1. **Colors** : Définit la palette de couleurs (base, hilite, light, dark, etc.)
2. **Spacing** : Configure les espacements, marges et tailles de police
3. **Timing** : Gère les durées d'animations et transitions
4. **Look** : Détermine l'apparence générale et les accessoires visuels

L'acteur `theme-composer` orchestre la composition des thèmes en chargeant dynamiquement ces éléments depuis des fichiers de configuration. Les thèmes peuvent être créés à la volée ou prédéfinis via la configuration du module.

Le processus de composition suit cette logique :

1. Chargement des fichiers de configuration pour chaque composant (colors, spacing, timing, look)
2. Application des builders pour générer la palette complète, les formes et les styles
3. Stockage du thème composé dans l'état de l'acteur
4. Notification des changements aux composants d'interface

L'acteur `theme-editor` agit comme une interface entre l'éditeur de thème et le bureau, permettant d'appliquer les changements de thème en temps réel.

## Exemples d'utilisation

### Création d'un compositeur de thème

```javascript
const themeComposer = await this.quest.create('theme-composer', {
  id: 'theme-composer@myApp',
  desktopId,
  displayName: 'Mon Thème',
  builder: 'default',
  colors: 'default',
  spacing: 'default',
  timing: 'default',
  look: 'default',
});
```

### Composition d'un nouveau thème

```javascript
await themeComposer.composeTheme({
  name: 'custom-theme',
  displayName: 'Thème Personnalisé',
  colors: 'dark',
  spacing: 'compact',
  timing: 'default',
  look: 'default',
});
```

### Utilisation des utilitaires de couleur

```javascript
const {ColorManipulator} = require('goblin-theme');

// Assombrir une couleur
const darkerColor = ColorManipulator.darken('#336799', 0.2);

// Ajouter de la transparence
const fadedColor = ColorManipulator.fade('#336799', 0.5);

// Calculer le contraste
const ratio = ColorManipulator.getContrastRatio('#ffffff', '#000000');
```

### Utilisation des utilitaires d'unités

```javascript
const {Unit} = require('goblin-theme');

// Convertir en pixels
const pixels = Unit.toPx(16); // "16px"

// Additionner des valeurs avec unités
const total = Unit.add('10px', '5px'); // "15px"

// Multiplier une valeur
const doubled = Unit.multiply('10px', 2); // "20px"
```

### Application d'un thème via l'éditeur

```javascript
const themeEditor = await this.quest.create('theme-editor', {
  id: 'theme-editor@myApp',
  desktopId,
});

// Sélectionner et appliquer un thème
await themeEditor.select({composition: 'dark-theme'});
```

## Interactions avec d'autres modules

Le module `goblin-theme` interagit étroitement avec :

- **[goblin-laboratory]** : Fournit le composant `Frame` pour appliquer les thèmes et les widgets de base
- **[goblin-gadgets]** : Utilise les widgets de base pour l'interface d'édition
- **[xcraft-core-etc]** : Charge la configuration des compositions de thèmes
- **[xcraft-core-converters]** : Convertit les formats de couleurs
- **[xcraft-core-goblin]** : Framework de base pour les acteurs theme-composer et theme-editor

## Configuration avancée

| Option            | Description                                  | Type  | Valeur par défaut |
| ----------------- | -------------------------------------------- | ----- | ----------------- |
| `compositions`    | Liste des compositions de thèmes disponibles | Array | `[]`              |
| `subThemeContext` | Liste des contextes de sous-thèmes           | Array | `[]`              |

## Détails des sources

### `lib/index.js`

Point d'entrée principal du module qui expose les utilitaires de manipulation des couleurs, des unités et les builders par défaut. Fournit une API unifiée pour accéder aux fonctionnalités du système de thèmes à travers les objets `ColorManipulator`, `ColorHelpers`, `Unit` et `defaultBuilders`.

### `lib/theme-composer.js`

Acteur Goblin qui gère la composition et la gestion des thèmes. Il orchestre la création de thèmes en combinant les différents éléments (couleurs, espacements, etc.) et maintient l'état des thèmes disponibles.

#### État et modèle de données

L'état du compositeur contient :

- `id` : Identifiant unique du compositeur
- `themes` : Map des thèmes disponibles indexés par nom (contient le thème 'default' et les compositions configurées)
- `colors` : Map des palettes de couleurs utilisées

#### Méthodes publiques

- **`create(desktopId, displayName, builder, colors, spacing, timing, look)`** — Initialise un nouveau compositeur de thème avec les paramètres spécifiés et charge automatiquement les compositions configurées dans `goblin-theme.compositions`.
- **`composeTheme(name, displayName, builder, colors, spacing, timing, look, meta)`** — Compose un nouveau thème en combinant les éléments fournis et l'ajoute à la collection. Utilise la fonction `composeTheme` interne pour charger et assembler les composants.
- **`change(path, newValue, clientSessionId)`** — Modifie une propriété d'un thème existant et déclenche un événement de rechargement pour la session client spécifiée.

### `lib/themes/color-manipulator.js`

Bibliothèque complète de manipulation des couleurs offrant des fonctions pour modifier la luminosité, la saturation, la transparence et calculer les contrastes. Supporte les formats hexadécimaux, RGB, RGBA, HSL et HSLA avec des conversions automatiques entre espaces colorimétriques (RGB, HSL, HSV).

#### Fonctions principales

- **`darken(color, coefficient)`** — Assombrit une couleur selon le coefficient donné
- **`lighten(color, coefficient)`** — Éclaircit une couleur selon le coefficient donné
- **`fade(color, value)`** — Applique une transparence à une couleur
- **`emphasize(color, coefficient)`** — Assombrit ou éclaircit automatiquement selon la luminance
- **`getContrastRatio(foreground, background)`** — Calcule le ratio de contraste entre deux couleurs selon les standards WCAG
- **`getLuminance(color)`** — Calcule la luminance relative d'une couleur
- **`convertHexToRGB(color)`** — Convertit une couleur hexadécimale en format RGB
- **`convertHexToRGBObject(hex)`** — Convertit une couleur hexadécimale en objet RGB
- **`saturate(color, coefficient)`** — Modifie la saturation d'une couleur
- **`brightnen(color, coefficient)`** — Modifie la luminosité d'une couleur dans l'espace HSV

### `lib/themes/color-helpers.js`

Utilitaires spécialisés pour la gestion des couleurs dans le contexte des thèmes Xcraft. Fournit notamment la fonction `getMarkColor` qui résout les références de couleurs symboliques comme 'primary', 'secondary', 'success', etc. vers les couleurs effectives du thème.

#### Fonctions principales

- **`getMarkColor(theme, value)`** — Résout une référence de couleur symbolique vers la couleur effective du thème. Supporte les couleurs directes (hex, rgb), les mots-clés de couleur (primary, secondary, success, etc.) et les conversions automatiques depuis d'autres espaces colorimétriques.

### `lib/themes/unit.js`

Système de gestion des unités CSS permettant de manipuler et convertir les valeurs avec unités (px, rem, em, %, vmax, vmin, vh, vw). Offre des opérations arithmétiques sur les valeurs avec unités et gère la conversion entre différentes unités CSS.

#### Fonctions principales

- **`toValue(value)`** — Extrait la valeur numérique d'une chaîne avec unité
- **`toInt(value)`** — Convertit une chaîne avec unité en entier
- **`toPx(value)`** — Convertit un nombre en chaîne avec unité 'px'
- **`toPc(n)`** — Convertit un nombre en pourcentage
- **`to(n, cssUnit)`** — Convertit une valeur vers une unité CSS spécifique avec support des ratios
- **`parse(value)`** — Analyse une valeur et retourne un objet {value, unit}
- **`fix(value, decimals)`** — Formate un nombre avec un nombre spécifique de décimales
- **`multiply(value, factor, rounded)`** — Multiplie une valeur avec gestion des unités et options d'arrondi
- **`add(a, b, decimals)`** — Additionne deux valeurs avec unités compatibles
- **`sub(a, b, decimals)`** — Soustrait deux valeurs avec unités compatibles

### `widgets/theme-composer/widget.js`

Widget principal qui orchestre l'interface d'édition des thèmes en combinant le sélecteur de compositions, l'éditeur de détails et l'aperçu des exemples. Gère la visibilité conditionnelle basée sur le contexte de thème sélectionné.

### `widgets/composition-selector/widget.js`

Interface de sélection des thèmes disponibles avec support pour les thèmes "easter eggs" cachés. Affiche la liste des compositions avec leur nom d'affichage et permet la sélection active. Inclut un bouton secret pour activer l'accès aux thèmes expérimentaux marqués avec `meta.egg = true`.

### `widgets/composition-detail/widget.js`

Éditeur détaillé des propriétés d'un thème permettant de modifier en temps réel les couleurs, espacements et autres paramètres. Utilise les définitions de propriétés des fichiers `props.js` pour générer automatiquement les champs d'édition appropriés. Supporte l'édition conditionnelle selon le thème actuel et organise les propriétés par catégories avec tri automatique.

### `widgets/composition-samples/widget.js`

Aperçu en temps réel des thèmes avec des exemples d'interface utilisateur. Affiche une application factice utilisant le thème sélectionné pour visualiser l'impact des modifications. Inclut des contrôles de mise à l'échelle et présente divers composants UI (boutons, champs, tableaux, tickets, jauges, sliders, etc.) dans un environnement de démonstration complet avec barres de tâches, onglets et panneaux.

### `widgets/context-switch/widget.js`

Sélecteur de contexte permettant de basculer entre différents compositeurs de thème disponibles. Affiche la liste des applications ayant un compositeur de thème actif et permet de naviguer entre elles pour éditer leurs thèmes respectifs.

### `widgets/theme-editor/service.js`

Acteur Goblin pour l'éditeur de thème qui gère les interactions avec le bureau et l'application des changements de thème.

#### État et modèle de données

L'état de l'éditeur contient :

- `id` : Identifiant unique de l'éditeur

#### Méthodes publiques

- **`create(desktopId)`** — Initialise un nouvel éditeur de thème pour le bureau spécifié.
- **`select(composition)`** — Applique le thème sélectionné au bureau en utilisant l'API du bureau pour déclencher le changement de thème.

### `widgets/theme-editor/widget.js`

Widget principal de l'éditeur de thème qui combine le sélecteur de contexte et les compositeurs de thème pour chaque application disponible. Affiche une interface complète permettant de basculer entre les différents contextes d'application et d'éditer leurs thèmes respectifs.

### `widgets/theme-context/index.js`

Configuration du contexte de thème incluant les polices, styles globaux et builders. Définit l'environnement d'exécution pour l'application des thèmes avec chargement des polices Lato et configuration des styles CSS globaux. Fournit les fonctions `getFonts` et `getGlobalStyles` pour l'intégration avec le système de thèmes.

### `widgets/theme-context/fa-free.js` et `widgets/theme-context/fa-pro.js`

Configuration des icônes FontAwesome pour les versions gratuite et professionnelle. Ces fichiers initialisent la bibliothèque d'icônes utilisée dans l'interface des thèmes en chargeant les icônes nécessaires selon la licence disponible. Incluent des mappings et des fallbacks pour assurer la compatibilité entre les versions.

### Builders par défaut

Les builders sont des fonctions qui génèrent les différents aspects d'un thème :

#### `default-palette-builder.js`

Génère la palette de couleurs complète à partir des couleurs de base. Applique des transformations automatiques selon le mode sombre/clair et calcule toutes les variantes de couleurs nécessaires pour l'interface (backgrounds, borders, text colors, etc.). Utilise les fonctions de manipulation de couleurs pour créer des variations cohérentes et gère automatiquement l'inversion des transformations pour les thèmes sombres.

#### `default-shapes-builder.js`

Calcule les formes, tailles et espacements des éléments UI basés sur les paramètres de spacing. Génère les dimensions pour tous les composants (boutons, barres, panneaux, etc.) en utilisant les unités de base et les fonctions de manipulation d'unités. Adapte automatiquement les ombres et effets visuels selon le mode sombre/clair.

#### `default-styles-builder.js`

Fournit les styles CSS de base et utilitaires incluant les resets CSS, les tailles complètes et les styles de mise en page fondamentaux. Définit des objets de style réutilisables pour normaliser l'apparence des éléments avec des utilitaires pour les marges, paddings, bordures et alignements.

#### `default-transitions-builder.js`

Configure les animations et transitions avec des durées basées sur les paramètres de timing. Définit les transitions par défaut, les fonctions d'easing et les animations spécialisées (rotation, glissement, overlay, etc.). Inclut des fonctions utilitaires `create` et `easeOut` pour générer des transitions CSS personnalisées.

#### `default-typo-builder.js`

Définit la typographie et les polices en utilisant les paramètres de spacing pour la famille de police et l'échelle. Configure la pile de polices de fallback pour assurer la compatibilité avec les polices système.

### Collections prédéfinies

Le module inclut des collections prêtes à l'emploi organisées par catégories :

#### Colors

Palettes de couleurs prédéfinies avec support pour les thèmes sombres et clairs :

- `default-colors` : Palette bleue standard
- `dark-colors`, `matrix-colors`, `dragula-colors` : Thèmes sombres avec couleurs vives
- `nord-colors` : Palette inspirée du thème Nord
- `green-colors`, `red-colors`, `pink-colors` : Variantes colorées
- `steampunk-colors`, `oldtimer-colors`, `clock-colors` : Thèmes spécialisés rétro
- `mono-colors` : Thème monochrome

#### Spacings

Configurations d'espacement pour différents styles d'interface :

- `default-spacing` : Espacement standard (32px de hauteur de ligne)
- `compact-spacing` : Interface compacte (25px de hauteur de ligne)
- `rounded-spacing`, `smooth-spacing` : Variantes avec rayons arrondis
- `special-spacing` : Configuration expérimentale avec espacement négatif
- `clock-spacing`, `oldtimer-spacing`, `steampunk-spacing`, `royal-spacing` : Espacements thématiques avec polices spécialisées

#### Timings

Paramètres de temporisation pour les animations :

- `default-timing` : Durée de base de 250ms pour toutes les animations

#### Looks

Styles visuels définissant l'apparence générale :

- `default-look` : Style moderne standard avec horloge analogique configurable
- `dark-look`, `green-look`, `mono-look`, `nord-look`, `pink-look` : Variantes de style moderne
- `clock-look`, `oldtimer-look`, `royal-look`, `steampunk-look` : Styles rétro avec accessoires (vis, engrenages) et gadgets d'accueil personnalisés

### Fichiers de propriétés

Chaque catégorie inclut un fichier `props.js` définissant les types et contraintes des propriétés éditables, utilisé par l'interface d'édition pour générer automatiquement les contrôles appropriés. Ces fichiers spécifient les types de champs (color, pixel, bool, combo, integer, number, etc.) avec leurs paramètres de validation (min, max, step, list) et permettent la génération dynamique de l'interface d'édition.

---

_Document mis à jour_

[goblin-laboratory]: https://github.com/Xcraft-Inc/goblin-laboratory
[goblin-gadgets]: https://github.com/Xcraft-Inc/goblin-gadgets
[xcraft-core-etc]: https://github.com/Xcraft-Inc/xcraft-core-etc
[xcraft-core-converters]: https://github.com/Xcraft-Inc/xcraft-core-converters
[xcraft-core-goblin]: https://github.com/Xcraft-Inc/xcraft-core-goblin