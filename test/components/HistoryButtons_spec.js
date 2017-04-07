import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {
  FIELD_STEP_INIT,
  FIELD_STEP_RIGHT,
  FIELD_STEP_LEFT,
  FIELD_STEP_UP,
  FIELD_STEP_DOWN,
  FIELD_STEP_FINISH,
  HISTORY_BUTTON_BACK,
  HISTORY_BUTTON_FORWARD
} from '../../src/constants/Sokoban'
import HistoryButtons from '../../src/components/HistoryButtons';
import {expect} from 'chai';

describe('HistoryButtons', () => {

	var steps, stepCurrent;
	
	function stageRestart(newSteps) { 
		let stepInit = Object.assign({}, newSteps[0]);
		steps = [stepInit]; 
		stepCurrent = 0;
	}
	
	function goToStep(newStepCurrent) {
		stepCurrent = newStepCurrent;
	}
	
	it ('has 3 divs and 3 buttons', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT } ];
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
		);
		
		var divs = scryRenderedDOMComponentsWithTag(component, 'div');
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(divs[0].className).to.equal('historyButtons');
		expect(divs[1].className).to.equal('leftLabel');
		expect(divs[2].className).to.equal('rightButtons');
		
		expect(buttons[0].value).to.equal(HISTORY_BUTTON_BACK);
		expect(buttons[1].className).to.equal('');
		expect(buttons[2].value).to.equal(HISTORY_BUTTON_FORWARD);
	});
	
	it ('resets level on clicking reset button', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];;
		stepCurrent = 1;
		
		var component = renderIntoDocument(
			<HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[1]);
		expect(steps.length).to.equal(1);
		expect(stepCurrent).to.equal(0);
	});
	
	it ('turnes history back', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];;
		stepCurrent = 1;
		
		var component = renderIntoDocument(
			<HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		expect(steps.length).to.equal(2);
		expect(stepCurrent).to.equal(0);
	});
	
	it ('turnes history forward', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];;
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[2]);
		expect(steps.length).to.equal(2);
		expect(stepCurrent).to.equal(1);
	});	
	
	it ('prevents history from overforwarding', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];;
		stepCurrent = 1;
		
		var component = renderIntoDocument(
			<HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[2]);
		expect(steps.length).to.equal(2);
		expect(stepCurrent).to.equal(1);
	});	
	
	it ('prevents history from stepCurrent less than 0', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];;
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<HistoryButtons steps={steps} stepCurrent={stepCurrent} stageRestart={stageRestart} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		expect(steps.length).to.equal(2);
		expect(stepCurrent).to.equal(0);
	});	
});