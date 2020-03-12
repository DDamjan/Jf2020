import {
    GET_CHART_SUCCESS,
    GET_CHART_CV_SUCCESS,
    GET_CHART_TOP10_SUCCESS,
    GET_CHART_TOTAL_USERS_SUCCESS
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
        case GET_CHART_SUCCESS: {
            return ChartAdapter.addMany(action.payload, state = ChartInitialState);
            break;
        }
        case GET_CHART_CV_SUCCESS: {
            return ChartAdapter.addOne(action.payload, state = ChartInitialState);
            break;
        }
        case GET_CHART_TOP10_SUCCESS: {
            return ChartAdapter.addOne(action.payload, state = ChartInitialState);
            break;
        }
        case GET_CHART_TOTAL_USERS_SUCCESS: {
            return ChartAdapter.addOne(action.payload, state = ChartInitialState);
            break;
        }
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
