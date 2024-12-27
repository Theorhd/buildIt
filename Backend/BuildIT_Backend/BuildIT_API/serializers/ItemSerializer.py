from rest_framework import serializers
from BuildIT_API.models.Items import Items
from BuildIT_API.models.Lists import Lists


class ItemSerializer(serializers.ModelSerializer):
    # Champs optionnels ou spécifiques
    description = serializers.CharField(required=False, allow_blank=True)
    priority = serializers.IntegerField(required=False)
    risk = serializers.CharField(required=False, allow_blank=True)
    effort = serializers.CharField(required=False, allow_blank=True)
    placement = serializers.IntegerField(required=False)
    date_start = serializers.DateField(required=False, allow_null=True)
    date_end = serializers.DateField(required=False, allow_null=True)

    # Gestion de la liste
    list_id = serializers.IntegerField(write_only=True)  # Pour l'entrée
    list = serializers.PrimaryKeyRelatedField(read_only=True)  # Pour la sortie

    class Meta:
        model = Items
        fields = [
            'id',
            'name',
            'description',
            'priority',
            'status',
            'risk',
            'effort',
            'placement',
            'date_start',
            'date_end',
            'created_by',
            'creation_date',
            'list',
            'list_id'  # Ajouté pour la création
        ]
        read_only_fields = ['id', 'created_by', 'creation_date']

    # Validation personnalisée pour status
    def validate_status(self, value):
        if value not in ['to_do', 'in_progress', 'done']:
            raise serializers.ValidationError("Le status doit être 'to_do', 'in_progress' ou 'done'.")
        return value

    # Méthode pour créer l'item
    def create(self, validated_data):
        # Récupérer la liste associée
        list_id = validated_data.pop('list_id')
        list_instance = Lists.objects.get(id=list_id)

        # Créer l'item avec la liste et les autres champs
        item = Items.objects.create(list=list_instance, **validated_data)
        return item
