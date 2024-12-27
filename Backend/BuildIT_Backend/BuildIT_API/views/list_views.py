from rest_framework import generics, status
from rest_framework.response import Response

from BuildIT_API.models.Lists import Lists
from BuildIT_API.serializers.ListSerializer import ListSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken, IsUserInProjectFromBoardId

class ListCreateView(generics.CreateAPIView):
  serializer_class = ListSerializer
  permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromBoardId]

  def post (self, request, *args, **kwargs):
    return Response({"detail": "You are authenticated!"}, status=status.HTTP_201_CREATED)