import styled from "styled-components";

export const ToolBarWrapper = styled.div<{
  $borderEffect?: boolean;
}>`
  padding: 10px;
  border-bottom: ${(props) =>
    props.$borderEffect ? "0.5px solid #dcdcdc" : "none"};
  box-shadow: ${(props) =>
    props.$borderEffect ? "#e9e9e9  0px 1px 1px 0px" : "none"};
  z-index: 10;
  position: relative;
`;

export const ToolBarContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NoteToolBarWrapper = styled(ToolBarWrapper)`
  box-shadow: ${(props) =>
    props.$borderEffect ? "#e2e2e9  0px 1px 1px 0px" : "none"};
`;

export const ActionBtns = styled.div`
  display: flex;
  align-items: center;
  color: #909191;
  gap: 4px;

  div {
    padding: 4px 7px;
    display: flex;
    &:hover {
      background-color: #eff1f2;
      border-radius: 5px;
    }
  }
`;
