(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{363:function(s,t,a){s.exports=a.p+"assets/img/11.2.0.b91070fd.jpg"},434:function(s,t,a){"use strict";a.r(t);var e=a(42),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"unify-interfaces"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#unify-interfaces"}},[s._v("#")]),s._v(" Unify Interfaces")]),s._v(" "),e("p",[s._v("讓 superclass 或 interface 擁有和 subclass 相同的介面。")]),s._v(" "),e("p",[s._v("方法：在 subclass 上面找出 superclass 或 interface 沒有的 public 函式，然後加上去並且讓它們執行 null 行為。")]),s._v(" "),e("p",[e("img",{attrs:{src:a(363),alt:""}})]),s._v(" "),e("h2",{attrs:{id:"動機"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#動機"}},[s._v("#")]),s._v(" 動機")]),s._v(" "),e("p",[s._v("當 superclass 或 interface 需要與 subclass 相同的介面，就可以使用這項重構。")]),s._v(" "),e("h3",{attrs:{id:"何時會需要"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#何時會需要"}},[s._v("#")]),s._v(" 何時會需要？")]),s._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/ch7/move-embellishment-to-decorator.html"}},[s._v("Move Embellishment to Decorator")]),s._v(" 中的 "),e("strong",[s._v("Decorator")]),s._v(" 需要與 subclass 相同的介面")],1),s._v(" "),e("li",[e("RouterLink",{attrs:{to:"/ch10/move-accumulation-to-visitor.html"}},[s._v("Move Accumulation to Visitor")]),s._v(" 用來移除重複碼")],1)]),s._v(" "),e("p",[s._v("在 superclass 與 subclass 實施這項重構之後，有時候會在 superclass 實施 "),e("em",[s._v("Extract Interface")]),s._v(" 建立一個獨立的 interface。")]),s._v(" "),e("ul",[e("li",[s._v("當 abstract base class 含有狀態欄位但是我不需要「共同基礎類別（common base class）的實作者（e.g. "),e("strong",[s._v("Decorator")]),s._v("）」繼承那些欄位的話，就會這樣做。可參考："),e("RouterLink",{attrs:{to:"/ch7/move-embellishment-to-decorator.html"}},[s._v("Move Embellishment to Decorator")])],1)]),s._v(" "),e("p",[e("em",[s._v("Unify Interface")]),s._v(" 在其他地方常常是暫時性步驟。")]),s._v(" "),e("ul",[e("li",[s._v("在這項重構之後還要進行一連串重構才能移除 "),e("em",[s._v("Unify Interface")]),s._v(" 產生的函式。")]),s._v(" "),e("li",[s._v("實施 "),e("em",[s._v("Extract Interface")]),s._v(" 後有可能不再需要 abstract base class 的函式的預設實作。")])]),s._v(" "),e("h2",{attrs:{id:"作法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#作法"}},[s._v("#")]),s._v(" 作法")]),s._v(" "),e("p",[s._v("找出一個遺漏的函式，亦即：不在 superclass 或 interface 的 subclass public 函式。")]),s._v(" "),e("ol",[e("li",[s._v("把遺漏的函式複製一份加到 superclass 或 interface。如果是 superclass，修改函式本體，讓它執行 null 行為。\n重複進行，直到它們共用完全相同的 interface。")])]),s._v(" "),e("h2",{attrs:{id:"範例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#範例"}},[s._v("#")]),s._v(" 範例")]),s._v(" "),e("p",[s._v("HTML Parser 中需要把 "),e("code",[s._v("StringNode")]),s._v(" 的 subclass 和它的 superclass "),e("code",[s._v("AbstractNode")]),s._v(" 介面一致化。"),e("code",[s._v("StringNode")]),s._v(" 擁有和 "),e("code",[s._v("AbstractNode")]),s._v(" 幾乎一致的 public 函式，除了以下：")]),s._v(" "),e("div",{staticClass:"language-java line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StringNode")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AbstractNode")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("accept")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("textExtractor"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("TextExtractor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// implementation details...")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("ol",[e("li",[e("p",[s._v("為 "),e("code",[s._v("AbstractNode")]),s._v(" 加個 function "),e("code",[s._v("accept(...)")]),s._v(" 並修改函式內容，使它提供 null 行為：")]),s._v(" "),e("div",{staticClass:"language-java line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("abstract")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AbstractNode")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("accept")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("textExtractor"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("TextExtractor")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("搞定。")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);