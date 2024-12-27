from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from BuildIT_API.views.users_views import  UserLoginView, UserCreateView, UserDeleteView, UserRetrieveView, UserUpdateView
from BuildIT_API.views.projects_views import ProjectCreateView, ProjectRetriveView, ProjectDeleteView, ProjectUpdateView
from BuildIT_API.views.board_views import BoardCreateView, BoardRetrieveView, BoardUpdateView, BoardDeleteView
from BuildIT_API.views.modale_ia_views import CreateThread, UpdateRunThread, GetAssistantResponse, DeleteThread
from BuildIT_API.views.list_views import ListCreateView

userpatterns = [
    path('user/create', UserCreateView.as_view(), name='register'),                                # Créer un utilisateur
    path('user/get/<int:pk>', UserRetrieveView.as_view(), name='user-detail'),                     # Rechercher un utilisateur par son id
    path('user/update', UserUpdateView.as_view(), name='user-update'),                             # Modifier un utilisateur
    path('user/delete/<int:pk>', UserDeleteView.as_view(), name='user-delete'),                    # Supprimer un utilisateur par son id
    path('user/login', UserLoginView.as_view(), name='user-login'),                                # Connexion d'un utilisateur
]

tokenpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='token-refresh'),                       # Rafraîchir un token
]

projectpatterns = [
    path('project/create', ProjectCreateView.as_view(), name='project-create'),                    # Créer un projet (accepte board, lists, items)
    path('project/get/<int:pk>', ProjectRetriveView.as_view(), name='project-detail'),             # Rechercher un projet par son id + token de ID créaeur
    path('project/update', ProjectUpdateView.as_view(), name='project-update'),                    # Modifier un projet + token de ID créateur
    path('project/delete/<int:pk>', ProjectDeleteView.as_view(), name='project-delete'),           # Supprimer un projet par son id + token de ID créatieur
]

boardpatterns = [
    path('board/create', BoardCreateView.as_view(), name='board-create'),
    path('board/get/<int:pk>', BoardRetrieveView.as_view(), name='board-detail'),
    path('board/update', BoardUpdateView.as_view(), name='board-update'),
    path('board/delete/<int:pk>', BoardDeleteView.as_view(), name='board-delete'),
]

listpatterns = [
    path('list/create', ListCreateView.as_view(), name='list-create'),
]

assistantpatterns = [
    path('assistant/create-thread', CreateThread.as_view(), name='create-thread'),                            # Créer un thread
    path('assistant/update-run-thread', UpdateRunThread.as_view(), name='update-run-thread'),                 # Mettre à jour un thread
    path('assistant/get-assistant-response', GetAssistantResponse.as_view(), name='get-assistant-response'),  # Récupérer la réponse de l'assistant
    path('assistant/delete-thread', DeleteThread.as_view(), name='delete-thread'),                            # Supprimer un thread
]

urlpatterns =  userpatterns + tokenpatterns + projectpatterns + boardpatterns + listpatterns + assistantpatterns
