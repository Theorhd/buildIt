from rest_framework import serializers

from BuildIT_API.models.Items import Items

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ['id', 'name', 'description']
