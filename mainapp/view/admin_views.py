from rest_framework import generics, status
from mainapp.serializers.admin_serializers import UserSerializer, AdminUserSerializer, CustomTokenObtainPairSerializer
from mainapp.models import CustomUser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AdminUserListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    
class UserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAdminUser]

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        if user.is_superuser:
            return Response({"detail": "Admin users cannot be deleted."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(self.destroy(request, *args, **kwargs))


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
