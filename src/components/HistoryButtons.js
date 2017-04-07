import React, { Component, PropTypes } from 'react'
import {
  HISTORY_BUTTON_BACK,
  HISTORY_BUTTON_FORWARD
} from '../constants/Sokoban'

export default class HistoryButtons extends Component {
  componentWillMount() {
    window.addEventListener('keydown', ::this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', ::this.onKeyPress);
  }
  onKeyPress(e) {
	switch (e.key) {
		case 'Backspace':
			this.onStepDirectionBtnClick({target:{value:HISTORY_BUTTON_BACK}});
			break;
		case 'Enter':
			this.onStepDirectionBtnClick({target:{value:HISTORY_BUTTON_FORWARD}});
			break;			
		case 'Delete':
			this.onRestartBtnClick();
			break;			
	}
  }
  onStepNumberClick(stepIndex) {
	this.props.goToStep(stepIndex);
  }
  onStepDirectionBtnClick (e) {
	const { steps, stepCurrent, goToStep } = this.props
	
	if (e.target.value == HISTORY_BUTTON_BACK && stepCurrent > 0) {
		goToStep(stepCurrent - 1);
	}
	if (e.target.value == HISTORY_BUTTON_FORWARD && stepCurrent < steps.length-1) {
		goToStep(stepCurrent + 1);
	}
  }	
  onRestartBtnClick () {
	const { steps, stageRestart } = this.props
	let stepInit = Object.assign({}, steps[0]);
	stageRestart(stepInit)
  }
  render() {
    return <div className='historyButtons'>
		<div className='leftLabel'>History</div>
		<div className='rightButtons'>
			<button value={HISTORY_BUTTON_BACK} onClick={::this.onStepDirectionBtnClick}> &#8634; </button>
			<button onClick={::this.onRestartBtnClick}> &#8855; </button>
			<button value={HISTORY_BUTTON_FORWARD} onClick={::this.onStepDirectionBtnClick}> &#8635; </button>
		</div>
    </div>
  }
}

HistoryButtons.propTypes = {
	steps: PropTypes.array.isRequired,
	stepCurrent: PropTypes.number.isRequired,
	stageRestart: PropTypes.func.isRequired,
	goToStep: PropTypes.func.isRequired
}
