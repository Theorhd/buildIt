from django.urls import path
from BuildIT_API.views.users_views import  UserLoginView, ProtectedView, UserCreateView, UserDeleteView, UserRetrieveView, UserUpdateView
from BuildIT_API.views.projects_views import ProjectCreateView, ProjectRetriveView, ProjectDeleteView, ProjectUpdateView
from BuildIT_API.views.modale_ia_views import CreateThread, UpdateRunThread, GetAssistantResponse, DeleteThread

userpatterns = [
    path('user/create/', UserCreateView.as_view(), name='register'),                                # Créer un utilisateur
    path('user/get/<int:pk>/', UserRetrieveView.as_view(), name='user-detail'),                     # Rechercher un utilisateur par son id
    path('user/update/', UserUpdateView.as_view(), name='user-update'),                             # Modifier un utilisateur
    path('user/delete/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),                    # Supprimer un utilisateur par son id
    path('user/login/', UserLoginView.as_view(), name='user-login'),                                # Connexion d'un utilisateur
]

projectpatterns = [
    path('project/create/', ProjectCreateView.as_view(), name='project-create'),                    # Créer un projet (accepte board, lists, items)
    path('project/get/<int:pk>/', ProjectRetriveView.as_view(), name='project-detail'),             # Rechercher un projet par son id + token de ID créaeur
    path('project/update/', ProjectUpdateView.as_view(), name='project-update'),                    # Modifier un projet + token de ID créateur
    path('project/delete/<int:pk>/', ProjectDeleteView.as_view(), name='project-delete'),           # Supprimer un projet par son id + token de ID créatieur
]

assistantpatterns = [
    path('assistant/create-thread', CreateThread.as_view(), name='create-thread'),                            # Créer un thread
    path('assistant/update-run-thread', UpdateRunThread.as_view(), name='update-run-thread'),                 # Mettre à jour un thread
    path('assistant/get-assistant-response', GetAssistantResponse.as_view(), name='get-assistant-response'),  # Récupérer la réponse de l'assistant
    path('assistant/delete-thread', DeleteThread.as_view(), name='delete-thread'),                            # Supprimer un thread
]

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected-view')                              # Route de test pour vérifier le fonctionnement des tokens
] + userpatterns + projectpatterns + assistantpatterns
