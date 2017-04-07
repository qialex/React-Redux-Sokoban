import {
  ACTION_ADD_STEP,
  ACTION_STAGE_RESTART,
  ACTION_SET_STEP_CURRENT,
  ACTION_SET_STAGE
} from '../constants/Sokoban'


export function makeNewStep(steps, stepCurrent) {
  return (dispatch) => {
    dispatch({
      type: ACTION_ADD_STEP,
      payload: {steps: steps, stepCurrent: stepCurrent}
    })
  }
}

export function stageRestart(stepInit) {	
  return (dispatch) => {
    dispatch({
      type: ACTION_STAGE_RESTART,
      payload: {steps: [stepInit]}
    })
  }
}

export function goToStep(stepIndex) {	
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_STEP_CURRENT,
      payload: {stepCurrent: stepIndex}
    })
  }
}

export function stageSet (stageCurrent) {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_STAGE,
      payload: {stageCurrent: stageCurrent}
    })
  }
}