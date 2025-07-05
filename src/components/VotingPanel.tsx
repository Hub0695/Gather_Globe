import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Users } from 'lucide-react';

interface VotingPanelProps {
  tripId: string;
}

const VotingPanel: React.FC<VotingPanelProps> = ({ tripId }) => {
  const [votes, setVotes] = useState<{ [key: string]: 'up' | 'down' | null }>({});

  const proposals = [
    {
      id: '1',
      title: 'Visit Tokyo Skytree on Day 2',
      proposer: 'Sarah Smith',
      description: 'Best views of the city, especially at sunset',
      upvotes: 3,
      downvotes: 1,
      comments: 2,
      status: 'active'
    },
    {
      id: '2',
      title: 'Extend stay by 2 days',
      proposer: 'Mike Johnson',
      description: 'More time to explore and relax',
      upvotes: 2,
      downvotes: 2,
      comments: 5,
      status: 'active'
    },
    {
      id: '3',
      title: 'Day trip to Mount Fuji',
      proposer: 'John Doe',
      description: 'Weather looks perfect next week',
      upvotes: 4,
      downvotes: 0,
      comments: 3,
      status: 'approved'
    }
  ];

  const handleVote = (proposalId: string, voteType: 'up' | 'down') => {
    setVotes(prev => ({
      ...prev,
      [proposalId]: prev[proposalId] === voteType ? null : voteType
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Group Voting</h2>
          <p className="text-gray-600 mt-1">Vote on proposals and make group decisions</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          New Proposal
        </button>
      </div>

      {/* Voting Rules */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How Voting Works</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Proposals need majority approval (3+ votes) to be accepted</li>
          <li>• Everyone can vote once per proposal</li>
          <li>• Comments help explain your position</li>
          <li>• Organizers can override decisions if needed</li>
        </ul>
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{proposal.description}</p>
                <p className="text-sm text-gray-500">Proposed by {proposal.proposer}</p>
              </div>
            </div>

            {/* Voting Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleVote(proposal.id, 'up')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      votes[proposal.id] === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{proposal.upvotes}</span>
                  </button>
                  <button
                    onClick={() => handleVote(proposal.id, 'down')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      votes[proposal.id] === 'down'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{proposal.downvotes}</span>
                  </button>
                </div>
                
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                  <MessageCircle className="h-4 w-4" />
                  <span>{proposal.comments} comments</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 max-w-xs ml-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{proposal.upvotes}/{proposal.upvotes + proposal.downvotes} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(proposal.upvotes / (proposal.upvotes + proposal.downvotes)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voting Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">0</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPanel;