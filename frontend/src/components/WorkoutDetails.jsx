import { useWorkoutContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
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
