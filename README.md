# Overview
---
This is our technical beta for our application BearGuide, currently the following features have been implemented:
- User register/login
- Guest access
- Searching for various locations on campus
	- Filtering locations based on various aspects, such as capacity, storage space etc.
	- Sort location results
- Viewing the details of a location
- Adding a location to favourites
- Adding a review to a location
- Viewing popular times for a location
- Editing user profile
- Viewing favourited locations and written reviews

The following features have not been implemented:
- Receiving navigation instructions to a location
- Sharing a location
- Heatmap layer
- Map interfacing

Regarding the above, the library used to implement the map functionality has experienced some bugs due to Expo's SDK update, which has prevented us from integrating the map into our features - [link](https://github.com/react-native-maps/react-native-maps/issues/5221)
- This has also prevented us from implementing a heatmap layer which was one of our main functionalities, however a majority of other functions operate as intended

# FAQ + How to install?
1. Clone the repository
2. Run `npm install` to install all libraries, if testing on iOS, also run `npx pod-install`
3. Start the app by using `npm start`, ensure that you are using Expo Go and not on the development build as this will cause issues
4. If there are errors related to undefined fields, there is a debug menu that allows you to reset the data to the initial state - navigate to the map screen and select the settings cog with the label `Debug Menu` and reset data as needed

**FAQ**
- There will be a console error that shows this output: 
```
A props object containing a "key" prop is being spread into JSX:
  let props = {key: someKey, route: ..., borderless: ..., centered: ..., rippleColor: ..., onPress: ..., onLongPress: ..., testID: ..., accessibilityLabel: ..., accessibilityRole: ..., accessibilityState: ..., style: ..., children: ...};
  <Touchable {...props} />
...
```
- This is due to an issue with one of our libraries, `React Native Paper` which was a result of the latest Expo SDK update as when the prop is passed to the components, it is not destructured enough to separate the `key` resulting in the error - however this will have any major issues on the functionality of our app