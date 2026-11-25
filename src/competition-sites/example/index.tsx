import { SiteProps } from '..';

// set true once <siteId>.ai.acmucsd.com is set up, see the README
export const subdomain = false;

export default function ExampleSite({ competitionName, basePath }: SiteProps) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{competitionName}</h1>
      <p>
        This is a template for a competition site! 
        Copy this folder, rename it to your site ID and build out your dream competition site from here!
        Links inside the site start with <code>{basePath || '/'}</code>.
      </p>
    </div>
  );
}
