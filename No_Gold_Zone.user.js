// ==UserScript==
// @name         Usman Pro - Full Cover Dead Zone
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Total lockdown of search area including icons/corners
// @author       Usman
// @match        https://mt5real35.exwebterm.com/terminal?*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Sirf input nahi, balkay poore search label ko target karte hain
    const searchLabelSelector = 'body > div.layout.svelte-vce879 > div.right-panel.svelte-1gxqakg > div.layout.svelte-b7mtja.left > label.search.svelte-1mvzp7f';
    const inputSelector = searchLabelSelector + ' > input.svelte-1mvzp7f';

    function totalLockdown() {
        const searchLabel = document.querySelector(searchLabelSelector);
        const searchInput = document.querySelector(inputSelector);

        if (searchLabel) {
            // 1. Poore Label (container) ko click-proof banao
            searchLabel.style.pointerEvents = "none";
            searchLabel.style.userSelect = "none";
            searchLabel.style.opacity = "0.6"; // Thora fade taake pata chale lock hai
            searchLabel.style.overflow = "hidden"; // Corners/icons ko chupa dega
        }

        if (searchInput) {
            // 2. Input ko reset aur lock karo
            searchInput.readOnly = true;
            searchInput.value = "";
            searchInput.placeholder = "LOCKED";

            // 3. Force update taake text gayab rahe
            if (searchInput.value !== "") {
                searchInput.value = "";
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    }

    // High frequency check taake koi corner wapas na aaye
    setInterval(totalLockdown, 50);
})();
})();
