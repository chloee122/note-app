import styled from "styled-components";

export const SideMenuWrapper = styled.div`
  min-width: 224px;
  position: relative;
  background-color: #232527;
  color: #d4d4d4;

  @media (min-width: 768px) {
    min-width: 240px;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 12px 6px;
  margin: 6px;
  border-radius: 6px;

  &:hover {
    background-color: #494d50;
  }
`;

export const UserName = styled.p`
  font-size: 1rem;
  font-weight: 550;
  width: 122px;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const NoteNavItem = styled.div`
  display: flex;
  align-items: center;
  margin: 6px;
  padding: 6px 6px;

  &:hover {
    background-color: #494d50;
    border-radius: 6px;
  }

  span {
    padding-left: 8px;
  }
`;
