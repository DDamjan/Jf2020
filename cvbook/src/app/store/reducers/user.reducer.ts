import { User } from '../../models/User';
import {
    GET_USER,
    GET_USER_SUCCESS,
 } from '../../../constants/reducers-constants';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface UserState extends EntityState<User> {
}

const UserAdapter = createEntityAdapter<User>({
    selectId: (user: User) => user.userID
});
const UserInitialState: UserState = UserAdapter.getInitialState({});

export function UserReducer(
    state: UserState = UserInitialState,
    action
) {
    // console.log('UserReducer');
    // console.log(action.type);
    switch (action.type) {
        case GET_USER: {
            return UserAdapter.removeAll(state = UserInitialState);
            break;
        }
        case GET_USER_SUCCESS: {
            // console.log(action.payload);
            UserAdapter.removeAll(state = UserInitialState);
            return UserAdapter.addOne(action.payload, state = UserInitialState);
            break;
        }
        default:
            return state;
    }
}

export const selectUserState = createFeatureSelector<UserState>('user');

export const { selectAll: selectAllUser, selectIds } = UserAdapter.getSelectors(
    selectUserState
);

// export const getSelectedUser = createSelector(
//     selectUserState,
//     (state, props) => {
//         return state.entities[props.id];
//     }
// );
