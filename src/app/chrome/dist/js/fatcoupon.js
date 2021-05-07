 /**************************
 * File: js/fatcoupon.js   *
 * Time: 07.05.21 18:10:07 *
 * Host: iMac-P            *
 * User: chase             *
 **************************/

(()=>{var __webpack_exports__={};function start(){chrome.runtime.sendMessage({action:0}),chrome.runtime.onConnect.addListener((e=>{"fatcoupon"===e.name&&e.onMessage.addListener(onMessage)}))}async function onMessage(message,port){let disconnected=!1;port.onDisconnect.addListener((()=>{disconnected=!0}));let codeLog=(message.code.trim()||"").slice(0,300)+"...";switch(console.group(`fatcoupon.js @ ${message.action}() @ ${formatTime(new Date)}`),console.log(`%ctype:%c "${message.type}"`,"font-weight: 700;",""),console.log(`%ccode:%c\n${codeLog}`,"font-weight: 700;",""),console.groupEnd(),message.action){case"evalJS":try{let resolve=e=>{disconnected||port.postMessage(e)},codeFunc=eval("(async () => {"+message.code+"})");await codeFunc()}catch(e){debugger;console.error("*** FATCOUPON ERROR ***\n",e,"\n*** FATCOUPON ERROR ***"),port.postMessage({error:{message:e.message,name:e.name,stack:e.stack}})}}}const repeat=(e,o)=>new Array(o+1).join(e),pad=(e,o)=>repeat("0",o-e.toString().length)+e,formatTime=e=>`${pad(e.getHours(),2)}:${pad(e.getMinutes(),2)}:${pad(e.getSeconds(),2)}.${pad(e.getMilliseconds(),3)}`;start()})();