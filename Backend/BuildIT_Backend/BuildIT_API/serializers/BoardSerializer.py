from rest_framework import serializers

from BuildIT_API.models.Boards import Boards
from BuildIT_API.serializers.ListSerializer import ListSerializer
from BuildIT_API.serializers.SkillSerializer import SkillSerializer

class BoardSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True)
    skills = SkillSerializer(many=True)

    class Meta:
        model = Boards
        fields = ['id', 'name', 'skills', 'lists']
