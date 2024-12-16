import React, { useState } from 'react';
import '../styles/ModaleIA.css';
import axios from 'axios';

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

const BackendUrl = 'http://127.0.0.1:8000/'

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
  const [runId, setRunId] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [frontendStacks, setFrontendStacks] = useState<string[]>([]);
  const [backendStacks, setBackendStacks] = useState<string[]>([]);
  const [databaseStacks, setDatabaseStacks] = useState<string[]>([]);
  const [featuresRecommendations, setFeaturesRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');

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
      if (step === 1) {
        /* Creation du Thread */
        const createThread = await axios.post(BackendUrl+'api/create-thread', {});
        const threadId = createThread.data.thread_id;
        setThreadId(threadId); 
        console.log('Thread ID:', threadId);
        /* Mis a jour du Thread */
        const response_part1 = await axios.post(BackendUrl+'api/update-run-thread', {
          thread_id: threadId,
          content: { name, type, description, features, targets },
        });
        const runId = response_part1.data.run_id;
        setRunId(runId);
        console.log('Run ID:', runId);
        /* Récupère la réponse de l'IA */
        const get_response = await axios.post(BackendUrl+'api/get-assistant-response', {
          thread_id: threadId,
          run_id: runId,
        });
        console.log(get_response.data.assistant_reply); /* Affiche la réponse de l'IA */

        const recommendationJSON = JSON.parse(get_response.data.assistant_reply); /* Parse les recommendations de l'IA */
        recommendationJSON.recommendations.frontend.push('Other');
        recommendationJSON.recommendations.backend.push('Other');
        recommendationJSON.recommendations.database.push('Other');
        setFrontendStacks(recommendationJSON.recommendations.frontend); /* Stocke les stacks frontend */
        console.log(frontendStacks);
        setBackendStacks(recommendationJSON.recommendations.backend); /* Stocke les stacks backend */
        console.log(backendStacks);
        setDatabaseStacks(recommendationJSON.recommendations.database); /* Stocke les stacks database */
        console.log(databaseStacks);

        showLoaderAndLoaded(2);

      } else if (step === 2) {
        setLoading(true); /* Affiche le loader */
        console.log('Frontend:', frontend); /* Affiche le frontend */
        console.log('Backend:', backend); /* Affiche le backend */
        console.log('Database:', database); /* Affiche le database */
        /* Mis a jour du Thread */
        const response_part2 = await axios.post(BackendUrl+'api/update-run-thread', {
          thread_id: threadId,
          content: { "Frontend": frontend, "Backend": backend, "Database": database },
        });
        const runId = response_part2.data.run_id; /* Récupère le run ID */
        setRunId(runId);
        console.log('Run ID:', runId);
        /* Récupérer la réponse de l'IA */
        const get_response = await axios.post(BackendUrl+'api/get-assistant-response', {
          thread_id: threadId,
          run_id: runId,
        });
        console.log(get_response.data.assistant_reply); /* Affiche la réponse de l'IA */

        const featuresRecommendationsJSON = JSON.parse(get_response.data.assistant_reply); /* Parse les recommendations de l'IA */
        const featuresRecommendationsArray: string[] = Object.values(featuresRecommendationsJSON.features_recommendations) as string[];
        setFeaturesRecommendations(featuresRecommendationsArray); /* Stocke les features recommandées */

        showLoaderAndLoaded(3);

      } else if (step === 3) {
        const response_part3 = await axios.post(BackendUrl+'api/update-run-thread', {
          thread_id: threadId,
          content: { featuresSelected },
        });
        const runId = response_part3.data.run_id;
        setRunId(runId);
        console.log('Run ID:', runId);

        const get_response = await axios.post(BackendUrl+'api/get-assistant-response', {
          thread_id: threadId,
          run_id: runId,
        });
        console.log(get_response.data.assistant_reply); /* Affiche la réponse de l'IA */
        setFinalMessage(get_response.data.assistant_reply); /* Stocke la réponse de l'IA */

        const deleteThread = await axios.post(BackendUrl+'api/delete-thread', {
          thread_id: threadId,
        });
        console.log('Thread deleted:', deleteThread.data.deleted);
        setThreadId('');
        showLoaderAndLoaded(5);
        setTimeout(() => onClose(), 2000);
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
                {backendStacks.map((stack) => (
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
                {databaseStacks.map((stack) => (
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
