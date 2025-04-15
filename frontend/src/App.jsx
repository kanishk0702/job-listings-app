import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs?location=${locationSearch}`);
        setJobs(res.data);
        if (res.data.length > 0 && !selectedJob) {
          setSelectedJob(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [locationSearch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Job Listings</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Job List */}
        <div className="md:w-1/3">
          <div className="bg-white p-4 rounded shadow mb-4">
            <input
              type="text"
              placeholder="Filter by location..."
              className="w-full p-2 border rounded"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading jobs...</p>
            </div>
          ) : (
            <div className="bg-white rounded shadow overflow-y-auto max-h-screen">
              {jobs.map(job => (
                <div 
                  key={job.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedJob?.id === job.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-blue-600">{job.company}</p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="md:w-2/3">
          {selectedJob ? (
            <div className="bg-white p-6 rounded shadow sticky top-4">
              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <p className="text-blue-600 text-lg mt-1">{selectedJob.company}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {selectedJob.employmentType}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {selectedJob.location}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="mt-2 text-gray-700">{selectedJob.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-gray-500">Posted Date</h4>
                  <p>{formatDate(selectedJob.postedDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Experience</h4>
                  <p>{selectedJob.experienceRange}</p>
                </div>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow text-center">
              {!loading && "Select a job to view details"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;