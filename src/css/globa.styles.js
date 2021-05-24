import { createGlobalStyle } from 'styled-components'


const GlobalStyles = createGlobalStyle`
        html { 
            font-size: 62.5%; 
        }

        body{
            font-family: montserrat-regular,opensans-hebrew-regular,Arial,Helvetica,sans-serif;
        }

        a{
            text-decoration: none;
        }
        button{
            cursor: pointer;
        }
        *{
            margin: 0;
            padding: 0;
            border:none;
            outline:none;
            box-sizing: border-box;
        }
    `
export default GlobalStyles;
