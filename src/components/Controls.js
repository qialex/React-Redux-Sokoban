import React, { Component, PropTypes } from 'react'
import Help from '../components/Help'
import Buttons from '../components/Buttons'
import HistoryButtons from '../components/HistoryButtons'
import History from '../components/History'
import Levels from '../components/Levels'
import { FIELD_STEP_FINISH } from '../constants/Sokoban'

export default class Controls extends Component {
  componentWillMount() {
    window.addEventListener('keydown', ::this.checkWinner, true)
	window.addEventListener('click', ::this.checkWinner, true)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', ::this.checkWinner, true)
	window.removeEventListener('click', ::this.checkWinner, true)
  }
  checkWinner(e) {
	const { steps, stepCurrent } = this.props.sokobanState
	if (steps[stepCurrent].direction == FIELD_STEP_FINISH) {
		e.stopPropagation();
	}
  }
  onAnyClick(e) {
	e.target.blur();
  }
  render() {
	
    const { stages, stageCurrent, steps, stepCurrent } = this.props.sokobanState
	const { stageSet, makeNewStep, stageRestart, goToStep } = this.props.sokobanActions

	if (steps[stepCurrent].direction == FIELD_STEP_FINISH) {
		setTimeout(function () {
			stageSet(stages[stageCurrent+1] ? stageCurrent+1 : 0);
		},1200)
	}	
	
    return <div className='controls' onClick={::this.onAnyClick}>
      <Help />
      <Levels stagesCount={stages.length} stageCurrent={stageCurrent} stageSet={stageSet} />
      <Buttons background={stages[stageCurrent].background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
      <HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
      <History background={stages[stageCurrent].background} steps={steps} stepCurrent={stepCurrent} goToStep={goToStep} />
    </div>
  }
}

Controls.PropTypes = {
  sokobanState: PropTypes.object.isRequired,
  sokobanActions: PropTypes.object.isRequired
}