import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Field from '../components/Field'
import Controls from '../components/Controls'
import * as SokobanActions from '../actions/SokobanActions'

class App extends Component {
  render() {
	const state = this.props.sokobanState
	const actions = this.props.SokobanActions
	let stage = state.stages[state.stageCurrent]
	let step = state.steps[state.stepCurrent]
	
	if (!step) {
		actions.makeNewStep([Object.assign(stage.init)], 0)
		return <div></div>
	}
	
    return <div className='app'>
      <Header />
		<div className='mainField'>
			<Field className='mainField' background={stage.background} step={step} />
		</div>
      <Controls sokobanState={state} sokobanActions={actions} />
    </div>
  }
}

function mapStateToProps(state) {
  return {
	sokobanState: state.sokoban
  }
}

function mapDispatchToProps(dispatch) {
  return {
	SokobanActions: bindActionCreators(SokobanActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

App.PropTypes = {
  sokobanState: PropTypes.object.isRequired,
  SokobanActions: PropTypes.object.isRequired
}