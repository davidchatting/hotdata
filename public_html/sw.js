if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,p)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let l={};const n=e=>a(e,c),o={module:{uri:c},exports:l,require:n};s[c]=Promise.all(i.map((e=>o[e]||n(e)))).then((e=>(p(...e),l)))}}define(["./workbox-cffbb336"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"icon.png",revision:"40e3ceea5b2ba1e2ed32b419968abad1"},{url:"icons/apple-icon-180.png",revision:"bfc24eabe101bed70fa66a85d9aba320"},{url:"icons/apple-splash-1125-2436.jpg",revision:"55d997a547cc810ea22658cba4f7ea28"},{url:"icons/apple-splash-1136-640.jpg",revision:"1e410fe6ab8760ad1cfec672bd190105"},{url:"icons/apple-splash-1170-2532.jpg",revision:"b8c3092d04b248b7afbcd95f96c5bce6"},{url:"icons/apple-splash-1179-2556.jpg",revision:"aff79e8498690b4241f4a8035bc7e067"},{url:"icons/apple-splash-1242-2208.jpg",revision:"95911a5db5f4d01c9030e32f6f93b415"},{url:"icons/apple-splash-1242-2688.jpg",revision:"6dcfa9ee202f95722235e357034c2e37"},{url:"icons/apple-splash-1284-2778.jpg",revision:"fdbc673a7f6db5973ec91b7eb43aded7"},{url:"icons/apple-splash-1290-2796.jpg",revision:"824ac3a40b6c2698dfcab7e2174930a1"},{url:"icons/apple-splash-1334-750.jpg",revision:"52bd8437d4462e34db02957d386b9f5f"},{url:"icons/apple-splash-1488-2266.jpg",revision:"da6605944cedfc8f8d594bb2b215fc4a"},{url:"icons/apple-splash-1536-2048.jpg",revision:"b770484be6166af5ab3b0521d0d0d9e9"},{url:"icons/apple-splash-1620-2160.jpg",revision:"4643872f7057f9339996d0f386302111"},{url:"icons/apple-splash-1640-2360.jpg",revision:"05f098ebeaaa85e1045890997af6d8f4"},{url:"icons/apple-splash-1668-2224.jpg",revision:"0a6e52e4afd28538df85648d69aa1cb9"},{url:"icons/apple-splash-1668-2388.jpg",revision:"3fde7522054c20fd175cb09fab90ddf1"},{url:"icons/apple-splash-1792-828.jpg",revision:"cdb07327153aef968c4738c5b040dd8d"},{url:"icons/apple-splash-2048-1536.jpg",revision:"2e4932a569a13993ee0332b5c3625f1c"},{url:"icons/apple-splash-2048-2732.jpg",revision:"2830a70666f06c148156b19ac1bdcaef"},{url:"icons/apple-splash-2160-1620.jpg",revision:"6b87f0a96be2002d7b3d65b26556f934"},{url:"icons/apple-splash-2208-1242.jpg",revision:"cc928db8c3ee8a3486835aba84a58725"},{url:"icons/apple-splash-2224-1668.jpg",revision:"b4f70daa744d8fc1d6b483514e5e7747"},{url:"icons/apple-splash-2266-1488.jpg",revision:"a4e0c9f60e254eea1d9b5b42608b71bc"},{url:"icons/apple-splash-2360-1640.jpg",revision:"e8957c094542591a6c1a0de0963cfdd8"},{url:"icons/apple-splash-2388-1668.jpg",revision:"effd86c993ecc74247fe4899136d1b9e"},{url:"icons/apple-splash-2436-1125.jpg",revision:"b2b34839a4202f460397b1b2a855d98b"},{url:"icons/apple-splash-2532-1170.jpg",revision:"11ab95fd22ead22bd78abdfbd59493e8"},{url:"icons/apple-splash-2556-1179.jpg",revision:"dbb19fc01513615942794aaf37c28a45"},{url:"icons/apple-splash-2688-1242.jpg",revision:"b658eb244bda8e40156712cb78350af6"},{url:"icons/apple-splash-2732-2048.jpg",revision:"ac3c81034dc8eda7db32bc0fb1ecb0d0"},{url:"icons/apple-splash-2778-1284.jpg",revision:"8d4dc59e0280710cbef8cc39ba8c0415"},{url:"icons/apple-splash-2796-1290.jpg",revision:"85401edc0a9e6ea6fc955a654f167411"},{url:"icons/apple-splash-640-1136.jpg",revision:"431f1a008eada60ea3306aa64d7b8050"},{url:"icons/apple-splash-750-1334.jpg",revision:"45c582ecb54e2a705488d7f61aa15e68"},{url:"icons/apple-splash-828-1792.jpg",revision:"487dc568fc5537f82dad3d82d2870701"},{url:"icons/manifest-icon-192.maskable.png",revision:"ac68bba80f3ad434835db0dcffc70b12"},{url:"icons/manifest-icon-512.maskable.png",revision:"01e22bdb375bad84415ad7f88b6b7790"},{url:"index.html",revision:"5e96f422e51aaed2b9a5318b96074b58"},{url:"manifest.json",revision:"bd19ee259099e66664b019826016fa84"},{url:"p5.sound.min.js",revision:"9cec1d36591e4906a2c9fe3ea49c9684"},{url:"package.json",revision:"7379aab003c60efdccbdb17c51f36dfd"},{url:"sketch.js",revision:"c4c1b7a8d03611c54d7b09d88d7becbd"},{url:"style.css",revision:"04b6ae48f7f11372dd49811705dff3e4"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
