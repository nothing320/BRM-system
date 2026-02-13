// ==UserScript==
// @name         Usman Connection Test
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Testing connection between GitHub and MT5 Terminal
// @author       Usman
// @match        https://mt5trial16.exwebterm.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ek simple alert jo page load hote hi nazar ayega
    console.log("Usman Bhai, Script successfully connect ho gayi hai!");
    
    // Page ke upar ek chota sa green bar dikhayenge
    const testBar = document.createElement('div');
    testBar.innerHTML = 'USMAN CONNECTION ';
    testBar.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; 
        background: #4caf50; color: white; text-align: center; 
        font-weight: bold; padding: 5px; z-index: 999999;
        font-family: sans-serif;
    `;
    document.body.appendChild(testBar);

    // 5 second baad bar gayab ho jaye
    setTimeout(() => {
        testBar.style.display = 'none';
    }, 5000);
})();
