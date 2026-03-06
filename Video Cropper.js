// ==UserScript==
// @name         BRM Ultimate Video Cropper
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Crops YouTube video to show only the bottom part for backtesting (Alt + B)
// @author       BRM Trader
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', (e) => {
        // Alt + B to toggle crop
        if (e.altKey && e.key.toLowerCase() === 'b') {
            const video = document.querySelector('video');
            if (video) {
                // Agar pehle se katti hui hai toh normal kar do, nahi toh 80% upar se kaat do
                if (video.style.clipPath === '' || video.style.clipPath === 'none') {
                    video.style.clipPath = 'inset(80% 0 0 0)';
                } else {
                    video.style.clipPath = 'none';
                }
            }
        }
    });
})();
