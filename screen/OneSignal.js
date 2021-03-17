/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Button,
} from 'react-native';
import OneSignal from 'react-native-onesignal';

const imageUri =
    'https://cdn-images-1.medium.com/max/300/1*7xHdCFeYfD8zrIivMiQcCQ.png';

export default class One extends Component {
    constructor(properties) {
        super(properties);

        OneSignal.setLogLevel(6, 0);

        let requiresConsent = false;

        this.state = {
            emailEnabled: false,
            animatingEmailButton: false,
            initialOpenFromPush: 'Did NOT open from push',
            activityWidth: 0,
            width: 0,
            activityMargin: 0,
            buttonColor: Platform.OS == 'ios' ? '#ffffff' : '#d45653',
            jsonDebugText: '',
            privacyButtonTitle: 'Privacy Consent: Not Granted',
            requirePrivacyConsent: requiresConsent,
        };

        OneSignal.setRequiresUserPrivacyConsent(requiresConsent);

        OneSignal.init('5b284a70-278f-440e-aa1a-a8b71518d60d', {
            kOSSettingsKeyAutoPrompt: true,
        });

        this.oneSignalInAppMessagingExamples();
    }

    oneSignalInAppMessagingExamples() {
        // Add a single trigger with a value associated with it
        OneSignal.addTrigger('trigger_1', 'one');
        OneSignal.getTriggerValueForKey('trigger_1')
            .then((response) => {
                console.log('trigger_1 value: ' + response);
            })
            .catch((e) => {
                console.error(e);
            });
        OneSignal.removeTriggerForKey('trigger_1');

        // Create a set of triggers in a map and add them all at once
        var triggers = {
            trigger_2: 'two',
            trigger_3: 'three',
        };
        OneSignal.addTriggers(triggers);

        // Create an array of keys to remove triggers for
        var removeTriggers = ['trigger_2', 'trigger_3'];
        OneSignal.removeTriggersForKeys(removeTriggers);

        // Toggle the showing of IAMs
        OneSignal.pauseInAppMessages(false);
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async componentDidMount() {
        var providedConsent = await OneSignal.userProvidedPrivacyConsent();

        this.setState({
            privacyButtonTitle: `Privacy Consent: ${providedConsent ? 'Granted' : 'Not Granted'
                }`,
            privacyGranted: providedConsent,
        });

        OneSignal.setLocationShared(true);

        OneSignal.inFocusDisplaying(2);

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onIds = this.onIds.bind(this);
        this.onEmailRegistrationChange = this.onEmailRegistrationChange.bind(this);
        this.onInAppMessageClicked = this.onInAppMessageClicked.bind(this);

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.addEventListener(
            'emailSubscription',
            this.onEmailRegistrationChange,
        );
        OneSignal.addEventListener(
            'inAppMessageClicked',
            this.onInAppMessageClicked,
        );
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
        OneSignal.removeEventListener(
            'emailSubscription',
            this.onEmailRegistrationChange,
        );
        OneSignal.removeEventListener(
            'inAppMessageClicked',
            this.onInAppMessageClicked,
        );
    }

    onEmailRegistrationChange(registration) {
        console.log('onEmailRegistrationChange: ', registration);
    }

    onReceived(notification) {
        console.log('Notification received: ', notification);

        this.setState({
            jsonDebugText: 'RECEIVED: \n' + JSON.stringify(notification, null, 2),
        });
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        this.setState({
            jsonDebugText:
                'OPENED: \n' + JSON.stringify(openResult.notification, null, 2),
        });
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    onInAppMessageClicked(actionResult) {
        console.log('actionResult: ', actionResult);
        this.setState({
            jsonDebugText: 'CLICKED: \n' + JSON.stringify(actionResult, null, 2),
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
