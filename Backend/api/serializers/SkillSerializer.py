from rest_framework import serializers

from api.models.Skills import Skills

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id', 'name']
