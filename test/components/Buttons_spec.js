import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {STAGES} from '../../src/constants/Stages';
import {
  FIELD_STEP_INIT,
  FIELD_STEP_RIGHT,
  FIELD_STEP_LEFT,
  FIELD_STEP_UP,
  FIELD_STEP_DOWN,
  FIELD_STEP_FINISH
} from '../../src/constants/Sokoban'
import Buttons from '../../src/components/Buttons';
import {expect} from 'chai';

describe('Buttons', () => {

	var background = STAGES[0].background.slice();
	var steps, stepCurrent;
	
	function makeNewStep(newSteps, newStepCurrent) { 
		steps = newSteps; 
		stepCurrent = newStepCurrent;
	}
	
	function goToStep(newStepCurrent) {
		stepCurrent = newStepCurrent;
	}
	
	it ('has 4 divs and 4 buttons', () => {
		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT } ];
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var divs = scryRenderedDOMComponentsWithTag(component, 'div');
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		expect(divs[0].className).to.equal('buttons');
		expect(divs[1].className).to.equal('leftLabel');
		expect(divs[2].className).to.equal('rightButtons');
		expect(divs[3].className).to.equal('');
		
		expect(buttons[0].className).to.equal('buttonUp');
		expect(buttons[1].className).to.equal('');
		expect(buttons[2].className).to.equal('');
		expect(buttons[3].className).to.equal('');
	});
	
	
	it('moves hero in four directions', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT }, { "you": [ 6, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_DOWN }, { "you": [ 6, 11 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT }, { "you": [ 5, 11 ], "boxes": [ [ 4, 10 ], [ 4, 11 ] ], "direction": FIELD_STEP_UP }, { "you": [ 4, 11 ], "boxes": [ [ 4, 10 ], [ 3, 11 ] ], "direction": FIELD_STEP_UP }, { "you": [ 5, 11 ], "boxes": [ [ 4, 10 ], [ 3, 11 ] ], "direction": FIELD_STEP_DOWN }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 3, 11 ] ], "direction": FIELD_STEP_LEFT }, { "you": [ 4, 10 ], "boxes": [ [ 3, 10 ], [ 3, 11 ] ], "direction": FIELD_STEP_UP }, { "you": [ 5, 10 ], "boxes": [ [ 3, 10 ], [ 3, 11 ] ], "direction": FIELD_STEP_DOWN } ];
		stepCurrent = 9;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		// HERO from 5 / 10 moves UP
		Simulate.click(buttons[0]);
		expect(steps[10].you[0]).to.equal(4);
		expect(steps[10].you[1]).to.equal(10);
		
		// HERO from 5 / 10 moves LEFT
		Simulate.click(buttons[1]);
		expect(steps[10].you[0]).to.equal(5);
		expect(steps[10].you[1]).to.equal(9);
		
		// HERO from 5 / 10 moves DOWN
		Simulate.click(buttons[2]);
		expect(steps[10].you[0]).to.equal(6);
		expect(steps[10].you[1]).to.equal(10);

		// HERO from 5 / 10 moves Right
		Simulate.click(buttons[3]);
		expect(steps[10].you[0]).to.equal(5);
		expect(steps[10].you[1]).to.equal(11);			
	});
	
	it('make hero to move one box', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT } ];
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[3]);
		expect(steps.length).to.equal(2);
	});
	
	
	it('don\'t move hero on a wall', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT } ];
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[1]);
		expect(steps.length).to.equal(1);
	});
	
	it('don\'t move box on a wall', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT } ];
		stepCurrent = 1;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[3]);
		expect(steps.length).to.equal(2);
	});
	
	it('don\'t move two boxes in a row', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 6, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_DOWN }, { "you": [ 6, 10 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_RIGHT } ];
		stepCurrent = 2;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[0]);
		expect(steps.length).to.equal(3);
	});
	
	it('correctly cnages stepcurrent when hero go down through the history', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 6, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_DOWN }, { "you": [ 6, 10 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_RIGHT } ];
		stepCurrent = 0;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[2]);
		expect(stepCurrent).to.equal(1);
	});
	
	it('winning the stage', () => {

		steps = [ { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 10 ] ], "direction": FIELD_STEP_INIT }, { "you": [ 5, 10 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_RIGHT }, { "you": [ 5, 9 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_LEFT }, { "you": [ 4, 9 ], "boxes": [ [ 4, 10 ], [ 5, 11 ] ], "direction": FIELD_STEP_UP } ];
		stepCurrent = 3;
		
		var component = renderIntoDocument(
			<Buttons background={background} steps={steps} stepCurrent={stepCurrent} makeNewStep={makeNewStep} goToStep={goToStep} />
		);
		
		var buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[3]);
		expect(steps[4].direction).to.equal(FIELD_STEP_FINISH);
	});	
});