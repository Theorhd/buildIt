from rest_framework import serializers
from django.db.models import Max

from BuildIT_API.models.Boards import Boards
from BuildIT_API.serializers.ListSerializer import ListSerializer

class BoardSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True, required=False)

    board_name = serializers.CharField(source='name')

    class Meta:
        model = Boards
        fields = [
            'id',
            'board_name',
            'placement',
            'project',
            'lists',
            'chatroom',
        ]
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
            'project': {'read_only': True},   # Lecture seule car passé via la vue
            'chatroom': {'read_only': True},
        }
