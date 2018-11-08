import * as React from 'react';
export interface IIntegrationStatusDetailProps {
    targetState: string;
    value?: string;
    currentStep?: number;
    totalSteps?: number;
}
export declare class IntegrationStatusDetail extends React.Component<IIntegrationStatusDetailProps> {
    render(): JSX.Element;
}