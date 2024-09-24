import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const NoteTitle = styled.div<{ $fadeEffect?: boolean }>`
  display: flex;
  place-items: center;
  position: relative;
  top: 1px;

  div {
    padding-left: 10px;
    width: 740px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    animation: ${(props) =>
    props.$fadeEffect
      ? css`
            ${fadeIn} 0.2s ease-in forwards
          `
      : css`
            ${fadeOut} 0.2s ease-in forwards
          `};
  }
`;
