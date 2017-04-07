import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import {STAGES} from '../../src/constants/Stages';
import {
  FIELD_STEP_FINISH
} from '../../src/constants/Sokoban'
import Field from '../../src/components/Field';
import {expect} from 'chai';

describe('Field', () => {

	let step = Object.assign({}, STAGES[0].init);
	step.direction = FIELD_STEP_FINISH;
	
	const component = renderIntoDocument(
	  <Field background={STAGES[0].background} step={step} />
	);
	
	const divWinning = scryRenderedDOMComponentsWithClass(component, 'fieldWinning');
	it('has winning div', () => {
		expect(divWinning.length).to.equal(1);
	});
	
	const divFields = scryRenderedDOMComponentsWithClass(component, 'oneField');
	it('has 400 fields', () => {
		expect(divFields.length).to.equal(400);
	});
	
	const divHero = scryRenderedDOMComponentsWithClass(component, 'fieldYou');
	it('has 1 hero div', () => {
		expect(divHero.length).to.equal(1);
	});
	
	const divBoxes = scryRenderedDOMComponentsWithClass(component, 'fieldBox');
	it('has correct count of boxes divs', () => {
		expect(divBoxes.length).to.equal(step.boxes.length);
	});
});