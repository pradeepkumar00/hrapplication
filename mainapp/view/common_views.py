# mainapp/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken

from mainapp.models import UploadedFile, CustomUser, TaskUpdate
from mainapp.serializers.common_serializers import UploadedFileSerializer, TaskUpdateSerializer, UserProfileSerializer
from mainapp.serializers.user_serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status

class FileUploadView(generics.CreateAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        if file_serializer.is_valid():
            self.perform_create(file_serializer)
            headers = self.get_success_headers(file_serializer.data)
            file_url = file_serializer.data.get('file')  

            user_id = request.data.get('user_id')
            if user_id is None:
                try:
                    user = JWTAuthentication().authenticate(request)[0]
                    user_id = user.id
                except AuthenticationFailed:
                    return Response({"error": "Authentication failed"}, status=401)
            
            task_index = request.data.get('task_index')
            if user_id is not None and task_index is not None:
                try:
                    user = CustomUser.objects.get(id=user_id)
                    if len(user.tasks) > int(task_index):
                        user.tasks[int(task_index)]['file_url'] = file_url
                        if user.tasks[int(task_index)]['ispending']:
                            user.tasks[int(task_index)]['ispending'] = False
                            user.completedTask= user.completedTask +1 
                        user.save()
                    else:
                        return Response({"error": "Task index out of range"}, status=400)
                except CustomUser.DoesNotExist:
                    return Response({"error": "User not found"}, status=404)
            user_serializer = UserSerializer(user)
            return Response({
                'user_profile': user_serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)
        return Response(file_serializer.errors, status=400)

class ValidateTokenView(APIView):
    def post(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({'error': 'Authorization header must contain Bearer token'}, status=400)

        token = auth_header.split(' ')[1]

        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = CustomUser.objects.get(id=user_id)
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)
        except (TokenError, InvalidToken, CustomUser.DoesNotExist) as e:
            return Response({'error': str(e)}, status=401)

class UpdateTaskView(generics.CreateAPIView):
    queryset = TaskUpdate.objects.all()
    serializer_class = TaskUpdateSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        task_serializer = self.get_serializer(data=request.data)

        if task_serializer.is_valid():
            self.perform_create(task_serializer)
            headers = self.get_success_headers(task_serializer.data)
            
            user_id = ''
            try:
                user = JWTAuthentication().authenticate(request)[0]
                user_id = user.id
            except AuthenticationFailed:
                return Response({"error": "Authentication failed"}, status=401)
            task_data = request.data.get('task_data')  
            task_index = request.data.get('task_index')
            users={}
            if user_id is not None and task_index is not None:
                try:
                    users = CustomUser.objects.get(id=user_id)
                    if len(users.tasks) > int(task_index):
                        users.tasks[int(task_index)]['feedback'] = task_data
                        if users.tasks[int(task_index)]['ispending']:
                            users.tasks[int(task_index)]['ispending'] = False
                            users.completedTask = user.completedTask +1 
                        users.save()

                    else:
                        return Response({"error": "Task index out of range"}, status=400)
                except CustomUser.DoesNotExist:
                    return Response({"error": "User not found"}, status=404)
            user_serializer = UserSerializer(user)
            return Response({
                'user_profile': user_serializer.data
            }, status=status.HTTP_201_CREATED, headers=headers)
        return Response(task_serializer.errors, status=400)