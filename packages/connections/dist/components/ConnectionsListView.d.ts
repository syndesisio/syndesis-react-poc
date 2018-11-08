import { IConnection } from "@syndesis/models";
import { IListViewToolbarProps } from "@syndesis/ui";
import * as React from 'react';
export interface IConnectionsListViewProps extends IListViewToolbarProps {
    baseurl: string;
    loading: boolean;
    connections: IConnection[];
}
export declare class ConnectionsListView extends React.Component<IConnectionsListViewProps> {
    render(): JSX.Element;
}