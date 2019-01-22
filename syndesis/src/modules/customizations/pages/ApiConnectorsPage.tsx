import { WithApiConnectors } from '@syndesis/api';
import { Connector } from '@syndesis/models';
import {
  CustomizationsApiConnectorListItem,
  CustomizationsApiConnectorListSkeleton,
  CustomizationsApiConnectorListView,
  IActiveFilter,
  IFilterType,
  IListViewToolbarAbstractComponent,
  ISortType,
  ListViewToolbarAbstractComponent,
  NavLinkTab,
} from '@syndesis/ui';
import { optionalIntValue, WithLoader } from '@syndesis/utils';
import { Grid } from 'patternfly-react';
import * as React from 'react';
import { NamespacesConsumer } from 'react-i18next';
import i18n from '../../../i18n';

function getFilteredAndSortedApiConnectors(
  apiConnectors: Connector[],
  activeFilters: IActiveFilter[],
  currentSortType: string,
  isSortAscending: boolean
) {
  let filteredAndSorted = apiConnectors;
  activeFilters.forEach((filter: IActiveFilter) => {
    const valueToLower = filter.value.toLowerCase();
    filteredAndSorted = filteredAndSorted.filter((api: Connector) =>
      api.name.toLowerCase().includes(valueToLower)
    );
  });

  filteredAndSorted = filteredAndSorted.sort((thisApi, thatApi) => {
    if (isSortAscending) {
      return thisApi.name.localeCompare(thatApi.name);
    }

    // sort descending
    return thatApi.name.localeCompare(thisApi.name);
  });

  return filteredAndSorted;
}

const filterByName = {
  filterType: 'text',
  id: 'name',
  placeholder: i18n.t('shared:filterByNamePlaceholder'),
  title: i18n.t('shared:Name'),
} as IFilterType;

const filterTypes: IFilterType[] = [filterByName];

const sortByName = {
  id: 'name',
  isNumeric: false,
  title: i18n.t('shared:Name'),
} as ISortType;

const sortTypes: ISortType[] = [sortByName];

export default class ApiConnectorsPage extends ListViewToolbarAbstractComponent<
  {},
  IListViewToolbarAbstractComponent
> {
  public state = {
    activeFilters: [] as IActiveFilter[],
    currentFilterType: filterByName,
    currentSortType: sortByName.title,
    currentValue: '',
    filterCategory: null,
    isSortAscending: true,
  };

  public filterUndefinedId(api: Connector): boolean {
    return api.id !== undefined;
  }

  public getUsedByMessage(api: Connector): string {
    const numUsedBy = optionalIntValue(api.uses);

    if (numUsedBy === 1) {
      return i18n.t('customizations:usedByOne');
    }

    return i18n.t('customizations:usedByMulti', { count: numUsedBy });
  }

  public handleDelete(apiConnectorId: string) {
    // TODO: implement handleDelete
    alert('Delete API client connector ' + apiConnectorId);
  }

  public handleDetails(apiConnectorId: string) {
    // TODO: implement handleDetails
    alert('Show details of API client connector ' + apiConnectorId);
  }

  public render() {
    return (
      <WithApiConnectors>
        {({ data, hasData, error }) => {
          const filteredAndSorted = getFilteredAndSortedApiConnectors(
            data.items,
            this.state.activeFilters,
            this.state.currentSortType,
            this.state.isSortAscending
          );

          return (
            <NamespacesConsumer ns={['customizations', 'shared']}>
              {t => (
                <Grid fluid={true}>
                  <Grid.Row
                    style={{
                      borderBottom: '1px solid #d1d1d1',
                      paddingBottom: 0,
                    }}
                  >
                    <Grid.Col xs={6} md={3}>
                      <NavLinkTab
                        disableLink={true}
                        i18nLinkTitle={t('apiConnector.apiConnectorsPageTitle')}
                        toLink={'/customizations/api-connector'}
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <NavLinkTab
                        disableLink={false}
                        i18nLinkTitle={t('extension.extensionsPageTitle')}
                        toLink={'/customizations/extensions'}
                      />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <CustomizationsApiConnectorListView
                      filterTypes={filterTypes}
                      sortTypes={sortTypes}
                      {...this.state}
                      linkCreateApiConnector={
                        '/customizations/api-connector/create/swagger-connector'
                      }
                      resultsCount={filteredAndSorted.length}
                      onUpdateCurrentValue={this.onUpdateCurrentValue}
                      onValueKeyPress={this.onValueKeyPress}
                      onFilterAdded={this.onFilterAdded}
                      onSelectFilterType={this.onSelectFilterType}
                      onFilterValueSelected={this.onFilterValueSelected}
                      onRemoveFilter={this.onRemoveFilter}
                      onClearFilters={this.onClearFilters}
                      onToggleCurrentSortDirection={
                        this.onToggleCurrentSortDirection
                      }
                      onUpdateCurrentSortType={this.onUpdateCurrentSortType}
                      i18nDescription={t(
                        'apiConnector.apiConnectorsPageDescription'
                      )}
                      i18nEmptyStateInfo={t('apiConnector.emptyStateInfo')}
                      i18nEmptyStateTitle={t('apiConnector.CreateApiConnector')}
                      i18nLinkCreateApiConnector={t(
                        'apiConnector.CreateApiConnector'
                      )}
                      i18nLinkCreateApiConnectorTip={t(
                        'apiConnector.createApiConnectorTip'
                      )}
                      i18nName={t('shared:Name')}
                      i18nResultsCount={t('shared:resultsCount', {
                        count: filteredAndSorted.length,
                      })}
                      i18nTitle={t('apiConnector.apiConnectorsPageTitle')}
                    >
                      <WithLoader
                        error={error}
                        loading={!hasData}
                        loaderChildren={
                          <CustomizationsApiConnectorListSkeleton
                            width={800}
                            style={{
                              backgroundColor: '#FFF',
                              marginTop: 30,
                            }}
                          />
                        }
                        errorChildren={<div>TODO</div>}
                      >
                        {() =>
                          data.items
                            .filter((api: Connector) =>
                              this.filterUndefinedId(api)
                            )
                            .map((api: Connector, index: number) => (
                              <CustomizationsApiConnectorListItem
                                key={index}
                                apiConnectorId={api.id as string}
                                apiConnectorDescription={api.description}
                                apiConnectorIcon={api.icon}
                                apiConnectorName={api.name}
                                i18nDelete={t('shared:Delete')}
                                i18nDetails={t('shared:Details')}
                                i18nDetailsTip={t(
                                  'apiConnector.detailsApiConnectorTip'
                                )}
                                i18nUsedByMessage={this.getUsedByMessage(api)}
                                onDelete={this.handleDelete}
                                onDetails={this.handleDetails}
                                usedBy={optionalIntValue(api.uses)}
                              />
                            ))
                        }
                      </WithLoader>
                    </CustomizationsApiConnectorListView>
                  </Grid.Row>
                </Grid>
              )}
            </NamespacesConsumer>
          );
        }}
      </WithApiConnectors>
    );
  }
}