import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
    box-sizing: border-box;
    margin: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

input,
textarea,
button {
  font-family: inherit;
  font-size: 1.1rem;

  @media (min-width: 640px){
  font-size: 1.25rem;
}
}

button {
  cursor: pointer;
}

p, label {
  font-size: 1.1rem;
  line-height: 1.5rem;

  @media (min-width: 640px){
  font-size: 1.25rem;
  line-height: 1.75rem;
}

}
`;

export default GlobalStyles;
