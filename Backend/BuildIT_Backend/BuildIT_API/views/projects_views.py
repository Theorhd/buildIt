from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from BuildIT_API.models.Projects import Projects
from BuildIT_API.models.Boards import Boards
from BuildIT_API.models.Lists import Lists
from BuildIT_API.models.Items import Items
from BuildIT_API.models.Skills import Skills
from BuildIT_API.models.BoardSkills import BoardSkills
from BuildIT_API.models.UserProjects import UserProjects
from BuildIT_API.models.Users import Users
from BuildIT_API.serializers.ProjectSerializer import ProjectSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken, IsUserInProjectFromProjectId



class ProjectCreateView(generics.CreateAPIView):
    """
    Création d'un projet
    
    Méthode POST
    Permission: Doit avoir un token JWT valide
    """
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
        project = Projects.objects.create(
            name=data.get('project-name'),
            description=data.get('project-description'),
            created_by=user
        )

        # Création de l'association entre l'utilisateur et le projet
        UserProjects.objects.create(
            user=user,
            project=project,
            user_role='owner',  # Définit comme propriétaire
        )

        # Gestion des boards
        for board_data in data.get('boards', []):
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

        # Sérialisation et réponse
        serializer = self.get_serializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ProjectRetriveView(generics.RetrieveAPIView):
    """
    Recherche d'un projet par son ID
    
    Méthode GET
    Permission:
    - Doit avoir un token JWT valide
    - Doit faire partie du projet
    """
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromProjectId]

    def get(self, request, *args, **kwargs):
        
        # Récupération de l'ID projet depuis l'URL
        project_id_url = kwargs.get("project_id")

        # Recherche du projet dans la base de données selon l'ID projet
        try:
            project = Projects.objects.get(id=project_id_url)
            serializer = self.get_serializer(project)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Projects.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

class ProjectFromUserView(generics.ListAPIView):
    """
    Recherche de tous les projets d'un utilisateur
    
    Méthode GET
    Permission: Doit avoir un token JWT valide
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedWithToken]

    def get(self, request, *args, **kwargs):
        # Récupération de l'utilisateur après la permission
        user = request.user

        try:
            # Récupérer tous les projets où l'utilisateur est lié via UserProjects
            user_projects = UserProjects.objects.filter(user=user)

            # Filtrer les projets en attente (pending)
            pending_projects = user_projects.filter(user_role="pending").select_related('project')
            pending_projects_data = [
                {
                    "id": up.project.id,
                    "name": up.project.name,
                    "description": up.project.description
                }
                for up in pending_projects
            ]

            # Filtrer les projets actifs (owner ou member)
            active_projects = user_projects.filter(user_role__in=["owner", "member"]).select_related('project')
            active_projects_queryset = Projects.objects.filter(id__in=[up.project.id for up in active_projects])

            # Sérialiser les projets actifs
            active_projects_data = ProjectSerializer(active_projects_queryset, many=True).data

            # Construire la réponse
            response_data = {
                "pending_projects": pending_projects_data,
                "active_projects": active_projects_data
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProjectUpdateView(generics.UpdateAPIView): # TODO Faire des sécurité pour prévoir les nested fields ("boards" : [...] fait planter le code)
    """
    Modification d'un projet
    
    Méthode PUT
    Permission:
    - Doit avoir un token JWT valide
    - Doit faire partie du projet
    """
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromProjectId]

    def put(self, request, *args, **kwargs):

        # Récupération de l'ID projet depuis le corps de la requête
        project_id_from_body = request.data.get("project_id")    

        # Recherche du projet dans la base de données selon l'ID projet
        # Mise à jour du projet
        try:
            project = Projects.objects.get(id=project_id_from_body)
            serializer = self.get_serializer(project, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Projects.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

class ProjectDeleteView(generics.DestroyAPIView):
    """
    Suppression d'un projet
    
    Méthode DELETE
    Permission:
    - Doit avoir un token JWT valide
    - Doit être le créateur du projet
    """
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedWithToken]

    def delete(self, request, *args, **kwargs):
        # Récupération de l'ID projet depuis l'URL
        project_id_url = kwargs.get("pk")

        # Vérification de la validité du token
        auth = JWTAuthentication()
        validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])

        # Recuperation de l'id de l'utilisateur depuis le token
        user_id_from_token = validated_token.get("user_id")

        # Recherche du projet dans la base de données selon l'ID projet & l'ID utilisateur
        # Suppression du projet
        try:
            project = Projects.objects.get(id=project_id_url, created_by_id=user_id_from_token)
            project.delete()
            return Response({"message": "Project deleted successfully."}, status=status.HTTP_200_OK)
        except Projects.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

class ProjectAddUserView(generics.UpdateAPIView):
    """
    Ajout d'un utilisateur au projet
    
    Méthode POST
    Permission:
    - Doit avoir un token JWT valide
    - Doit faire partie du projet ou il veut ajouter un nouvel utilisateur
    """
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromProjectId]

    def post(self, request, *args, **kwargs):

        try:
            # Récupération de l'ID projet depuis le corps de la requête
            project_id_from_body = request.data.get("project_id")
            project = Projects.objects.get(id=project_id_from_body)
        except Projects.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Récupération de l'ID utilisateur depuis le tagname de la requete
            user_tagname_from_body = request.data.get("user_tagname")
            user = Users.objects.get(tagname=user_tagname_from_body)
        except Users.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        print(user)
        print(project)
        
        UserProjects.objects.get_or_create(
            user=user,
            project=project,
            user_role='pending'
        )

        return Response({"message": "User added to project successfully."}, status=status.HTTP_200_OK)

class ProjectAcceptInvitationView(generics.UpdateAPIView):
    """
    Acceptation d'une invitation à un projet
    
    Méthode POST
    Permission: Doit avoir un token JWT valide
    """
    permission_classes = [IsAuthenticatedWithToken]

    def post(self, request, *args, **kwargs):
        try:
            # Récupération de l'ID projet depuis le corps de la requête
            project_id_from_body = request.data.get("project_id")
            project = Projects.objects.get(id=project_id_from_body)
        except Projects.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

        # Récupération de l'utilisateur après la permission
        user = request.user

        try:
            # Récupérer l'association UserProjects
            user_project = UserProjects.objects.get(user=user, project=project, user_role='pending')
            user_project.user_role = 'member'
            user_project.save()
            return Response({"message": "Invitation accepted successfully."}, status=status.HTTP_200_OK)
        except UserProjects.DoesNotExist:
            return Response({"error": "Invitation not found."}, status=status.HTTP_404_NOT_FOUND)

class ProjectRejectInvitationView(generics.DestroyAPIView):
    """
    Refus d'une invitation à un projet
    
    Méthode POST
    Permission: Doit avoir un token JWT valide
    """
    permission_classes = [IsAuthenticatedWithToken]

    def post(self, request, *args, **kwargs):
        try:
            # Récupération de l'ID projet depuis le corps de la requête
            project_id_from_body = request.data.get("project_id")
            project = Projects.objects.get(id=project_id_from_body)
        except Projects.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

        # Récupération de l'utilisateur après la permission
        user = request.user

        try:
            # Supprimer l'association UserProjects
            user_project = UserProjects.objects.get(user=user, project=project, user_role='pending')
            user_project.delete()
            return Response({"message": "Invitation rejected successfully."}, status=status.HTTP_200_OK)
        except UserProjects.DoesNotExist:
            return Response({"error": "Invitation not found."}, status=status.HTTP_404_NOT_FOUND)