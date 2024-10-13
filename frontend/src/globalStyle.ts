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

.tiptap {
  :first-child {
    margin-top: 0;
  }
  outline: none;
  
  p {
    font-size: 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* List styles */
  ul, 
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;
    
    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1, 
  h2, 
  h3, 
  h4, 
  h5, 
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1, 
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 { 
    font-size: 1.8rem; 
  }

  h2 { 
    font-size: 1.5rem; 
  }

  h3 { 
    font-size: 1.1rem; 
  }

  h4, 
  h5, 
  h6 { 
    font-size: 1rem; 
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  /* Placeholder (on every new line) */
  .is-empty::before {
    color: grey;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  mark {
    background-color: #FAF594;
  }
}
`;

export default GlobalStyles;
