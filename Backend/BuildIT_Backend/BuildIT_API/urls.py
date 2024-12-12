from django.urls import path
from BuildIT_API.views.users_views import UserListCreateView, UserRetrieveUpdateDeleteView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),  # Lister/Créer des utilisateurs
    path('users/<int:pk>/', UserRetrieveUpdateDeleteView.as_view(), name='user-detail'),  # CRUD pour un utilisateur
]
