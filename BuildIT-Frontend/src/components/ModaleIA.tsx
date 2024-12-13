import React, { useState } from 'react';
import './ModaleIA.css';

{ 
  /*
  Prochaines étapes sur les modales:
  - Rendre obligatoire la saisie des champs
  - Ajouter les appels au backend Django pour envoyer les datas et récupérer les réponses de l'IA
  - Mettre en place le système de traitement des réponses de l'IA afin d'afficher les éléments correctement
  - Optimisation du code
  */
 }

interface ModaleIAProps {
  onSave: (data: { name: string; type: string; description: string; features: string; targets: string }) => void;
  onClose: () => void;
}

const ModaleIA: React.FC<ModaleIAProps> = ({ onSave, onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [targets, setTargets] = useState('');
  const [frontend, setFrontend] = useState('');
  const [backend, setBackend] = useState('');
  const [database, setDatabase] = useState('');
  const [featuresSelected, setFeaturesSelected] = useState<string[]>([]);

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const openLoader = () => setStep(4);
  const openLoaded = () => setStep(5);

  const handleSendToBack = () => {
    const showLoaderAndLoaded = (nextStep: number) => {
      openLoader();
      setTimeout(() => {
        openLoaded();
        setTimeout(() => setStep(nextStep), 1000);
      }, 1000);
    };

    if (step === 1) {
      console.log({ step, name, type, description, features, targets });
      showLoaderAndLoaded(2);
    } else if (step === 2) {
      console.log({ step, frontend, backend, database });
      showLoaderAndLoaded(3);
    } else if (step === 3) {
      console.log({ step, featuresSelected });
      showLoaderAndLoaded(5);
      handleSave();
      setTimeout(() => onClose(), 2000);
    }
  };

  const handleSave = () => {
    onSave({ name, type, description, features: featuresSelected.join(', '), targets });
  };

  const handleStackSelection = (type: string, value: string) => {
    if (type === 'frontend') setFrontend(value);
    else if (type === 'backend') setBackend(value);
    else if (type === 'database') setDatabase(value);
  };

  const handleFeatureSelection = (feature: string) => {
    setFeaturesSelected((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
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
                  className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none resize-none"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-primary font-medium mb-1">Project Features</label>
                <textarea
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full p-2 bg-bgSecondary text-white rounded border-none border-gray-600 focus:outline-none resize-none"
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
            <div className="mt-6 text-center">
              <button
                onClick={handleSendToBack}
                className="bg-secondary text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Select your stack</h2>
            <div className='flex flex-col gap-4'>
              <h3 className='text-primary font-bold text-lg mt-5'>Frontend Stack</h3>
              <div className="frontend-stack-select flex">
                {['React', 'Vue', 'Angular', 'Other'].map((stack) => (
                  <div
                    key={stack}
                    className={`card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${frontend === stack ? 'bg-secondary scale-105' : ''}`}
                    data-value={stack}
                    onClick={() => handleStackSelection('frontend', stack)}
                  >
                    <h4 className="text-primary text-lg font-medium">{stack}</h4>
                  </div>
                ))}
              </div>
              <h3 className='text-primary font-bold text-lg mt-5'>Backend Stack</h3>
              <div className="backend-stack-select flex">
                {['NodeJS', 'Python', 'Java', 'Other'].map((stack) => (
                  <div
                    key={stack}
                    className={`card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${backend === stack ? 'bg-secondary scale-105' : ''}`}
                    data-value={stack}
                    onClick={() => handleStackSelection('backend', stack)}
                  >
                    <h4 className="text-white text-lg font-medium">{stack}</h4>
                  </div>
                ))}
              </div>
              <h3 className='text-primary font-bold text-lg mt-5'>Database Stack</h3>
              <div className="database-stack-select flex">
                {['MongoDB', 'PostgreSQL', 'MySQL', 'Other'].map((stack) => (
                  <div
                    key={stack}
                    className={`card-stack bg-bgSecondary p-2 pl-3 pr-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${database === stack ? 'bg-secondary scale-105' : ''}`}
                    data-value={stack}
                    onClick={() => handleStackSelection('database', stack)}
                  >
                    <h4 className="text-white text-lg font-medium">{stack}</h4>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handlePrevious}
                  className="bg-secondary text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleSendToBack}
                  className="bg-secondary text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition ml-3"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Select your features</h2>
            <div className='flex flex-col gap-4 h-80 p-4 rounded-lg overflow-y-auto'>
              {['Features 1', 'Features 2', 'Features 3', 'Features 4', 'Features 5', 'Features 6', 'Features 7', 'Features 8', 'Features 9', 'Features 10', 'Features 11', 'Features 12', 'Features 13', 'Features 14', 'Features 15', 'Features 16', 'Features 17', 'Features 18', 'Features 19', 'FeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeaturesFeatures'].map((feature) => (
                <div
                  key={feature}
                  className={`features-card bg-bgSecondary p-4 rounded-lg shadow-lg text-wrap break-words hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${featuresSelected.includes(feature) ? 'bg-secondary scale-105' : ''}`}
                  data-value={feature}
                  onClick={() => handleFeatureSelection(feature)}
                >
                  <p>{feature}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handlePrevious}
                className="bg-secondary text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition"
              >
                Previous
              </button>
              <button
                onClick={handleSendToBack}
                className="bg-secondary text-white px-6 py-2 rounded-full border-none hover:shadow-lg hover:shadow-slate-700 hover:scale-105 transition ml-3"
              >
                Save
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center p-10">
            <div className="loader mt-20"></div>
            <div>
              <h2 className="text-white text-3xl mt-20 mb-20 font-thin text-center">Waiting for AI response...</h2>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center p-10">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-secondary mt-10">
              <div className="text-white text-6xl">&#x2714;</div>
            </div>
            <h2 className="text-white text-3xl mt-10 mb-20 font-thin text-center">AI response received</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModaleIA;
