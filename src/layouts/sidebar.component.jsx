/* eslint-disable no-param-reassign */
import React from 'react';
import styled from 'styled-components';
import NavLinkList from '../components/navLinkList.component';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
  width: 20%;
  height: 100%;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  background-color: var(--color-white);
  z-index: 99;
  overflow: auto;

  @media only screen and (max-width: 430px) {
    display: none;
  }
`;

const Sidebar = () => {
  return (
    <Wrapper>
      <NavLinkList />
    </Wrapper>
  );
};

export default Sidebar;
