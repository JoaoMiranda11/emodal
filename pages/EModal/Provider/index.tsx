import React from 'react';
import EModal, { ModalHandlersProps } from '../Component';

const ModalContext = React.createContext({});

export default function EModalProvider(props:any) {
    const confirmRef = React.useRef<ModalHandlersProps>(null);

    const EM = React.useCallback(()=>{
        if (confirmRef)
            return confirmRef.current
        throw new Error('[EModal]: Emodal ref is not defined!');
    }, [confirmRef]);

    return (
        <ModalContext.Provider value={{EM}}>
            <EModal ref={confirmRef} />
            {props.children}
        </ModalContext.Provider>
    );
}

export function useEModal() {
    const context = React.useContext(ModalContext);
    if (!context) throw new Error("e: Provider");
    const { EM } = context as {EM:Function};
    return { EM };
}

export function configModal() {
    const context = React.useContext(ModalContext);
    if (!context) throw new Error("e: Provider");
    const { EM, addRef } = context as {EM:()=>{EModal:Function;EClose:Function}, addRef:(newRef:any)=>void};
    return { EM, addRef } as {EM:()=>{EModal:Function;EClose:Function}, addRef:(newRef:any)=>void};
}
