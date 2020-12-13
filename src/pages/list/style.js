import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto 10%;

  li {
    display: flex;
    align-items: center;
    border: 1px solid #B9BDBE;
    height: 40px;
    width: 350px;
    border-radius: 4px;
    padding-left: 4px;
    cursor: pointer;
    margin: 6px 0px 0px 0px;

    @media screen and (max-width: 600px) {
      width: 250px;
    }

    :hover {
      background-color: #DEE2E3;
    }
  }

  strong {
    margin: 40px 0px 15px 40px;
    color: #444748;
    text-transform: uppercase;

    @media screen and (max-width: 600px) {
      margin-left: 40px;
      font-size: 15px;
    }
  }
`;
