import React, { Component, PropTypes } from 'react'
import { LEVEL_PREVIOUS, LEVEL_NEXT } from '../constants/Sokoban'

export default class Levels extends Component {
  componentWillMount() {
    window.addEventListener('keydown', ::this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', ::this.onKeyPress);
  }
  onKeyPress(e) {
	switch (e.key) {
		case 'PageUp':
			this.onStageBtnClick({target:{value:LEVEL_PREVIOUS}});
			break;
		case 'PageDown':
			this.onStageBtnClick({target:{value:LEVEL_NEXT}});
			break;		
	}
  }
  onStageBtnClick(e) {
	const {stagesCount, stageCurrent, stageSet} = this.props
	let newStageCurrent
	
	if (e.target.value == LEVEL_PREVIOUS) {
		newStageCurrent = stageCurrent > 0 ? stageCurrent - 1 : stagesCount - 1
	} else if (e.target.value == LEVEL_NEXT) {
		newStageCurrent = stageCurrent < stagesCount - 1 ? stageCurrent + 1 : 0
	}

	stageSet(newStageCurrent);
  } 
  render() {
	
    const {stagesCount, stageCurrent} = this.props

    return <div className='levels'>
			<div className='leftLabel'>Level</div>
			<div className='rightButtons'>
				<button
					value={LEVEL_PREVIOUS}
					onClick={::this.onStageBtnClick}
					> ◄ </button>
				<button className='noClicked'> {stageCurrent + 1}/{stagesCount} </button>	
				<button
					value={LEVEL_NEXT}
					onClick={::this.onStageBtnClick}
					> ► </button>
			</div>
    </div>
  }
}

Levels.propTypes = {
  stagesCount: PropTypes.number.isRequired,
  stageCurrent: PropTypes.number.isRequired,
  stageSet: PropTypes.func.isRequired
}
