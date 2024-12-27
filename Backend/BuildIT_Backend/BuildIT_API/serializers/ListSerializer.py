from rest_framework import serializers

from BuildIT_API.models.Lists import Lists
from BuildIT_API.serializers.ItemSerializer import ItemSerializer

class ListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, required=False)

    class Meta:
        model = Lists
        fields = ['id', 'name', 'placement', 'items']
        extra_kwargs = {
            'placement': {'read_only': True},  # Lecture seule car calculé automatiquement
        }
