# mainapp/serializers.py
from rest_framework import serializers
from mainapp.models import UploadedFile,TaskUpdate
from django.contrib.auth import get_user_model
User = get_user_model()
class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'uploaded_at']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'contact', 'dateFiled', 'noOftask', 'tasks', 'is_active', 'is_staff', 'is_superuser']

class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskUpdate
        fields = ['task_index', 'task_data']

    # def update(self, instance, validated_data):
    #     task_index = validated_data.get('task_index')
    #     task_data = validated_data.get('task_data')
    #     user = User.objects.all()

    #     print('--------------')
    #     print(instance)
    #     print('--------------')

        # if 0 <= task_index < len(instance.tasks):
        #     instance.tasks[task_index] = task_data
        #     instance.save()
        # else:
        #     raise serializers.ValidationError("Invalid task index")

        # return instance
