// ==UserScript==
// @name         Usman Pro - Lot Fixed & Quick Button v25.0
// @namespace    http://tampermonkey.net/
// @version      25.0
// @description  Clean UI/UX for Lot Lock - No layout shifting
// @author       Usman
// @match        *://mt5real35.exwebterm.com/*
// @match        *://*/*terminal*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    var iconPath = 'body > div.layout.svelte-vce879 > div.top-bar.svelte-o9wxvh > div.icons.svelte-aqy1pm > div.group.clear.svelte-aqy1pm > div.icon-button.svelte-1iwf8ix > div.icon.svelte-1qoe9jm > svg';
    var volPath = 'body > div.layout.svelte-vce879 > div.left-panel.svelte-nipgo6 > div.layout.svelte-b7mtja.right > div.wrap.svelte-nipgo6 > div.wrapper.svelte-1mnv5a8 > div.content.svelte-1mnv5a8 > div.form.svelte-1mnv5a8 > div.market.svelte-h613k0 > div.volume.svelte-h613k0 > div.target > div.trade-input.svelte-mj4yoy > label.input.number-input.svelte-y7xcv3 > input';

    function startLocking() {
        // --- A. ICON LOCK ---
        var theIcon = document.querySelector(iconPath);
        if (theIcon) {
            var theButton = theIcon.closest('.icon-button');
            if (theButton) {
                theButton.style.visibility = 'hidden'; // Space barkarar rakhega magar dikhega nahi
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
            // Pro UI Styling
            theInput.readOnly = true;
            theInput.style.pointerEvents = 'none';
            theInput.style.textAlign = 'center'; // Center text for better look
            theInput.style.background = 'rgba(255, 255, 255, 0.03)';
            theInput.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            theInput.style.color = '#00ff00'; // Light green for fixed lot feel
        }

        // --- C. BUTTONS REMOVAL (Clean Way) ---
        var btns = document.querySelectorAll('div.volume.svelte-h613k0 button');
        btns.forEach(function(btn) {
            btn.style.visibility = 'hidden'; // Layout kharab nahi hoga
            btn.style.pointerEvents = 'none';
        });
    }

    // Interval fast rakha hai taake UI flicker na kare
    setInterval(startLocking, 100);

})();
