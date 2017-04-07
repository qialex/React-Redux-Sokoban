import React, { Component, PropTypes } from 'react'
import Field from '../components/Field'

import {
  FIELD_STEP_INIT,
  FIELD_STEP_FINISH,
  FIELD_STEP_UP,
  FIELD_STEP_DOWN,
  FIELD_STEP_LEFT,
  FIELD_STEP_RIGHT
} from '../constants/Sokoban'

export default class History extends Component {
  componentWillMount() {
    window.addEventListener('keydown', ::this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', ::this.onKeyPress);
  }
  onKeyPress(e) {
	if (~['ArrowUp', 'ArrowDown'].indexOf(e.key)) {
		e.preventDefault();
	}
  }
  onStepNumberClick(stepIndex) {
	this.props.goToStep(stepIndex);
  }
  state = {
	fakeStepCurrent: 0,
	isFieldVisible: false,
	doScroll: false
  }
  render() {
	
    const { steps, stepCurrent, background } = this.props
	const { fakeStepCurrent, isFieldVisible } = this.state
	
    var historyTemplate;

	var self = this
	let constants = [FIELD_STEP_UP, FIELD_STEP_DOWN, FIELD_STEP_LEFT, FIELD_STEP_RIGHT, FIELD_STEP_INIT, FIELD_STEP_FINISH]
	let words = ['Up', 'Down', 'Left', 'Right', 'Init', 'Finish']
	historyTemplate = steps.map(function(data, index) {
		var word = words[constants.indexOf(data.direction)];
		return (
			<div className='historyPoint' key={index} onClick={self.onStepNumberClick.bind(self, index)} onMouseEnter={self.onMouseEnter.bind(self, index)}>
				<b className={index == stepCurrent ? 'historyPointCurrent' : ''}>{index}: {word}</b>
			</div>
		)
	})

    return <div className='history'>
		{isFieldVisible ? <div className='historyField'>
			<Field background={background} step={steps[fakeStepCurrent]} />
		</div> : '' }
		<div className='historyContainer' onWheel={::this.firefoxWheel} onMouseLeave={::this.onMouseLeave}>
			{historyTemplate}
		</div>
		<div className='historyStepsLength' >
			Moves: {steps.length-1}
		</div>			
    </div>
  }
  onMouseEnter(stepCurrent) {
	this.setState({fakeStepCurrent: stepCurrent, isFieldVisible:true, doScroll: false});
  }
  onMouseLeave() {
	this.setState({isFieldVisible:false});
  }
  componentDidUpdate() {
	if (this.state.doScroll) {
		document.querySelector('.historyPointCurrent').scrollIntoView(false)
	}
  }
	componentWillReceiveProps() {
		this.setState({doScroll: true});
	}
  firefoxWheel(e) {
	var historyContainer =  document.querySelector('.historyContainer')
	historyContainer.scrollTop = historyContainer.scrollTop + ((e.deltaY * e.deltaMode)*5)
  }
}

History.propTypes = {
	background: PropTypes.array.isRequired,
	steps: PropTypes.array.isRequired,
	stepCurrent: PropTypes.number.isRequired,
	goToStep: PropTypes.func.isRequired
}
