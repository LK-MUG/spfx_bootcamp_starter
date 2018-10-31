import * as React from 'react';
import styles from './GithubProfile.module.scss';
import { IGithubProfileProps } from './IGithubProfileProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IGithubProfileState } from './IGithubProfileState';

export default class GithubProfile extends React.Component<IGithubProfileProps, IGithubProfileState> {

  constructor(props: IGithubProfileProps) {
    super(props);

    this.state = {
      fullName: '', 
      githubUserName: '',
      events: [],
      repos: [],
      loading: false
    };

    this.loadGithubData = this.loadGithubData.bind(this);
  }

  private loadGithubData() {
    if (this.state.githubUserName != this.props.githubUserName) {
      this.setState( {fullName: this.props.userFullName, githubUserName : this.props.githubUserName, loading: true, events: null, repos: null });
      this.props.githubDataProvider.UserData(this.props.githubUserName).then((userInfo) =>
        this.setState({ ...this.state, repos: userInfo.repos, events: userInfo.events, loading: false })
      );
    }
  }

  public componentDidMount(): void {
      this.loadGithubData();
  }

  public componentDidUpdate() : void {
    this.loadGithubData();
  }

  public render(): React.ReactElement<IGithubProfileProps> {
    let repoCounter = 0;
    let eventCounter = 0;
    return (      
      <div className={styles.githubProfile}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span id='header' className={styles.title}>TODO 1: Github control heading</span>
              <p className={styles.subTitle}>Github repositories created</p>
              <p className={styles.description}>
                TODO 2: Load repos
              </p>
              <p className={styles.subTitle}>Recent Github events</p>
              <p className={styles.description}>
                TODO 3: Display Events
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
