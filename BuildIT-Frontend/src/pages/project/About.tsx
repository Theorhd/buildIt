import Markdown from "../../components/Markdown";

const markdownText = `

# H1 - Titre de niveau 1
## H2 - Titre de niveau 2
### H3 - Titre de niveau 3
#### H4 - Titre de niveau 4

---

## Paragraphe
Voici un paragraphe simple avec un **texte en gras** et un *texte en italique*.  
Vous pouvez également inclure un [lien](https://www.example.com) cliquable.

---

## Liste à puces
- Élément 1
- Élément 2
  - Sous-élément 2.1
  - Sous-élément 2.2

---

## Liste ordonnée
1. Premier élément
2. Deuxième élément
3. Troisième élément

---

## Code en ligne
Voici un exemple de \`code en ligne\`.

---

## Bloc de code
\`\`\`javascript
// Exemple de fonction JavaScript
const add = (a, b) => {
  return a + b;
};
console.log(add(5, 3));
\`\`\`

---

## Blockquote
> Ceci est un blockquote.  
> Utilisé pour des citations ou des notes importantes.

---

## Tableau
| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

---

## Image
![Image de test](https://via.placeholder.com/150)

---

## Séparateur
---

Ceci est un texte après un séparateur.

\`\`\`javascript
var test = "javascript";

console.log(test);
\`\`\`

## Plateforme Collaborative pour Développeurs

**🌐 Collaborez, créez, et innovez avec l'aide d'une IA dédiée aux développeurs.**

### 🎯 Présentation du Projet
Notre application est une plateforme web collaborative destinée aux développeurs, permettant :
- La gestion complète de projets de développement.
- Le travail d'équipe fluide et efficace.
- Une assistance intelligente pour structurer et lancer des projets grâce à l'IA.

### 🚀 Fonctionnalités Principales
#### 🔐 Gestion des Utilisateurs
- Inscription et Connexion sécurisées (authentification via JWT).
- Gestion des profils utilisateur : mise à jour des informations personnelles et compétences.
- Nom / pseudo
- Mail
- Liste de compétences / connaissances

#### 🗂️ Gestion des Projets
Créer un projet avec :
- Un titre.
- Une description détaillée.
- Les technologies utilisées.
- Un mini-guide d’installation pour faciliter la prise en main.
- Consulter la liste des projets et accéder aux détails de chaque projet.


#### ✅ Gestion des Tâches
Ajouter des tâches spécifiques à un projet.
Assigner des tâches aux membres de l’équipe.
Suivre l’état des tâches à travers différents statuts :
- 🕒 En attente
- 🔄 En cours
- ✔️ Terminé

### 🤖 Assistance par IA
L’intelligence artificielle vous accompagne dans vos projets en proposant :
Les technologies adaptées à votre projet.
Une liste d'étapes claires et structurées.
Du code généré automatiquement pour un démarrage rapide et efficace.

### 🛠️ Pourquoi utiliser notre plateforme ?
Gagnez du temps grâce à une organisation optimisée.
Collaborez efficacement avec des outils intégrés.
Bénéficiez d’une aide précieuse pour accélérer la création de vos projets de programmation.

**🌟 Rejoignez-nous et donnez vie à vos idées avec l’appui d’une communauté et d’une IA performante ! 🌟**

`;

export default function About() {

  return (
    <Markdown text={markdownText}/>
  )
}