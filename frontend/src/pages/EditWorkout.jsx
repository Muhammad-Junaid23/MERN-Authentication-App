import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useWorkoutContext();

  const [formData, setFormData] = useState({ title: '', load: '', reps: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`/api/workouts/${id}`);
      const data = await res.json();

      if (res.ok) {
        setFormData({ title: data.title, load: data.load, reps: data.reps });
      } else {
        setError('Workout not found');
      }
    };

    fetchWorkout();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: data });
      navigate('/');
    } else {
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className='edit-form'>
      <h3>Edit Workout</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type='text' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

        <label>Load</label>
        <input type='number' value={formData.load} onChange={(e) => setFormData({ ...formData, load: e.target.value })} />

        <label>Reps</label>
        <input type='number' value={formData.reps} onChange={(e) => setFormData({ ...formData, reps: e.target.value })} />

        <button type='submit'>Update Workout</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default EditWorkout;
