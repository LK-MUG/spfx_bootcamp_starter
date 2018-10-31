/// <reference types="jest" />

import { GithubAPIProvider } from "./GithubAPIProvider";

describe('GithubApiProvider', () => {
  
  let apiProvider: GithubAPIProvider = new GithubAPIProvider();
  
  // Test for checking if it is working
  it('Should return events for a known account', (done) => {
    expect.assertions(1);
    expect(apiProvider.UserData('joon').then((data) => data.events.length)).resolves.toBeGreaterThan(0).then(done);
  });

  it('Should return repos for a known account', (done) => {
    expect.assertions(1);
    expect(apiProvider.UserData('joon').then((data) => data.repos.length)).resolves.toBeGreaterThan(0).then(done);
  });

  it('Should return empty repos for an unknown acount', (done) => {
    expect.assertions(1);
    expect(apiProvider.UserData('2323j_232-sds').then((data) => data.repos.length)).resolves.toBeLessThanOrEqual(0).then(done);
  });

  it('Should return empty events for an unknown acount', (done) => {
    expect.assertions(1);
    expect(apiProvider.UserData('2323j_232-sds').then((data) => data.events.length)).resolves.toBeLessThanOrEqual(0).then(done);
  });

});
