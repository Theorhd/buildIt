from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api.views.users_views import  UserLoginView, UserCreateView, UserDeleteView, UserRetrieveView, UserUpdateView, UserExistTagnameView, UserFromTokenView
from api.views.projects_views import ProjectCreateView, ProjectFromTagnameView, ProjectRetriveView, ProjectDeleteView, ProjectUpdateView, ProjectFromUserView, ProjectAddUserView, ProjectAcceptInvitationView, ProjectRejectInvitationView, ProjectGetUsersView
from api.views.board_views import BoardCreateView, BoardRetrieveView, BoardUpdateView, BoardDeleteView
from api.views.modale_ia_views import CreateThread, UpdateRunThread, GetAssistantResponse, DeleteThread
from api.views.list_views import ListCreateView, ListRetrieveView, ListUpdateView, ListDeleteView
from api.views.item_views import ItemCreateView, ItemRetrieveView, ItemUpdateView, ItemDeleteView
from api.views.tag_views import TagCreateView, TagRetrieveView, TagUpdateView, TagDeleteView

userpatterns = [
    path('user/create', UserCreateView.as_view(), name='register'),                 # Créer un utilisateur
    path('user/get/<int:pk>', UserRetrieveView.as_view(), name='user-detail'),      # Rechercher un utilisateur par son id
    path('user/get_from_token', UserFromTokenView.as_view(), name='user-data'),   # Recupérer les données d'un utilisateur
    path('user/update', UserUpdateView.as_view(), name='user-update'),              # Modifier un utilisateur
    path('user/delete', UserDeleteView.as_view(), name='user-delete'),     # Supprimer un utilisateur par son id
    path('user/login', UserLoginView.as_view(), name='user-login'),                 # Connexion d'un utilisateur
    path('user/retrive/tagname', UserExistTagnameView.as_view(), name='user-exist-tagname'),  # Vérifier si un tagname existe
]

tokenpatterns = [
    path('token/refresh', TokenRefreshView.as_view(), name='token-refresh'),                # Rafraîchir un token
]

projectpatterns = [
    path('project/create', ProjectCreateView.as_view(), name='project-create'),                                        # Créer un projet (accepte board, lists, items)
    path('project/get_single/<int:project_id>', ProjectRetriveView.as_view(), name='project-detail'),                  # Rechercher un projet par son id + token de ID créaeur
    path('project/get_from_token', ProjectFromUserView.as_view(), name='project-detail'),                              # Rechercher tous les projets d'un utilisateur
    path('project/get_from_tagname/<str:tagname>', ProjectFromTagnameView.as_view(), name='project-detail'),           # Rechercher tous les projets d'un utilisateur à partir du tagname user
    path('project/update', ProjectUpdateView.as_view(), name='project-update'),                                        # Modifier un projet + token de ID créateur
    path('project/delete/<str:tagname>', ProjectDeleteView.as_view(), name='project-delete'),                          # Supprimer un projet par son id + token de ID créatieur
    path('project/get_users/<int:project_id>', ProjectGetUsersView.as_view(), name='project-users'),                      # 
    path('project/add_user', ProjectAddUserView.as_view(), name='project-add-user'),                                   # Ajouter un utilisateur à un projet
    path('project/accept_invitation', ProjectAcceptInvitationView.as_view(), name='project-accept-invitation'),        # Accepter une invitation à un projet
    path('project/reject_invitation', ProjectRejectInvitationView.as_view(), name='project-reject-invitation'),        # Refuser une invitation à un projet
]

boardpatterns = [
    path('board/create', BoardCreateView.as_view(), name='board-create'),           # Créer un board
    path('board/get/<int:pk>', BoardRetrieveView.as_view(), name='board-detail'),   # Rechercher un board par son id
    path('board/update', BoardUpdateView.as_view(), name='board-update'),           # Modifier un board
    path('board/delete/<int:pk>', BoardDeleteView.as_view(), name='board-delete'),  # Supprimer un board
]

listpatterns = [
    path('list/create', ListCreateView.as_view(), name='list-create'),              # Créer une list
    path('list/get/<int:pk>', ListRetrieveView.as_view(), name='list-detail'),      # Rechercher une list par son id
    path('list/update', ListUpdateView.as_view(), name='list-update'),              # Modifier une list
    path('list/delete/<int:pk>', ListDeleteView.as_view(), name='list-delete'),     # Supprimer une list
]

itempatterns = [
    path('item/create', ItemCreateView.as_view(), name='item-create'),              # Créer un item
    path('item/get/<int:pk>', ItemRetrieveView.as_view(), name='item-detail'),      # Rechercher un item par son id
    path('item/update', ItemUpdateView.as_view(), name='item-update'),              # Modifier un item
    path('item/delete/<int:pk>', ItemDeleteView.as_view(), name='item-delete'),     # Supprimer un item
]

tagpatterns = [
    path('tag/create', TagCreateView.as_view(), name='tag-create'),              # Créer un tag
    path('tag/get/<int:pk>', TagRetrieveView.as_view(), name='tag-detail'),      # Rechercher un tag par son id
    path('tag/update', TagUpdateView.as_view(), name='tag-update'),              # Modifier un tag
    path('tag/delete/<int:pk>', TagDeleteView.as_view(), name='tag-delete'),     # Supprimer un tag
]

assistantpatterns = [
    path('assistant/create-thread', CreateThread.as_view(), name='create-thread'),                            # Créer un thread
    path('assistant/update-run-thread', UpdateRunThread.as_view(), name='update-run-thread'),                 # Mettre à jour un thread
    path('assistant/get-assistant-response', GetAssistantResponse.as_view(), name='get-assistant-response'),  # Récupérer la réponse de l'assistant
    path('assistant/delete-thread', DeleteThread.as_view(), name='delete-thread'),                            # Supprimer un thread
]

urlpatterns = userpatterns + tokenpatterns + projectpatterns + boardpatterns + listpatterns + assistantpatterns + itempatterns + tagpatterns
