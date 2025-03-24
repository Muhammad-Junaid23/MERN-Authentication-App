import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('/api/workouts');
        const data = await res.json();
        console.log('data', data);

        if (res.ok) {
          dispatch({ type: 'SET_WORKOUT', payload: data });
        } else {
          console.error('Failed to fetch workouts:', res.status);
        }
      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className='home'>
      <div className='workouts'>{workouts && workouts.map((workout) => <WorkoutDetails workout={workout} key={workout._id} />)}</div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
