import React, { Component } from 'react'
import { Paper, RadioButtonGroup, RadioButton, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {blueGrey900} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


const muiTheme = getMuiTheme({
    palette: {
		primary1Color: blueGrey900,
    }
})

const loginStyle = {
	width: '70%',
	margin: '20px auto',
	padding: '10px',
}

const InputStyle = {
	width: '100%',
}

const radioButton = {
	marginBottom: 16
}

class Start extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueDietType: null
		}
		this.handleChangeDietType = this.handleChangeDietType.bind(this)
		this.Submit = this.Submit.bind(this)
	}

	handleChangeDietType = (event, value) => this.setState({valueDietType: value})
	
	Submit = () => {
		this.props.history.push('/survey', {dietType: this.state.valueDietType})
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Paper style={loginStyle} zDepth={2}>
					<p>Welcome to online survey on dietery preferences. The survey is part of research work on healthy dietary, habits and cooking. It is purely anonymous and should take around 2 min. It consists of 6 subsections with short recipe list that you are kindly ask to rate according to your preferences. If you liked it you can pass the survey to any of your colleagues.</p>
					<p>1. Choose your diet preferences.</p>
					<p>2. Rate presented meals from 1 star (less likely to eat) to 5 stars (most likely to eat).</p>
					<br/>
					<RadioButtonGroup
							name='Diet Type'
							value={this.state.valueDietType}
							onChange={this.handleChangeDietType}
							style = {InputStyle}
							>
							<RadioButton value='withoutMeat' label='Without Meat' style={radioButton}/>
							<RadioButton value='withoutFish' label='Without Fishes' style={radioButton}/>
							<RadioButton value='withoutDiary' label='Without Diary' style={radioButton}/>
							<RadioButton value='vegetarian' label='Vegetarian (without meat and fishes)' style={radioButton}/>
							<RadioButton value='vegan' label='Vegan (without meat, fishes and diary)' style={radioButton}/>
							<RadioButton value='everything' label='I eat everything' style={radioButton}/>
					</RadioButtonGroup>
					{this.state.valueDietType ? <RaisedButton label="Submit" primary={true} style={InputStyle} onClick={this.Submit}/>
					: <RaisedButton label="Submit" primary={true} style={InputStyle} onClick={this.Submit} disabled={true}/>}
				</Paper>
			</MuiThemeProvider>
		)
	}
}

export default Start