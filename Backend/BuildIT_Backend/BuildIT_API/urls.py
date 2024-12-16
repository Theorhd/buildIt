from django.urls import path
from BuildIT_API.views.users_views import  UserLoginView, ProtectedView, UserCreateView, UserDeleteView, UserRetrieveView, UserUpdateView
from BuildIT_API.views.projects_views import CreateProjectView

userpatterns = [
    path('user/create/', UserCreateView.as_view(), name='register'),                # Créer un utilisateur
    path('user/get/<int:pk>/', UserRetrieveView.as_view(), name='user-detail'),     # Rechercher un utilisateur par son id
    path('user/update/', UserUpdateView.as_view(), name='user-update'),             # Modifier un utilisateur
    path('user/delete/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),    # Supprimer un utilisateur par son id
    path('user/login/', UserLoginView.as_view(), name='user-login'),                # Connexion d'un utilisateur
]

projectpatterns = [
    path('project/create/', CreateProjectView.as_view(), name='project-create'),    # Créer un projet
]

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected-view')              # Route de test pour vérifier le fonctionnement des tokens
] + userpatterns + projectpatterns
