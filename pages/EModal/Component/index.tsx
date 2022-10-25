import React from 'react';
import * as I from './interfaces.d'
export interface ModalHandlersProps {
    Open: (props:I.EModalProps)=>void;
    Close: ()=>void;
    Clear: ()=>void;
}

const CloseButton = ({onClick}:{onClick:Function}) => {
    return (
        <i className='EMCloseButton' onClick={()=>onClick()}>
            X
        </i>
    )
}

const reducer = (prevState:I.EModalProps[], action:{payload:any, type:string}) => {
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
I.EMTypeProps> = 
({
}:I.EMTypeProps, ref) => {
    const [ eModal, dispatcher ] = React.useReducer<any>(reducer, []) as any;

    const Open = React.useCallback( (props:I.EModalProps) => {
        dispatcher({ type: 'ADD', payload: props });
        return eModal.length - 1;
    }, [eModal.length]);

    const Close = React.useCallback((id?:number, act?:Function) => {
        if (id) {
            dispatcher({ type: 'FILTER', payload: id });
        } else {
            dispatcher({ type: 'REMOVE' });
        }

        if (act) {
            act();
        }
    }, [])

    const Clear = React.useCallback(() => {
        dispatcher({ type: 'CLEAR' });
    }, [])

    React.useImperativeHandle(ref, ()=>({
        Open,
        Close,
        Clear
    }));

    const closeCallback = React.useCallback((act: Function | undefined) => {
        Close();
        if (act) {
            act()
        }
    }, [Close])

    const ModalHeader = React.useCallback(({children, closeButton, closeAction}:
        {children: string | React.ReactNode, closeButton:boolean, closeAction: Function | undefined}
    ) => {
        if (!children && !closeButton) return null;

        return (
            <div className='EMHeader'>
                <div className='EMHeaderTitle' > {children} </div>
                {
                    closeButton &&
                    <CloseButton onClick={()=>closeCallback(closeAction)} />
                }
            </div>
        )
    }, [closeCallback])

    const ModalContent = React.useCallback(({children}:{children:React.ReactNode})=>{
        if (!children) return null;
        return (
            <div className='EMContent'>
                {children}
            </div>
        )
    }, [])

    const ModalFooter = React.useCallback(({children, buttons, closeAction}:
        {children:React.ReactNode, buttons: I.EMDefaultButtons, closeAction:Function | undefined}
    )=>{
        if (!children && !buttons) return null;

        const Button = ({props}:{props:I.EMButton}) => {
            if (!props) return null
            return (
                <button
                className={`EMDefaultButton EMDBVar${(props.variant || 1)}`}
                    onClick={()=>{
                        if (props.act) {
                            props.act();
                        }
                        if (props.close) {
                            closeCallback(closeAction)
                        }
                    }} 
                >
                    {props.text} 
                </button>
            )
        }

        return (
            <div className='EMFooter'>
                {children}
                <div className='EMButtonSession'>
                    <Button props={buttons.left} />
                    <Button props={buttons.right} />
                </div>
            </div>
        )
    }, [closeCallback])

    if (eModal.length > 0) {
        return (
            <>
                {
                    eModal.map((EM:I.EModalProps, i:number)=>{
                        return (
                            <div className='EMBG' key={i}>
                                <div className='EMModalBox'>
                                    <ModalHeader
                                        closeButton={!EM.configs?.NoCloseButton} 
                                        closeAction={EM.configs?.OnCloseAction}
                                    >
                                        {EM.title} 
                                    </ModalHeader>

                                    <ModalContent>
                                        {EM.content}
                                    </ModalContent>
                                    
                                    <ModalFooter 
                                        buttons={EM.defaultButtons}
                                        closeAction={EM.configs?.OnCloseAction}
                                    >
                                        {EM.footer}
                                    </ModalFooter>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    return null;
}

const EModal = React.forwardRef(EModalComponent)

export default React.memo(EModal)