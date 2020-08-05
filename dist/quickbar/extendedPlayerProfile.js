parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"tQUs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=e=>parseInt(new URLSearchParams(e).get("id"));exports.default=e;
},{}],"dSAr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("../utils/getIDFromURL"));function t(e){return e&&e.__esModule?e:{default:e}}class r{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.dom=(new DOMParser).parseFromString(e,"text/html"),this.trs=this.dom.querySelectorAll("#in_a_day_ranking_table tbody tr"),this.filters=t}isValidRow(e){return!!e&&((!this.filters.playerID||e.playerID===this.filters.playerID)&&!(this.filters.tribes&&Array.isArray(this.filters.tribes)&&!this.filters.tribes.some(t=>t===e.tribe)))}parseRow(t){if(!t||!t instanceof HTMLTableRowElement)return;let r={};return r.rank=parseInt(t.children[0].innerText.trim()),r.name=t.children[1].innerText.trim(),r.playerID=(0,e.default)(t.children[1].querySelector("a").getAttribute("href")),r.tribe=t.children[2].innerText.trim(),r.tribeID=0,r.tribe&&(r.tribeID=(0,e.default)(t.children[2].querySelector("a").getAttribute("href"))),r.score=parseInt(t.children[3].innerText.trim().replace(/\./g,"")),r.date=t.children[4].innerText.trim(),r}parse(){const e=[];for(let t=1;t<this.trs.length;t++){const r=this.trs[t],i=this.parseRow(r);this.isValidRow(i)&&e.push(i)}return e}}exports.default=r;
},{"../utils/getIDFromURL":"tQUs"}],"Ph2E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.API_URI=void 0;const e="https://api.tribalwarshelp.com/graphql";exports.API_URI=e;var r=function(){let{query:r,variables:t={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return fetch(e,{method:"POST",body:JSON.stringify({query:r,variables:t}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{let{data:r,errors:t}=e;if(t&&Array.isArray(t)&&t.length>0)throw new Error(t[0].message);return new Promise(e=>e(r))})};exports.default=r;
},{}],"I8dv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{date:"Data",newTribe:"Nowe plemię",oldTribe:"Poprzednie plemię",joinedAt:"Dołączył",dailyGrowth:"Dzienny przyrost",bestRank:"Najlepszy ranking",mostPoints:"Najwięcej punktów",mostVillages:"Najwięcej wiosek",oldName:"Poprzedni nick",newName:"Nowy nick",playerServers:"Serwery gracza",inADayBestScores:"Dzienne rankingi",unitsDefeatedWhileAttacking:"Jako atakujący",unitsDefeatedWhileDefending:"Jako obrońca",unitsDefeatedWhileSupporting:"Jako wspierający",resourcesPlundered:"Sfarmione surowce",villagesPlundered:"Splądrowane wioski",resourcesGathered:"Zebrane surowce",villagesConquered:"Podbite wioski",exportedVillages:"Wyeksportowane wioski",tribeChanges:"Zmiany plemion",action:{showTribeChanges:"Pokaż zmiany plemion",showEnnoblements:"Pokaż przejęcia",exportVillages:"Wyeksportuj wioski",showHistory:"Pokaż historię"}},en_DK:{date:"Date",newTribe:"New tribe",oldTribe:"Old tribe",joinedAt:"Joined at",dailyGrowth:"Daily growth",bestRank:"Best rank",mostPoints:"Most points",mostVillages:"Most villages",oldName:"Old name",newName:"New name",playerServers:"Player's servers",inADayBestScores:"'In a day' best scores",unitsDefeatedWhileAttacking:"Units defeated while attacking",unitsDefeatedWhileDefending:"Units defeated while defending",unitsDefeatedWhileSupporting:"Units defeated while supporting",resourcesPlundered:"Resources plundered",villagesPlundered:"Villages plundered",resourcesGathered:"Resources gathered",villagesConquered:"Villages conquered",exportedVillages:"Exported villages",tribeChanges:"Tribe changes",action:{showTribeChanges:"Show tribe changes",showEnnoblements:"Show ennoblements",exportVillages:"Export villages",showHistory:"Show history"}}};var i=()=>e[window.game_data.locale]||e.en_DK;exports.default=i;
},{}],"l9PO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const a={pl_PL:{title:"Dzisiejsze zmiany w statystykach",points:"Punkty",rank:"Ranking",villages:"Liczba wiosek",members:"Liczba członków",oda:"Pokonani przeciwnicy jako agresor",odaRank:"RA",odd:"Pokonani przeciwnicy jako obrońca",oddRank:"RO",ods:"Pokonani przeciwnicy jako wspierający",odsRank:"RW",od:"Pokonani przeciwnicy",odRank:"Pokonani przeciwnicy razem ranking"},en_DK:{title:"Today's stat changes",points:"Points",rank:"Rank",villages:"Villages",members:"Members",oda:"ODA",odaRank:"ODA Rank",odd:"ODD",oddRank:"ODD Rank",ods:"ODS",odsRank:"ODS Rank",od:"OD",odRank:"OD Rank"}};var o=()=>a[window.game_data.locale]||a.en_DK;exports.default=o;
},{}],"yQib":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=e=>null==e;exports.default=e;
},{}],"yrCm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=a(require("../i18n/renderTodaysStats")),n=a(require("../utils/isNil"));function a(t){return t&&t.__esModule?t:{default:t}}const c=(0,t.default)(),o=t=>{return t>0?"color: #000; background-color: #0f0":t<0?"color: #000; background-color: #f00":"color: #000; background-color: #808080"};var r=(t,a)=>{let r=t.querySelector("#todaysStats");r||((r=document.createElement("div")).id="todaysStats",r.width="100%",t.prepend(r));const d=!(0,n.default)(a.rankSup);r.innerHTML='\n      <table width="100%" class="vis">\n        <tbody>\n          <tr>\n            <th colspan="2">\n              '.concat(c.title,"\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat(c.points,':\n              </td>\n              <td style="').concat(o(a.points),'">\n                ').concat(Math.abs(a.points).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.rank,':\n              </td>\n              <td style="').concat(o(a.rank),'">\n                ').concat(Math.abs(a.rank),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.villages,':\n              </td>\n              <td style="').concat(o(a.villages),'">\n                ').concat(Math.abs(a.villages).toLocaleString(),"\n              </td>\n            </tr>\n            ").concat(d?"":"<tr>\n              <td>\n                ".concat(c.members,':\n              </td>\n              <td style="').concat(o(a.members),'">\n                ').concat(Math.abs(a.members),"\n              </td>\n            </tr>"),"\n            <tr>\n              <td>\n                ").concat(c.oda,':\n              </td>\n              <td style="').concat(o(a.scoreAtt),'">\n                ').concat(Math.abs(a.scoreAtt).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.odaRank,':\n              </td>\n              <td style="').concat(o(a.rankAtt),'">\n                ').concat(Math.abs(a.rankAtt),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.odd,':\n              </td>\n              <td style="').concat(o(a.scoreDef),'">\n                ').concat(Math.abs(a.scoreDef).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.oddRank,':\n              </td>\n              <td style="').concat(o(a.rankDef),'">\n                ').concat(Math.abs(a.rankDef),"\n              </td>\n            </tr>\n            ").concat(d?"<tr>\n              <td>\n                ".concat(c.ods,':\n              </td>\n              <td style="').concat(o(a.scoreSup),'">\n                ').concat(Math.abs(a.scoreSup).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.odsRank,':\n              </td>\n              <td style="').concat(o(a.rankSup),'">\n                ').concat(Math.abs(a.rankSup),"\n              </td>\n            </tr>"):"","\n            <tr>\n              <td>\n                ").concat(c.od,':\n              </td>\n              <td style="').concat(o(a.scoreTotal),'">\n                ').concat(Math.abs(a.scoreTotal).toLocaleString(),"\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat(c.odRank,':\n              </td>\n              <td style="').concat(o(a.rankTotal),'">\n                ').concat(Math.abs(a.rankTotal),"\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ")};exports.default=r;
},{"../i18n/renderTodaysStats":"l9PO","../utils/isNil":"yQib"}],"chDM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e=".popup_helper",t="#inline_popup";var o=function(){let{e:e,title:o,html:n,id:l}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const i=document.querySelector(t);i&&(i.style.width="auto",i.style.maxWidth="1000px"),i.classList.contains("show")?(i.querySelector("#inline_popup_title").innerHTML=o,i.querySelector("#inline_popup_content").innerHTML=n):inlinePopup(e,l,null,{offset_x:0,offset_y:0},n,o);const p=document.querySelector(".popup_helper");p&&(p.style.width="auto",p.style.position="fixed",p.style.zIndex="50001")};exports.default=o;
},{}],"tKRp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{date:"Data",newOwner:"Nowy właściciel",oldOwner:"Stary właściciel",village:"Wioska",title:"Przejęcia"},en_DK:{date:"Date",newOwner:"New owner",oldOwner:"Old owner",village:"Village",title:"Ennoblements"}};var a=()=>e[window.game_data.locale]||e.en_DK;exports.default=a;
},{}],"fCHX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.generatePaginationItems=exports.calcNumberOfPages=exports.getPage=exports.setPage=exports.getContainerStyles=void 0;const e="data-page",t=()=>"display: flex; flex-direction: row; flex-wrap: wrap;";exports.getContainerStyles=t;const r=function(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(!t instanceof HTMLElement)throw new Error("Expected HTMLElement as the first argument");if("number"!=typeof(r=parseInt(r))||isNaN(r))throw new Error("Expected number or string as the second argument");t.setAttribute(e,r+"")};exports.setPage=r;const n=t=>!t instanceof HTMLElement?0:parseInt(t.getAttribute(e));exports.getPage=n;const o=(e,t)=>{if("number"!=typeof e)throw new Error("Expected number as the first argument");if("number"!=typeof t)throw new Error("Expected number as the second argument");return e>0?Math.ceil(e/t):1};exports.calcNumberOfPages=o;const a=function(){let{total:t,limit:r,marginRight:n=3,currentPage:a=0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const s=o(t,r),c=[];for(let o=1;o<=s;o++)o===a?c.push('<strong style="margin-right: '.concat(n,'px">>').concat(o,"<</strong>")):c.push('<a style="margin-right: '.concat(n,'px" href="#" ').concat(e,'="').concat(o,'">').concat(o,"</a>"));return c};exports.generatePaginationItems=a;
},{}],"V6Mf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=(e,t)=>new Date(e).toLocaleDateString(window.game_data.locale.replace("_","-"),t||{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});exports.default=e;
},{}],"fHHP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildImgURL=exports.calcAttackDuration=exports.formatVillageName=exports.formatVillageURL=exports.formatPlayerURL=exports.formatTribeURL=void 0;const o=o=>window.location.origin+TribalWars.buildURL("",{screen:"info_ally",id:o});exports.formatTribeURL=o;const t=o=>window.location.origin+TribalWars.buildURL("",{screen:"info_player",id:o});exports.formatPlayerURL=t;const r=o=>window.location.origin+TribalWars.buildURL("",{screen:"info_village",id:o});exports.formatVillageURL=r;const e=function(){let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;const e="K"+String(r)[0]+String(t)[0];return"".concat(o," (").concat(t,"|").concat(r,") ").concat(e)};exports.formatVillageName=e;const i=(o,t,r)=>Math.round(o*r/t);exports.calcAttackDuration=i;const a=o=>image_base+o;exports.buildImgURL=a;
},{}],"vNT1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=l(require("../i18n/showEnnoblementsPopup")),e=require("../utils/pagination"),n=l(require("../utils/showPopup")),a=l(require("../utils/formatDate")),o=require("../utils/tribalwars");function l(t){return t&&t.__esModule?t:{default:t}}const r="ennoblementsPagination",i=(0,t.default)(),c=(t,e)=>t?'<td><a href="'.concat((0,o.formatPlayerURL)(t.id),'">').concat(t.name," (").concat(e?'<a href="'.concat((0,o.formatTribeURL)(e.id),'">').concat(e.tag,"</a>"):"-",")</a></td>"):"<td>-</td>";var d=function(t,l){let{limit:d=0,currentPage:s=1,onPageChange:u=(()=>{})}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const g=(0,e.generatePaginationItems)({total:l.total,limit:d,currentPage:s}),m='\n    <div style="'.concat((0,e.getContainerStyles)(),'" id="').concat(r,'">\n      ').concat(g.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat(i.date,"\n          </th>\n          <th>\n            ").concat(i.village,"\n          </th>\n          <th>\n            ").concat(i.newOwner,"\n          </th>\n          <th>\n            ").concat(i.oldOwner,"\n          </th>\n        </tr>\n        ").concat(l.items.map(t=>{let e="<tr>"+"<td>".concat((0,a.default)(t.ennobledAt),"</td>");return t.village?e+='<td><a href="'.concat((0,o.formatVillageURL)(t.village.id),'">').concat((0,o.formatVillageName)(t.village.name,t.village.x,t.village.y),"</a></td>"):e+="<td>-</td>",e+=c(t.newOwner,t.newOwnerTribe),(e+=c(t.oldOwner,t.oldOwnerTribe))+"</tr>"}).join(""),"\n      </tbody>\n    </table>\n  ");(0,n.default)({e:t,title:i.title,id:"ennoblements",html:m}),document.querySelectorAll("#ennoblementsPagination a").forEach(t=>{t.addEventListener("click",u)})};exports.default=d;
},{"../i18n/showEnnoblementsPopup":"tKRp","../utils/pagination":"fCHX","../utils/showPopup":"chDM","../utils/formatDate":"V6Mf","../utils/tribalwars":"fHHP"}],"VYL5":[function(require,module,exports) {
"use strict";function e(e){if(null===e||!0===e||!1===e)return NaN;var r=Number(e);return isNaN(r)?r:r<0?Math.ceil(r):Math.floor(r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"kK6Q":[function(require,module,exports) {
"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"KYJg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var e=t(require("../_lib/requiredArgs/index.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(t){(0,e.default)(1,arguments);var r=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===r?new Date(t.getTime()):"number"==typeof t||"[object Number]"===r?new Date(t):("string"!=typeof t&&"[object String]"!==r||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}
},{"../_lib/requiredArgs/index.js":"kK6Q"}],"lQIY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=u(require("../_lib/toInteger/index.js")),t=u(require("../toDate/index.js")),r=u(require("../_lib/requiredArgs/index.js"));function u(e){return e&&e.__esModule?e:{default:e}}function a(u,a){(0,r.default)(2,arguments);var i=(0,t.default)(u),d=(0,e.default)(a);return isNaN(d)?new Date(NaN):d?(i.setDate(i.getDate()+d),i):i}
},{"../_lib/toInteger/index.js":"VYL5","../toDate/index.js":"KYJg","../_lib/requiredArgs/index.js":"kK6Q"}],"mRRL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=d;var e=u(require("../_lib/toInteger/index.js")),r=u(require("../addDays/index.js")),t=u(require("../_lib/requiredArgs/index.js"));function u(e){return e&&e.__esModule?e:{default:e}}function d(u,d){(0,t.default)(2,arguments);var i=(0,e.default)(d);return(0,r.default)(u,-i)}
},{"../_lib/toInteger/index.js":"VYL5","../addDays/index.js":"lQIY","../_lib/requiredArgs/index.js":"kK6Q"}],"hNDe":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={pl_PL:{title:"Historia",date:"Data",tribe:"Plemię",points:"Punkty",rank:"Ranking",villages:"Liczba wiosek",members:"Liczba członków",oda:"Pokonani przeciwnicy jako agresor",odd:"Pokonani przeciwnicy jako obrońca",ods:"Pokonani przeciwnicy jako wspierający",od:"Pokonani przeciwnicy"},en_DK:{title:"History",date:"Date",tribe:"Tribe",points:"Points",villages:"Villages",members:"Members",oda:"ODA",odd:"ODD",ods:"ODS",od:"OD"}};var o=()=>e[window.game_data.locale]||e.en_DK;exports.default=o;
},{}],"kEDU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=r(require("date-fns/subDays")),n=r(require("../i18n/showHistoryPopup")),e=r(require("../utils/showPopup")),o=require("../utils/pagination"),a=r(require("../utils/formatDate")),c=require("../utils/tribalwars");function r(t){return t&&t.__esModule?t:{default:t}}const i="historyPagination",s=(0,n.default)(),l=t=>t>0?"+"+t:t;var d=function(n,r,i){let{currentPage:d=1,limit:g=0,onPageChange:u=(()=>{}),tribe:h=!1}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};const p=(0,o.generatePaginationItems)({total:r.total,limit:g,currentPage:d}),f='\n    <div style="'.concat((0,o.getContainerStyles)(),'" id="').concat("historyPagination",'">\n      ').concat(p.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat(s.date,"\n          </th>\n          ").concat(h?"":"<th>".concat(s.tribe,"</th>"),"\n          <th>\n          ").concat(s.points,"\n          </th>\n          <th>\n          ").concat(s.villages,"\n          </th>\n          ").concat(h?"<th>".concat(s.members,"</th>"):"","\n          <th>\n            ").concat(s.od,"\n          </th>\n          <th>\n            ").concat(s.oda,"\n          </th>\n          <th>\n            ").concat(s.odd,"\n          </th>\n          ").concat(h?"":"<th>".concat(s.ods,"</th>"),"\n        </tr>\n        ").concat(r.items.map(n=>{const e=(0,t.default)(new Date(n.createDate),1).toISOString().split(".")[0]+"Z",o=i.items.find(t=>t.createDate===e);let r="<tr>"+"<td>".concat((0,a.default)(n.createDate,{year:"numeric",month:"2-digit",day:"2-digit"}),"</td>");return!h&&n.tribe?r+='<td><a href="'.concat((0,c.formatTribeURL)(n.tribe.id),'">').concat(n.tribe.tag,"</a></td>"):h||(r+="<td>-</td>"),r+='\n              <td title="'.concat(o?l(o.points):"",'">\n                ').concat(n.points.toLocaleString()," (<strong>").concat(n.rank,'</strong>)\n              </td>\n              <td title="').concat(o?l(o.villages):"",'">\n                ').concat(n.totalVillages.toLocaleString(),"\n              </td>\n              ").concat(h?'\n                  <td title="'.concat(o?l(o.members):"",'">\n                    ').concat(n.totalMembers,"\n                </td>\n              "):"",'\n              <td title="').concat(o?l(o.scoreTotal):"",'">\n                ').concat(n.scoreTotal.toLocaleString()," (<strong>").concat(n.rankTotal,'</strong>)\n              </td>\n              <td title="').concat(o?l(o.scoreAtt):"",'">\n                ').concat(n.scoreAtt.toLocaleString()," (<strong>").concat(n.rankAtt,'</strong>)\n              </td>\n              <td title="').concat(o?l(o.scoreDef):"",'">\n                ').concat(n.scoreDef.toLocaleString()," (<strong>").concat(n.rankDef,"</strong>)\n              </td>\n              ").concat(h?"":'\n                  <td title="'.concat(o?l(o.scoreSup):"",'">\n                    ').concat(n.scoreSup.toLocaleString()," (<strong>").concat(n.rankSup,"</strong>)\n                </td>\n              "),"\n            ")+"</tr>"}).join(""),"\n      </tbody>\n    </table>\n  ");(0,e.default)({e:n,title:s.title,id:"history",html:f}),document.querySelectorAll("#historyPagination a").forEach(t=>{t.addEventListener("click",u)})};exports.default=d;
},{"date-fns/subDays":"mRRL","../i18n/showHistoryPopup":"hNDe","../utils/showPopup":"chDM","../utils/pagination":"fCHX","../utils/formatDate":"V6Mf","../utils/tribalwars":"fHHP"}],"DMkL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=()=>window.location.host.split(".")[0];exports.default=e;
},{}],"Syko":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.formatPlayerURL=void 0;const t=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"http://www.twstats.com/in/".concat(t,"/player/").concat(e)};exports.formatPlayerURL=t;
},{}],"KWxH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setItem=exports.getItem=void 0;const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const o=localStorage.getItem(e);let s=t;return o&&(s=JSON.parse(o)),s};exports.getItem=e;const t=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))};exports.setItem=t;
},{}],"yRop":[function(require,module,exports) {
"use strict";var e=m(require("./libs/InADayParser")),t=m(require("./libs/requestCreator")),n=m(require("./i18n/extendedPlayerProfile")),r=m(require("./common/renderTodaysStats")),a=m(require("./utils/showPopup")),i=m(require("./common/showEnnoblementsPopup")),o=m(require("./common/showHistoryPopup")),l=require("./utils/pagination"),c=m(require("./utils/getIDFromURL")),s=m(require("./utils/getCurrentServer")),d=m(require("./utils/formatDate")),y=require("./utils/twstats"),u=require("./utils/tribalwars"),p=require("./utils/localStorage");function m(e){return e&&e.__esModule?e:{default:e}}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach(function(t){h(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){if(null==e)return{};var n,r,a=v(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function v(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}const w=(0,s.default)();let D=(0,c.default)(window.location.search);const S=parseInt(game_data.player.id);!isNaN(D)&&D||(D=S);const P="kichiyaki_extended_player_profile"+D,A="\n    query player($server: String!, $id: Int!, $filter: DailyPlayerStatsFilter) {\n        player(server: $server, id: $id) {\n            id\n            name\n            bestRank\n            bestRankAt\n            mostPoints\n            mostPointsAt\n            mostVillages\n            mostVillagesAt\n            servers\n            joinedAt\n            nameChanges {\n                oldName\n                newName\n                changeDate\n            }\n            dailyGrowth\n        }\n        dailyPlayerStats(server: $server, filter: $filter) {\n            items {\n              rank\n              rankAtt\n              rankDef\n              rankSup\n              rankTotal\n              points\n              scoreAtt\n              scoreAtt\n              scoreDef\n              scoreSup\n              scoreTotal\n              villages\n            }\n        }\n    }\n",k="\n    query tribeChanges($server: String!, $filter: TribeChangeFilter!) {\n      tribeChanges(server: $server, filter: $filter) {\n        total\n        items {\n          oldTribe {\n            id\n            tag\n          }\n          newTribe {\n            id\n            tag\n          }\n          createdAt\n        }\n      }\n    }\n",q="tribeChangesPagination",O=15,T="\nquery playerHistoryAndPlayerDailyStats($server: String!,\n     $playerHistoryFilter: PlayerHistoryFilter!,\n     $dailyPlayerStatsFilter: DailyPlayerStatsFilter!) {\n  playerHistory(server: $server, filter: $playerHistoryFilter) {\n    total\n    items {\n      totalVillages\n      points\n      rank\n      scoreAtt\n      rankAtt\n      scoreDef\n      rankDef\n      scoreSup\n      rankSup\n      scoreTotal\n      rankTotal\n      tribe {\n        id\n        tag\n      }\n      createDate\n    }\n  }\n  dailyPlayerStats(server: $server, filter: $dailyPlayerStatsFilter) {\n    items {\n        points\n        scoreAtt\n        scoreAtt\n        scoreDef\n        scoreSup\n        scoreTotal\n        villages\n        createDate\n      }\n    }\n}\n",E=15,L="\n    query ennoblements($server: String!, $filter: EnnoblementFilter!) {\n      ennoblements(server: $server, filter: $filter) {\n        total\n        items {\n          village {\n            id\n            name\n            x\n            y\n          }\n          oldOwner {\n            id\n            name\n          }\n          oldOwnerTribe {\n            id\n            tag\n          }\n          newOwner {\n            id\n            name\n          }\n          newOwnerTribe {\n            id\n            tag\n          }\n          ennobledAt\n        }\n      }\n    }\n",C=15,j=document.querySelector("#player_info > tbody"),_=D===S?j:document.querySelector("#content_value > table > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody"),I=document.querySelector(D===S?"#content_value > table:nth-child(7) > tbody > tr > td:nth-child(2)":"#content_value > table > tbody > tr > td:nth-child(2)"),$=(0,n.default)(),H=()=>(0,p.getItem)(P),N=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,p.setItem)(P,e)},R=async function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{name:r}=n,a=b(n,["name"]);try{const n=await fetch(TribalWars.buildURL("",{screen:"ranking",mode:"in_a_day",type:t,name:r||""})),o=await n.text();if(!o)throw new Error;const l=new e.default(o,a).parse();if(0===l.length)throw new Error;return l[0]}catch(i){return{rank:0,playerID:0,score:0,tribeID:0,tribe:"",date:new Date}}},x=async()=>{const e=await(0,t.default)({query:A,variables:{server:w,id:D,filter:{sort:"createDate DESC",limit:1,playerID:[D]}}});if(e.player){const t={};t.att=await R("kill_att",{name:e.player.name,playerID:e.player.id}),t.def=await R("kill_def",{name:e.player.name,playerID:e.player.id}),t.sup=await R("kill_sup",{name:e.player.name,playerID:e.player.id}),t.lootRes=await R("loot_res",{name:e.player.name,playerID:e.player.id}),t.lootVil=await R("loot_vil",{name:e.player.name,playerID:e.player.id}),t.scavenge=await R("scavenge",{name:e.player.name,playerID:e.player.id}),t.conquer=await R("conquer",{name:e.player.name,playerID:e.player.id}),e.player.inADay=t}return N(e),e},F=e=>{let{title:t,data:n,id:r}=e,a=document.querySelector("#"+r);a||((a=document.createElement("tr")).id=r,a.appendChild(document.createElement("td")),a.appendChild(document.createElement("td")),j.append(a)),a.children[0].innerHTML=t,a.children[1].innerHTML=n},M=e=>{let t=document.querySelector("#playerServers");t||((t=document.createElement("table")).id="playerServers",t.classList.add("vis"),t.width="100%",t.innerHTML="\n     <tbody>\n        <tr>\n          <th>\n            ".concat($.playerServers,"\n          </th>\n        </tr>\n        <tr>\n          <td>\n          </td>\n        </tr>\n     </tbody>\n    "),I.prepend(t)),t.querySelector("td").innerHTML=e.servers.sort().map(t=>'<a target="_blank" rel="noopener noreferrer" style="margin-right: 5px" href="'.concat((0,y.formatPlayerURL)(t,e.id),'">').concat(t,"</a>")).join("")},V=e=>{let t=document.querySelector("#playerOtherNames");t||((t=document.createElement("div")).id="playerOtherNames",t.width="100%",I.prepend(t)),t.innerHTML='\n      <table width="100%" class="vis">\n        <tbody>\n          <tr>\n            <th>\n            '.concat($.oldName,"\n            </th>\n            <th>\n            ").concat($.newName,"\n            </th>\n            <th>\n            ").concat($.date,"\n            </th>\n          </tr>\n        ").concat(e.nameChanges.map(e=>"\n            <tr>\n              <td>\n                ".concat(e.oldName,"\n              </td>\n              <td>\n                ").concat(e.newName,"\n              </td>\n              <td>\n                ").concat((0,d.default)(e.changeDate,{year:"numeric",month:"2-digit",day:"2-digit"}),"\n              </td>\n            </tr>\n          ")).join(""),"\n      </tbody>\n      </table>\n  ")},U=e=>{let t=document.querySelector("#inADayRanks");t||((t=document.createElement("div")).id="inADayRanks",t.width="100%",I.prepend(t)),t.innerHTML='\n      <table width="100%" class="vis">\n        <tbody>\n          <tr>\n            <th colspan="2">\n              '.concat($.inADayBestScores,"\n            </th>\n          </tr>\n            <tr>\n              <td>\n                ").concat($.unitsDefeatedWhileAttacking,"\n              </td>\n              <td>\n                ").concat(e.inADay.att.score.toLocaleString()," (").concat(e.inADay.att.rank,".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($.unitsDefeatedWhileDefending,"\n              </td>\n              <td>\n                ").concat(e.inADay.def.score.toLocaleString()," (").concat(e.inADay.def.rank,".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($.unitsDefeatedWhileSupporting,"\n              </td>\n              <td>\n                ").concat(e.inADay.sup.score.toLocaleString()," (").concat(e.inADay.sup.rank,".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($.resourcesPlundered,"\n              </td>\n              <td>\n                ").concat(e.inADay.lootRes.score.toLocaleString()," (").concat(e.inADay.lootRes.rank,".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($.villagesPlundered,"\n              </td>\n              <td>\n                ").concat(e.inADay.lootVil.score.toLocaleString()," (").concat(e.inADay.lootVil.rank,".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($.resourcesGathered,"\n              </td>\n              <td>\n                ").concat(e.inADay.scavenge.score.toLocaleString()," (").concat(e.inADay.scavenge.rank,".)\n              </td>\n            </tr>\n            <tr>\n              <td>\n                ").concat($.villagesConquered,"\n              </td>\n              <td>\n                ").concat(e.inADay.conquer.score.toLocaleString()," (").concat(e.inADay.conquer.rank,".)\n              </td>\n            </tr>\n      </tbody>\n      </table>\n  ")},G=e=>{let{player:t,dailyPlayerStats:n}=e;[{title:$.joinedAt+":",data:(0,d.default)(t.joinedAt),id:"joined_at"},{title:$.dailyGrowth+":",data:t.dailyGrowth.toLocaleString(),id:"dg"},{title:$.bestRank+":",data:t.bestRank+" "+"(".concat((0,d.default)(t.bestRankAt),")"),id:"best_rank"},{title:$.mostPoints+":",data:t.mostPoints.toLocaleString()+" "+"(".concat((0,d.default)(t.mostPointsAt),")"),id:"most_points"},{title:$.mostVillages+":",data:t.mostVillages+" "+"(".concat((0,d.default)(t.mostVillagesAt),")"),id:"most_villages"}].forEach(e=>{F(e)}),U(t),n&&n.items.length>0&&(0,r.default)(I,n.items[0]),t.nameChanges.length>0&&V(t),t.servers.length>0&&M(t)},W=(e,t,n)=>{const r=(0,l.generatePaginationItems)({total:n.total,limit:15,currentPage:t}),i='\n    <div style="'.concat((0,l.getContainerStyles)(),'" id="').concat("tribeChangesPagination",'">\n      ').concat(r.join(""),'\n    </div>\n    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">\n      <tbody>\n        <tr>\n          <th>\n            ').concat($.date,"\n          </th>\n          <th>\n            ").concat($.newTribe,"\n          </th>\n          <th>\n            ").concat($.oldTribe,"\n          </th>\n        </tr>\n        ").concat(n.items.map(e=>{let t="<tr>"+"<td>".concat((0,d.default)(e.createdAt),"</td>");return e.newTribe?t+='<td><a href="'.concat((0,u.formatTribeURL)(e.newTribe.id),'">').concat(e.newTribe.tag,"</a></td>"):t+="<td>-</td>",e.oldTribe?t+='<td><a href="'.concat((0,u.formatTribeURL)(e.oldTribe.id),'">').concat(e.oldTribe.tag,"</a></td>"):t+="<td>-</td>",t+"</tr>"}).join(""),"\n      </tbody>\n    </table>\n  ");(0,a.default)({e:e,title:$.tribeChanges,id:"tribeChanges",html:i}),document.querySelectorAll("#tribeChangesPagination a").forEach(e=>{e.addEventListener("click",B)})},B=async e=>{e.preventDefault();const n=(0,l.getPage)(e.target);if(!isNaN(n)){const r=await(0,t.default)({query:k,variables:{filter:{playerID:[D],offset:15*(n-1),limit:15,sort:"createdAt DESC"},server:w}});W(e,n,r.tribeChanges)}},z=async e=>{e.preventDefault();const n=(0,l.getPage)(e.target);if(!isNaN(n))try{const a={playerID:[D],offset:15*(n-1),limit:15,sort:"createDate DESC"},{playerHistory:i,dailyPlayerStats:l}=await(0,t.default)({query:T,variables:{server:w,playerHistoryFilter:a,dailyPlayerStatsFilter:f(f({},a),{},{offset:a.offset+1})}});(0,o.default)(e,i,l,{currentPage:n,limit:15,onPageChange:z,tribe:!1})}catch(r){console.log("cannot load player history",r)}},J=async e=>{e.preventDefault();const n=(0,l.getPage)(e.target);if(!isNaN(n)){const r=await(0,t.default)({query:L,variables:{filter:{or:{oldOwnerID:[D],newOwnerID:[D]},offset:15*(n-1),limit:15,sort:"ennobledAt DESC"},server:w}});(0,i.default)(e,r.ennoblements,{currentPage:n,limit:15,onPageChange:J})}},K=e=>{e.preventDefault(),Dialog.show($.exportedVillages,"<textarea cols=30 rows=8 readonly>".concat(document.querySelector("#villages_list").innerHTML.match(/(\d+)\|(\d+)/g).join(" "),"</textarea>"))},Q=e=>{const t=document.createElement("td");t.colSpan="2",t.append(e);const n=document.createElement("tr");return n.appendChild(t),n},X=()=>{const e=document.createElement("a");e.href="#",(0,l.setPage)(e,"1"),e.innerHTML=$.action.showTribeChanges,e.addEventListener("click",B),_.appendChild(Q(e));const t=document.createElement("a");t.href="#",(0,l.setPage)(t,"1"),t.innerHTML=$.action.showHistory,t.addEventListener("click",z),_.appendChild(Q(t));const n=document.createElement("a");n.href="#",(0,l.setPage)(n,"1"),n.innerHTML=$.action.showEnnoblements,n.addEventListener("click",J),_.appendChild(Q(n));const r=document.createElement("a");r.href="#",r.innerHTML=$.action.exportVillages,r.addEventListener("click",K),_.appendChild(Q(r))};!async function(){try{X();const t=H();t&&t.player&&G(t);const n=await x();n&&G(n)}catch(e){console.log("extended player profile",e)}}();
},{"./libs/InADayParser":"dSAr","./libs/requestCreator":"Ph2E","./i18n/extendedPlayerProfile":"I8dv","./common/renderTodaysStats":"yrCm","./utils/showPopup":"chDM","./common/showEnnoblementsPopup":"vNT1","./common/showHistoryPopup":"kEDU","./utils/pagination":"fCHX","./utils/getIDFromURL":"tQUs","./utils/getCurrentServer":"DMkL","./utils/formatDate":"V6Mf","./utils/twstats":"Syko","./utils/tribalwars":"fHHP","./utils/localStorage":"KWxH"}]},{},["yRop"], null)