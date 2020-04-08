import * as actionTypes from './actionTypes';


export const getCalculateStart = () => ({
    type: actionTypes.GET_CALCULATE_START
});

export const getCalculateSuccess = data => ({
    type: actionTypes.GET_CALCULATE_SUCCESS,
    data
});

export const getCalculateFail = error => ({
    type: actionTypes.GET_CALCULATE_FAIL,
    error
});

export const getCalculate = () => dispatch => {
    dispatch(getCalculateStart());
    const token = localStorage.getItem('token');
    const link = "//127.0.0.1:8000/api/calculate";

    fetch(link, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(data => dispatch(getCalculateSuccess(data)))
        .catch(err => dispatch(getCalculateFail(err)));
}

export const makeCalculationStart = () => ({
    type: actionTypes.MAKE_CALCULATION_START
});

export const makeCalculationSuccess = data => ({
    type: actionTypes.MAKE_CALCULATION_SUCCESS,
    data
});

export const makeCalculationFail = error => ({
    type: actionTypes.MAKE_CALCULATION_FAIL,
    error
});

export const makeCalculation = data => dispatch => {
    dispatch(makeCalculationStart());
    const token = localStorage.getItem('token');

    const form = new FormData(data);
    const link = "//127.0.0.1:8000/api/calculate";
    fetch(link, {
        method: 'POST',
        mode: 'cors',
        body: form,
        headers: {
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(resData => dispatch(makeCalculationSuccess(resData)))
        .catch(err => dispatch(makeCalculationFail(err)));
};