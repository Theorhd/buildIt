import React, { useState } from 'react';

interface ModaleIAProps {
  onSave: (data: { name: string; type: string; description: string; features: string; targets: string }) => void;
  onClose: () => void;
}

const ModaleIA: React.FC<ModaleIAProps> = ({ onSave, onClose }) => {
  const [step, setStep] = useState(1);
  {/* Step 1 - Project */}
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [targets, setTargets] = useState('');
  {/* Step 2 - Stack */}
  const [frontend, setFrontend] = useState('');
  const [backend, setBackend] = useState('');
  const [database, setDatabase] = useState('');


  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSendToBack = () => {
    // Send data to backend
    if (step === 1) {
      console.log({ step, name, type, description, features, targets });
      handleNext();
    } else if (step === 2) {
      console.log({ step, frontend, backend, database });
      handleNext();
    } else if (step === 3) {
      console.log({ step });
    }
  };

  const handleSave = () => {
    onSave({ name, type, description, features, targets });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-3/5 bg-bgPrimary p-6 rounded-lg shadow-lg max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>

        {step === 1 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Create a new project</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-primary font-medium mb-1">Project Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-primary font-medium mb-1">Project Type</label>
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-primary font-medium mb-1">Project detailed description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-primary font-medium mb-1">Project Features</label>
                <textarea
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-primary font-medium mb-1">Project Targets</label>
                <input
                  value={targets}
                  onChange={(e) => setTargets(e.target.value)}
                  className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none"
                ></input>
              </div>
            </div>

            {/* Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleSendToBack}
                className="bg-secondary text-white px-6 py-2 full-rounded border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Select your stack</h2>
            {/* Modale Step 2 - Stack */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-primary font-bold text-lg mt-5'>Frontend Stack</h3>
              <div className="frontend-stack-select flex">
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-primary text-lg font-medium">React</h4>
                </div>
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-primary text-lg font-medium">Vue</h4>
                </div>
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-primary text-lg font-medium">Angular</h4>
                </div>
                <div className='card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer'>
                  <h4 className="text-primary text-lg font-medium">Other</h4>
                </div>
              </div>
              <h3 className='text-primary font-bold text-lg mt-5'>Backend Stack</h3>
              <div className="backend-stack-select flex">
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-white text-lg font-medium">NodeJS</h4>
                </div>
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-white text-lg font-medium">Python</h4>
                </div>
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-white text-lg font-medium">Java</h4>
                </div>
                <div className='card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer'>
                  <h4 className="text-white text-lg font-medium">Other</h4>
                </div>
              </div>
              <h3 className='text-primary font-bold text-lg mt-5'>Database Stack</h3>
              <div className="database-stack-select flex">
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-white text-lg font-medium">MongoDB</h4>
                </div>
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-white text-lg font-medium">PostgreSQL</h4>
                </div>
                <div className="card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer">
                  <h4 className="text-white text-lg font-medium">MySQL</h4>
                </div>
                <div className='card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer'>
                  <h4 className="text-white text-lg font-medium">Other</h4>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 text-center">
                <button
                  onClick={handlePrevious}
                  className="bg-secondary text-white px-6 py-2 full-rounded border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleSendToBack}
                  className="bg-secondary text-white px-6 py-2 full-rounded border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition ml-3"
                >
                  Next
                </button>
              </div>
            </div>

          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Modale 3</h2>
            {/* Modale Step 3 - Features */}
          </>
        )}
      </div>
    </div>
  );
};

export default ModaleIA;
