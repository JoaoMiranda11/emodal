import React from "react";
export interface EMTypeProps {
    /* Modal props */
}
export interface EMProps {
    Open:(props:EModalProps)=> number,
    Close:Function, 
    Clear:Function
}
export interface EModalProps {
    title?: React.ReactComponentElement | string;
    content?: React.ReactComponentElement;
    footer?: React.ReactComponentElement;
    defaultButtons?: defaultButtons,
    configs?: EMConfigs
}

export interface EMConfigs {
    NoCloseButton?: boolean;
    OnCloseAction?: Function;
}

export interface EMDefaultButtons {
    left: EMButton,
    right: EMButton
}

export interface EMButton {
    text: string;
    act: Function;
    close?: boolean;
    variant?: "1"|"2"|"3"|string
}