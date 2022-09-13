import React from 'react';
import { Footer, ButtonSession, ModalBg, ModalBox, ModalContent, ModalHeader, CloseButton } from "./style"
import { TypeProps, EModalProps } from './.d'
export interface ModalHandlersProps {
    Open: (props:EModalProps)=>void;
    Close: ()=>void;
    Clear: ()=>void;
}

const defaultConfigs = {
    NoCloseButton: false,
}

const reducer = (prevState:EModalProps[], action:{payload:any, type:string}) => {
    let array;
    switch (action.type) {
        case 'ADD':
            array = [...prevState];
            array.push(action.payload);
            return array;
        case 'REMOVE':
            array = [...prevState];
            array.pop();
            return array;
        case 'FILTER':
            array = [...prevState];
            array.splice(action.payload, 1);
            return array;
        case 'CLEAR':
            return prevState = [];
        default:
            break;
    }
};

const EModalComponent : React.ForwardRefRenderFunction<
ModalHandlersProps,
TypeProps> = 
({
}:TypeProps, ref) => {
    const [ eModal, dispatcher ] = React.useReducer<any>(reducer, []) as any;

    const Open = React.useCallback( (props:EModalProps) => {
        if (!props.configs) {
            props.configs = defaultConfigs
        }
        dispatcher({ type: 'ADD', payload: props });
        return eModal.length - 1;
    }, []);

    const handleClick = (act: Function) => {
        act();
    }

    const Close = (id?:number, act?:Function) => {
        if (id) {
            dispatcher({ type: 'FILTER', payload: id });
        } else {
            dispatcher({ type: 'REMOVE' });
        }

        if (act) {
            act();
        }
    }

    const Clear = () => {
        dispatcher({ type: 'CLEAR' });
    }

    React.useImperativeHandle(ref, ()=>({
        Open,
        Close,
        Clear
    }));

    return (
        <>
            {
                eModal.length > 0 &&
                eModal.map((EM:EModalProps, i:number)=>(
                    <ModalBg key={i}>
                        <ModalBox h={'auto'} w={'auto'}>
                            <ModalHeader>
                                <h3> {EM.title} </h3>
                                {
                                    !EM.configs?.NoCloseButton &&
                                    <CloseButton onClick={()=>Close(undefined, EM.configs?.OnCloseAction)} />
                                }
                            </ModalHeader>
                            <ModalContent>
                                {EM.content}
                            </ModalContent>
                            <Footer>
                                <ButtonSession>
                                    {
                                        EM.options &&
                                        EM.options.map((e, i)=>(
                                            <button key={i}
                                                onClick={()=>{
                                                    handleClick(e.act);
                                                    if (e.close) {
                                                        Close(undefined, EM.configs?.OnCloseAction);
                                                    }
                                                }} 
                                            >
                                                {e.text} 
                                            </button>
                                        ))
                                    }
                                </ButtonSession>
                            </Footer>
                        </ModalBox>
                    </ModalBg>
                ))
            }
        </>
        
    )

}

const EModal = React.forwardRef(EModalComponent)

export default React.memo(EModal)