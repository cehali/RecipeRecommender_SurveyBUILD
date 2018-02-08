import React, { Component } from 'react'
import { AppBar, Card, CardTitle, CardMedia, CardActions, RefreshIndicator, RaisedButton } from 'material-ui'
import StarRatingComponent from 'react-star-rating-component'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { app } from '../base'
import {blueGrey900} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blueGrey900,
    }
})

const buttonStyle = {
    width: '100%'
}

const dishTypesStages = ['Breakfast and Brunch', 'Appetizers/Lunch and Snacks', 'Soups', 'Main Dishes', 'Side Dishes/Salads', 'Desserts/Afternoon Tea']
const titles = ['Breakfast', 'Appetizers', 'Soups', 'Main Dishes', 'Side Dishes', 'Desserts']

const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

const API = 'https://reciperecommender-survey.ml:3000/'

class Survey extends Component {
    constructor(props) {
        super(props);
        this.getItems = this.getItems.bind(this)
        this.goToNextStage = this.goToNextStage.bind(this)
        this.saveRates = this.saveRates.bind(this)
        this.state = {
            recipes: [],
            loading: true,
            nrStage: 0,
            recipesChosen: [],
            ratings: [],
            rateStars: [0, 0, 0, 0],
            dietType: this.props.location.state.dietType,
            canSubmit: false,
            allrecipesKeys: [],
            tempKeys: []
        }
    }

    getItems = (ns) => {
        let typeofDiet = this.state.dietType
        if (dishTypesStages[ns].includes('/')) {
            let spliteddishTypesStages = dishTypesStages[ns].split('/')
            var QUERY = `${typeofDiet}/${spliteddishTypesStages[0]}/${spliteddishTypesStages[1]}`
            console.log('wiekszeAPI')
        } else {
            var QUERY = `${typeofDiet}/${dishTypesStages[ns]}`
            console.log('mniejszeAPI')
        }
        fetch(API + QUERY)
        .then(response => response.json())
        .then(data => {
            let recipesKeys = [...new Set(data.map(a => a.key))]
            let totalKeys = this.state.allrecipesKeys.slice().concat(recipesKeys)
            this.setState({
                recipes: data,
                loading: false,
                allrecipesKeys: totalKeys
            })
        })
        .catch(function(error) {
            console.log("The read failed: " + error.message);
        });
    }

    
    componentDidMount = () => {
        console.log(this.state.nrStage)
    	this.getItems(this.state.nrStage);
    }
    
    goToNextStage = () => {
        if (this.state.nrStage < (dishTypesStages.length - 1)){
            let rateNextStage = [0, 0, 0, 0]
            this.setState(({nrStage}) => ({
                nrStage: nrStage + 1,
                rateStars: rateNextStage,
                canSubmit: false,
                loading: true
            }), () => {
                this.getItems(this.state.nrStage)
            })
        } else {
            let d = new Date();
            let now = d.getTime();
            app.database().ref('users/' + now).set({
                dietType: this.state.dietType,
                ratings: this.state.ratings
            })
            this.props.history.push('/end')
        }
    }

    saveRates = (value, index, name) => {
        let rate2Save = {_key: name, rating: value}
        this.state.ratings.push(rate2Save)
        let rate = this.state.rateStars.slice()
        rate[index] = value
        this.setState({
            ratings: this.state.ratings,
            rateStars : rate
        })
        let ratingsKeys = []
        ratingsKeys = this.state.ratings.map(a => a._key)
        let ratingsKeysSet = [...new Set(ratingsKeys)]
        if (arraysEqual(ratingsKeysSet.sort(), this.state.allrecipesKeys.sort())) {
            this.setState({canSubmit: true})
        }
    }

	render() {
        if (this.state.loading === true) {
            return ( 
			<MuiThemeProvider muiTheme={muiTheme}>
				<div style={{ position: 'relative' }}>
					<RefreshIndicator
						size={50}
						status="loading"
                        top={30}
                        left={-25}
                        status={'loading'}
                        style={{marginLeft: '50%'}}
					/>
				</div>
			</MuiThemeProvider>
            )
        } else {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                    <AppBar
                        title={titles[this.state.nrStage]}
                        showMenuIconButton={false}
                        style={{textAlign: 'center'}}
                    />
                    {this.state.recipes.map((tile, index) => (
                        <Card style={{width:'50%', display: 'inline-block', padding: '10px'}}>
                        <CardMedia
                            overlay={<CardTitle title={tile.name}/>}
                            >
                            <img src={tile.images[0].imageUrlsBySize[360]} alt="" />
                        </CardMedia>
                        <CardActions>
                            <div style={{fontSize: '30px', textAlign: 'center'}}>
                                <StarRatingComponent 
                                    name={tile.key}
                                    starCount={5}
                                    value={this.state.rateStars[index]}
                                    onStarClick={(value, privValue, nm) => this.saveRates(value, index, nm)}
                                />
                            </div>
                        </CardActions>
                    </Card>
                    ))}{this.state.canSubmit ? <RaisedButton label='NEXT' primary={true} onClick={this.goToNextStage} style={buttonStyle} disabled={false}/> 
                    : <RaisedButton label='NEXT' primary={true} onClick={this.goToNextStage} style={buttonStyle} disabled={true}/>}
                    </div>
                </MuiThemeProvider>
            )
        }
    }
}

export default Survey