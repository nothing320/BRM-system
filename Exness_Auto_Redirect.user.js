// ==UserScript==
// @name         Exness Redirect Script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect to Exness MT5 Terminal automatically
// @author       Usman
// @match        https://my.ex-markets.pro/accounts/sign-in*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Target URL jahan aap jana chahte hain
    var targetURL = "https://mt5real35.exwebterm.com/terminal?version=&lang=en&save_password=off&trade_server=Exness-MT5Real35";

    // Redirect command
    window.location.replace(targetURL);
})();
