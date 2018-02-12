import React, { Component } from 'react'
import { Paper } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {blueGrey900} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
    palette: {
		primary1Color: blueGrey900,
    }
})

const endStyle = {
	width: '70%',
	margin: '20px auto',
	padding: '10px',
}

class Start extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Paper style={endStyle} zDepth={2}>
					<h3>Thank you for your contribution.</h3>
					<br/>
					<p>Now you can close the browser or complete the survey once again by clicking <a href='https://goo.gl/D7Lejj'>HERE</a></p>
					<p></p>					
				</Paper>
			</MuiThemeProvider>
		)
	}
}

export default Start