from rest_framework import serializers

from api.models.Projects import Projects
from api.serializers.BoardSerializer import BoardSerializer

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
            'created_by_id',
            'creation_date',
            'boards',
            'markdown'
        ]

    # Tri des boards par placement
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['boards'] = sorted(representation['boards'], key=lambda x: x['placement'])
        return representation