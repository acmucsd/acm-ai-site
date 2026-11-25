import { SITE_DOMAIN } from '../configs';

// live site shares login with comp sites on *.ai.acmucsd.com, secure since every
// subdomain gets it. host only anywhere else, like localhost
const scope = () => {
  const { hostname } = window.location;
  return hostname === SITE_DOMAIN || hostname.endsWith('.' + SITE_DOMAIN)
    ? `;domain=${SITE_DOMAIN};secure`
    : '';
};

export function getCookie(cname: string) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + scope();
}

export function deleteCookie(cname: string) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/' + scope();
}
