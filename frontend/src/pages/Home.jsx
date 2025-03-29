import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
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

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>{workouts && workouts.map((workout) => <WorkoutDetails workout={workout} key={workout._id} />)}</div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
