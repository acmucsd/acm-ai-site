import React, { useEffect } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';

function WorkshopsPage(props: any) {
  useEffect(() => {}, []);
  return (
    <DefaultLayout>
      <div className = "WorkshopsPage">
        <div className = "hero">
          <h1 id = "title">Workshops</h1>
          <p className = "subtext">
            Welcome to the workshops page!
          </p>
        </div>
        <div>
          <div className = "main-section">
            <h1 className = "statement">Workshop details 1</h1>
            <p className = "subtext">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, vestibulum sagittis sodales faucibus, venenatis gravida ipsum. Ut ut turpis eu tortor porta scelerisque in ut nisi. Suspendisse sagittis enim quis imperdiet interdum. Sed laoreet felis quis nisl cursus, in vestibulum est euismod. Duis feugiat mattis nibh, vitae consectetur magna rutrum non. Sed ultrices felis at eros rhoncus pulvinar. Mauris vel sagittis lacus, a viverra mi. Vivamus facilisis arcu eu nunc ornare, sed vestibulum nisl tincidunt. Proin accumsan mattis euismod. Proin a placerat justo. Quisque dictum augue a suscipit posuere. Donec a accumsan sem. Vivamus tincidunt nisl sed justo lacinia, eget rutrum diam porta. 
            </p>
          </div>
          <div className = "main-section">
            <h1 className = "statement">Workshop details 2</h1>
            <p className = "subtext">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam nunc, vestibulum sagittis sodales faucibus, venenatis gravida ipsum. Ut ut turpis eu tortor porta scelerisque in ut nisi. Suspendisse sagittis enim quis imperdiet interdum. Sed laoreet felis quis nisl cursus, in vestibulum est euismod. Duis feugiat mattis nibh, vitae consectetur magna rutrum non. Sed ultrices felis at eros rhoncus pulvinar. Mauris vel sagittis lacus, a viverra mi. Vivamus facilisis arcu eu nunc ornare, sed vestibulum nisl tincidunt. Proin accumsan mattis euismod. Proin a placerat justo. Quisque dictum augue a suscipit posuere. Donec a accumsan sem. Vivamus tincidunt nisl sed justo lacinia, eget rutrum diam porta. 
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default WorkshopsPage;
