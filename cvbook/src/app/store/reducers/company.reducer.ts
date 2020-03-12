import { Company } from '../../models/Company';
import {
    AUTH_COMPANY_SUCCESS,
    GET_COMPANY_SUCCESS,
    AUTH_COMPANY_FAIL
} from '../../../constants/reducers-constants';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector} from '@ngrx/store';

export interface CompanyState extends EntityState<Company> {
}

const CompanyAdapter = createEntityAdapter<Company>({
    selectId: (company: Company) => company.kompanijaID
});

const CompanyInitialState: CompanyState = CompanyAdapter.getInitialState({
});

export function CompanyReducer(
    state: CompanyState = CompanyInitialState,
    action
) {
    // console.log(action.type);
    switch (action.type) {
        case AUTH_COMPANY_SUCCESS: {
            // console.log('AUTH_COMPANY_SUCCESS');
            // console.log(action.payload);
            return CompanyAdapter.addOne(action.payload, state = CompanyInitialState);
            break;
        }
        case AUTH_COMPANY_FAIL: {
            // console.log('AUTH_COMPANY_FAIL');
            return CompanyAdapter.addOne(action.payload, state = CompanyInitialState);
            break;
        }
        case GET_COMPANY_SUCCESS: {
            return CompanyAdapter.addOne(action.payload, state = CompanyInitialState);
            break;
        }
        default:
            return state;
    }
}

export const selectCompanyState = createFeatureSelector<CompanyState>('company');

export const { selectAll: selectAllCompanies, selectIds } = CompanyAdapter.getSelectors(
    selectCompanyState
);

// export const getSelectedUser = createSelector(
//     selectUserState,
//     (state, props) => {
//         return state.entities[props.id];
//     }
// );
