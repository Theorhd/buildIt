from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from api.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'tagname', 'pseudo', 'firstname', 'lastname', 'mail', 'phone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Empêche l'affichage du mot de passe dans la réponse
        }

    def create(self, validated_data):
        # Hachage du mot de passe avant la création
        validated_data['password'] = make_password(validated_data['password'])
        user = Users.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        # Vérification et hachage si le mot de passe est présent dans les données à mettre à jour
        password = validated_data.get('password', None)
        if password:
            validated_data['password'] = make_password(password)

        # Appeler la méthode de mise à jour parente
        return super(UserSerializer, self).update(instance, validated_data)
