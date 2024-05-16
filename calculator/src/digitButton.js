import { ACTIONS } from './App'

export default function DigitButton( {id, className, dispatch, digit}) {
    return (
    <button 
        onClick={() => dispatch( {type: ACTIONS.ADD, payload: { digit } })}
        id={id}
        className={className}
    >
        {digit}
    </button>
    )
}