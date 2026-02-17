// ==UserScript==
// @name         Usman Pro - Final Discipline v11.0
// @namespace    http://tampermonkey.net/
// @version      11.1
// @description  Strict 2-trade limit, No Reset Button, Global Match
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

    // Reset logic: Agar date badal gayi hai toh khud hi reset kar do
    if (tradeData.date !== today) {
        tradeData = { date: today, count: 0 };
        localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
    }

    // 2. CSS Shield (Buttons hide karne ke liye)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 2 ? `
            button.trade-button.svelte-ailjot,
            .footer-row.svelte-1325j3e button,
            [data-test="trade-button"] {
                display: none !important;
                pointer-events: none !important;
            }
            body::after {
                content: "USMAN BHAI: 2 TRADES DONE! SYSTEM LOCKED UNTIL TOMORROW.";
                position: fixed; top: 0; left: 0; width: 100%;
                background: red; color: white; text-align: center;
                z-index: 999999; padding: 15px; font-weight: bold; font-size: 18px;
            }
        ` : ''}
    `;
    document.documentElement.appendChild(style);

    // 3. Smart Click Detection (Buy/Sell Only)
    window.addEventListener('click', function(e) {
        const btn = e.target.closest('button.trade-button.svelte-ailjot');

        if (btn && tradeData.count < 2) {
            // Sirf Buy ya Sell text wale buttons ginega
            if (btn.innerText.toLowerCase().includes('buy') || btn.innerText.toLowerCase().includes('sell')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));

                if (tradeData.count >= 2) {
                    setTimeout(() => { location.reload(); }, 800);
                }
            }
        }
    }, true);

})();
