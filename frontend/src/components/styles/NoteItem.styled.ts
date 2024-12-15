import styled from "styled-components";

export const NoteItemWrapper = styled.div<{ $highlight: boolean }>`
  margin-left: 10px;
  margin-right: 5px;
  padding: 0 12px;
  height: 104px;
  overflow: hidden;
  position: relative;
  background-color: ${(props) => (props.$highlight ? "#eff1f2" : "none")};

  &:hover {
    border-radius: 4px;
    background-color: #eff1f2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.$highlight ? "5px" : "0px")};
    height: 100%;
    background-color: #2278c5;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

export const NoteItemContent = styled.div`
  border-bottom: 1px solid #bfbfbf;
  font-size: 14px;
  line-height: 1.4;
  height: 100%;
  padding: 10px 0;

  span {
    font-size: 12px;
    color: #818181;
  }
`;

export const NoteItemHeader = styled.h4`
  color: #222222;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const NoteItemText = styled.p`
  color: #525252;
  line-height: 1.4;
  font-size: 14px;
  overflow: hidden;
  height: 37px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: break-spaces;
  margin: 4px 0 5px 0;
`;
