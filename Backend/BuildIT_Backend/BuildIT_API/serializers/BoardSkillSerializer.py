from rest_framework import serializers
from BuildIT_API.models.BoardSkills import BoardSkills
from BuildIT_API.serializers.SkillSerializer import SkillSerializer
from BuildIT_API.serializers.BoardSerializer import BoardSerializer
from BuildIT_API.models.Skills import Skills

class BoardSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)
    board = BoardSerializer(read_only=True)

    class Meta:
        model = BoardSkills
        fields = ['id', 'board', 'skill', 'skill_id']

