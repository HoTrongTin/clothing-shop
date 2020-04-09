import styled, {css} from 'styled-components';

const buttonStyles = css`
    background-color: rgb(0, 173, 9);
    color: white;
    border: none;

    &:hover {
        background-color: white;
        color:rgb(14, 187, 22);
        border: 1px solid rgb(0, 173, 9);
    }
`

const invertedButtonStyles = css`
    background-color: white;
    color:rgb(34, 34, 34);
    border: 1px solid rgb(34, 34, 34);
    transition: background-color 0.2s ease-in, border 0.2s ease-in, color 0.2s ease-in;

    &:hover{
        background-color: rgb(34, 34, 34);
        color: white;
        border: rgb(255, 255, 255) 1px solid;
    }
`

const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;
    transition: background-color 0.2s ease-in, border 0.2s ease-in, color 0.2s ease-in;

    &:hover{
        background-color: #ffffff;
        color:  #2575f7;
        border: 1px solid  #2575f7;
        // box-shadow:  #2575f7 0px 1px 3px;
    }
`

const getButtonStyles = props => {
    if(props.isGoogleSignIn){
        return googleSignInStyles
    }

    return props.inverted ? invertedButtonStyles : buttonStyles
}

export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 16px;
    text-transform: uppercase;
    font-family: 'Comic Neue', cursive;
    font-weight: bolder;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease-in, color 0.2s ease-in, border 0.2s ease-in;
    ${getButtonStyles}
`