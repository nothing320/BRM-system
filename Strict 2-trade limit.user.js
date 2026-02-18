// ==UserScript==
// @name         Usman Pro - Strict 2-trade limit v11.0
// @namespace    http://tampermonkey.net/
// @version      11.2
// @description  Strict 2-trade limit, Blocks Orders Section, Auto-Update Enabled
// @author       Usman
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Memory Logic (Date based)
    const today = new Date().toLocaleDateString();
    let tradeData = JSON.parse(localStorage.getItem('usman_trade_logic')) || { date: today, count: 0 };

    if (tradeData.date !== today) {
        tradeData = { date: today, count: 0 };
        localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
    }

    // 2. CSS Shield (Buttons + Orders Section Hide)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 2 ? `
            /* Trading Buttons */
            button.trade-button.svelte-ailjot,
            .footer-row.svelte-1325j3e button,
            [data-test="trade-button"],

            /* Pending/Limit Orders Section (Svelte classes common in Exness) */
            .orders-container.svelte-1325j3e,
            .limit-orders.svelte-ailjot,
            [data-test="pending-orders-section"],
            
            /* Footer/Trading Panel Entirely */
            .trading-panel-footer.svelte-1325j3e {
                display: none !important;
                pointer-events: none !important;
            }

            body::after {
                content: "USMAN BHAI: 2 TRADES DONE! ORDERS BLOCKED UNTIL TOMORROW.";
                position: fixed; top: 0; left: 0; width: 100%;
                background: red; color: white; text-align: center;
                z-index: 999999; padding: 15px; font-weight: bold; font-size: 18px;
            }
        ` : ''}
    `;
    document.documentElement.appendChild(style);

    // 3. Smart Click Detection
    window.addEventListener('click', function(e) {
        const btn = e.target.closest('button.trade-button.svelte-ailjot');

        if (btn && tradeData.count < 2) {
            const btnText = btn.innerText.toLowerCase();
            if (btnText.includes('buy') || btnText.includes('sell')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));

                if (tradeData.count >= 2) {
                    // Chota sa delay taake order execute ho jaye phir page lock ho
                    setTimeout(() => { location.reload(); }, 1000);
                }
            }
        }
    }, true);

})();
