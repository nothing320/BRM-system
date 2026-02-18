// ==UserScript==
// @name         Usman Pro - No Gold (XAU/GOLD) Block
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Blocks XAU, GOLD, GOL, GO, XU, and AU typing in MT5 search bar
// @author       Usman
// @match        https://mt5real35.exwebterm.com/terminal?*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_No_Gold_Zone.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_No_Gold_Zone.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // MT5 Search bar ka specific rasta
    const searchPath = 'body > div.layout.svelte-vce879 > div.right-panel.svelte-1gxqakg > div.layout.svelte-b7mtja.left > label.search.svelte-1mvzp7f > input.svelte-1mvzp7f';

    function blockGold() {
        const searchInput = document.querySelector(searchPath);
        if (searchInput) {
            const val = searchInput.value.toUpperCase();
            
            // Sab keywords: XAU, GOLD, GOL, GO, XU, AU
            if (val.includes('XAU') || 
                val.includes('GOLD') || 
                val.includes('GOL') || 
                val.includes('GO') || 
                val.includes('XU') || 
                val.includes('XA')) {
                
                searchInput.value = ""; 
                
                // MT5 ko update karne ke liye double event trigger
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                searchInput.dispatchEvent(new Event('change', { bubbles: true }));
                
                console.log("SURGICAL LOCK: Gold/XU keywords are blocked!");
            }
        }
    }

    // Har 100 milliseconds baad monitor karega
    setInterval(blockGold, 100);
})();
