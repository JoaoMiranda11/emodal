import React from 'react';
import EModal, { ModalHandlersProps } from '../Component';

const ModalContext = React.createContext({});
const ErMsg = '[EMODAL]: Ref is not defined!'

export default function EModalProvider(props:any) {
    const confirmRef = React.useRef<ModalHandlersProps>(null);

    const EM = React.useCallback(()=>{
        if (confirmRef && confirmRef.current)
            return confirmRef.current
        return {
            Open: ()=>console.log(ErMsg),
            Close: ()=>console.log(ErMsg),
            Clear: ()=>console.log(ErMsg)
        }
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

export function useConfigModal() {
    const context = React.useContext(ModalContext);
    if (!context) throw new Error("e: Provider");
    const { EM, addRef } = context as {EM:()=>{EModal:Function;EClose:Function}, addRef:(newRef:any)=>void};
    return { EM, addRef } as {EM:()=>{EModal:Function;EClose:Function}, addRef:(newRef:any)=>void};
}
