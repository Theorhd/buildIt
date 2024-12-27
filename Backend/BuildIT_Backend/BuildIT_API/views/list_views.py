from rest_framework import generics

from BuildIT_API.models.Lists import Lists
from BuildIT_API.serializers.ListSerializer import ListSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken

class ListCreateView(generics.CreateAPIView):
  serializer_class = ListSerializer
  permission_classes = [IsAuthenticatedWithToken]

  def post (self, request, *args, **kwargs):
    data = request.data