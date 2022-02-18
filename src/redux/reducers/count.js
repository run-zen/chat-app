import * as countAction from '../actions/countActions'

export  default function countReducer(state=0,action) {
    switch (action.type) {
        case countAction.increase:
            return state+1
        case countAction.decrease:
            if(state === 0) {
                return state
            }
            return state-1
        default:
            return state
    }
}