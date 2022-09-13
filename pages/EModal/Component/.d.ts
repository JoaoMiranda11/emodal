import React from "react";

export interface TypeProps {
}


export interface EModalProps {
    title: string;
    content: React.ReactComponentElement;
    options?: {
        text: string;
        act: Function;
        close?: boolean;
    }[],
    configs?: {
        NoCloseButton?: boolean;
        OnCloseAction?: Function;
    }
}