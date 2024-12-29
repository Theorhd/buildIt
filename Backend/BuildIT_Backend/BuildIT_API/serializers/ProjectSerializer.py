from rest_framework import serializers

from BuildIT_API.models.Projects import Projects
from BuildIT_API.serializers.BoardSerializer import BoardSerializer

class ProjectSerializer(serializers.ModelSerializer):
    # Sérialiseur imbriqué pour les boards
    boards = BoardSerializer(many=True)

    # Personnalisation du champ 'name' en 'project_name'
    project_name = serializers.CharField(source='name')

    class Meta:
        model = Projects
        fields = [
            'id',
            'project_name',     # Utilisation de 'project_name' au lieu de 'name'
            'tagname',          # Ajout du tagname
            'description',
            'created_by',
            'creation_date',
            'boards'
        ]
