import React, { Component } from 'react';
import { Platform, StyleSheet, WebView} from 'react-native';
import { Root } from "native-base";
import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';
import { Toast, ActionSheet, Button, Text } from 'native-base';
import { AsyncStorage } from "react-native";

var PushNotification = require('react-native-push-notification');

PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token.token);
    window.helloComponent.onTokenArrived(token.token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification
    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    if (Platform.OS === 'ios')
      notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "861945479410",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
});


export default class App extends Component {

  _backBtnTimeOut;
  _new_env;
  _currentAppVersion;

  
  constructor(props) {
    super(props);

    this.state = {  token: '',_showBackButton: false, defaultURL: "http://localhost:5666"};
    this._currentAppVersion = "11.80";

    window.helloComponent = this;

    console.disableYellowBox = true; 
    console.log("hellooo " + RNFS.DocumentDirectoryPath);

     RNFS.readdir(RNFS.DocumentDirectoryPath + "/static/www/").then((data) => {
      console.log("---->" + data);
     });

    let path = RNFS.DocumentDirectoryPath + "/static/www/";
    
    let server = new StaticServer(5666, path,{localOnly : true });
    server.start().then((url) => {
        console.log("Serving at URL", url);
    });
  }

  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('_environment');
      this.selectEnv(value);
    }catch(e){
      console.log("Error");
      this.selectEnv(null);
    }
  }
  
  selectEnv(env){
    var BUTTONS = ["DEV","QA","STAGING"];
    var CANCEL_INDEX = 0;
    if(env){
      switch(env) {
        case "dev":
          BUTTONS = ["QA", "STAGING","CONTINUE IN " + env.toUpperCase()];CANCEL_INDEX = 2;
          break;
        case "qa":
          BUTTONS = ["DEV", "STAGING","CONTINUE IN " + env.toUpperCase()];CANCEL_INDEX = 2;
          break;
        case "staging":
          BUTTONS = ["DEV", "QA","CONTINUE IN " + env.toUpperCase()];CANCEL_INDEX = 2;
      }
      
    }

    let options = {
      options: BUTTONS,
      title: "VERSION " + this._currentAppVersion
    }

    if(CANCEL_INDEX){
      options.cancelButtonIndex = CANCEL_INDEX;
    }

    ActionSheet.show(
      options,
      buttonIndex => {
        console.log("Action sheet");
         let new_env = BUTTONS[buttonIndex].toLowerCase();
         if(env !== new_env && new_env.search("continue") == -1){
            this._new_env = new_env;
            this.setEnvInWebView(null,new_env);
       }
      }
    );
  }

  setEnvInWebView = async(data,new_env) =>{
    AsyncStorage.setItem('_environment', new_env,(e) => {
      console.log(e);
    });

    let script = "localStorage.clear();localStorage.setItem('_environment','" + new_env + "');window.location='';";
    this.webview.injectJavaScript(script);
    console.log("111");
    this.toast("ENVIRONMENT SET TO " + new_env.toUpperCase());
    console.log("123");
   
  }

  onTokenArrived = (token) => {
    this.setState({
      token: token
    })
  }

  onMessage = ( event ) => {
    console.log( "On Message: ", event.nativeEvent.data );
    try{
      let data = JSON.parse(event.nativeEvent.data);
      if(data){
        if(data.type == "save_local_storage"){
          this.setEnvInWebView(data.val,data.new_env);
        }else if(data.type == "register_push"){
         // const value = await AsyncStorage.getItem('_environment');
         // data.env = value.toUpperCase();
          //this.pushService.init(data);
        }else if(data.type == "checkMinAppVersion"){
          let division = data.data;
          let currentAppVersionInt = parseInt(this._currentAppVersion.replace(/\./g,''));
          let minAppVersion = division.MinAppVersion;
          minAppVersion = minAppVersion.replace(/\./g,'');
          minAppVersion = minAppVersion.replace('v','');
          let minAppVersionInt = parseInt(minAppVersion);
            if(minAppVersionInt > currentAppVersionInt){
              console.log("OOPS! Does not meet minimum app version requirements");
              this.setState({
                defaultURL: "http://localhost:5666#/min-app-support"
              })
            }else{
              console.log(minAppVersionInt + " < " + currentAppVersionInt);
            }
          }
      }
   }catch(e){
     console.log("WebView OnMessage Error: " + e);
   }
 } 

 log = (e) => {
  console.log(e);
  if(e.url.search("http://localhost") !== 0 && e.url.search("react-js-navigation") == -1){
    //external url 
    this._backBtnTimeOut = setTimeout(function(){
      this.setState({_showBackButton: true});
    }.bind(this),1000);
  }else{
    this.setState({_showBackButton: false});
    try{
      if(this._backBtnTimeOut){
        clearTimeout(this._backBtnTimeOut);
        this._backBtnTimeOut = null;
      }
    }catch(e){
      console.log(e);
    }
  }
}


 onBackButtonPressed(e) {
  console.log("onBackButtonPressed");
  this.webview.injectJavaScript("window.history.go(-1);");
}


  render() {
    return (
        <Root>
        <WebView bounces={false}  onNavigationStateChange={this.log}   ref={r => this.webview = r} 
        source={{uri: this.state.defaultURL }}  onMessage={this.onMessage} 
        style={{marginTop: 0}} userAgent="Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36"
        />
        { this.state._showBackButton && 
       <Button onPress={this.onBackButtonPressed.bind(this)}  style={{height:40, width:'100%', position:"absolute", backgroundColor:"#0c4281", borderRadius:0,  bottom:0}} >
          <Text>Back to Passenger App</Text>
       </Button>
        }
      </Root>
      );
  }

  toast = (e,duration = 3000) => {
    console.log("Inside Toast");
    Toast.show({
      text: e,
      style: {
        top:0,align:center,
        backgroundColor: "#166bf4"
       },
      position: "Top",
      textStyle: {color:"#fff",textAlign:"center" },
      buttonTextStyle: { backgroundColor:'#1750aa', color: "#fff" },
      buttonStyle: { backgroundColor: "#1750aa" },
      duration: duration
    });
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    padding:10
  },
  tokenText: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'silver',
    padding: 10
  },
  instructionText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
