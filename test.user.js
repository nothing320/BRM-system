// ==UserScript==
// @name         Usman Pro - Surgical Lock v9.3 (Trial 16 Only)
// @namespace    http://tampermonkey.net/
// @version      9.3
// @description  Strictly locked to mt5trial16 terminal
// @author       Usman
// @match        https://mt5trial16.exwebterm.com/terminal?*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. CSS Injection: Trial 16 terminal ke buttons aur panels ko hide karna
    const style = document.createElement('style');
    style.innerHTML = `
        /* Trade, History aur Toolbox buttons hide karna */
        .icon-button.svelte-liwf8ix,
        [title="Trade"],
        [title="Toolbox"],
        [title="History"],
        [data-test="trade-button"] {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Bottom Panel (Profit/Loss tracking area) ko gayab karna */
        div[class*="bottom-panel"],
        div[class*="toolbox"],
        .layout.svelte-vce879 > div:nth-child(2),
        [class*="terminal-panel"] {
            display: none !important;
            height: 0 !important;
            visibility: hidden !important;
        }

        /* Mouse Resizer (Panel ko upar kheenchnay wali bar) */
        [class*="resizer"], .split-handle, .gutter {
            display: none !important;
        }

        /* Closing buttons for dialogs */
        button[aria-label*="Close"],
        [class*="close-button"] {
            display: none !important;
        }
    `;
    
    // Document load hotay hi CSS apply kar do
    (document.head || document.documentElement).appendChild(style);

    // 2. Safety Loop: Agar ghalti se panel khul jaye toh 300ms mein band kar de
    setInterval(() => {
        const tradeBtn = document.querySelector('.icon-button.svelte-liwf8ix.checked, [title="Trade"].checked');
        if (tradeBtn) {
            tradeBtn.click();
            tradeBtn.style.display = 'none';
        }
    }, 300);

    console.log("🛡️ Usman Pro v9.3: Surgical Lock Active on Trial 16");

})();
