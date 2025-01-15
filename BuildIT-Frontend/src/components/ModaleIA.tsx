import React, { useState } from 'react';
import '../styles/ModaleIA.css';
import { createThread, updateThread, processMessage } from '../utils/api_router';

{ 
  /*
  Prochaines étapes sur les modales:
  - Optimisation du code
  */
}

interface ModaleIAProps {
  onSave: (data: { name: string; type: string; description: string; features: string; targets: string }) => void;
  onClose: () => void;
}

const ModaleIA: React.FC<ModaleIAProps> = ({ onClose }) => {
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
  const [threadId, setThreadId] = useState<string>('');
  const [frontendStacks, setFrontendStacks] = useState<string[]>([]);
  const [backendStacks, setBackendStacks] = useState<string[]>([]);
  const [databaseStacks, setDatabaseStacks] = useState<string[]>([]);
  const [featuresRecommendations, setFeaturesRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [frontendCustonStack, setFrontendCustomStack] = useState('');
  const [backendCustonStack, setBackendCustomStack] = useState('');
  const [databaseCustonStack, setDatabaseCustomStack] = useState('');

  const handlePrevious = () => setStep(step - 1);

  const handleSendToBack = async () => {
    const showLoaderAndLoaded = (nextStep: number) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(nextStep);
      }, 1000);
    };
    try {
      setLoading(true);
      /* Gestion de la partie 1 de la Modale */
      if (step === 1) {
        /* Verifie la saisie des champs */
        if (name === '' || type === '' || description === '' || features === '' || targets === '') {
          alert('Please fill all fields');
          return;
        }
        /* Creation du Thread */
        const thread = await createThread();
        const threadId = thread;
        setThreadId(threadId); 
        /* Mis a jour du Thread */
        const content1 = { "Nom du projet": name, "Type de projet": type, "Description détaillé": description, "Fonctionnalités clés": features, "Public cible": targets };
        const response_part1 = await updateThread(threadId, content1);

        const recommendationJSON = JSON.parse(response_part1); /* Parse les recommendations de l'IA */
        recommendationJSON.recommendations.frontend.push('Other');
        recommendationJSON.recommendations.backend.push('Other');
        recommendationJSON.recommendations.database.push('Other');
        setFrontendStacks(recommendationJSON.recommendations.frontend); /* Stocke les stacks frontend */
        setBackendStacks(recommendationJSON.recommendations.backend); /* Stocke les stacks backend */
        setDatabaseStacks(recommendationJSON.recommendations.database); /* Stocke les stacks database */

        showLoaderAndLoaded(2);
        /* Gestion de la partie 2 de la Modale */
      } else if (step === 2) {
        /* Verifie la saisie des champs */
        if (frontend === '' || backend === '' || database === '') {
          alert('Please select a stack for each part');
          return;
        }
        setLoading(true); /* Affiche le loader */
        /* Definition des variables contenant la stack final choisi par l'user */
        let finalChoiceDatabase = '';
        let finalChoiceFrontend = '';
        let finalChoiceBackend = '';
        /* Verifie si l'user a choisi une stack custom et remplit les variables finales */
        if (frontend === 'Other') {
          if (frontendCustonStack === '') {
            alert('Please enter your custom frontend stack');
            return;
          } else {
            finalChoiceFrontend = frontendCustonStack;
            console.log(finalChoiceFrontend);
          }
        } else {
          finalChoiceFrontend = frontend;
          console.log(finalChoiceFrontend);
        }
        if (backend === 'Other') {
          if (backendCustonStack === '') {
            alert('Please enter your custom backend stack');
            return;
          } else {
            finalChoiceBackend = backendCustonStack;
            console.log(finalChoiceBackend);
          }
        } else {
          finalChoiceBackend = backend;
          console.log(finalChoiceBackend);
        }
        if (database === 'Other') {
          if (databaseCustonStack === '') {
            alert('Please enter your custom database stack');
            return;
          } else {
            finalChoiceDatabase = databaseCustonStack;
            console.log(finalChoiceDatabase);
          }
        } else {
          finalChoiceDatabase = database;
          console.log(finalChoiceDatabase);
        }
        const content2 = { "Frontend": finalChoiceFrontend, "Backend": finalChoiceBackend, "Database": finalChoiceDatabase };
        const response_part2 = await updateThread(threadId, content2); // Request BuildIT IA
        const featuresRecommendationsJSON = JSON.parse(response_part2); /* Parse les recommendations de l'IA */
        const featuresRecommendationsArray: string[] = Object.values(featuresRecommendationsJSON.features_recommendations) as string[];
        setFeaturesRecommendations(featuresRecommendationsArray); /* Stocke les features recommandées */
        showLoaderAndLoaded(3);

        /* Gestion de la partie 3 de la Modale */
      } else if (step === 3) {
        const content3 = { featuresSelected };
        const response_part3 = await updateThread(threadId, content3); // Request BuildIT IA
        const finalResponse = response_part3;
        const process = await processMessage(finalResponse, threadId); // Envoie les données au backend Django pour créer le projet
        if (process === true) { // Si le projet est créé
          setThreadId('');
          showLoaderAndLoaded(5);
          setTimeout(() => {onClose(); window.location.reload();}, 2000);
        } else { // Si le projet n'est pas créé
          console.error('Error creating project:', process);
        }
      }
    } catch (error) {
      console.error('Error communicating with backend:', error);
    } finally {
      setLoading(false);
    }
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative w-3/5 bg-bgPrimary p-6 rounded-lg shadow-lg max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>

        {loading && (
          <div className="flex flex-col items-center justify-center p-10">
            <div className="loader mt-20"></div>
            <div>
              <h2 className="text-white text-3xl mt-20 mb-20 font-thin text-center">Waiting for AI response...</h2>
            </div>
          </div>
        )}

        {!loading && step === 1 && (
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

        {!loading && step === 2 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Select your stack</h2>
            <div className='flex flex-col gap-4'>
              <h3 className='text-primary font-bold text-lg mt-5'>Frontend Stack</h3>
              <div className="frontend-stack-select flex">
                {frontendStacks.map((stack) => (
                  <div
                    key={stack}
                    className={`card-stack w-1/4 text-center bg-bgSecondary p-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${frontend === stack ? 'bg-secondary scale-105' : ''}`}
                    data-value={stack}
                    onClick={() => handleStackSelection('frontend', stack)}
                  >
                    <h4 className="text-primary text-lg font-medium">{stack}</h4>
                  </div>
                ))}
              </div>
              {frontend === 'Other' && (
                    <input
                      onChange={(e) => setFrontendCustomStack(e.target.value)}
                      placeholder="Enter your frontend stack"
                      className="mt-2 p-2 rounded bg-bgSecondary text-white focus:outline-none border-none"
                    />
                )}
              <h3 className='text-primary font-bold text-lg mt-5'>Backend Stack</h3>
              <div className="backend-stack-select flex">
                {backendStacks.map((stack) => (
                  <div
                    key={stack}
                    className={`card-stack w-1/4 text-center bg-bgSecondary p-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${backend === stack ? 'bg-secondary scale-105' : ''}`}
                    data-value={stack}
                    onClick={() => handleStackSelection('backend', stack)}
                  >
                    <h4 className="text-white text-lg font-medium">{stack}</h4>
                  </div>
                ))}
              </div>
              {backend === 'Other' && (
                    <input
                      onChange={(e) => setBackendCustomStack(e.target.value)}
                      placeholder="Enter your backend stack"
                      className="mt-2 p-2 rounded bg-bgSecondary text-white focus:outline-none border-none"
                    />
                )}
              <h3 className='text-primary font-bold text-lg mt-5'>Database Stack</h3>
              <div className="database-stack-select flex">
                {databaseStacks.map((stack) => (
                  <div
                    key={stack}
                    className={`card-stack w-1/4 text-center bg-bgSecondary p-3 rounded-lg shadow-lg ml-3 hover:bg-secondary hover:scale-105 transition-all cursor-pointer ${database === stack ? 'bg-secondary scale-105' : ''}`}
                    data-value={stack}
                    onClick={() => handleStackSelection('database', stack)}
                  >
                    <h4 className="text-white text-lg font-medium">{stack}</h4>
                  </div>
                ))}
              </div>
              {database === 'Other' && (
                    <input
                      onChange={(e) => setDatabaseCustomStack(e.target.value)}
                      placeholder="Enter your database stack"
                      className="mt-2 p-2 rounded bg-bgSecondary text-white focus:outline-none border-none"
                    />
                )}
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

        {!loading && step === 3 && (
          <>
            <h2 className="text-white text-3xl mt-5 mb-7 font-thin text-center">Select your features</h2>
            <div className='flex flex-col gap-4 h-80 p-4 rounded-lg overflow-y-auto'>
              {featuresRecommendations.map((feature) => (
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

        {!loading && step === 5 && (
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