import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import UserContext from '../UserContext';
import { getCompetitionSite } from '../actions/competition';
import { SITE_DOMAIN } from '../configs';
import NotFoundPage from '../pages/404Page';
import ComingSoon from './coming-soon';

export type SiteProps = { competitionName: string; basePath: string };

type SiteModule = { default: React.ComponentType<SiteProps>; subdomain?: boolean };

type SiteState =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'hidden' }
  | { status: 'ready'; competitionName: string; Site: React.ComponentType<SiteProps> };

// <siteId>.ai.acmucsd.com, or <siteId>.localhost to try subdomain mode locally
export const siteIdFromHost = () =>
  window.location.hostname.match(/^([a-z0-9-]+)\.(ai\.acmucsd\.com|localhost)$/)?.[1];

// basePath is /comp/<siteId>, or empty on the site's subdomain
export default function CompetitionSite({ siteId, basePath }: { siteId: string; basePath: string }) {
  const { user } = useContext(UserContext);
  const [state, setState] = useState<SiteState>({ status: 'loading' });

  useEffect(() => {
    setState({ status: 'loading' });
    getCompetitionSite(siteId, user.loggedIn)
      .then(async ({ visible, competitionName }) => {
        if (!visible) {
          setState({ status: 'hidden' });
          return;
        }
        // only loaded once the API says this viewer can see it
        const site: SiteModule = await import(`./${siteId}/index`);
        if (site.subdomain && window.location.hostname === SITE_DOMAIN) {
          const { pathname, search, hash } = window.location;
          window.location.replace(`https://${siteId}.${SITE_DOMAIN}${pathname.slice(basePath.length)}${search}${hash}`);
          return;
        }
        setState({ status: 'ready', competitionName: competitionName!, Site: site.default });
      })
      // unknown site id or no folder for it
      .catch(() => setState({ status: 'missing' }));
  }, [siteId, basePath, user.loggedIn]);

  if (state.status === 'loading') return <Spin fullscreen />;
  if (state.status === 'missing') return <NotFoundPage />;
  if (state.status === 'hidden') return <ComingSoon />;
  const { Site, competitionName } = state;
  return <Site competitionName={competitionName} basePath={basePath} />;
}
