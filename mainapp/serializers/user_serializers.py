from rest_framework import serializers
from mainapp.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'contact', 'dateFiled', 'noOftask','completedTask', 'tasks', 'is_active', 'is_staff']
