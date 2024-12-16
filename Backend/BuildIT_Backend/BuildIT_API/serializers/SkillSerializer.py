from rest_framework import serializers

from BuildIT_API.models.Skills import Skills

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id', 'name']
