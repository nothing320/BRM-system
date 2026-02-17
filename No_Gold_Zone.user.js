// ==UserScript==
// @name         Usman Pro - No Gold (XAU/GOLD) Block
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Blocks XAU and GOLD typing in search bar
// @author       Usman
// @match        https://mt5real35.exwebterm.com/terminal?*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_No_Gold_Zone.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_No_Gold_Zone.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const searchPath = 'body > div.layout.svelte-vce879 > div.right-panel.svelte-1gxqakg > div.layout.svelte-b7mtja.left > label.search.svelte-1mvzp7f > input.svelte-1mvzp7f';

    function blockGold() {
        const searchInput = document.querySelector(searchPath);
        if (searchInput) {
            const val = searchInput.value.toUpperCase();
            if (val.includes('XAU') || val.includes('GOLD')) {
                searchInput.value = ""; 
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    }

    setInterval(blockGold, 100);
})();
