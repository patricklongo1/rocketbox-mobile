import styled from 'styled-components/native';
import { Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  padding: 0 20px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0};
  flex: 1;
`;

export const BoxTitle = styled.Text`
  margin-top: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const List = styled.FlatList`
  margin-top: 30px;
`;

export const File = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

export const Separator = styled.View`
  height: 1px;
  background: #eee;
`;

export const FileInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const QuitButton = styled.TouchableWithoutFeedback``;

export const FileTitle = styled.Text`
  font-size: 16px;
  color: #333;
  margin-left: 10px;
  flex: 1;
`;

export const FileDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Fab = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  bottom: ${30 + getBottomSpace()};
  width: 60px;
  height: 60px;
  background: #7159c1;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
