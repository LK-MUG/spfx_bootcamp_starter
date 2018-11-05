import * as React from 'react';
import styles from './MsGraph.module.scss';
import { ICandidateInternalInfoProps } from './ICandidateInternalInfoProps';
import { ICandidateInternalInfoState } from './ICandidateInternalInfoState';
import { IGraphCandidate } from '../services/responseTypes/IGraphCandidate';
import { ISPListCandidate, ISPListCandidateListItem } from '../services/responseTypes/ISPListCandidate';
import { CandidateList } from "./CandidateList/CandidateList";
import { CandidateInfo } from "./CandidateInfo/CandidateInfo";

export default class CandidateInternalInfo extends React.Component<ICandidateInternalInfoProps, ICandidateInternalInfoState> {
  
  constructor(props: ICandidateInternalInfoProps, state: ICandidateInternalInfoState) {
    super(props);
    
    // Initialize the state of the component
    this.state = {
      users: [],
      candidate: null,
      selectedId: -1,
    };

    // binding so that we know what this is
    this.getCandidateById = this.getCandidateById.bind(this);
  }

  private getListIDFromURL(): number {
    // retrieve the listItem ID from the Query Params, we don't care what the other pramas
    // in the url are, we are assuming there is only 1.
    let url = window.location.href.split('?');
    let idParam;
    if (url.length > 1) {
      try {
        idParam = parseInt(url[1].split('=')[1], 10);
      } catch (error) {
        console.error("Failed to find the Candidate ListItem ID from URL");        
      }
    }
    return idParam;
  }

  // TODO Step 1.4 get Candidate from the list if it was present in the URL.
  // TODO Step 1.5 get all Candidates from the List if it was present in the URL.
  public componentDidMount(): void {
   
  }

  // TODO Step 1.6 use the spListClient to get all the available clients and display them by putting them in the state.
  private getCandidateList(): void {
    
  }

  // Step 1.7 use the listClient to get the Candidate Information from the List and log it to the console.
  // Step 2.3 use the result from the spListClient to request the candidate info from the graphClient, log it to the console.
  // Step 2.4 put the result from the graphClient into the state using setState.
  private getCandidateById(id: number): void {
    this.setState({selectedId: id});
  }

  public render(): React.ReactElement<ICandidateInternalInfoProps> {
    // The two sub-classes are just to make this one easier to read.
    return (
      <div className={ styles.graphConsumer }>
        <div className={ styles.container }>
          <div className={ styles.row }>
              {/* Display class For Step 1.6 */}
              <CandidateList
                selectedIndex={this.state.selectedId}
                switchCandidate={this.getCandidateById}
                users={this.state.users}
              />
              {
                /* Display class For Step 2.4 */
                this.state.candidate &&
                <CandidateInfo
                  candidate={this.state.candidate}
                  title={"Candidate Info"}
                />
              }
          </div>
        </div>
      </div>
    );
  }
}
