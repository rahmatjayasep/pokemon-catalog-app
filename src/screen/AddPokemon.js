import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Card, CardItem, Body, Button, Text, Container, Content, Item, Input, Label, Picker, Right, Left } from 'native-base';
import { connect } from 'react-redux';
import { createPokemon } from '../public/redux/actions/pokemon';
import { allCategory } from '../public/redux/actions/category';
import { allType } from '../public/redux/actions/type';

class AddPokemon extends React.Component {

    constructor(){
        super();
        this.state = {
            categories : [],
            chosenCategories : '0',
            indexCategories : '',
            types : [],
            chosenTypes : '0',
            indexTypes : '',
            name : "",
            image_url : "",
            latitude : "",
            longitude : ""
        }
        this.arrayCategories = () => {
            let items = [<Picker.Item key='0' label='--Categories--' value='0'/>];
            this.props.categories.categories.forEach((item) => {
                items.push(
                    <Picker.Item key={item.id} label={item.name} value={item.id}/>
                );
            })
            return items
        }
        this.arrayTypes = () => {
            let itemss = [<Picker.Item key='0' label='--Types--' value='0'/>];
            this.props.type.type.forEach((item) => {
                itemss.push(
                    <Picker.Item key={item.id} label={item.name} value={item.id}/>
                );
            })
            return itemss
        }
    }

    Async = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? null : 'Login');
    };

    componentDidMount() {
        setTimeout(() => {
            this.Async();
        }, 800);
        this.getData();
        this.getType();
    }

    getData = async () => {
        await this.props.dispatch(allCategory());
    }

    getType = async () => {
        await this.props.dispatch(allType());
    }

    validation = () => {
        const self = this;
        
        setTimeout(() => {
            const self = this;

            setTimeout(() => {
                const { name, latitude, longitude, image_url} = self.state;
                if(name != "" && latitude != "" && longitude != "" && image_url){
                    self.setState({isValid: true});
                }
                else{
                    self.setState({isValid: false})
                }
            }, 800);
        })
    }

    handleSave = async () => {
        let name = this.state.name;
        this.props.dispatch(createPokemon({name: name, image_url: this.state.image_url, type_id : this.state.chosenTypes, category_id : this.state.chosenCategories, latitude: this.state.latitude, longitude: this.state.longitude}))
        .then( res => {
            this.props.navigation.navigate("Home");
        })
        .catch( err => {
            alert('message : ' + err)
        })
    }


    render(){
        console.disableYellowBox = true;
        const { isValid } = this.state;
        return (
        <Container>
            <Content padder>
              <View>
                <Card>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Name of Pokemon</Label>
                            <Input onChangeText={(text) =>  {
                                this.setState({name: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Image Url</Label>
                            <Input onChangeText={(text) =>  {
                                this.setState({image_url: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Latitude</Label>
                            <Input onChangeText={(text) => {
                                this.setState({latitude: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label>Longitude</Label>
                            <Input onChangeText={(text) => {
                                this.setState({longitude: text})
                                this.validation();
                            }}/>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item picker>
                            <Text>Category :</Text>
                            <Picker
                                selectedValue={this.state.chosenCategories}
                                onValueChange={(itemValue, itemIndex)=>(this.setState({chosenCategories: itemValue, indexCategories: itemIndex}))}
                            >
                            {this.arrayCategories()}
                            </Picker>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item picker>
                            <Text>Type :</Text>
                            <Picker
                                selectedValue={this.state.chosenTypes}
                                onValueChange={(itemValue, itemIndex)=>(this.setState({chosenTypes: itemValue, indexTypes: itemIndex}))}
                            >
                            {this.arrayTypes()}
                            </Picker>
                        </Item>
                    </CardItem>
                  </Card>
                </View>
                <View>
                    <Card>
                        <CardItem style={{alignContent: 'center'}}>
                            <Left/>
                            <Body>
                                {
                                    isValid && this.state.chosenCategories != '0' && this.state.chosenTypes != '0' ?
                                    (
                                        <Button style={{width: 100, alignItems: 'center', backgroundColor: '#0086cb'}} full onPress={this.handleSave}>
                                        <Text style={{color: '#fff', textAlign: 'center'}}>PAY NOW</Text>
                                        </Button>
                                    ):
                                    (
                                        <Button style={{width: 100, alignItems: 'center'}} full disabled>
                                        <Text style={{color: '#fff', textAlign: 'center'}}>PAY NOW</Text>
                                        </Button>
                                    )
                                }
                            </Body>
                            <Right/>
                        </CardItem>
                        </Card>
                    </View>
            </Content>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pokemons : state.pokemons,
        categories : state.categories,
        type : state.type
    }
  }

export default connect(mapStateToProps)(AddPokemon)

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff'
    }
})