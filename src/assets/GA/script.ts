export const DevScripts = [
  'const queryString = window.location.search; const urlParams = new URLSearchParams(queryString);var origin = urlParams.get("platform") || "myjio"; var utmData = {utmSource: urlParams.get("utm_source"),utmMedium:urlParams.get("utm_medium"),utmCampaign:urlParams.get("utm_campaign"),utmContent:urlParams.get("utm_content"),utmTerm:urlParams.get("utm_term")}',
  'dataLayer = [{app_name: "flip_the_bottle", env: "dev",Offer:"smartphone","platform" : origin,...utmData }];',
  'window.dataLayer = window.dataLayer || [];src = "https://www.googletagmanager.com/ns.html?id=GTM-TDJBK5Z";',
  '(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({  "gtm.start": new Date().getTime(), event: "gtm.js" });  var f = d.getElementsByTagName(s)[0], j = d.createElement(s),  dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true;j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f);})(window, document, "script", "dataLayer", "GTM-TDJBK5Z");',
];
export const ProdScripts = [
  'const queryString = window.location.search; const urlParams = new URLSearchParams(queryString);var origin = urlParams.get("platform") || "myjio"; var utmData = {utmSource: urlParams.get("utm_source"),utmMedium:urlParams.get("utm_medium"),utmCampaign:urlParams.get("utm_campaign"),utmContent:urlParams.get("utm_content"),utmTerm:urlParams.get("utm_term")}',
  'dataLayer = [{app_name: "flip_the_bottle", env: "prod",device:"smartphone","platform":origin,...utmData }];',
  'window.dataLayer = window.dataLayer || [];src = "https://www.googletagmanager.com/ns.html?id=GTM-TDJBK5Z";',
  '(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({  "gtm.start": new Date().getTime(), event: "gtm.js" });  var f = d.getElementsByTagName(s)[0], j = d.createElement(s),  dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true;j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f);})(window, document, "script", "dataLayer", "GTM-TDJBK5Z");',
];
