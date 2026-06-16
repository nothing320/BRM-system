// ==UserScript==
// @name         Usmandon073816@gmail.com Pro - MT5 Strict 1-trade limit
// @namespace    http://tampermonkey.net/
// @version      12.0
// @description  Strict 1-trade limit with full bottom panel hide for MT5 Web Terminal
// @author       Usman
// @match        *://*.metatrader5.com/*
// @match        https://mt5-sim1.fundingpips.com/terminal//
// @match        https://web.metatrader.app/terminal//
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/final_discipline.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Memory Logic (Strict 1-Trade Limit)
    const today = new Date().toLocaleDateString();
    let tradeData = JSON.parse(localStorage.getItem('usman_trade_logic')) || { date: today, count: 0 };

    if (tradeData.date !== today) {
        tradeData = { date: today, count: 0 };
        localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
    }

    // 2. CSS Shield (MT5 Specific - Targetting trading elements and lower window)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 1 ? `
            /* 1. Order Panel / Trading Buttons */
            body > div.layout.svelte-vce879 > div.left-panel.svelte-nipgo6 > div.layout.svelte-b7mtja.right > div.wrap.svelte-nipgo6 > div.wrapper.svelte-1mnv5a8,
            [class*="buy-market"],
            [class*="sell-market"],
            [class*="trade-button"],
            [class*="order-form"],
            button[class*="Buy"],
            button[class*="Sell"],
            .trading-panel,
            .new-order-dialog,

            /* 2. LOWER PANEL (Balance, Positions, History Window Fix) */
            body > div.layout.svelte-vce879 > div.bottom-panel,
            div[class*="bottom-panel"],
            div[class*="toolbox"],
            div[class*="history"],
            .bottom-panel.svelte-vce879,
            .layout.svelte-vce879 .bottom-panel {
                display: none !important;
                pointer-events: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0px !important;
            }

            /* Red Alert Bar */
            body::after {
                content: "USMAN BHAI: MT5 LOCKED! 1 TRADE DONE.";
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
        if (btn && tradeData.count < 1) {
            const txt = btn.innerText.toLowerCase();
            
            // Checking for MT5 execution keys
            if (txt.includes('buy') || txt.includes('sell') || txt.includes('market')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
                
                if (tradeData.count >= 1) {
                    setTimeout(() => {
                        alert("Usman Bhai: MT5 1-Trade Limit Reached!");
                        location.reload();
                    }, 1000);
                }
            }
        }
    }, true);
})();
