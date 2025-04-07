!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");const t=e=>t=>(e=>{const t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&(n=o=e,(r=String).prototype.isPrototypeOf(n)||(null===(s=o.constructor)||void 0===s?void 0:s.name)===r.name)?"string":t;var n,o,r,s})(t)===e,n=e=>t=>typeof t===e,o=t("string"),r=t("object"),s=t("array"),i=n("boolean"),l=e=>!(e=>null==e)(e),a=n("function"),d=n("number"),c=()=>{},m=e=>()=>e,u=(e,t)=>e===t,p=e=>t=>!e(t),g=m(!1);class h{constructor(e,t){this.tag=e,this.value=t}static some(e){return new h(!0,e)}static none(){return h.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?h.some(e(this.value)):h.none()}bind(e){return this.tag?e(this.value):h.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:h.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw new Error(null!=e?e:"Called getOrDie on None")}static from(e){return l(e)?h.some(e):h.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}h.singletonNone=new h(!1);const f=Array.prototype.slice,y=Array.prototype.indexOf,v=Array.prototype.push,C=(e,t)=>{return n=e,o=t,y.call(n,o)>-1;var n,o},b=(e,t)=>{for(let n=0,o=e.length;n<o;n++)if(t(e[n],n))return!0;return!1},N=(e,t)=>{const n=e.length,o=new Array(n);for(let r=0;r<n;r++){const n=e[r];o[r]=t(n,r)}return o},S=(e,t)=>{for(let n=0,o=e.length;n<o;n++)t(e[n],n)},L=(e,t)=>{const n=[];for(let o=0,r=e.length;o<r;o++){const r=e[o];t(r,o)&&n.push(r)}return n},O=(e,t,n)=>(S(e,((e,o)=>{n=t(n,e,o)})),n),A=(e,t,n)=>{for(let o=0,r=e.length;o<r;o++){const r=e[o];if(t(r,o))return h.some(r);if(n(r,o))break}return h.none()},T=(e,t)=>A(e,t,g),x=(e,t)=>(e=>{const t=[];for(let n=0,o=e.length;n<o;++n){if(!s(e[n]))throw new Error("Arr.flatten item "+n+" was not an array, input: "+e);v.apply(t,e[n])}return t})(N(e,t)),E=e=>{const t=f.call(e,0);return t.reverse(),t},w=(e,t)=>t>=0&&t<e.length?h.some(e[t]):h.none(),k=e=>w(e,0),D=e=>w(e,e.length-1),B=(e,t)=>{const n=[],o=a(t)?e=>b(n,(n=>t(n,e))):e=>C(n,e);for(let t=0,r=e.length;t<r;t++){const r=e[t];o(r)||n.push(r)}return n},M=(e,t,n=u)=>e.exists((e=>n(e,t))),P=(e,t,n)=>e.isSome()&&t.isSome()?h.some(n(e.getOrDie(),t.getOrDie())):h.none(),I=e=>{if(null==e)throw new Error("Node cannot be null or undefined");return{dom:e}},R=(e,t)=>{const n=(t||document).createElement("div");if(n.innerHTML=e,!n.hasChildNodes()||n.childNodes.length>1){const t="HTML does not have a single root node";throw console.error(t,e),new Error(t)}return I(n.childNodes[0])},U=(e,t)=>{const n=(t||document).createElement(e);return I(n)},$=I,_=(e,t)=>{const n=e.dom;if(1!==n.nodeType)return!1;{const e=n;if(void 0!==e.matches)return e.matches(t);if(void 0!==e.msMatchesSelector)return e.msMatchesSelector(t);if(void 0!==e.webkitMatchesSelector)return e.webkitMatchesSelector(t);if(void 0!==e.mozMatchesSelector)return e.mozMatchesSelector(t);throw new Error("Browser lacks native selectors")}},H=(e,t)=>e.dom===t.dom,F=_,V="undefined"!=typeof window?window:Function("return this;")(),j=(e,t)=>((e,t)=>{let n=null!=t?t:V;for(let t=0;t<e.length&&null!=n;++t)n=n[e[t]];return n})(e.split("."),t),K=Object.getPrototypeOf,z=e=>{const t=j("ownerDocument.defaultView",e);return r(e)&&((e=>((e,t)=>{const n=((e,t)=>j(e,t))(e,t);if(null==n)throw new Error(e+" not available on this browser");return n})("HTMLElement",e))(t).prototype.isPrototypeOf(e)||/^HTML\w*Element$/.test(K(e).constructor.name))},Q=e=>e.dom.nodeName.toLowerCase(),W=e=>e.dom.nodeType,q=e=>t=>W(t)===e,Z=e=>G(e)&&z(e.dom),G=q(1),J=q(3),X=q(9),Y=q(11),ee=e=>t=>G(t)&&Q(t)===e,te=e=>h.from(e.dom.parentNode).map($),ne=e=>N(e.dom.childNodes,$),oe=(e,t)=>{const n=e.dom.childNodes;return h.from(n[t]).map($)},re=e=>oe(e,0),se=e=>oe(e,e.dom.childNodes.length-1),ie=a(Element.prototype.attachShadow)&&a(Node.prototype.getRootNode)?e=>$(e.dom.getRootNode()):e=>X(e)?e:$(e.dom.ownerDocument),le=e=>$(e.dom.host),ae=e=>{const t=J(e)?e.dom.parentNode:e.dom;if(null==t||null===t.ownerDocument)return!1;const n=t.ownerDocument;return(e=>{const t=ie(e);return Y(n=t)&&l(n.dom.host)?h.some(t):h.none();var n})($(t)).fold((()=>n.body.contains(t)),(o=ae,r=le,e=>o(r(e))));var o,r};var de=(e,t,n,o,r)=>e(n,o)?h.some(n):a(r)&&r(n)?h.none():t(n,o,r);const ce=(e,t,n)=>{let o=e.dom;const r=a(n)?n:g;for(;o.parentNode;){o=o.parentNode;const e=$(o);if(t(e))return h.some(e);if(r(e))break}return h.none()},me=(e,t,n)=>de(((e,t)=>t(e)),ce,e,t,n),ue=(e,t,n)=>ce(e,(e=>_(e,t)),n),pe=(e,t)=>{te(e).each((n=>{n.dom.insertBefore(t.dom,e.dom)}))},ge=(e,t)=>{e.dom.appendChild(t.dom)},he=(e,t)=>{S(t,(t=>{ge(e,t)}))},fe=e=>{e.dom.textContent="",S(ne(e),(e=>{ye(e)}))},ye=e=>{const t=e.dom;null!==t.parentNode&&t.parentNode.removeChild(t)};var ve=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),Ce=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),be=tinymce.util.Tools.resolve("tinymce.util.VK");const Ne=e=>N(e,$),Se=Object.keys,Le=(e,t)=>{const n=Se(e);for(let o=0,r=n.length;o<r;o++){const r=n[o];t(e[r],r)}},Oe=(e,t)=>{const n=e.dom;Le(t,((e,t)=>{((e,t,n)=>{if(!(o(n)||i(n)||d(n)))throw console.error("Invalid call to Attribute.set. Key ",t,":: Value ",n,":: Element ",e),new Error("Attribute value was not simple");e.setAttribute(t,n+"")})(n,t,e)}))},Ae=e=>O(e.dom.attributes,((e,t)=>(e[t.name]=t.value,e)),{}),Te=e=>(e=>$(e.dom.cloneNode(!0)))(e),xe=(e,t)=>{const n=((e,t)=>{const n=U(t),o=Ae(e);return Oe(n,o),n})(e,t);var o,r;r=n,(e=>h.from(e.dom.nextSibling).map($))(o=e).fold((()=>{te(o).each((e=>{ge(e,r)}))}),(e=>{pe(e,r)}));const s=ne(e);return he(n,s),ye(e),n};var Ee=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),we=tinymce.util.Tools.resolve("tinymce.util.Tools");const ke=e=>t=>l(t)&&t.nodeName.toLowerCase()===e,De=e=>t=>l(t)&&e.test(t.nodeName),Be=e=>l(e)&&3===e.nodeType,Me=e=>l(e)&&1===e.nodeType,Pe=De(/^(OL|UL|DL)$/),Ie=De(/^(OL|UL)$/),Re=ke("ol"),Ue=De(/^(LI|DT|DD)$/),$e=De(/^(DT|DD)$/),_e=De(/^(TH|TD)$/),He=ke("br"),Fe=(e,t)=>l(t)&&t.nodeName in e.schema.getTextBlockElements(),Ve=(e,t)=>l(e)&&e.nodeName in t,je=(e,t)=>l(t)&&t.nodeName in e.schema.getVoidElements(),Ke=(e,t,n)=>{const o=e.isEmpty(t);return!(n&&e.select("span[data-mce-type=bookmark]",t).length>0)&&o},ze=(e,t)=>e.isChildOf(t,e.getRoot()),Qe=e=>t=>t.options.get(e),We=Qe("lists_indent_on_tab"),qe=Qe("forced_root_block"),Ze=Qe("forced_root_block_attrs"),Ge=(e,t)=>{const n=e.dom,o=e.schema.getBlockElements(),r=n.createFragment(),s=qe(e),i=Ze(e);let l,a,d=!1;for(a=n.create(s,i),Ve(t.firstChild,o)||r.appendChild(a);l=t.firstChild;){const e=l.nodeName;d||"SPAN"===e&&"bookmark"===l.getAttribute("data-mce-type")||(d=!0),Ve(l,o)?(r.appendChild(l),a=null):(a||(a=n.create(s,i),r.appendChild(a)),a.appendChild(l))}return!d&&a&&a.appendChild(n.create("br",{"data-mce-bogus":"1"})),r},Je=Ee.DOM,Xe=ee("dd"),Ye=ee("dt"),et=(e,t)=>{var n;Xe(t)?xe(t,"dt"):Ye(t)&&(n=t,h.from(n.dom.parentElement).map($)).each((n=>((e,t,n)=>{const o=Je.select('span[data-mce-type="bookmark"]',t),r=Ge(e,n),s=Je.createRng();s.setStartAfter(n),s.setEndAfter(t);const i=s.extractContents();for(let t=i.firstChild;t;t=t.firstChild)if("LI"===t.nodeName&&e.dom.isEmpty(t)){Je.remove(t);break}e.dom.isEmpty(i)||Je.insertAfter(i,t),Je.insertAfter(r,t);const l=n.parentElement;l&&Ke(e.dom,l)&&(e=>{const t=e.parentNode;t&&we.each(o,(e=>{t.insertBefore(e,n.parentNode)})),Je.remove(e)})(l),Je.remove(n),Ke(e.dom,t)&&Je.remove(t)})(e,n.dom,t.dom)))},tt=e=>{Ye(e)&&xe(e,"dd")},nt=(e,t)=>{if(Be(e))return{container:e,offset:t};const n=ve.getNode(e,t);return Be(n)?{container:n,offset:t>=e.childNodes.length?n.data.length:0}:n.previousSibling&&Be(n.previousSibling)?{container:n.previousSibling,offset:n.previousSibling.data.length}:n.nextSibling&&Be(n.nextSibling)?{container:n.nextSibling,offset:0}:{container:e,offset:t}},ot=e=>{const t=e.cloneRange(),n=nt(e.startContainer,e.startOffset);t.setStart(n.container,n.offset);const o=nt(e.endContainer,e.endOffset);return t.setEnd(o.container,o.offset),t},rt=["OL","UL","DL"],st=rt.join(","),it=(e,t)=>{const n=t||e.selection.getStart(!0);return e.dom.getParent(n,st,dt(e,n))},lt=e=>{const t=e.selection.getSelectedBlocks();return L(((e,t)=>{const n=we.map(t,(t=>e.dom.getParent(t,"li,dd,dt",dt(e,t))||t));return B(n)})(e,t),Ue)},at=(e,t)=>{const n=e.dom.getParents(t,"TD,TH");return n.length>0?n[0]:e.getBody()},dt=(e,t)=>{const n=e.dom.getParents(t,e.dom.isBlock),o=T(n,(t=>{return n=e.schema,!Pe(o=t)&&!Ue(o)&&b(rt,(e=>n.isValidChild(o.nodeName,e)));var n,o}));return o.getOr(e.getBody())},ct=(e,t)=>{const n=e.dom.getParents(t,"ol,ul",dt(e,t));return D(n)},mt=(e,t)=>{const n=N(t,(t=>ct(e,t).getOr(t)));return B(n)},ut=e=>/\btox\-/.test(e.className),pt=(e,t)=>A(e,Pe,_e).exists((e=>e.nodeName===t&&!ut(e))),gt=(e,t)=>null!==t&&!e.dom.isEditable(t),ht=(e,t)=>{const n=e.dom.getParent(t,"ol,ul,dl");return gt(e,n)},ft=(e,t)=>{const n=e.selection.getNode();return t({parents:e.dom.getParents(n),element:n}),e.on("NodeChange",t),()=>e.off("NodeChange",t)},yt=(e,t)=>{const n=(t||document).createDocumentFragment();return S(e,(e=>{n.appendChild(e.dom)})),$(n)},vt=(e,t,n)=>e.dispatch("ListMutation",{action:t,element:n}),Ct=(bt=/^\s+|\s+$/g,e=>e.replace(bt,""));var bt;const Nt=(e,t,n)=>{((e,t,n)=>{if(!o(n))throw console.error("Invalid call to CSS.set. Property ",t,":: Value ",n,":: Element ",e),new Error("CSS value must be a string: "+n);(e=>void 0!==e.style&&a(e.style.getPropertyValue))(e)&&e.style.setProperty(t,n)})(e.dom,t,n)},St=e=>F(e,"OL,UL"),Lt=e=>re(e).exists(St),Ot=e=>"listAttributes"in e,At=e=>"isComment"in e,Tt=e=>e.depth>0,xt=e=>e.isSelected,Et=e=>{const t=ne(e),n=se(e).exists(St)?t.slice(0,-1):t;return N(n,Te)},wt=(e,t)=>{ge(e.item,t.list)},kt=(e,t)=>{const n={list:U(t,e),item:U("li",e)};return ge(n.list,n.item),n},Dt=(e,t,n)=>{const o=t.slice(0,n.depth);return D(o).each((t=>{if(Ot(n)){const o=((e,t,n)=>{const o=U("li",e);return Oe(o,t),he(o,n),o})(e,n.itemAttributes,n.content);((e,t)=>{ge(e.list,t),e.item=t})(t,o),((e,t)=>{Q(e.list)!==t.listType&&(e.list=xe(e.list,t.listType)),Oe(e.list,t.listAttributes)})(t,n)}else if((e=>"isFragment"in e)(n))he(t.item,n.content);else{const e=R(`\x3c!--${n.content}--\x3e`);ge(t.list,e)}})),o},Bt=(e,t)=>{let n=h.none();const o=O(t,((t,o,r)=>At(o)?0===r?(n=h.some(o),t):Dt(e,t,o):o.depth>t.length?((e,t,n)=>{const o=((e,t,n)=>{const o=[];for(let r=0;r<n;r++)o.push(kt(e,Ot(t)?t.listType:t.parentListType));return o})(e,n,n.depth-t.length);var r;return(e=>{for(let t=1;t<e.length;t++)wt(e[t-1],e[t])})(o),((e,t)=>{for(let t=0;t<e.length-1;t++)Nt(e[t].item,"list-style-type","none");D(e).each((e=>{Ot(t)&&(Oe(e.list,t.listAttributes),Oe(e.item,t.itemAttributes)),he(e.item,t.content)}))})(o,n),r=o,P(D(t),k(r),wt),t.concat(o)})(e,t,o):Dt(e,t,o)),[]);return n.each((e=>{const t=R(`\x3c!--${e.content}--\x3e`);k(o).each((e=>{((e,t)=>{re(e).fold((()=>{ge(e,t)}),(n=>{e.dom.insertBefore(t.dom,n.dom)}))})(e.list,t)}))})),k(o).map((e=>e.list))},Mt=e=>(S(e,((t,n)=>{((e,t)=>{const n=e[t].depth,o=e=>e.depth===n&&!e.dirty,r=e=>e.depth<n;return A(E(e.slice(0,t)),o,r).orThunk((()=>A(e.slice(t+1),o,r)))})(e,n).fold((()=>{t.dirty&&Ot(t)&&(e=>{e.listAttributes=((e,t)=>{const n={};var o;return((e,t,n,o)=>{Le(e,((e,r)=>{(t(e,r)?n:o)(e,r)}))})(e,t,(o=n,(e,t)=>{o[t]=e}),c),n})(e.listAttributes,((e,t)=>"start"!==t))})(t)}),(e=>{return o=e,void(Ot(n=t)&&Ot(o)&&(n.listType=o.listType,n.listAttributes={...o.listAttributes}));var n,o}))})),e),Pt=(e,t,n,o)=>{var r,s;if(8===W(s=o)||"#comment"===Q(s))return[{depth:e+1,content:null!==(r=o.dom.nodeValue)&&void 0!==r?r:"",dirty:!1,isSelected:!1,isComment:!0}];t.each((e=>{H(e.start,o)&&n.set(!0)}));const i=((e,t,n)=>te(e).filter(G).map((o=>({depth:t,dirty:!1,isSelected:n,content:Et(e),itemAttributes:Ae(e),listAttributes:Ae(o),listType:Q(o),isInPreviousLi:!1}))))(o,e,n.get());t.each((e=>{H(e.end,o)&&n.set(!1)}));const l=se(o).filter(St).map((o=>Rt(e,t,n,o))).getOr([]);return i.toArray().concat(l)},It=(e,t,n,o)=>re(o).filter(St).fold((()=>Pt(e,t,n,o)),(r=>{const s=O(ne(o),((o,s,i)=>{if(0===i)return o;if(F(s,"LI"))return o.concat(Pt(e,t,n,s));{const t={isFragment:!0,depth:e,content:[s],isSelected:!1,dirty:!1,parentListType:Q(r)};return o.concat(t)}}),[]);return Rt(e,t,n,r).concat(s)})),Rt=(e,t,n,o)=>x(ne(o),(o=>(St(o)?Rt:It)(e+1,t,n,o))),Ut=(e,t,n)=>{const o=((e,t)=>{const n=(()=>{let e=!1;return{get:()=>e,set:t=>{e=t}}})();return N(e,(e=>({sourceList:e,entries:Rt(0,t,n,e)})))})(t,(e=>{const t=N(lt(e),$);return P(T(t,p(Lt)),T(E(t),p(Lt)),((e,t)=>({start:e,end:t})))})(e));S(o,(t=>{((e,t)=>{S(L(e,xt),(e=>((e,t)=>{switch(e){case"Indent":t.depth++;break;case"Outdent":t.depth--;break;case"Flatten":t.depth=0}t.dirty=!0})(t,e)))})(t.entries,n);const o=((e,t)=>x(((e,t)=>{if(0===e.length)return[];{let n=t(e[0]);const o=[];let r=[];for(let s=0,i=e.length;s<i;s++){const i=e[s],l=t(i);l!==n&&(o.push(r),r=[]),n=l,r.push(i)}return 0!==r.length&&o.push(r),o}})(t,Tt),(t=>k(t).exists(Tt)?((e,t)=>{const n=Mt(t);return Bt(e.contentDocument,n).toArray()})(e,t):((e,t)=>{const n=Mt(t);return N(n,(t=>{const n=At(t)?yt([R(`\x3c!--${t.content}--\x3e`)]):yt(t.content);return $(Ge(e,n.dom))}))})(e,t))))(e,t.entries);var r;S(o,(t=>{vt(e,"Indent"===n?"IndentList":"OutdentList",t.dom)})),r=t.sourceList,S(o,(e=>{pe(r,e)})),ye(t.sourceList)}))},$t=(e,t)=>{const n=Ne((e=>{const t=(e=>{const t=ct(e,e.selection.getStart()),n=L(e.selection.getSelectedBlocks(),Ie);return t.toArray().concat(n)})(e),n=(e=>{const t=e.selection.getStart();return e.dom.getParents(t,"ol,ul",dt(e,t))})(e);return T(n,(e=>{return t=$(e),te(t).exists((e=>Ue(e.dom)&&re(e).exists((e=>!Pe(e.dom)))&&se(e).exists((e=>!Pe(e.dom)))));var t})).fold((()=>mt(e,t)),(e=>[e]))})(e)),o=Ne((e=>L(lt(e),$e))(e));let r=!1;if(n.length||o.length){const s=e.selection.getBookmark();Ut(e,n,t),((e,t,n)=>{S(n,"Indent"===t?tt:t=>et(e,t))})(e,t,o),e.selection.moveToBookmark(s),e.selection.setRng(ot(e.selection.getRng())),e.nodeChanged(),r=!0}return r},_t=(e,t)=>!(e=>{const t=it(e);return gt(e,t)})(e)&&$t(e,t),Ht=e=>_t(e,"Indent"),Ft=e=>_t(e,"Outdent"),Vt=e=>_t(e,"Flatten"),jt=e=>"\ufeff"===e;var Kt=tinymce.util.Tools.resolve("tinymce.dom.BookmarkManager");const zt=Ee.DOM,Qt=e=>{const t={},n=n=>{let o=e[n?"startContainer":"endContainer"],r=e[n?"startOffset":"endOffset"];if(Me(o)){const e=zt.create("span",{"data-mce-type":"bookmark"});o.hasChildNodes()?(r=Math.min(r,o.childNodes.length-1),n?o.insertBefore(e,o.childNodes[r]):zt.insertAfter(e,o.childNodes[r])):o.appendChild(e),o=e,r=0}t[n?"startContainer":"endContainer"]=o,t[n?"startOffset":"endOffset"]=r};return n(!0),e.collapsed||n(),t},Wt=e=>{const t=t=>{let n=e[t?"startContainer":"endContainer"],o=e[t?"startOffset":"endOffset"];if(n){if(Me(n)&&n.parentNode){const e=n;o=(e=>{var t;let n=null===(t=e.parentNode)||void 0===t?void 0:t.firstChild,o=0;for(;n;){if(n===e)return o;Me(n)&&"bookmark"===n.getAttribute("data-mce-type")||o++,n=n.nextSibling}return-1})(n),n=n.parentNode,zt.remove(e),!n.hasChildNodes()&&zt.isBlock(n)&&n.appendChild(zt.create("br"))}e[t?"startContainer":"endContainer"]=n,e[t?"startOffset":"endOffset"]=o}};t(!0),t();const n=zt.createRng();return n.setStart(e.startContainer,e.startOffset),e.endContainer&&n.setEnd(e.endContainer,e.endOffset),ot(n)},qt=e=>{switch(e){case"UL":return"ToggleUlList";case"OL":return"ToggleOlList";case"DL":return"ToggleDLList"}},Zt=(e,t)=>{we.each(t,((t,n)=>{e.setAttribute(n,t)}))},Gt=(e,t,n)=>{((e,t,n)=>{const o=n["list-style-type"]?n["list-style-type"]:null;e.setStyle(t,"list-style-type",o)})(e,t,n),((e,t,n)=>{Zt(t,n["list-attributes"]),we.each(e.select("li",t),(e=>{Zt(e,n["list-item-attributes"])}))})(e,t,n)},Jt=(e,t)=>l(t)&&!Ve(t,e.schema.getBlockElements()),Xt=(e,t,n,o)=>{let r=t[n?"startContainer":"endContainer"];const s=t[n?"startOffset":"endOffset"];Me(r)&&(r=r.childNodes[Math.min(s,r.childNodes.length-1)]||r),!n&&He(r.nextSibling)&&(r=r.nextSibling);const i=(t,n)=>{var r;const s=new Ce(t,(t=>{for(;!e.dom.isBlock(t)&&t.parentNode&&o!==t;)t=t.parentNode;return t})(t)),i=n?"next":"prev";let l;for(;l=s[i]();)if(!je(e,l)&&!jt(l.textContent)&&0!==(null===(r=l.textContent)||void 0===r?void 0:r.length))return h.some(l);return h.none()};if(n&&Be(r))if(jt(r.textContent))r=i(r,!1).getOr(r);else for(null!==r.parentNode&&Jt(e,r.parentNode)&&(r=r.parentNode);null!==r.previousSibling&&(Jt(e,r.previousSibling)||Be(r.previousSibling));)r=r.previousSibling;if(!n&&Be(r))if(jt(r.textContent))r=i(r,!0).getOr(r);else for(null!==r.parentNode&&Jt(e,r.parentNode)&&(r=r.parentNode);null!==r.nextSibling&&(Jt(e,r.nextSibling)||Be(r.nextSibling));)r=r.nextSibling;for(;r.parentNode!==o;){const t=r.parentNode;if(Fe(e,r))return r;if(/^(TD|TH)$/.test(t.nodeName))return r;r=t}return r},Yt=(e,t,n)=>{const o=e.selection.getRng();let r="LI";const s=dt(e,((e,t)=>{const n=e.selection.getStart(!0),o=Xt(e,t,!0,e.getBody());return r=$(o),s=$(t.commonAncestorContainer),i=r,l=function(e,...t){return(...n)=>{const o=t.concat(n);return e.apply(null,o)}}(H,s),ce(i,l,void 0).isSome()?t.commonAncestorContainer:n;var r,s,i,l})(e,o)),i=e.dom;if("false"===i.getContentEditable(e.selection.getNode()))return;"DL"===(t=t.toUpperCase())&&(r="DT");const l=Qt(o),a=L(((e,t,n)=>{const o=[],r=e.dom,s=Xt(e,t,!0,n),i=Xt(e,t,!1,n);let l;const a=[];for(let e=s;e&&(a.push(e),e!==i);e=e.nextSibling);return we.each(a,(t=>{var s;if(Fe(e,t))return o.push(t),void(l=null);if(r.isBlock(t)||He(t))return He(t)&&r.remove(t),void(l=null);const i=t.nextSibling;Kt.isBookmarkNode(t)&&(Pe(i)||Fe(e,i)||!i&&t.parentNode===n)?l=null:(l||(l=r.create("p"),null===(s=t.parentNode)||void 0===s||s.insertBefore(l,t),o.push(l)),l.appendChild(t))})),o})(e,o,s),e.dom.isEditable);we.each(a,(o=>{let s;const l=o.previousSibling,a=o.parentNode;Ue(a)||(l&&Pe(l)&&l.nodeName===t&&((e,t,n)=>{const o=e.getStyle(t,"list-style-type");let r=n?n["list-style-type"]:"";return r=null===r?"":r,o===r})(i,l,n)?(s=l,o=i.rename(o,r),l.appendChild(o)):(s=i.create(t),a.insertBefore(s,o),s.appendChild(o),o=i.rename(o,r)),((e,t)=>{we.each(["margin","margin-right","margin-bottom","margin-left","margin-top","padding","padding-right","padding-bottom","padding-left","padding-top"],(n=>e.setStyle(t,n,"")))})(i,o),Gt(i,s,n),tn(e.dom,s))})),e.selection.setRng(Wt(l))},en=(e,t,n)=>{return((e,t)=>Pe(e)&&e.nodeName===(null==t?void 0:t.nodeName))(t,n)&&((e,t,n)=>e.getStyle(t,"list-style-type",!0)===e.getStyle(n,"list-style-type",!0))(e,t,n)&&(o=n,t.className===o.className);var o},tn=(e,t)=>{let n,o=t.nextSibling;if(en(e,t,o)){const r=o;for(;n=r.firstChild;)t.appendChild(n);e.remove(r)}if(o=t.previousSibling,en(e,t,o)){const r=o;for(;n=r.lastChild;)t.insertBefore(n,t.firstChild);e.remove(r)}},nn=(e,t,n,o)=>{if(t.nodeName!==n){const r=e.dom.rename(t,n);Gt(e.dom,r,o),vt(e,qt(n),r)}else Gt(e.dom,t,o),vt(e,qt(n),t)},on=(e,t,n,o)=>{if(t.classList.forEach(((e,n,o)=>{e.startsWith("tox-")&&(o.remove(e),0===o.length&&t.removeAttribute("class"))})),t.nodeName!==n){const r=e.dom.rename(t,n);Gt(e.dom,r,o),vt(e,qt(n),r)}else Gt(e.dom,t,o),vt(e,qt(n),t)},rn=e=>"list-style-type"in e,sn=(e,t,n)=>{const o=it(e);if(ht(e,o))return;const s=(e=>{const t=it(e),n=e.selection.getSelectedBlocks();return((e,t)=>l(e)&&1===t.length&&t[0]===e)(t,n)?(e=>L(e.querySelectorAll(st),Pe))(t):L(n,(e=>Pe(e)&&t!==e))})(e),i=r(n)?n:{};s.length>0?((e,t,n,o,r)=>{const s=Pe(t);if(!s||t.nodeName!==o||rn(r)||ut(t)){Yt(e,o,r);const i=Qt(e.selection.getRng()),l=s?[t,...n]:n,a=s&&ut(t)?on:nn;we.each(l,(t=>{a(e,t,o,r)})),e.selection.setRng(Wt(i))}else Vt(e)})(e,o,s,t,i):((e,t,n,o)=>{if(t!==e.getBody())if(t)if(t.nodeName!==n||rn(o)||ut(t)){const r=Qt(e.selection.getRng());ut(t)&&t.classList.forEach(((e,n,o)=>{e.startsWith("tox-")&&(o.remove(e),0===o.length&&t.removeAttribute("class"))})),Gt(e.dom,t,o);const s=e.dom.rename(t,n);tn(e.dom,s),e.selection.setRng(Wt(r)),Yt(e,n,o),vt(e,qt(n),s)}else Vt(e);else Yt(e,n,o),vt(e,qt(n),t)})(e,o,t,i)},ln=Ee.DOM,an=(e,t)=>{const n=we.grep(e.select("ol,ul",t));we.each(n,(t=>{((e,t)=>{const n=t.parentElement;if(n&&"LI"===n.nodeName&&n.firstChild===t){const o=n.previousSibling;o&&"LI"===o.nodeName?(o.appendChild(t),Ke(e,n)&&ln.remove(n)):ln.setStyle(n,"listStyleType","none")}if(Pe(n)){const e=n.previousSibling;e&&"LI"===e.nodeName&&e.appendChild(t)}})(e,t)}))},dn=(e,t,n,o)=>{let r=t.startContainer;const s=t.startOffset;if(Be(r)&&(n?s<r.data.length:s>0))return r;const i=e.schema.getNonEmptyElements();Me(r)&&(r=ve.getNode(r,s));const l=new Ce(r,o);n&&((e,t)=>!!He(t)&&e.isBlock(t.nextSibling)&&!He(t.previousSibling))(e.dom,r)&&l.next();const a=n?l.next.bind(l):l.prev2.bind(l);for(;r=a();){if("LI"===r.nodeName&&!r.hasChildNodes())return r;if(i[r.nodeName])return r;if(Be(r)&&r.data.length>0)return r}return null},cn=(e,t)=>{const n=t.childNodes;return 1===n.length&&!Pe(n[0])&&e.isBlock(n[0])},mn=e=>h.from(e).map($).filter(Z).exists((e=>((e,t=!1)=>{return ae(e)?e.dom.isContentEditable:(n=e,de(((e,t)=>_(e,t)),ue,n,"[contenteditable]",void 0)).fold(m(t),(e=>"true"===(e=>e.dom.contentEditable)(e)));var n})(e)&&!C(["details"],Q(e)))),un=(e,t,n)=>{let o;const r=cn(e,n)?n.firstChild:n;if(((e,t)=>{cn(e,t)&&mn(t.firstChild)&&e.remove(t.firstChild,!0)})(e,t),!Ke(e,t,!0))for(;o=t.firstChild;)r.appendChild(o)},pn=(e,t,n)=>{let o;const r=t.parentNode;if(!ze(e,t)||!ze(e,n))return;Pe(n.lastChild)&&(o=n.lastChild),r===n.lastChild&&He(r.previousSibling)&&e.remove(r.previousSibling);const s=n.lastChild;s&&He(s)&&t.hasChildNodes()&&e.remove(s),Ke(e,n,!0)&&fe($(n)),un(e,t,n),o&&n.appendChild(o);const i=((e,t)=>{const n=e.dom,o=t.dom;return n!==o&&n.contains(o)})($(n),$(t))?e.getParents(t,Pe,n):[];e.remove(t),S(i,(t=>{Ke(e,t)&&t!==e.getRoot()&&e.remove(t)}))},gn=(e,t)=>{const n=e.dom,o=e.selection,r=o.getStart(),s=at(e,r),i=n.getParent(o.getStart(),"LI",s);if(i){const r=i.parentElement;if(r===e.getBody()&&Ke(n,r))return!0;const l=ot(o.getRng()),a=n.getParent(dn(e,l,t,s),"LI",s),d=a&&(t?n.isChildOf(i,a):n.isChildOf(a,i));if(a&&a!==i&&!d)return e.undoManager.transact((()=>{var n,o;t?((e,t,n,o)=>{const r=e.dom;if(r.isEmpty(o))((e,t,n)=>{fe($(n)),pn(e.dom,t,n),e.selection.setCursorLocation(n,0)})(e,n,o);else{const s=Qt(t);pn(r,n,o),e.selection.setRng(Wt(s))}})(e,l,a,i):(null===(o=(n=i).parentNode)||void 0===o?void 0:o.firstChild)===n?Ft(e):((e,t,n,o)=>{const r=Qt(t);pn(e.dom,n,o);const s=Wt(r);e.selection.setRng(s)})(e,l,i,a)})),!0;if(d&&!t&&a!==i)return e.undoManager.transact((()=>{if(l.commonAncestorContainer.parentElement){const t=Qt(l),o=l.commonAncestorContainer.parentElement;un(n,l.commonAncestorContainer.parentElement,a),o.remove();const r=Wt(t);e.selection.setRng(r)}})),!0;if(!a&&!t&&0===l.startOffset&&0===l.endOffset)return e.undoManager.transact((()=>{Vt(e)})),!0}return!1},hn=e=>{const t=e.selection.getStart(),n=at(e,t);return e.dom.getParent(t,"LI,DT,DD",n)||lt(e).length>0},fn=(e,t)=>{const n=e.selection;return!ht(e,n.getNode())&&(n.isCollapsed()?((e,t)=>gn(e,t)||((e,t)=>{const n=e.dom,o=e.selection.getStart(),r=at(e,o),s=n.getParent(o,n.isBlock,r);if(s&&n.isEmpty(s)){const o=ot(e.selection.getRng()),i=n.getParent(dn(e,o,t,r),"LI",r);if(i){const l=e=>C(["td","th","caption"],Q(e)),a=e=>e.dom===r;return!!((e,t,n=u)=>P(e,t,n).getOr(e.isNone()&&t.isNone()))(me($(i),l,a),me($(o.startContainer),l,a),H)&&(e.undoManager.transact((()=>{const o=i.parentNode;((e,t,n)=>{const o=e.getParent(t.parentNode,e.isBlock,n);e.remove(t),o&&e.isEmpty(o)&&e.remove(o)})(n,s,r),tn(n,o),e.selection.select(i,!0),e.selection.collapse(t)})),!0)}}return!1})(e,t))(e,t):(e=>!!hn(e)&&(e.undoManager.transact((()=>{e.execCommand("Delete"),an(e.dom,e.getBody())})),!0))(e))},yn=e=>{const t=E(Ct(e).split("")),n=N(t,((e,t)=>{const n=e.toUpperCase().charCodeAt(0)-"A".charCodeAt(0)+1;return Math.pow(26,t)*n}));return O(n,((e,t)=>e+t),0)},vn=e=>{if(--e<0)return"";{const t=e%26,n=Math.floor(e/26);return vn(n)+String.fromCharCode("A".charCodeAt(0)+t)}},Cn=e=>{const t=parseInt(e.start,10);return M(e.listStyleType,"upper-alpha")?vn(t):M(e.listStyleType,"lower-alpha")?vn(t).toLowerCase():e.start},bn=(e,t)=>()=>{const n=it(e);return l(n)&&n.nodeName===t},Nn=e=>{e.addCommand("mceListProps",(()=>{(e=>{const t=it(e);Re(t)&&!ht(e,t)&&e.windowManager.open({title:"List Properties",body:{type:"panel",items:[{type:"input",name:"start",label:"Start list at number",inputMode:"numeric"}]},initialData:{start:Cn({start:e.dom.getAttrib(t,"start","1"),listStyleType:h.from(e.dom.getStyle(t,"list-style-type"))})},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:t=>{(e=>{switch((e=>/^[0-9]+$/.test(e)?2:/^[A-Z]+$/.test(e)?0:/^[a-z]+$/.test(e)?1:e.length>0?4:3)(e)){case 2:return h.some({listStyleType:h.none(),start:e});case 0:return h.some({listStyleType:h.some("upper-alpha"),start:yn(e).toString()});case 1:return h.some({listStyleType:h.some("lower-alpha"),start:yn(e).toString()});case 3:return h.some({listStyleType:h.none(),start:""});case 4:return h.none()}})(t.getData().start).each((t=>{e.execCommand("mceListUpdate",!1,{attrs:{start:"1"===t.start?"":t.start},styles:{"list-style-type":t.listStyleType.getOr("")}})})),t.close()}})})(e)}))};var Sn=tinymce.util.Tools.resolve("tinymce.html.Node");const Ln=e=>3===e.type,On=e=>0===e.length,An=e=>{const t=(t,n)=>{const o=Sn.create("li");S(t,(e=>o.append(e))),n?e.insert(o,n,!0):e.append(o)},n=O(e.children(),((e,n)=>Ln(n)?[...e,n]:On(e)||Ln(n)?e:(t(e,n),[])),[]);On(n)||t(n)},Tn=(e,t)=>n=>(n.setEnabled(e.selection.isEditable()),ft(e,(o=>{n.setActive(pt(o.parents,t)),n.setEnabled(!ht(e,o.element)&&e.selection.isEditable())}))),xn=(e,t)=>n=>ft(e,(o=>n.setEnabled(pt(o.parents,t)&&!ht(e,o.element))));e.add("lists",(e=>((e=>{(0,e.options.register)("lists_indent_on_tab",{processor:"boolean",default:!0})})(e),(e=>{e.on("PreInit",(()=>{const{parser:t}=e;t.addNodeFilter("ul,ol",(e=>S(e,An)))}))})(e),e.hasPlugin("rtc",!0)?Nn(e):((e=>{We(e)&&(e=>{e.on("keydown",(t=>{t.keyCode!==be.TAB||be.metaKeyPressed(t)||e.undoManager.transact((()=>{(t.shiftKey?Ft(e):Ht(e))&&t.preventDefault()}))}))})(e),(e=>{e.on("ExecCommand",(t=>{const n=t.command.toLowerCase();"delete"!==n&&"forwarddelete"!==n||!hn(e)||an(e.dom,e.getBody())})),e.on("keydown",(t=>{t.keyCode===be.BACKSPACE?fn(e,!1)&&t.preventDefault():t.keyCode===be.DELETE&&fn(e,!0)&&t.preventDefault()}))})(e)})(e),(e=>{e.on("BeforeExecCommand",(t=>{const n=t.command.toLowerCase();"indent"===n?Ht(e):"outdent"===n&&Ft(e)})),e.addCommand("InsertUnorderedList",((t,n)=>{sn(e,"UL",n)})),e.addCommand("InsertOrderedList",((t,n)=>{sn(e,"OL",n)})),e.addCommand("InsertDefinitionList",((t,n)=>{sn(e,"DL",n)})),e.addCommand("RemoveList",(()=>{Vt(e)})),Nn(e),e.addCommand("mceListUpdate",((t,n)=>{r(n)&&((e,t)=>{const n=it(e);null===n||ht(e,n)||e.undoManager.transact((()=>{r(t.styles)&&e.dom.setStyles(n,t.styles),r(t.attrs)&&Le(t.attrs,((t,o)=>e.dom.setAttrib(n,o,t)))}))})(e,n)})),e.addQueryStateHandler("InsertUnorderedList",bn(e,"UL")),e.addQueryStateHandler("InsertOrderedList",bn(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",bn(e,"DL"))})(e)),(e=>{const t=t=>()=>e.execCommand(t);e.hasPlugin("advlist")||(e.ui.registry.addToggleButton("numlist",{icon:"ordered-list",active:!1,tooltip:"Numbered list",onAction:t("InsertOrderedList"),onSetup:Tn(e,"OL")}),e.ui.registry.addToggleButton("bullist",{icon:"unordered-list",active:!1,tooltip:"Bullet list",onAction:t("InsertUnorderedList"),onSetup:Tn(e,"UL")}))})(e),(e=>{const t={text:"List properties...",icon:"ordered-list",onAction:()=>e.execCommand("mceListProps"),onSetup:xn(e,"OL")};e.ui.registry.addMenuItem("listprops",t),e.ui.registry.addContextMenu("lists",{update:t=>{const n=it(e,t);return Re(n)?["listprops"]:[]}})})(e),(e=>({backspaceDelete:t=>{fn(e,t)}}))(e))))}();