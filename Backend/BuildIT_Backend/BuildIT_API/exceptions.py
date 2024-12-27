from rest_framework.exceptions import APIException
from rest_framework import status

# Exception personnalisée pour un token invalide ou expiré
class InvalidTokenException(APIException):
    status_code = 498  # Code non standard, largement utilisé
    default_detail = 'Votre jeton d’authentification est invalide ou expiré.'
    default_code = 'invalid_token'

# Exception personnalisée pour un utilisateur qui n’est pas membre du projet
class UserNotInProjectException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'L’utilisateur n’est pas membre du projet.'
    default_code = 'user_not_in_project'

# Exception personnalisée pour un projet qui n’existe pas
class ProjectNotFoundException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = 'Le projet n’a pas été trouvé.'
    default_code = 'project_not_found'