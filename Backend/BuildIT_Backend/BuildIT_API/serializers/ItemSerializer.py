from rest_framework import serializers
from BuildIT_API.models.Items import Items
from BuildIT_API.models.Tags import Tags
from BuildIT_API.models.Lists import Lists
from BuildIT_API.serializers.TagSerializer import TagSerializer

class ItemSerializer(serializers.ModelSerializer):
    # Champs existants
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

    # Champ personnalisé
    item_name = serializers.CharField(source='name')

    # Status (remplace la valeur brute par le label lisible pour l'affichage)
    status = serializers.SerializerMethodField()

    # **Ajout des tags**
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Items
        fields = [
            'id',
            'item_name',
            'description',
            'priority',
            'status',  # Champ status lisible
            'risk',
            'effort',
            'placement',
            'date_start',
            'date_end',
            'created_by',
            'creation_date',
            'list',
            'list_id',
            'tags'
        ]
        read_only_fields = ['id', 'created_by', 'creation_date']

    # Fonction pour récupérer les tags associés
    def get_tags(self, obj):
        tags = Tags.objects.filter(itemtags__item=obj)
        return TagSerializer(tags, many=True).data

    # Fonction pour retourner le label lisible pour le status
    def get_status(self, obj):
        # Map des valeurs brutes aux labels lisibles
        status_map = dict(Items.STATUS_CHOICES)
        return status_map.get(obj.status, obj.status)

    # Méthode pour valider l'entrée des données
    def to_internal_value(self, data):
        validated_data = super().to_internal_value(data)

        # Convertir le label lisible en valeur brute
        if 'status' in data:
            label_to_value = {label: value for value, label in Items.STATUS_CHOICES}
            status_label = data.get('status')
            if status_label not in label_to_value:
                raise serializers.ValidationError({
                    'status': f"Invalid status '{status_label}'. Must be one of: {', '.join(label_to_value.keys())}."
                })
            validated_data['status'] = label_to_value[status_label]

        return validated_data

    # Méthode pour créer l'item
    def create(self, validated_data):
        list_id = validated_data.pop('list_id')
        list_instance = Lists.objects.get(id=list_id)
        return Items.objects.create(list=list_instance, **validated_data)
