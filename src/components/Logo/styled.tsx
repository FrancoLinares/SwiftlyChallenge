import styled from 'styled-components';

export const LogoContainer = styled.div``;
export const Img = styled.img`
  height: 50px;
  margin: 0 0 0 3vw;
  max-width: 200px;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;
