import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {blueGrey900} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey900,
    }
})

class Header extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                    <AppBar
                        title='RecipeRecommender'
                        showMenuIconButton={false}
                    />
            </MuiThemeProvider>
        )
    }
}

export default Header;