import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 84px);
  padding: 42px 0;
`;

export const NavBar = styled.div<{
  $scrolled?: boolean;
}>`
  position: sticky;
  left: 0px;
  right: 0px;
  top: 0;
  z-index: 50;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: ${(props) => (props.$scrolled ? "1px solid #E5E5E5" : "none")};
  box-shadow: ${(props) =>
    props.$scrolled ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none"};
`;

export const Logo = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
`;

export const LoginButton = styled.button`
  font-weight: 550;
  font-size: 1.1rem;
  height: 2.25rem;
  padding: 0 0.75rem;
  border: none;
  background-color: white;
  color: black;
  border-radius: 0.5rem;

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    background-color: #bfbfbf;
  }
`;

export const Footer = styled.div`
  padding: 1.5rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  font-weight: 550;
  font-size: 0.9rem;
  color: #737373;

  @media (min-width: 768px) {
    justify-content: end;
    gap: 1.5rem;
  }

  div {
    display: flex;
    height: 2.25rem;
    align-items: center;
  }
`;
