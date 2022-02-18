import countReducer from "./count";
import {userReducer} from "./user";
import {TokenReducer} from  './tokenReducer'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import chatsReducer from "./chatsReducer";
import chatDataReducer from "./chatDataReducer";
import {SelectedChatReducer} from "./selectedChat";

const authPersistConfig = {
    key: 'runzen_auth',
    storage: storage,
}

const all_reducers = combineReducers({
    count: countReducer,
    user: userReducer,
    auth: persistReducer(authPersistConfig,TokenReducer),
    chats: chatsReducer,
    chatData: chatDataReducer,
    selectedChat: SelectedChatReducer
});

export default all_reducers;
