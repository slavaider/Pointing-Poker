import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import useSocket from './useSocket';
import { AppDispatch, RootState } from '../store';

const useAppDispatch = (): any => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useSocket, useAppDispatch, useAppSelector };
