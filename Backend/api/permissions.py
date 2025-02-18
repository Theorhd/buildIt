from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import BasePermission

from api.exceptions import InvalidTokenException, UserNotInProjectException, ProjectNotFoundException
from api.models import Users
from api.models.Projects import Projects
from api.models.UserProjects import UserProjects
from api.models.Boards import Boards
from api.models.Lists import Lists
from api.models.Items import Items
from api.models.Tags import Tags
from api.models.ItemTags import ItemTags

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
    Retourne un status HTTP 403 si l'utilisateur n'est pas membre du projet.
    """

    def has_permission(self, request, view):

        # Récupération du project_id POST ou GET
        project_id = request.data.get("project_id") or view.kwargs.get("project_id")

        # Si le projet n'est pas fourni erreur 404 'project_not_found'
        if not project_id:
            raise ProjectNotFoundException

        # Si l'utilisateur n'est pas membre du projet erreur 403 'user_not_in_project'
        if not UserProjects.objects.filter(user=request.user, project_id=project_id).exists():
            raise UserNotInProjectException

        return True
    
class IsUserInProjectFromTagname(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet.
    - Compatible avec les méthodes HTTP : GET, POST
    - Doit être appelée après IsAuthenticatedWithToken.

    Retourne un status HTTP 404 si le projet n'est pas retrouvable.
    Retourne un status HTTP 403 si l'utilisateur n'est pas membre du projet.
    """

    def has_permission(self, request, view):

        # Récupération du project_id POST ou GET
        project_tagname = request.data.get("tagname") or view.kwargs.get("tagname")

        project = Projects.objects.get(tagname=project_tagname)

        # Si le projet n'est pas fourni erreur 404 'project_not_found'
        if not project:
            raise ProjectNotFoundException

        # Si l'utilisateur n'est pas membre du projet erreur 403 'user_not_in_project'
        if not UserProjects.objects.filter(user=request.user, project=project).exists():
            raise UserNotInProjectException

        return True

class IsUserInProjectFromBoardId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet contenant le board spécifié.
    - Compatible avec les méthodes HTTP : GET, POST
    - Doit être appelée apres IsAuthenticatedWithToken.

    Retourne un status HTTP 404 si le board n'est pas retrouvable.
    Retourne un status HTTP 403 si l'utilisateur n'est pas membre du projet.
    """

    def has_permission(self, request, view):
        # Récupération flexible de board_id
        board_id = request.data.get("board_id") or view.kwargs.get("pk")  # POST ou GET

        # Si le board n'est pas fourni erreur 404 'project_not_found'
        if not board_id:
            raise ProjectNotFoundException

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

    Retourne un status HTTP 404 si la list n'est pas retrouvable.
    Retourne un status HTTP 403 si l'utilisateur n'est pas membre du projet.
    """

def has_permission(self, request, view):
    list_id = request.data.get("list_id") or view.kwargs.get("pk")  # POST ou GET
    print(f"ID de la liste vérifié : {list_id}")

    if not list_id:
        print("Erreur : Aucun list_id fourni.")
        raise ProjectNotFoundException  # Aucun list_id fourni

    try:
        list = Lists.objects.get(id=list_id)
        project = list.board.project
        print(f"Liste trouvée : {list}")
        print(f"Projet associé : {project}")

        # Vérifie si l'utilisateur appartient au projet
        if not UserProjects.objects.filter(user=request.user, project=project).exists():
            print(f"Erreur : Utilisateur {request.user} non autorisé.")
            raise UserNotInProjectException

    except Lists.DoesNotExist:
        print(f"Erreur : La liste avec l'ID {list_id} est introuvable.")
        raise ProjectNotFoundException

    return True


class IsUserInProjectFromItemId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet contenant l'item spécifique.
    - Compatible avec les métodes HTTP : GET, POST
    - Doit être appelée apres IsAuthenticatedWithToken.

    Retourne un status HTTP 404 si l'item n'est pas retrouvable.
    Retourne un status HTTP 403 si l'utilisateur n'est pas membre du projet.
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

class IsUserInProjectFromTagId(BasePermission):
    """
    Permission pour vérifier si l'utilisateur est membre d'un projet contenant le tag spécifique.
    - Compatible avec les métodes HTTP : GET, POST
    - Doit être appelée apres IsAuthenticatedWithToken.

    Retourne un status HTTP 404 si le tag n'est pas retrouvable.
    Retourne un status HTTP 403 si l'utilisateur n'est pas membre du projet.
    """

    def has_permission(self, request, view):
        # Récupération flexible de tag_id
        tag_id = request.data.get("tag_id") or view.kwargs.get("pk")  # POST ou GET

        # Vérification si tag_id est fourni
        if not tag_id:
            raise ProjectNotFoundException  # Aucun tag_id fourni

        try:
            # Récupération du tag et de son projet
            item_tag = ItemTags.objects.get(tag_id=tag_id)
            item = item_tag.item
            project = item.list.board.project

            # Vérification si l'utilisateur appartient au projet
            if not UserProjects.objects.filter(user=request.user, project=project).exists():
                raise UserNotInProjectException

        except Tags.DoesNotExist:
            raise ProjectNotFoundException  # Tag introuvable

        return True