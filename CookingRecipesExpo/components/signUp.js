import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native';
import axios from 'axios'
// import AsyncStorage from '@react-native-community/async-storage'

import styles from '../styles/signUpStyles.js'



const SignUp = props => {
    const [signUp, SetSignUp] = useState({username: '', password: ''})
    const [err, setErr] = useState()

    console.log(signUp)
    
    
    const onPress = async () => {
      await axios.post('https://recipeshare-development.herokuapp.com/cooks/register', signUp)
      .then(res => console.log('response from sign up axios post', res))
      .catch(err => setErr(err))

      props.navigation.navigate('Login')
    }
    
      return (

       <ScrollView>
        <View style={styles.signUp}>
          <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          >
            <Text style={styles.exitButton}>x</Text>
          </TouchableOpacity>
          <Text style={styles.title}>RecipeShare</Text>
          <Text style={styles.createAccountTitle}>Create Account</Text>
          <Text style={styles.emailText}>Username</Text>
          <TextInput
           style={styles.inputFeilds}
           value={signUp.username}
           onChangeText={event => SetSignUp({...signUp, username:event})}/>
           {err !=null && <Text style={{marginLeft:150, color:"red"}}>Username already exists</Text>}
           <Text style={styles.passwordText}>Password</Text>
          <TextInput
           style={styles.inputFeilds}
           value={signUp.password}
           onChangeText={event => SetSignUp({...signUp, password:event})}
           secureTextEntry={true}/>
           <View style={{flexDirection: 'row-reverse',}}>
           <TouchableOpacity
             onPress={onPress}
             style={styles.createAccountButton}
           >
             <Text style={styles.createAccountText}>Create Account</Text>
           </TouchableOpacity>
           </View>
        </View>
       </ScrollView>
      );
    }
    

export default SignUp;