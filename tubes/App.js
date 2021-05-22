import React from 'react'
import { View, Text, Button, TouchableOpacity} from 'react-native'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator } from 'react-navigation';

import pemasukan from './pemasukan';
import pengeluaran from './pengeluaran';

const Stack = createStackNavigator();

export default function App({Navigation}) {

    return (
        
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="PEMASUKAN" component={pemasukan}/>
                <Stack.Screen name="PENGELUARAN" component={pengeluaran}/>                   
            </Stack.Navigator>
            <TouchableOpacity
                onPress={()=> {this.props.navigation.navigate("PENGELUARAN")}}>
                <Text>Pengeluaran</Text>    
            </TouchableOpacity>
            {/* <Button
                title="pemasukan"
                onPress={()=>Navigation.navigate('UangMasuk')}></Button>
            <Button
                title="pengeluaran"
                onPress={()=>Navigation.navigate('UangKeluar')}></Button> */}
           
        </NavigationContainer>
        
    );
}

