/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

AppRegistry.registerComponent(appName, () => App);
