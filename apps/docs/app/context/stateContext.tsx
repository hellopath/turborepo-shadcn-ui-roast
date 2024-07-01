'use client'

import React, { createContext, useContext, useReducer, Dispatch } from 'react';

interface StateProviderProps {
  reducer: React.Reducer<any, any>;
  initialState: any;
  children: React.ReactNode;
}

export const StateContext = createContext<[any, Dispatch<any>] | undefined>(undefined);

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, initialState, children, ...props}) => {
  console.log('Initial state:', initialState); // Log the initial state
  console.log('Current props:', props); // Log the current state
  // console.log('Dispatch function:', dispatch); // Log the dispatch function
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  )
};

export const useStateValue = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return context;
};