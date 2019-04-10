// import { WithIntegrations } from '@syndesis/api';
import { Integration } from '@syndesis/models';
// import { IntegrationDetailHistoryListView, IntegrationDetailHistoryListViewItem } from '@syndesis/ui';
// import { Loader } from '@syndesis/ui';
import { WithRouteData } from '@syndesis/utils';
import * as React from 'react';
import { Translation } from 'react-i18next';
import { IntegrationDetailNavBar } from '../../../../shared/IntegrationDetailNavBar';

/**
 * @integrationId - the ID of the integration for which details are being displayed.
 */
export interface IDetailsPageParams {
  integration: Integration;
  integrationId: string;
}

export interface IDetailsPageState {
  integration: Integration;
}

// const integrationHistoryItems: IntegrationDetailHistoryListViewItem[];

/**
 * This page shows the first, and default, tab of the Integration Detail page.
 *
 * This component expects an integrationId in the URL
 *
 */
export class HistoryPage extends React.Component {
  public render() {
    return (
      <WithRouteData<IDetailsPageParams, IDetailsPageState>>
        {({ integrationId }, { integration }, { history }) => {
          return (
            <div>
              <Translation ns={['integration', 'shared']}>
                {t => <IntegrationDetailNavBar />}
              </Translation>
              <p>This is the Integration Detail History page.</p>
            </div>
          );
        }}
      </WithRouteData>
    );
  }
}