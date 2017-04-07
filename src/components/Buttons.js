import React, { Component, PropTypes } from 'react'
import {
  FIELD_BACKGROUND_EMPTY,
  FIELD_BACKGROUND_TARGET,
  FIELD_STEP_FINISH,
  FIELD_STEP_UP,
  FIELD_STEP_DOWN,
  FIELD_STEP_LEFT,
  FIELD_STEP_RIGHT,
} from '../constants/Sokoban'

export default class Buttons extends Component {
  componentWillMount() {
    window.addEventListener('keydown', ::this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', ::this.onKeyPress);
  }
  onKeyPress(e) {
	
	let constants = [FIELD_STEP_UP, FIELD_STEP_DOWN, FIELD_STEP_LEFT, FIELD_STEP_RIGHT]
	let keycodes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
	let key = keycodes.indexOf(e.key);
	if (key > -1) {
		e.preventDefault();
		this.onArrowBtnClick({target:{value:constants[key]}});
	}
  }
  nextFieldCoords(coords, direction) {
	return	direction == FIELD_STEP_UP 		? [coords[0] - 1, coords[1]] :
			direction == FIELD_STEP_DOWN 	? [coords[0] + 1, coords[1]] :
			direction == FIELD_STEP_RIGHT 	? [coords[0], coords[1] + 1] :
			direction == FIELD_STEP_LEFT 	? [coords[0], coords[1] - 1] : []
  }
  onArrowBtnClick(e) {
	
	const {background, steps, stepCurrent, makeNewStep, goToStep} = this.props
	const direction = e.target.value
	let newStepCurrent = stepCurrent + 1

	let newStep = {
		you: this.nextFieldCoords(steps[stepCurrent].you, direction),
		boxes: steps[stepCurrent].boxes.slice(),
		direction: direction
	}
	
	if (steps.length-1 > stepCurrent && newStep.direction == steps[newStepCurrent].direction) {
		goToStep(newStepCurrent);
		return
	}
	
	if ([FIELD_BACKGROUND_EMPTY, FIELD_BACKGROUND_TARGET].indexOf(background[newStep.you[0]][newStep.you[1]]) < 0 ) {
		return
	}
	
	for (let i=0; i<newStep.boxes.length; i++) {
		if (newStep.boxes[i][0] == newStep.you[0] && newStep.boxes[i][1] == newStep.you[1]) {
			
			newStep.boxes[i] = this.nextFieldCoords(newStep.boxes[i], direction) 
			
			if ([FIELD_BACKGROUND_EMPTY, FIELD_BACKGROUND_TARGET].indexOf(background[newStep.boxes[i][0]][newStep.boxes[i][1]]) < 0 ) {
				return
			}
			
			for (let j=0; j<newStep.boxes.length; j++) {
				if (i != j && newStep.boxes[j][0] == newStep.boxes[i][0] && newStep.boxes[j][1] == newStep.boxes[i][1]) {
					return
				}
			}
			
			break
		}
	}
	
	let isAllOnPlaces = true
	for (let i=0; i<newStep.boxes.length; i++) {
		if (background[newStep.boxes[i][0]][newStep.boxes[i][1]] !== FIELD_BACKGROUND_TARGET) {
			isAllOnPlaces = false
		}
	}
	if (isAllOnPlaces) {
		newStep.direction = FIELD_STEP_FINISH
	}
	
	makeNewStep(steps.slice(0, newStepCurrent).concat(newStep), newStepCurrent);
  }
  render() {
    return <div className='buttons' onClick={::this.onArrowBtnClick}>
		<div className='leftLabel'>Controls</div>
		<div className='rightButtons'>
			<button className='buttonUp' value={FIELD_STEP_UP} > ↑ </button>
			<div>
				<button value={FIELD_STEP_LEFT} > ← </button>
				<button value={FIELD_STEP_DOWN} > ↓ </button>		
				<button value={FIELD_STEP_RIGHT} > → </button>
			</div>
		</div>
    </div>
  }
}

Buttons.propTypes = {
  background: PropTypes.array.isRequired,
  steps: PropTypes.array.isRequired,
  stepCurrent: PropTypes.number.isRequired, 
  makeNewStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired 
}
