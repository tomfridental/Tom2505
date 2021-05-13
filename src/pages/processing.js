import React from 'react';
import styled from 'styled-components';

export default ({ size }) => {

    return (

        <Wrapper className="circleWrapper">
            <Main size={size} className="sk-circle">
                <Circle className="sk-circle1 sk-child" />
                <Circle className="sk-circle2 sk-child" />
                <Circle className="sk-circle3 sk-child" />
                <Circle className="sk-circle4 sk-child" />
                <Circle className="sk-circle5 sk-child" />
                <Circle className="sk-circle6 sk-child" />
                <Circle className="sk-circle7 sk-child" />
                <Circle className="sk-circle8 sk-child" />
                <Circle className="sk-circle9 sk-child" />
                <Circle className="sk-circle10 sk-child" />
                <Circle className="sk-circle11 sk-child" />
                <Circle className="sk-circle12 sk-child" />
            </Main>
        </Wrapper>


    )
}

const Wrapper = styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 100%;
-ms-flex-direction: column;
-webkit-flex-direction: column;
flex-direction: column;
align-items: center;

.sk-circle {position: relative;}
.sk-circle .sk-child { width: 100%;height: 100%; position: absolute; left: 0; top: 0;}
.sk-circle .sk-child:before {
content: '';
display: block; 
margin: 0 auto; 
width: 15%; 
height: 15%; 
border-radius: 100%;
-webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both; animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;}
.sk-circle .sk-circle2 {transform: rotate(30deg); }
.sk-circle .sk-circle3 {transform: rotate(60deg); }
.sk-circle .sk-circle4 {transform: rotate(90deg); }
.sk-circle .sk-circle5 {transform: rotate(120deg); }
.sk-circle .sk-circle6 {transform: rotate(150deg); }
.sk-circle .sk-circle7 {transform: rotate(180deg); }
.sk-circle .sk-circle8 {transform: rotate(210deg); }
.sk-circle .sk-circle9 {transform: rotate(240deg); }
.sk-circle .sk-circle10 {transform: rotate(270deg); }
.sk-circle .sk-circle11 {transform: rotate(300deg); }
.sk-circle .sk-circle12 {transform: rotate(330deg); }
.sk-circle .sk-circle2:before {animation-delay: -1.1s; }
.sk-circle .sk-circle3:before {animation-delay: -1s; }
.sk-circle .sk-circle4:before {animation-delay: -0.9s; }
.sk-circle .sk-circle5:before {animation-delay: -0.8s; }
.sk-circle .sk-circle6:before {animation-delay: -0.7s; }
.sk-circle .sk-circle7:before {animation-delay: -0.6s; }
.sk-circle .sk-circle8:before {animation-delay: -0.5s; }
.sk-circle .sk-circle9:before {animation-delay: -0.4s; }
.sk-circle .sk-circle10:before {animation-delay: -0.3s; }
.sk-circle .sk-circle11:before {animation-delay: -0.2s; }
.sk-circle .sk-circle12:before {animation-delay: -0.1s; }

@keyframes sk-circleBounceDelay {
0%, 80%, 100% {
transform: scale(0);
} 
40% {
transform: scale(1);
}
}
        
`

const Main = styled.div`
width: ${p => p.size || '10rem'};
height: ${p => p.size || '10rem'};
`

const Circle = styled.div`


&::before{
background-color: black;
}
`
