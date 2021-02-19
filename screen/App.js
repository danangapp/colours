import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import Home from './Home';
import Detail from './Detail';
import WebView from './WebView';
import QR from './QR';
import OneSignal from './OneSignal';

const MainNavigator = createStackNavigator(
	{
		Home: { screen: Detail },
		Detail: { screen: Detail },
		WebView: { screen: WebView },
		QR: { screen: QR },
		OneSignal: { screen: OneSignal },
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
);

const App = createAppContainer(MainNavigator);

export default App;