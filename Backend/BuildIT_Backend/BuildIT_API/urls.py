from django.urls import path
from BuildIT_API.views.users_views import  UserLoginView, ProtectedView, UserCreateView, UserDeleteView, UserRetrieveView, UserUpdateView
from BuildIT_API.views.modale_ia_views import CreateThread, UpdateRunThread, GetAssistantResponse, DeleteThread

userpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),               # Créer un utilisateur
    path('get/user/<int:pk>/', UserRetrieveView.as_view(), name='user-detail'), # Rechercher un utilisateur par son id
    path('update/', UserUpdateView.as_view(), name='user-update'),              # Modifier un utilisateur
    path('delete/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),     # Supprimer un utilisateur par son id
    path('login/', UserLoginView.as_view(), name='user-login'),                 # Connexion d'un utilisateur

    path('create-thread', CreateThread.as_view(), name='create-thread'),        # Créer un thread
    path('update-run-thread', UpdateRunThread.as_view(), name='update-run-thread'), # Mettre à jour un thread
    path('get-assistant-response', GetAssistantResponse.as_view(), name='get-assistant-response'), # Récupérer la réponse de l'assistant
    path('delete-thread', DeleteThread.as_view(), name='delete-thread'),        # Supprimer un thread
]

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected-view')          # Route de test pour vérifier le fonctionnement des tokens
] + userpatterns
