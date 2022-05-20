import React from 'react';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  // USE USEQUERY TO MAKE QUERY REQUEST
  const {loading, data} = useQuery(QUERY_THOUGHTS);
  const {data: userData } = useQuery(QUERY_ME_BASIC)

  // if there is any data,store in the thoughts constant we created if not then save empty array
  const thoughts = data?.thoughts || [];
  console.log(thoughts)

  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className='col-12 mb-3'>
            <ThoughtForm />
            
            </div>
        )}
      </div>
    <div className="flex-row justify-space-between">
    <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
        )}
      </div>
    {loggedIn && userData ? (
      <div className='clo-12 col-lg-3 mb-3'>
        <FriendList
        username={userData.me.username}
        friendCount={userData.me.friendCount}
        friends={userData.me.friends}
        />
        </div>
      ) : null}
    </div>
  </main>
);
};

export default Home;
