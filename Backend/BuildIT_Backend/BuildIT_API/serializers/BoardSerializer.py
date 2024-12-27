from rest_framework import serializers
from django.db.models import Max

from BuildIT_API.models.Boards import Boards
from BuildIT_API.serializers.ListSerializer import ListSerializer

class BoardSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True, required=False)

    class Meta:
        model = Boards
        fields = ['id', 'name', 'placement', 'project', 'chatroom', "lists"]
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
            'project': {'read_only': True},   # Lecture seule car passé via la vue
            'chatroom': {'read_only': True},
        }
