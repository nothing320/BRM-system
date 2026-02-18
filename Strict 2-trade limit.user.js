// ==UserScript==
// @name         Usman Pro - MT5 Strict 2-trade limit
// @namespace    http://tampermonkey.net/
// @version      11.8
// @description  Strict 2-trade limit for MT5 Web Terminal
// @author       Usman
// @match        *://*.metatrader5.com/*
// @match        *://*/*terminal*
// @match        *://*/*mt5*
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

    // 2. CSS Shield (MT5 Specific)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 2 ? `
            /* 1. Aapka specific Svelte Selector (Order Panel) */
            body > div.layout.svelte-vce879 > div.left-panel.svelte-nipgo6 > div.layout.svelte-b7mtja.right > div.wrap.svelte-nipgo6 > div.wrapper.svelte-1mnv5a8,
            
            /* 2. MT5 General Trading Buttons & Panels */
            [class*="buy-market"], 
            [class*="sell-market"],
            [class*="trade-button"],
            [class*="order-form"],
            button[class*="Buy"], 
            button[class*="Sell"],
            .trading-panel,
            .new-order-dialog,

            /* 3. Footer Orders Section */
            .bottom-panel, 
            [class*="toolbox"],
            [class*="history-tab"] {
                display: none !important;
                pointer-events: none !important;
                visibility: hidden !important;
            }

            /* Red Alert Bar */
            body::after {
                content: "USMAN BHAI: MT5 LOCKED! 2 TRADES DONE.";
                position: fixed; top: 0; left: 0; width: 100%;
                background: #cc0000; color: white; text-align: center;
                z-index: 99999999; padding: 20px; font-weight: bold; font-size: 22px;
                border-bottom: 5px solid yellow;
            }
        ` : ''}
    `;
    document.documentElement.appendChild(style);

    // 3. Click Detection for MT5
    window.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (btn && tradeData.count < 2) {
            const txt = btn.innerText.toLowerCase();
            // MT5 buttons text: "Buy by Market", "Sell by Market", "Place", etc.
            if (txt.includes('buy') || txt.includes('sell') || txt.includes('market')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
                
                if (tradeData.count >= 2) {
                    setTimeout(() => { 
                        alert("Usman Bhai: MT5 2-Trade Limit Reached!");
                        location.reload(); 
                    }, 1000);
                }
            }
        }
    }, true);
})();
