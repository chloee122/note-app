import styled from "styled-components";

const Button = styled.button<{
  $width?: number;
  $color?: string;
  $noBorder?: boolean;
}>`
  background-color: #ff8787;
  border: ${(props) => (props.$noBorder ? "none" : "1px solid black")};
  min-width: ${(props) => (props.$width ? props.$width + "px" : "none")};
  min-height: 45px;
  padding: 10px;
  color: ${(props) => (props.$color ? props.$color : "black")};
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 10px;
`;

export default Button;
