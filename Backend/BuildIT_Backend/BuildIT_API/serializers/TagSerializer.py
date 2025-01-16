from rest_framework import serializers

from BuildIT_API.models.Tags import Tags

class TagSerializer(serializers.ModelSerializer):

    tag_name = serializers.CharField(source='name')


    class Meta:
        model = Tags
        fields = [
            'id',
            'tag_name',
            'color',
        ]