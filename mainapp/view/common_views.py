# mainapp/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from mainapp.models import UploadedFile, CustomUser
from mainapp.serializers.common_serializers import UploadedFileSerializer

class FileUploadView(generics.CreateAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        if file_serializer.is_valid():
            self.perform_create(file_serializer)
            headers = self.get_success_headers(file_serializer.data)
            file_url = file_serializer.data.get('file')  # Extract the file URL from the serializer response

            # Retrieve user_id from request or token
            user_id = request.data.get('user_id')
            if user_id is None:
                try:
                    # Use JWT authentication to get the user_id from the token
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
                        user.save()
                    else:
                        return Response({"error": "Task index out of range"}, status=400)
                except CustomUser.DoesNotExist:
                    return Response({"error": "User not found"}, status=404)

            return Response({'file_url': file_url}, status=201, headers=headers)
        return Response(file_serializer.errors, status=400)
