import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  width: 20%;
  height: 100%;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 3rem;
  background-color: #ffffff;
`;
const Sidebar = () => (
  <Wrapper>
    <Link to="/">Home</Link>
    <Link to="/kanji">Kanji</Link>
    <Link to="/vocab">Vocabulary</Link>
  </Wrapper>
);
export default Sidebar;
