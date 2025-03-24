import { useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutsContext';

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw new Error('useWorkoutsContext must be used inside a WorkoutsContextProvider');
  }

  return context;
};
