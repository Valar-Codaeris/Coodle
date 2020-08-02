import React from 'react';
import { Grid, Divider, Icon } from 'semantic-ui-react';


import { Learn } from './learn';
import  {LearnList} from './learnList';
import {LearnDescription} from './learnDescription';

export class LearnSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learnList: [
                'line',
                'rotate',
                'triangle',
                'square'
            ]
        };
    }

    render() {
        return <div><Grid  columns="equal">
            <Grid.Column style={studyStyle}>
                <LearnList list={this.state.learnList}/>
                <LearnDescription list={this.state.learnList}/>
            </Grid.Column >

            <Grid.Column style={executeStyle}>
                <Learn/>
            </Grid.Column>
            
        </Grid><Divider style={{zIndex: -1}} vertical><Icon name="book" size="huge"/></Divider></div>
    }

}


const executeStyle = {
    width: '50vw'
};

const studyStyle = {
    // background: 'white',
    width: '50vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'space-around',

}