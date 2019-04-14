import React, { Component } from 'react'
import { Text, StyleSheet, View, PanResponder, Animated, FlatList , TouchableOpacity} from 'react-native'




const fakedata = [
    {
        id: 0,
        name: 'wevewr0',

    },
    {
        id: 1,
        name: 'efbeg',

    },
    {
        id: 2,
        name: 'qwqwqws',

    },
    {
        id: 3,
        name: 'oppoi',

    },
    {
        id: 4,
        name: 'lkjkljk',

    },
    {
        id: 5,
        name: 'zdzdztt',

    },

]


export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fakeDataPositions: null,
            pos:new Animated.ValueXY()

        }
        this.fakeDataPositions = fakedata.map((item, index) => { return { id: item.id, position: new Animated.ValueXY() } })
    }
    componentWillMount() {
        this.setState({ fakeDataPositions: this.fakeDataPositions })
        this._panresponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder:()=>true,
            onStartShouldSetPanResponderCapture:()=>true,
            onPanResponderGrant: (e, gesture) => {
            
            //    this.state.fakeDataPositions[0].position.setOffset({x:this.state.fakeDataPositions[0].position.x._value , y:this.state.fakeDataPositions[0].position.y._value})
            //    this.state.fakeDataPositions[0].position.setValue({ x: 0, y: 0 })

            },
            onPanResponderMove:(e , gestureState)=>{
               
                
                this.state.fakeDataPositions[0].position.setValue({x:gestureState.dx , y:gestureState.dy})
                
                console.warn((e.nativeEvent.target/10))


        },
            onPanResponderRelease: (e, gesture) => {
               
                // this.state.fakeDataPositions[Math.round(e.target/8.5)-1].position.flattenOffset()

                Animated.timing(this.state.fakeDataPositions[0].position,{
                    toValue:0,
                    timing:500,
                    useNativeDriver:true
                }).start()
            }


        })
    }
    
    render() {

  let handler = this._panresponder.panHandlers

  let { pos } = this.state;
 
  let [translateX] = [pos.x];


        return (
            <View style={styles.container} >
            
                <FlatList
                    data={fakedata}
                    extraData={this.state.fakeDataPositions}
                    keyExtractor={(item) => `${item.id} `}
                    renderItem={({ item, index }) => (
                        <View style={[styles.elementParent]} >
                        <Animated.View style={[styles.element,{transform:[{translateX:this.state.fakeDataPositions[item.id].position.x}]}]} {...handler} >
                            <Text>{item.name}</Text>
                        </Animated.View>
                        </View>)
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#8f8'
    },
    element: {
        height: 80,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#88f',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    elementParent:{
        height: 76,
        borderWidth:2
    }
})
