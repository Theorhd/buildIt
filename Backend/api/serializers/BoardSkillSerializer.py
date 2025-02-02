from rest_framework import serializers
from api.models.BoardSkills import BoardSkills
from api.serializers.SkillSerializer import SkillSerializer
from api.serializers.BoardSerializer import BoardSerializer
from api.models.Skills import Skills

class BoardSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)
    board = BoardSerializer(read_only=True)

    class Meta:
        model = BoardSkills
        fields = ['id', 'board', 'skill', 'skill_id']

