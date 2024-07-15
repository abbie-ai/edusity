import React, { useEffect, useState } from 'react';
import { programs } from '../../Assets/Data/Data';
import { useParams } from 'react-router-dom';
import './ProgramDetails.css';

const ProgramDetails = () => {
  const { url } = useParams();
  const [programDetails, setProgramDetails] = useState(null);
  const handleClick = (selectedProgram) => {
    setProgramDetails(prevDetails => 
      prevDetails && prevDetails.url === selectedProgram.url ? null : selectedProgram
    );
  };

  useEffect(() => {
    const program = programs.find(program => program.url === url);
    if (program) {
      setProgramDetails(program);
    }
  }, [url]);

  return (
    <div>
      <div id="program-details">
        {programDetails ? (
          <div>
            <h2>{programDetails.name}</h2>
            <p><strong>Description:</strong> {programDetails.description}</p>
            <p><strong>Requirements:</strong> {programDetails.requirements}</p>
            <p><strong>Duration:</strong> {programDetails.duration}</p>
            <ul>
              {programDetails.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        ) : (
          'No program selected'
        )}
      </div>
      <div>
        <ol>
          {programs.map((program, index) => (
            <li key={index} onClick={() => handleClick(program)}>
              <span>{program.url}</span>
              {programDetails && programDetails.url === program.url && (
                <ul>
                  {program.courses.map((course, courseIndex) => (
                    <li key={courseIndex}>{course}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ProgramDetails;
