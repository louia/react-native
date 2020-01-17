import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableHighlight,
    Button
} from 'react-native';

export class ContactItem extends React.Component {

    static navigationOptions = {
        title: 'userName',
        headerRight: <Button title={"logout"}></Button>
    };

    render() {
        return (
            <View style={{
                backgroundColor : 'red',
                // width : '100%',
                // height : '100%',
                margin : 20,

            }}>
                <Text>Louis</Text>
            </View>
        );
    }
}

// const mapStateToProps = state => ({ 
//     color: state.color,
// });

// const mapDispatchToProps = dispatch => ({
//     onTitlePress: () => dispatch(setcolors()),
// });

// export default connect(mapStateToProps,mapDispatchToProps)(ContactItem);

export default ContactItem;

