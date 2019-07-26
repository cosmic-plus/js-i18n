# @cosmic-plus/i18n

![Licence](https://img.shields.io/github/license/cosmic-plus/js-{package}.svg)
[![Dependencies](https://david-dm.org/cosmic-plus/js-{package}/status.svg)](https://david-dm.org/cosmic-plus/js-{package})
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@cosmic-plus/{package}.svg)
![Size](https://img.shields.io/bundlephobia/minzip/@cosmic-plus/{package}.svg)
![Downloads](https://img.shields.io/npm/dt/@cosmic-plus/{package}.svg)

Lightweight internationalization framework that supports both Node.js and
browser environment. Based on [y18n](https://www.npmjs.com/package/y18n) and
[y18n-browser](https://www.npmjs.com/package/y18n-browser); Similar to
gettext.

## Install

### NPM

```sh
npm install @cosmic-plus/i18n
npm install --save-dev @cosmic-plus/i18n-extractor
npm install -g @cosmic-plus/i18n-extractor
```

### Yarn

```sh
yarn add @cosmic-plus/i18n
yarn add --dev @cosmic-plus/i18n-extractor
yarn global add @cosmic-plus/i18n-extractor
```

## Use

### Initialize on-the-fly translation

```js
// Load i18n module.
const i18n = require("@cosmic-plus/i18n")

// Declare translation files.
i18n.addTranslation("${language1}", require("../locales/${language1}.json"))
i18n.addTranslation("${language2}", require("../locales/${language2}.json"))
...

// Enable translation.
i18n.useSystemLocale()   //or i18n.setLocale(language)
```

### Declare translatable strings (JavaScript)

```js
// Load translation utilities
const { __, __n, __t } = require("@cosmic-plus/i18n")

// Simple message.
console.log(__("Hello, world!"))

// Message with variables.
function greetings(name) {
  console.log(__("How are you, %s?", name))
}

// Message with singular/plural switch.
function cats(count) {
  console.log(__n("There is %d cat.", "There are %d cats.", count))
}

// Message with both variables and singular/plural switch
function cars(count, color) {
  console.log(__n("I have one %s car.", "I have %d %s cars.", count, color))
}

// Create a translatable HTML element from JavaScript
const domNode = __t("My message to the world")
```

### Declare translatable string (HTML)

```html
<i18n>My message to the world</i18n>
```

### Extract translatable strings

To generate new translation JSON files:

```js
i18n-extractor ${language1},${language2} ${sourceDir}...
```

To update existing translation JSON files:

```
i18n-extractor all ${sourceDir}...
```

### Translate

The JSON translation files are located in `${project_root}/locales`.

**Translation example:**

```json
{
  "Hello, world!": "Bonjour, le monde!",
  "How are you, %s?": "Comment allez-vous, %s?",
  "There is %d cat.": {
    "one": "Il y a %d chat.",
    "other": "Il y a %d chats."
  },
  "I have one %s car.": {
    "one": "J'ai une voiture %s.",
    "other": "J'ai %d voitures %s."
  },
  "My message to the world": "Mon message pour le monde"
}
```

## Complete documentation

The `i18n-extractor` documentation is
[here](https://github.com/cosmic-plus/node-i18n-extractor).

**i18n.\_\_(str, arg, arg, arg)**

Print a localized string. `%s` will be replaced with `arg`s.

**i18n.\_\_n(singular, plural, count, arg, arg, arg)**

Print a localized string with appropriate pluralization. If `%d` is provided in
the string, the `count` will replace this placeholder.

**i18n.\_\_t(str)**

Create an i18n HTML element containing a localized string.

**i18n.setLocale(language)**

Set the current locale being used. In browser environment, update _document_ DOM
node accordingly.

**i18n.getLocale()**

What locale is currently being used?

**i18n.updateLocale(translation)**

Update the current locale with the key/value pairs in `translation`.

**i18n.systemLocale()**

Returns the system locale.

**i18n.useSystemLocale()**

Set the current locale to the system locale. In browser environment, update
_document_ DOM node accordingly.

**i18n.addTranslation(language, translation)**

Add key/value pairs from `translation` to `language` locale.
