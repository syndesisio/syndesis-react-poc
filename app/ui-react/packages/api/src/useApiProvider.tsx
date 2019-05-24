import { APISummary } from '@syndesis/models';
import * as React from 'react';
import { ApiContext } from './ApiContext';
import { callFetch } from './callFetch';

export function useApiProvider(
  specification: string
): [APISummary | undefined, boolean, boolean | Error] {
  const apiContext = React.useContext(ApiContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<false | Error>(false);
  const [apiSummary, setApiSummary] = React.useState<APISummary | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const body = new FormData();
        body.append('specification', specification);
        const response = await callFetch({
          body,
          headers: apiContext.headers,
          includeAccept: true,
          includeContentType: false,
          method: 'POST',
          url: `${apiContext.apiUri}/apis/info`,
        });
        const summary = await response.json();
        if (summary.errorCode) {
          throw new Error(summary.userMsg);
        }
        setApiSummary(summary as APISummary);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [specification, apiContext, setLoading]);

  return [apiSummary, loading, error];
}