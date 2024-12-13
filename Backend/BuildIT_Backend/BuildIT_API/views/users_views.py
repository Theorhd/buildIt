from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication

from BuildIT_API.models.Users import Users
from BuildIT_API.serializers.UserSerializer import UserSerializer
from BuildIT_API.utils import get_user_from_token

class IsAuthenticatedWithToken(BasePermission):
    def has_permission(self, request, view):
        auth = JWTAuthentication()
        try:
            validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])
            request.user = get_user_from_token(validated_token)  # Lier l'utilisateur au request
            return True
        except Exception:
            return False
        
class ProtectedView(APIView):
    permission_classes = [IsAuthenticatedWithToken]  # L'utilisateur doit être connecté avec un token JWT valide

    def get(self, request):
        auth = JWTAuthentication()
        validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])
        user = get_user_from_token(validated_token)  # Lier l'utilisateur au request
        print(user)
        return Response({"detail": "You are authenticated!"})
    
    def post(self, request):
        return Response({"detail": "You are authenticated!"})

class UserLoginView(APIView):
    def post(self, request):
        tagname = request.data.get("tagname")
        password = request.data.get("password")

        # Vérifier si l'utilisateur existe
        try:
            user = Users.objects.get(tagname=tagname)
        except Users.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Vérifier le mot de passe
        if not check_password(password, user.password):
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Générer un token JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)

class UserListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

