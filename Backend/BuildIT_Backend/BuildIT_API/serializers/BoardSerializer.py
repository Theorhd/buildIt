from rest_framework import serializers
from django.db.models import Max

from BuildIT_API.models.Boards import Boards
from BuildIT_API.serializers.ListSerializer import ListSerializer

class BoardSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True, required=False)

    board_name = serializers.CharField(source='name')

    # Ajout de project_id et project
    project_id = serializers.IntegerField(write_only=True)
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Boards
        fields = [
            'id',
            'board_name',
            'placement',
            'project',
            'project_id',
            'lists',
            'chatroom',
        ]
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
            'project': {'read_only': True},   # Lecture seule car passé via la vue
            'chatroom': {'read_only': True},
        }

    # Tri des boards par placement
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['lists'] = sorted(representation['lists'], key=lambda x: x['placement'])
        return representation