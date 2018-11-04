import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import * as strings from 'MsGraphWebPartStrings';
import CandidateInternalInfo from './components/CandidateInternalInfo';

import { graph } from "@pnp/graph";
import { sp } from "@pnp/sp";
import { AadTokenProvider } from '@microsoft/sp-http';
import { MSGraphRestService } from './services/MSGraphRestService';
import { CandidateListService } from './services/CandidateListService';
import { CandidateGraphService } from './services/CandidateGraphServices';
import { ICandidateInternalInfoProps } from './components/ICandidateInternalInfoProps';

export interface IMsGraphWebPartProps {
  listName: string;
}

export default class MsGraphWebPart extends BaseClientSideWebPart<IMsGraphWebPartProps> {

  // need to instantiate the @pnp/graph api, requires your o-auth token
  // need to instantiate the @pnp/sp api, requires the context of the webpart
  public onInit(): Promise<void> {
    return new Promise((resolve, reject) => {
      // TODO Step 1.1 setup @pnp/sp
      
      // TODO Step 2.1 setup @pnp/graph using aadTokenProviderFactory and FetchClientFactory
      resolve();
    });
  }
  
  // the rendering life-cycle phase of the webpart.
  public render(): void {
    // instantiates the Candidate internal information class.
    const element: React.ReactElement<ICandidateInternalInfoProps>  = React.createElement(
      // We use concrete classes here because this is the integration point with 
      // SharePoint and with our services.
      CandidateInternalInfo,
      {
        // TODO Step 2.2 instantiate the CandidateGraphService as a dependency for the React Display
        // TODO Step 3.2 Read the implementation of this class
        graphClient: null,

        // TODO Step 1.3 instantiate the CandidateListService as a dependency for the React Display
        // TODO Step 3.3 Read the impelementation of this class
        spListClient: null
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // TODO Step 1.2 add the List Name property to the property pane
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
              ]
            }
          ]
        }
      ]
    };
  }
}
