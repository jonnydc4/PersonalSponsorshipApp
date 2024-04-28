import React, { useState } from 'react';

function EditJobForm({ selectedJob, onSave }) {
  // State for the job title, description, and location
  const [title, setTitle] = useState(selectedJob.title);
  const [description, setDescription] = useState(selectedJob.description);
  const [location, setLocation] = useState(selectedJob.location);

  // Handle changes in the form inputs
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Function to handle save button click
  const handleSave = () => {
    // Create an updated job object
    const updatedJob = {
      ...selectedJob,
      title: title,
      description: description,
      location: location
    };
    onSave(updatedJob);
  };

  return (
    <div className="edit-job-container">
      <h1>Edit Job: {title}</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

export default EditJobForm;
