import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import Levels from '../../src/components/Levels';
import {expect} from 'chai';

describe('Levels', () => {
	const stagesLength = 5
	let stageCurrent = 0
	
	function stageSet(newStageCurrent) { stageCurrent = newStageCurrent; }
	
	const component = renderIntoDocument(
	  <Levels stagesCount={stagesLength} stageCurrent={stageCurrent} stageSet={stageSet} />
	);
	
	const divs = scryRenderedDOMComponentsWithTag(component, 'div');
	const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
	
	it('has 3 correct divs', () => {
		expect(divs.length).to.equal(3);
		expect(divs[0].className).to.equal('levels');
		expect(divs[1].className).to.equal('leftLabel');
		expect(divs[2].className).to.equal('rightButtons');
	});
	
	it('has 3 correct buttons', () => {
		expect(buttons.length).to.equal(3);
		expect(buttons[0].textContent).to.equal(' ◄ ');
		expect(buttons[1].textContent).to.equal(' ' + (stageCurrent+1) + '/' + stagesLength + ' ');
		expect(buttons[2].textContent).to.equal(' ► ');
	});	
	
	it('changes level on button click', () => {
		Simulate.click(buttons[2]);
		expect(stageCurrent).to.equal(1);
		Simulate.click(buttons[0]);
		expect(stageCurrent).to.equal(4);
	});	
});