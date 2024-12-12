import React, { useState } from 'react';

interface ModaleIAProps {
  onSave: (data: { name: string; type: string; description: string; features: string; targets: string }) => void;
  onClose: () => void;
}

const ModaleIA: React.FC<ModaleIAProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [targets, setTargets] = useState('');

  const handleSave = () => {
    onSave({ name, type, description, features, targets });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-3/5 bg-bgPrimary p-6 rounded-lg shadow-lg max-w-lg">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>

        {/* Contenu de la modale */}
        <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Create a new project</h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-300 font-medium mb-1">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-300 font-medium mb-1">Project Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Project detailed description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Key Features</label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Target Audience</label>
            <input
              type="text"
              value={targets}
              onChange={(e) => setTargets(e.target.value)}
              className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="bg-secondary text-white px-6 py-2 full-rounded border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModaleIA;
