from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


from BuildIT_API.models.Users import Users
from BuildIT_API.serializers.UserSerializer import UserSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken


class UserLoginView(APIView):
    """
    Connexion d'un utilisateur
    """
    serializer_class = UserSerializer

    def post(self, request):

        # Récupération du tagname et du mot de passe depuis le corps de la requête
        mail = request.data.get("mail")
        password = request.data.get("password")

        # Vérifier si l'utilisateur existe
        try:
            user = Users.objects.get(mail=mail)
        except Users.DoesNotExist:
            return Response({"detail": "Invalid mail"}, status=status.HTTP_401_UNAUTHORIZED)

        # Vérifier le mot de passe
        if not check_password(password, user.password):
            return Response({"detail": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)

        # Générer un token JWT
        refresh = RefreshToken.for_user(user)

        # Génère l'objet User en json pour la réponse
        user_data = UserSerializer(user).data

        # Rend une réponse JSON avec le token
        return Response({
            "user": user_data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=status.HTTP_200_OK)

class UserCreateView(generics.CreateAPIView):
    """
    Création d'un utilisateur

    Méthode POST
    """
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):

        # Sérialisation des données envoyées
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Création de l'utilisateur
        serializer.save()

        # Réponse JSON avec les détails de l'utilisateur et les tokens
        return Response(status=status.HTTP_201_CREATED)

class UserRetrieveView(generics.RetrieveAPIView): #TODO ajouter les permissions
    """
    Recherche d'un utilisateur par son ID

    Méthode GET
    Permission: Doit avoir un token JWT valide
    """
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedWithToken]

    def get(self, request, *args, **kwargs):

        # Récupération de l'ID utilisateur depuis l'URL
        user_id_from_url = kwargs.get("pk")

        # Recherche de l'utilisateur dans la base de données et le renvoie
        try:
            user = Users.objects.get(id=user_id_from_url)
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
class UserUpdateView(generics.UpdateAPIView):
    """
    Modification d'un utilisateur

    Méthode PUT
    Permission: Doit avoir un token JWT valide
    """
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedWithToken]

    def put(self, request, *args, **kwargs):

        # Vérification de l'existence du token
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Token "):
            return Response({"error": "Invalid or missing token."}, status=status.HTTP_401_UNAUTHORIZED)

        # Vérification de la validité du token
        auth = JWTAuthentication()
        validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])

        # Recuperation de l'id de l'utilisateur depuis le token
        user_id_from_token = validated_token.get("user_id")

        # Récupération de l'ID utilisateur depuis le corps de la requête
        user_id_from_body = request.data.get("id")

        # Vérification que l'id du body correspond au token
        if not user_id_from_body or str(user_id_from_body) != str(user_id_from_token):
            return Response({"error": "You can only update your own account."}, status=status.HTTP_403_FORBIDDEN)

        # Mise à jour de l'utilisateur
        try:
            user = Users.objects.get(id=user_id_from_body)
            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class UserDeleteView(generics.DestroyAPIView):
    """
    Suppression d'un utilisateur spécifique 

    Méthode DELETE
    Permission: Doit avoir un token JWT valide
    """
    queryset = Users.objects.all()
    permission_classes = [IsAuthenticatedWithToken]

    def delete(self, request, *args, **kwargs):

        # Vérification de l'existence du token
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Token "):
            return Response({"error": "Invalid or missing token."}, status=status.HTTP_401_UNAUTHORIZED)

        # Vérification de la validité du token
        auth = JWTAuthentication()
        validated_token = auth.get_validated_token(request.headers.get("Authorization").split()[1])

        # Recuperation de l'id de l'utilisateur depuis le token
        user_id_from_token = validated_token.get("user_id")

        # Récupération de l'id de l'utilisateur depuis l'url
        user_id_from_url = kwargs.get("pk")

        # Vérification que l'id de l'url correspond au token
        if user_id_from_url != user_id_from_token:
            return Response({"error": "You can only delete your own account."}, status=status.HTTP_403_FORBIDDEN)

        # Suppression de l'utilisateur
        try:
            user = Users.objects.get(id=user_id_from_token)
            user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class UserExistTagnameView(APIView):
    """
    Vérifie si un utilisateur existe par son tagname

    Méthode POST
    """
    def post(self, request):
        tagname = request.data.get("tagname")
        try:
            Users.objects.get(tagname=tagname)
            return Response({"exists": True}, status=status.HTTP_200_OK)
        except Users.DoesNotExist:
            return Response({"exists": False}, status=status.HTTP_404_NOT_FOUND)