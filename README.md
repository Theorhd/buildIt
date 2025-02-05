# BuiltIT
## Comment setup le site pour la première fois ?
### Mise en place du backend
- Premièrement, il faut créer un venv python (dans ./Backend) :
  ```shell
  cd .\Backend\
  python -m venv .venv
  .venv/Scripts/activate
  ```
- En suite il faut importer toutes les librairies python :
  ```shell
  pip install -r requirements.txt
  ```
- Puis créer la base de donnée :
  ```shell
  python manage.py makemigrations
  python manage.py migrate
  ```
- *Optionel* : intégrer le jeu de données à la base :
  ```shell
  python .\load_dataset.py 
  ```
- Note :
  Pour créer des projets via l'assistant OpenAI, il faut rajouter un fichier '.env' au meme niveau que le venv python, et y intégrer une clef OpenAI que nous pouvons vous fournir sur demande :
  ```
  OPENAI_API_KEY_BUILDIT=VOTRE_CLEF
  ```

### Mise en place du frontend
- Il faut installer les dépendances de node.js depuis le bon dosser (shell depuis la racine du projet) :
  ```shell
  cd .\BuildIT-Frontend\
  npm install
  ```

## Pour faire fonctionner le site il faut démarrer les servers de back et de front :
### Backend
- Il faut s'assurer que le venv python est activé (shell depuis la racine du projet) :
  ```shell
  cd .\Backend\
  .\.venv\Scripts\activate
  python manage.py runserver
  ```

### Frontend 
- Il faut lancer le server node.js (shell depuis la racine du projet) :
  ```shell
  cd .\BuildIT-Frontend\
  npm run dev
  ```

Vous avez lancé le server, l'URL devrait etre affichée dans votre terminal à la suite de la commande npm run dev.
