import { FILTER_USERS_SUCCESS } from '../../../constants/reducers-constants';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Filter } from 'app/models/filter';

export interface FilterState extends EntityState<Filter> {
}

const FilterAdapter = createEntityAdapter<Filter>({
    selectId: (filter: Filter) => filter.id
});
const FilterInitialState: FilterState = FilterAdapter.getInitialState({});

export function FiltersReducer(
    state: FilterState = FilterInitialState,
    action
) {
    switch (action.type) {
        case FILTER_USERS_SUCCESS: {
            console.log(action.payload);
            FilterAdapter.removeAll(state = FilterInitialState);
            return FilterAdapter.addOne(action.payload.filters, state = FilterInitialState);
        }
        default:
            return state;
    }
}

export const selectFilterState = createFeatureSelector<FilterState>('filters');

export const { selectAll: selectAllFilters, selectIds } = FilterAdapter.getSelectors(
    selectFilterState
);
