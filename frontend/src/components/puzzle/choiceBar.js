import React from 'react';
import { Segment } from 'semantic-ui-react';

export const ChoiceBar = (props) => {
    const [level, setLevel] = React.useState(0);
    const levels = [ ];
    for(let i=1; i<=3; i++) {
        const levelComponent = <Segment  style={levelStyle} onClick={() => props.onChoose(i)}>
            Level: {i}
        </Segment>;
        levels.push(levelComponent);
    }
    return <div style={chooseBarStyle}>
        {levels}
    </div>;
}

const chooseBarStyle = {
    width: '40vw',
    height: '30vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px'
};

const levelStyle = {
    margin: 0,
    cursor: 'pointer',

}