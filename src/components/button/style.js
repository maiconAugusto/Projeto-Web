import styled from 'styled-components';

export const Buttom = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px 20px 0px 20px;
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: white;
  margin-left: 10px;

  :hover {
    background-color: #1E8856;
  }
`;
