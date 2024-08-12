from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from mainapp.view.admin_views import UserCreateView, AdminUserListView, UserDeleteView, CustomTokenObtainPairView, AdminUserUpdateView
from mainapp.view.common_views import FileUploadView, ValidateTokenView, UpdateTaskView
urlpatterns = [
    path('register', UserCreateView.as_view(), name='user-register'),
    path('token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('login', ValidateTokenView.as_view(), name='token_obtain_pair'),
    path('user/update/<int:pk>', AdminUserUpdateView.as_view(), name='user-update'),

    path('update-task/', UpdateTaskView.as_view(), name='update-task'),
    path('admin/users/', AdminUserListView.as_view(), name='admin_user_list_create'),
    path('user/<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
]