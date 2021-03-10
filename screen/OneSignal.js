/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import OneSignal from 'react-native-onesignal';

const imageUri =
    'https://cdn-images-1.medium.com/max/300/1*7xHdCFeYfD8zrIivMiQcCQ.png';

export default class One extends Component {
    async componentDidMount() {
        /* O N E S I G N A L   S E T U P */
        OneSignal.setAppId("5b284a70-278f-440e-aa1a-a8b71518d60d");
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        // OneSignal.promptForPushNotificationsWithUserResponse(response => {
        // this.OSLog("Prompt response:", response);
        // });

        /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            // this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
            let notif = notifReceivedEvent.getNotification();

            // const button1 = {
            //     text: "Cancel",
            //     onPress: () => { notifReceivedEvent.complete(); },
            //     style: "cancel"
            // };

            // const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); } };

            // alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
            notifReceivedEvent.complete(notif);
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            this.OSLog("OneSignal: notification opened:", notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            this.OSLog("OneSignal IAM clicked:", event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            this.OSLog("OneSignal: email subscription changed: ", event);
        });
        OneSignal.addSubscriptionObserver(event => {
            this.OSLog("OneSignal: subscription changed:", event);
            this.setState({ isSubscribed: event.to.isSubscribed })
        });
        OneSignal.addPermissionObserver(event => {
            this.OSLog("OneSignal: permission changed:", event);
        });

        const deviceState = await OneSignal.getDeviceState();

        this.setState({
            isSubscribed: deviceState.isSubscribed
        });
    }
    render() {
        return <View />;
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginHorizontal: 10,
    },
    jsonDebugLabelText: {
        textAlign: 'left',
        color: '#333333',
        marginBottom: 5,
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#d45653',
    },
    button: {
        color: '#000000',
        flex: 1,
    },
    imageStyle: {
        height: 200,
        width: 200,
        marginTop: 20,
    },
    textInput: {
        marginHorizontal: 10,
        height: 40,
    },
});
