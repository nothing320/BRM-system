// ==UserScript==
// @name         Usman Pro - Strict 2-trade limit
// @namespace    http://tampermonkey.net/
// @version      11.4
// @description  Strict 2-trade limit with Svelte Selector Block
// @author       Usman
// @match        *://*.exness.com/*
// @match        *://*.exwebterm.com/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Memory Logic
    const today = new Date().toLocaleDateString();
    let tradeData = JSON.parse(localStorage.getItem('usman_trade_logic')) || { date: today, count: 0 };

    if (tradeData.date !== today) {
        tradeData = { date: today, count: 0 };
        localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
    }

    // 2. CSS Shield (Usman Bhai's Specific Selector Added)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 2 ? `
            /* Aapka bataya hua specific selector */
            body > div.layout.svelte-vce879 > div.left-panel.svelte-nipgo6 > div.layout.svelte-b7mtja.right > div.wrap.svelte-nipgo6 > div.wrapper.svelte-1mnv5a8,
            
            /* General Buttons aur Trading Panels */
            button.trade-button.svelte-ailjot,
            .footer-row.svelte-1325j3e button,
            [data-test="trade-button"],
            select.svelte-1jw7y3y {
                display: none !important;
                pointer-events: none !important;
            }

            body::after {
                content: "USMAN BHAI: 2 TRADES DONE! LOCK ACTIVE UNTIL TOMORROW.";
                position: fixed; top: 0; left: 0; width: 100%;
                background: red; color: white; text-align: center;
                z-index: 9999999; padding: 15px; font-weight: bold; font-size: 20px;
            }
        ` : ''}
    `;
    document.documentElement.appendChild(style);

    // 3. Smart Click Detection
    window.addEventListener('click', function(e) {
        const btn = e.target.closest('button');

        if (btn && tradeData.count < 2) {
            const btnText = btn.innerText.toLowerCase();
            if (btnText.includes('buy') || btnText.includes('sell')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));

                if (tradeData.count >= 2) {
                    setTimeout(() => { 
                        alert("Surgical Lock Activated! 2 Trades Done.");
                        location.reload(); 
                    }, 1000);
                }
            }
        }
    }, true);

})();
