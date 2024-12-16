from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from BuildIT_API.models.Projects import Projects
from BuildIT_API.models.Boards import Boards
from BuildIT_API.models.Lists import Lists
from BuildIT_API.models.Items import Items
from BuildIT_API.models.Skills import Skills
from BuildIT_API.models.BoardSkills import BoardSkills
from BuildIT_API.models.Users import Users
from BuildIT_API.serializers.ProjectSerializer import ProjectSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken


class CreateProjectView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedWithToken]

    def post(self, request, *args, **kwargs):
        data = request.data

        # Vérification de la validité du token
        auth = JWTAuthentication()
        validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])

        # Récupération de l'id de l'utilisateur depuis le token
        user_id_from_token = validated_token.get("user_id")
        user = Users.objects.get(id=user_id_from_token)

        # Création du projet
        project_name = data.get('project-name')
        project_description = data.get('project-description')
        project = Projects.objects.create(
            name=project_name,
            description=project_description,
            created_by=user  # L'utilisateur actuel
        )

        # Gestion des boards
        for board_data in data.get('boards', []):
            board_name = board_data.get('name')
            board = Boards.objects.create(name=board_name, project=project)

            # Gestion des skills (création ou récupération)
            skills = board_data.get('skills', [])
            for skill_name in skills:
                skill, created = Skills.objects.get_or_create(name=skill_name)
                BoardSkills.objects.create(board=board, skill=skill)  # Création dans la table intermédiaire

            # Gestion des listes dans chaque board
            for list_data in board_data.get('lists', []):
                list_name = list_data.get('name')
                list_instance = Lists.objects.create(name=list_name, board=board)

                # Gestion des items dans chaque liste
                for item_data in list_data.get('items', []):
                    item_name = item_data.get('name')
                    item_description = item_data.get('description')

                    # Création de l'item avec created_by et creation_date
                    Items.objects.create(
                        name=item_name,
                        description=item_description,
                        created_by=user,  # L'utilisateur actuel
                        list=list_instance  # Association avec la liste
                    )

        # Sérialisation et réponse
        serializer = self.get_serializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
