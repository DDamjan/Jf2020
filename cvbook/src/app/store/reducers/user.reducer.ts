import { User } from '../../models/User';
import {

} from '../../../constants/reducers-constants';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector} from '@ngrx/store';

export interface UserState extends EntityState<User> {
}

const UserAdapter = createEntityAdapter<User>({
    selectId: (user: User) => user.userID
});

const UserInitialState: UserState = UserAdapter.getInitialState({
});

export function UserReducer(
    state: UserState = UserInitialState,
    action
) {
    console.log('UserReducer');
    console.log(action.type);
    switch (action.type) {
        // case AUTH_USER_SUCCESS: {
        //     console.log(action.payload.user);
        //     localStorage.setItem('currentCompany', action.payload.user.id);
        //     return UserAdapter.addOne(action.payload.user, state = UserInitialState);
        // }
        // case AUTH_USER_FAIL: {
        //     localStorage.setItem('currentCompany', 'AUTH_USER_FAIL');
        //     return UserAdapter.addOne(action.payload, state = UserInitialState);
        // }
        // case GET_USER_SUCCESS: {
        //     return UserAdapter.addOne(action.payload.user, state = UserInitialState);
        // }
        default:
            return state;
    }
}

export const selectUserState = createFeatureSelector<UserState>('user');

export const { selectAll: selectAllUsers, selectIds } = UserAdapter.getSelectors(
    selectUserState
);

// export const getSelectedUser = createSelector(
//     selectUserState,
//     (state, props) => {
//         return state.entities[props.id];
//     }
// );
