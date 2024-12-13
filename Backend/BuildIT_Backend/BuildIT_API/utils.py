from BuildIT_API.models import Users
from rest_framework_simplejwt.exceptions import AuthenticationFailed

def get_user_from_token(token):
    try:
        user = Users.objects.get(id=token["user_id"])
        return user
    except Users.DoesNotExist:
        raise AuthenticationFailed("User not found")
