import React, { Component } from 'react'

export default class Help extends Component {
	onOutsideClick(e) {
		if (!e.target.closest('.helpButton') && !e.target.closest('.helpPopup')) {
			this.popupHide();
		}
	}
	popupShow() {
		window.addEventListener('click', ::this.onOutsideClick);
		this.setState({visible:true});
	}
	popupHide() {
		window.removeEventListener('click', ::this.onOutsideClick);
		this.setState({visible:false});
	}		
	state = {
		visible:false
	}
	render() {
		return 	<div className='help'>
			<button className='helpButton' onClick={::this.popupShow}> ? </button>
			{ this.state.visible ? <div className='helpPopup'>
					<div className='helpSubhead'>Controls</div>
					<table>
						<tbody>
							<tr>
								<td>Next stage</td>
								<td>PgUp</td>
							</tr>
							<tr>
								<td>Previous stage</td>
								<td>PgDown</td>
							</tr>				
							<tr>
								<td>Move up</td>
								<td>arrow up</td>
							</tr>
							<tr>
								<td>Move down</td>
								<td>arrow down</td>
							</tr>
							<tr>
								<td>Move left</td>
								<td>arrow left</td>
							</tr>
							<tr>
								<td>Move right</td>
								<td>arrow right</td>
							</tr>
							<tr>
								<td>Previous step</td>
								<td>Backspace</td>
							</tr>
							<tr>
								<td>Next step</td>
								<td>Enter</td>
							</tr>
							<tr>
								<td>Restart stage</td>
								<td>Delete</td>
							</tr>
						</tbody>
					</table>
					<button className='helpButton' onClick={::this.popupHide}> Close </button>
				</div> : '' }
		</div>
	}
}