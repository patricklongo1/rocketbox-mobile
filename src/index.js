import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './routes';
import './config/ReactotronConfig';

YellowBox.ignoreWarnings(['Unrecognized WebSocket', 'Failed prop type']);

export default function src() {
  return <Routes />;
}
