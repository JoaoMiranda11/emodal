import styled, { keyframes } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const colors = {
    mainHeight : '100%',
    blackPurple: '#110c24',
    darkPurple: 'rgba(115, 14, 209, 1)',
    strongPurple: '#5434a1',
    purple: '#8b6bd6',
    lightPurple: '#dbcbec',
    purpleGray: '#503f75',
    white: '#fdfdfd',
    lightWhite: '#eae5fa',
    lightGray: '#eae5fa',
    gray: '#8a8a8a',
    darkGray: '#4d4d4d',
    darkblue: '#292d47',
    blue: 'rgba(25, 21, 233)',
    lightGreen:'#74c055',
    darkRed:'#be2d2d',
}

export const Footer = styled.div`
    border-top: 1px solid ${colors.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    max-width: 100%;
`;

export const CloseButton = styled(CloseIcon)`
    font-size: 16px;
    width: 16px;
    height: 16px;
    color: ${colors.purpleGray};
    cursor: pointer;
`;

export const ButtonSession = styled.div`
    display: flex;
    width: 100%;
    margin: 5px;
    justify-content: space-between;
`;

const openAnimation = keyframes`
    0%{
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.lightGray};
    width: 100%;
    height: 50px;

    padding: 0px 10px 0px 10px;

    h2 {
        padding: 0px;
        margin: 0px;
    }
`;

export const ModalContent = styled.div`
    max-width: 100%;
    padding: 10px;
    overflow: auto;
`;

export const ButtonMask = styled.div`
    margin: 0px;
    padding: 0px;
`;

export const ModalBg = styled.div`
    position: absolute;
    background-color: #4d4d4d75;
    top: 0px;
    left: 0px;
    z-index: 101;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-behavior: auto;
`;

export const ModalBox = styled.div<{w: string, h:string}>`
    border-radius: 12px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: ${({w})=>w};
    height: ${({h})=>h};
    max-height: 90%;
    max-width: 90%;

    animation-name: ${openAnimation};
    animation-duration: 0.4s;
`;