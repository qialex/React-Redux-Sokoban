import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {
	ACTION_ADD_STEP,
	ACTION_STAGE_RESTART,
	ACTION_SET_STEP_CURRENT,
	ACTION_SET_STAGE,
	FIELD_STEP_INIT,
	FIELD_STEP_RIGHT
} from '../../src/constants/Sokoban'
import {STAGES} from '../../src/constants/Stages';
import sokoban from '../../src/reducers/sokoban';
import {expect} from 'chai';

describe('Reducer sokoban', () => {
	
	describe('ACTION_ADD_STEP', () => {
		it('handles init step', () => {
			  
			const initialState = {
				stages: STAGES,
				stageCurrent: 0,
				steps: [],
				stepCurrent: 0
			}
			
			const stepInit = Object.assign({}, STAGES[0].init);
			const stepCurrent = 0;
			
			const action = {
				type: ACTION_ADD_STEP,
				payload: {steps: [stepInit], stepCurrent: stepCurrent}
			}
			
			const nextState = sokoban(initialState, action);
			expect(nextState.steps[0].direction).to.equal(FIELD_STEP_INIT);
		});
		  
		it('handles regular step', () => {
			  
			const initialState = {
				stages: STAGES,
				stageCurrent: 0,
				steps: [],
				stepCurrent: 0
			}
			
			const newSteps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];
			const newStepCurrent = 1;
			
			const action = {
				type: ACTION_ADD_STEP,
				payload: {steps: newSteps, stepCurrent: newStepCurrent}
			}
			
			const nextState = sokoban(initialState, action);
			expect(nextState.steps[1].direction).to.equal(FIELD_STEP_RIGHT);
		});
	});
	
	describe('ACTION_STAGE_RESTART', () => {
		it('restart stage', () => {
			
			const initialState = {
				stages: STAGES,
				stageCurrent: 0,
				steps: [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ],
				stepCurrent: 1
			}
			
			let stepInit = Object.assign({}, STAGES[0].init);
			stepInit.direction = FIELD_STEP_INIT;

			const action = {
				type: ACTION_STAGE_RESTART,
				payload: {steps: [stepInit]}
			}

			const nextState = sokoban(initialState, action);
			expect(nextState.steps[0].direction).to.equal(FIELD_STEP_INIT);
			expect(nextState.steps.length).to.equal(1);
		});
	});
	
	describe('ACTION_SET_STEP_CURRENT', () => {
		it('change stepCurrent', () => {
			
			const initialState = {
				stages: STAGES,
				stageCurrent: 0,
				steps: [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ],
				stepCurrent: 0
			}
			
			const newStepCurrent = 1;

			const action = {
				type: ACTION_SET_STEP_CURRENT,
				payload: {stepCurrent: newStepCurrent}
			}

			const nextState = sokoban(initialState, action);
			expect(nextState.stepCurrent).to.equal(1);
		});
	});
	
	describe('ACTION_SET_STAGE', () => {
		it('change stageCurrent', () => {
			
			const initialState = {
				stages: STAGES,
				stageCurrent: 0,
				steps: [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ],
				stepCurrent: 1
			}
			
			const newStageCurrent = 1;

			const action = {
				type: ACTION_SET_STAGE,
				payload: {stageCurrent: newStageCurrent}
			}

			const nextState = sokoban(initialState, action);
			expect(nextState.stageCurrent).to.equal(1);
			expect(nextState.steps[0].direction).to.equal(FIELD_STEP_INIT);
			expect(nextState.steps.length).to.equal(1);			
			expect(nextState.stepCurrent).to.equal(0);
		});
	});
});