from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Redirige vers l'utilisation de `tagname` au lieu de `username`
    username_field = 'tagname'

    def validate(self, attrs):
        attrs['username'] = attrs.get('tagname')
        return super().validate(attrs)