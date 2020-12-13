import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto 10%;

  strong {
    margin-bottom: 15px;
    color: #444748;
    text-transform: uppercase;

    @media screen and (max-width: 600px) {
      margin-left: 60px;
      font-size: 15px;
    }
  }
`;
export const Form = styled.div`
  min-width: 40%;
  height: 40%;
  border: 1px solid #B9BDBE;
  border-radius: 4px;
  background-color: #DEE2E3;


  @media screen and (max-width: 600px) {
    margin-left: 60px;
    height: 60%;
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    label {
      font-size: 14px;
      text-align: left;
      margin-left: 40px;
    }
  }
  input {
    align-self: stretch;
    margin: 5px 40px 20px 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #B9BDBE;
    padding-left: 6px;
    color: #444748;
  }
  select {
    align-self: stretch;
    margin: 5px 40px 20px 40px;
    height: 40px;
    border-radius: 4px;
    padding-left: 4px;
    border: 1px solid #B9BDBE;
    color: #444748;
  }
`;
