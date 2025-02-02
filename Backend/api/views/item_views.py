from rest_framework import generics, status
from rest_framework.response import Response

from api.models.Items import Items
from api.models.Lists import Lists
from api.serializers.ItemSerializer import ItemSerializer
from api.permissions import IsAuthenticatedWithToken, IsUserInProjectFromItemId, IsUserInProjectFromListId

class ItemCreateView(generics.CreateAPIView):
    """
    Création d'un item.
    
    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet ou il veut créer l'item.    
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromListId]

    def post(self, request, *args, **kwargs):

        # list_id deja vérifié dans la permission IsUserInProjectFromListId
        list_id = request.data.get('list_id')

        # Vérification de l'existence de la list
        try:
            list = Lists.objects.get(id=list_id)
        except Lists.DoesNotExist:
            return Response({"error": "List introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
        print(list)
        
        # Sérialise les données avec la list inclus
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Sauvegarde avec la list transmise
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class ItemRetrieveView(generics.RetrieveAPIView):
    """
    Récupération d'un item.
    
    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet ou il veut voir l'item.
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromItemId]
    queryset = Items.objects.all()

    def get(self, request, *args, **kwargs):

        # item_id deja vérifié dans la permission IsUserInProjectFromItemId
        item_id = kwargs.get('pk')

        try:
            item = Items.objects.get(id=item_id)
            serializer = self.get_serializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Items.DoesNotExist:
            return Response({"error": "Item introuvable."}, status=status.HTTP_404_NOT_FOUND)
    
class ItemUpdateView(generics.UpdateAPIView):
    """
    Mise à jour d'un item.
    
    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet ou il veut mettre à jour l'item.
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromItemId]
    queryset = Items.objects.all()

    def put(self, request, *args, **kwargs):

        # item_id deja vérifié dans la permission IsUserInProjectFromItemId
        item_id = request.data.get('item_id')
        item = Items.objects.get(id=item_id)

        # Crée une instance du serializer avec l'item transmise
        serializer = self.get_serializer(item, data=request.data, partial=True)

        # Vérifie si les données sont valides pour la mise à jour
        serializer.is_valid(raise_exception=True)

        # Sauvegarde les données mis à jour
        serializer.save()

        # Retourne les données mis à jour avec statut 200
        return Response(serializer.data, status=status.HTTP_200_OK)

class ItemDeleteView(generics.DestroyAPIView):
    """
    Suppression d'un item.
    
    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partit du projet ou il veut supprimer l'item.
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromItemId]
    queryset = Items.objects.all()

    def delete(self, request, *args, **kwargs):

        # item_id deja vérifié dans la permission IsUserInProjectFromItemId
        item_id = kwargs.get('pk')

        try:
            item = Items.objects.get(id=item_id)
            item.delete()
            return Response({"message": "Item supprimé."}, status=status.HTTP_200_OK)
        except Items.DoesNotExist:
            return Response({"error": "Item introuvable."}, status=status.HTTP_404_NOT_FOUND)