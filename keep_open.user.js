// ==UserScript==
// @name         MT5 Keep Order Panel Always Open
// @namespace    http://tampermonkey.net/
// @version      4.1
// @description  Ensures the "New Order" panel stays open 24/7
// @author       Usman
// @match        *://*.mql5.com/*
// @match        *://*.metatrader5.com/*
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/keep_open.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/keep_open.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("MT5 Keep-Open Script Active with GitHub Auto-Update...");

    setInterval(function() {
        const buttons = document.querySelectorAll('.icon-button');
        let orderBtn = null;

        for (let btn of buttons) {
            if (btn.textContent.includes('New Order')) {
                orderBtn = btn;
                break;
            }
        }

        if (orderBtn) {
            const currentTitle = orderBtn.getAttribute('title') || "";

            // LOGIC: Sirf tab click karega jab panel band ho (title mein 'hide' na ho)
            if (!currentTitle.toLowerCase().includes('hide')) {
                console.log("Panel band mila! Re-opening now...");

                ['mousedown', 'mouseup', 'click'].forEach(eventType => {
                    const ev = new MouseEvent(eventType, {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        buttons: 1
                    });
                    orderBtn.dispatchEvent(ev);
                });
            }
        }
    }, 1000); 
})();
