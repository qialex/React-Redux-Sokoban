import React, { Component, PropTypes } from 'react'
import {
  FIELD_BACKGROUND_EMPTY,
  FIELD_BACKGROUND_TARGET,
  FIELD_BACKGROUND_WALL,
  FIELD_STEP_FINISH
} from '../constants/Sokoban'

export default class Field extends Component {
  render() {
    const { background, step } = this.props
		
    var fieldTemplate = [];

	for (let i=0; i<background.length; i++) {

		fieldTemplate[i] = background[i].map(function(data, index) {
			let isYou = step.you[0] == i && step.you[1] == index;
			let isBox = false;
			
			for (let j=0; j<step.boxes.length; j++) {
				if (step.boxes[j][0] == i && step.boxes[j][1] == index) {
					isBox = true;
				}
			}
			
			if (data == '') {
				let neighbors = [
					[i-1, index-1], [i, index-1], [i+1, index-1],
					[i-1, index  ],               [i+1, index-1],
					[i-1, index+1], [i, index+1], [i+1, index+1],				
				]
				
				for (let j=0; j<neighbors.length; j++) {
					if (background[neighbors[j][0]]) {
						if ([FIELD_BACKGROUND_EMPTY, FIELD_BACKGROUND_TARGET].indexOf(background[neighbors[j][0]][neighbors[j][1]]) > -1) {
							data = FIELD_BACKGROUND_WALL
						}
					}
				}
			}

			return (
				<div key={index} 
					className={
						'oneField ' 
						+ (data == FIELD_BACKGROUND_EMPTY ? 'fieldEmpty' : ' ') 
						+ (data == FIELD_BACKGROUND_TARGET ? 'fieldTarget' : ' ') 
						+ (data == FIELD_BACKGROUND_WALL ? 'fieldWall' : ' ') 
						+ (isYou ? 'fieldYou' : '') 
						+ (isBox ? 'fieldBox' : '') 
					}
					></div>
			)
		})
	}

    return <div className='fieldContainer'>
		{step.direction == FIELD_STEP_FINISH ? <div className='fieldWinning'>You win!</div> : ''}
      {fieldTemplate}
    </div>
  }
}

Field.propTypes = {
  background: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired
}