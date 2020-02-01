import React from 'react';
import { Progress } from 'semantic-ui-react';
import styles from './ProgressBar.module.scss';

interface IProps {
    uploadState:string,
    percentUploaded:number,
}

const ProgressBar = ({uploadState, percentUploaded}:IProps) =>
    uploadState === 'uploading' ?  <Progress
                        className={styles.progressBar}
                        percent={percentUploaded}
                        progress    
                        indicating
                        size='medium'
                        inverted />
                    :
                   <> </>;


export default ProgressBar;