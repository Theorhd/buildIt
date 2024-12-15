from django.urls import path
from BuildIT_API.views.users_views import  UserLoginView, ProtectedView, UserCreateView, UserDeleteView, UserRetrieveView, UserUpdateView

userpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),               # Créer un utilisateur
    path('get/user/<int:pk>/', UserRetrieveView.as_view(), name='user-detail'), # Rechercher un utilisateur par son id
    path('update/', UserUpdateView.as_view(), name='user-update'),              # Modifier un utilisateur
    path('delete/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),     # Supprimer un utilisateur par son id
    path('login/', UserLoginView.as_view(), name='user-login'),                 # Connexion d'un utilisateur
]

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected-view')          # Route de test pour vérifier le fonctionnement des tokens
] + userpatterns
