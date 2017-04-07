import {expect} from 'chai';
import {STAGES} from '../../src/constants/Stages';
import {
	FIELD_BACKGROUND_EMPTY,
	FIELD_BACKGROUND_TARGET
} from '../../src/constants/Sokoban'

describe('Constant Stages', () => {

	it('is an array', () => {
		expect(STAGES).is.an('array');
	});
	
	for (let i=0; i<STAGES.length; i++) {
		describe('stage number ' + i, () => {

			it('is a correct object', () => {
				expect(STAGES[i]).is.an('object');
				expect(STAGES[i]).to.have.property('background')
					.that.is.an('array')
					.with.deep.property('[19][19]')
					.that.deep.equals(''); 
				expect(STAGES[i]).to.have.property('init')
					.that.is.an('object')
					.with.deep.property('.you')
					.that.is.an('array');
				expect(STAGES[i].init).to.have.property('boxes')
					.that.is.an('array');
			});
			
			let bg = STAGES[i].background;
			let targetNum = 0
			let emptyFields = []
			for (let tr=0; tr<bg.length; tr++) {
				for (let td=0; td<bg[tr].length; td++) {
					if (bg[tr][td] == FIELD_BACKGROUND_TARGET) {
						targetNum++;
					}
					if (bg[tr][td] == FIELD_BACKGROUND_EMPTY) {
						emptyFields.push([tr, td]);
					}					
				}
			}
			
			let boxes = STAGES[i].init.boxes;
			it('is has targets field count equals to boxes count', () => {
				expect(boxes.length).to.equal(targetNum);
			});
		
			let boxOnEmptyCount = 0
			for (let b=0; b<boxes.length; b++) {
				for (let ef=0; ef<emptyFields.length; ef++) {
					if (boxes[b][0] == emptyFields[ef][0] && boxes[b][1] == emptyFields[ef][1]) {
						boxOnEmptyCount++;
					}
				}
			}
			it('is has each box on empty field', () => {
				expect(boxes.length).to.equal(boxOnEmptyCount);
			});
		});
	}
});