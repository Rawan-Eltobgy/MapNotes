# MapNotes App using 

* React-Native app built using [React-native](https://reactnative.dev/).
* For MapBox (maps): [mapBox](https://github.com/react-native-mapbox-gl/maps).
* React-Native Modal for previewing form modal (https://github.com/react-native-modal/react-native-modal).
* Formik to utilize form and initial values: [Formik] https://github.com/formium/formik
* YUP to do front-end validation in the form: [YUP] https://github.com/jquense/yup
* Handling local storage using Async Storage: [AsyncStorage] https://github.com/react-native-async-storage/async-storage

## Installation And Running
Clone this repository.
### For iOS
1. `yarn install or npm install`
1. `cd ios && npx pod-install `
1. `react-native run-ios`
### For Android
1. `yarn install or npm install`
1. `react-native start`
1. `react-native run-ios`


### App Flow


-User can longPress on marker to drag and drop it.
-After Clicking on setting note a modal will appear.
-The user has to add title (required) and a minimum of 5 characters for each other field.
-After the user submit the data will be saved to the local storage.
-The user would have to move (black marker) first as it's set to last set location inorder to be able to view (red marker) indicating his saved note.
-The user can edit/ delte any note by clicking on the red marker and either edit the data entered previously or delete the note using delete button.




## Screenshots

<img src="https://user-images.githubusercontent.com/20873357/118811180-fe951180-b8ac-11eb-8936-1dab9b25d4be.png" height="400" width="200">
<img height="400" width="200" alt="Screen Shot 2021-05-19 at 2 22 24 PM" src="https://user-images.githubusercontent.com/20873357/118811738-a3175380-b8ad-11eb-9acc-804a513f2eee.png">

<img src="https://user-images.githubusercontent.com/20873357/118811016-cbeb1900-b8ac-11eb-9cf8-75a034ff5413.png" height="400" width="200">
<img src="https://user-images.githubusercontent.com/20873357/118811043-d4dbea80-b8ac-11eb-8f9e-ff445c02ac08.png" height="400" width="200">
<img src="https://user-images.githubusercontent.com/20873357/118811051-d73e4480-b8ac-11eb-9cfa-c03153f1122c.png" height="400" width="200">



