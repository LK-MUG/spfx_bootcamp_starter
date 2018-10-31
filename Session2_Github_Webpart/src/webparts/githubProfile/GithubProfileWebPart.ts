import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GithubProfileWebPartStrings';
import GithubProfile from './components/GithubProfile';
import { IGithubProfileProps } from './components/IGithubProfileProps';
import { GithubAPIProvider } from '../../integration/GithubAPIProvider';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IGithubProfileWebPartProps {
  listName: string;
}

interface IUserInfo {
  githubUserName: string;
  userFullName: string;
}

export default class GithubProfileWebPart extends BaseClientSideWebPart<IGithubProfileWebPartProps> {

  private readUserInfo(listItemId: number): Promise<IUserInfo> {    
    // TODO 2: Replace below line with code that reads from the list
    return new Promise<IUserInfo>((resolve) => resolve( { githubUserName: 'TODO UserName', userFullName: 'TODO FullName' } ));
  }

  private readListItemId(): number{
    let url = new URL(window.location.href);
    return +url.searchParams.get("listItemId");
  }
  
  public render(): void {
    let listItemId = this.readListItemId();
    if (!listItemId) {
      let element = React.createElement('div', null, `The containing page must have a 'listItemId' parameter for this control to load`);
      ReactDom.render(element, this.domElement);
      return;
    }
    
    if (!this.properties.listName) {
      let element = React.createElement('div', null, `Please supply a list name in the properties pane`);
      ReactDom.render(element, this.domElement);
      return;
    }

    this.readUserInfo(listItemId).then(
      (userInfo) => {
        const element: React.ReactElement<IGithubProfileProps> = React.createElement(
          GithubProfile,
          {
            githubUserName: userInfo.githubUserName,
            userFullName: userInfo.userFullName,
            githubDataProvider: new GithubAPIProvider()
          }
        );
        ReactDom.render(element, this.domElement);
      },
      (error) => {
        let element = React.createElement('div', null, `Could not read user info. Error: ${error}`);
        ReactDom.render(element, this.domElement);
      }
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                  // TODO 1: Implement list name validation
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
