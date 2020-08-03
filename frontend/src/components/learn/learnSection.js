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

    chooseLevel (level)  {
        this.setState({
            level: level+1
        })
    }
    render() {
        return <div style={sectionStyle}><Grid  columns="equal">
            <Grid.Column style={studyStyle}>
                <LearnList list={this.state.learnList} onChoose={this.chooseLevel.bind(this)}/>
                <LearnDescription list={this.state.learnList}/>
            </Grid.Column >

            <Grid.Column style={executeStyle}>
                <Learn level={this.state.level}/>
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
    justifyContent: 'space-around',
    alignItems: 'space-around',

};

const sectionStyle = {
    height: '100%'
}