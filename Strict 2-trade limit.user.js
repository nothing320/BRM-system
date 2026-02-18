// ==UserScript==
// @name         Usman Pro - Strict 2-trade limit
// @namespace    http://tampermonkey.net/
// @version      11.7
// @description  Full Surgical Lock: Market + Limit/Pending Orders Block
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

    // 1. Memory Logic (Date based)
    const today = new Date().toLocaleDateString();
    let tradeData = JSON.parse(localStorage.getItem('usman_trade_logic')) || { date: today, count: 0 };

    if (tradeData.date !== today) {
        tradeData = { date: today, count: 0 };
        localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
    }

    // 2. CSS Shield (More Aggressive Selectors)
    const style = document.createElement('style');
    style.innerHTML = `
        ${tradeData.count >= 2 ? `
            /* 1. Aapka bataya hua specific wrapper */
            body > div.layout.svelte-vce879 > div.left-panel.svelte-nipgo6 > div.layout.svelte-b7mtja.right > div.wrap.svelte-nipgo6 > div.wrapper.svelte-1mnv5a8,
            
            /* 2. Limit/Pending Orders Sections (Broad Match) */
            div[class*="pending"], 
            div[class*="limit"], 
            div[class*="orders-tabs"],
            [data-test*="limit"],
            [data-test*="pending"],

            /* 3. Trading Buttons & Selectors */
            button.trade-button,
            [data-test="trade-button"],
            select.svelte-1jw7y3y,
            .footer-row.svelte-1325j3e,
            
            /* 4. Full Right Panel (Extreme Lock) */
            div.layout.svelte-b7mtja.right {
                display: none !important;
                pointer-events: none !important;
                visibility: hidden !important;
            }

            /* Red Alert Bar */
            body::after {
                content: "USMAN BHAI: 2 TRADES DONE! LIMITS & MARKET LOCKED.";
                position: fixed; top: 0; left: 0; width: 100%;
                background: red; color: white; text-align: center;
                z-index: 9999999; padding: 15px; font-weight: bold; font-size: 20px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.5);
            }
        ` : ''}
    `;
    document.documentElement.appendChild(style);

    // 3. Smart Click Detection (Har qism ke button ko pakadne ke liye)
    window.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (btn && tradeData.count < 2) {
            const txt = btn.innerText.toLowerCase();
            // Buy, Sell, ya Order lagane wale buttons ko count karega
            if (txt.includes('buy') || txt.includes('sell') || txt.includes('place') || txt.includes('order')) {
                tradeData.count++;
                localStorage.setItem('usman_trade_logic', JSON.stringify(tradeData));
                
                if (tradeData.count >= 2) {
                    setTimeout(() => { 
                        alert("Discipline Lock: 2 Trades Completed!");
                        location.reload(); 
                    }, 1000);
                }
            }
        }
    }, true);
})();
