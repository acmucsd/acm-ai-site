import { Input, Switch } from 'antd';
import { SITE_DOMAIN } from '../../configs';

type SiteFieldsProps = {
  customSite: boolean;
  setCustomSite: (on: boolean) => void;
  siteId: string;
  setSiteId: (id: string) => void;
  siteAdminOnly: boolean;
  setSiteAdminOnly: (on: boolean) => void;
};

export default function SiteFields({
  customSite,
  setCustomSite,
  siteId,
  setSiteId,
  siteAdminOnly,
  setSiteAdminOnly,
}: SiteFieldsProps) {
  return (
    <>
      <div>
        <span>Custom Site</span>
        <Switch checked={customSite} onChange={setCustomSite} />
      </div>
      {customSite && (
        <>
          <div>
            <span>Site ID, the folder in src/competition-sites ({SITE_DOMAIN}/comp/{siteId || 'id'})</span>
            <Input
              placeholder="Enter site ID"
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="narrow"
            />
          </div>
          <div>
            <span>Admin Only (everyone else sees "Coming Soon" page)</span>
            <Switch checked={siteAdminOnly} onChange={setSiteAdminOnly} />
          </div>
        </>
      )}
    </>
  );
}
