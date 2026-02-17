// ==UserScript==
// @name         Usman Pro - Exness Instant Redirect Only
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Instant Redirect from Exness to Terminal - No Lot Logic
// @author       Usman
// @match        *://*.exness.global/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/Exness_Auto_Redirect.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/Exness_Auto_Redirect.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // INSTANT REDIRECT: Palk jhapakte hi terminal par le jayega
    if (window.location.href.indexOf("exness.global") > -1) {
        // replace() use kiya hai taake back button dabane se wapis exness par na jaye
        window.location.replace("https://mt5real35.exwebterm.com/terminal?version=&lang=en&save_password=off");
    }

})();
