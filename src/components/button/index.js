/* eslint-disable react/prop-types */
import React from 'react';
import { Buttom } from './style';

function Button({ data, color }) {
  return (
    <Buttom className="button" color={color}>
      {data}
    </Buttom>
  );
}
export default Button;
