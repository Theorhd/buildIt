from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from BuildIT_API.models.Users import Users
from BuildIT_API.serializers.UserSerializer import UserSerializer

class UserListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
