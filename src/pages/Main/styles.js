import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  align-self: center;
`;

export const BoxNameInput = styled.TextInput`
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 20px;
  margin-top: 30px;
`;

export const JoinButton = styled.TouchableOpacity`
  height: 48px;
  border-radius: 4px;
  padding: 0 20px;
  margin-top: 10px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`;
