import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {
  FIELD_STEP_INIT,
  FIELD_STEP_RIGHT,
  FIELD_STEP_LEFT,
  FIELD_STEP_UP,
  FIELD_STEP_DOWN,
  FIELD_STEP_FINISH
} from '../../src/constants/Sokoban'
import {STAGES} from '../../src/constants/Stages';
import History from '../../src/components/History';
import {expect} from 'chai';

describe('History', () => {

	function goToStep(newStepCurrent) {
		stepCurrent = newStepCurrent;
	}
	
	const background = STAGES[0].background.slice();
	var steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];
	var stepCurrent = 0;
	
	const component = renderIntoDocument(
		<History background={background} steps={steps} stepCurrent={stepCurrent} goToStep={goToStep} />
	);	
	
	it ('has 3 main divs and divs for every step point', () => {
		
		const divHistory = scryRenderedDOMComponentsWithClass(component, 'history');
		expect(divHistory.length).to.equal(1);
		
		const divHistoryContainer = scryRenderedDOMComponentsWithClass(component, 'historyContainer');
		expect(divHistoryContainer.length).to.equal(1);
		
		const divHistoryStepsLength = scryRenderedDOMComponentsWithClass(component, 'historyStepsLength');
		expect(divHistoryStepsLength.length).to.equal(1);		
		
		const divsHistoryPoint = scryRenderedDOMComponentsWithClass(component, 'historyPoint'); 
		expect(divsHistoryPoint.length).to.equal(2);
	});
	
	it ('renders another field for history', () => {
		
		component.setState({fakeStepCurrent: stepCurrent, isFieldVisible:true, doScroll: false});
		
		const historyField = scryRenderedDOMComponentsWithClass(component, 'historyField');
		expect(historyField.length).to.equal(1);
	});
	
	it ('changes stepCurent by clicking on historyPoint', () => {
		
		const historyPoints = scryRenderedDOMComponentsWithClass(component, 'historyPoint');
		Simulate.click(historyPoints[1]);
		expect(stepCurrent).to.equal(1);
	});	
});