// ==UserScript==
// @name         Usman Pro - Strict 2-trade limit v11.3
// @namespace    http://tampermonkey.net/
// @version      11.3
// @description  Full Surgical Lock: 2 Trades, Orders Section, & Auto-Update
// @author       Usman
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Logic: Date aur Trade Counter
    const today = new Date().toLocaleDateString();
    let tradeData = JSON.parse(localStorage.getItem('usman_trade_logic')) || { date: today, count: 0 };

    // Agar din badal gaya toh counter reset
    if (tradeData.date !== today) {
        tradeData = { date: today, count: 0 };
        localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
    }

    // 2. CSS Blockers (Jab 2 trades ho jayein)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 2 ? `
            /* Buy/Sell Buttons Block */
            button.trade-button.svelte-ailjot,
            .footer-row.svelte-1325j3e button,
            [data-test="trade-button"],
            .trading-panel-footer,

            /* Orders aur Limits Section Block */
            .orders-container.svelte-1325j3e,
            .limit-orders.svelte-ailjot,
            [data-test="pending-orders-section"],
            .tab-panel-container.svelte-1325j3e, /* Orders tab content */
            
            /* Additional Selectors for safety */
            button[class*="buy"], 
            button[class*="sell"] {
                display: none !important;
                pointer-events: none !important;
                visibility: hidden !important;
            }

            /* Red Alert Message */
            body::after {
                content: "USMAN BHAI: 2 TRADES COMPLETED! SYSTEM LOCKED UNTIL TOMORROW.";
                position: fixed; top: 0; left: 0; width: 100%; height: 50px;
                background: #ff0000; color: white; text-align: center;
                line-height: 50px; z-index: 9999999; font-weight: bold; font-size: 20px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            }
        ` : ''}
    `;
    document.documentElement.appendChild(style);

    // 3. Click Detection (Sirf Buy/Sell detect karne ke liye)
    window.addEventListener('click', function(e) {
        const btn = e.target.closest('button');

        if (btn && tradeData.count < 2) {
            const text = btn.innerText.toLowerCase();
            // Sirf Buy aur Sell button par counter chalega
            if (text.includes('buy') || text.includes('sell')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));

                // 2 trades hote hi page reload taake CSS lock active ho jaye
                if (tradeData.count >= 2) {
                    setTimeout(() => { 
                        alert("Usman Bhai: 2 Trades Done! System is Locking...");
                        location.reload(); 
                    }, 1000);
                }
            }
        }
    }, true);

})();
