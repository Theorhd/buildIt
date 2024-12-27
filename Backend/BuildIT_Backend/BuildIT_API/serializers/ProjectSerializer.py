from rest_framework import serializers

from BuildIT_API.models.Projects import Projects
from BuildIT_API.serializers.BoardSerializer import BoardSerializer

class ProjectSerializer(serializers.ModelSerializer):
    boards = BoardSerializer(many=True)

    class Meta:
        model = Projects
        fields = ['id','tagname', 'name', 'description', 'created_by', 'creation_date', 'boards']
