import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import Help from '../../src/components/Help';
import {expect} from 'chai';

describe('Help', () => {
	
	const component = renderIntoDocument(
	  <Help />
	);
	
	it('renders a div and a button', () => {
		
		const divs = scryRenderedDOMComponentsWithTag(component, 'div');
		expect(divs[0].className).to.equal('help');
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons[0].className).to.equal('helpButton');
	});
	
	it('renders and triggering popup on button click', () => {
		
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons[0].className).to.equal('helpButton');
		
		Simulate.click(buttons[0]);
		
		const divsWhenHelpIsOpened = scryRenderedDOMComponentsWithTag(component, 'div');
		expect(divsWhenHelpIsOpened[0].className).to.equal('help');
		expect(divsWhenHelpIsOpened[1].className).to.equal('helpPopup');
		expect(divsWhenHelpIsOpened[2].className).to.equal('helpSubhead');
		
		const buttonsWhenHelpIsOpened = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttonsWhenHelpIsOpened[1]);
		
		const divsWhenHelpIsClosed = scryRenderedDOMComponentsWithTag(component, 'div');
		expect(divsWhenHelpIsClosed.length).to.equal(1);
	});	
});