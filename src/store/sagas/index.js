import { takeLatest } from 'redux-saga/effects';
import { changeValue } from '../../components/Home/reducer';
import changeValueSaga from '../../components/Home/saga';

export default function* watcherSagas() {
  yield takeLatest(changeValue.type, changeValueSaga);
}
