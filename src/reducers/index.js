import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';
import target from './targetReducer';
import topic from './topicReducer';

import router from './routerReducer';

const rootReducer = combineReducers({
  form,
  session,
  router,
  target,
  topic
});

export default rootReducer;
