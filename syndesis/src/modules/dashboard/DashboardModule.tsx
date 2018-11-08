import { ModuleLoader } from "@syndesis/ui";
import { WithRouter } from "@syndesis/utils";
import * as React from "react";
import Loadable from 'react-loadable';

// this will be part of the main bundle, which sux but I have no idea how
// to avoid it right now
// import "@syndesis/dashboard/dist/dashboard.css";

const LoadableDashboardPage = Loadable({
  loader: () =>
      import(/* webpackChunkName: "Dashboard" */  "@syndesis/dashboard"),
  loading: ModuleLoader
});

export class DashboardModule extends React.Component {
  public render() {
    return (
      <WithRouter>
        {({ match }) => (
          <LoadableDashboardPage baseurl={match.url}/>
        )}
      </WithRouter>
    );
  }
}