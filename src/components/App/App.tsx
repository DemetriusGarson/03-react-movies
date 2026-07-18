import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import { useState } from 'react';
import { type Votes, type VoteType } from '../../types/votes';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

export default function App() {
  const [votes, setVote] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVote({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVotes = () => {
    setVote({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes: number = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo></CafeInfo>
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      ></VoteOptions>
      {totalVotes !== 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        ></VoteStats>
      ) : (
        <Notification></Notification>
      )}
    </div>
  );
}
