// ==UserScript==
// @name         Usman Pro - Lot Fixed & Quick Button v24.0
// @namespace    http://tampermonkey.net/
// @version      24.1
// @description  Completely fixed "No return assign" error. Locks Volume and Icon.
// @author       Usman
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/nothing320/BRM-system/main/lot_lock.user.js
// @downloadURL  https://raw.githubusercontent.com/nothing320/BRM-system/main/lot_lock.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Aapke Diye Hue Paths
    var iconPath = 'body > div.layout.svelte-vce879 > div.top-bar.svelte-o9wxvh > div.icons.svelte-aqy1pm > div.group.clear.svelte-aqy1pm > div.icon-button.svelte-1iwf8ix > div.icon.svelte-1qoe9jm > svg';
    var volPath = 'body > div.layout.svelte-vce879 > div.left-panel.svelte-nipgo6 > div.layout.svelte-b7mtja.right > div.wrap.svelte-nipgo6 > div.wrapper.svelte-1mnv5a8 > div.content.svelte-1mnv5a8 > div.form.svelte-1mnv5a8 > div.market.svelte-h613k0 > div.volume.svelte-h613k0 > div.target > div.trade-input.svelte-mj4yoy > label.input.number-input.svelte-y7xcv3 > input';

    function startLocking() {
        // --- A. ICON LOCK ---
        var theIcon = document.querySelector(iconPath);
        if (theIcon) {
            var theButton = theIcon.closest('.icon-button');
            if (theButton) {
                theButton.style.display = 'none';
                theButton.style.pointerEvents = 'none';
            }
        }

        // --- B. VOLUME LOCK (0.01) ---
        var theInput = document.querySelector(volPath);
        if (theInput) {
            if (theInput.value !== "0.01") {
                theInput.value = "0.01";
                theInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            theInput.readOnly = true;
            theInput.style.pointerEvents = 'none';
            theInput.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        }

        // --- C. BUTTONS REMOVAL ---
        var btns = document.querySelectorAll('div.volume.svelte-h613k0 button');
        for (var i = 0; i < btns.length; i++) {
            btns[i].style.display = 'none';
        }
    }

    // Har 200ms baad check karega
    setInterval(startLocking, 200);

    window.addEventListener('load', startLocking);

})();
