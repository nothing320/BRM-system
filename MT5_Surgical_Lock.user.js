// ==UserScript==
// @name         Usman Pro - Surgical Lock v9.3 (Real 35 Only)
// @namespace    http://tampermonkey.net/
// @version      9.3
// @description  Strictly locked to mt5real35 terminal - Auto Update Enabled
// @author       Usman
// @match        https://mt5real35.exwebterm.com/terminal?*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_Surgical_Lock.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/MT5_Surgical_Lock.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // CSS Injection: Sirf Real 35 page par elements ko hide karega
    const style = document.createElement('style');
    style.innerHTML = `
        /* 1. Trade aur Toolbox buttons hide karna */
        .icon-button.svelte-liwf8ix,
        [title="Trade"],
        [title="Toolbox"],
        [data-test="trade-button"] {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* 2. Bottom Terminal (Profit/Loss area) hide karna */
        div[class*="bottom-panel"],
        div[class*="toolbox"],
        .layout.svelte-vce879 > div:nth-child(2),
        [class*="terminal-panel"] {
            display: none !important;
            height: 0 !important;
            visibility: hidden !important;
        }

        /* 3. Mouse se panel upar khinchne wali bar (Resizer) khatam karna */
        [class*="resizer"], .split-handle, .gutter {
            display: none !important;
        }

        /* 4. Manual Close Buttons ko urrana */
        button[aria-label*="Close"],
        [class*="close-button"],
        [class*="close-icon"] {
            display: none !important;
        }
    `;
    document.documentElement.appendChild(style);

    // Safety Loop: Agar terminal panel khulne ki koshish kare toh auto-click kar ke band kar do
    setInterval(() => {
        const tradeBtn = document.querySelector('.icon-button.svelte-liwf8ix.checked, [title="Trade"].checked');
        if (tradeBtn) {
            tradeBtn.click();
            tradeBtn.style.display = 'none';
        }
    }, 300);

})();
