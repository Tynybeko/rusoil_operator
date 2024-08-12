import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './slices'
 
 
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth']
}
 
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['somethingTemporary']
}
 
 
export default persistReducer(rootPersistConfig,  rootReducer)