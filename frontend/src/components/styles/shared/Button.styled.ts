import styled from "styled-components";

const Button = styled.button<{
  $width?: number;
  $color?: string;
  $noBorder?: boolean;
  $disable?: boolean;
}>`
  background-color: ${(props) => (props.$disable ? "#c4b6fb" : "#9c86f9")};
  border: ${(props) => (props.$noBorder ? "none" : "1px solid black")};
  min-width: ${(props) => (props.$width ? props.$width + "px" : "none")};
  padding: 0.6rem 1rem;
  color: ${(props) => (props.$color ? props.$color : "black")};
  font-weight: 550;
  border-radius: 5px;
`;

export default Button;
