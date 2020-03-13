import { User } from '../../models/User';
import {
    GET_USERS_SUCCESS, FILTER_USERS_SUCCESS, FILTER_USERS_EMPTY
 } from '../../../constants/reducers-constants';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface UsersState extends EntityState<User> {
}

const UsersAdapter = createEntityAdapter<User>({
    selectId: (user: User) => user.userID
});
const UsersInitialState: UsersState = UsersAdapter.getInitialState();

export function UsersReducer(
    state: UsersState = UsersInitialState,
    action
) {
    switch (action.type) {
        case GET_USERS_SUCCESS: {
            return UsersAdapter.addMany(action.payload, state = UsersInitialState);
        }
        case FILTER_USERS_SUCCESS: {
            console.log(action.payload);
            UsersAdapter.removeAll(state = UsersInitialState);
            return UsersAdapter.addMany(action.payload.filteredUsers, state = UsersInitialState);
        }
        case FILTER_USERS_EMPTY: {
            const data: User = {
                userID: -1
            };
            return UsersAdapter.addOne(data, state = UsersInitialState);
        }
        default:
            return state;
    }
}

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const { selectAll: selectAllUsers, selectIds } = UsersAdapter.getSelectors(
    selectUsersState
);

// export const getSelectedUser = createSelector(
//     selectUserState,
//     (state, props) => {
//         return state.entities[props.id];
//     }
// );
