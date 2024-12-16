from rest_framework import serializers
from BuildIT_API.models.BoardSkills import BoardSkills

class BoardSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardSkills
        fields = '__all__'
