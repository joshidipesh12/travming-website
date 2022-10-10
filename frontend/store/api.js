import {createAction} from '@reduxjs/toolkit';

export const apiCallRequested = createAction('api/callRequested');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');
