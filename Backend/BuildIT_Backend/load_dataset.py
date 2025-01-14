import json
import os
import django
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password

# Charger le projet Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BuildIT_Backend.settings')
django.setup()

# Importer vos modèles
from BuildIT_API.models import Users, Projects, Skills, UserProjects, Boards, Items, Lists, BoardSkills

# Chemin vers le fichier JSON
file_path = os.path.join(os.path.dirname(__file__), 'playground_dataset.json')

def load_data():
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for record in data:

        if record == "Skills":
            try:
                for skill in data[record]:
                    Skills.objects.update_or_create(
                        name = skill["name"],
                        category = skill["category"],
                        description = skill["description"]
                    )
            except Exception as e:
                print(f"Erreur lors de l'ajout des skills : {e}")
        
        elif record == "Users" :
            try:
                for user in data[record]:
                    Users.objects.get_or_create(
                        tagname=user["tagname"],
                        password=make_password(user["password"]),
                        pseudo=user["pseudo"],
                        mail=user["mail"],
                        firstname=user["firstname"],
                        phone=user["phone"],
                        lastname=user["lastname"]
                    )
            except Exception as e:
                print(f"Erreur lors de l'ajout des utilisateurs : {e}")
        
        elif record == "Projects" :
            try:
                for project_data in data[record]:

                    user = Users.objects.get(id=project_data["created_by"])

                    project = Projects.objects.create(
                        name=project_data["project-name"],
                        description=project_data["project-description"],
                        created_by=user
                    )

                    # Création de l'association entre l'utilisateur et le projet
                    UserProjects.objects.create(
                        user=user,
                        project=project,
                        user_role='owner',  # Définit comme propriétaire
                    )

                    # Gestion des boards
                    for board_data in project_data["boards"]:
                        board_name = board_data.get('name')
                        board = Boards.objects.create(name=board_name, project=project)

                        # Gestion des skills (création ou récupération)
                        skills = board_data.get('skills', [])
                        for skill_name in skills:
                            skill, already_exist = Skills.objects.get_or_create(name=skill_name)
                            BoardSkills.objects.create(board=board, skill=skill)

                        # Gestion des listes dans chaque board
                        for list_data in board_data.get('lists', []):
                            list_name = list_data.get('name')
                            list = Lists.objects.create(name=list_name, board=board)

                            # Gestion des items dans chaque liste
                            for item_data in list_data.get('items', []):
                                item_name = item_data.get('name')
                                item_description = item_data.get('description')

                                # Création de l'item avec created_by et creation_date
                                Items.objects.create(
                                    name=item_name,
                                    description=item_description,
                                    created_by=user,
                                    list=list
                                )
            except Exception as e:
                print(f"Erreur lors de la création des projets : {e}")

        elif record == "ProjectUser" : 
            try:
                for project_user in data[record]:
                    user = Users.objects.get(id=project_user["user"])
                    project = Projects.objects.get(id=project_user["project"])

                    UserProjects.objects.create(
                        user = user,
                        project = project,
                        user_role = project_user["user_role"]
                    )
            except Exception as e:
                print(f"Erreur lors de l'ajout des ProjectUser : {e}")


if __name__ == "__main__":
    load_data()
