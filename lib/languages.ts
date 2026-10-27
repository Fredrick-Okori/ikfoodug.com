export const languages = [
  { code: "en", name: "English", abbreviation: "Eng" },
  { code: "nl", name: "Nederlands", abbreviation: "NL" },
  { code: "sw", name: "Kiswahili", abbreviation: "SW" },
  { code: "ru", name: "Русский", abbreviation: "RUS" },
  { code: "fr", name: "Français", abbreviation: "FR" },
  { code: "de", name: "Deutsch", abbreviation: "DE" },
  { code: "he", name: "עברית", abbreviation: "HE" },
  { code: "it", name: "Italiano", abbreviation: "IT" },
  { code: "da", name: "Dansk", abbreviation: "DA" },
  { code: "es", name: "Español", abbreviation: "ES" },
  { code: "ar", name: "العربية", abbreviation: "AR" },
  { code: "zh-cn", name: "中文", abbreviation: "ZH" },
  { code: "ja", name: "日本語", abbreviation: "JA" },
  { code: "pt", name: "Português", abbreviation: "PT" },
];
export const languageCodes = languages.map(({ code }) => code);

// localStorage key holding the visitor's explicit language choice.
export const LANGUAGE_STORAGE_KEY = "ik_lang";

// Visitor country (ISO 3166-1 alpha-2) → default site language. Unlisted countries stay English.
export const countryLanguages: Record<string, string> = {
  KE: "sw", TZ: "sw", NL: "nl", IL: "he", IT: "it", DK: "da",
  CD: "fr", CG: "fr", GA: "fr", MG: "fr", ML: "fr", NE: "fr", BF: "fr",
  TG: "fr", BJ: "fr", DJ: "fr", CF: "fr", GQ: "fr", RW: "fr", BI: "fr",
  FR: "fr", BE: "fr", LU: "fr", SN: "fr", CI: "fr", CM: "fr", CH: "de",
  DE: "de", AT: "de", GT: "es", HN: "es", SV: "es", NI: "es", CR: "es",
  PA: "es", CU: "es", DO: "es", VE: "es", PE: "es", BO: "es", EC: "es",
  PY: "es", UY: "es", ES: "es", MX: "es", AR: "es", CO: "es", CL: "es",
  IQ: "ar", JO: "ar", LB: "ar", SY: "ar", YE: "ar", OM: "ar", QA: "ar",
  KW: "ar", BH: "ar", TN: "ar", DZ: "ar", LY: "ar", SD: "ar", PS: "ar",
  SA: "ar", AE: "ar", EG: "ar", MA: "ar", CN: "zh-cn", TW: "zh-cn",
  HK: "zh-cn", JP: "ja", PT: "pt", AO: "pt", MZ: "pt", BR: "pt",
};

/**
 * Inline <head> script. Runs before first paint. A language saved in
 * localStorage (the visitor's explicit choice) wins over the geo-detected
 * cookie and is copied into `googtrans`. When the result is non-English it
 * hides the page, loads Google Translate immediately, and
 * reveals the page only once the translation has been applied (6s safety cap).
 * Translation starts after React hydrates (GoogleTranslateSwitcher calls
 * `__ikTranslateHydrated`) so Google's DOM edits don't break hydration.
 */
export const translateBootScript = `(function(){
  var d=document,h=d.documentElement;
  if(location.pathname.indexOf("/admin")===0)return;
  var m=d.cookie.match(/(?:^|;\\s*)googtrans=([^;]*)/);
  var lang=(m?decodeURIComponent(m[1]).split("/").pop():"")||"en";
  var stored=null;
  try{stored=localStorage.getItem(${JSON.stringify(LANGUAGE_STORAGE_KEY)});}catch(e){}
  if(stored&&stored!==lang&&${JSON.stringify(languageCodes)}.indexOf(stored)>-1){
    lang=stored;
    var host=location.hostname,local=host==="localhost"||host==="127.0.0.1";
    var exp="googtrans=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    d.cookie=exp;
    if(!local){d.cookie=exp+"; domain="+host;d.cookie=exp+"; domain=."+host;}
    if(lang!=="en")d.cookie="googtrans=/en/"+lang+"; path=/; max-age=31536000; samesite=lax"+(local?"":"; domain=."+host);
  }
  if(lang==="en")return;

  h.classList.add("gt-pending");
  var done=false;
  function reveal(){if(done)return;done=true;h.classList.remove("gt-pending");}
  setTimeout(reveal,6000);

  // Google Translate wraps text in <font> nodes; keep React from crashing on them.
  var rc=Node.prototype.removeChild,ib=Node.prototype.insertBefore;
  Node.prototype.removeChild=function(c){return c.parentNode!==this?c:rc.apply(this,arguments);};
  Node.prototype.insertBefore=function(n,r){return r&&r.parentNode!==this?n:ib.apply(this,arguments);};

  var loaded=false,hydrated=false,started=false;
  function start(){
    if(!loaded||!hydrated||started)return;
    started=true;
    var el=d.createElement("div");
    el.id="google_translate_element";
    el.className="ik-google-translate";
    el.setAttribute("aria-hidden","true");
    d.body.appendChild(el);
    var quiet,cap;
    var mo=new MutationObserver(function(){
      if(!/translated-(ltr|rtl)/.test(h.className))return;
      if(!cap)cap=setTimeout(finish,1500);
      clearTimeout(quiet);quiet=setTimeout(finish,250);
    });
    function finish(){mo.disconnect();reveal();}
    mo.observe(h,{attributes:true,attributeFilter:["class"]});
    mo.observe(d.body,{childList:true,subtree:true,characterData:true});
    new google.translate.TranslateElement({pageLanguage:"en",includedLanguages:${JSON.stringify(languageCodes.join(","))},autoDisplay:false},"google_translate_element");
  }
  window.googleTranslateElementInit=function(){loaded=true;start();};
  window.__ikTranslateHydrated=function(){hydrated=true;start();};

  var s=d.createElement("script");
  s.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async=true;
  s.onerror=reveal;
  d.head.appendChild(s);
})();`;
