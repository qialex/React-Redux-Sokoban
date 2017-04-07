import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import Header from '../../src/components/Header';
import {expect} from 'chai';

describe('Header', () => {
	it('renders a text and links', () => {
		
		const component = renderIntoDocument(
		  <Header />
		);
		
		const div = scryRenderedDOMComponentsWithTag(component, 'div');
		expect(div.length).to.equal(1);
		expect(div[0].className).to.equal('header');
		
		const span = scryRenderedDOMComponentsWithTag(component, 'span');
		expect(span.length).to.equal(1);
		expect(span[0].className).to.equal('headerTitle');
		
		const links = scryRenderedDOMComponentsWithTag(component, 'a');
		expect(links.length).to.equal(3);
		for (let i=0; i<links.length; i++) {
			expect(links[i].className).to.equal('headerHref');
		}
		expect(links[0].href).to.equal('https://github.com/qialex/React-Redux-Sokoban');
		expect(links[1].href).to.equal('https://www.linkedin.com/in/qialex');
		expect(links[2].href).to.equal('http://qialex.me/');
	});
});