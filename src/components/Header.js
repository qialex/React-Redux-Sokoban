import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return 	<div className='header'>
		<span className='headerTitle'>Sokoban</span> by Alex Ishenko 
		(<a className='headerHref' href='https://github.com/qialex/React-Redux-Sokoban'>GitHub</a>, <a className='headerHref' href='https://www.linkedin.com/in/alex-ishenko-ui/'>LinkedIn</a>, <a className='headerHref' href='http://qialex.me/ui'>CV</a>)
	</div>
  }
}
