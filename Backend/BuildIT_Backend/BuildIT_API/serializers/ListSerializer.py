from rest_framework import serializers

from BuildIT_API.models.Lists import Lists
from BuildIT_API.serializers.ItemSerializer import ItemSerializer

class ListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, required=False)

    list_name = serializers.CharField(source='name')

    # Ajout de board_id et board
    board_id = serializers.IntegerField(write_only=True)
    board = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lists
        fields = [
            'id',
            'list_name',
            'placement',
            'board_id',
            'board',
            'items',
        ]
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
        }

    # Tri des boards par placement
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['items'] = sorted(representation['items'], key=lambda x: x['placement'])
        return representation