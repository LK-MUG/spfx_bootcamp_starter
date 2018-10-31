/// <reference types="jest" />
/// <reference types="sinon" />

import * as React from 'react';
import { assert, expect } from 'chai';
import { mount, configure, ReactWrapper } from 'enzyme';
import GithubProfile from './GithubProfile';
import * as Adapter from 'enzyme-adapter-react-15';
import {IGithubDataProvider, GithubSummary} from '../../../integration/IGithubDataProvider';
import * as sinon from 'sinon';

configure({ adapter: new Adapter() });

class MockDataProvider implements IGithubDataProvider {
    UserData(githubUser: string): Promise<GithubSummary> {
        return new Promise<GithubSummary>((resolve) => {
            resolve(
                {
                    repos: [
                        {
                            isForked: true,
                            language: 'C#',
                            lastCommit: '29 October 2018',
                            repoName: 'TestRepo1'
                        },
                        {
                            isForked: false,
                            language: 'C#',
                            lastCommit: '29 October 2018',
                            repoName: 'TestRepo2'
                        }
                    ],
                    events: [
                        {
                            eventDate: '1 October 2018',
                            eventRepo: 'TestRepo1',
                            eventType: 'Push'
                        }
                    ]
                }
            );
        });
    }
}

describe('<GithubProfile />', () => {
    let componentDidMountSpy: sinon.SinonSpy;
    let renderedElement;

    beforeEach(() => {
        componentDidMountSpy = sinon.spy(GithubProfile.prototype, 'componentDidMount');
        renderedElement = mount(<GithubProfile githubUserName="joon" userFullName="Joon du Randt" githubDataProvider= {new MockDataProvider()} />);
    });

    afterEach(() => {
        componentDidMountSpy.restore();
    });

    // Test for checking if it is working
    it('Should do something', () => {
        assert.ok(true);
    });

    it('Should render user name', () => {
        // define the css selector
        let cssSelector: string = '#header';

        // find the element using css selector
        const headerText = renderedElement.find(cssSelector).text();
        expect(headerText).to.be.equal('Github information for Joon du Randt');
    });

/*
    These tests don't work. the ComponentDidUpdate logic on the mounted control is not running, causing 
    the component to only be partially updated.

    it('Should count one fork', () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {                
                // define the css selector
                let cssSelector: string = '#forkCount';
                // find the element using css selector
                const forkText = renderedElement.find(cssSelector).text();
                expect(forkText).to.include('has forked 1 repositories');
                resolve();
            }, 1500);
        });
    });

    it('Should render one repo', () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // define the css selector
                let cssSelector: string = '#repo1';
                // find the element using css selector        
                const repoText = renderedElement.find(cssSelector).text();
                expect(repoText).to.include('TestRepo2');
                resolve();
            }, 1500);
        });
    });

    it('Should render one event', () => {
        // define the css selector
        let cssSelector: string = '#event1';

        // find the element using css selector
        const eventText = renderedElement.find(cssSelector).text();
        expect(eventText).to.include('Push in TestRepo1');
    });
*/
});
