from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from BuildIT_API.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'tagname', 'pseudo', 'firstname', 'lastname', 'mail', 'phone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Empêche l'affichage du mot de passe dans la réponse
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password']) # Hachage du password
        user = Users.objects.create(**validated_data)
        return user
