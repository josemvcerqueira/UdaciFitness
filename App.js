import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import {
	createBottomTabNavigator,
	createAppContainer,
	createMaterialTopTabNavigator,
	createStackNavigator
} from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";

class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<UdacityStatusBar
						backgroundColor={purple}
						barStyle="light-content"
					/>
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}

function UdacityStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}

const RouteConfigutation = {
	History: {
		screen: History,
		navigationOptions: {
			tabBarLabel: "History",
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name="ios-bookmarks" size={30} color={tintColor} />
			)
		}
	},
	addEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarLabel: "Add Entry",
			tabBarIcon: ({ tintColor }) => (
				<FontAwesome name="plus-square" size={30} color={tintColor} />
			)
		}
	},
	Live: {
		screen: Live,
		navigationOptions: {
			tabBarLabel: "Live",
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name="ios-speedometer" size={30} color={tintColor} />
			)
		}
	}
};

const TabNavigatorConfig = {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === "ios" ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === "ios" ? white : purple,
			shadowColor: "rgba(0,0,0,0.24)",
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
};

const AppContainer =
	Platform.OS === "ios"
		? createBottomTabNavigator(RouteConfigutation, TabNavigatorConfig)
		: createMaterialTopTabNavigator(RouteConfigutation, TabNavigatorConfig);

const MainNavigator = createAppContainer(
	createStackNavigator({
		Home: {
			screen: AppContainer
		},
		EntryDetail: {
			screen: EntryDetail,
			navigationOptions: {
				headerTintColor: white,
				headerStyle: {
					backgroundColor: purple
				}
			}
		}
	})
);

export default App;
