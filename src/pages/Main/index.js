/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import logo from '../../assets/logo.png';

import {
  Container,
  Logo,
  BoxNameInput,
  JoinButton,
  TextButton,
} from './styles';

export default function Main({ navigation }) {
  const [box, setBox] = useState('');

  useEffect(() => {
    async function checkBox() {
      const boxChecked = await AsyncStorage.getItem('@RocketBox:boxID');

      if (boxChecked && boxChecked !== null) {
        navigation.navigate('Box');
      }
    }
    checkBox();
  }, []);

  async function handleSignIn() {
    const response = await api.post('/boxes', {
      title: box,
    });

    await AsyncStorage.setItem('@RocketBox:boxID', response.data._id);

    navigation.navigate('Box');
  }

  return (
    <Container>
      <Logo source={logo} />
      <BoxNameInput
        placeholder="Criar/Acessar BOX"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={setBox}
      />

      <JoinButton onPress={handleSignIn}>
        <TextButton>Entrar</TextButton>
      </JoinButton>
    </Container>
  );
}

Main.propTypes = {
  navigation: PropTypes.object.isRequired,
};
