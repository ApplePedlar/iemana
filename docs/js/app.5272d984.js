(function(t){function e(e){for(var a,r,s=e[0],l=e[1],c=e[2],d=0,f=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},i={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"029a":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"top"},[n("h1",[t._v("いえでまなぼう！")]),n("div",{staticClass:"about"},[t._v("無料学習動画リンク集")]),n("v-app",[n("v-container",[n("v-select",{staticClass:"mx-5",attrs:{items:t.schoolYears,label:"小学1年"===t.schoolYear?"がくねん":"学年",outlined:""},model:{value:t.schoolYear,callback:function(e){t.schoolYear=e},expression:"schoolYear"}}),n("div",{staticClass:"d-flex align-end flex-column mr-2"},[n("button",{on:{click:function(e){e.stopPropagation(),t.filterDialog=!0}}},[n("v-icon",{attrs:{size:"medium"}},[t._v("mdi-filter")]),n("span",{staticClass:"filter-label"},[t._v("教材シリーズフィルタ設定")])],1),n("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.filterDialog,callback:function(e){t.filterDialog=e},expression:"filterDialog"}},[t.filterDialog?n("v-card",[n("v-toolbar",{staticClass:"mb-10",attrs:{dark:"",color:"primary"}},[n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.filterDialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1),n("v-toolbar-title",[t._v("教材シリーズフィルタ設定")])],1),t._l(Object.keys(t.seriesFilter),(function(e){return n("v-checkbox",{key:e,staticClass:"mx-5",attrs:{label:e},model:{value:t.seriesFilter[e],callback:function(n){t.$set(t.seriesFilter,e,n)},expression:"seriesFilter[series]"}})}))],2):t._e()],1)],1)],1),n("v-data-table",{staticClass:"table",attrs:{headers:t.tableHeaders,"hide-default-footer":!0,items:t.tableData,"items-per-page":-1,"mobile-breakpoint":0},scopedSlots:t._u([{key:"item.info",fn:function(e){var a=e.item;return[n("v-icon",{on:{click:function(e){return e.stopPropagation(),t.showInfoDialog(a)}}},[t._v("mdi-information-outline")])]}},{key:"item.thumbnail",fn:function(e){var a=e.item;return[t.getThumbnailUrl(a)?n("img",{staticClass:"thumbnail",attrs:{src:t.getThumbnailUrl(a),onerror:"this.src = 'nothumbnail.png';"},on:{click:function(e){return t.playVideo(a)}}}):n("v-icon",{on:{click:function(e){return t.playVideo(a)}}},[t._v("mdi-information-outline")])]}},{key:"item.タイトル",fn:function(e){var a=e.item;return[n("a",{staticClass:"watch",on:{click:function(e){return t.playVideo(a)}}},[t._v(t._s(a["タイトル"]))])]}},{key:"item.understanding",fn:function(e){var a=e.item;return[n("button",{staticClass:"understanding-icon",on:{click:function(e){return t.showUnderstandingDialog(a)}}},[t._v(t._s(t.getStars(a)))])]}}])}),n("v-dialog",{attrs:{"max-width":"600px"},model:{value:t.infoDialog,callback:function(e){t.infoDialog=e},expression:"infoDialog"}},[t.itemForInfoDialog?n("v-card",[n("v-toolbar",{staticClass:"mb-5",attrs:{dark:"",color:"primary"}},[n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.infoDialog=!1}}},[n("v-icon",[t._v("mdi-close")])],1),n("v-toolbar-title",[t._v(t._s(t.itemForInfoDialog["タイトル"]))])],1),t.getThumbnailUrl(t.itemForInfoDialog)?n("img",{staticClass:"info",attrs:{src:t.getThumbnailUrl(t.itemForInfoDialog),onerror:"this.src = 'nothumbnail.png';"}}):t._e(),t._l(Object.keys(t.itemForInfoDialog),(function(e){return[t.itemForInfoDialog[e]?n("v-card-text",[t._v(t._s(e)+": "),e.indexOf("URL")>=0?[n("a",{attrs:{href:t.itemForInfoDialog[e],target:"_blank"}},[t._v(t._s(t.itemForInfoDialog[e]))])]:[t._v(t._s(t.itemForInfoDialog[e]))]],2):t._e()]}))],2):t._e()],1),n("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.understandingDialog,callback:function(e){t.understandingDialog=e},expression:"understandingDialog"}},[t.itemForUnderstandingDialog?n("v-card",[n("v-card-title",[n("span",[t._v(t._s(t.itemForUnderstandingDialog["タイトル"]))])]),n("v-card-text",[t._v("どうでしたか？")]),t._l(t.understandingIconText,(function(e,a){return n("v-card-text",{key:a},[n("v-btn",{staticClass:"ml-10",attrs:{"min-width":"260"},on:{click:function(e){return t.setUnderstanding(5-a)}}},[n("span",{staticClass:"understanding-icon"},[t._v(t._s(e.icon))]),t._v(t._s(e.text))])],1)}))],2):t._e()],1)],1),t._m(0)],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"credit"},[t._v("Credit"),n("div",{staticClass:"project-home"},[t._v("APP: "),n("a",{attrs:{href:"https://creativecommons.org/licenses/by/4.0/deed.ja",target:"_new"}},[t._v("CC BY")]),t._v(" "),n("a",{attrs:{href:"https://twitter.com/ApplePedlar"}},[t._v("@ApplePedlar")]),t._v(" / "),n("a",{attrs:{href:"https://github.com/ApplePedlar/iemana",target:"_new"}},[t._v("iemana(src on GitHub)")])]),n("div",{staticClass:"data-source"},[t._v("DATA: "),n("a",{attrs:{href:"https://creativecommons.org/licenses/by/4.0/deed.ja",target:"_new"}},[t._v("CC BY")]),t._v(" "),n("a",{attrs:{href:"https://fukuno.jig.jp/2820",target:"_new"}},[t._v("「fukuno.jig.jp 時間割ガチャ - 教材オープンデータあつめ始めました」")])])])}],r=(n("4de4"),n("4160"),n("c975"),n("d81d"),n("b64b"),n("d3b7"),n("ac1f"),n("6062"),n("8a79"),n("3ca3"),n("2ca0"),n("498a"),n("159b"),n("ddb0"),n("bc3a")),s=n.n(r),l={data:function(){return{sourceUrl:"https://code4fukui.github.io/timetable/data/funs.json",schoolYear:"小学1年",schoolYears:[{text:"いちねんせい",value:"小学1年"},"小学2年","小学3年","小学4年","小学5年","小学6年","中学1年","中学2年","中学3年","高校1年","高校2年","高校3年","大人"],tableHeaders:[{text:"詳細",value:"info",width:10},{text:"サムネイル",value:"thumbnail",width:10},{text:"科目",value:"科目",class:"subject"},{text:"タイトル",value:"タイトル"},{text:"理解度",value:"understanding",class:"understanding"}],tmData:[],tableData:[],infoDialog:!1,itemForInfoDialog:null,understandingDialog:!1,itemForUnderstandingDialog:null,understandingIconText:[{icon:"💯",text:"よくわかった"},{icon:"😄",text:"だいたいわかった"},{icon:"😑",text:"はんぶんくらいわかった"},{icon:"😥",text:"あまりわからなかった"},{icon:"😨",text:"ぜんぜんわからん"},{icon:"🙈",text:"まだみてない"}],seriesFilter:{},filterDialog:!1}},mounted:function(){var t=this;document.querySelector("meta[name='viewport']").setAttribute("content","width=500"),this.loadSchoolYear(),s.a.get(this.sourceUrl).then((function(e){t.tmData=e.data,t.loadUnderstanding(),t.loadFilteringSetting(),t.makeTableData()}))},methods:{loadSchoolYear:function(){var t=this,e=window.localStorage.getItem("schoolYear");this.schoolYears.forEach((function(n){e!==n&&e!==n.value||(t.schoolYear=e)}))},playVideo:function(t){window.open(t.URL),this.showUnderstandingDialog(t)},makeTableData:function(){var t=this;this.tableData=this.tmData.filter((function(e){return t.isTargetContent(e)&&(!e["言語"]||e["言語"].indexOf("日本語")>=0)&&("動画"===e["教材種別"]||e["URL"].indexOf("youtu")>=0)&&!e["URL"].endsWith(".pdf")})),"小学1年"===this.schoolYear&&this.conversionToKana()},conversionToKana:function(){var t={"国語":"こくご","算数":"さんすう","生活":"せいかつ","図工":"ずこう","図画工作":"ずこう","社会":"しゃかい","音楽":"おんがく","体育":"たいいく"};this.tableData.map((function(e){var n=t[e["科目"].trim()];n&&(e["科目"]=n)}))},showInfoDialog:function(t){this.itemForInfoDialog=t,this.infoDialog=!0},getStars:function(t){t.understanding;return this.understandingIconText[5-(t.understanding||0)].icon},showUnderstandingDialog:function(t){this.itemForUnderstandingDialog=t,this.understandingDialog=!0},setUnderstanding:function(t){this.itemForUnderstandingDialog.understanding=t,this.understandingDialog=!1,window.localStorage.setItem("understanding-"+this.itemForUnderstandingDialog.URL,t),this.makeTableData()},loadUnderstanding:function(){this.tmData.forEach((function(t){t.understanding=window.localStorage.getItem("understanding-"+t.URL)}))},loadFilteringSetting:function(){var t=this,e=new Set;this.tmData.forEach((function(t){e.add(t["教材シリーズ名"])})),e.forEach((function(e){e.indexOf("プログラミング")>=0||e.indexOf("PCN")>=0?t.seriesFilter[e]=!1:t.seriesFilter[e]=!0;var n=window.localStorage.getItem("series-filter-"+e);null!=n&&(t.seriesFilter[e]="true"===n)}))},isTargetContent:function(t){var e=t["対象"];t["科目"];return!!this.seriesFilter[t["教材シリーズ名"]]&&(e.indexOf(this.schoolYear)>=0||(!!(this.schoolYear.startsWith("小学")&&("小学生"===e||"小中学生"===e)||this.schoolYear.startsWith("中学")&&("中学生"===e||"中高生"===e)||this.schoolYear.startsWith("高校")&&("高校生"===e||"中高生"===e))||void 0))},getThumbnailUrl:function(t){var e=this.getYoutubeId(t.URL);return e?"https://img.youtube.com/vi/".concat(e,"/mqdefault.jpg"):"./nothumbnail.png"},getYoutubeId:function(t){for(var e=[/https:\/\/youtu\.be\/([0-9a-zA-Z_\-]+)/,/https:\/\/www\.youtube\.com\/(?:embed\/|watch\?v=)([0-9a-zA-Z_\-]+)/],n=0;n<e.length;n++){var a=e[n].exec(t);if(a)return a[1]}}},watch:{schoolYear:function(){window.localStorage.setItem("schoolYear",this.schoolYear),this.makeTableData()},filterDialog:function(){var t=this;this.filterDialog||(Object.keys(this.seriesFilter).forEach((function(e){window.localStorage.setItem("series-filter-"+e,t.seriesFilter[e])})),this.makeTableData())}}},c=l,u=(n("cf25"),n("2877")),d=n("6544"),f=n.n(d),g=n("7496"),h=n("8336"),v=n("b0af"),m=n("99d9"),b=n("ac7c"),p=n("a523"),_=n("8fea"),D=n("169a"),w=n("132d"),x=n("b974"),k=n("71d9"),y=n("2a7f"),C=Object(u["a"])(c,i,o,!1,null,null,null),F=C.exports;f()(C,{VApp:g["a"],VBtn:h["a"],VCard:v["a"],VCardText:m["a"],VCardTitle:m["b"],VCheckbox:b["a"],VContainer:p["a"],VDataTable:_["a"],VDialog:D["a"],VIcon:w["a"],VSelect:x["a"],VToolbar:k["a"],VToolbarTitle:y["a"]});var T=n("f309");a["a"].use(T["a"]);var U=new T["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:U,render:function(t){return t(F)}}).$mount("#app")},cf25:function(t,e,n){"use strict";var a=n("029a"),i=n.n(a);i.a}});
//# sourceMappingURL=app.5272d984.js.map