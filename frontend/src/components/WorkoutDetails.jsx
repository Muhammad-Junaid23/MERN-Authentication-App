import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const res = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg) : </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <div className='actions'>
        <span className='material-symbols-outlined' onClick={() => navigate(`/edit/${workout._id}`)}>
          Edit
        </span>
        <span className='material-symbols-outlined delete_btn' onClick={handleDelete}>
          Delete
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
