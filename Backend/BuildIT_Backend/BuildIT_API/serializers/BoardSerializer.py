from rest_framework import serializers
from django.db.models import Max

from BuildIT_API.models.Boards import Boards
from BuildIT_API.serializers.ListSerializer import ListSerializer

class BoardSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True, required=False)

    project_id = serializers.IntegerField(write_only=True)
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Boards
        fields = ['id', 'name', 'placement', 'chatroom', "lists", 'project' , 'project_id']
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
            'chatroom': {'read_only': True},
        }
