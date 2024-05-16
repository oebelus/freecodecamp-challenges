import { ACTIONS } from './App'

export default function OperationButton( {id, dispatch, operation}) {
    return (
    <button 
        onClick={() => dispatch( {type: ACTIONS.CHOOSE, payload: { operation } })}
        id={id}
    >
        {operation}
    </button>
    )
}