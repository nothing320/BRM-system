// ==UserScript==
// @name         Usman Pro - Final Test
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Color Test for Update Logic
// @author       Usman
// @match        *://*.metatrader5.com/*
// @match        *://*.exwebterm.com/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/Link%20Test.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/Link%20Test.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Test ke liye: Page ka background halka neela (light blue) ho jayega
    document.body.style.backgroundColor = "lightblue";
    console.log("Usman Bhai: Version 1.4 Check!");
})();
