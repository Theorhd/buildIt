from rest_framework import serializers

from BuildIT_API.models.Lists import Lists
from BuildIT_API.serializers.ItemSerializer import ItemSerializer

class ListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, required=False)

    board_id = serializers.IntegerField(write_only=True)
    board = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lists
        fields = ['id', 'name', 'placement', 'items', 'board', 'board_id']
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
        }
