import React, { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const res = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setEmptyFields(json.emptyFields);
    }
    setTitle('');
    setLoad('');
    setReps('');
    setError(null);
    setEmptyFields([]);
    dispatch({ type: 'CREATE_WORKOUT', payload: data });
    console.log('new workout added: ', data);
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add Workout</h3>

      <label htmlFor='title'>Title:</label>
      <input
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor='load'>Load:</label>
      <input
        type='number'
        name='load'
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label htmlFor='reps'>Reps:</label>
      <input
        type='number'
        name='reps'
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
