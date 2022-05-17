import React from 'react';
import ThoughtList from '../components/ThoughtList';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // USE USEQUERY TO MAKE QUERY REQUEST
  const {loading, data} = useQuery(QUERY_THOUGHTS);

  // if there is any data,store in the thoughts constant we created if not then save empty array
  const thoughts = data?.thoughts || [];
  console.log(thoughts)
  return (
    <main>
    <div className="flex-row justify-space-between">
      <div className="col-12 mb-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
        )}
      </div>
    </div>
  </main>
 );
};

export default Home;
