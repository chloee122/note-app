import styled from "styled-components";

export const UserModalBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
`;

export const UserModalWrapper = styled.div`
  background-color: white;
  color: black;
  position: absolute;
  top: 55px;
  left: 12px;
  width: 300px;
  border-radius: 10px;
  box-shadow: #0f0f0f0d 0px 0px 0px 1px, #0f0f0f1a 0px 3px 6px,
    #0f0f0f33 0px 9px 24px;
`;

export const UserInfo = styled.div`
  padding: 20px 18px;
  font-weight: 550;
`;

export const Separator = styled.div`
  height: 1px;
  background-color: #f5f5f5;
  margin: 0.25rem 0;
`;

export const LogoutBtn = styled.div`
  margin: 6px;
  padding: 6px 13px;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 6px;
  }
`;
