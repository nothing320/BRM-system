// ==UserScript==
// @name         Usman Pro - GitHub Settings Hider
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides the Settings icon in GitHub Repo to protect Branch Rules
// @author       Usman
// @match        https://github.com/nothing320/BRM-system*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/github_hider.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/github_hider.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // CSS ke zariye foran hide karna (Fastest Method)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Settings tab ka exact path jo aapne diya */
        body > div.logged-in.env-production.page-responsive > div:nth-of-type(2) > react-partial:nth-of-type(2) > div > header.GlobalNav.styles-module__appHeader__YzYWk.prc-Stack-Stack-UQ9k6 > nav.prc-components-UnderlineWrapper-eT-Yj.LocalNavigation-module__LocalNavigation__b0Xc0 > ul.prc-components-UnderlineItemList-xKlKC > li:nth-of-type(9),
        
        /* Backup: Agar GitHub layout badle toh ID se pakarna */
        #settings-tab, 
        
        /* Settings link ko har jagah se hide karna */
        a[data-tab-item="settings"],
        a[href*="/settings"] {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }
    `;
    document.documentElement.appendChild(style);

    // Agar direct URL (/settings) khola jaye toh foran bahar nikal do
    if (window.location.href.endsWith("/settings") || window.location.href.includes("/settings/")) {
        window.location.replace("https://github.com/nothing320/BRM-system");
    }

})();
