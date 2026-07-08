// ==UserScript==
// @name                DuoRain
// @namespace           https://github.com/DuoXPy/DuoRain
// @version             6.0.0.BETA.01
// @description         The Ultimate Automation Tool for Duolingo
// @author              OracleMythix & oxGorou
// @match               https://*.duolingo.com/*
// @match               https://*.duolingo.cn/*
// @icon                https://avatars.githubusercontent.com/u/223025697?s=200&v=4
// @run-at              document-end
// @grant               GM_xmlhttpRequest
// @grant               GM_addStyle
// @connect             duolingo.com
// @connect             stories.duolingo.com
// @connect             goals-api.duolingo.com
// @connect             duolingo-leaderboards-prod.duolingo.com
// @connect             ios-api-2.duolingo.com
// @connect             raw.githubusercontent.com
// @connect             avatars.githubusercontent.com
// @downloadURL         https://raw.githubusercontent.com/DuoXPy/DuoRain/main/DuoRain.user.js
// @updateURL           https://raw.githubusercontent.com/DuoXPy/DuoRain/main/DuoRain.meta.js
// ==/UserScript==

(function () {
    'use strict';

    const icons = {
        avatar: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" fill="rgb(0,122,255)" d="M 4.102 20.142 C 4.487 20.6 6.145 22 12 22 c 5.855 0 7.512 -1.4 7.898 -1.857 a .416 .416 0 0 0 .09 -.317 C 19.9 18.944 19.106 15 12 15 s -7.9 3.944 -7.989 4.826 a .416 .416 0 0 0 .091 .317 z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="rgb(0,122,255)" d="M 16.5 7.063 C 16.5 10.258 14.57 13 12 13 c -2.572 0 -4.5 -2.742 -4.5 -5.938 C 7.5 3.868 9.16 2 12 2 s 4.5 1.867 4.5 5.063 z"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        chevron: '<svg class="DR_Chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
        hideBtn: '<svg id="hide-icon" width="23" height="16" viewBox="0 0 23 16" fill="#FFF" xmlns="http://www.w3.org/2000/svg"><path d="M17.7266 14.9922L4.1875 1.47656C3.9375 1.22656 3.9375 0.796875 4.1875 0.546875C4.44531 0.289062 4.875 0.289062 5.125 0.546875L18.6562 14.0625C18.9141 14.3203 18.9219 14.7188 18.6562 14.9922C18.3984 15.2578 17.9844 15.25 17.7266 14.9922ZM18.4609 12.4062L15.3281 9.25781C15.5 8.82812 15.5938 8.35938 15.5938 7.875C15.5938 5.57812 13.7266 3.74219 11.4375 3.74219C10.9922 3.74219 10.4922 3.83594 10.0547 3.99219L7.75 1.67969C8.875 1.3125 10.1016 1.09375 11.4297 1.09375C17.8984 1.09375 22.1172 6.28906 22.1172 7.875C22.1172 8.78125 20.7344 10.8438 18.4609 12.4062ZM11.4297 14.6562C5.05469 14.6562 0.75 9.45312 0.75 7.875C0.75 6.96094 2.16406 4.85938 4.54688 3.27344L7.59375 6.32812C7.39062 6.79688 7.27344 7.32812 7.27344 7.875C7.28125 10.1172 9.13281 12.0078 11.4375 12.0078C11.9766 12.0078 12.4922 11.8906 12.9609 11.6875L15.2812 14.0078C14.125 14.4141 12.8281 14.6562 11.4297 14.6562ZM13.9609 7.71094C13.9609 7.77344 13.9609 7.82812 13.9531 7.88281L11.3203 5.25781C11.375 5.25 11.4375 5.25 11.4922 5.25C12.8594 5.25 13.9609 6.35156 13.9609 7.71094ZM8.88281 7.82031C8.88281 7.75781 8.88281 7.6875 8.89062 7.625L11.5391 10.2734C11.4766 10.2812 11.4219 10.2891 11.3594 10.2891C10 10.2891 8.88281 9.17969 8.88281 7.82031Z"></path></svg>',
        showBtn: '<svg id="show-icon" width="22" height="14" viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg"><path d="M11.2734 13.6406C4.89844 13.6406 0.59375 8.4375 0.59375 6.85156C0.59375 5.27344 4.90625 0.078125 11.2734 0.078125C17.75 0.078125 21.9688 5.27344 21.9688 6.85156C21.9688 8.4375 17.75 13.6406 11.2734 13.6406ZM11.2812 11.0078C13.5781 11.0078 15.4375 9.14844 15.4375 6.85938C15.4375 4.5625 13.5781 2.70312 11.2812 2.70312C8.98438 2.70312 7.125 4.5625 7.125 6.85938C7.125 9.14844 8.98438 11.0078 11.2812 11.0078ZM11.2812 8.49219C10.375 8.49219 9.64844 7.76562 9.64844 6.85938C9.64844 5.95312 10.375 5.22656 11.2812 5.22656C12.1875 5.22656 12.9141 5.95312 12.9141 6.85938C12.9141 7.76562 12.1875 8.49219 11.2812 8.49219Z"></path></svg>',
        discordBtn: '<svg width="18" height="14" viewBox="0 0 22 16" fill="#FFF"><path d="M18.289 1.34C16.9296.714 15.4761.259 13.9565 0c-.1866.332-.4046.779-.5549 1.134-1.6154-.239-3.2159-.239-4.8016 0C8.4497.779 8.2267.332 8.0384 0 6.5172.259 5.062.716 3.7027 1.343.9608 5.421.2175 9.398.5892 13.318c1.8185 1.337 3.5809 2.149 5.3136 2.68.4278-.579.8093-1.195 1.138-1.845-.6259-.234-1.2255-.523-1.7921-.858.1503-.11.2973-.225.4393-.307 3.4554 1.591 7.2098 1.591 10.624 0 .1437.118.2907.233.4393.342-.6262.337-1.2274.626-1.8534.86.3287.648.7086 1.265 1.138 1.845 1.7343-.531 3.4983-1.343 5.3168-2.681.4361-4.545-.7449-8.484-3.121-11.978ZM7.5115 10.908c-1.0373 0-1.8879-.954-1.8879-2.114 0-1.161.8325-2.115 1.8879-2.115 1.0555 0 1.9061.954 1.8879 2.115.0016 1.16-.8325 2.114-1.8879 2.114Zm6.9769 0c-1.0373 0-1.8879-.954-1.8879-2.114 0-1.161.8324-2.115 1.8879-2.115 1.0554 0 1.9061.954 1.8879 2.115 0 1.16-.8325 2.114-1.8879 2.114Z"/></svg>',
        githubBtn: '<svg width="18" height="18" viewBox="0 0 22 22" fill="#FFF"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.009.5C5.198.5.5 5.313.5 11.266c0 4.759 3.01 8.788 7.186 10.214.522.107.713-.232.713-.517 0-.25-.017-1.105-.017-1.997-2.923.642-3.532-1.283-3.532-1.283-.47-1.248-1.166-1.568-1.166-1.568-.957-.659.07-.659.07-.659 1.062.071 1.619 1.105 1.619 1.105.94 1.64 2.453 1.176 3.062.891.087-.695.366-1.176.661-1.444-2.332-.25-4.785-1.176-4.785-5.312 0-1.176.418-2.139 1.08-2.887-.106-.267-.461-1.373.105-2.852 0 0 .888-.285 2.899 1.09a9.847 9.847 0 0 1 2.636-.356c.888 0 1.793.125 2.628.356 2.01-1.375 2.898-1.09 2.898-1.09.566 1.479.21 2.585.105 2.852.662.748 1.08 1.711 1.08 2.887 0 4.136-2.453 5.045-4.803 5.312.383.338.714.98.714 2.004 0 1.444-.018 2.606-.018 2.963 0 .285.192.624.714.48C18.49 20.054 21.5 16.025 21.5 11.266 21.517 5.313 16.802.5 11.009.5Z"/></svg>',
        webBtn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
        settingsBtn: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;"><path d="M 22.76,10.58 L 22.76,13.42 L 19.99,14.60 L 19.48,15.81 L 20.61,18.61 L 18.61,20.61 L 15.81,19.48 L 14.60,19.99 L 13.42,22.76 L 10.58,22.76 L 9.40,19.99 L 8.19,19.48 L 5.39,20.61 L 3.39,18.61 L 4.52,15.81 L 4.01,14.60 L 1.24,13.42 L 1.24,10.58 L 4.01,9.40 L 4.52,8.19 L 3.39,5.39 L 5.39,3.39 L 8.19,4.52 L 9.40,4.01 L 10.58,1.24 L 13.42,1.24 L 14.60,4.01 L 15.81,4.52 L 18.61,3.39 L 20.61,5.39 L 19.48,8.19 L 19.99,9.40 Z" /><circle cx="12" cy="12" r="4.32" /></svg>',
        moreFeatures: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234 234" fill="none" stroke="rgb(var(--DR-blue))" stroke-width="20" style="width: 18px; height: 18px; flex-shrink: 0;"><rect x="10" y="10" width="86" height="86" rx="5" /><rect x="138" y="10" width="86" height="86" rx="5" /><rect x="10" y="138" width="86" height="86" rx="5" /><g stroke-linecap="round"><line x1="138" y1="138" x2="224" y2="138" /><line x1="181" y1="181" x2="224" y2="181" /><line x1="138" y1="224" x2="224" y2="224" /></g></svg>',
        arrowRight: '<svg width="8" height="13" viewBox="0 0 8 13" fill="none" style="flex-shrink: 0;"><path d="M1 1l6 5.5L1 12" stroke="rgb(var(--DR-blue))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        socialNav: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46" fill="none" style="width: 22px; height: 22px; flex-shrink: 0;"><circle cx="15.5" cy="16" r="6.5" fill="#428ce1"/><path d="M4 39c0-6.4 5.2-10 11.5-10S27 32.6 27 39a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" fill="#428ce1"/><circle cx="30" cy="18" r="7.5" fill="#077aff"/><path d="M16 41c0-7 5.9-11 13-11 6.6 0 12 3.5 12 11a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2Z" fill="#077aff"/></svg>',
        back: '<svg width="8" height="14" viewBox="0 0 9 16" fill="none"><path d="M8 1L2 8l6 7" stroke="var(--dr-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        hash: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M9.5 3.5 7.7 20.5M16.3 3.5l-1.8 17M4 8.75h16M3 15.25h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        inf: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M6.4 8.2c-2 0-3.4 1.7-3.4 3.8s1.4 3.8 3.4 3.8c3 0 4.2-3.8 5.6-3.8s2.6 3.8 5.6 3.8c2 0 3.4-1.7 3.4-3.8s-1.4-3.8-3.4-3.8c-3 0-4.2 3.8-5.6 3.8S9.4 8.2 6.4 8.2Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        shopIcons: {
            streak: "https://d35aaqx5ub95lt.cloudfront.net/images/icons/216ddc11afcbb98f44e53d565ccf479e.svg",
            xp: "https://d35aaqx5ub95lt.cloudfront.net/images/icons/68c1fd0f467456a4c607ecc0ac040533.svg",
            gem: "https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg",
            heart: "https://d35aaqx5ub95lt.cloudfront.net/images/hearts/7631e3ee734dd4fe7792626b59457fa4.svg",
            outfit: "https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg",
            free: "https://d35aaqx5ub95lt.cloudfront.net/images/super/11db6cd6f69cb2e3c5046b915be8e669.svg",
            misc: "https://d35aaqx5ub95lt.cloudfront.net/images/legendary/158dbe277bf83116d04692b969a27aa3.svg"
        },
        xpIcon: "https://d35aaqx5ub95lt.cloudfront.net/images/profile/01ce3a817dd01842581c3d18debcbc46.svg",
        gemIcon: "https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg",
        streakIcon: "https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
    };

    const drVersion = '6.0.0 Beta 01';
    const drScriptVersion = '6.0.0.BETA.01';
    const drUpdateMetaUrl = 'https://raw.githubusercontent.com/DuoXPy/DuoRain/main/DuoRain.meta.js';
    const drUpdatePageUrl = 'https://github.com/DuoXPy/DuoRain';

    const config = {
        api: {
            stories: "https://stories.duolingo.com/api2/stories",
            users: "https://www.duolingo.com/2017-06-30/users",
            sessions: "https://www.duolingo.com/2017-06-30/sessions",
            leaderboards: "https://duolingo-leaderboards-prod.duolingo.com/leaderboards/7d9f5dd1-8423-491a-91f2-2532052038ce",
            shop: "https://www.duolingo.com/2023-05-23/shop-items",
            goals: "https://goals-api.duolingo.com",
            friends: "https://www.duolingo.com/2017-06-30/friends"
        },
        challengeTypes: [
            "assist", "characterIntro", "characterMatch", "characterPuzzle", "characterSelect",
            "characterTrace", "characterWrite", "completeReverseTranslation", "definition",
            "dialogue", "extendedMatch", "extendedListenMatch", "form", "freeResponse",
            "gapFill", "judge", "listen", "listenComplete", "listenMatch", "match", "name",
            "listenComprehension", "listenIsolation", "listenSpeak", "listenTap",
            "orderTapComplete", "partialListen", "partialReverseTranslate", "patternTapComplete",
            "radioBinary", "radioImageSelect", "radioListenMatch", "radioListenRecognize",
            "radioSelect", "readComprehension", "reverseAssist", "sameDifferent", "select",
            "selectPronunciation", "selectTranscription", "svgPuzzle", "syllableTap",
            "syllableListenTap", "speak", "tapCloze", "tapClozeTable", "tapComplete",
            "tapCompleteTable", "tapDescribe", "translate", "transliterate",
            "transliterationAssist", "typeCloze", "typeClozeTable", "typeComplete",
            "typeCompleteTable", "writeComprehension"
        ]
    };

    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:126.0) Gecko/20100101 Firefox/126.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
    ];
    function pickUserAgent() {
        let ua = localStorage.getItem('dr_user_agent');
        if (!ua) {
            ua = userAgents[Math.floor(Math.random() * userAgents.length)];
            localStorage.setItem('dr_user_agent', ua);
        }
        return ua;
    }
    const drUserAgent = pickUserAgent();

    const DUO_LEAGUES_CDN = "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/";
    const DUO_ICON_CDN = "https://d35aaqx5ub95lt.cloudfront.net/vendor/";
    const leagueTierNames = ["Bronze", "Silver", "Gold", "Sapphire", "Ruby", "Emerald", "Amethyst", "Pearl", "Obsidian", "Diamond"];
    const leagueBadges = [
        "192181672ada150becd83a74a4266ae9",
        "8148b17e32d8706a82c02688f559e9ef",
        "0e249b5f869b806da7406b815f4d60c6",
        "3ced84eb1f0274ec0f02b24ae6e3d29b",
        "74d6ab6e5b6f92e7d16a4a6664d1fafd",
        "f480e032c5222395e73dac88ce3592bb",
        "7f895707cd44583692d20481dcd9e0d0",
        "f902954eeaa88fd2cb12f9168b4f68cb",
        "57f0c6b260d33493a0cddc4ab38d6833",
        "afe5c7067cd5fb7de936d3928ea7add6",
    ].map((h) => DUO_LEAGUES_CDN + h + ".svg");
    const leagueBadgeFallback = DUO_LEAGUES_CDN + "a35f1db4398fd29e66f1abc33a0d11a2.svg";
    const leagueBadgeUrl = (tier) => (typeof tier === 'number' && tier >= 0 && leagueBadges[tier]) ? leagueBadges[tier] : leagueBadgeFallback;
    const podiumMedals = [
        "9e4f18c0bc42c7508d5fa5b18346af11",
        "cc7b8f8582e9cfb88408ab851ec2e9bd",
        "eef523c872b71178ef5acb2442d453a2"
    ].map((h) => DUO_LEAGUES_CDN + h + ".svg");

    function svgDataIcon(inner) {
        return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${inner}</svg>`);
    }

    const yearInReviewIcons = {
        top1: svgDataIcon('<path d="M3.5 8.5 8 11l4-6.5L16 11l4.5-2.5L19 18H5L3.5 8.5Z" fill="#FFC800" stroke="#E5A100" stroke-width="1" stroke-linejoin="round"/><rect x="5" y="19" width="14" height="2" rx="1" fill="#FFC800" stroke="#E5A100" stroke-width="1"/>'),
        top3: svgDataIcon('<path d="M12 2.5 14.7 9l6.8.6-5.2 4.4 1.6 6.6L12 17l-5.9 3.6 1.6-6.6L2.5 9.6l6.8-.6L12 2.5Z" fill="#FFC800" stroke="#E5A100" stroke-width="1" stroke-linejoin="round"/>'),
        top5: svgDataIcon('<path d="M12 2c0 4.5-2 7-6.5 7 4.5 0 6.5 2.5 6.5 7 0-4.5 2-7 6.5-7-4.5 0-6.5-2.5-6.5-7Z" fill="#58CC02" stroke="#4CAF00" stroke-width="1" stroke-linejoin="round"/><circle cx="5" cy="4" r="1.3" fill="#58CC02"/><circle cx="19" cy="19" r="1.3" fill="#58CC02"/>'),
        everyone: svgDataIcon('<path d="M3.5 20.5 8 10l6 6-10.5 4.5Z" fill="#FF9500" stroke="#DB7E00" stroke-width="1" stroke-linejoin="round"/><circle cx="18" cy="5" r="1.4" fill="#FF4B4B"/><circle cx="13" cy="3.5" r="1.1" fill="#1CB0F6"/><circle cx="21" cy="10" r="1.1" fill="#FFC800"/><rect x="14.5" y="6.5" width="3" height="1.4" rx="0.7" fill="#58CC02" transform="rotate(40 14.5 6.5)"/>')
    };

    const statusReactions = [
        { name: 'None', value: 'NONE', cat: 'Reactions', icon: DUO_LEAGUES_CDN + 'a35f1db4398fd29e66f1abc33a0d11a2.svg' },
        { name: 'Cat', emoji: '🐱', value: 'CAT', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '535fc27de224cc7d311dbb5de4f33be6.svg' },
        { name: 'Poop', emoji: '💩', value: 'POOP', cat: 'Reactions', icon: DUO_LEAGUES_CDN + 'beb0df263d0f696bc7095d56b448ca78.svg' },
        { name: 'Popcorn', emoji: '🍿', value: 'POPCORN', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '573de2bc90b2499eeb2b3738cff90133.svg' },
        { name: 'Dumpster Fire', emoji: '🔥', value: 'DUMPSTER_FIRE', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '9fadb349c2ece257386a0e576359c867.svg' },
        { name: 'Trophy', emoji: '🏆', value: 'TROPHY', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '22df4cb957e6cf2d7198b6e5449a342e.svg' },
        { name: 'Diamond Trophy', emoji: '💎', value: 'TROPHY,winner', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '1795aa8b3b10d243e5d138a79bde360a.svg' },
        { name: 'Eyes', emoji: '👀', value: 'EYES', cat: 'Reactions', icon: DUO_LEAGUES_CDN + 'a8e5c18e80054228b2c61168846ff643.svg' },
        { name: 'Flex', emoji: '💪', value: 'FLEX', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '6b8a8db5ac7f847e7e87efe97c8b451a.svg' },
        { name: 'One Hundred', emoji: '💯', value: 'ONE_HUNDRED', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '5642e1e72813a88e8973b551a2004c7f.svg' },
        { name: 'Popper', emoji: '🎉', value: 'POPPER', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '2ceb401cae52712705b66a77df83ce40.svg' },
        { name: 'Sunglasses', emoji: '😎', value: 'SUNGLASSES', cat: 'Reactions', icon: DUO_LEAGUES_CDN + '2439bac00452e99ba7bf6a7ed0b04196.svg' },
        { name: 'Angry', emoji: '😠', value: 'ANGRY', cat: 'Reactions', icon: DUO_LEAGUES_CDN + 'f12703218fc80de76a63e650726f742e.svg' },
        { name: '2023 Top 1', emoji: '👑', value: 'YEAR_IN_REVIEW,2023_top1', cat: '2023 Evenrs (iOS-only)', icon: yearInReviewIcons.top1 },
        { name: '2023 Top 3', emoji: '⭐', value: 'YEAR_IN_REVIEW,2023_top3', cat: '2023 Evenrs (iOS-only)', icon: yearInReviewIcons.top3 },
        { name: '2023 Top 5', emoji: '🌟', value: 'YEAR_IN_REVIEW,2023_top5', cat: '2023 Evenrs (iOS-only)', icon: yearInReviewIcons.top5 },
        { name: '2023 Everyone', emoji: '🎊', value: 'YEAR_IN_REVIEW,2023', cat: '2023 Evenrs (iOS-only)', icon: yearInReviewIcons.everyone },
        { name: 'Chess', emoji: '♟️', value: 'FLAG,chess', cat: 'Courses', icon: DUO_ICON_CDN + 'c8bad7c09aaf7bc29ddddc50808adb54.svg' },
        { name: 'Math', emoji: '🔢', value: 'FLAG,math', cat: 'Courses', icon: DUO_ICON_CDN + '395c8a6ee9783610b578b02fda405e85.svg' },
        { name: 'Music', emoji: '🎵', value: 'FLAG,music', cat: 'Courses', icon: DUO_ICON_CDN + '7fee27d21187165ccb88aef0234b6101.svg' },
        { name: 'Arabic', emoji: '🇸🇦', value: 'FLAG,arabic', cat: 'Languages', icon: DUO_ICON_CDN + '9ab6930a263c981b57f9d578ac97cae7.svg' },
        { name: 'Catalan', emoji: '🇦🇩', value: 'FLAG,catalan', cat: 'Languages', icon: DUO_ICON_CDN + '984fae40120b61fb684a80652e8f6a35.svg' },
        { name: 'Chinese/Cantonese', emoji: '🇨🇳', value: 'FLAG,chinese', cat: 'Languages', icon: DUO_ICON_CDN + '9905aa3a86fcb9e351b0b3bfaf04d8b9.svg' },
        { name: 'Czech', emoji: '🇨🇿', value: 'FLAG,czech', cat: 'Languages', icon: DUO_ICON_CDN + '828bf0fea457d3beaaab3d6c0bfcc975.svg' },
        { name: 'Danish', emoji: '🇩🇰', value: 'FLAG,danish', cat: 'Languages', icon: DUO_ICON_CDN + '6af84a7cb8e99ea8a567c2b9c55b9926.svg' },
        { name: 'Dutch', emoji: '🇳🇱', value: 'FLAG,dutch', cat: 'Languages', icon: DUO_ICON_CDN + 'de945d789e249dcd74333a6996472ef8.svg' },
        { name: 'English', emoji: '🇬🇧', value: 'FLAG,english', cat: 'Languages', icon: DUO_ICON_CDN + 'bbe17e16aa4a106032d8e3521eaed13e.svg' },
        { name: 'Esperanto', emoji: '🌍', value: 'FLAG,esperanto', cat: 'Languages', icon: DUO_ICON_CDN + '6de7e4731b2a82a6458268e1a3d67ce4.svg' },
        { name: 'Finnish', emoji: '🇫🇮', value: 'FLAG,finnish', cat: 'Languages', icon: DUO_ICON_CDN + 'b4d0e4f6451f504e1441eb93efdbea5e.svg'},
        { name: 'French', emoji: '🇫🇷', value: 'FLAG,french', cat: 'Languages', icon: DUO_ICON_CDN + '482fda142ee4abd728ebf4ccce5d3307.svg' },
        { name: 'German', emoji: '🇩🇪', value: 'FLAG,german', cat: 'Languages', icon: DUO_ICON_CDN + 'c71db846ffab7e0a74bc6971e34ad82e.svg' },
        { name: 'Greek', emoji: '🇬🇷', value: 'FLAG,greek', cat: 'Languages', icon: DUO_ICON_CDN + '8db373482261397a3159d3f370eed2f3.svg' },
        { name: 'Guarani', emoji: '🇵🇾', value: 'FLAG,guarani', cat: 'Languages', icon: DUO_ICON_CDN + 'ff446507a141928d1cfd9476612d7dc0.svg' },
        { name: 'Haitian Creole', emoji: '🇭🇹', value: 'FLAG,haitian-creole', cat: 'Languages', icon: DUO_ICON_CDN + '8cb302b44c183c1a8ec3b90caf90d922.svg' },
        { name: 'Hawaiian', emoji: '🏴', value: 'FLAG,hawaiian', cat: 'Languages', icon: DUO_ICON_CDN + '312e21f793c555787d01a45e20ee8191.svg' },
        { name: 'Hebrew', emoji: '🇮🇱', value: 'FLAG,hebrew', cat: 'Languages', icon: DUO_ICON_CDN + 'f818f545a703ddaa046ca8786e781742.svg' },
        { name: 'High Valyrian', emoji: '🐉', value: 'FLAG,high-valyrian', cat: 'Languages', icon: DUO_ICON_CDN + '2880099b038848abbfd11104097953ad.svg' },
        { name: 'Hindi', emoji: '🇮🇳', value: 'FLAG,hindi', cat: 'Languages', icon: DUO_ICON_CDN + '73837fa39dbf1bcc4c95a17a58ed0ffb.svg' },
        { name: 'Hungarian', emoji: '🇭🇺', value: 'FLAG,hungarian', cat: 'Languages', icon: DUO_ICON_CDN + '2ed8d0a73eab3c9cba0290e2b459684a.svg' },
        { name: 'Indonesian', emoji: '🇮🇩', value: 'FLAG,indonesian', cat: 'Languages', icon: DUO_ICON_CDN + '339c0413e542f19b234971d7740447e7.svg' },
        { name: 'Irish', emoji: '🇮🇪', value: 'FLAG,irish', cat: 'Languages', icon: DUO_ICON_CDN + 'ef0bfb96037b127473bd7bcbfde1a6ed.svg' },
        { name: 'Italian', emoji: '🇮🇹', value: 'FLAG,italian', cat: 'Languages', icon: DUO_ICON_CDN + '635a09df9323279d39934a991edd4510.svg' },
        { name: 'Japanese', emoji: '🇯🇵', value: 'FLAG,japanese', cat: 'Languages', icon: DUO_ICON_CDN + 'edea4fa18ff3e7d8c0282de3f102aaed.svg' },
        { name: 'Klingon', emoji: '🖖', value: 'FLAG,klingon', cat: 'Languages', icon: DUO_ICON_CDN + '76d654213a8282b0ebc25b4f535ee003.svg' },
        { name: 'Korean', emoji: '🇰🇷', value: 'FLAG,korean', cat: 'Languages', icon: DUO_ICON_CDN + 'ec5835ac9f465ff3dad4b1b8725d4314.svg' },
        { name: 'Latin', emoji: '🇻🇦', value: 'FLAG,latin', cat: 'Languages', icon: DUO_ICON_CDN + 'f7cee6cc09270371b097129faf792c2a.svg' },
        { name: 'Navajo', emoji: '🏴', value: 'FLAG,navajo', cat: 'Languages', icon: DUO_ICON_CDN + 'bbc8ad0cfe2596d5193376ebdc3e969c.svg' },
        { name: 'Norwegian (Bokmål)', emoji: '🇳🇴', value: 'FLAG,norwegian', cat: 'Languages', icon: DUO_ICON_CDN + '90b37d97edc66e830dc2286279548f67.svg' },
        { name: 'Polish', emoji: '🇵🇱', value: 'FLAG,polish', cat: 'Languages', icon: DUO_ICON_CDN + 'f095084e6ec400e631d62c3d95fefaa2.svg' },
        { name: 'Portuguese', emoji: '🇵🇹', value: 'FLAG,portuguese', cat: 'Languages', icon: DUO_ICON_CDN + '27d253ae1272917fc9f4a79459aacd53.svg' },
        { name: 'Romanian', emoji: '🇷🇴', value: 'FLAG,romanian', cat: 'Languages', icon: DUO_ICON_CDN + '357e13bb10cf86fc06552d563957e2e6.svg' },
        { name: 'Russian', emoji: '🇷🇺', value: 'FLAG,russian', cat: 'Languages', icon: DUO_ICON_CDN + 'eadd7804652170c33814a89482f1f353.svg' },
        { name: 'Scottish Gaelic', emoji: '🏴', value: 'FLAG,scottish-gaelic', cat: 'Languages', icon: DUO_ICON_CDN + '09eba3135efe8fe93a4662dba813b921.svg' },
        { name: 'Spanish', emoji: '🇪🇸', value: 'FLAG,spanish', cat: 'Languages', icon: DUO_ICON_CDN + '59a90a2cedd48b751a8fd22014768fd7.svg' },
        { name: 'Swahili', emoji: '🇹🇿', value: 'FLAG,swahili', cat: 'Languages', icon: DUO_ICON_CDN + '335311988405b4354e1b6ae9037c02db.svg' },
        { name: 'Swedish', emoji: '🇸🇪', value: 'FLAG,swedish', cat: 'Languages', icon: DUO_ICON_CDN + 'f578430c9b7ab617c107893afbb501c0.svg' },
        { name: 'Tamil', emoji: '🇮🇳', value: 'FLAG,tamil', cat: 'Languages', icon: DUO_ICON_CDN + '2226e2cc358e810d3ee9dbe182f7c2a9.svg' },
        { name: 'Thai', emoji: '🇹🇭', value: 'FLAG,thai', cat: 'Languages', icon: DUO_ICON_CDN + 'd079dc0a7d111bbbf241aa79bc8ceefe.svg' },
        { name: 'Turkish', emoji: '🇹🇷', value: 'FLAG,turkish', cat: 'Languages', icon: DUO_ICON_CDN + 'bc80a9518cd6d5af6ae14e8b22b8a1f4.svg' },
        { name: 'Ukrainian', emoji: '🇺🇦', value: 'FLAG,ukrainian', cat: 'Languages', icon: DUO_ICON_CDN + '7c6e12bc57527843082f7f5bb77c9862.svg' },
        { name: 'Urdu', emoji: '🇵🇰', value: 'FLAG,urdu', cat: 'Languages', icon: DUO_ICON_CDN + 'aebc481c2b5167a564e4c9313d07278d.svg' },
        { name: 'Vietnamese', emoji: '🇻🇳', value: 'FLAG,vietnamese', cat: 'Languages', icon: DUO_ICON_CDN + '2b077d42185bc45d4896ed55f15c4fea.svg' },
        { name: 'Welsh', emoji: '🏴', value: 'FLAG,welsh', cat: 'Languages', icon: DUO_ICON_CDN + 'f773f1b240623072e48843ecdf90d756.svg' },
        { name: 'Yiddish', emoji: '🏴', value: 'FLAG,yiddish', cat: 'Languages', icon: DUO_ICON_CDN + '55bad151fa6a8d9e2376fc9697c671c8.svg' },
        { name: 'Zulu', emoji: '🇿🇦', value: 'FLAG,south-africa', cat: 'Languages', icon: DUO_ICON_CDN + '112e1531d0ac198a9424bd1b0a7166e6.svg' }
    ];

    const mainCss = `
        @font-face {
            font-family: "DuoFeather";
            src: url("https://d35aaqx5ub95lt.cloudfront.net/fonts/642e24bb0295f3aee4dedcd8eecd8007.woff2") format("woff2");
            font-display: swap;
        }

        :root {
            --DR-blue: 0, 122, 255;
            --DR-green: 50, 215, 75;
            --DR-red: 255, 69, 58;
            --DR-orange: 255, 159, 10;

            --DR-s1: 4px;
            --DR-s2: 8px;
            --DR-s3: 12px;
            --DR-s4: 16px;

            --DR-ctrl: 40px;
            --DR-ctrl-lg: 48px;

            --DR-r-s: 8px;
            --DR-r-m: 12px;
            --DR-r-l: 16px;
            --DR-r-xl: 22px;
            --DR-corner: 0;

            --DR-ease: cubic-bezier(.16, 1, .32, 1);
            --DR-motion-fast: 400ms;
            --DR-motion: 400ms;
            --DR-motion-page: 400ms;
            --DR-motion-spin: 1200ms;

            --DR-t-title: 22px;
            --DR-t-lead: 16px;
            --DR-t-body: 15px;
            --DR-t-label: 13px;
            --DR-t-cap: 11px;
        }

        @supports (corner-shape: superellipse(1.4)) {
            :root { --DR-corner: superellipse(1.4); }
        }

        .DR_Btn,
        .DR_Input_Wrap,
        .DR_Hash_Btn,
        .DR_Select,
        .DR_Select_Options,
        .DR_Set_Input_Wrap,
        .DR_Search,
        .DR_Panel_Card,
        .DR_Shop_Card,
        .DR_Quest_Item,
        .DR_Shop_Btn,
        .DR_Quest_Get_Btn,
        .DR_Profile_Block,
        .DR_Modal_Box {
            corner-shape: var(--DR-corner);
        }

        .DR_Wordmark {
            display: inline-flex;
            align-items: baseline;
            font-family: 'DuoFeather', 'din-round';
            font-size: var(--DR-t-title);
            font-weight: 900;
            letter-spacing: 0.2px;
            line-height: 1;
        }

        .DR_Wordmark .dr-rain {
            color: rgb(var(--DR-blue));
        }


        #DR_Root {
            user-select: none;
            -webkit-user-select: none;
        }

        #DR_Root * {
            box-sizing: border-box;
        }

        .DR_Selectable {
            user-select: text !important;
            -webkit-user-select: text !important;
            cursor: text;
        }

        #DR_Root p,
        #DR_Root span,
        #DR_Root button,
        #DR_Root input,
        #DR_Root label,
        #DR_Root div {
            font-family: 'din-round', 'DuoFeather' !important;
        }

        #DR_Root p,
        #DR_Root span {
            margin: 0;
            padding: 0;
        }

        #DR_Root svg {
            flex-shrink: 0;
        }

        .DR_Main {
            display: inline-flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            gap: 8px;
            position: fixed;
            right: 16px;
            bottom: 16px;
            z-index: 2147483646;
            pointer-events: none;
            transition: gap var(--DR-motion-page) var(--DR-ease);
        }

        .DR_Main > * {
            pointer-events: auto;
        }

        .DR_Main.dr-panel-hidden {
            gap: 0;
            width: max-content;
            height: auto;
        }

        .DR_Main.dr-panel-hidden .DR_Main_Box {
            pointer-events: none !important;
        }

        .DR_Main_Box {
            display: flex;
            width: 325px;
            max-width: calc(100vw - 16px);
            padding: 16px;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            overflow: hidden;
            border-radius: var(--DR-r-xl);
            corner-shape: var(--DR-corner);
            position: relative;
            transform-origin: var(--DR-panel-origin, center);
            transform: translateY(0);
            transition: opacity var(--DR-motion) ease,
                        transform var(--DR-motion-page) var(--DR-ease),
                        width var(--DR-motion-page) var(--DR-ease),
                        max-width var(--DR-motion-page) var(--DR-ease),
                        max-height var(--DR-motion-page) var(--DR-ease),
                        height var(--DR-motion-page) var(--DR-ease),
                        min-width var(--DR-motion-page) var(--DR-ease),
                        padding var(--DR-motion-page) var(--DR-ease);
            will-change: opacity, transform, width, max-width, max-height, height, min-width, padding;
        }

        .DR_Main_Box.dr-hidden {
            opacity: 0 !important;
            transform: translateY(var(--DR-panel-hide-y, 0px)) scale(0.96) !important;
            pointer-events: none;
        }

        .DR_Main_Box.dr-collapsed {
            width: 0 !important;
            max-width: 0 !important;
            max-height: 0 !important;
            height: 0 !important;
            min-width: 0 !important;
            padding: 0 !important;
            overflow: hidden;
        }

        .DR_Main_Box.dr-scroll {
            overflow-y: auto;
            overflow-x: hidden;
            justify-content: flex-start;
        }

        .DR_Main_Box.dr-scroll::-webkit-scrollbar {
            width: 4px;
        }

        .DR_Main_Box.dr-scroll::-webkit-scrollbar-track {
            background: transparent;
        }

        .DR_Main_Box.dr-scroll::-webkit-scrollbar-thumb {
            background: rgba(var(--DR-blue), 0.4);
            border-radius: 4px;
        }

        .DR_Main_Box.dr-menu-open {
            overflow: visible;
        }

        .DR_Main_Box.dr-scroll.dr-menu-open {
            overflow-x: hidden;
            overflow-y: auto;
        }

        .DR_Main_Box.dr-light {
            --dr-panel-bg: rgba(255, 255, 255, 0.85);
            background: var(--dr-panel-bg);
            backdrop-filter: blur(20px) saturate(1.6);
            -webkit-backdrop-filter: blur(20px) saturate(1.6);
            outline: 2px solid rgba(229, 229, 229, 1);
            outline-offset: -2px;
            box-shadow: 0 18px 50px -12px rgba(17, 32, 46, 0.28), 0 2px 8px rgba(17, 32, 46, 0.06);
            --dr-bg: rgba(255, 255, 255, 0.95);
            --dr-text: #333;
            --dr-card-bg: rgba(0, 0, 0, 0.05);
            --dr-card-hover: rgba(var(--DR-blue), 0.1);
            --dr-card-border: rgba(229, 229, 229, 1);
        }

        .DR_Main_Box.dr-dark {
            --dr-panel-bg: rgba(32, 47, 54, 0.85);
            background: var(--dr-panel-bg);
            backdrop-filter: blur(20px) saturate(1.6);
            -webkit-backdrop-filter: blur(20px) saturate(1.6);
            outline: 2px solid rgba(55, 70, 79, 1);
            outline-offset: -2px;
            box-shadow: 0 20px 55px -12px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.3);
            --dr-bg: rgba(32, 47, 54, 0.95);
            --dr-text: #fff;
            --dr-card-bg: rgba(255, 255, 255, 0.05);
            --dr-card-hover: rgba(var(--DR-blue), 0.15);
            --dr-card-border: rgba(55, 70, 79, 1);
        }

        #duorain-hide-button.dr-light {
            --dr-text: #333;
            --dr-panel-bg: rgba(255, 255, 255, 0.85);
            --dr-card-border: rgba(229, 229, 229, 1);
            --dr-panel-shadow: 0 12px 32px -14px rgba(17, 32, 46, 0.28), 0 2px 8px rgba(17, 32, 46, 0.06);
        }

        #duorain-hide-button.dr-dark {
            --dr-text: #fff;
            --dr-panel-bg: rgba(32, 47, 54, 0.85);
            --dr-card-border: rgba(55, 70, 79, 1);
            --dr-panel-shadow: 0 14px 36px -14px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .DR_HStack_Auto {
            display: flex;
            align-items: center;
            justify-content: space-between;
            align-self: stretch;
            gap: 8px;
            min-width: 0;
        }

        .DR_HStack_8 {
            display: flex;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            min-width: 0;
        }

        .DR_HStack_4 {
            display: flex;
            align-items: center;
            gap: 4px;
            align-self: stretch;
            min-width: 0;
        }

        .DR_VStack_8 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            align-self: stretch;
        }

        .DR_VStack_4 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 4px;
            align-self: stretch;
        }

        .DR_NoSel {
            user-select: none;
            -webkit-user-select: none;
        }

        .DR_Divider {
            align-self: stretch;
            height: 1px;
            background: rgba(117, 117, 117, 0.2);
            flex-shrink: 0;
        }

        .DR_T1 {
            font-size: 14px;
            font-weight: 700;
            line-height: 1.22;
            color: var(--dr-text);
            margin: 0;
            min-width: 0;
        }

        .DR_T1:has(+ .DR_T2) {
            font-weight: 800;
        }

        .DR_T2 {
            font-size: 13px;
            font-weight: 600;
            line-height: 1.25;
            color: var(--dr-text);
            opacity: 0.6;
            margin: 0;
            min-width: 0;
        }

        .DR_Btn {
            display: flex;
            height: 40px;
            padding: 10px 12px 10px 10px;
            box-sizing: border-box;
            align-items: center;
            gap: 6px;
            flex: 1 0 0;
            min-width: 0;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            user-select: none;
            transition: filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease,
                        background var(--DR-motion) ease,
                        color var(--DR-motion) ease;
        }

        .DR_Btn:hover {
            filter: brightness(0.9);
            transform: scale(1.05);
        }

        .DR_Btn:active {
            filter: brightness(0.9);
            transform: scale(0.9);
        }

        .DR_Btn_Blue_Ghost,
        .DR_Btn_Eel {
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            background: var(--dr-card-bg);
        }

        .DR_Btn_Blue_Ghost .DR_Nav_Title {
            color: var(--dr-text);
        }

        .DR_Btn_Blue_Ghost .DR_Nav_Btn_L > svg,
        .DR_Btn_Blue_Ghost .DR_Nav_Btn_L > svg [stroke],
        .DR_Btn_Blue_Ghost > svg path {
            stroke: var(--dr-text);
        }

        .DR_Btn_Icon {
            flex: none !important;
            width: 40px;
            padding: 10px !important;
            justify-content: center;
        }

        .DR_Nav_Btn {
            align-self: stretch;
            justify-content: space-between;
            height: 40px;
            padding: 10px 12px 10px 10px;
        }

        .DR_Nav_Btn_L {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1 1 auto;
            min-width: 0;
        }

        .DR_Nav_Btn_L > svg:first-child,
        .DR_Nav_Btn_L > img:first-child {
            width: 20px !important;
            height: 20px !important;
            flex-shrink: 0;
            object-fit: contain;
        }

        .DR_Nav_Title {
            color: rgb(var(--DR-blue));
            font-size: 14px;
            font-weight: 800;
            line-height: 1.18;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .DR_Input_Wrap {
            display: flex;
            height: 48px;
            padding: 16px;
            box-sizing: border-box;
            align-items: center;
            flex: 1 0 0;
            min-width: 0;
            gap: 6px;
            border-radius: var(--DR-r-s);
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            background: var(--dr-card-bg);
            position: relative;
            overflow: hidden;
            transition: flex var(--DR-motion-page) var(--DR-ease),
                        padding var(--DR-motion-page) var(--DR-ease),
                        margin var(--DR-motion-page) var(--DR-ease),
                        opacity var(--DR-motion) ease,
                        outline-width var(--DR-motion-page) var(--DR-ease),
                        outline-color var(--DR-motion) ease,
                        background var(--DR-motion) ease;
        }

        .DR_Input_Wrap:focus-within {
            outline-color: rgba(var(--DR-blue), 0.35);
        }

        .DR_Input_Wrap.dr-inf-hidden {
            flex: 0 0 0px;
            padding-left: 0;
            padding-right: 0;
            opacity: 0;
            outline-width: 0px;
            pointer-events: none;
            margin-right: -8px;
        }

        .DR_Hash_Btn {
            --focus-outline: var(--dr-card-border);
            background: var(--dr-card-bg);
            border: none;
            border-radius: var(--DR-r-s);
            color: var(--dr-text);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            height: 48px;
            width: 48px;
            flex-shrink: 0;
            cursor: pointer;
            overflow: hidden;
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            transition: filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease,
                        background var(--DR-motion) ease,
                        outline-color var(--DR-motion) ease,
                        box-shadow var(--DR-motion) ease,
                        flex var(--DR-motion-page) var(--DR-ease),
                        width var(--DR-motion-page) var(--DR-ease);
        }

        .DR_Hash_Btn svg {
            display: block;
            width: 22px;
            height: 22px;
        }

        .DR_Hash_Btn:hover {
            filter: brightness(0.9);
            transform: scale(1.05);
        }

        .DR_Hash_Btn:active {
            filter: brightness(0.9);
            transform: scale(0.9);
        }

        .DR_Hash_Btn.dr-inf-active {
            flex: 1 0 0;
            width: auto;
        }

        #DR_Root .DR_Hash_Btn:focus,
        #DR_Root .DR_Hash_Btn:focus-visible,
        #DR_Root .DR_Hash_Btn:active {
            outline: 2px solid var(--dr-card-border) !important;
            outline-offset: -2px !important;
            box-shadow: none !important;
        }

        .DR_Hash_Lbl {
            font-weight: 800;
            font-size: 13px;
            white-space: nowrap;
        }

        .DR_Input {
            border: none !important;
            outline: none !important;
            background: none !important;
            text-align: right;
            font-size: 14px !important;
            font-weight: 600 !important;
            color: var(--dr-text) !important;
            font-family: inherit !important;
            width: 100%;
            -moz-appearance: textfield;
        }

        .DR_Input::placeholder {
            color: var(--dr-text) !important;
            opacity: 0.5;
        }

        .DR_Input::-webkit-outer-spin-button,
        .DR_Input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .DR_Input_Btn {
            display: flex;
            height: var(--DR-ctrl-lg);
            width: 66px;
            padding: 16px 10px;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;
            border-radius: var(--DR-r-s);
            corner-shape: var(--DR-corner);
            border: none;
            cursor: pointer;
            user-select: none;
            outline: 2px solid rgba(0, 0, 0, 0.2);
            outline-offset: -2px;
            background: rgb(var(--DR-blue));
            white-space: nowrap;
            flex-shrink: 0;
            transition: background var(--DR-motion) ease,
                        outline var(--DR-motion) ease,
                        filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease;
        }

        .DR_Input_Btn:focus,
        .DR_Input_Btn:focus-visible {
            outline-color: var(--focus-outline, rgba(0, 0, 0, 0.2)) !important;
        }

        .DR_Input_Btn:hover {
            filter: brightness(0.9);
            transform: scale(1.05);
        }

        .DR_Input_Btn:active {
            filter: brightness(0.9);
            transform: scale(0.9);
        }

        .DR_Input_Btn:disabled {
            opacity: 0.38;
            pointer-events: none;
        }

        .DR_Btn_Label {
            font-size: 14px;
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: opacity var(--DR-motion) ease,
                        filter var(--DR-motion) ease,
                        color var(--DR-motion) ease;
        }

        .DR_Sm_Btn {
            display: flex;
            height: var(--DR-ctrl);
            padding: 10px 12px;
            min-width: 66px;
            justify-content: center;
            align-items: center;
            border-radius: var(--DR-r-s);
            corner-shape: var(--DR-corner);
            border: none;
            cursor: pointer;
            user-select: none;
            flex-shrink: 0;
            outline: 2px solid rgba(0, 0, 0, 0.2);
            outline-offset: -2px;
            background: rgb(var(--DR-blue));
            white-space: nowrap;
            transition: background var(--DR-motion) ease,
                        outline var(--DR-motion) ease,
                        filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease;
        }

        .DR_Sm_Btn:focus,
        .DR_Sm_Btn:focus-visible {
            outline-color: var(--focus-outline, rgba(0, 0, 0, 0.2)) !important;
        }

        .DR_Sm_Btn:hover {
            filter: brightness(0.9);
            transform: scale(1.05);
        }

        .DR_Sm_Btn:active {
            filter: brightness(0.9);
            transform: scale(0.9);
        }

        .DR_Sm_Btn:disabled {
            opacity: 0.38;
            pointer-events: none;
        }

        .DR_Sm_Btn_Label {
            font-size: 14px;
            font-weight: 800;
            line-height: 1.1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: opacity var(--DR-motion) ease,
                        filter var(--DR-motion) ease,
                        color var(--DR-motion) ease;
        }

        .DR_Toggle {
            position: relative;
            width: 52px;
            height: 30px;
            border-radius: 999px;
            background: var(--dr-card-border);
            cursor: pointer;
            user-select: none;
            flex-shrink: 0;
            transition: background var(--DR-motion) ease;
        }

        .DR_Toggle.on {
            background: rgb(var(--DR-blue));
        }

        .DR_Toggle_Knob {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            transition: transform var(--DR-motion) var(--DR-ease);
        }

        .DR_Toggle.on .DR_Toggle_Knob {
            transform: translateX(22px);
        }

        .DR_Select {
            position: relative;
            width: 100%;
            min-width: 0;
            height: 40px;
            border-radius: 8px;
            background: var(--dr-card-bg);
            border: 2px solid var(--dr-card-border);
            color: var(--dr-text);
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            user-select: none;
            transition: border-color var(--DR-motion) ease,
                        background var(--DR-motion) ease;
        }

        .DR_Select:hover {
            border-color: rgba(var(--DR-blue), 0.35);
        }

        .DR_Select.open {
            border-color: rgba(var(--DR-blue), 0.35);
        }

        .DR_Select_Trigger {
            height: 100%;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 6px;
            min-width: 0;
        }

        .DR_Select_Text {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .DR_Select_Options {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: var(--dr-bg);
            border: 1px solid var(--dr-card-border);
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, .2);
            max-height: 0;
            overflow-y: auto;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            transition: max-height var(--DR-motion) var(--DR-ease),
                        opacity var(--DR-motion) ease,
                        visibility var(--DR-motion) ease,
                        transform var(--DR-motion) var(--DR-ease);
            z-index: 100;
            backdrop-filter: blur(20px);
        }

        .DR_Select.open .DR_Select_Options {
            max-height: 128px;
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .DR_Select_Option {
            padding: 0 12px;
            min-height: 40px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            color: var(--dr-text);
            font-weight: 600;
            transition: background var(--DR-motion-fast) ease,
                        color var(--DR-motion-fast) ease;
        }

        .DR_Select_Option:hover {
            background: var(--dr-card-hover);
            color: var(--dr-text);
        }

        .DR_Select .DR_Chevron {
            transition: transform var(--DR-motion) var(--DR-ease);
            width: 16px;
            height: 16px;
            stroke: var(--dr-text);
        }

        .DR_Select.open .DR_Chevron {
            transform: rotate(180deg);
        }

        .DR_Select_Options::-webkit-scrollbar {
            width: 4px;
        }

        .DR_Select_Options::-webkit-scrollbar-track {
            margin: 8px 0;
            border-radius: 12px;
        }

        .DR_Select_Options::-webkit-scrollbar-thumb {
            background: rgba(var(--DR-blue), 0.4);
            border-radius: 4px;
        }

        .DR_Farm_Sec {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            align-self: stretch;
        }

        .DR_Farm_Sec > .DR_HStack_8 {
            margin-top: 8px;
        }

        .DR_Farm_Sec > .DR_Prog_Wrap.on {
            margin-top: 8px;
        }

        .DR_Task_Group {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            align-self: stretch;
        }

        .DR_Task_Group > .DR_Prog_Wrap.on {
            margin-top: 8px;
        }

        .DR_Prog_Wrap {
            align-self: stretch;
            height: 0;
            border-radius: 3px;
            background: rgba(var(--DR-blue), 0.1);
            overflow: hidden;
            transition: height var(--DR-motion-page) var(--DR-ease);
        }

        .DR_Prog_Wrap.on {
            height: 4px;
        }

        .DR_Prog_Fill {
            height: 100%;
            border-radius: 3px;
            background: rgb(var(--DR-blue));
            width: 0%;
            transition: width var(--DR-motion-page) var(--DR-ease),
                        background var(--DR-motion) ease,
                        box-shadow var(--DR-motion) ease;
            box-shadow: 0 0 6px rgba(var(--DR-blue), 0.35);
        }

        .DR_Prog_Fill.done {
            background: rgb(var(--DR-green)) !important;
            box-shadow: 0 0 8px rgba(var(--DR-green), 0.45) !important;
        }

        .DR_Avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(var(--DR-blue), 0.1);
            overflow: hidden;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .DR_Stat_Ico {
            width: 15px;
            height: 15px;
            display: block;
            flex-shrink: 0;
        }

        .DR_Stat_Val {
            font-size: 13px !important;
            font-weight: 700 !important;
            color: var(--dr-text) !important;
            opacity: 0.8;
        }

        .DR_Page {
            display: none;
            width: 100%;
        }

        .DR_Page.active {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-self: stretch;
            align-items: center;
        }

        .DR_Notif_Main {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 10px;
            width: 320px;
            position: fixed;
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
            z-index: 2147483647;
            pointer-events: none;
        }

        .DR_Notif_Box {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 20px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            outline: 2px solid rgba(229, 229, 229, 1);
            outline-offset: -2px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateY(-20px);
            transition: transform var(--DR-motion-page) var(--DR-ease),
                        opacity var(--DR-motion) ease,
                        margin var(--DR-motion-page) var(--DR-ease);
            pointer-events: auto;
            width: 100%;
            min-width: 0;
        }

        .DR_Notif_Box .DR_T1,
        .DR_Notif_Box .DR_T2 {
            overflow-wrap: anywhere;
        }

        .DR_Notif_Box > div:last-child {
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 2px;
        }

        .DR_Notif_Main.dr-light {
            --dr-text: #333;
        }

        .DR_Notif_Main.dr-dark {
            --dr-text: #fff;
        }

        .DR_Notif_Main.dr-dark .DR_Notif_Box {
            background: rgba(32, 47, 54, 0.85);
            outline-color: rgba(55, 70, 79, 1);
        }

        .DR_Notif_Box.show {
            opacity: 1;
            transform: translateY(0) scale(1) !important;
        }

        .DR_Notif_Box.hide {
            opacity: 0 !important;
            transform: translateY(-30px) scale(0.85) !important;
            margin-top: -60px;
            z-index: -1;
        }

        .DR_Notif_Main[data-pos^="bottom"] .DR_Notif_Box {
            transform: translateY(30px) scale(0.9);
        }

        .DR_Notif_Main[data-pos^="bottom"] .DR_Notif_Box.hide {
            transform: translateY(30px) scale(0.85) !important;
            margin-top: 0px;
            margin-bottom: -60px;
            z-index: -1;
        }

        .DR_Notif_Ico {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            color: var(--dr-text);
        }

        .DR_Notif_Ico svg {
            width: 100%;
            height: 100%;
        }

        .DR_Notif_Box.warning .DR_Notif_Ico {
            color: rgb(243, 156, 18);
        }

        .DR_Notif_Box.success .DR_Notif_Ico {
            color: rgb(88, 204, 2);
        }

        .DR_Notif_Box.error .DR_Notif_Ico {
            color: rgb(238, 85, 85);
        }

        .DR_Shop_Grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            align-self: stretch;
        }

        .DR_Shop_Section_Header {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 4px;
        }

        .DR_Shop_Section_Line {
            flex: 1;
            height: 1px;
            background: var(--dr-card-border);
        }

        .DR_Shop_Section_Title {
            font-size: 11px !important;
            font-weight: 800 !important;
            color: var(--dr-text) !important;
            text-transform: uppercase;
            letter-spacing: 0;
            opacity: 0.5;
        }

        .DR_Shop_Card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            min-height: 118px;
            padding: 10px 8px;
            box-sizing: border-box;
            border-radius: 8px;
            outline: 1.5px solid var(--dr-card-border);
            outline-offset: -1px;
            background: var(--dr-card-bg);
            transition: outline-color var(--DR-motion) ease,
                        background var(--DR-motion) ease;
            text-align: center;
            min-width: 0;
        }

        .DR_Shop_Card:hover {
            outline-color: rgba(var(--DR-blue), 0.3);
            background: var(--dr-card-hover);
        }

        .DR_Shop_Ico {
            width: 34px;
            height: 34px;
            object-fit: contain;
            flex-shrink: 0;
        }

        .DR_Shop_Name {
            font-size: 11px;
            font-weight: 700;
            color: var(--dr-text);
            opacity: 0.8;
            line-height: 1.3;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 30px;
            overflow-wrap: anywhere;
        }

        .DR_Shop_Btn {
            width: 100%;
            height: 28px;
            border-radius: var(--DR-r-s);
            border: none;
            cursor: pointer;
            font-size: 11px;
            font-weight: 800;
            color: #fff;
            background: rgb(var(--DR-blue));
            outline: 2px solid rgba(0, 0, 0, 0.2);
            outline-offset: -2px;
            transition: filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease,
                        background var(--DR-motion) ease;
        }

        .DR_Shop_Btn:hover {
            filter: brightness(0.9);
            transform: scale(1.05);
        }

        .DR_Shop_Btn:active {
            filter: brightness(0.9);
            transform: scale(0.9);
        }

        .DR_Shop_Btn:focus,
        .DR_Shop_Btn:focus-visible {
            outline-color: var(--focus-outline, rgba(0, 0, 0, 0.2)) !important;
        }

        .DR_Shop_Btn.loading {
            --focus-outline: var(--dr-card-border);
            background: var(--dr-card-bg);
            color: var(--dr-text);
            outline-color: var(--dr-card-border);
            pointer-events: none;
        }

        .DR_Shop_Btn.got {
            --focus-outline: rgba(var(--DR-green), 0.25);
            background: rgba(var(--DR-green), 0.12);
            color: rgb(var(--DR-green));
            outline-color: rgba(var(--DR-green), 0.25);
            pointer-events: none;
        }

        .DR_Shop_Btn.fail {
            --focus-outline: rgba(var(--DR-red), 0.22);
            background: rgba(var(--DR-red), 0.10);
            color: rgb(var(--DR-red));
            outline-color: rgba(var(--DR-red), 0.22);
            pointer-events: none;
        }

        .DR_Scroll_Inner {
            align-self: stretch;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            max-height: 300px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-right: 4px;
        }

        .DR_Scroll_Inner::-webkit-scrollbar {
            width: 4px;
        }

        .DR_Scroll_Inner::-webkit-scrollbar-track {
            margin: 8px 0;
            border-radius: 12px;
        }

        .DR_Scroll_Inner::-webkit-scrollbar-thumb {
            background: rgba(var(--DR-blue), 0.4);
            border-radius: 4px;
        }

        .DR_Search {
            align-self: stretch;
            height: 40px;
            padding: 0 12px;
            border-radius: 8px;
            border: none;
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            background: var(--dr-card-bg);
            font-size: 14px;
            font-weight: 600;
            color: var(--dr-text);
            transition: outline-color var(--DR-motion) ease;
        }

        .DR_Search:focus {
            outline-color: rgba(var(--DR-blue), 0.35);
        }

        .DR_Quest_Item {
            display: flex;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            min-height: 56px;
            padding: 8px 10px;
            box-sizing: border-box;
            border-radius: 8px;
            outline: 1.5px solid var(--dr-card-border);
            outline-offset: -1px;
            background: var(--dr-card-bg);
        }

        .DR_Quest_Item.done {
            outline-color: rgba(var(--DR-green), 0.25);
            background: rgba(var(--DR-green), 0.04);
        }

        .DR_Quest_Icon {
            width: 36px;
            height: 36px;
            object-fit: contain;
            flex-shrink: 0;
        }

        .DR_Quest_Info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .DR_Quest_Title {
            font-size: 12px !important;
            font-weight: 700 !important;
            color: var(--dr-text) !important;
            opacity: 0.9;
            line-height: 1.25;
            overflow-wrap: anywhere;
        }

        .DR_Quest_Bar_Bg {
            height: 4px;
            border-radius: 2px;
            background: rgba(var(--DR-blue), 0.10);
            overflow: hidden;
            align-self: stretch;
        }

        .DR_Quest_Bar_Fill {
            height: 100%;
            background: rgb(var(--DR-blue));
            border-radius: 2px;
            transition: width var(--DR-motion-page) var(--DR-ease);
        }

        .DR_Quest_Item.done .DR_Quest_Bar_Fill {
            background: rgb(var(--DR-green));
        }

        .DR_Quest_Get_Btn {
            height: 28px;
            min-width: 52px;
            padding: 0 8px;
            flex-shrink: 0;
            border-radius: var(--DR-r-s);
            border: none;
            cursor: pointer;
            font-size: 10px;
            font-weight: 800;
            white-space: nowrap;
            background: rgb(var(--DR-blue));
            color: #fff;
            transition: filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease,
                        background var(--DR-motion) ease;
        }

        .DR_Quest_Get_Btn:hover {
            filter: brightness(0.9);
            transform: scale(1.05);
        }

        .DR_Quest_Get_Btn:active {
            filter: brightness(0.9);
            transform: scale(0.9);
        }

        .DR_Field_Row,
        .DR_Setting_Row,
        .DR_Compact_Task {
            display: flex;
            align-items: center;
            justify-content: space-between;
            align-self: stretch;
            gap: 8px;
            min-width: 0;
        }

        .DR_Stack_Section {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-self: stretch;
            min-width: 0;
        }

        .DR_Row_Text {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1 1 auto;
            min-width: 0;
        }

        .DR_Row_Text .DR_T1,
        .DR_Row_Text .DR_T2 {
            overflow-wrap: anywhere;
        }

        .DR_Row_Text .DR_T1 {
            line-height: 1.12;
        }

        .DR_Row_Text .DR_T2 {
            font-size: 11px;
            line-height: 1.25;
        }

        .DR_Set_Input_Wrap {
            display: flex;
            align-items: center;
            height: 40px;
            min-width: 0;
            padding: 0 12px;
            box-sizing: border-box;
            gap: 6px;
            border-radius: 8px;
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            transition: outline-color var(--DR-motion) ease;
            background: var(--dr-card-bg);
        }

        .DR_Set_Input_Wrap:focus-within {
            outline-color: rgba(var(--DR-blue), 0.35);
        }

        .DR_Set_Input_Wrap .DR_Input {
            text-align: left;
            font-size: 14px !important;
        }

        .DR_Back_Btn {
            align-self: flex-start;
            width: auto;
            opacity: 0.62;
            cursor: pointer;
            padding: 2px 0;
        }

        .DR_Panel_Card {
            align-self: stretch;
            background: var(--dr-card-bg);
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            border-radius: 8px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .DR_Update_Banner {
            align-self: stretch;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            box-sizing: border-box;
            max-height: 0;
            opacity: 0;
            padding: 0 10px;
            margin: 0;
            overflow: hidden;
            border-radius: 8px;
            corner-shape: var(--DR-corner);
            background: rgba(var(--DR-blue), 0.12);
            outline: 1.5px solid rgba(var(--DR-blue), 0.3);
            outline-offset: -1.5px;
            transition: max-height var(--DR-motion-page) var(--DR-ease),
                        opacity var(--DR-motion) ease,
                        padding var(--DR-motion-page) var(--DR-ease);
        }

        .DR_Update_Banner.on {
            max-height: 54px;
            opacity: 1;
            padding: 8px 10px;
        }

        .DR_Update_Banner button:hover {
            filter: brightness(0.9);
        }

        .DR_Update_Banner button:active {
            filter: brightness(0.9);
            transform: scale(0.92);
        }

        .DR_Quest_Get_Btn.done {
            background: rgba(var(--DR-green), 0.10);
            color: rgb(var(--DR-green));
            pointer-events: none;
        }

        @media (max-width: 480px) {
            .DR_Main_Box {
                padding: 14px;
            }
        }

        @media (max-width: 360px) {
            .DR_Main_Box {
                padding: 12px;
            }

            .DR_Input_Btn,
            .DR_Sm_Btn {
                min-width: 60px;
                width: 60px;
                padding-left: 8px;
                padding-right: 8px;
            }
        }

        #duorain-hide-button {
            cursor: grab;
            touch-action: none;
            flex: none;
            min-width: 92px;
            height: 40px;
            padding: 10px 12px;
            justify-content: center;
            align-items: center;
            gap: 6px;
            color: var(--dr-text);
            background: var(--dr-panel-bg) !important;
            outline: 2px solid var(--dr-card-border);
            outline-offset: -2px;
            box-shadow: var(--dr-panel-shadow);
            backdrop-filter: blur(20px) saturate(1.6);
            -webkit-backdrop-filter: blur(20px) saturate(1.6);
            transition: background var(--DR-motion) ease,
                        outline var(--DR-motion) ease,
                        box-shadow var(--DR-motion) ease,
                        color var(--DR-motion) ease,
                        filter var(--DR-motion-fast) ease,
                        transform var(--DR-motion-fast) ease;
        }

        #duorain-hide-button:active {
            cursor: grabbing;
        }

        #duorain-hide-button .DR_Hide_Icon_Stack {
            display: grid;
            place-items: center;
            width: 24px;
            height: 18px;
            flex: 0 0 24px;
        }

        #duorain-hide-button svg {
            display: block !important;
            grid-area: 1 / 1;
            color: inherit;
            fill: currentColor !important;
            transition: color var(--DR-motion) ease,
                        opacity var(--DR-motion) ease,
                        filter var(--DR-motion) ease,
                        transform var(--DR-motion) ease;
        }

        #duorain-hide-button svg path {
            fill: currentColor !important;
        }

        #duorain-hide-button #hide-icon {
            opacity: 1;
            transform: scale(1);
        }

        #duorain-hide-button #show-icon {
            opacity: 0;
            transform: scale(0.85);
        }

        #duorain-hide-button.duorain-show-mode #hide-icon {
            opacity: 0;
            transform: scale(0.85);
        }

        #duorain-hide-button.duorain-show-mode #show-icon {
            opacity: 1;
            transform: scale(1);
        }

        #duorain-hide-button.duorain-show-mode {
            background: var(--dr-panel-bg) !important;
            outline-color: var(--dr-card-border);
            color: var(--dr-text);
        }

        #DR_Main_Content {
            transition: opacity var(--DR-motion) ease,
                        filter var(--DR-motion) ease;
        }

        #DR_Main_Content.dr-disabled {
            pointer-events: none;
            opacity: 0.5;
            filter: grayscale(1);
        }

        #DR_Root button {
            -webkit-tap-highlight-color: transparent;
        }

        #DR_Root button:focus,
        #DR_Root button:focus-visible,
        #DR_Root button:active {
            outline-style: solid !important;
            outline-width: 2px !important;
            outline-color: var(--focus-outline, var(--dr-card-border)) !important;
            outline-offset: -2px !important;
        }

        .DR_Modal_Overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 1000;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity var(--DR-motion-page) var(--DR-ease),
                        visibility var(--DR-motion-page) var(--DR-ease),
                        backdrop-filter var(--DR-motion-page) var(--DR-ease);
        }

        .DR_Modal_Overlay.show {
            opacity: 1;
            visibility: visible;
        }

        .DR_Modal_Box {
            background: var(--dr-bg);
            border: 1px solid var(--dr-card-border);
            border-radius: 16px;
            padding: 20px;
            width: 270px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
            transform: scale(0.9);
            transition: transform var(--DR-motion-page) var(--DR-ease);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .DR_Modal_Overlay.show .DR_Modal_Box {
            transform: scale(1);
        }
    `;

    const loadCss = `
        .lds-roller,
        .lds-roller div,
        .lds-roller div:after {
            box-sizing: border-box;
        }

        .lds-roller {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
        }

        .lds-roller div {
            animation: lds-roller var(--DR-motion-spin) var(--DR-ease) infinite;
            transform-origin: 40px 40px;
        }

        .lds-roller div:after {
            content: " ";
            display: block;
            position: absolute;
            width: 7.2px;
            height: 7.2px;
            border-radius: 50%;
            background: currentColor;
            margin: -3.6px 0 0 -3.6px;
        }

        .lds-roller div:nth-child(1) { animation-delay: -0.036s; }
        .lds-roller div:nth-child(1):after { top: 62.62742px; left: 62.62742px; }
        .lds-roller div:nth-child(2) { animation-delay: -0.072s; }
        .lds-roller div:nth-child(2):after { top: 67.71281px; left: 56px; }
        .lds-roller div:nth-child(3) { animation-delay: -0.108s; }
        .lds-roller div:nth-child(3):after { top: 70.90963px; left: 48.28221px; }
        .lds-roller div:nth-child(4) { animation-delay: -0.144s; }
        .lds-roller div:nth-child(4):after { top: 72px; left: 40px; }
        .lds-roller div:nth-child(5) { animation-delay: -0.18s; }
        .lds-roller div:nth-child(5):after { top: 70.90963px; left: 31.71779px; }
        .lds-roller div:nth-child(6) { animation-delay: -0.216s; }
        .lds-roller div:nth-child(6):after { top: 67.71281px; left: 24px; }
        .lds-roller div:nth-child(7) { animation-delay: -0.252s; }
        .lds-roller div:nth-child(7):after { top: 62.62742px; left: 17.37258px; }
        .lds-roller div:nth-child(8) { animation-delay: -0.288s; }
        .lds-roller div:nth-child(8):after { top: 56px; left: 12.28719px; }

        @keyframes lds-roller {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    const uiHtml = `
        <div class="DR_Notif_Main dr-light" id="DR_Notif_Main"></div>
        <div class="DR_Main" id="DR_Main">
            <div class="DR_HStack_8" style="align-self: flex-end;">
                <button type="button" class="DR_Btn DR_Btn_Eel DR_NoSel dr-light" id="duorain-hide-button">
                    <span class="DR_Hide_Icon_Stack">${icons.hideBtn}${icons.showBtn}</span>
                    <span id="hide-show-text" class="DR_T1 DR_NoSel" style="font-size: 14px; line-height: 1; color: inherit;">Hide</span>
                </button>
            </div>
            <div class="DR_Main_Box dr-light" id="DR_Main_Box">
                <div class="DR_Modal_Overlay" id="DR_Confirm_Modal">
                    <div class="DR_Modal_Box">
                        <div class="DR_Notif_Ico" style="color: rgb(243, 156, 18); width: 32px; height: 32px; margin-bottom: 4px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                        <p class="DR_T1 DR_NoSel">Action Required</p>
                        <p class="DR_T2 DR_NoSel" style="font-size: 12px; margin-bottom: 6px;">XP Farm is currently running. Do you want to stop it to run Auto League?</p>
                        <div class="DR_HStack_8" style="margin-top: 4px;">
                            <button class="DR_Sm_Btn DR_Btn_Eel DR_NoSel" id="DR_Modal_Cancel" style="flex: 1; outline-color: transparent;">
                                <span class="DR_Sm_Btn_Label" style="color: var(--dr-text);">CANCEL</span>
                            </button>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_Modal_Confirm" style="flex: 1;">
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">STOP & RUN</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="DR_Page active" id="DR_Page_1">
                    <div class="DR_HStack_Auto" id="DR_Header_Row" style="align-self: stretch;">
                        <div class="DR_NoSel" style="display: flex; flex-direction: column; justify-content: center;">
                            <div class="DR_Wordmark DR_NoSel">
                                <span style="color: var(--dr-text);">Duo</span>
                                <span class="dr-rain">Rain</span>
                            </div>
                            <span class="DR_Hover_1" id="DR_Version_Btn" style="font-family: 'DuoFeather', 'din-round'; font-size: 12px; font-weight: 800; letter-spacing: 0.3px; color: var(--dr-text); opacity: 0.55; line-height: 1; margin-top: 5px; cursor: pointer;">v${drVersion}</span>
                        </div>
                        <div class="DR_HStack_8" style="width: auto;">
                            <div class="DR_Btn DR_Btn_Icon DR_NoSel" id="DR_Web_Btn" style="background: rgb(var(--DR-blue)); outline: 2px solid rgba(255, 255, 255, .18); outline-offset: -2px;">
                                ${icons.webBtn}
                            </div>
                            <div class="DR_Btn DR_Btn_Icon DR_NoSel" id="DR_Discord_Btn" style="background: rgb(88, 101, 242); outline: 2px solid rgba(0, 0, 0, .18); outline-offset: -2px;">
                                ${icons.discordBtn}
                            </div>
                            <div class="DR_Btn DR_Btn_Icon DR_NoSel" id="DR_GitHub_Btn" style="background: #24292e; outline: 2px solid rgba(255, 255, 255, .18); outline-offset: -2px;">
                                ${icons.githubBtn}
                            </div>
                        </div>
                    </div>
                   <div class="DR_HStack_8" style="align-self: stretch;">
                        <div class="DR_Btn DR_Btn_Eel DR_NoSel" id="DR_Conn_Btn" style="flex: 1 0 0; justify-content: flex-start; align-items: center; padding: 10px 12px; gap: 8px; transition: background var(--DR-motion) ease, outline var(--DR-motion) ease, color var(--DR-motion) ease; pointer-events: none;">
                            <span id="DR_Conn_Ico" style="display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 20px; height: 20px;"></span>
                            <span class="DR_T1 DR_NoSel" id="DR_Conn_Txt" style="color: inherit; font-size: 13px; line-height: 20px;">Connecting</span>
                        </div>
                        <div class="DR_Btn DR_Btn_Eel DR_NoSel" id="DR_TopSettings_Btn" title="Settings" style="flex: 0 0 auto; padding: 10px 12px; gap: 6px; justify-content: center; align-items: center; color: var(--dr-text);">
                            ${icons.settingsBtn}
                            <span class="DR_T1 DR_NoSel" style="font-size: 13px; line-height: 20px; color: var(--dr-text);">Settings</span>
                        </div>
                    </div>
                    <div class="DR_Update_Banner" id="DR_Update_Banner">
                        <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1 1 auto;">
                            <div style="width: 26px; height: 26px; border-radius: 50%; background: rgb(var(--DR-blue)); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"></path><path d="M5 12l7-7 7 7"></path></svg>
                            </div>
                            <div style="min-width: 0; display: flex; flex-direction: column; gap: 1px;">
                                <p class="DR_T1 DR_NoSel" style="font-size: 12px; line-height: 1.2;">Update available</p>
                                <p class="DR_T2 DR_NoSel" id="DR_Update_Version_Text" style="font-size: 11px; line-height: 1.2;"></p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                            <button type="button" class="DR_NoSel" id="DR_Update_Btn" style="height: 28px; padding: 0 10px; border: none; border-radius: 6px; background: rgb(var(--DR-blue)); color: #fff; font-size: 11px; font-weight: 800; cursor: pointer;">UPDATE</button>
                            <button type="button" class="DR_NoSel" id="DR_Update_Dismiss_Btn" style="width: 28px; height: 28px; border: none; border-radius: 6px; background: transparent; color: var(--dr-text); opacity: 0.5; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div id="DR_Main_Content" class="dr-disabled" style="display: flex; flex-direction: column; gap: 8px; width: 100%; transition: opacity var(--DR-motion) ease, filter var(--DR-motion) ease;">
                        <div class="DR_Profile_Block" id="DR_User_Row" style="display: none; position: relative; background: var(--dr-card-bg); border: 1.5px solid var(--dr-card-border); border-radius: 8px; padding: 10px; align-items: center; gap: 8px;">
                            <div class="DR_Avatar" id="DR_Avatar">${icons.avatar}</div>
                            <div class="DR_VStack_4" style="flex: 1 0 0; min-width: 0; align-items: flex-start;">
                                <p class="DR_T1 DR_NoSel" id="DR_UName" style="font-size: 14px; align-self: stretch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 16px;"></p>
                                <div class="DR_HStack_4" style="gap: 8px; flex-wrap: wrap;">
                                    <div class="DR_HStack_4" style="gap: 3px;">
                                        <img class="DR_Stat_Ico" src="${icons.xpIcon}">
                                        <span class="DR_Stat_Val DR_NoSel" id="DR_UXP">0</span>
                                    </div>
                                    <div class="DR_HStack_4" style="gap: 3px;">
                                        <img class="DR_Stat_Ico" src="${icons.gemIcon}">
                                        <span class="DR_Stat_Val DR_NoSel" id="DR_UGems">0</span>
                                    </div>
                                    <div class="DR_HStack_4" style="gap: 3px;">
                                        <img class="DR_Stat_Ico" src="${icons.streakIcon}">
                                        <span class="DR_Stat_Val DR_NoSel" id="DR_UStreak">0</span>
                                    </div>
                                    <div class="DR_HStack_4" id="DR_ULeague_Wrap" style="gap: 3px; display: none;">
                                        <img class="DR_Stat_Ico" id="DR_ULeague_Ico" src="${leagueBadgeUrl()}">
                                        <span class="DR_Stat_Val DR_NoSel" id="DR_ULeague_Rank">#0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="DR_Divider"></div>
                        <div class="DR_Farm_Sec">
                            <div class="DR_HStack_4" style="align-self: stretch; min-width: 0;">
                                <p class="DR_T1 DR_NoSel" style="font-size: 14px; font-weight: 600;">How much XP would you like to get?</p>
                            </div>
                            <div class="DR_HStack_8">
                                <button class="DR_Hash_Btn" id="DR_XP_Hash" data-inf="false" title="Toggle infinite loops">${icons.hash}</button>
                                <div class="DR_Input_Wrap">
                                    <input type="number" class="DR_Input DR_NoSel" id="DR_XP_Input" placeholder="0" min="30">
                                </div>
                                <button class="DR_Input_Btn DR_NoSel" id="DR_XP_Btn" disabled>
                                    <span class="DR_Btn_Label" id="DR_XP_Lbl" style="color: #fff;">RUN</span>
                                </button>
                            </div>
                            <div class="DR_Prog_Wrap" id="DR_XP_Prog">
                                <div class="DR_Prog_Fill" id="DR_XP_Fill"></div>
                            </div>
                        </div>
                        <div class="DR_Divider"></div>
                        <div class="DR_Farm_Sec">
                            <div class="DR_HStack_4" style="align-self: stretch; min-width: 0;">
                                <p class="DR_T1 DR_NoSel" style="font-size: 14px; font-weight: 600;">How many Gems would you like to get?</p>
                            </div>
                            <div class="DR_HStack_8">
                                <button class="DR_Hash_Btn dr-inf-active" id="DR_Gem_Hash" data-inf="true" title="Toggle infinite loops">${icons.inf}<span class="DR_Hash_Lbl">Infinite</span></button>
                                <div class="DR_Input_Wrap dr-inf-hidden">
                                    <input type="number" class="DR_Input DR_NoSel" id="DR_Gem_Input" placeholder="Loops" min="1" disabled value="Infinity">
                                </div>
                                <button class="DR_Input_Btn DR_NoSel" id="DR_Gem_Btn" disabled>
                                    <span class="DR_Btn_Label" id="DR_Gem_Lbl" style="color: #fff;">RUN</span>
                                </button>
                            </div>
                            <div class="DR_Prog_Wrap" id="DR_Gem_Prog">
                                <div class="DR_Prog_Fill" id="DR_Gem_Fill"></div>
                            </div>
                        </div>
                        <div class="DR_Divider"></div>
                        <div class="DR_Farm_Sec">
                            <div class="DR_HStack_4" style="align-self: stretch; min-width: 0;">
                                <p class="DR_T1 DR_NoSel" style="font-size: 14px; font-weight: 600;">How many Streak Days to restore?</p>
                            </div>
                            <div class="DR_HStack_8">
                                <button class="DR_Hash_Btn" id="DR_Streak_Hash" data-inf="false" title="Toggle infinite loops">${icons.hash}</button>
                                <div class="DR_Input_Wrap">
                                    <input type="number" class="DR_Input DR_NoSel" id="DR_Streak_Input" placeholder="Days" min="1">
                                </div>
                                <button class="DR_Input_Btn DR_NoSel" id="DR_Streak_Btn" disabled>
                                    <span class="DR_Btn_Label" id="DR_Streak_Lbl" style="color: #fff;">RUN</span>
                                </button>
                            </div>
                            <div class="DR_Prog_Wrap" id="DR_Streak_Prog">
                                <div class="DR_Prog_Fill" id="DR_Streak_Fill"></div>
                            </div>
                        </div>
                        <div class="DR_Divider"></div>
                        <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Extra_Btn">
                            <div class="DR_Nav_Btn_L">
                                ${icons.moreFeatures}
                                <p class="DR_Nav_Title DR_NoSel">Extra</p>
                            </div>
                            ${icons.arrowRight}
                        </div>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Extra">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Extra_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Shop_Btn">
                        <div class="DR_Nav_Btn_L">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none" style="width: 22px; height: 22px; flex-shrink: 0;">
                                <path d="M40 36V17H6V36C6 38.2091 7.73969 40 9.88571 40H36.1143C38.2603 40 40 38.2091 40 36Z" fill="#077aff"/>
                                <path d="M4 10C4 7.79086 5.79086 6 8 6H17V17H4V10Z" fill="#077aff"/>
                                <path d="M4 17H17V17.5C17 21.0899 14.0899 24 10.5 24C6.91015 24 4 21.0899 4 17.5V17Z" fill="#428ce1"/>
                                <path d="M17 17H29V17.5C29 21.0899 26.3137 24 23 24C19.6863 24 17 21.0899 17 17.5V17Z" fill="white"/>
                                <path d="M29 17H42V17.5C42 21.0899 39.0899 24 35.5 24C31.9101 24 29 21.0899 29 17.5V17Z" fill="#428ce1"/>
                                <path d="M17 6H29V17H17V6Z" fill="#D0D0D0"/>
                                <path d="M29 6H38C40.2091 6 42 7.79086 42 10V17H29V6Z" fill="#077aff"/>
                                <path d="M11 30C11 28.8954 11.8954 28 13 28H18C19.1046 28 20 28.8954 20 30V40H11V30Z" fill="#ffffff"/>
                                <path d="M24 30C24 28.8954 24.8954 28 26 28H34C35.1046 28 36 28.8954 36 30V34C36 35.1046 35.1046 36 34 36H26C24.8954 36 24 35.1046 24 34V30Z" fill="#ffffff"/>
                            </svg>
                            <p class="DR_Nav_Title DR_NoSel">Shop Items</p>
                        </div>
                        ${icons.arrowRight}
                    </div>
                    <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Quest_Nav_Btn">
                        <div class="DR_Nav_Btn_L">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/64d0bbcd8f4e6d5018502540f1e0094b.svg" alt="">
                            <p class="DR_Nav_Title DR_NoSel">Quests Center</p>
                        </div>
                        ${icons.arrowRight}
                    </div>
                    <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Tools_Nav_Btn">
                        <div class="DR_Nav_Btn_L">
                            <img class="DR_NoSel" src="${DUO_LEAGUES_CDN}a8e5c18e80054228b2c61168846ff643.svg" alt="" style="width: 22px; height: 22px; object-fit: contain; flex-shrink: 0;">
                            <p class="DR_Nav_Title DR_NoSel">Social Tools</p>
                        </div>
                        ${icons.arrowRight}
                    </div>
                    <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Feed_Nav_Btn">
                        <div class="DR_Nav_Btn_L">
                            <img class="DR_NoSel" src="${DUO_LEAGUES_CDN}2ceb401cae52712705b66a77df83ce40.svg" alt="" style="width: 22px; height: 22px; object-fit: contain; flex-shrink: 0;">
                            <p class="DR_Nav_Title DR_NoSel">Activity Feed</p>
                        </div>
                        ${icons.arrowRight}
                    </div>
                    <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Board_Nav_Btn">
                        <div class="DR_Nav_Btn_L">
                            <img id="DR_Board_Nav_Ico" src="${leagueBadgeUrl()}" alt="" style="width: 22px; height: 22px; flex-shrink: 0; object-fit: contain;">
                            <p class="DR_Nav_Title DR_NoSel">Leaderboard</p>
                        </div>
                        ${icons.arrowRight}
                    </div>
                    <div class="DR_Stack_Section">
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Remove Hearts</p>
                                <p class="DR_T2 DR_NoSel">Drain hearts from this account</p>
                            </div>
                            <div class="DR_Set_Input_Wrap" style="width: 72px; flex-shrink: 0;">
                                <input type="number" class="DR_Input DR_NoSel" id="DR_Hearts_Input" placeholder="1-5" min="1" max="5">
                            </div>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_Hearts_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">RUN</span>
                            </button>
                        </div>
                        <div class="DR_Prog_Wrap" id="DR_Hearts_Prog" style="align-self: stretch;">
                            <div class="DR_Prog_Fill" id="DR_Hearts_Fill"></div>
                        </div>
                    </div>
                    <div class="DR_Stack_Section">
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Auto League</p>
                                <p class="DR_T2 DR_NoSel">Target specific rank position</p>
                            </div>
                            <div class="DR_Select" id="DR_League_Select" data-value="1" style="width: 72px; flex-shrink: 0;">
                                <div class="DR_Select_Trigger">
                                    <span class="DR_Select_Text"># 1</span>${icons.chevron}
                                </div>
                                <div class="DR_Select_Options"></div>
                            </div>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_League_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" id="DR_League_Lbl" style="color: #fff;">RUN</span>
                            </button>
                        </div>
                        <div class="DR_Prog_Wrap" id="DR_League_Prog" style="align-self: stretch;">
                            <div class="DR_Prog_Fill" id="DR_League_Fill"></div>
                        </div>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Settings">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Settings_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div style="align-self: stretch; display: flex; flex-direction: column; width: 100%;">
                        <style>
                            .DR_Select.dropup .DR_Select_Options { top: auto; bottom: calc(100% + 8px); transform: translateY(10px); }
                            .DR_Select.dropup.open .DR_Select_Options { transform: translateY(0); }
                            .DR_Select_Option { border-left: 3px solid transparent; transition: background var(--DR-motion-fast) ease, border-color var(--DR-motion-fast) ease; }
                            .DR_Select_Option.selected {
                                background: linear-gradient(90deg, rgba(var(--DR-blue), 0.1) 0%, transparent 100%);
                                color: var(--dr-text);
                                border-left: 3px solid rgba(var(--DR-blue), 0.5);
                            }
                            #DR_Page_Settings .DR_HStack_Auto { margin: 0 !important; }
                            #DR_Page_Settings .DR_VStack_8 { gap: 8px; }
                            #DR_Page_Settings .DR_Select, #DR_Page_Settings .DR_Select_Options { border-radius: 8px !important; }
                        </style>
                        <div class="DR_VStack_8" style="align-self: stretch;">
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Loop Interval</p>
                                    <p class="DR_T2 DR_NoSel">Interval between loops</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Set_Input_Wrap" style="width: 116px;">
                                        <input type="number" class="DR_Input DR_NoSel" id="DR_Delay_Input" placeholder="500">
                                        <p class="DR_T1 DR_NoSel" style="color: var(--dr-text); font-size: 13px; flex-shrink: 0; opacity: 0.8; margin-left: 6px;">ms</p>
                                    </div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">XP Overshoot</p>
                                    <p class="DR_T2 DR_NoSel">Extra XP above target (30-500, 0 off)</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Set_Input_Wrap" style="width: 116px;">
                                        <input type="number" class="DR_Input DR_NoSel" id="DR_XpRoom_Input" placeholder="0">
                                        <p class="DR_T1 DR_NoSel" style="color: var(--dr-text); font-size: 13px; flex-shrink: 0; opacity: 0.8; margin-left: 6px;">xp</p>
                                    </div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Notification Position</p>
                                    <p class="DR_T2 DR_NoSel">Set where alerts should appear</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Select" id="DR_Notif_Select" data-value="bottom_center" style="width: 146px; font-size: 13px;">
                                        <div class="DR_Select_Trigger">
                                            <span class="DR_Select_Text">Bottom Center</span>${icons.chevron}
                                        </div>
                                        <div class="DR_Select_Options">
                                            <div class="DR_Select_Option" data-value="top_left">Top Left</div>
                                            <div class="DR_Select_Option" data-value="top_center">Top Center</div>
                                            <div class="DR_Select_Option" data-value="top_right">Top Right</div>
                                            <div class="DR_Select_Option" data-value="bottom_left">Bottom Left</div>
                                            <div class="DR_Select_Option selected" data-value="bottom_center">Bottom Center</div>
                                            <div class="DR_Select_Option" data-value="bottom_right">Bottom Right</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">On-Client Duolingo Max</p>
                                    <p class="DR_T2 DR_NoSel">Unlock Max locally (reload to apply)</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Toggle" id="DR_LocalMax_Toggle"><div class="DR_Toggle_Knob"></div></div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Auto Join League</p>
                                    <p class="DR_T2 DR_NoSel">Joins a league for you on launch</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Toggle" id="DR_AutoJoin_Toggle"><div class="DR_Toggle_Knob"></div></div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Auto Block League</p>
                                    <p class="DR_T2 DR_NoSel">Blocks league users for you on launch</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Toggle" id="DR_AutoBlock_Toggle"><div class="DR_Toggle_Knob"></div></div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Auto Reach Rank</p>
                                    <p class="DR_T2 DR_NoSel">Farms to your saved rank on launch</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Toggle" id="DR_AutoReach_Toggle"><div class="DR_Toggle_Knob"></div></div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Auto Keep Streak</p>
                                    <p class="DR_T2 DR_NoSel">Keeps your streak for you on launch</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Toggle" id="DR_AutoStreak_Toggle"><div class="DR_Toggle_Knob"></div></div>
                                </div>
                            </div>
                            <div class="DR_Divider"></div>
                            <div class="DR_Setting_Row">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Auto Quest Saver</p>
                                    <p class="DR_T2 DR_NoSel">Saves your quests for you on launch</p>
                                </div>
                                <div class="DR_HStack_8" style="width: auto;">
                                    <div class="DR_Toggle" id="DR_AutoQuest_Toggle"><div class="DR_Toggle_Knob"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Stats">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Stats_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div class="DR_Panel_Card">
                        <p class="DR_T1 DR_NoSel" style="font-weight: 800;">Recent XP</p>
                        <div id="DR_XPHistory" style="display: flex; flex-direction: column; gap: 8px;">
                            <p class="DR_T2 DR_NoSel" style="text-align: center;">Loading...</p>
                        </div>
                    </div>
                    <div class="DR_Panel_Card">
                        <div class="DR_HStack_Auto" style="align-self: stretch;">
                            <p class="DR_T1 DR_NoSel" style="font-weight: 800;">v${drVersion} Stats</p>
                            <span class="DR_T2 DR_NoSel" id="DR_Stats_Reset" style="font-size: 11px; cursor: pointer; opacity: 0.6;">Reset</span>
                        </div>
                        <div class="DR_HStack_Auto" style="align-self: stretch;">
                            <p class="DR_T2 DR_NoSel">XP Gained</p>
                            <p class="DR_T1 DR_NoSel" id="DR_Stat_XP">0</p>
                        </div>
                        <div class="DR_HStack_Auto" style="align-self: stretch;">
                            <p class="DR_T2 DR_NoSel">Gems Gained</p>
                            <p class="DR_T1 DR_NoSel" id="DR_Stat_Gems">0</p>
                        </div>
                        <div class="DR_HStack_Auto" style="align-self: stretch;">
                            <p class="DR_T2 DR_NoSel">Streak Gained</p>
                            <p class="DR_T1 DR_NoSel" id="DR_Stat_Streak">0</p>
                        </div>
                        <div class="DR_Divider" style="margin: 2px 0;"></div>
                        <div class="DR_HStack_Auto" style="align-self: stretch;">
                            <p class="DR_T2 DR_NoSel">Since</p>
                            <p class="DR_T2 DR_NoSel" id="DR_Stat_Since" style="opacity: 1;">—</p>
                        </div>
                        <div class="DR_Divider" style="margin: 2px 0;"></div>
                        <p class="DR_T2 DR_NoSel" style="text-align: center; font-size: 11px; line-height: 1.6; opacity: 1;">Created by <span class="DR_Hover_1" id="DR_Credit_Oracle" style="color: rgb(var(--DR-blue)); font-weight: 700; cursor: pointer;">OracleMythix</span> & <span class="DR_Hover_1" id="DR_Credit_Gorou" style="color: rgb(var(--DR-blue)); font-weight: 700; cursor: pointer;">oxGorou</span></p>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Status">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Status_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <input type="text" class="DR_Search DR_NoSel" id="DR_Status_Search" placeholder="Search statuses..." style="">
                    <div class="DR_Scroll_Inner" id="DR_Status_Container" style="max-height: 300px;">
                        <p class="DR_T2 DR_NoSel" style="text-align: center; padding: 8px 0;">Loading statuses...</p>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Shop">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Shop_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <input type="text" class="DR_Search DR_NoSel" id="DR_Shop_Search" placeholder="Search items..." style="">
                    <div class="DR_Scroll_Inner" id="DR_Shop_Container" style="max-height: 300px;">
                        <p class="DR_T2 DR_NoSel" style="text-align: center; padding: 8px 0;">Loading shop...</p>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Quests">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Quests_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div class="DR_Stack_Section">
                        <div class="DR_HStack_Auto" style="align-self: stretch;">
                            <p class="DR_T1 DR_NoSel" style="font-size: 14px; font-weight: 600;">Quest Operations</p>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_Quest_Force_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">FORCE ALL</span>
                            </button>
                        </div>
                        <div class="DR_Prog_Wrap" id="DR_QuestForce_Prog" style="align-self: stretch;">
                            <div class="DR_Prog_Fill" id="DR_QuestForce_Fill"></div>
                        </div>
                    </div>
                    <div class="DR_Divider" style=""></div>
                    <input type="text" class="DR_Search DR_NoSel" id="DR_Quest_Search" placeholder="Search quests..." style="">
                    <div id="DR_Quest_Container" class="DR_Scroll_Inner" style="max-height: 300px; width: 100%;">
                        <p class="DR_T2 DR_NoSel" style="text-align: center; padding: 8px 0;">Loading quests...</p>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Tools">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Tools_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div class="DR_VStack_8" style="align-self: stretch;">
                        <div class="DR_Set_Input_Wrap" style="align-self: stretch;">
                            <input type="text" class="DR_Input DR_NoSel" id="DR_Tools_User" placeholder="Target username">
                        </div>
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Block / Unblock</p>
                                <p class="DR_T2 DR_NoSel">Block or unblock the user above</p>
                            </div>
                            <div class="DR_Select" id="DR_Block_Select" data-value="block" style="width: 98px; flex-shrink: 0;">
                                <div class="DR_Select_Trigger">
                                    <span class="DR_Select_Text">Block</span>${icons.chevron}
                                </div>
                                <div class="DR_Select_Options">
                                    <div class="DR_Select_Option selected" data-value="block">Block</div>
                                    <div class="DR_Select_Option" data-value="unblock">Unblock</div>
                                </div>
                            </div>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_Block_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">RUN</span>
                            </button>
                        </div>
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Follow / Unfollow</p>
                                <p class="DR_T2 DR_NoSel">Follow or unfollow the user above</p>
                            </div>
                            <div class="DR_Select" id="DR_FollowSingle_Select" data-value="follow" style="width: 98px; flex-shrink: 0;">
                                <div class="DR_Select_Trigger">
                                    <span class="DR_Select_Text">Follow</span>${icons.chevron}
                                </div>
                                <div class="DR_Select_Options">
                                    <div class="DR_Select_Option selected" data-value="follow">Follow</div>
                                    <div class="DR_Select_Option" data-value="unfollow">Unfollow</div>
                                </div>
                            </div>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_FollowSingle_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">RUN</span>
                            </button>
                        </div>
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Send Gift</p>
                                <p class="DR_T2 DR_NoSel">Gift an item to the user above</p>
                            </div>
                            <div class="DR_Select" id="DR_Gift_Select" data-value="streak_freeze_gift" style="width: 98px; flex-shrink: 0;">
                                <div class="DR_Select_Trigger">
                                    <span class="DR_Select_Text">Freeze</span>${icons.chevron}
                                </div>
                                <div class="DR_Select_Options">
                                    <div class="DR_Select_Option selected" data-value="streak_freeze_gift">Freeze</div>
                                    <div class="DR_Select_Option" data-value="xp_boost_15_gift">XP Boost</div>
                                </div>
                            </div>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_Gift_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">SEND</span>
                            </button>
                        </div>
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Friend Streak / Quest</p>
                                <p class="DR_T2 DR_NoSel">Start a streak or quest with them</p>
                            </div>
                            <div class="DR_Select" id="DR_Friend_Select" data-value="streak" style="width: 98px; flex-shrink: 0;">
                                <div class="DR_Select_Trigger">
                                    <span class="DR_Select_Text">Streak</span>${icons.chevron}
                                </div>
                                <div class="DR_Select_Options">
                                    <div class="DR_Select_Option selected" data-value="streak">Streak</div>
                                    <div class="DR_Select_Option" data-value="quest">Quest</div>
                                </div>
                            </div>
                            <button class="DR_Sm_Btn DR_NoSel" id="DR_Friend_Btn" disabled>
                                <span class="DR_Sm_Btn_Label" style="color: #fff;">START</span>
                            </button>
                        </div>
                        <div class="DR_Divider"></div>
                        <div class="DR_Task_Group">
                            <div class="DR_Compact_Task">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Mass Follow</p>
                                    <p class="DR_T2 DR_NoSel">Follow or unfollow in bulk</p>
                                </div>
                                <div class="DR_Select" id="DR_Follow_Select" data-value="follow" style="width: 98px; flex-shrink: 0;">
                                    <div class="DR_Select_Trigger">
                                        <span class="DR_Select_Text">Follow</span>${icons.chevron}
                                    </div>
                                    <div class="DR_Select_Options">
                                        <div class="DR_Select_Option selected" data-value="follow">Follow</div>
                                        <div class="DR_Select_Option" data-value="unfollow">Unfollow</div>
                                    </div>
                                </div>
                                <button class="DR_Sm_Btn DR_NoSel" id="DR_Follow_Btn" disabled>
                                    <span class="DR_Sm_Btn_Label" style="color: #fff;">RUN</span>
                                </button>
                            </div>
                            <div class="DR_Prog_Wrap" id="DR_Follow_Prog">
                                <div class="DR_Prog_Fill" id="DR_Follow_Fill"></div>
                            </div>
                        </div>
                        <div class="DR_Task_Group">
                            <div class="DR_Compact_Task">
                                <div class="DR_Row_Text">
                                    <p class="DR_T1 DR_NoSel">Mass Block</p>
                                    <p class="DR_T2 DR_NoSel">Block or unblock your league</p>
                                </div>
                                <div class="DR_Select" id="DR_BlockMass_Select" data-value="block" style="width: 98px; flex-shrink: 0;">
                                    <div class="DR_Select_Trigger">
                                        <span class="DR_Select_Text">Block</span>${icons.chevron}
                                    </div>
                                    <div class="DR_Select_Options">
                                        <div class="DR_Select_Option selected" data-value="block">Block</div>
                                        <div class="DR_Select_Option" data-value="unblock">Unblock</div>
                                    </div>
                                </div>
                                <button class="DR_Sm_Btn DR_NoSel" id="DR_Block_Mass_Btn" disabled>
                                    <span class="DR_Sm_Btn_Label" style="color: #fff;">RUN</span>
                                </button>
                            </div>
                            <div class="DR_Prog_Wrap" id="DR_Block_Mass_Prog">
                                <div class="DR_Prog_Fill" id="DR_Block_Mass_Fill"></div>
                            </div>
                        </div>
                        <div class="DR_Divider"></div>
                        <div class="DR_Compact_Task">
                            <div class="DR_Row_Text">
                                <p class="DR_T1 DR_NoSel">Privacy Status</p>
                                <p class="DR_T2 DR_NoSel">Change privacy status</p>
                            </div>
                            <div class="DR_Select" id="DR_Privacy_Select" data-value="public" style="width: 98px; flex-shrink: 0;">
                                <div class="DR_Select_Trigger">
                                    <span class="DR_Select_Text">Public</span>${icons.chevron}
                                </div>
                                <div class="DR_Select_Options">
                                    <div class="DR_Select_Option selected" data-value="public">Public</div>
                                    <div class="DR_Select_Option" data-value="private">Private</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="DR_Page" id="DR_Page_Board">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Board_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div class="DR_HStack_4 DR_NoSel" style="align-self: stretch; gap: 8px;">
                        <img id="DR_Board_Tier_Ico" src="${leagueBadgeUrl()}" alt="" style="width: 34px; height: 34px; flex-shrink: 0; object-fit: contain;">
                        <div class="DR_Row_Text">
                            <p id="DR_Board_Tier_Name" class="DR_T1 DR_NoSel" style="font-size: 14px; font-weight: 600;">Leaderboard</p>
                            <p class="DR_T2 DR_NoSel">Your current league</p>
                        </div>
                    </div>
                    <div class="DR_Btn DR_Btn_Blue_Ghost DR_NoSel DR_Nav_Btn" id="DR_Board_Status_Btn" style="align-self: stretch;">
                        <div class="DR_Nav_Btn_L">
                            <span id="DR_Board_Status_Ico" style="width: 22px; height: 22px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 15px; line-height: 1; overflow: hidden;">
                                <img src="${DUO_LEAGUES_CDN + '6df6337370e45c1b9a5029e78211d114.svg'}" alt="" style="width: 22px; height: 22px; object-fit: contain;">
                            </span>
                            <p class="DR_Nav_Title DR_NoSel">Set your status</p>
                        </div>
                        ${icons.arrowRight}
                    </div>
                    <div class="DR_Divider" style=""></div>
                    <div id="DR_Board_Container" class="DR_Scroll_Inner" style="max-height: 300px; width: 100%;"></div>
                </div>
                <div class="DR_Page" id="DR_Page_Feed">
                    <div class="DR_HStack_4 DR_NoSel DR_Back_Btn" id="DR_Feed_Back_Btn">
                        ${icons.back}
                        <p class="DR_T1">Back</p>
                    </div>
                    <div class="DR_HStack_4 DR_NoSel" style="align-self: stretch; gap: 8px;">
                        <div class="DR_Row_Text">
                            <p class="DR_T1 DR_NoSel" style="font-size: 14px; font-weight: 600;">Activity Feed</p>
                            <p class="DR_T2 DR_NoSel">Recent activity from your friends</p>
                        </div>
                    </div>
                    <div id="DR_Feed_Container" class="DR_Scroll_Inner" style="max-height: 320px; width: 100%;"></div>
                </div>
            </div>
        </div>
    `;

    if (typeof GM_addStyle === 'function') {
        GM_addStyle(`${mainCss}${loadCss}`);
    } else {
        document.head.insertAdjacentHTML('beforeend', `<style id="dr-style-inject">${mainCss}${loadCss}</style>`);
    }
    document.body.insertAdjacentHTML('beforeend', `<div id="DR_Root">${uiHtml}</div>`);

    let token = null;
    let userId = null;
    let headers = null;
    let user = null;
    let farmStates = { xp: false, gem: false, streak: false, league: false, follow: false, unfollow: false, blockmass: false, unblock: false };
    let uiHidden = false;
    let hideCollapseTimer = null;
    let panelCorner = localStorage.getItem('dr_panel_corner') || 'br';
    let oldToken = null;
    let delayMs = (() => {
        const storedDelay = parseInt(localStorage.getItem('dr_delay') || '100', 10);
        return isNaN(storedDelay) ? 100 : Math.min(60000, Math.max(50, storedDelay));
    })();
    let shopCache = [];
    let questState = null;
    let questStateTs = 0;
    let currentStatus = null;
    let streakKeepBusy = false;
    let autoBlockCohortKey = null;
    let pageId = 1;
    let bgCheckBusy = false;
    let connectBusy = false;
    let refreshStatsBusy = false;
    let questSaverBusy = false;
    let leagueCheckBusy = false;
    let xpHistoryBusy = false;
    let feedBusy = false;
    const DR_PAGE_TRANSITION_MS = 400;
    const DR_PAGE_FADE_DELAY_MS = 120;
    const DR_DRAG_SNAP_MS = 400;

    function wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    function safeJsonParse(text, fallback = null) {
        try {
            return text ? JSON.parse(text) : fallback;
        } catch {
            return fallback;
        }
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    function statusFallback(status) {
        if (status && status.emoji) {
            return status.emoji;
        }
        const name = status && status.name ? status.name : '?';
        return name.charAt(0).toUpperCase();
    }

    function getToken() {
        const match = document.cookie.match(/(^| )jwt_token=([^;]+)/);
        if (match) {
            try {
                return decodeURIComponent(match[2]);
            } catch {
                return match[2];
            }
        }

        const storageKeys = ['jwt_token', 'jwtToken', 'duolingo_jwt'];
        for (const key of storageKeys) {
            const value = localStorage.getItem(key);
            if (value) return value;
        }
        return null;
    }

    function readToken(jwtStr) {
        try {
            if (!jwtStr || jwtStr.split('.').length < 2) {
                return null;
            }
            const base64Url = jwtStr.split('.')[1];
            const base64String = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const paddingLength = base64String.length + (4 - base64String.length % 4) % 4;
            const paddedBase64 = base64String.padEnd(paddingLength, '=');

            const decodedString = decodeURIComponent(
                atob(paddedBase64).split('').map((char) => {
                    return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
                }).join('')
            );
            return JSON.parse(decodedString);
        } catch {
            return null;
        }
    }

    function setHeaders(tokenStr) {
        return {
            'accept': 'application/json',
            'authorization': 'Bearer ' + tokenStr,
            'content-type': 'application/json',
            'cookie': 'jwt_token=' + tokenStr,
            'origin': 'https://www.duolingo.com',
            'User-Agent': drUserAgent,
            'x-amzn-trace-id': 'User=' + userId
        };
    }

    function setGoalHeaders(tokenStr) {
        return {
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            'accept': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + tokenStr,
            'User-Agent': drUserAgent,
            'x-amzn-trace-id': 'User=' + userId
        };
    }

    const forbiddenHeaders = { 'cookie': 1, 'origin': 1, 'user-agent': 1, 'host': 1, 'referer': 1, 'content-length': 1 };

    function fetchApi(method, url, data, customHeaders, signal) {
        const rawHeaders = customHeaders || headers || {};
        const body = (data === undefined || data === null) ? null : JSON.stringify(data);

        if (signal && signal.aborted) return Promise.resolve({ status: 0, responseText: '' });

        const gmRequest = () => new Promise((resolve, reject) => {
            let onAbort = null;
            const cleanup = () => {
                if (signal && onAbort) signal.removeEventListener('abort', onAbort);
            };
            const settle = (fn, value) => {
                cleanup();
                fn(value);
            };
            const handle = GM_xmlhttpRequest({
                method: method,
                url: url,
                headers: rawHeaders,
                data: body,
                onload: (response) => {
                    settle(resolve, response);
                },
                onerror: () => {
                    settle(reject, new Error('Network'));
                },
                timeout: 15000,
                ontimeout: () => {
                    settle(reject, new Error('Timeout'));
                }
            });
            if (signal) {
                onAbort = () => {
                    try { if (handle && handle.abort) handle.abort(); } catch {}
                    settle(resolve, { status: 0, responseText: '' });
                };
                signal.addEventListener('abort', onAbort, { once: true });
            }
        });

        const safeHeaders = {};
        for (const key in rawHeaders) {
            if (!forbiddenHeaders[key.toLowerCase()]) {
                safeHeaders[key] = rawHeaders[key];
            }
        }

        return fetch(url, {
            method: method,
            headers: safeHeaders,
            body: (method === 'GET' || method === 'HEAD') ? undefined : body,
            credentials: 'include',
            mode: 'cors',
            signal: signal || undefined
        }).then((res) => res.text().then((text) => ({ status: res.status, responseText: text })))
          .catch(() => {
              if (signal && signal.aborted) return { status: 0, responseText: '' };
              return gmRequest();
          });
    }

    const farmCtl = { xp: null, gem: null, streak: null, league: null };

    function farmSignal(type) {
        return farmCtl[type] ? farmCtl[type].signal : null;
    }

    function stopFarm(type) {
        farmStates[type] = false;
        if (farmCtl[type]) {
            farmCtl[type].abort();
            farmCtl[type] = null;
        }
    }

    function waitStop(ms, signal) {
        return new Promise((resolve) => {
            if (signal && signal.aborted) return resolve();
            let onAbort;
            const timer = setTimeout(() => {
                if (signal && onAbort) signal.removeEventListener('abort', onAbort);
                resolve();
            }, ms);
            if (signal) {
                onAbort = () => { clearTimeout(timer); resolve(); };
                signal.addEventListener('abort', onAbort, { once: true });
            }
        });
    }

    function notify(type, title, body, onClick) {
        const container = document.getElementById('DR_Notif_Main');
        if (!container) {
            return;
        }

        const safeType = ['info', 'success', 'error', 'warning'].includes(type) ? type : 'info';
        const element = document.createElement('div');
        element.className = 'DR_Notif_Box ' + safeType;

        let iconMarkup = icons.info;
        if (safeType === 'success') {
            iconMarkup = icons.success;
        }
        if (safeType === 'error') {
            iconMarkup = icons.error;
        }
        if (safeType === 'warning') {
            iconMarkup = icons.warning;
        }

        element.innerHTML = `
            <div class="DR_Notif_Ico">${iconMarkup}</div>
            <div style="flex: 1 0 0;">
                <div class="DR_T1 DR_NoSel"></div>
                <div class="DR_T2 DR_NoSel" style="margin-top: 2px;"></div>
            </div>
        `;
        const titleEl = element.querySelector('.DR_T1');
        const bodyEl = element.querySelector('.DR_T2');
        if (titleEl) titleEl.textContent = title || '';
        if (bodyEl) bodyEl.textContent = body || '';

        container.prepend(element);

        const h = element.offsetHeight;
        const atTop = notifPos.indexOf('top') === 0;
        element.style.transform = `translateY(${atTop ? -(h + 20) : (h + 20)}px) scale(0.9)`;

        let removeTimer;
        const dismiss = () => {
            clearTimeout(removeTimer);
            element.classList.remove('show');
            element.classList.add('hide');
            element.style[atTop ? 'marginTop' : 'marginBottom'] = -(h + 10) + 'px';
            setTimeout(() => {
                element.remove();
            }, 400);
        };

        if (typeof onClick === 'function') {
            element.style.cursor = 'pointer';
            element.addEventListener('click', () => {
                dismiss();
                onClick();
            });
        }

        requestAnimationFrame(() => {
            element.classList.add('show');
        });

        removeTimer = setTimeout(dismiss, onClick ? 8000 : 4000);
    }

    function versionSegments(v) {
        return String(v || '').trim().split('.').map((s) => s.trim());
    }

    function compareVersions(a, b) {
        const pa = versionSegments(a);
        const pb = versionSegments(b);
        const len = Math.max(pa.length, pb.length);
        for (let i = 0; i < len; i++) {
            const sa = pa[i] !== undefined ? pa[i] : '0';
            const sb = pb[i] !== undefined ? pb[i] : '0';
            const isNumA = /^\d+$/.test(sa);
            const isNumB = /^\d+$/.test(sb);
            if (isNumA && isNumB) {
                const na = parseInt(sa, 10);
                const nb = parseInt(sb, 10);
                if (na !== nb) return na - nb;
            } else {
                const la = sa.toLowerCase();
                const lb = sb.toLowerCase();
                if (la !== lb) return la < lb ? -1 : 1;
            }
        }
        return 0;
    }

    function showUpdateBanner(version) {
        const banner = document.getElementById('DR_Update_Banner');
        const verText = document.getElementById('DR_Update_Version_Text');
        if (!banner || !verText) return;
        verText.innerText = `Version ${version} is now available`;
        banner.dataset.version = version;
        banner.classList.add('on');
        queueRelayout();
    }

    function hideUpdateBanner() {
        const banner = document.getElementById('DR_Update_Banner');
        if (!banner) return;
        banner.classList.remove('on');
        queueRelayout();
    }

    function checkUpdateBannerFromCache() {
        const availableKey = 'dr_update_available_version';
        const dismissedKey = 'dr_update_dismissed_version';
        const avail = localStorage.getItem(availableKey);
        if (avail && compareVersions(avail, drScriptVersion) > 0 && localStorage.getItem(dismissedKey) !== avail) {
            showUpdateBanner(avail);
        }
    }

    async function checkForUpdates() {
        const availableKey = 'dr_update_available_version';
        const dismissedKey = 'dr_update_dismissed_version';
        const now = Date.now();

        try {
            const res = await fetchApi('GET', drUpdateMetaUrl + '?_=' + now, null, {});
            if (res.status !== 200) return;

            const match = res.responseText.match(/@version\s+(\S+)/);
            if (!match) return;

            const remoteVersion = match[1].trim();
            if (compareVersions(remoteVersion, drScriptVersion) > 0) {
                localStorage.setItem(availableKey, remoteVersion);
                if (localStorage.getItem(dismissedKey) !== remoteVersion) {
                    showUpdateBanner(remoteVersion);
                }
            } else {
                localStorage.removeItem(availableKey);
                hideUpdateBanner();
            }
        } catch {}
    }

    let notifPos = 'bottom_center';

    function normalizeNotifPos(pos) {
        const valid = ['top_left', 'top_center', 'top_right', 'bottom_left', 'bottom_center', 'bottom_right'];
        if (valid.indexOf(pos) !== -1) return pos;
        return 'bottom_center';
    }

    function applyNotifPos(pos) {
        notifPos = normalizeNotifPos(pos);
        layoutNotif();
    }

    function layoutNotif() {
        const nMain = document.getElementById('DR_Notif_Main');
        if (!nMain) return;

        nMain.style.width = Math.min(320, window.innerWidth - 32) + 'px';

        const atTop = notifPos.indexOf('top') === 0;
        const centered = notifPos.indexOf('center') !== -1;
        const leftAnchored = notifPos.indexOf('left') !== -1;

        if (atTop) {
            nMain.style.top = '20px'; nMain.style.bottom = 'auto';
            nMain.style.flexDirection = 'column';
        } else {
            nMain.style.top = 'auto'; nMain.style.bottom = '20px';
            nMain.style.flexDirection = 'column-reverse';
        }

        if (centered) {
            nMain.style.left = '50%'; nMain.style.right = 'auto';
            nMain.style.transform = 'translateX(-50%)';
            nMain.style.alignItems = 'center';
        } else if (leftAnchored) {
            nMain.style.left = '16px'; nMain.style.right = 'auto';
            nMain.style.transform = 'none';
            nMain.style.alignItems = 'flex-start';
        } else {
            nMain.style.left = 'auto'; nMain.style.right = '16px';
            nMain.style.transform = 'none';
            nMain.style.alignItems = 'flex-end';
        }

        nMain.setAttribute('data-pos', notifPos);
    }

    function styleBtn(id, bg, outline, color, label) {
        const btn = document.getElementById(id);
        if (!btn) {
            return;
        }

        const labelEl = btn.querySelector('.DR_Btn_Label') || btn.querySelector('.DR_Sm_Btn_Label');
        if (!labelEl) {
            return;
        }

        btn.style.background = bg;
        btn.style.outline = `2px solid ${outline}`;
        btn.style.outlineOffset = '-2px';
        btn.style.setProperty('--focus-outline', outline);
        labelEl.style.color = color;
        labelEl.textContent = label;
    }

    function resetBtn(id, originalLabel) {
        styleBtn(id, 'rgb(var(--DR-blue))', 'rgba(0,0,0,0.2)', '#fff', originalLabel);
    }

    function stopBtn(id) {
        styleBtn(id, 'rgba(var(--DR-red),0.10)', 'rgba(var(--DR-red),0.22)', 'rgb(var(--DR-red))', 'STOP');
    }

    function setProgress(identifier, percentage) {
        const wrapper = document.getElementById(identifier + '_Prog');
        const fill = document.getElementById(identifier + '_Fill');
        const pct = Number.isFinite(Number(percentage)) ? Math.max(0, Math.min(100, Number(percentage))) : 0;

        if (wrapper) {
            wrapper.classList.add('on');
        }

        if (fill) {
            fill.style.width = pct + '%';
        }
    }

    function clearProgress(identifier, isSuccess = false) {
        const wrapper = document.getElementById(identifier + '_Prog');
        const fill = document.getElementById(identifier + '_Fill');

        if (isSuccess && fill) {
            fill.classList.add('done');
        }

        if (wrapper) {
            setTimeout(() => {
                wrapper.classList.remove('on');
                setTimeout(() => {
                    if (fill) {
                        fill.style.width = '0%';
                        fill.classList.remove('done');
                    }
                }, 400);
            }, isSuccess ? 1500 : 800);
        } else if (fill) {
            fill.style.width = '0%';
            fill.classList.remove('done');
        }
    }

    function updateUi(status) {
        const btn = document.getElementById('DR_Conn_Btn');
        const text = document.getElementById('DR_Conn_Txt');
        const icon = document.getElementById('DR_Conn_Ico');
        const content = document.getElementById('DR_Main_Content');

        if (!btn || !text || !icon || !content) {
            return;
        }

        const loaderHtml = `
            <div style="width: 20px; height: 20px; position: relative; display: flex; align-items: center; justify-content: center;">
                <div class="lds-roller" style="transform: scale(0.25); transform-origin: top left; position: absolute; top: 0; left: 0; transition: opacity var(--DR-motion) ease, transform var(--DR-motion) var(--DR-ease);">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
                <svg class="dr-tick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; width: 20px; height: 20px; stroke-dasharray: 50; stroke-dashoffset: 50; opacity: 0; transition: stroke-dashoffset var(--DR-motion-page) var(--DR-ease), opacity var(--DR-motion) ease, background-color var(--DR-motion) ease; border-radius: 50%; padding: 3px; box-sizing: border-box;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        `;

        if (status === 'connecting') {
            text.innerText = 'Connecting';
            btn.style.background = 'var(--dr-card-bg)';
            btn.style.outline = '2px solid var(--dr-card-border)';
            btn.style.color = 'var(--dr-text)';
            icon.innerHTML = loaderHtml;
            content.classList.add('dr-disabled');
        } else if (status === 'connected') {
            text.innerText = 'Connected';
            btn.style.background = 'rgba(88, 204, 2, 1)';
            btn.style.outline = '2px solid rgba(88, 204, 2, 1)';
            btn.style.color = '#fff';
            content.classList.remove('dr-disabled');

            if (!icon.querySelector('.lds-roller')) {
                icon.innerHTML = loaderHtml;
            }

            setTimeout(() => {
                const tick = icon.querySelector('.dr-tick-icon');
                const roller = icon.querySelector('.lds-roller');
                if (tick && roller) {
                    roller.style.opacity = '0';
                    roller.style.transform = 'scale(0.1) rotate(90deg)';
                    tick.style.opacity = '1';
                    tick.style.strokeDashoffset = '0';
                    tick.style.stroke = '#fff';
                }
            }, 50);

            setTimeout(() => {
                if (text.innerText === 'Connected') {
                    btn.style.background = 'rgba(88, 204, 2, 0.15)';
                    btn.style.outline = '2px solid rgba(88, 204, 2, 0.5)';
                    btn.style.color = 'var(--dr-text)';

                    const tick = icon.querySelector('.dr-tick-icon');
                    if (tick) {
                        tick.style.backgroundColor = 'transparent';
                        tick.style.stroke = 'rgb(88, 204, 2)';
                    }
                }
            }, 3000);
        } else if (status === 'logged_out') {
            text.innerText = 'Logged Out';
            btn.style.background = 'rgba(238, 85, 85, 1)';
            btn.style.outline = '2px solid rgba(238, 85, 85, 1)';
            btn.style.color = '#fff';
            icon.innerHTML = `
                <svg class="dr-cross-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; padding: 3px; box-sizing: border-box; transition: stroke var(--DR-motion) ease;">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            content.classList.add('dr-disabled');

            setTimeout(() => {
                if (text.innerText === 'Logged Out') {
                    btn.style.background = 'rgba(238, 85, 85, 0.15)';
                    btn.style.outline = '2px solid rgba(238, 85, 85, 0.5)';
                    btn.style.color = 'var(--dr-text)';

                    const cross = icon.querySelector('.dr-cross-icon');
                    if (cross) {
                        cross.style.stroke = 'rgb(238, 85, 85)';
                    }
                }
            }, 3000);

            ['DR_XP_Btn', 'DR_Gem_Btn', 'DR_Streak_Btn', 'DR_League_Btn', 'DR_Quest_Force_Btn', 'DR_Block_Btn', 'DR_FollowSingle_Btn', 'DR_Follow_Btn', 'DR_Block_Mass_Btn', 'DR_Gift_Btn', 'DR_Hearts_Btn', 'DR_Friend_Btn'].forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.disabled = true;
                }
            });
        }
    }

    async function bgCheck() {
        if (bgCheckBusy) return;
        bgCheckBusy = true;
        try {
            const currentExtractedJwt = getToken();
            if (currentExtractedJwt && currentExtractedJwt !== oldToken) {
                oldToken = currentExtractedJwt;
                await connect(true);
            } else if (!currentExtractedJwt && oldToken) {
                oldToken = null;
                token = null;
                userId = null;
                headers = null;
                user = null;
                questState = null;
                currentStatus = null;
                stopLeaguePolling();
                updateUi('logged_out');
            }
        } finally {
            bgCheckBusy = false;
        }
    }

    async function connect(isBgProcess = false) {
        if (connectBusy) {
            return;
        }
        connectBusy = true;
        token = getToken();

        if (!token) {
            userId = null;
            headers = null;
            user = null;
            questState = null;
            currentStatus = null;
            stopLeaguePolling();
            updateUi('logged_out');
            connectBusy = false;
            return;
        }

        const decoded = readToken(token);
        if (!decoded) {
            token = null;
            userId = null;
            headers = null;
            user = null;
            questState = null;
            currentStatus = null;
            stopLeaguePolling();
            updateUi('logged_out');
            connectBusy = false;
            return;
        }

        userId = decoded.sub;
        headers = setHeaders(token);
        oldToken = token;
        leagueJoinAttempted = false;
        autoBlockCohortKey = null;

        try {
            if (!isBgProcess) {
                updateUi('connecting');
            }

            const res = await fetchApi('GET', `${config.api.users}/${userId}?fields=id,username,email,emailVerified,fromLanguage,learningLanguage,streak,totalXp,gems,picture,streakData,timezone`);

            if (res.status !== 200) {
                throw new Error('Connection failed');
            }

            user = safeJsonParse(res.responseText);
            if (!user) {
                throw new Error('Invalid user response');
            }
            updateUi('connected');
            showUser();
            startLeaguePolling();

            ['DR_XP_Btn', 'DR_Gem_Btn', 'DR_Streak_Btn', 'DR_League_Btn', 'DR_Quest_Force_Btn', 'DR_Block_Btn', 'DR_FollowSingle_Btn', 'DR_Follow_Btn', 'DR_Block_Mass_Btn', 'DR_Gift_Btn', 'DR_Hearts_Btn', 'DR_Friend_Btn'].forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.disabled = false;
                }
            });

            setTimeout(async () => {
                await Promise.allSettled([getShop(), getQuests(), getPrivacy()]);
                autoKeepStreak();
                autoQuestSaver();
            }, 500);

        } catch {
            if (!isBgProcess) {
                setTimeout(() => {
                    connect(false);
                }, 5000);
            }
        } finally {
            connectBusy = false;
        }
    }

    const statKeys = {
        xp: 'dr_stat_xp_' + drVersion,
        gems: 'dr_stat_gems_' + drVersion,
        streak: 'dr_stat_streak_' + drVersion
    };
    const statSinceKey = 'dr_stat_since_' + drVersion;

    function readStat(kind) {
        return parseInt(localStorage.getItem(statKeys[kind])) || 0;
    }

    function showStats() {
        const map = { xp: 'DR_Stat_XP', gems: 'DR_Stat_Gems', streak: 'DR_Stat_Streak' };
        for (const kind in map) {
            const el = document.getElementById(map[kind]);
            if (el) {
                el.textContent = readStat(kind).toLocaleString();
            }
        }
        const sinceEl = document.getElementById('DR_Stat_Since');
        if (sinceEl) {
            let ts = parseInt(localStorage.getItem(statSinceKey));
            if (!ts) {
                ts = Date.now();
                localStorage.setItem(statSinceKey, String(ts));
            }
            sinceEl.textContent = new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }

    async function loadXpHistory() {
        const cont = document.getElementById('DR_XPHistory');
        if (!cont || !token || !userId || xpHistoryBusy) return;
        xpHistoryBusy = true;
        if (cont.dataset.loaded !== '1') {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">Loading...</p>`;
        }
        try {
            const d = new Date(Date.now() - 7 * 86400000);
            const pad = (n) => String(n).padStart(2, '0');
            const startDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
            const res = await fetchApi('GET', `https://www.duolingo.com/2017-06-30/users/${userId}/xp_summaries?startDate=${startDate}&_=${Date.now()}`);
            if (res.status !== 200) throw new Error('bad status');
            let summaries = (safeJsonParse(res.responseText, {}).summaries || []).slice();
            summaries.sort((a, b) => (b.date || 0) - (a.date || 0));
            summaries = summaries.slice(0, 7).reverse();
            if (!summaries.length) {
                cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">No recent activity.</p>`;
                cont.dataset.loaded = '1';
                return;
            }
            cont.innerHTML = summaries.map((s) => {
                const label = new Date((s.date || 0) * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                return `<div class="DR_HStack_Auto" style="align-self: stretch;"><p class="DR_T2 DR_NoSel">${label}</p><p class="DR_T1 DR_NoSel">+${(s.gainedXp || 0).toLocaleString()} XP</p></div>`;
            }).join('');
            cont.dataset.loaded = '1';
        } catch {
            if (cont.dataset.loaded !== '1') {
                cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">Failed to load XP history.</p>`;
            }
        } finally {
            xpHistoryBusy = false;
        }
    }

    function compactRelativeTime(diffSec) {
        diffSec = Math.max(0, Math.floor(diffSec));
        if (diffSec < 60) return 'just now';
        const mins = Math.floor(diffSec / 60);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        const weeks = Math.floor(days / 7);
        if (weeks < 5) return `${weeks}w ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        return `${Math.floor(months / 12)}y ago`;
    }

    function normalizeRelativeText(value) {
        const raw = String(value == null ? '' : value).trim();
        if (!raw) return '';
        if (/^just now$/i.test(raw)) return 'just now';

        const match = raw.match(/^(\d+)\s*(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mos?|years?|yrs?|y)(?:\s+ago)?$/i);
        if (!match) return '';

        const amount = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (unit.startsWith('sec') || unit === 's') return amount < 60 ? 'just now' : `${Math.floor(amount / 60)}m ago`;
        if (unit.startsWith('min') || unit === 'm') return `${amount}m ago`;
        if (unit.startsWith('h')) return `${amount}h ago`;
        if (unit.startsWith('d')) return `${amount}d ago`;
        if (unit.startsWith('w')) return `${amount}w ago`;
        if (unit.startsWith('mo')) return `${amount}mo ago`;
        if (unit.startsWith('y')) return `${amount}y ago`;
        return '';
    }

    function feedTimestampMs(card) {
        const fields = [
            card?.subtitle,
            card?.timestamp,
            card?.createdAt,
            card?.creationDate,
            card?.eventTime,
            card?.time,
            card?.date
        ];

        for (const value of fields) {
            if (value === undefined || value === null || value === '') continue;

            if (typeof value === 'number' || /^\d+$/.test(String(value).trim())) {
                const num = Number(value);
                if (Number.isFinite(num) && num > 0) {
                    return num < 100000000000 ? num * 1000 : num;
                }
            }

            const raw = String(value).trim();
            const isoLike = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(?:\s*(Z|[+-]\d{2}:?\d{2}))?$/);
            if (isoLike) {
                const hasZone = !!isoLike[8];
                const normalized = raw.replace(' ', 'T').replace(/([+-]\d{2})(\d{2})$/, '$1:$2');
                const parsed = hasZone
                    ? Date.parse(normalized)
                    : Date.UTC(+isoLike[1], +isoLike[2] - 1, +isoLike[3], +isoLike[4], +isoLike[5], +isoLike[6], isoLike[7] ? Number((isoLike[7] + '000').slice(0, 3)) : 0);
                if (!Number.isNaN(parsed)) return parsed;
            }

            const parsed = Date.parse(raw);
            if (!Number.isNaN(parsed)) return parsed;
        }

        return null;
    }

    function feedTimeAgo(card) {
        const subtitleRelative = normalizeRelativeText(card?.subtitle);
        if (subtitleRelative) return subtitleRelative;

        const ts = feedTimestampMs(card);
        if (!ts) return '';
        return compactRelativeTime((Date.now() - ts) / 1000);
    }

    async function getFeed() {
        const cont = document.getElementById('DR_Feed_Container');
        if (!cont || !token || !userId || feedBusy) return;
        feedBusy = true;
        const loaded = cont.dataset.loaded === '1';
        if (!loaded) cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; padding: 8px 0;">Loading...</p>`;
        try {
            const res = await fetchApi('GET', `https://www.duolingo.com/2017-06-30/friends/users/${userId}/feed/v2?uiLanguage=${uiLang()}`);
            if (res.status !== 200) throw new Error('bad status');
            const cards = [];
            (safeJsonParse(res.responseText, {}).feed || []).forEach((section) => {
                (section.feedCards || []).forEach((c) => cards.push(c));
            });
            if (!cards.length) {
                cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; padding: 8px 0;">No recent activity.</p>`;
                cont.dataset.loaded = '1';
                return;
            }
            const frag = document.createDocumentFragment();
            cards.slice(0, 40).forEach((c) => {
                const name = escapeHtml(c.displayName || 'Someone');
                const cardType = c.cardType || '';
                let message;
                if (cardType === 'FOLLOW') {
                    message = `You followed ${c.displayName || 'someone'}`;
                } else if (cardType === 'FOLLOW_BACK') {
                    message = `${c.displayName || 'Someone'} followed you`;
                } else {
                    message = c.body || '';
                }
                const text = escapeHtml(message);
                const timeAgo = escapeHtml(feedTimeAgo(c));
                const raw = c.avatarUrl || c.picture || '';
                const av = raw ? ((raw.indexOf('http') === 0 ? raw : 'https:' + raw) + '/xlarge') : '';
                const row = document.createElement('div');
                row.className = 'DR_HStack_4';
                row.style.cssText = 'align-self: stretch; padding: 8px 10px; border-radius: var(--DR-r-s); corner-shape: var(--DR-corner); gap: 8px; background: var(--dr-card-bg);';
                row.innerHTML = `
                    <img src="${escapeHtml(av)}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: var(--dr-card-border);" onerror="this.style.visibility='hidden'">
                    <div style="flex: 1; min-width: 0;">
                        <p class="DR_T1 DR_NoSel" style="font-size: 13px;">${name}</p>
                        ${text ? `<p class="DR_T2 DR_NoSel" style="font-size: 11px;">${text}</p>` : ''}
                    </div>
                    ${timeAgo ? `<p class="DR_T2 DR_NoSel" style="font-size: 10px; flex-shrink: 0; opacity: 0.5;">${timeAgo}</p>` : ''}
                `;
                frag.appendChild(row);
            });
            cont.replaceChildren(frag);
            cont.dataset.loaded = '1';
        } catch {
            if (!loaded) cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">Failed to load feed.</p>`;
        } finally {
            feedBusy = false;
        }
    }

    function addStat(kind, amount) {
        if (!statKeys[kind] || !amount || amount <= 0) {
            return;
        }
        localStorage.setItem(statKeys[kind], String(readStat(kind) + amount));
        showStats();
    }

    function showUser() {
        if (!user) {
            return;
        }

        const usernameEl = document.getElementById('DR_UName');
        if (usernameEl) {
            usernameEl.textContent = user.username || '';
        }

        const xpEl = document.getElementById('DR_UXP');
        if (xpEl) {
            xpEl.textContent = (user.totalXp || 0).toLocaleString();
        }

        const gemsEl = document.getElementById('DR_UGems');
        if (gemsEl) {
            gemsEl.textContent = (user.gems || 0).toLocaleString();
        }

        const streakEl = document.getElementById('DR_UStreak');
        if (streakEl) {
            streakEl.textContent = (user.streak || 0).toLocaleString();
        }

        const userRowEl = document.getElementById('DR_User_Row');
        if (userRowEl) {
            userRowEl.style.display = 'flex';
        }

        if (user.picture) {
            let picUrl = user.picture.replace(/\/(medium|large|small)$/, '/xlarge');

            if (!picUrl.endsWith('/xlarge') && picUrl.includes('duolingo.com/ssr-avatars')) {
                picUrl += '/xlarge';
            }

            const avatarEl = document.getElementById('DR_Avatar');
            if (avatarEl && !avatarEl.getAttribute('data-pic-loaded')) {
                avatarEl.setAttribute('data-pic-loaded', 'true');
                const img = document.createElement('img');
                img.src = picUrl;
                img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 50%;';
                img.addEventListener('error', () => {
                    avatarEl.innerHTML = icons.avatar;
                });
                avatarEl.replaceChildren(img);
            }
        }
    }

    async function refreshStats() {
        if (!token || !userId || !user || refreshStatsBusy) {
            return;
        }

        refreshStatsBusy = true;
        try {
            const res = await fetchApi('GET', `${config.api.users}/${userId}?fields=streak,totalXp,gems,streakData`);
            if (res.status === 200) {
                const data = safeJsonParse(res.responseText, {});
                if (data.totalXp !== undefined) {
                    user.totalXp = data.totalXp;
                }
                if (data.gems !== undefined) {
                    user.gems = data.gems;
                }
                if (data.streak !== undefined) {
                    user.streak = data.streak;
                }
                if (data.streakData !== undefined) {
                    user.streakData = data.streakData;
                }
                showUser();
            }
        } catch {
        } finally {
            refreshStatsBusy = false;
        }
    }

    function accountTimezone() {
        return (user && user.timezone) ? user.timezone : 'America/New_York';
    }

    function uiLang() {
        return (user && user.fromLanguage) ? user.fromLanguage : 'en';
    }

    function tzParts(timeZone, date) {
        const dtf = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            hourCycle: 'h23',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const out = {};
        dtf.formatToParts(date).forEach((part) => {
            if (part.type !== 'literal') out[part.type] = part.value;
        });
        return out;
    }

    function wallClockToSeconds(timeZone, year, month, day, hour, minute, second) {
        const guess = Date.UTC(year, month - 1, day, hour, minute, second);
        const parts = tzParts(timeZone, new Date(guess));
        const localAsUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
        const offset = localAsUtc - guess;
        return Math.floor((guess - offset) / 1000);
    }

    function accountToday(timeZone) {
        const parts = tzParts(timeZone, new Date());
        return { year: +parts.year, month: +parts.month, day: +parts.day };
    }

    function accountNowIso() {
        const now = new Date();
        const parts = tzParts(accountTimezone(), now);
        const ms = String(now.getMilliseconds()).padStart(3, '0');
        return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}.${ms}Z`;
    }

    async function playStory(bonus, signal) {
        try {
            const currentSeconds = Math.floor(Date.now() / 1000);
            const genDuration = Math.floor(Math.random() * 121 + 300);

            const payload = {
                awardXp: true,
                completedBonusChallenge: true,
                fromLanguage: 'fr',
                learningLanguage: 'en',
                hasXpBoost: false,
                illustrationFormat: 'svg',
                isFeaturedStoryInPracticeHub: true,
                isLegendaryMode: true,
                isV2Redo: false,
                isV2Story: false,
                masterVersion: true,
                maxScore: 0,
                score: 0,
                happyHourBonusXp: bonus,
                startTime: currentSeconds,
                endTime: currentSeconds + genDuration
            };

            const res = await fetchApi('POST', `${config.api.stories}/fr-en-le-passeport/complete`, payload, null, signal);
            return res.status === 200;
        } catch {
            return false;
        }
    }

    async function farmXp(targetAmount) {
        const isInfinite = targetAmount === Infinity;
        if (!isInfinite) {
            const room = parseInt(localStorage.getItem('dr_xp_room')) || 0;
            if (room > 0) {
                targetAmount += Math.min(500, Math.max(30, room));
            }
        }
        const maxPerReq = 499;
        const minPerReq = 30;

        let loops = isInfinite ? Infinity : Math.floor(targetAmount / maxPerReq);
        let remAmount = isInfinite ? 0 : targetAmount % maxPerReq;

        if (!isInfinite && remAmount > 0 && remAmount < minPerReq && loops > 0) {
            loops--;
            remAmount += maxPerReq;
        }

        const expectedIters = isInfinite ? Infinity : loops + (remAmount >= minPerReq ? 1 : 0);
        let doneIters = 0;
        let totalXp = 0;
        const sig = farmSignal('xp');

        stopBtn('DR_XP_Btn');

        for (let i = 0; i < loops; i++) {
            if (!farmStates.xp) {
                break;
            }

            const success = await playStory(469, sig);
            if (!farmStates.xp) break;
            if (success) {
                totalXp += maxPerReq;
                doneIters++;
                user.totalXp += maxPerReq;
                showUser();
            }

            if (!isInfinite) {
                setProgress('DR_XP', (doneIters / expectedIters) * 100);
            }

            await waitStop(delayMs, sig);
        }

        if (!isInfinite && remAmount >= minPerReq && farmStates.xp) {
            const success = await playStory(Math.min(remAmount - minPerReq, 469), sig);
            if (success) {
                totalXp += remAmount;
                doneIters++;
                user.totalXp += remAmount;
                showUser();
            }
            setProgress('DR_XP', 100);
        }

        const completed = farmStates.xp;
        if (totalXp > 0) {
            addStat('xp', totalXp);
            notify('success', completed ? 'XP Farm Complete' : 'XP Farm Stopped', `Farmed ${totalXp} XP.`);
            refreshStats();
        }

        clearProgress('DR_XP', completed);

        farmStates.xp = false;
        farmCtl.xp = null;
        resetBtn('DR_XP_Btn', 'RUN');
    }

    async function checkGems(signal) {
        try {
            const res = await fetchApi('GET', `${config.api.users}/${userId}?fields=rewardBundles`, null, null, signal);

            if (res.status !== 200) {
                return [];
            }

            const data = safeJsonParse(res.responseText, {});
            const collected = [];

            for (const bundle of (data.rewardBundles || [])) {
                for (const reward of (bundle.rewards || [])) {
                    if (!reward.consumed && ((reward.id || '').includes('GEMS') || reward.currency === 'GEMS')) {
                        collected.push({ id: reward.id });
                    }
                }
            }

            return collected;
        } catch {
            return [];
        }
    }

    async function claimGem(rewardId, signal) {
        try {
            const res = await fetchApi('PATCH', `${config.api.users}/${userId}/rewards/${rewardId}`, {
                consumed: true,
                fromLanguage: user.fromLanguage,
                learningLanguage: user.learningLanguage
            }, null, signal);
            return res.status === 200;
        } catch {
            return false;
        }
    }

    async function getGems(signal) {
        try {
            const res = await fetchApi('GET', `${config.api.users}/${userId}?fields=gemsConfig`, null, null, signal);

            if (res.status !== 200) {
                return null;
            }

            const data = safeJsonParse(res.responseText, {});
            if (data.gemsConfig && data.gemsConfig.gems !== undefined) {
                return data.gemsConfig.gems;
            }
            return null;
        } catch {
            return null;
        }
    }

    async function farmGems(targetLoops) {
        const isInfinite = targetLoops === Infinity;
        stopBtn('DR_Gem_Btn');

        let totalGained = 0;
        let doneLoops = 0;
        const sig = farmSignal('gem');

        while (farmStates.gem && (isInfinite || doneLoops < targetLoops)) {
            const available = await checkGems(sig);
            if (!farmStates.gem) break;

            if (available.length === 0) {
                await waitStop(delayMs * 2, sig);
                continue;
            }

            let prevCount = await getGems(sig);
            if (prevCount === null) {
                prevCount = user?.gems ?? 0;
            }

            for (let i = 0; i < available.length; i += 4) {
                if (!farmStates.gem || (!isInfinite && doneLoops >= targetLoops)) {
                    break;
                }

                const batch = available.slice(i, i + 4);
                const promises = batch.map((r) => claimGem(r.id, sig));
                await Promise.all(promises);
                if (!farmStates.gem) break;

                await waitStop(150, sig);

                const currentCount = await getGems(sig);
                if (currentCount !== null) {
                    const diff = Math.max(0, currentCount - prevCount);
                    totalGained += diff;
                    prevCount = currentCount;

                    if (user) {
                        user.gems = currentCount;
                        showUser();
                    }
                }

                doneLoops++;

                if (!isInfinite) {
                    setProgress('DR_Gem', (doneLoops / targetLoops) * 100);
                }

                await waitStop(Math.max(50, delayMs - 50), sig);
            }

            await waitStop(delayMs, sig);
        }

        const completed = farmStates.gem;
        if (totalGained > 0) {
            addStat('gems', totalGained);
            notify('success', completed ? 'Gem Farm Complete' : 'Gem Farm Stopped', `+${totalGained} gems acquired.`);
            refreshStats();
        }

        clearProgress('DR_Gem', completed);

        farmStates.gem = false;
        farmCtl.gem = null;
        resetBtn('DR_Gem_Btn', 'RUN');
    }

    async function completePracticeSession(endSecs, signal) {
        try {
            const sPayload = {
                challengeTypes: config.challengeTypes,
                fromLanguage: user.fromLanguage,
                isFinalLevel: false,
                isV2: true,
                juicy: true,
                learningLanguage: user.learningLanguage,
                smartTipsVersion: 2,
                type: 'GLOBAL_PRACTICE'
            };

            const sRes = await fetchApi('POST', config.api.sessions, sPayload, null, signal);
            if (sRes.status !== 200) return false;

            const sData = safeJsonParse(sRes.responseText, {});
            if (!sData.id) return false;

            const fPayload = {
                ...sData,
                heartsLeft: 5,
                startTime: endSecs - 1,
                endTime: endSecs,
                enableBonusPoints: false,
                failed: false,
                maxInLessonStreak: 9,
                shouldLearnThings: true
            };

            const fRes = await fetchApi('PUT', `${config.api.sessions}/${sData.id}`, fPayload, null, signal);
            return fRes.status === 200;
        } catch {
            return false;
        }
    }

    async function farmStreak(targetDays) {
        const isInfinite = targetDays === Infinity;
        stopBtn('DR_Streak_Btn');

        const tz = accountTimezone();
        let base;
        const dateStr = user.streakData?.currentStreak?.startDate;
        if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            const parts = dateStr.split('-').map(Number);
            base = { year: parts[0], month: parts[1], day: parts[2] };
        } else {
            base = accountToday(tz);
        }

        let doneLoops = 0;
        let savedDays = 0;
        const sig = farmSignal('streak');

        while (farmStates.streak && (isInfinite || doneLoops < targetDays)) {
            const endSecs = wallClockToSeconds(tz, base.year, base.month, base.day - 1 - doneLoops, 12, 0, 0);

            if (farmStates.streak) {
                const ok = await completePracticeSession(endSecs, sig);
                if (ok && user) {
                    savedDays++;
                    user.streak++;
                    showUser();
                }
            }

            doneLoops++;

            if (!isInfinite) {
                setProgress('DR_Streak', (doneLoops / targetDays) * 100);
            }

            await waitStop(delayMs, sig);
        }

        const completed = farmStates.streak;
        if (savedDays > 0) {
            addStat('streak', savedDays);
            notify('success', completed ? 'Streak Restored' : 'Streak Farm Stopped', `Processed ${savedDays} days.`);
            refreshStats();
        } else if (completed && doneLoops > 0) {
            notify('error', 'Streak Farm', 'No days could be saved. Please try again.');
        }

        clearProgress('DR_Streak', completed);

        farmStates.streak = false;
        farmCtl.streak = null;
        resetBtn('DR_Streak_Btn', 'RUN');
    }

    async function keepStreak() {
        if (!user) return false;
        const tz = accountTimezone();
        const t = accountToday(tz);
        const endSecs = wallClockToSeconds(tz, t.year, t.month, t.day, 12, 0, 0);
        return completePracticeSession(endSecs);
    }

    async function autoKeepStreak() {
        if (localStorage.getItem('dr_auto_keep_streak') !== 'true') return;
        if (!user || streakKeepBusy) return;
        const tz = accountTimezone();
        const t = accountToday(tz);
        const pad = (n) => String(n).padStart(2, '0');
        const todayIso = `${t.year}-${pad(t.month)}-${pad(t.day)}`;
        if (localStorage.getItem('dr_streak_kept_date') === todayIso) return;
        if (user.streakData?.currentStreak?.endDate === todayIso) {
            localStorage.setItem('dr_streak_kept_date', todayIso);
            return;
        }
        streakKeepBusy = true;
        try {
            const ok = await keepStreak();
            if (ok) {
                localStorage.setItem('dr_streak_kept_date', todayIso);
                refreshStats();
                notify('success', 'Auto Keep Streak', 'Your streak is safe for today.');
            }
        } finally {
            streakKeepBusy = false;
        }
    }

    async function autoReachRank(knownRank) {
        if (localStorage.getItem('dr_auto_reach_rank') !== 'true') return;
        if (!userId || farmStates.league) return;
        const target = parseInt(localStorage.getItem('dr_league_target')) || 1;
        const rank = (knownRank === undefined) ? await getLeagueRank() : knownRank;
        if (rank && rank > target) {
            notify('info', 'Auto Reach Rank', `Climbing to #${target}...`);
            farmStates.league = true;
            farmCtl.league = new AbortController();
            farmLeague(target);
        }
    }

    async function autoBlockLeague() {
        if (localStorage.getItem('dr_auto_block_league') !== 'true') return;
        if (!userId || farmStates.blockmass || farmStates.unblock) return;
        farmStates.blockmass = true;
        try {
            const result = await blockLeagueUsers({ auto: true });
            if (!result.skipped && result.ok > 0) {
                notify('success', 'Auto Block League', `Blocked ${result.ok} league user(s).`);
            }
        } finally {
            clearProgress('DR_Block_Mass', true);
            farmStates.blockmass = false;
            resetBtn('DR_Block_Mass_Btn', 'RUN');
        }
    }

    async function autoQuestSaver() {
        if (localStorage.getItem('dr_auto_quest_saver') !== 'true') return;
        if (!token || !userId || questSaverBusy) return;
        questSaverBusy = true;
        try {
            if (!questState) return;

            const schemaGoals = Array.isArray(questState.schema?.goals) ? questState.schema.goals : [];
            if (schemaGoals.length === 0) return;

            const t = accountToday(accountTimezone());
            const pad = (n) => String(n).padStart(2, '0');
            const monthlyKey = `${t.year}_${pad(t.month)}_monthly_challenge`;
            const progress = questState.progress || {};
            const keys = Object.keys(progress).filter((k) => k !== monthlyKey);
            if (keys.length === 0 || !keys.some((k) => progress[k] === 0)) return;

            const mSet = new Set();
            schemaGoals.forEach((goal) => {
                if (goal.metric && goal.metric !== 'QUESTS') mSet.add(goal.metric);
            });
            if (mSet.size === 0) return;

            const monthPrefix = `${t.year}_${pad(t.month)}_monthly`;
            let monthlyThreshold = 0;
            schemaGoals.forEach((goal) => {
                if (goal.goalId && goal.goalId.startsWith(monthPrefix)) {
                    monthlyThreshold = Math.max(monthlyThreshold, goal.threshold || 0);
                }
            });
            let monthlyProgress = 0;
            Object.keys(progress).forEach((k) => {
                if (!k.startsWith(monthPrefix)) return;
                const rd = progress[k];
                const v = (typeof rd === 'number') ? rd : (rd && rd.progress ? rd.progress : 0);
                if (v > monthlyProgress) monthlyProgress = v;
            });

            const targetDay = monthlyThreshold > 0 ? Math.min(t.day, monthlyThreshold) : t.day;
            const questQty = Math.max(0, targetDay - monthlyProgress);

            const updates = [...mSet].map((mName) => ({ metric: mName, quantity: 2000 }));
            if (questQty > 0) updates.push({ metric: 'QUESTS', quantity: questQty });

            const bPayload = {
                metric_updates: updates,
                timezone: accountTimezone(),
                timestamp: accountNowIso()
            };
            const res = await fetchApi('POST', `${config.api.goals}/users/${userId}/progress/batch`, bPayload, setGoalHeaders(token));
            if (res.status === 200) {
                notify('success', 'Auto Quest Saver', 'Your quests have been saved.');
                getQuests();
            }
        } catch {
        } finally {
            questSaverBusy = false;
        }
    }

    async function refreshQuestCenter() {
        if (!token || !userId) return;
        await getQuests();
        autoQuestSaver();
    }

    async function joinLeague() {
        let wasPrivate = false;
        try {
            const pRes = await fetchApi('GET', `https://www.duolingo.com/2023-05-23/users/${userId}/privacy-settings?fields=privacySettings`);
            if (pRes.status === 200) {
                const pData = safeJsonParse(pRes.responseText, {});
                const soc = (pData.privacySettings || []).find((s) => s.id === 'disable_social');
                wasPrivate = soc ? soc.enabled : false;
            }
        } catch {}

        if (wasPrivate) {
            try {
                await fetchApi('PATCH', `https://www.duolingo.com/2023-05-23/users/${userId}/privacy-settings?fields=privacySettings`, { DISABLE_SOCIAL: false });
                await wait(2000);
            } catch {}
        }

        try {
            const ok = await playStory(469);
            if (ok && user) {
                user.totalXp += 499;
                showUser();
            }
        } catch {}

        if (wasPrivate) {
            try {
                await fetchApi('PATCH', `https://www.duolingo.com/2023-05-23/users/${userId}/privacy-settings?fields=privacySettings`, { DISABLE_SOCIAL: true });
            } catch {}
        }
    }

    async function farmLeague(targetRank) {
        stopBtn('DR_League_Btn');
        setProgress('DR_League', 10);

        let joinTried = false;
        const sig = farmSignal('league');

        while (farmStates.league) {
            try {
                const res = await fetchApi('GET', `${config.api.leaderboards}/users/${userId}?client_unlocked=true&_=${Date.now()}`, null, null, sig);
                if (!farmStates.league) break;

                if (res.status !== 200) {
                    await waitStop(3000, sig);
                    continue;
                }

                const data = safeJsonParse(res.responseText, {});
                leagueDataCache = data;
                leagueDataTs = Date.now();
                applyLeagueSummary(data);
                const activeRanks = data?.active?.cohort?.rankings || [];
                const cRankings = activeRanks.find((u) => u.user_id == userId);

                if (!cRankings) {
                    if (!joinTried) {
                        joinTried = true;
                        notify('info', 'Auto League', 'You are not in a league yet. Joining now...');
                        await joinLeague();
                        await waitStop(2000, sig);
                        continue;
                    }
                    notify('error', 'League Error', 'Could not join a league. Please try again later.');
                    break;
                }

                const cRankPos = activeRanks.indexOf(cRankings) + 1;
                const tUserRanking = activeRanks[targetRank - 1];

                if (!tUserRanking || cRankPos <= targetRank) {
                    if (farmStates.league) {
                        notify('success', 'Goal Reached', `Reached Rank #${targetRank}!`);
                    }
                    setProgress('DR_League', 100);
                    break;
                }

                const scoreGap = tUserRanking.score - cRankings.score;
                const progressPct = Math.min(95, Math.floor((cRankings.score / tUserRanking.score) * 100));

                setProgress('DR_League', progressPct);

                if (scoreGap + 60 > 0) {
                    const ok = await playStory(469, sig);
                    if (!farmStates.league) break;
                    if (ok) {
                        user.totalXp += 499;
                        showUser();
                    } else {
                        await waitStop(2000, sig);
                    }
                }

                await waitStop(delayMs, sig);

            } catch {
                await waitStop(3000, sig);
            }
        }

        const completed = farmStates.league;
        if (!completed) {
            notify('warning', 'Auto League Stopped', 'Rank targeting aborted.');
        }

        clearProgress('DR_League', completed);
        refreshStats();

        farmStates.league = false;
        farmCtl.league = null;
        resetBtn('DR_League_Btn', 'RUN');
    }

    function showConfirmModal(onConfirm) {
        const modal = document.getElementById('DR_Confirm_Modal');
        const btnCancel = document.getElementById('DR_Modal_Cancel');
        const btnConfirm = document.getElementById('DR_Modal_Confirm');

        const cleanup = () => {
            modal.classList.remove('show');
            btnCancel.removeEventListener('click', handleCancel);
            btnConfirm.removeEventListener('click', handleConfirm);
        };

        const handleCancel = () => cleanup();
        const handleConfirm = () => {
            cleanup();
            onConfirm();
        };

        btnCancel.addEventListener('click', handleCancel);
        btnConfirm.addEventListener('click', handleConfirm);

        modal.classList.add('show');
    }

    let leaguePollTimer = null;
    let leagueJoinAttempted = false;

    let leagueDataCache = null;
    let leagueDataTs = 0;
    const LEAGUE_TTL = 8000;

    async function fetchLeagueData(force) {
        if (!userId || !token) return null;
        const now = Date.now();
        if (!force && leagueDataCache && (now - leagueDataTs) < LEAGUE_TTL) return leagueDataCache;
        try {
            const res = await fetchApi('GET', `${config.api.leaderboards}/users/${userId}?client_unlocked=true&get_reactions=true&_=${now}`);
            if (res.status === 200) {
                const parsed = safeJsonParse(res.responseText);
                if (parsed) {
                    leagueDataCache = parsed;
                    leagueDataTs = Date.now();
                }
            }
        } catch {}
        return leagueDataCache;
    }

    function leagueRankFromData(data) {
        const active = data?.active;
        if (active && active.cohort && Array.isArray(active.cohort.rankings)) {
            const myIndex = active.cohort.rankings.findIndex((r) => r.user_id == userId);
            return myIndex !== -1 ? myIndex + 1 : 0;
        }
        return null;
    }

    function applyLeagueSummary(data) {
        const cohort = data?.active?.cohort;
        const rankings = cohort?.rankings;
        if (!Array.isArray(rankings)) return;
        const idx = rankings.findIndex((r) => String(r.user_id) === String(userId));
        const tier = cohort?.tier;
        updateLeagueBadge(tier);
        updateProfileLeague(tier, idx >= 0 ? idx + 1 : null);
    }

    async function getLeagueRank() {
        return leagueRankFromData(await fetchLeagueData(true));
    }

    function updateLeagueDropdown(rank) {
        const sel = document.getElementById('DR_League_Select');
        if (!sel) return;
        if (sel.classList.contains('open')) return;
        const opts = sel.querySelector('.DR_Select_Options');
        const text = sel.querySelector('.DR_Select_Text');
        const chevron = sel.querySelector('.DR_Chevron');
        const btn = document.getElementById('DR_League_Btn');
        const lbl = document.getElementById('DR_League_Lbl');

        if (btn && !farmStates.league) btn.disabled = false;
        if (lbl && !farmStates.league) lbl.innerText = 'RUN';
        if (chevron) chevron.style.display = '';
        sel.style.pointerEvents = 'auto';

        const maxPos = 15;
        let optHtml = '';
        for (let i = 1; i <= maxPos; i++) {
            optHtml += `<div class="DR_Select_Option" data-value="${i}"># ${i}</div>`;
        }
        opts.innerHTML = optHtml;

        const savedTarget = parseInt(localStorage.getItem('dr_league_target'));
        let currentVal = !isNaN(savedTarget) ? savedTarget : (parseInt(sel.getAttribute('data-value')) || 1);
        if (currentVal < 1 || currentVal > maxPos) currentVal = 1;

        sel.setAttribute('data-value', currentVal.toString());
        text.innerText = (rank === 0) ? `Not ranked · # ${currentVal}` : `# ${currentVal}`;

        opts.querySelectorAll('.DR_Select_Option').forEach((opt) => {
            opt.classList.toggle('selected', parseInt(opt.getAttribute('data-value')) === currentVal);
        });
    }

    async function silentLeagueCheck() {
        if (leagueCheckBusy) return;
        if (!user || !userId || !token) return;
        leagueCheckBusy = true;
        try {
            let data = await fetchLeagueData(false);
            applyLeagueSummary(data);
            let rank = leagueRankFromData(data);

            if (rank === 0) {
                const autoJoin = localStorage.getItem('dr_auto_join_league') === 'true';
                if (autoJoin && !leagueJoinAttempted && !farmStates.league) {
                    leagueJoinAttempted = true;
                    if (pageId === 'Extra') {
                        updateLeagueDropdown(0);
                    }
                    notify('info', 'Auto League', 'You are not in a league yet. Joining now...');
                    await joinLeague();
                    await wait(2000);
                    data = await fetchLeagueData(true);
                    applyLeagueSummary(data);
                    rank = leagueRankFromData(data);
                    if (rank && rank > 0) {
                        if (pageId === 'Extra') updateLeagueDropdown(rank);
                        notify('success', 'Auto League', 'You have joined a league.');
                        autoBlockLeague();
                    } else if (pageId === 'Extra') {
                        updateLeagueDropdown(0);
                    }
                } else if (pageId === 'Extra') {
                    updateLeagueDropdown(0);
                }
            } else if (rank !== null) {
                if (pageId === 'Extra') updateLeagueDropdown(rank);
                autoReachRank(rank);
                autoBlockLeague();
            }

            if (pageId === 'Board') showLeagueBoard(data);
        } finally {
            leagueCheckBusy = false;
        }
    }

    function startLeaguePolling() {
        silentLeagueCheck();
        if (leaguePollTimer) clearInterval(leaguePollTimer);
        leaguePollTimer = setInterval(silentLeagueCheck, 15000);
    }

    function stopLeaguePolling() {
        if (leaguePollTimer) {
            clearInterval(leaguePollTimer);
            leaguePollTimer = null;
        }
    }

    function timeQuest(idStr) {
        const match = idStr.match(/^(\d{4})_(\d{2})_monthly/);
        if (match) {
            const yr = parseInt(match[1]);
            const mo = parseInt(match[2]) - 1;
            return new Date(Date.UTC(yr, mo, 15, 12, 0, 0)).toISOString();
        }
        return new Date().toISOString();
    }

    async function getQuests() {
        const cont = document.getElementById('DR_Quest_Container');
        if (!cont) {
            return;
        }

        const forceBtn = document.getElementById('DR_Quest_Force_Btn');

        if (!token) {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">Login required.</p>`;
            return;
        }

        const isRefresh = questState !== null;
        const prevScroll = cont.scrollTop;
        if (!isRefresh) {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">Loading data...</p>`;
        }

        try {
            const tzStr = encodeURIComponent(accountTimezone());
            const lang = uiLang();
            const [sRes, pRes] = await Promise.all([
                fetchApi('GET', `${config.api.goals}/schema?ui_language=${lang}&_=${Date.now()}`, null, setGoalHeaders(token)),
                fetchApi('GET', `${config.api.goals}/users/${userId}/progress?timezone=${tzStr}&ui_language=${lang}`, null, setGoalHeaders(token))
            ]);

            if (sRes.status !== 200 || pRes.status !== 200) {
                throw new Error('Quest fetch failed');
            }

            const sData = safeJsonParse(sRes.responseText, {});
            const pData = safeJsonParse(pRes.responseText, {});

            questState = {
                schema: sData,
                progress: pData.goals?.progress || {},
                earned: new Set(pData.badges?.earned || [])
            };
            questStateTs = Date.now();

            showQuests();
            cont.scrollTop = prevScroll;

            if (forceBtn) {
                forceBtn.disabled = false;
            }

        } catch {
            if (!isRefresh) cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">Failed to load quests.</p>`;
        }
    }

    function questDisplayGoals() {
        if (!questState || !Array.isArray(questState.schema?.goals)) {
            return [];
        }
        const mGoalMap = new Map();
        questState.schema.goals.forEach((goal) => {
            if (!goal || !goal.goalId) return;
            const match = goal.goalId.match(/^(\d{4}_\d{2})_monthly/);
            if (!match) {
                mGoalMap.set(goal.goalId, goal);
                return;
            }
            const exGoal = mGoalMap.get(match[1]);
            if (!exGoal) {
                mGoalMap.set(match[1], goal);
            } else if (!exGoal.category?.includes('CHALLENGE') && goal.category?.includes('CHALLENGE')) {
                mGoalMap.set(match[1], goal);
            }
        });
        return [...mGoalMap.values()].reverse();
    }

    function questRemaining(goal) {
        const isEarned = questState.earned.has(goal.badgeId) || questState.earned.has(goal.goalId);
        if (isEarned) return 0;
        const rData = questState.progress[goal.goalId];
        let cVal = 0;
        if (typeof rData === 'number') cVal = rData;
        else if (rData && rData.progress) cVal = rData.progress;
        return Math.max(0, (goal.threshold || 10) - cVal);
    }

    function showQuests(filterStr) {
        const cont = document.getElementById('DR_Quest_Container');
        if (!cont) {
            return;
        }

        const searchEl = document.getElementById('DR_Quest_Search');
        const query = (filterStr !== undefined ? filterStr : (searchEl ? searchEl.value : '')).trim().toLowerCase();

        cont.innerHTML = '';
        const allGoals = questDisplayGoals();

        if (allGoals.length === 0) {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">No active quests.</p>`;
            return;
        }

        const ddGoals = query
            ? allGoals.filter((goal) => ((goal.title?.uiString || goal.goalId) || '').toLowerCase().includes(query))
            : allGoals;

        if (ddGoals.length === 0) {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">No quests found.</p>`;
            return;
        }

        const yearOf = (goal) => {
            const m = goal.goalId.match(/^(\d{4})_/);
            return m ? m[1] : 'Daily';
        };
        const sorted = ddGoals.slice().sort((a, b) => {
            const ya = yearOf(a), yb = yearOf(b);
            if (ya === yb) return 0;
            if (ya === 'Daily') return -1;
            if (yb === 'Daily') return 1;
            return Number(yb) - Number(ya);
        });

        let lastYear = null;
        sorted.forEach((goal) => {
            const yr = yearOf(goal);
            if (yr !== lastYear) {
                lastYear = yr;
                const yHeader = document.createElement('div');
                yHeader.className = 'DR_Shop_Section_Header DR_NoSel';
                yHeader.innerHTML = `<div class="DR_Shop_Section_Line"></div><span class="DR_Shop_Section_Title">${yr}</span><div class="DR_Shop_Section_Line"></div>`;
                cont.appendChild(yHeader);
            }
            const isEarned = questState.earned.has(goal.badgeId) || questState.earned.has(goal.goalId);
            const rData = questState.progress[goal.goalId];

            let cVal = 0;
            if (typeof rData === 'number') {
                cVal = rData;
            } else if (rData && rData.progress) {
                cVal = rData.progress;
            }

            const target = goal.threshold || 10;
            if (isEarned) {
                cVal = target;
            }

            const pct = Math.min(100, (cVal / target) * 100);
            const rem = Math.max(0, target - cVal);

            let qIconUrl = "https://d35aaqx5ub95lt.cloudfront.net/images/goals/64d0bbcd8f4e6d5018502540f1e0094b.svg";

            if (goal.category?.includes("MONTHLY") && Array.isArray(questState.schema?.badges)) {
                const linked = questState.schema.badges?.find((b) => b.badgeId === goal.badgeId);
                if (linked && linked.icon?.enabled?.lightMode) {
                    qIconUrl = linked.icon.enabled.lightMode.svg || linked.icon.enabled.lightMode.url || qIconUrl;
                }
            }

            const qItem = document.createElement('div');
            qItem.className = `DR_Quest_Item ${isEarned ? 'done' : ''}`;

            let bruteHtml = '';
            if (!isEarned && rem > 0) {
                bruteHtml = `<button class="DR_Quest_Get_Btn" data-m="${escapeHtml(goal.metric || '')}" data-id="${escapeHtml(goal.goalId)}" data-amt="${rem}">BRUTE</button>`;
            }

            qItem.innerHTML = `
                <img src="${escapeHtml(qIconUrl)}" class="DR_Quest_Icon">
                <div class="DR_Quest_Info">
                    <p class="DR_Quest_Title DR_NoSel">${escapeHtml(goal.title?.uiString || goal.goalId)}</p>
                    <div class="DR_Quest_Bar_Bg">
                        <div class="DR_Quest_Bar_Fill" style="width: ${pct}%"></div>
                    </div>
                </div>
                ${bruteHtml}
            `;

            const actBtn = qItem.querySelector('.DR_Quest_Get_Btn');
            if (actBtn) {
                actBtn.addEventListener('click', async () => {
                    actBtn.disabled = true;
                    actBtn.innerText = '...';

                    try {
                        const tMetric = actBtn.dataset.m;
                        const tAmt = parseInt(actBtn.dataset.amt);
                        const tQId = actBtn.dataset.id;

                        const updLoad = {
                            metric_updates: [
                                { metric: tMetric, quantity: tAmt }
                            ],
                            timezone: accountTimezone(),
                            timestamp: timeQuest(tQId)
                        };

                        const res = await fetchApi('POST', `${config.api.goals}/users/${userId}/progress/batch`, updLoad, setGoalHeaders(token));

                        if (res.status === 200) {
                            actBtn.innerText = '✓';
                            notify('success', 'Quest updated', 'Progress injected.');
                            getQuests();
                        } else {
                            actBtn.innerText = 'BRUTE';
                            actBtn.disabled = false;
                            notify('error', 'Quest Failed', 'Could not inject progress.');
                        }
                    } catch {
                        actBtn.innerText = 'BRUTE';
                        actBtn.disabled = false;
                        notify('error', 'Network Error', 'Could not inject progress.');
                    }
                });
            }

            cont.appendChild(qItem);
        });
    }

    async function forceQuests() {
        if (!questState) {
            return;
        }

        const targets = questDisplayGoals().filter((goal) => goal.metric && questRemaining(goal) > 0);

        const forceBtn = document.getElementById('DR_Quest_Force_Btn');
        const forceLbl = forceBtn ? forceBtn.querySelector('.DR_Sm_Btn_Label') : null;

        if (targets.length === 0) {
            notify('info', 'Quest Operations', 'All quests are already complete.');
            return;
        }

        if (forceBtn) {
            forceBtn.disabled = true;
            if (forceLbl) forceLbl.innerText = '...';
        }

        let allOk = true;
        setProgress('DR_QuestForce', 0);
        try {
            for (let i = 0; i < targets.length; i++) {
                const goal = targets[i];
                const res = await fetchApi('POST', `${config.api.goals}/users/${userId}/progress/batch`, {
                    metric_updates: [{ metric: goal.metric, quantity: questRemaining(goal) }],
                    timezone: accountTimezone(),
                    timestamp: timeQuest(goal.goalId)
                }, setGoalHeaders(token));
                if (res.status !== 200) allOk = false;
                setProgress('DR_QuestForce', ((i + 1) / targets.length) * 100);
            }
            notify(allOk ? 'success' : 'warning', 'Mass Operation', allOk ? 'All quests brute-forced.' : 'Some quests could not be completed.');
            clearProgress('DR_QuestForce', allOk);
            getQuests();

        } catch {
            notify('error', 'Network Error', 'Failed mass operation.');
            clearProgress('DR_QuestForce', false);
        }

        if (forceBtn) {
            forceBtn.disabled = false;
            if (forceLbl) forceLbl.innerText = 'FORCE ALL';
        }
    }

    function formatName(raw) {
        return raw.split('_').map((word) => {
            if (word === 'xp') {
                return 'XP';
            }
            if (!isNaN(word)) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    function sortShop(rawList) {
        const vItems = rawList.filter((item) => item.currencyType === "XGM");

        const pItems = vItems.map((item) => {
            const safeId = item.id || "";
            let name = item.name || (safeId ? formatName(safeId) : "Unknown Item");
            let cat = "Misc";
            let ico = icons.shopIcons.misc;

            if (safeId.includes('streak_freeze')) {
                cat = "Streak Freezes";
                ico = icons.shopIcons.streak;
            } else if (safeId.includes('xp_boost')) {
                cat = "XP Boosts";
                ico = icons.shopIcons.xp;
                if (safeId.match(/\d+$/)) {
                    name += " Mins";
                }
            } else if (safeId.includes('health') || safeId.includes('heart')) {
                cat = "Hearts";
                ico = icons.shopIcons.heart;
                if (safeId.includes('partial')) {
                    const numMatch = safeId.match(/\d$/);
                    if (numMatch) {
                        name = `Health Refill Partial (${numMatch[0]} Heart)`;
                    }
                }
            } else if (safeId.includes('gem')) {
                cat = "Gems";
                ico = icons.shopIcons.gem;
            } else if (item.type === "outfit") {
                cat = "Outfits";
                ico = icons.shopIcons.outfit;
            } else if (safeId.includes('free_taste')) {
                cat = "Free Taste";
                ico = icons.shopIcons.free;
            }

            if (safeId.includes('gift')) {
                cat = "Gifts";
            }

            return {
                ...item,
                displayName: name,
                category: cat,
                icon: ico
            };
        });

        const ord = ["Streak Freezes", "XP Boosts", "Hearts", "Gems", "Outfits", "Free Taste", "Gifts", "Misc"];

        return pItems.sort((a, b) => {
            const idxA = ord.indexOf(a.category);
            const idxB = ord.indexOf(b.category);
            if (idxA !== idxB) {
                return idxA - idxB;
            }
            const nameA = a.displayName || "";
            const nameB = b.displayName || "";
            return nameA.localeCompare(nameB);
        });
    }

    const preloadedShopIcons = {};

    async function getShop() {
        const cont = document.getElementById('DR_Shop_Container');
        if (!cont) return;

        try {
            const res = await fetchApi('GET', config.api.shop);
            if (res.status === 200) {
                const rData = safeJsonParse(res.responseText, {});
                shopCache = sortShop(rData.shopItems || []);

                shopCache.forEach(item => {
                    if (item.icon && !preloadedShopIcons[item.icon]) {
                        const img = new Image();
                        img.src = item.icon;
                        img.className = 'DR_Shop_Ico';
                        preloadedShopIcons[item.icon] = img;
                    }
                });

                showShop('');
            } else {
                cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">Failed to load shop. Please try again.</p>`;
            }
        } catch {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">Failed to load shop. Please try again.</p>`;
        }
    }

    function showShop(filterStr) {
        const cont = document.getElementById('DR_Shop_Container');
        if (!cont) return;

        cont.innerHTML = '';
        const query = (filterStr || '').trim().toLowerCase();

        const fPowerUps = query
            ? powerUpItems.filter((p) => p.name.toLowerCase().includes(query))
            : powerUpItems;

        const fItems = query
            ? shopCache.filter((i) => ((i.displayName || '') + (i.id || '')).toLowerCase().includes(query))
            : shopCache;

        if (fPowerUps.length === 0 && fItems.length === 0) {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">No items found.</p>`;
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'DR_Shop_Grid';

        const fragment = document.createDocumentFragment();

        if (fPowerUps.length > 0) {
            const puHeader = document.createElement('div');
            puHeader.className = 'DR_Shop_Section_Header DR_NoSel';
            puHeader.innerHTML = `
                <div class="DR_Shop_Section_Line"></div>
                <span class="DR_Shop_Section_Title">Power-Ups</span>
                <div class="DR_Shop_Section_Line"></div>
            `;
            fragment.appendChild(puHeader);

            fPowerUps.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'DR_Shop_Card';

                const ico = document.createElement('img');
                ico.className = 'DR_Shop_Ico DR_NoSel';
                ico.src = item.ico;
                card.appendChild(ico);

                const nameDiv = document.createElement('div');
                nameDiv.className = 'DR_Shop_Name DR_NoSel';
                nameDiv.innerText = item.name;
                card.appendChild(nameDiv);

                const btn = document.createElement('button');
                btn.className = 'DR_Shop_Btn';
                btn.innerText = 'GET';
                btn.addEventListener('click', async () => {
                    if (btn.className.includes('loading')) return;
                    btn.className = 'DR_Shop_Btn loading';
                    btn.innerText = '...';
                    const r = await applyPowerUp(item);
                    if (r.ok) {
                        btn.className = 'DR_Shop_Btn got';
                        btn.innerText = '✓';
                        notify('success', 'Power-Ups', `${item.name} applied.`);
                    } else {
                        btn.className = 'DR_Shop_Btn fail';
                        btn.innerText = 'ERR';
                        notify('error', 'Power-Ups', r.msg);
                    }
                    setTimeout(() => {
                        btn.className = 'DR_Shop_Btn';
                        btn.innerText = 'GET';
                    }, 2000);
                });
                card.appendChild(btn);
                fragment.appendChild(card);
            });
        }

        let currentCategory = null;

        fItems.forEach((item) => {
            if (item.category !== currentCategory) {
                currentCategory = item.category;
                const secHeader = document.createElement('div');
                secHeader.className = 'DR_Shop_Section_Header DR_NoSel';
                secHeader.innerHTML = `
                    <div class="DR_Shop_Section_Line"></div>
                    <span class="DR_Shop_Section_Title">${currentCategory}</span>
                    <div class="DR_Shop_Section_Line"></div>
                `;
                fragment.appendChild(secHeader);
            }

            const card = document.createElement('div');
            card.className = 'DR_Shop_Card';

            if (item.icon && preloadedShopIcons[item.icon]) {
                card.appendChild(preloadedShopIcons[item.icon].cloneNode(true));
            }

            const nameDiv = document.createElement('div');
            nameDiv.className = 'DR_Shop_Name DR_NoSel';
            nameDiv.innerText = item.displayName || 'Unknown';
            card.appendChild(nameDiv);

            const btn = document.createElement('button');
            btn.className = 'DR_Shop_Btn';
            btn.dataset.id = item.id;
            btn.innerText = 'GET';

            btn.addEventListener('click', async () => {
                if (btn.className.includes('loading')) return;
                btn.className = 'DR_Shop_Btn loading';
                btn.innerText = '...';

                const result = await applyPowerUp({ id: item.id, refill: /refill/i.test(item.id) });
                if (result.ok) {
                    btn.className = 'DR_Shop_Btn got';
                    btn.innerText = '✓';
                    notify('success', 'Shop Success', `Acquired ${item.displayName}.`);
                    setTimeout(() => {
                        btn.className = 'DR_Shop_Btn';
                        btn.innerText = 'GET';
                    }, 2000);
                } else {
                    btn.className = 'DR_Shop_Btn fail';
                    btn.innerText = 'ERR';
                    notify('error', 'Shop Failed', `${item.displayName}: ${result.msg}`);
                    setTimeout(() => {
                        btn.className = 'DR_Shop_Btn';
                        btn.innerText = 'GET';
                    }, 2000);
                }
            });

            card.appendChild(btn);
            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
        cont.appendChild(grid);
    }

    async function getPrivacy() {
        if (!token || !userId) {
            return;
        }

        try {
            const res = await fetchApi('GET', `https://www.duolingo.com/2023-05-23/users/${userId}/privacy-settings?fields=privacySettings`);
            if (res.status !== 200) return;

            const pData = safeJsonParse(res.responseText, {});
            const socSet = pData.privacySettings?.find((s) => s.id === "disable_social");
            const isPriv = socSet ? socSet.enabled : false;

            const selEl = document.getElementById('DR_Privacy_Select');
            if (selEl) {
                const tVal = isPriv ? 'private' : 'public';
                selEl.setAttribute('data-value', tVal);
                selEl.querySelector('.DR_Select_Text').innerText = isPriv ? 'Private' : 'Public';

                selEl.querySelectorAll('.DR_Select_Option').forEach((opt) => {
                    if (opt.getAttribute('data-value') === tVal) {
                        opt.style.color = 'rgb(var(--DR-blue))';
                        opt.style.background = 'rgba(var(--DR-blue),0.1)';
                    } else {
                        opt.style.color = '';
                        opt.style.background = '';
                    }
                });
            }
        } catch {}
    }

    async function setPrivacy(modePriv) {
        if (!token || !userId) {
            return;
        }

        try {
            const res = await fetchApi('PATCH', `https://www.duolingo.com/2023-05-23/users/${userId}/privacy-settings?fields=privacySettings`, { "DISABLE_SOCIAL": modePriv });
            if (res.status !== 200) {
                throw new Error('Privacy update failed');
            }

            notify('success', 'Privacy Updated', `Profile is now ${modePriv ? 'Private' : 'Public'}.`);
        } catch {
            notify('error', 'Update Failed', 'Could not change privacy settings.');
        }
    }

    async function resolveUser(username) {
        try {
            const res = await fetchApi('GET', `${config.api.users}?username=${encodeURIComponent(username)}`);
            if (res.status === 200) {
                const data = safeJsonParse(res.responseText, {});
                const found = (data.users || [])[0];
                return found ? found.id : null;
            }
        } catch {}
        return null;
    }

    async function requestEmailVerification() {
        try {
            const res = await fetchApi('POST', `${config.api.users}/${userId}/email-verifications`, {});
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                notify('success', 'Verification Email', user.email ? `Sent to ${user.email}. Verify it, then reload.` : 'Verification email sent. Verify it, then reload.');
            } else {
                notify('error', 'Verification Email', `Could not send (status ${res.status}). Verify on Duolingo directly.`);
            }
        } catch {
            notify('error', 'Verification Email', 'Request failed. Verify on Duolingo directly.');
        }
    }

    async function ensureEmailVerified() {
        if (!user) {
            notify('error', 'Social Tools', 'Wait for connection.');
            return false;
        }
        if (user.emailVerified) return true;
        notify('warning', 'Email Not Verified', 'Click here to verify your email.', requestEmailVerification);
        return false;
    }

    async function blockTarget(username, unblock) {
        const label = unblock ? 'Unblock' : 'Block';
        if (!(await ensureEmailVerified())) return;
        const target = await resolveUser(username);
        if (!target) {
            notify('error', label, `Could not find user "${username}".`);
            return;
        }
        try {
            const res = await fetchApi(unblock ? 'DELETE' : 'POST', `${config.api.friends}/users/${userId}/block/${target}`);
            if (res.status === 200 || res.status === 201) {
                if (unblock) autoBlockCohortKey = null;
                notify('success', label, `${unblock ? 'Unblocked' : 'Blocked'} ${username}.`);
            } else {
                notify('error', label, `Failed with status ${res.status}.`);
            }
        } catch {
            notify('error', label, 'Request failed.');
        }
    }

    async function followTarget(username, unfollow) {
        const label = unfollow ? 'Unfollow' : 'Follow';
        if (!(await ensureEmailVerified())) return;
        const target = await resolveUser(username);
        if (!target) {
            notify('error', label, `Could not find user "${username}".`);
            return;
        }
        try {
            const res = await fetchApi(
                unfollow ? 'DELETE' : 'POST',
                `${config.api.friends}/users/${userId}/follow/${target}`,
                unfollow ? null : { component: 'profile_header_button' }
            );
            if (res.status === 200 || res.status === 201) {
                notify('success', label, `${unfollow ? 'Unfollowed' : 'Followed'} ${username}.`);
            } else {
                notify('error', label, `Failed with status ${res.status}.`);
            }
        } catch {
            notify('error', label, 'Request failed.');
        }
    }

    async function massUnfollow() {
        if (farmStates.unfollow) {
            farmStates.unfollow = false;
            resetBtn('DR_Follow_Btn', 'RUN');
            return;
        }
        if (!(await ensureEmailVerified())) return;
        farmStates.unfollow = true;
        stopBtn('DR_Follow_Btn');

        let list = [];
        try {
            const res = await fetchApi('GET', `${config.api.friends}/users/${userId}/following?viewerId=${userId}`);
            if (res.status === 200) {
                list = safeJsonParse(res.responseText, {}).following?.users || [];
            }
        } catch {}

        if (list.length === 0) {
            notify('info', 'Mass Unfollow', 'You are not following anyone.');
            farmStates.unfollow = false;
            resetBtn('DR_Follow_Btn', 'RUN');
            return;
        }

        let done = 0;
        let ok = 0;
        for (const entry of list) {
            if (!farmStates.unfollow) break;
            try {
                const res = await fetchApi('DELETE', `${config.api.friends}/users/${userId}/follow/${entry.userId}`);
                if (res.status === 200) ok++;
            } catch {}
            done++;
            setProgress('DR_Follow', (done / list.length) * 100);
            await wait(delayMs);
        }

        const completed = farmStates.unfollow;
        notify('success', completed ? 'Mass Unfollow Complete' : 'Mass Unfollow Stopped', `Unfollowed ${ok} user(s).`);
        clearProgress('DR_Follow', completed);
        farmStates.unfollow = false;
        resetBtn('DR_Follow_Btn', 'RUN');
    }

    async function massUnblock() {
        if (farmStates.unblock) {
            farmStates.unblock = false;
            resetBtn('DR_Block_Mass_Btn', 'RUN');
            return;
        }
        if (!(await ensureEmailVerified())) return;
        farmStates.unblock = true;
        stopBtn('DR_Block_Mass_Btn');

        let list = [];
        try {
            const res = await fetchApi('GET', `${config.api.users}/${userId}?fields=blockedUserIds`);
            if (res.status === 200) {
                list = safeJsonParse(res.responseText, {}).blockedUserIds || [];
            }
        } catch {}

        if (list.length === 0) {
            notify('info', 'Mass Unblock', 'You have not blocked anyone.');
            farmStates.unblock = false;
            resetBtn('DR_Block_Mass_Btn', 'RUN');
            return;
        }

        let done = 0;
        let ok = 0;
        for (const blockedId of list) {
            if (!farmStates.unblock) break;
            try {
                const res = await fetchApi('DELETE', `${config.api.friends}/users/${userId}/block/${blockedId}`);
                if (res.status === 200) ok++;
            } catch {}
            done++;
            setProgress('DR_Block_Mass', (done / list.length) * 100);
            await wait(delayMs);
        }

        const completed = farmStates.unblock;
        if (ok > 0) autoBlockCohortKey = null;
        notify('success', completed ? 'Mass Unblock Complete' : 'Mass Unblock Stopped', `Unblocked ${ok} user(s).`);
        clearProgress('DR_Block_Mass', completed);
        farmStates.unblock = false;
        resetBtn('DR_Block_Mass_Btn', 'RUN');
    }

    async function getCohortIds(force = true) {
        const rankings = (await fetchLeagueData(force))?.active?.cohort?.rankings;
        if (Array.isArray(rankings)) {
            return rankings.map((r) => r.user_id).filter((id) => id && String(id) !== String(userId));
        }
        return null;
    }

    async function massFollow() {
        if (farmStates.follow) {
            farmStates.follow = false;
            resetBtn('DR_Follow_Btn', 'RUN');
            return;
        }
        if (!(await ensureEmailVerified())) return;
        farmStates.follow = true;
        stopBtn('DR_Follow_Btn');

        const ids = new Set();
        const cohort = await getCohortIds();
        if (Array.isArray(cohort)) cohort.forEach((id) => ids.add(String(id)));

        try {
            const res = await fetchApi('GET', `${config.api.friends}/users/${userId}/followers?viewerId=${userId}`);
            if (res.status === 200) {
                (safeJsonParse(res.responseText, {}).followers?.users || []).forEach((u) => ids.add(String(u.userId)));
            }
        } catch {}

        ids.delete(String(userId));
        try {
            const res = await fetchApi('GET', `${config.api.friends}/users/${userId}/following?viewerId=${userId}`);
            if (res.status === 200) {
                (safeJsonParse(res.responseText, {}).following?.users || []).forEach((u) => ids.delete(String(u.userId)));
            }
        } catch {}

        const list = [...ids];
        if (list.length === 0) {
            notify('info', 'Mass Follow', 'No new users to follow.');
            farmStates.follow = false;
            resetBtn('DR_Follow_Btn', 'RUN');
            return;
        }

        let done = 0;
        let ok = 0;
        for (const id of list) {
            if (!farmStates.follow) break;
            try {
                const res = await fetchApi('POST', `${config.api.friends}/users/${userId}/follow/${id}`, { component: 'profile_header_button' });
                if (res.status === 200 || res.status === 201) ok++;
            } catch {}
            done++;
            setProgress('DR_Follow', (done / list.length) * 100);
            await wait(delayMs);
        }

        const completed = farmStates.follow;
        notify('success', completed ? 'Mass Follow Complete' : 'Mass Follow Stopped', `Followed ${ok} user(s).`);
        clearProgress('DR_Follow', completed);
        farmStates.follow = false;
        resetBtn('DR_Follow_Btn', 'RUN');
    }

    async function blockLeagueUsers(options = {}) {
        const isAuto = !!options.auto;
        const title = isAuto ? 'Auto Block League' : 'Mass Block';
        const cohort = await getCohortIds(false);
        if (cohort === null) {
            if (!isAuto) notify('error', title, 'No league cohort found. Join a league first.');
            return { ok: 0, total: 0, skipped: true };
        }

        const cohortKey = cohort.map(String).sort().join(',');
        if (isAuto && autoBlockCohortKey === cohortKey) {
            return { ok: 0, total: 0, skipped: true };
        }

        let blocked = [];
        try {
            const res = await fetchApi('GET', `${config.api.users}/${userId}?fields=blockedUserIds`);
            if (res.status === 200) blocked = safeJsonParse(res.responseText, {}).blockedUserIds || [];
        } catch {}
        const blockedSet = new Set(blocked.map(String));

        const list = cohort.filter((id) => !blockedSet.has(String(id)));
        if (list.length === 0) {
            if (!isAuto || autoBlockCohortKey !== cohortKey) {
                notify('info', title, 'Everyone in your league is already blocked.');
            }
            autoBlockCohortKey = cohortKey;
            return { ok: 0, total: 0, skipped: true };
        }

        let done = 0;
        let ok = 0;
        for (const id of list) {
            if (!farmStates.blockmass) break;
            try {
                const res = await fetchApi('POST', `${config.api.friends}/users/${userId}/block/${id}`);
                if (res.status === 200 || res.status === 201) ok++;
            } catch {}
            done++;
            setProgress('DR_Block_Mass', (done / list.length) * 100);
            await wait(delayMs);
        }

        if (ok === list.length) autoBlockCohortKey = cohortKey;
        return { ok, total: list.length, skipped: false };
    }

    async function massBlock() {
        if (farmStates.blockmass) {
            farmStates.blockmass = false;
            resetBtn('DR_Block_Mass_Btn', 'RUN');
            return;
        }
        if (!(await ensureEmailVerified())) return;
        farmStates.blockmass = true;
        stopBtn('DR_Block_Mass_Btn');

        const result = await blockLeagueUsers();
        const completed = farmStates.blockmass;
        if (!result.skipped) {
            notify('success', completed ? 'Mass Block Complete' : 'Mass Block Stopped', `Blocked ${result.ok} user(s).`);
        }
        clearProgress('DR_Block_Mass', completed);
        farmStates.blockmass = false;
        resetBtn('DR_Block_Mass_Btn', 'RUN');
    }

    const powerUpItems = [
        { id: 'streak_repair', name: 'Streak Repair', ico: icons.shopIcons.streak },
        { id: 'society_streak_freeze', name: 'Streak Freeze', ico: icons.shopIcons.streak },
        { id: 'general_xp_boost', name: 'General XP Boost', ico: icons.shopIcons.xp },
        { id: 'xp_boost_stackable', name: 'XP Boost (Stackable)', ico: icons.shopIcons.xp },
        { id: 'xp_boost_15', name: 'XP Boost x2 (15m)', ico: icons.shopIcons.xp },
        { id: 'xp_boost_60', name: 'XP Boost x2 (60m)', ico: icons.shopIcons.xp },
        { id: 'xp_boost_refill', name: 'XP Boost x3 (15m)', ico: icons.shopIcons.xp, refill: true },
        { id: 'early_bird_xp_boost', name: 'Early Bird Boost', ico: icons.shopIcons.xp }
    ];

    async function applyPowerUp(item) {
        if (!token || !userId) return { ok: false, msg: 'Login required.' };
        try {
            let res;
            if (item.refill) {
                const innerBody = {
                    isFree: false,
                    learningLanguage: user.learningLanguage,
                    subscriptionFeatureGroupId: 0,
                    xpBoostSource: 'REFILL',
                    xpBoostMinutes: 15,
                    xpBoostMultiplier: 3,
                    id: item.id
                };
                const batch = {
                    includeHeaders: true,
                    requests: [{
                        url: `/2023-05-23/users/${userId}/shop-items`,
                        extraHeaders: {},
                        method: 'POST',
                        body: JSON.stringify(innerBody)
                    }]
                };
                const refillHeaders = Object.assign({}, headers, { 'x-amzn-trace-id': 'User=' + userId });
                res = await fetchApi('POST', 'https://ios-api-2.duolingo.com/2023-05-23/batch', batch, refillHeaders);
            } else {
                res = await fetchApi('POST', `${config.api.users}/${userId}/shop-items`, {
                    itemName: item.id,
                    isFree: true,
                    consumed: true,
                    fromLanguage: user.fromLanguage,
                    learningLanguage: user.learningLanguage
                });
            }
            if (res.status === 200 || res.status === 201) return { ok: true };
            return { ok: false, msg: `Failed (${res.status}).` };
        } catch {
            return { ok: false, msg: 'Request failed.' };
        }
    }

    async function sendGift(username, itemName) {
        username = (username || '').trim();
        const btn = document.getElementById('DR_Gift_Btn');
        const lbl = btn ? btn.querySelector('.DR_Sm_Btn_Label') : null;
        if (!username) {
            notify('warning', 'Send Gift', 'Enter a username.');
            return;
        }
        if (!(await ensureEmailVerified())) return;

        if (btn) btn.disabled = true;
        if (lbl) lbl.innerText = '...';

        const target = await resolveUser(username);
        if (!target) {
            notify('error', 'Send Gift', `Could not find user "${username}".`);
        } else {
            try {
                const res = await fetchApi('POST', `${config.api.users}/${userId}/gifts/${target}`, { itemName: itemName });
                if (res.status === 200 || res.status === 201) {
                    notify('success', 'Send Gift', `Gift sent to ${username}.`);
                } else {
                    notify('error', 'Send Gift', `Failed with status ${res.status}.`);
                }
            } catch {
                notify('error', 'Send Gift', 'Request failed.');
            }
        }

        if (btn) btn.disabled = false;
        if (lbl) lbl.innerText = 'SEND';
    }

    async function forceFriend(username, mode) {
        username = (username || '').trim();
        const isQuest = mode === 'quest';
        const label = isQuest ? 'Friends Quest' : 'Friend Streak';
        const btn = document.getElementById('DR_Friend_Btn');
        const lbl = btn ? btn.querySelector('.DR_Sm_Btn_Label') : null;
        if (!username) {
            notify('warning', label, 'Enter a username.');
            return;
        }
        if (!(await ensureEmailVerified())) return;

        if (btn) btn.disabled = true;
        if (lbl) lbl.innerText = '...';

        const displayName = username;
        const target = await resolveUser(username);

        if (!target) {
            notify('error', label, `Could not find user "${username}".`);
        } else {
            try {
                if (isQuest) {
                    const chk = await fetchApi('GET', `https://www.duolingo.com/users/${userId}/friends-quests/match`);
                    let existing = null;
                    if (chk.status === 200) {
                        existing = safeJsonParse(chk.responseText, {}).match || null;
                    }
                    if (existing) {
                        const mu = existing.matchedUser || {};
                        notify('warning', label, `Already in a quest with ${mu.name || 'someone'}.`);
                    } else {
                        const res = await fetchApi('POST', `https://www.duolingo.com/2017-06-30/friends/users/${userId}/friends-quests/match`, { targetUserId: parseInt(target) });
                        let ok = false;
                        if (res.status === 200) {
                            ok = safeJsonParse(res.responseText, {}).success === true;
                        }
                        if (ok) {
                            notify('success', label, `Quest started with ${displayName}.`);
                        } else {
                            notify('error', label, `Could not start a quest with ${displayName}.`);
                        }
                    }
                } else {
                    const res = await fetchApi('POST', `https://www.duolingo.com/2017-06-30/friends/users/${userId}/matches`, {
                        activityName: 'friendsStreak',
                        intendedMatches: [{ targetUserIds: [parseInt(target)] }]
                    });
                    let ok = res.status === 200;
                    let failReason = null;
                    if (ok) {
                        try {
                            const d = safeJsonParse(res.responseText, {});
                            const fStreak = d.friendsStreak || {};
                            const successList = Array.isArray(fStreak.success) ? fStreak.success : [];
                            const failList = Array.isArray(fStreak.fail) ? fStreak.fail : [];
                            ok = successList.length > 0 && failList.length === 0;
                            if (!ok && failList.length > 0) {
                                failReason = failList[0].failureReason || null;
                            }
                        } catch {
                            ok = false;
                        }
                    }
                    if (ok) {
                        notify('success', label, `Streak started with ${displayName}.`);
                    } else {
                        notify('error', label, failReason ? `Could not start a streak with ${displayName}: ${failReason}` : `Could not start a streak with ${displayName}.`);
                    }
                }
            } catch {
                notify('error', label, 'Request failed.');
            }
        }

        if (btn) btn.disabled = false;
        if (lbl) lbl.innerText = 'START';
    }

    function scrollToActiveStatus() {
        const doScroll = () => {
            const cont = document.getElementById('DR_Status_Container');
            if (!cont) return;
            const activeBtn = cont.querySelector('.DR_Shop_Btn.got');
            const card = activeBtn ? activeBtn.closest('.DR_Shop_Card') : null;
            if (!card || !cont.clientHeight) return;
            const contRect = cont.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const offset = (cardRect.top - contRect.top) + cont.scrollTop - (cont.clientHeight / 2) + (cardRect.height / 2);
            cont.scrollTop = Math.max(0, offset);
        };
        requestAnimationFrame(() => requestAnimationFrame(doScroll));
        setTimeout(doScroll, 450);
    }

    async function openStatusPicker() {
        const search = document.getElementById('DR_Status_Search');
        if (search) search.value = '';
        showStatuses('');
        changePage('Status');
        currentStatus = await getCurrentStatus();
        showStatuses('');
        scrollToActiveStatus();
    }

    function updateLeagueBadge(tier) {
        const url = leagueBadgeUrl(tier);
        const name = (typeof tier === 'number' && leagueTierNames[tier]) ? leagueTierNames[tier] + ' League' : 'Leaderboard';
        const navIco = document.getElementById('DR_Board_Nav_Ico');
        const tierIco = document.getElementById('DR_Board_Tier_Ico');
        const tierName = document.getElementById('DR_Board_Tier_Name');
        if (navIco) navIco.src = url;
        if (tierIco) tierIco.src = url;
        if (tierName) tierName.innerText = name;
    }

    function updateProfileLeague(tier, rank) {
        const wrap = document.getElementById('DR_ULeague_Wrap');
        const ico = document.getElementById('DR_ULeague_Ico');
        const rk = document.getElementById('DR_ULeague_Rank');
        if (!wrap || !ico || !rk) return;
        if (typeof tier !== 'number' || !rank) {
            wrap.style.display = 'none';
            return;
        }
        ico.src = leagueBadgeUrl(tier);
        rk.innerText = '#' + rank;
        wrap.style.display = 'flex';
    }

    async function showLeagueBoard(preData) {
        const cont = document.getElementById('DR_Board_Container');
        if (!cont) return;
        const loaded = cont.dataset.loaded === '1';
        if (!loaded) cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; padding: 8px 0;">Loading...</p>`;

        try {
            const cohort = (preData || await fetchLeagueData(true))?.active?.cohort;
            const rankings = cohort?.rankings;
            if (!Array.isArray(rankings) || rankings.length === 0) {
                if (!loaded) cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">You are not in an active league.</p>`;
                return;
            }

            const tier = cohort?.tier;
            updateLeagueBadge(tier);

            const statusMap = {};
            statusReactions.forEach((s) => { statusMap[s.value] = s; });

            const frag = document.createDocumentFragment();
            const setIco = DUO_LEAGUES_CDN + '6df6337370e45c1b9a5029e78211d114.svg';
            let myStatus = null;
            let myRank = null;
            rankings.forEach((r, i) => {
                const rank = i + 1;
                const isMe = String(r.user_id) === String(userId);
                const av = r.avatar_url ? ((r.avatar_url.startsWith('http') ? r.avatar_url : 'https:' + r.avatar_url) + '/xlarge') : '';
                const st = (r.reaction && r.reaction !== 'NONE') ? statusMap[r.reaction] : null;
                if (isMe) { myStatus = st; myRank = rank; }
                let statusHtml;
                if (isMe) {
                    const inner = st
                        ? (st.icon
                            ? `<img src="${escapeHtml(st.icon)}" alt="${escapeHtml(st.name)}" style="width: 20px; height: 20px; object-fit: contain;">`
                            : `<span style="font-size: 14px;">${escapeHtml(statusFallback(st))}</span>`)
                        : `<img src="${setIco}" alt="" style="width: 20px; height: 20px; object-fit: contain; opacity: 0.5;">`;
                    statusHtml = `<span class="DR_Board_MyStatus DR_NoSel" title="Tap to change your status" style="cursor: pointer; flex-shrink: 0; display: flex; align-items: center; gap: 3px;">${inner}<span class="DR_NoSel" style="opacity: 0.45; font-size: 13px; line-height: 1;">&gt;</span></span>`;
                } else {
                    statusHtml = st
                        ? (st.icon
                            ? `<img class="DR_NoSel" src="${escapeHtml(st.icon)}" title="${escapeHtml(st.name)}" alt="${escapeHtml(st.name)}" style="width: 20px; height: 20px; flex-shrink: 0; object-fit: contain;">`
                            : `<span class="DR_NoSel" title="${escapeHtml(st.name)}" style="font-size: 14px; flex-shrink: 0;">${escapeHtml(statusFallback(st))}</span>`)
                        : '';
                }
                const row = document.createElement('div');
                row.className = 'DR_HStack_Auto';
                row.style.cssText = 'align-self: stretch; padding: 8px 10px; border-radius: var(--DR-r-s); corner-shape: var(--DR-corner); gap: 8px; background: var(--dr-card-bg);' + (isMe ? ' outline: 2px solid rgba(var(--DR-blue), 0.5); outline-offset: -2px; background: rgba(var(--DR-blue), 0.08);' : '');
                row.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
                        ${rank <= 3
                            ? `<img class="DR_NoSel" src="${podiumMedals[rank - 1]}" alt="#${rank}" title="#${rank}" style="width: 24px; height: 24px; object-fit: contain; flex-shrink: 0;">`
                            : `<span class="DR_T1 DR_NoSel" style="width: 22px; text-align: center; flex-shrink: 0;">${rank}</span>`}
                        <img src="${escapeHtml(av)}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: var(--dr-card-border);" onerror="this.style.visibility='hidden'">
                        <p class="DR_T1 DR_NoSel" style="font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(r.display_name || 'Unknown')}</p>
                    </div>
                    ${statusHtml}
                    <p class="DR_T2 DR_NoSel" style="flex-shrink: 0;">${(r.score || 0).toLocaleString()} XP</p>
                `;
                frag.appendChild(row);
                if (isMe) {
                    const myEl = row.querySelector('.DR_Board_MyStatus');
                    if (myEl) myEl.addEventListener('click', openStatusPicker);
                }
            });
            cont.replaceChildren(frag);
            cont.dataset.loaded = '1';
            const barIco = document.getElementById('DR_Board_Status_Ico');
            if (barIco) {
                if (myStatus && myStatus.icon) {
                    barIco.innerHTML = `<img src="${escapeHtml(myStatus.icon)}" alt="${escapeHtml(myStatus.name)}" style="width: 22px; height: 22px; object-fit: contain;">`;
                } else if (myStatus) {
                    barIco.innerHTML = `<span style="font-size: 16px; line-height: 1;">${escapeHtml(statusFallback(myStatus))}</span>`;
                } else {
                    barIco.innerHTML = `<img src="${setIco}" alt="" style="width: 22px; height: 22px; object-fit: contain; opacity: 0.5;">`;
                }
            }
            updateProfileLeague(tier, myRank);
        } catch {
            if (!loaded) cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center; color: rgb(var(--DR-red));">Failed to load leaderboard.</p>`;
        }
    }

    async function removeHearts(count) {
        const btn = document.getElementById('DR_Hearts_Btn');
        if (btn) btn.disabled = true;
        let ok = 0;
        for (let i = 0; i < count; i++) {
            try {
                const res = await fetchApi('PUT', `${config.api.users}/${userId}/remove-heart`);
                if (res.status === 200) ok++;
            } catch {}
            setProgress('DR_Hearts', ((i + 1) / count) * 100);
            await wait(delayMs);
        }
        notify(ok > 0 ? 'success' : 'error', 'Remove Hearts', ok > 0 ? `Removed ${ok} heart(s).` : 'Failed to remove hearts.');
        clearProgress('DR_Hearts', ok > 0);
        if (btn) btn.disabled = false;
    }

    function applyLocalMax() {
        if (localStorage.getItem('dr_local_max') !== 'true') return;
        if (document.getElementById('DR_LocalMax_Script')) return;
        const script = document.createElement('script');
        script.id = 'DR_LocalMax_Script';
        script.textContent = `
            (function() {
                const TARGET_URL_REGEX = /https?:\\/\\/(?:[a-zA-Z0-9-]+\\.)?duolingo\\.[a-zA-Z]{2,6}(?:\\.[a-zA-Z]{2})?\\/\\d{4}-\\d{2}-\\d{2}\\/users\\/.+/;
                const CUSTOM_SHOP_ITEMS = {
                    gold_subscription: {
                        itemName: "gold_subscription",
                        subscriptionInfo: {
                            vendor: "STRIPE",
                            renewing: true,
                            expectedExpiration: Date.now() + 31536000000
                        }
                    }
                };

                const originalFetch = window.fetch;
                window.fetch = function (resource, options) {
                    const url = resource instanceof Request ? resource.url : resource;
                    if (TARGET_URL_REGEX.test(url)) {
                        return originalFetch.apply(this, arguments).then(async function (response) {
                            const resp = response.clone();
                            let raw = await resp.text();
                            try {
                                let data = JSON.parse(raw);
                                data.hasPlus = true;
                                if (!data.trackingProperties || typeof data.trackingProperties !== 'object') data.trackingProperties = {};
                                data.trackingProperties.has_item_gold_subscription = true;
                                data.shopItems = CUSTOM_SHOP_ITEMS;
                                raw = JSON.stringify(data);
                            } catch { }
                            let hdrs = response.headers;
                            try { const obj = {}; response.headers.forEach((v, k) => obj[k] = v); hdrs = obj; } catch { }
                            return new Response(raw, { status: response.status, statusText: response.statusText, headers: hdrs });
                        });
                    }
                    return originalFetch.apply(this, arguments);
                };

                const origOpen = XMLHttpRequest.prototype.open;
                const origSend = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.open = function (method, url, ...args) {
                    this._intercept = TARGET_URL_REGEX.test(url);
                    this._url = url;
                    origOpen.call(this, method, url, ...args);
                };
                XMLHttpRequest.prototype.send = function () {
                    if (this._intercept) {
                        const origChange = this.onreadystatechange;
                        const xhr = this;
                        this.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                                try {
                                    let raw = xhr.responseText;
                                    try {
                                        let data = JSON.parse(raw);
                                        data.hasPlus = true;
                                        if (!data.trackingProperties || typeof data.trackingProperties !== 'object') data.trackingProperties = {};
                                        data.trackingProperties.has_item_gold_subscription = true;
                                        data.shopItems = CUSTOM_SHOP_ITEMS;
                                        raw = JSON.stringify(data);
                                    } catch { }
                                    Object.defineProperty(xhr, 'responseText', { writable: true, value: raw });
                                    Object.defineProperty(xhr, 'response', { writable: true, value: raw });
                                } catch { }
                            }
                            if (origChange) origChange.apply(this, arguments);
                        };
                    }
                    origSend.apply(this, arguments);
                };

                function remove(root = document) {
                    const sections = root.querySelectorAll('section._3f-te');
                    for (let i = 0; i < sections.length; i++) {
                        const h2 = sections[i].querySelector('h2._203-l');
                        if (h2 && h2.textContent.trim() === 'Manage subscription') {
                            sections[i].remove();
                            break;
                        }
                    }
                }
                const observer = new MutationObserver(function () {
                    remove();
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
                remove();
            })();
        `;
        document.documentElement.appendChild(script);
    }

    async function getCohort() {
        return (await fetchLeagueData(false))?.active?.cohort?.cohort_id || null;
    }

    async function getCurrentStatus() {
        const rankings = (await fetchLeagueData(true))?.active?.cohort?.rankings || [];
        const me = rankings.find((r) => r.user_id == userId);
        return me ? (me.reaction || 'NONE') : null;
    }

    async function setStatus(reaction) {
        if (!userId) return false;
        const cohort = await getCohort();
        if (!cohort) {
            notify('error', 'Leaderboard Status', 'You are not in an active league.');
            return false;
        }
        try {
            const res = await fetchApi('PATCH', `https://duolingo-leaderboards-prod.duolingo.com/reactions/${cohort}/users/${userId}`, { reaction: reaction });
            if (res.status === 200) {
                notify('success', 'Leaderboard Status', 'Status updated.');
                return true;
            }
            notify('error', 'Leaderboard Status', `Failed with status ${res.status}.`);
            return false;
        } catch {
            notify('error', 'Leaderboard Status', 'Request failed.');
            return false;
        }
    }

    function showStatuses(filterStr) {
        const cont = document.getElementById('DR_Status_Container');
        if (!cont) return;

        cont.innerHTML = '';
        const query = (filterStr || '').trim().toLowerCase();
        const items = query
            ? statusReactions.filter((s) => s.name.toLowerCase().includes(query))
            : statusReactions;

        if (items.length === 0) {
            cont.innerHTML = `<p class="DR_T2 DR_NoSel" style="text-align: center;">No statuses found.</p>`;
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'DR_Shop_Grid';

        const fragment = document.createDocumentFragment();
        let currentCat = null;

        items.forEach((s) => {
            if (s.cat !== currentCat) {
                currentCat = s.cat;
                const secHeader = document.createElement('div');
                secHeader.className = 'DR_Shop_Section_Header DR_NoSel';
                secHeader.innerHTML = `
                    <div class="DR_Shop_Section_Line"></div>
                    <span class="DR_Shop_Section_Title">${currentCat}</span>
                    <div class="DR_Shop_Section_Line"></div>
                `;
                fragment.appendChild(secHeader);
            }

            const card = document.createElement('div');
            card.className = 'DR_Shop_Card';

            const ico = document.createElement('div');
            ico.className = 'DR_NoSel';
            ico.style.cssText = 'font-size: 30px; line-height: 36px; height: 36px; display: flex; align-items: center; justify-content: center;';
            if (s.icon) {
                const img = document.createElement('img');
                img.src = s.icon;
                img.alt = s.name;
                img.style.cssText = 'width: 34px; height: 34px; object-fit: contain;';
                ico.appendChild(img);
            } else {
                ico.innerText = statusFallback(s);
            }
            card.appendChild(ico);

            const nameDiv = document.createElement('div');
            nameDiv.className = 'DR_Shop_Name DR_NoSel';
            nameDiv.innerText = s.name;
            card.appendChild(nameDiv);

            const isActive = currentStatus !== null && s.value === currentStatus;
            if (isActive) {
                card.style.outlineColor = 'rgba(var(--DR-blue), 0.6)';
            }

            const btn = document.createElement('button');
            btn.className = isActive ? 'DR_Shop_Btn got' : 'DR_Shop_Btn';
            btn.innerText = isActive ? 'ACTIVE' : 'SET';

            btn.addEventListener('click', async () => {
                if (btn.className.includes('loading') || btn.className.includes('got')) return;
                btn.className = 'DR_Shop_Btn loading';
                btn.innerText = '...';

                const ok = await setStatus(s.value);
                if (ok) {
                    currentStatus = s.value;
                    showStatuses(document.getElementById('DR_Status_Search').value);
                } else {
                    btn.className = 'DR_Shop_Btn fail';
                    btn.innerText = 'ERR';
                    setTimeout(() => {
                        btn.className = 'DR_Shop_Btn';
                        btn.innerText = 'SET';
                    }, 2000);
                }
            });

            card.appendChild(btn);
            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
        cont.appendChild(grid);
    }

    function checkTheme() {
        let lastDark = null;
        const updClasses = () => {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-duo-theme') === 'dark' || html.classList.contains('_2L9MF');
            if (isDark === lastDark) {
                return;
            }
            const mainBox = document.getElementById('DR_Main_Box');
            if (!mainBox) {
                return;
            }
            lastDark = isDark;

            const notifMain = document.getElementById('DR_Notif_Main');
            const hideBtn = document.getElementById('duorain-hide-button');
            const targets = [mainBox, notifMain, hideBtn].filter(Boolean);
            targets.forEach((el) => {
                el.classList.toggle('dr-dark', isDark);
                el.classList.toggle('dr-light', !isDark);
            });
        };

        updClasses();
        if (window.MutationObserver) {
            new MutationObserver(updClasses).observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-duo-theme']
            });
        }
        setInterval(updClasses, 5000);
    }

    function drVpWidth() {
        return Math.round(window.visualViewport ? window.visualViewport.width : window.innerWidth);
    }

    function drVpHeight() {
        return Math.round(window.visualViewport ? window.visualViewport.height : window.innerHeight);
    }

    function drMargin() {
        return drVpWidth() <= 480 ? 8 : 16;
    }

    function drPageWidth() {
        const base = 325;
        return Math.min(base, drVpWidth() - drMargin() * 2);
    }

    function drMaxHeight() {
        const btn = document.getElementById('duorain-hide-button');
        const reserve = btn ? btn.offsetHeight + 8 : 48;
        return drVpHeight() - drMargin() * 2 - reserve;
    }

    function clampPos(left, top) {
        const wrap = document.getElementById('DR_Main');
        const m = drMargin();
        const maxL = Math.max(m, drVpWidth() - wrap.offsetWidth - m);
        const maxT = Math.max(m, drVpHeight() - wrap.offsetHeight - m);
        return {
            left: Math.min(Math.max(left, m), maxL),
            top: Math.min(Math.max(top, m), maxT)
        };
    }

    function nearestCorner() {
        const wrap = document.getElementById('DR_Main');
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        return (cy < drVpHeight() / 2 ? 't' : 'b') + (cx < drVpWidth() / 2 ? 'l' : 'r');
    }

    function positionPanel() {
        const wrap = document.getElementById('DR_Main');
        if (!wrap) return;
        const m = drMargin();
        const top = panelCorner.charAt(0) === 't';
        const left = panelCorner.charAt(1) === 'l';
        wrap.style.left = left ? m + 'px' : 'auto';
        wrap.style.right = left ? 'auto' : m + 'px';
        wrap.style.top = top ? m + 'px' : 'auto';
        wrap.style.bottom = top ? 'auto' : m + 'px';
        wrap.style.flexDirection = top ? 'column' : 'column-reverse';
        wrap.style.alignItems = left ? 'flex-start' : 'flex-end';
        wrap.style.setProperty('--DR-panel-origin', `${top ? 'top' : 'bottom'} ${left ? 'left' : 'right'}`);
        wrap.style.setProperty('--DR-panel-hide-y', top ? '-8px' : '8px');
        const btn = document.getElementById('duorain-hide-button');
        if (btn && btn.parentElement) {
            btn.parentElement.style.alignSelf = left ? 'flex-start' : 'flex-end';
        }
    }

    function relayout() {
        const box = document.getElementById('DR_Main_Box');
        if (box && box.dataset.isAnimating !== 'true') {
            const prevScroll = box.scrollTop;
            const w = drPageWidth(pageId) + 'px';
            if (box.style.width !== w) box.style.width = w;
            const cap = drMaxHeight();
            box.style.maxHeight = 'none';
            const natural = box.offsetHeight;
            box.style.maxHeight = cap + 'px';
            const needScroll = natural > cap + 4;
            if (box.classList.contains('dr-scroll') !== needScroll) box.classList.toggle('dr-scroll', needScroll);
            if (needScroll && box.scrollTop !== prevScroll) box.scrollTop = prevScroll;
        }
        positionPanel();
    }

    let relayoutQueued = false;
    function queueRelayout() {
        if (relayoutQueued) return;
        relayoutQueued = true;
        requestAnimationFrame(() => {
            relayoutQueued = false;
            relayout();
        });
    }

    function refreshPageData(tPageId) {
        if (tPageId === 'Stats') {
            loadXpHistory();
        }
        if (tPageId === 'Feed') {
            getFeed();
        }
        if (tPageId === 'Extra') {
            updateLeagueDropdown(leagueRankFromData(leagueDataCache) || 0);
            silentLeagueCheck();
        }
    }

    function changePage(tPageId) {
        const mainBox = document.getElementById('DR_Main_Box');
        if (mainBox.dataset.isAnimating === 'true') return;
        if (pageId === tPageId) {
            refreshPageData(tPageId);
            return;
        }
        mainBox.dataset.isAnimating = 'true';

        if (tPageId === 'Extra') {
            const lSel = document.getElementById('DR_League_Select');
            if (lSel) {
                const st = parseInt(localStorage.getItem('dr_league_target'));
                const tv = (!isNaN(st) && st >= 1 && st <= 15) ? st : 1;
                const lTxt = lSel.querySelector('.DR_Select_Text');
                if (lTxt) lTxt.innerText = `# ${tv}`;
                lSel.setAttribute('data-value', tv.toString());
            }
        }

        const origPage = document.getElementById(pageId === 1 ? 'DR_Page_1' : `DR_Page_${pageId}`);
        const tPage = document.getElementById(tPageId === 1 ? 'DR_Page_1' : `DR_Page_${tPageId}`);

        if (!origPage || !tPage) {
            mainBox.dataset.isAnimating = 'false';
            return;
        }

        const sW = mainBox.offsetWidth;
        const sH = mainBox.offsetHeight;

        mainBox.style.transition = 'none';
        mainBox.style.width = sW + 'px';
        mainBox.style.height = sH + 'px';

        origPage.classList.remove('active');
        tPage.classList.add('active');

        tPage.style.transition = 'none';
        tPage.style.filter = 'blur(6px)';
        tPage.style.opacity = '0';

        mainBox.style.width = 'auto';
        mainBox.style.height = 'auto';
        mainBox.style.maxHeight = 'none';
        mainBox.classList.remove('dr-scroll');

        let cTargetW = drPageWidth(tPageId);
        mainBox.style.width = cTargetW + 'px';

        const natH = mainBox.offsetHeight;
        const maxH = drMaxHeight();
        const needsScroll = natH > maxH;
        const finalH = Math.min(natH < 50 ? 200 : natH, maxH);

        mainBox.style.maxHeight = maxH + 'px';
        mainBox.classList.toggle('dr-scroll', needsScroll);

        mainBox.style.width = sW + 'px';
        mainBox.style.height = sH + 'px';

        void mainBox.offsetHeight;

        mainBox.style.transition = 'height var(--DR-motion-page) var(--DR-ease), width var(--DR-motion-page) var(--DR-ease), opacity var(--DR-motion) ease, filter var(--DR-motion) ease';
        mainBox.style.width = cTargetW + 'px';
        mainBox.style.height = finalH + 'px';

        setTimeout(() => {
            tPage.style.transition = 'filter var(--DR-motion) ease, opacity var(--DR-motion) ease';
            tPage.style.filter = 'blur(0px)';
            tPage.style.opacity = '1';
        }, DR_PAGE_FADE_DELAY_MS);

        setTimeout(() => {
            mainBox.style.width = cTargetW + 'px';
            mainBox.style.height = 'auto';
            mainBox.style.transition = '';
            tPage.style.transition = '';
            tPage.style.filter = '';
            tPage.style.opacity = '';
            pageId = tPageId;
            mainBox.dataset.isAnimating = 'false';
            relayout();

            refreshPageData(tPageId);
        }, DR_PAGE_TRANSITION_MS);
    }

    function toggleInf(idPre) {
        const togBtn = document.getElementById(`DR_${idPre}_Hash`);
        const inpEl = document.getElementById(`DR_${idPre}_Input`);
        const inpWrap = inpEl.parentElement;

        togBtn.addEventListener('click', () => {
            const isInf = togBtn.getAttribute('data-inf') === 'true';

            if (isInf) {
                togBtn.innerHTML = icons.hash;
                togBtn.setAttribute('data-inf', 'false');
                togBtn.classList.remove('dr-inf-active');
                inpWrap.classList.remove('dr-inf-hidden');
                inpEl.disabled = false;
                inpEl.value = '';
            } else {
                togBtn.innerHTML = icons.inf + '<span class="DR_Hash_Lbl">Infinite</span>';
                togBtn.setAttribute('data-inf', 'true');
                togBtn.classList.add('dr-inf-active');
                inpWrap.classList.add('dr-inf-hidden');
                inpEl.disabled = true;
                inpEl.value = 'Infinity';
            }
            togBtn.blur();
        });
    }

    function runTask(type, idPre) {
        if (farmStates[type]) {
            stopFarm(type);
            resetBtn(`${idPre}_Btn`, 'RUN');
            return;
        }

        if (!user) {
            notify('error', 'Status', 'Wait for connection.');
            return;
        }

        let infSel = false;
        let numVal = Infinity;

        if (idPre !== 'DR_League') {
            const togBtn = document.getElementById(`${idPre}_Hash`);
            infSel = togBtn.getAttribute('data-inf') === 'true';

            if (!infSel) {
                const inpVal = document.getElementById(`${idPre}_Input`).value;
                numVal = parseInt(inpVal);

                if (isNaN(numVal) || numVal <= 0) {
                    notify('warning', 'Invalid Input', 'Please enter a valid number greater than 0.');
                    return;
                }

                if (type === 'xp' && numVal < 30) {
                    notify('warning', 'Invalid Input', 'Minimum XP amount is 30.');
                    return;
                }
            }
        } else {
            const selEl = document.getElementById('DR_League_Select');
            numVal = selEl.getAttribute('data-value');
        }

        const startExecution = () => {
            farmStates[type] = true;
            farmCtl[type] = new AbortController();
            if (type === 'xp') farmXp(numVal);
            if (type === 'gem') farmGems(numVal);
            if (type === 'streak') farmStreak(numVal);
            if (type === 'league') farmLeague(numVal);
        };

        if (type === 'league' && farmStates.xp) {
            showConfirmModal(() => {
                stopFarm('xp');
                resetBtn('DR_XP_Btn', 'RUN');
                startExecution();
            });
            return;
        }

        startExecution();
    }

    function initApp() {
        checkTheme();
        applyLocalMax();
        startLeaguePolling();
        checkUpdateBannerFromCache();
        checkForUpdates();
        setInterval(checkForUpdates, 6 * 60 * 60 * 1000);
        setInterval(bgCheck, 2500);
        setInterval(async () => {
            if (!user) return;
            await refreshStats();
            autoKeepStreak();
        }, 30000);

        setInterval(() => {
            if (!user) return;
            refreshQuestCenter();
        }, 60000);

        setInterval(() => {
            if (!user) return;
            refreshPageData(pageId);
        }, 10000);

        ['XP', 'Gem', 'Streak'].forEach(toggleInf);

        document.getElementById('DR_TopSettings_Btn').addEventListener('click', () => changePage('Settings'));
        document.getElementById('DR_Update_Btn').addEventListener('click', () => {
            window.open(drUpdatePageUrl, '_blank');
        });
        document.getElementById('DR_Update_Dismiss_Btn').addEventListener('click', () => {
            const banner = document.getElementById('DR_Update_Banner');
            const v = banner ? banner.dataset.version : null;
            if (v) localStorage.setItem('dr_update_dismissed_version', v);
            hideUpdateBanner();
        });
        document.getElementById('DR_Settings_Back_Btn').addEventListener('click', () => changePage(1));
        document.getElementById('DR_Version_Btn').addEventListener('click', () => changePage('Stats'));
        document.getElementById('DR_Stats_Back_Btn').addEventListener('click', () => changePage(1));
        document.getElementById('DR_Extra_Btn').addEventListener('click', () => changePage('Extra'));
        document.getElementById('DR_Extra_Back_Btn').addEventListener('click', () => changePage(1));
        document.getElementById('DR_Shop_Btn').addEventListener('click', () => changePage('Shop'));
        document.getElementById('DR_Shop_Back_Btn').addEventListener('click', () => changePage('Extra'));
        document.getElementById('DR_Quest_Nav_Btn').addEventListener('click', () => changePage('Quests'));
        document.getElementById('DR_Quests_Back_Btn').addEventListener('click', () => changePage('Extra'));
        document.getElementById('DR_Tools_Nav_Btn').addEventListener('click', () => changePage('Tools'));
        document.getElementById('DR_Tools_Back_Btn').addEventListener('click', () => changePage('Extra'));
        document.getElementById('DR_Board_Nav_Btn').addEventListener('click', () => { showLeagueBoard(); changePage('Board'); });
        document.getElementById('DR_Board_Back_Btn').addEventListener('click', () => changePage('Extra'));

        document.getElementById('DR_Feed_Nav_Btn').addEventListener('click', () => changePage('Feed'));
        document.getElementById('DR_Feed_Back_Btn').addEventListener('click', () => changePage('Extra'));

        document.getElementById('DR_Gift_Btn').addEventListener('click', () => {
            const uname = document.getElementById('DR_Tools_User').value;
            const gtype = document.getElementById('DR_Gift_Select').getAttribute('data-value');
            sendGift(uname, gtype);
        });

        document.getElementById('DR_Friend_Btn').addEventListener('click', () => {
            const uname = document.getElementById('DR_Tools_User').value;
            const mode = document.getElementById('DR_Friend_Select').getAttribute('data-value');
            forceFriend(uname, mode);
        });


        document.getElementById('duorain-hide-button').addEventListener('click', () => {
            const togHide = document.getElementById('duorain-hide-button');
            if (togHide.dataset.dragged === '1') {
                togHide.dataset.dragged = '';
                return;
            }
            uiHidden = !uiHidden;
            const wrap = document.getElementById('DR_Main');
            const mBox = document.getElementById('DR_Main_Box');
            const lblTxt = document.getElementById('hide-show-text');

            if (uiHidden) {
                clearTimeout(hideCollapseTimer);
                togHide.classList.add('duorain-show-mode');
                lblTxt.innerText = 'Show';
                mBox.classList.add('dr-hidden');
                hideCollapseTimer = setTimeout(() => {
                    mBox.classList.add('dr-collapsed');
                    wrap.classList.add('dr-panel-hidden');
                }, 400);
            } else {
                clearTimeout(hideCollapseTimer);
                mBox.classList.remove('dr-collapsed');
                mBox.classList.remove('dr-hidden');
                togHide.classList.remove('duorain-show-mode');
                lblTxt.innerText = 'Hide';
                void mBox.offsetHeight;
                wrap.classList.remove('dr-panel-hidden');
                relayout();
            }
        });

        document.getElementById('DR_XP_Btn').addEventListener('click', () => {
            runTask('xp', 'DR_XP');
        });

        document.getElementById('DR_Gem_Btn').addEventListener('click', () => {
            runTask('gem', 'DR_Gem');
        });

        document.getElementById('DR_Streak_Btn').addEventListener('click', () => {
            runTask('streak', 'DR_Streak');
        });

        document.getElementById('DR_League_Btn').addEventListener('click', () => {
            runTask('league', 'DR_League');
        });

        document.getElementById('DR_Quest_Force_Btn').addEventListener('click', () => {
            forceQuests();
        });

        document.getElementById('DR_Block_Btn').addEventListener('click', () => {
            const name = document.getElementById('DR_Tools_User').value.trim();
            if (!name) {
                notify('warning', 'Block / Unblock', 'Please enter a username.');
                return;
            }
            const mode = document.getElementById('DR_Block_Select').getAttribute('data-value');
            blockTarget(name, mode === 'unblock');
        });

        document.getElementById('DR_FollowSingle_Btn').addEventListener('click', () => {
            const name = document.getElementById('DR_Tools_User').value.trim();
            if (!name) {
                notify('warning', 'Follow / Unfollow', 'Please enter a username.');
                return;
            }
            const mode = document.getElementById('DR_FollowSingle_Select').getAttribute('data-value');
            followTarget(name, mode === 'unfollow');
        });

        document.getElementById('DR_Follow_Btn').addEventListener('click', () => {
            if (farmStates.follow) { massFollow(); return; }
            if (farmStates.unfollow) { massUnfollow(); return; }
            const mode = document.getElementById('DR_Follow_Select').getAttribute('data-value');
            if (mode === 'unfollow') massUnfollow(); else massFollow();
        });

        document.getElementById('DR_Block_Mass_Btn').addEventListener('click', () => {
            if (farmStates.blockmass) { massBlock(); return; }
            if (farmStates.unblock) { massUnblock(); return; }
            const mode = document.getElementById('DR_BlockMass_Select').getAttribute('data-value');
            if (mode === 'unblock') massUnblock(); else massBlock();
        });

        document.getElementById('DR_Hearts_Btn').addEventListener('click', () => {
            const count = parseInt(document.getElementById('DR_Hearts_Input').value);
            if (isNaN(count) || count < 1 || count > 5) {
                notify('warning', 'Remove Hearts', 'Enter a number between 1 and 5.');
                return;
            }
            removeHearts(count);
        });

        document.getElementById('DR_Board_Status_Btn').addEventListener('click', openStatusPicker);
        document.getElementById('DR_Status_Back_Btn').addEventListener('click', () => { changePage('Board'); showLeagueBoard(); });
        document.getElementById('DR_Status_Search').addEventListener('input', (event) => {
            showStatuses(event.target.value);
        });

        const wireToggle = (id, storageKey, onChange) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.toggle('on', localStorage.getItem(storageKey) === 'true');
            el.addEventListener('click', () => {
                const now = !el.classList.contains('on');
                el.classList.toggle('on', now);
                localStorage.setItem(storageKey, now ? 'true' : 'false');
                if (typeof onChange === 'function') onChange(now);
            });
        };

        wireToggle('DR_LocalMax_Toggle', 'dr_local_max', () => notify('info', 'On-Client Max', 'Reload the page to apply the change.'));
        wireToggle('DR_AutoJoin_Toggle', 'dr_auto_join_league', () => { leagueJoinAttempted = false; });
        wireToggle('DR_AutoReach_Toggle', 'dr_auto_reach_rank', (on) => { if (on) autoReachRank(); });
        wireToggle('DR_AutoStreak_Toggle', 'dr_auto_keep_streak', (on) => { if (on) autoKeepStreak(); });
        wireToggle('DR_AutoBlock_Toggle', 'dr_auto_block_league', (on) => { if (on) autoBlockLeague(); });
        wireToggle('DR_AutoQuest_Toggle', 'dr_auto_quest_saver', (on) => { if (on) refreshQuestCenter(); });

        showStats();
        document.getElementById('DR_Stats_Reset').addEventListener('click', () => {
            for (const kind in statKeys) {
                localStorage.removeItem(statKeys[kind]);
            }
            localStorage.removeItem(statSinceKey);
            showStats();
        });

        document.getElementById('DR_Shop_Search').addEventListener('input', (event) => {
            showShop(event.target.value);
        });

        document.getElementById('DR_Quest_Search').addEventListener('input', (event) => {
            showQuests(event.target.value);
        });

        const dInp = document.getElementById('DR_Delay_Input');
        dInp.value = delayMs;

        dInp.addEventListener('change', () => {
            const nVal = parseInt(dInp.value);
            delayMs = isNaN(nVal) ? 100 : Math.min(60000, Math.max(50, nVal));
            dInp.value = delayMs;
            localStorage.setItem('dr_delay', delayMs);
        });

        const roomInp = document.getElementById('DR_XpRoom_Input');
        const rawRoom = localStorage.getItem('dr_xp_room');
        const savedRoom = (rawRoom === null) ? 30 : (parseInt(rawRoom) || 0);
        if (rawRoom === null) localStorage.setItem('dr_xp_room', '30');
        roomInp.value = savedRoom > 0 ? savedRoom : '';

        roomInp.addEventListener('change', () => {
            let rVal = parseInt(roomInp.value);
            if (isNaN(rVal) || rVal <= 0) {
                rVal = 0;
            } else {
                rVal = Math.min(500, Math.max(30, rVal));
            }
            roomInp.value = rVal > 0 ? rVal : '';
            localStorage.setItem('dr_xp_room', rVal);
        });

        const savedNotifPos = localStorage.getItem('dr_notif_pos') || 'bottom_center';
        applyNotifPos(savedNotifPos);

        window.addEventListener('resize', layoutNotif);
        window.addEventListener('resize', queueRelayout);
        window.addEventListener('orientationchange', queueRelayout);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', queueRelayout);
        }
        relayout();

        const drBox = document.getElementById('DR_Main_Box');
        if (drBox && window.MutationObserver) {
            new MutationObserver(queueRelayout).observe(drBox, { childList: true, subtree: true, characterData: true });
        }

        const drHandle = document.getElementById('duorain-hide-button');
        const drWrap = document.getElementById('DR_Main');
        if (drHandle && drWrap) {
            let dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0;
            const onDown = (e) => {
                const p = e.touches ? e.touches[0] : e;
                dragging = true;
                moved = false;
                sx = p.clientX;
                sy = p.clientY;

                clearTimeout(hideCollapseTimer);
                const mBox = document.getElementById('DR_Main_Box');
                if (mBox) {
                    const prevBoxTrans = mBox.style.transition;
                    mBox.style.transition = 'none';
                    mBox.classList.toggle('dr-hidden', uiHidden);
                    mBox.classList.toggle('dr-collapsed', uiHidden);
                    void mBox.offsetHeight;
                    mBox.style.transition = prevBoxTrans;
                }
                const prevWrapTrans = drWrap.style.transition;
                drWrap.style.transition = 'none';
                void drWrap.offsetHeight;
                drWrap.style.transition = prevWrapTrans;

                const r = drWrap.getBoundingClientRect();
                ox = r.left;
                oy = r.top;
                drWrap.style.transition = 'none';
            };
            const onMove = (e) => {
                if (!dragging) return;
                const p = e.touches ? e.touches[0] : e;
                const dx = p.clientX - sx;
                const dy = p.clientY - sy;
                if (!moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
                moved = true;
                if (e.cancelable) e.preventDefault();
                const c = clampPos(ox + dx, oy + dy);
                drWrap.style.left = c.left + 'px';
                drWrap.style.top = c.top + 'px';
                drWrap.style.right = 'auto';
                drWrap.style.bottom = 'auto';
            };
            const onUp = () => {
                if (!dragging) return;
                dragging = false;
                if (!moved) {
                    drWrap.style.transition = 'none';
                    drWrap.style.transform = '';
                    return;
                }
                drHandle.dataset.dragged = '1';
                setTimeout(() => { drHandle.dataset.dragged = ''; }, 60);
                panelCorner = nearestCorner();
                localStorage.setItem('dr_panel_corner', panelCorner);
                const first = drWrap.getBoundingClientRect();
                drWrap.style.transition = 'none';
                positionPanel();
                const last = drWrap.getBoundingClientRect();
                drWrap.style.transform = `translate(${first.left - last.left}px, ${first.top - last.top}px)`;
                void drWrap.offsetWidth;
                drWrap.style.transition = 'transform var(--DR-motion-page) var(--DR-ease)';
                drWrap.style.transform = '';
                setTimeout(() => { drWrap.style.transition = 'none'; }, DR_DRAG_SNAP_MS);
            };
            drHandle.addEventListener('mousedown', onDown);
            drHandle.addEventListener('touchstart', onDown, { passive: false });
            window.addEventListener('mousemove', onMove);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('mouseup', onUp);
            window.addEventListener('touchend', onUp);
        }

        const notifSel = document.getElementById('DR_Notif_Select');
        if (notifSel) {
            const posVal = normalizeNotifPos(savedNotifPos);
            const posLabels = { top_left: 'Top Left', top_center: 'Top Center', top_right: 'Top Right', bottom_left: 'Bottom Left', bottom_center: 'Bottom Center', bottom_right: 'Bottom Right' };
            notifSel.setAttribute('data-value', posVal);
            notifSel.querySelector('.DR_Select_Text').innerText = posLabels[posVal];
            notifSel.querySelectorAll('.DR_Select_Option').forEach((opt) => {
                opt.classList.toggle('selected', opt.getAttribute('data-value') === posVal);
            });
        }

        document.getElementById('DR_Web_Btn').addEventListener('click', () => {
            window.open('https://duorain.vercel.app', '_blank');
        });

        document.getElementById('DR_Discord_Btn').addEventListener('click', () => {
            window.open('https://discord.gg/yawq7BxJPy', '_blank');
        });

        document.getElementById('DR_GitHub_Btn').addEventListener('click', () => {
            window.open('https://github.com/OracleMythix/DuoRain-BETA', '_blank');
        });

        document.getElementById('DR_Credit_Oracle').addEventListener('click', () => {
            window.open('https://github.com/OracleMythix', '_blank');
        });

        document.getElementById('DR_Credit_Gorou').addEventListener('click', () => {
            window.open('https://github.com/oxGorou', '_blank');
        });

        const lOpts = document.querySelector('#DR_League_Select .DR_Select_Options');
        if (lOpts) {
            lOpts.innerHTML = `<div class="DR_Select_Option" style="cursor:default;opacity:0.5;">Loading rank...</div>`;
        }

        const syncMenuOpen = () => {
            const anyOpen = !!document.querySelector('.DR_Select.open');
            document.querySelectorAll('.DR_Main_Box').forEach((box) => {
                box.classList.toggle('dr-menu-open', anyOpen);
            });
        };

        document.querySelectorAll('.DR_Select_Trigger').forEach((trig) => {
            trig.addEventListener('click', (event) => {
                event.stopPropagation();
                const pSel = trig.parentElement;

                document.querySelectorAll('.DR_Select').forEach((sel) => {
                    if (sel !== pSel) sel.classList.remove('open');
                });

                if (!pSel.classList.contains('open')) {
                        const opts = pSel.querySelector('.DR_Select_Options');
                        const rect = pSel.getBoundingClientRect();
                        const box = pSel.closest('.DR_Main_Box');
                        const scrolling = box && box.classList.contains('dr-scroll');
                        const boxRect = box ? box.getBoundingClientRect() : null;
                        const bottomLimit = scrolling ? Math.min(window.innerHeight, boxRect.bottom) : window.innerHeight;
                        const topLimit = scrolling ? Math.max(0, boxRect.top) : 0;
                        const spaceBelow = bottomLimit - rect.bottom - 20;
                        const spaceAbove = rect.top - topLimit - 20;

                        const minRequired = 100;

                        if (spaceBelow < minRequired && spaceAbove > spaceBelow) {
                            pSel.classList.add('dropup');
                        } else {
                            pSel.classList.remove('dropup');
                        }

                    const currentVal = pSel.getAttribute('data-value');
                    let selOpt = null;
                    opts.querySelectorAll('.DR_Select_Option').forEach(opt => {
                        if (opt.getAttribute('data-value') === currentVal) {
                            opt.classList.add('selected');
                            selOpt = opt;
                        } else {
                            opt.classList.remove('selected');
                        }
                    });

                    pSel.classList.add('open');

                    const listMax = 128;
                    opts.scrollTop = selOpt
                        ? Math.max(0, (selOpt.offsetTop + selOpt.offsetHeight / 2) - listMax / 2)
                        : 0;
                } else {
                    pSel.classList.remove('open');
                }
                syncMenuOpen();
            });
        });

        document.addEventListener('click', (event) => {
            const oEl = event.target.closest('.DR_Select_Option');
            if (oEl) {
                event.stopPropagation();
                const pSel = oEl.closest('.DR_Select');
                const sVal = oEl.getAttribute('data-value');

                pSel.querySelector('.DR_Select_Text').innerText = oEl.innerText;
                pSel.setAttribute('data-value', sVal);
                pSel.classList.remove('open');

                pSel.querySelectorAll('.DR_Select_Option').forEach(opt => opt.classList.remove('selected'));
                oEl.classList.add('selected');

                if (pSel.id === 'DR_Privacy_Select') {
                    setPrivacy(sVal === 'private');
                }
                if (pSel.id === 'DR_Notif_Select') {
                    localStorage.setItem('dr_notif_pos', sVal);
                    applyNotifPos(sVal);
                }
                if (pSel.id === 'DR_League_Select' && sVal) {
                    localStorage.setItem('dr_league_target', sVal);
                }
                syncMenuOpen();
            } else {
                document.querySelectorAll('.DR_Select').forEach((sel) => {
                    sel.classList.remove('open');
                });
                syncMenuOpen();
            }
        });

        connect();

        window.DR_checkForUpdates = () => checkForUpdates();
        window.DR_resetUpdateCheck = () => {
            localStorage.removeItem('dr_update_available_version');
            localStorage.removeItem('dr_update_dismissed_version');
            hideUpdateBanner();
        };
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

    })();
