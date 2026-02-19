// ==UserScript==
// @name         Usman Pro -Trade Terminal  Icon Hider
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides specific market icon permanently and stays linked to GitHub
// @author       Usman
// @match        *://*.metatrader5.com/*
// @match        *://*.exwebterm.com/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_Icon_Hider.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_Icon_Hider.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // CSS ke zariye icon ko hide karne ka sab se pakka tareeqa
    const style = document.createElement('style');
    style.id = 'usman-surgical-hider';
    style.innerHTML = `
        /* Aapka bataya hua exact path */
        body > div.layout.svelte-vce879 > div.left-bar.svelte-jpmtzd > div.left-panel.svelte-1xnpsl6 > div:nth-of-type(2) > div:nth-of-type(1),
        body > div.layout.svelte-vce879 > div.left-bar.svelte-jpmtzd > div.left-panel.svelte-1xnpsl6 > div:nth-of-type(2) > div:nth-of-type(1) > div.icon.svelte-1qoe9jm {
            display: none !important;
            pointer-events: none !important;
            visibility: hidden !important;
            width: 0px !important;
            height: 0px !important;
            margin: 0px !important;
            padding: 0px !important;
        }
    `;

    // Style inject karne ka function
    function injectStyle() {
        if (!document.getElementById('usman-surgical-hider')) {
            document.documentElement.appendChild(style);
        }
    }

    injectStyle();

    // Backup: Agar Svelte classes change hon ya page refresh ho
    const observer = new MutationObserver(injectStyle);
    observer.observe(document.documentElement, { childList: true, subtree: true });

})();
