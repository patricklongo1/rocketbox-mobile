/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import socket from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import api from '../../services/api';

import {
  Container,
  BoxTitle,
  List,
  File,
  Separator,
  FileInfo,
  QuitButton,
  FileTitle,
  FileDate,
  Fab,
} from './styles';

export default function Box({ navigation }) {
  const [box, setBox] = useState({ files: [] });
  const [fileAdded, setFileAdded] = useState([]);

  function subscribeToNewFiles(id) {
    const io = socket('http://localhost:3333');

    io.emit('connectRoom', id);
    io.on('file', data => {
      setBox({ ...box, files: [data, ...box.files] });
      setFileAdded([...fileAdded, '+1']);
    });
  }

  useEffect(() => {
    async function loadFiles() {
      const boxChecked = await AsyncStorage.getItem('@RocketBox:boxID');
      subscribeToNewFiles(boxChecked);
      const response = await api.get(`/boxes/${boxChecked}`);

      setBox(response.data);
    }
    loadFiles();
  }, [fileAdded]);

  async function openFile(file) {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;

      await RNFS.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (error) {
      console.tron.log('Not supported');
    }
  }

  async function handleUpload() {
    ImagePicker.launchImageLibrary({}, async upload => {
      if (upload.error) {
        console.tron.log('ImagePicker error');
      } else if (upload.didCancel) {
        console.tron.log('Canceled by user');
      } else {
        const data = new FormData();

        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        await api.post(`boxes/${box._id}/files`, data);
      }
    });
  }

  function handleLogout() {
    AsyncStorage.setItem('@RocketBox:boxID', '');
    navigation.navigate('Main');
  }

  function renderItem({ item }) {
    return (
      <File onPress={() => openFile(item)}>
        <FileInfo>
          <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
          <FileTitle>{item.title}</FileTitle>
          <FileDate>
            Há{' '}
            {formatDistance(parseISO(item.createdAt), new Date(), {
              locale: pt,
            })}
          </FileDate>
        </FileInfo>
      </File>
    );
  }

  return (
    <Container>
      <QuitButton onPress={handleLogout}>
        <BoxTitle>{box.title}</BoxTitle>
      </QuitButton>

      <List
        data={box.files}
        keyExtractor={file => file._id}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={renderItem}
      />

      <Fab onPress={handleUpload}>
        <Icon name="cloud-upload" size={24} color="#fff" />
      </Fab>
    </Container>
  );
}
