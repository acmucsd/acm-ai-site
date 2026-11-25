# Competition sites

The folders in this directory each represent a competition site. The name of the folder is the side ID.
`coming-soon` is the page everyone except admins sees while a site is Admin Only. It uses the `NoticePage` component, which is the same layout people see when they theres no comp in the portal.

## Adding a site

1. Copy `example` and rename the folder to your site ID. Site IDs are lowercase letters, numbers and dashes.
2. In the admin portal, turn on Custom Site for the competition and enter the same site ID. Turn on Admin Only so you can test in prod while you build the site (we *love* testing in prod here at ACM AI).
3. The site will be at `ai.acmucsd.com/comp/<siteId>`, or `localhost:3000/comp/<siteId>` locally. Your component gets `competitionName` for API calls and `basePath` to start its links with.
4. Turn off Admin Only when it's ready to launch!

Disclaimer: Admin Only hides a site, but it doesn't keep it secret (the code still ships in the public site bundle, so keep anything actually secret off `main` until launch)

## Giving a site its own subdomain

If you want the competition to be super duper fancy, you can give it a subdomain.

1. Get a CNAME from `<siteId>.ai.acmucsd.com` to `acmucsd-ai.netlify.app`. The general dev team usually manages this DNS stuff.
2. Add `<siteId>.ai.acmucsd.com` as a domain alias on our Netlify site.
3. Set `export const subdomain = true` in the site's `index.tsx`. The `/comp/<siteId>` path then redirects to the subdomain.

Login is shared across `ai.acmucsd.com` and every subdomain. To try subdomain mode locally, open `<siteId>.localhost:3000`. Login isn't shared locally, so use a site that isn't Admin Only.

When a subdomain site is retired, DELETE ITS DNS RECORD.
SUBDOMAIN TAKEOVER IS BAD:
https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Subdomain_takeover 
