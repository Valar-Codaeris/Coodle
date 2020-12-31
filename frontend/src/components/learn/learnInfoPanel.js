import React from 'react';
import { LearnList } from './learnList';
import { LearnDescription } from './learnDescription';
import { Card, CardContent, CardDescription, CardMeta } from 'semantic-ui-react';
const { cardStyle } = require('../../styles/styles');

export const InfoPanel = (props) => {
	return (
    <Card style={cardStyle}>
      <CardContent>
        <CardDescription>
          <h1 style={headingStyle}>Learn Mode</h1>
        </CardDescription>
        <CardMeta style={metaStyle}>
          Learn mode contains a variety of lessons to get you started with programming in Coodle.
          We will begin with the simple concept of drawing a line and will slowly progress to
          advanced topics lesson by lesson. To get started, begin by choosing a lesson from below.
        </CardMeta>
        <CardMeta>
          <LearnList list={props.list} onChoose={props.onChoose} />
          <LearnDescription/>
        </CardMeta>
      </CardContent>
    </Card>
	);
};

const headingStyle = {
	fontSize: 36,
};

const metaStyle = {
	marginBottom: 14,
}