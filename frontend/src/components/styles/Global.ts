import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Playwrite+IT+Moderna:wght@100..400&display=swap");

* {
    box-sizing: border-box;
    margin: 0;
}

body {
  background-color: #f3f0ff;
  font-family: "Playwrite IT Moderna", 'Times New Roman';
  font-size: 1.2rem;
}

input,
textarea,
button {
  font-family: inherit;
}

button {
  font-size: 0.75rem;
  cursor: pointer;
}
`;

export default GlobalStyles;
