from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import BasePermission

from BuildIT_API.exceptions import InvalidTokenException
from BuildIT_API.models import Users

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