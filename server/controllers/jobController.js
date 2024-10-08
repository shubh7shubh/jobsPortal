const Job = require('../models/job');

// Create a new job
const createJob = async (req, res) => {
  const { title, company, location, description } = req.body;
  try {
    const newJob = new Job({ title, company, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId; // Extract jobId from request params
    const job = await Job.findById(jobId); // Find the job in the database

    if (!job) {
      return res.status(404).json({ message: 'Job not found' }); // If no job is found, return 404
    }

    return res.status(200).json(job);  // Return the job as a response
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Edit a job
const editJob = async (req, res) => {
  const { jobId } = req.params;
  const { title, company, location, description } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, company, location, description },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getJobs, editJob, deleteJob, getJobById };
