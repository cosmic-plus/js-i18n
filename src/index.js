"use strict"
/**
 * @exports i18n
 */
let i18n

const env = require("@cosmic-plus/jsutils/es5/env")

if (env.isBrowser) {
  const Y18N = require("y18n-browser")
  module.exports = i18n = new Y18N()
} else {
  const y18n = env.nodeRequire("y18n")
  module.exports = i18n = y18n({ updateFiles: false })
}

/*******************************************************************************
 * Additional utilities
 */

/**
 * Returns a translated i18n HTML element
 *
 * @param  {String} message
 * @return {HTMLElement}
 */
if (env.isBrowser) {
  i18n.__t = function (message) {
    const domNode = document.createElement("i18n")
    domNode.textContent = i18n.__(message)
    return domNode
  }
}

/**
 * Returns the system locale.
 *
 * @return {String}
 */
i18n.systemLocale = function () {
  if (env.isBrowser) {
    if (navigator.languages && navigator.languages[0]) {
      return navigator.languages[0]
    } else {
      return navigator.language || navigator.browserLanguage
    }
  } else {
    // Taken from https://github.com/noob9527/universal-locale/blob/master/index.ts
    const env = process.env
    const localeStr = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE
    const res = localeStr && localeStr.replace(/[.:].*/, "").replace("_", "-")
    return res ? res : undefined
  }
}

i18n._setLocale = i18n.setLocale
/**
 * Set current locale to **language**. Update the HTML DOM translations when
 * relevant.
 *
 * @param {[type]} language [description]
 */
i18n.setLocale = function (language) {
  i18n._setLocale(language)
  if (typeof document !== "undefined") i18n.translateDom()
}

/**
 * Set the current local to the system locale.
 */
i18n.useSystemLocale = function () {
  i18n.setLocale(i18n.systemLocale().replace(/-.*/, ""))
}

/**
 * Add messages from **translation** to **language**.
 *
 * @param {String} language
 * @param {Object} obj A translation object
 */
i18n.addTranslation = function (language, translation) {
  const current = i18n.getLocale()
  i18n.setLocale(language)
  i18n.updateLocale(translation)
  i18n.setLocale(current)
}

/**
 * Translate <i18n> HTML elements inside **element** DOM tree.
 *
 * @param  {HTMLElement} [element] `document` by default
 */
if (env.isBrowser) {
  i18n.translateDom = function (element = document) {
    element.querySelectorAll("i18n").forEach(node => {
      node.textContent = i18n.__(node.textContent)
    })
  }
}
