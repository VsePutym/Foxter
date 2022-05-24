import React from 'react';
import styled from "styled-components";


export const Bar = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 6px 5px 13px black;
  background-image: linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09));
  background-color: #121212;
  color: #fff;
  display: flex;
  box-sizing: border-box;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  position: fixed;
  z-index: 1100;
  bottom: 0;
  left: auto;
  right: 0;
  width: 100%;
`;