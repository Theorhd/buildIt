from rest_framework.exceptions import APIException
from rest_framework import status

# Exception personnalisée pour un token invalide ou expiré
class InvalidTokenException(APIException):
    status_code = 498  # Code non standard, largement utilisé
    default_detail = 'Votre jeton d’authentification est invalide ou expiré.'
    default_code = 'invalid_token'