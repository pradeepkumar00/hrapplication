from rest_framework import serializers, generics
from django.contrib.auth.models import User
from mainapp.models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import datetime
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'name', 'contact', 'dateFiled', 'noOftask','completedTask', 'tasks', 'is_active', 'is_staff']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data.get('password', 'applicationpassword'),
            name=validated_data.get('name', ''),
            contact=validated_data.get('contact', ''),
            dateFiled=validated_data.get('dateFiled', None),
            noOftask=validated_data.get('noOftask', 0),
            completedTask=validated_data.get('completedTask', 0),
            tasks=validated_data.get('tasks', []),
            is_active=validated_data.get('is_active', True),
            is_staff=validated_data.get('is_staff', False)
        )
        return user
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'contact', 'dateFiled', 'noOftask','completedTask', 'tasks', 'is_active', 'is_staff']

class AdminUserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'contact', 'dateFiled', 'noOftask','completedTask', 'tasks', 'is_active', 'is_staff', 'token']
    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        refresh.access_token.set_exp(lifetime=datetime.timedelta(days=30))
        return str(refresh.access_token)

    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.first_name = validated_data.get('first_name', instance.first_name)
    #     instance.last_name = validated_data.get('last_name', instance.last_name)
    #     instance.is_active = validated_data.get('is_active', instance.is_active)
    #     instance.is_staff = validated_data.get('is_staff', instance.is_staff)
    #     instance.save()
    #     return instance

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['name'] = user.name
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add custom response data
        data.update({
            'user': {
                'id': self.user.id,
                'email': self.user.email,
                'name': self.user.name,
                'is_superuser': self.user.is_superuser,
                'is_staff': self.user.is_staff,
            }
        })

        return data
