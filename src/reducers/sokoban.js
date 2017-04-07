import {STAGES} from '../constants/Stages'
import {
	ACTION_ADD_STEP,
	ACTION_STAGE_RESTART,
	ACTION_SET_STEP_CURRENT,
	ACTION_SET_STAGE,
	FIELD_STEP_INIT
} from '../constants/Sokoban'

const initialState = {
	stages: STAGES,
	stageCurrent: 0,
	steps: [],
	stepCurrent: 0
}

export default function sokoban(state = initialState, action) {
	var stepsInit
	
	switch (action.type) {
		case ACTION_ADD_STEP:
			if (action.payload.steps.length == 1 && !action.payload.steps[0].direction) {
				action.payload.steps[0].direction = FIELD_STEP_INIT
			}
			return { ...state, steps: action.payload.steps, stepCurrent: action.payload.stepCurrent}

		case ACTION_STAGE_RESTART:
			return { ...state, steps: action.payload.steps, stepCurrent: 0}
		
		case ACTION_SET_STEP_CURRENT:
			return { ...state, stepCurrent: action.payload.stepCurrent}
			
		case ACTION_SET_STAGE:
			stepsInit = [Object.assign(state.stages[action.payload.stageCurrent].init)]
			if (!stepsInit[0].direction) {
				stepsInit[0].direction = FIELD_STEP_INIT
			}
			return { ...state, stageCurrent: action.payload.stageCurrent, steps: stepsInit, stepCurrent: 0}

		default:
			return state;
	}
}