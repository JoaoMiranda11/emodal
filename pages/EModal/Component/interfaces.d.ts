import React from "react";

export interface TypeProps {
}


export interface EModalProps {
    title: React.ReactComponentElement;
    content: React.ReactComponentElement;
    footer: React.ReactComponentElement;
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
}