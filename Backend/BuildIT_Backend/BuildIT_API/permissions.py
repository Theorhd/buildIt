from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.permissions import BasePermission
from BuildIT_API.utils import get_user_from_token

class IsAuthenticatedWithToken(BasePermission):
    """
    Vérifie si l'utilisateur est authentifié avec un token JWT valide
    """
    def has_permission(self, request, view):
        auth = JWTAuthentication()
        try:
            validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])
            request.user = get_user_from_token(validated_token)  # Lier l'utilisateur au request
            return True
        except Exception:
            return False