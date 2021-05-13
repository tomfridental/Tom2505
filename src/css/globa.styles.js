import { createGlobalStyle } from 'styled-components'


const GlobalStyles = createGlobalStyle`


        html{
            /* font-family: montserrat-regular,opensans-hebrew-regular,Arial,Helvetica,sans-serif; */
            font-size: 10px;
        }


        body{
            font-family: montserrat-regular,opensans-hebrew-regular,Arial,Helvetica,sans-serif;
            font-size: 1.4rem;
        }

        a{
            text-decoration: none;
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
