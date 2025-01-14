import React, { useState } from "react";

interface ModaleNewBoardProps {
  onNewBoardCreation: (projectId: string, boardName: string) => void;
  onClose: () => void;
  projectId: string;
}

const ModaleNewBoard: React.FC<ModaleNewBoardProps> = ({ onNewBoardCreation, onClose, projectId }) => {
    const [boardName, setBoardName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleNewBoardCreation = async () => {
        if (boardName === '') {
            alert('Please enter a board name');
            return;
        }
        try {
            onNewBoardCreation(projectId, boardName);
            onClose();
        } catch (err) {
            setError('Failed to create new board. Please try again.');
        }
    }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative w-1/3 bg-bgPrimary p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>
        <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Add a new board</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-primary font-medium mb-1">New Board Name</label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleNewBoardCreation}
            className="bg-secondary text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
          >
            Create New Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModaleNewBoard;

