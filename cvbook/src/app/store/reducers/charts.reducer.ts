import {
    AUTH_COMPANY_SUCCESS,
    GET_COMPANY_SUCCESS,
    AUTH_COMPANY_FAIL
} from '../../../constants/reducers-constants';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector} from '@ngrx/store';
import { Chart } from '../../models/Chart';

export interface ChartState extends EntityState<Chart> {
}

const ChartAdapter = createEntityAdapter<Chart>({
    selectId: (chart: Chart) => chart.chartID
});

const ChartInitialState: ChartState = ChartAdapter.getInitialState({
});

export function ChartReducer(
    state: ChartState = ChartInitialState,
    action
) {
    // console.log(action.type);
    switch (action.type) {
        // case AUTH_COMPANY_SUCCESS: {
        //     // console.log('AUTH_COMPANY_SUCCESS');
        //     // console.log(action.payload);
        //     return CompanyAdapter.addOne(action.payload, state = CompanyInitialState);
        // }
        // case AUTH_COMPANY_FAIL: {
        //     // console.log('AUTH_COMPANY_FAIL');
        //     return CompanyAdapter.addOne(action.payload, state = CompanyInitialState);
        // }
        // case GET_COMPANY_SUCCESS: {
        //     return CompanyAdapter.addOne(action.payload, state = CompanyInitialState);
        // }
        default:
            return state;
    }
}

export const selectChartState = createFeatureSelector<ChartState>('chart');

export const { selectAll: selectAllCharts, selectIds } = ChartAdapter.getSelectors(
    selectChartState
);

// export const getSelectedUser = createSelector(
//     selectUserState,
//     (state, props) => {
//         return state.entities[props.id];
//     }
// );
