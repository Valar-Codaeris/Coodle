import React from 'react'
import { Breakpoint } from 'react-socks';
import { Button, Card, CardContent, CardDescription, CardMeta } from 'semantic-ui-react';
const { cardStyle, buttonListStyle, buttonStyle } = require('../../styles/styles');

export const InfoPanel = () => {
  return (
    <Card style={cardStyle}>
      <CardContent>
        
        <CardDescription>
          <h1 style={headingStyle}>Draw Mode</h1>
        </CardDescription>

        <CardMeta>
          Within <strong>Draw mode</strong> you can freely explore the
          knowledge that you have so far gained by completing the lessons in
          the <strong> Learn mode</strong>. To get you started with
          experimentation, you can try playing with FORWARD, ROTATE and
          LOOPS to draw shapes such as stars and squares as show below:
        </CardMeta>

        <CardDescription style={imageStyle}>
          <img src="/assets/draw-example1.png"/>
          <img src="/assets/draw-example2.png"/>
        </CardDescription>

        <Breakpoint small down>
          <CardDescription style={buttonListStyle}>
            <Button style={buttonStyle} color="blue">
              Let's Draw!
            </Button>
          </CardDescription>
        </Breakpoint>

      </CardContent>
    </Card>
  );
}

const headingStyle = {
	fontSize: 36,
};

const imageStyle = {
	display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
};