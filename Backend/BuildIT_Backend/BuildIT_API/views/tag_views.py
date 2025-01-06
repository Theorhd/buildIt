from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from BuildIT_API.permissions import IsAuthenticatedWithToken
from BuildIT_API.models.Tags import Tags
from BuildIT_API.models.Items import Items
from BuildIT_API.models.ItemTags import ItemTags
from BuildIT_API.serializers.TagSerializer import TagSerializer
from BuildIT_API.permissions import IsUserInProjectFromTagId, IsUserInProjectFromItemId

class TagCreateView(APIView):
    """
    Création d'un tag

    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partie du projet auquel appartiennent item_id passé en paramètre
    """

    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromItemId]

    def post(self, request, *args, **kwargs):

        # item_id deja vérifié dans la permission IsUserInProjectFromItemId
        item_id = request.data.get('item_id')

        # Vérification de l'existence de l'item
        try:
            item = Items.objects.get(id=item_id)
        except Items.DoesNotExist:
            return Response({"error": "Item introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(data=request.data.get('tag'))
        serializer.is_valid(raise_exception=True)

        # Vérification si le tag existe déjà dans le projet
        project = item.list.board.project
        tag_data = serializer.validated_data
        tag, created = Tags.objects.get_or_create(
            name=tag_data['name'], 
            project=project, 
            defaults={'color': tag_data['color']}
        )

        # Associer le tag à l'item dans la table intermédiaire
        ItemTags.objects.get_or_create(item=item, tag=tag)

        # Retourner le tag sérialisé
        return Response(self.serializer_class(tag).data, status=status.HTTP_201_CREATED)        

class TagRetrieveView(APIView):
    """
    Récupérer un tag

    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet d'ou il veut voir le tag
    """
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromTagId]
    queryset = Tags.objects.all()

    def get(self, request, *args, **kwargs):

        # tag_id deja vérifié dans la permission IsUserInProjectFromTagId
        tag_id = kwargs.get('pk')

        # Vérification de l'existence du tag
        try:
            tag = Tags.objects.get(id=tag_id)
            serializer = self.serializer_class(tag)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Tags.DoesNotExist:
            return Response({"error": "Tag introuvable."}, status=status.HTTP_404_NOT_FOUND)

class TagUpdateView(APIView):
    """
    Mise à jour d'un tag

    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet d'ou il veut mettre à jour le tag
    """
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromTagId]
    queryset = Tags.objects.all()

    def put(self, request, *args, **kwargs):

        # tag_id deja vérifié dans la permission IsUserInProjectFromTagId
        tag_id = request.data.get('tag_id')
        tag = Tags.objects.get(id=tag_id)

        # Crée une instance du serializer avec le tag transmis
        serializer = self.serializer_class(tag, data=request.data, partial=True)

        # Vérifie si les données sont valides pour la mise à jour
        serializer.is_valid(raise_exception=True)

        # Sauvegarde les données mis à jour
        serializer.save()

        # Retourne les données mis à jour avec statut 200
        return Response(serializer.data, status=status.HTTP_200_OK)

class TagDeleteView(APIView):
    """
    Suppression d'un tag

    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet d'ou il veut supprimer le tag
    """
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromTagId]
    queryset = Tags.objects.all()

    def delete(self, request, *args, **kwargs):

        # tag_id deja vérifié dans la permission IsUserInProjectFromTagId
        tag_id = kwargs.get('pk')

        try:
            tag = Tags.objects.get(id=tag_id)
            tag.delete()
            return Response({"message": "Tag supprimé."}, status=status.HTTP_200_OK)
        except Tags.DoesNotExist:
            return Response({"error": "Tag introuvable."}, status=status.HTTP_404_NOT_FOUND)
