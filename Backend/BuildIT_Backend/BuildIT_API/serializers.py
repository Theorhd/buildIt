from rest_framework import serializers
from .models.Users import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'tagname', 'pseudo', 'firstname', 'lastname', 'mail', 'phone', 'password']
        read_only_fields = ['id']
        extra_kwargs = {
            'tagname': {'required': True},
            'pseudo': {'required': True},
            'firstname': {'required': True},
            'lastname': {'required': True},
            'mail': {'required': True},
            'phone': {'required': True},
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):
        user = Users.objects.create(**validated_data)
        return user
    
class TokenObtainPairSerializer(serializers.Serializer):
    pseudo = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    
    def validate(self, attrs):
        data = {
            'pseudo': attrs.get('pseudo'),
            'password': attrs.get('password'),
        }
        return data