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
    Doit être appelé après IsAuthenticatedWithToken car on récupère l'user dans la requête après qu'il y ait été rangé par IsAuthenticatedWithToken

    Retourne un status HTTP 404 si le projet n'est pas retrouvable
    Retourne un status HTTP 400 si l'utilisateur n'est pas membre du projet
    """

    def has_permission(self, request, view):
        # Récupération du project_id depuis les données POST
        project_id = request.data.get("project_id")

        # Vérifier si project_id est fourni
        if not project_id:
            raise ProjectNotFoundException  # Aucun project_id fourni

        # Vérifier si l'utilisateur fait partie du projet via UserProjects
        if (not UserProjects.objects.filter(user=request.user, project_id=project_id).exists()):
            raise UserNotInProjectException 

        return True

class IsUserInProjectFromBoardId(BasePermission):
    """
    Doit être appelé après IsAuthenticatedWithToken car on récupère l'user dans la requête après qu'il y ait été rangé par IsAuthenticatedWithToken
    
    Retourne un status HTTP 404 si le projet n'est pas retrouvé
    Retourne un status HTTP 400 si l'utilisateur n'est pas membre du projet dans lequel le board appartient
    """

    def has_permission(self, request, view):
        # Récupération du board_id depuis les données POST
        board_id = request.data.get("board_id")

        # Vérifier si board_id est fourni
        if not board_id:
            raise ProjectNotFoundException  # Aucun board_id fourni

        try:
            # Récupérer le board et son projet associé
            board = Boards.objects.get(id=board_id)
            project = board.project

            # Vérifier si l'utilisateur fait partie du projet via UserProjects
            if (not UserProjects.objects.filter(user=request.user, project=project).exists()):
                raise UserNotInProjectException

        except Boards.DoesNotExist:
            # Si le board n'existe pas
            raise ProjectNotFoundException
    
        return True

class IsUserInProjectFromListId(BasePermission):
    """
    Doit être appelé après IsAuthenticatedWithToken car on récupère l'user dans la requête après qu'il y ait été rangé par IsAuthenticatedWithToken
    
    Retourne un status HTTP 404 si le projet n'est pas retrouvé
    Retourne un status HTTP 400 si l'utilisateur n'est pas membre du projet dans lequel la list appartient
    """

    def has_permission(self, request, view):
        # Récupération du list_id depuis les données POST
        list_id = request.data.get("list_id")

        # Vérifier si list_id est fourni
        if not list_id:
            raise ProjectNotFoundException
        
        try:
            list = Lists.objects.get(id=list_id)
            project = list.board.project

            # Vérifier si l'utilisateur fait partie du projet via UserProjects
            if (not UserProjects.objects.filter(user=request.user, project=project).exists()):
                raise UserNotInProjectException

        except Lists.DoesNotExist:
            raise ProjectNotFoundException

        return True

class IsUserInProjectFromItemId(BasePermission):
    """
    Doit être appelé après IsAuthenticatedWithToken car on récupère l'user dans la requête après qu'il y ait été rangé par IsAuthenticatedWithToken
    
    Retourne un status HTTP 404 si le projet n'est pas retrouvé
    Retourne un status HTTP 400 si l'utilisateur n'est pas membre du projet dans lequel l'item appartient
    """

    def has_permission(self, request, view):
        # Récupération du item_id depuis les données POST
        item_id = request.data.get("item_id")

        # Vérifier si item_id est fourni
        if not item_id:
            raise ProjectNotFoundException
        
        try:
            item = Items.objects.get(id=item_id)
            project = item.list.board.project

            # Vérifier si l'utilisateur fait partie du projet via UserProjects
            if (not UserProjects.objects.filter(user=request.user, project=project).exists()):
                raise UserNotInProjectException

        except Lists.DoesNotExist:
            raise ProjectNotFoundException

        return True
