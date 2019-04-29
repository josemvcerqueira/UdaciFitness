import React from "react";
import { View, Platform } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import {
	createBottomTabNavigator,
	createAppContainer,
	createMaterialTopTabNavigator
} from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<AppContainer />
				</View>
			</Provider>
		);
	}
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
		? createAppContainer(
				createBottomTabNavigator(RouteConfigutation, TabNavigatorConfig)
		  )
		: createAppContainer(
				createMaterialTopTabNavigator(
					RouteConfigutation,
					TabNavigatorConfig
				)
		  );

export default App;
