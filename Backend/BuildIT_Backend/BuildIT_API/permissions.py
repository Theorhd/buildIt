from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import BasePermission

from BuildIT_API.exceptions import InvalidTokenException, UserNotInProjectException, ProjectNotFoundException
from BuildIT_API.models import Users
from BuildIT_API.models.UserProjects import UserProjects
from BuildIT_API.models.Boards import Boards
from BuildIT_API.models.Lists import Lists
from BuildIT_API.models.Items import Items

class IsAuthenticatedWithToken(BasePermission):
    """
    Retourne un status HTTP 498 invalid_token si le token n'est pas valide
    """
    def has_permission(self, request, view):
        auth = JWTAuthentication()
        try:
            validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])
            request.user = Users.objects.get(id=validated_token["user_id"])  # Lier l'utilisateur au request
            return True  
        except Exception:
            raise InvalidTokenException

class IsUserInProjectFromProjectId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet.
    - Compatible avec les méthodes HTTP : GET, POST
    - Doit être appelée après IsAuthenticatedWithToken.

    Retourne un status HTTP 404 si le projet n'est pas retrouvable.
    Retourne un status HTTP 400 si l'utilisateur n'est pas membre du projet.
    """

    def has_permission(self, request, view):
        # Tentative de récupération du project_id selon la méthode HTTP

        # Récupération flexible de project_id
        project_id = request.data.get("project_id") or view.kwargs.get("pk") # POST ou GET

        # Vérifier si project_id est toujours manquant
        if not project_id:
            raise ProjectNotFoundException  # Aucun project_id fourni

        # Vérifier si l'utilisateur fait partie du projet via UserProjects
        if not UserProjects.objects.filter(user=request.user, project_id=project_id).exists():
            raise UserNotInProjectException  # L'utilisateur n'est pas membre du projet

        return True

class IsUserInProjectFromBoardId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet contenant le board spécifié.
    - Compatible avec les méthodes HTTP : GET, POST
    - Doit être appelée apres IsAuthenticatedWithToken.

    Vérifie si l'utilisateur appartient au projet contenant le board spécifié.
    Compatible avec POST (request.data) et GET (kwargs).
    """

    def has_permission(self, request, view):
        # Récupération flexible de board_id
        board_id = request.data.get("board_id") or view.kwargs.get("pk")  # POST ou GET

        # Vérification si board_id est fourni
        if not board_id:
            raise ProjectNotFoundException  # Aucun board_id fourni

        try:
            # Récupération du board et de son projet
            board = Boards.objects.get(id=board_id)
            project = board.project

            # Vérification si l'utilisateur appartient au projet
            if not UserProjects.objects.filter(user=request.user, project=project).exists():
                raise UserNotInProjectException

        except Boards.DoesNotExist:
            raise ProjectNotFoundException  # Board introuvable

        return True

class IsUserInProjectFromListId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet contenant la list spécifique.
    - Compatible avec les métodes HTTP : GET, POST
    - Doit être appelée apres IsAuthenticatedWithToken.

    Vérifie si l'utilisateur appartient au projet contenant la liste spécifiée.
    Compatible avec POST (request.data) et GET (kwargs).
    """

    def has_permission(self, request, view):
        # Récupération flexible de list_id
        list_id = request.data.get("list_id") or view.kwargs.get("pk")  # POST ou GET

        # Vérification si list_id est fourni
        if not list_id:
            raise ProjectNotFoundException  # Aucun list_id fourni

        try:
            # Récupération de la liste et de son projet
            list = Lists.objects.get(id=list_id)
            project = list.board.project

            # Vérification si l'utilisateur appartient au projet
            if not UserProjects.objects.filter(user=request.user, project=project).exists():
                raise UserNotInProjectException

        except Lists.DoesNotExist:
            raise ProjectNotFoundException  # Liste introuvable

        return True

class IsUserInProjectFromItemId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet contenant l'item spécifique.
    - Compatible avec les métodes HTTP : GET, POST
    - Doit être appelée apres IsAuthenticatedWithToken.

    Vérifie si l'utilisateur appartient au projet contenant l'item spécifié.
    Compatible avec POST (request.data) et GET (kwargs).
    """

    def has_permission(self, request, view):
        # Récupération flexible de item_id
        item_id = request.data.get("item_id") or view.kwargs.get("pk")  # POST ou GET

        # Vérification si item_id est fourni
        if not item_id:
            raise ProjectNotFoundException  # Aucun item_id fourni

        try:
            # Récupération de l'item et de son projet
            item = Items.objects.get(id=item_id)
            project = item.list.board.project

            # Vérification si l'utilisateur appartient au projet
            if not UserProjects.objects.filter(user=request.user, project=project).exists():
                raise UserNotInProjectException

        except Items.DoesNotExist:  # Correction : Items et non Lists
            raise ProjectNotFoundException  # Item introuvable

        return True
