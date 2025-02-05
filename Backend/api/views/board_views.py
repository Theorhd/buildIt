from rest_framework import generics, status
from rest_framework.response import Response

from api.models.Boards import Boards
from api.serializers.BoardSerializer import BoardSerializer
from api.permissions import IsAuthenticatedWithToken, IsUserInProjectFromBoardId, IsUserInProjectFromProjectId
from api.models.Projects import Projects

class BoardCreateView(generics.CreateAPIView):
    """
    Crée un nouveau board dans un projet donné.

    Permission:
    - Doit avoir un token JWT valide
    - L'utilisateur doit faire partie du projet
    """
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromProjectId]

    def post(self, request, *args, **kwargs):

        # Project_id deja vérifié dans la permission IsUserInProjectFromProjectId
        project_id = request.data.get('project_id')

        # Vérification de l'existence du projet
        try:
            project = Projects.objects.get(id=project_id)

        except Projects.DoesNotExist:
            return Response({"error": "Projet introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
        # Sérialise les données avec le projet inclus
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Sauvegarde avec le projet transmis
        serializer.save(project=project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BoardRetrieveView(generics.RetrieveAPIView):
    """
    Récupère un board existant.

    Permissions :
    - JWT Token valide
    - L'utilisateur doit appartenir au projet contenant le board.
    """
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromBoardId]
    queryset = Boards.objects.all()

    def get(self, request, *args, **kwargs):
        # Board_id deja vérifié dans la permission IsUserInProjectFromBoardId
        board_id = kwargs.get('pk')

        try:
            board = Boards.objects.get(id=board_id)
            serializer = self.get_serializer(board)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Boards.DoesNotExist:
            return Response({"error": "Board not found."}, status=status.HTTP_404_NOT_FOUND)


class BoardUpdateView(generics.UpdateAPIView):
    """
    Met à jour un board existant.

    Permissions :
    - JWT Token valide
    - L'utilisateur doit appartenir au projet contenant le board.
    """
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromBoardId]
    queryset = Boards.objects.all()

    def put(self, request, *args, **kwargs):
        board_id = request.data.get('board_id')
        board = Boards.objects.get(id=board_id)

        # Crée une instance du serializer avec le board transmis
        serializer = self.get_serializer(board, data=request.data, partial=True)

        # Vérifie si les données sont valides pour la mise à jour
        serializer.is_valid(raise_exception=True)

        # Sauvegarde les données mis à jour
        serializer.save()

        # Retourne les données mis à jour avec statut 200
        return Response(serializer.data, status=status.HTTP_200_OK)


class BoardDeleteView(generics.DestroyAPIView):
    """
    Supprime un board existant.

    Permissions :
    - JWT Token valide
    - L'utilisateur doit appartenir au projet contenant le board.
    """
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromBoardId]
    queryset = Boards.objects.all()

    def delete(self, request, *args, **kwargs):
        # Board_id deja vérifié dans la permission IsUserInProjectFromBoardId
        board_id = kwargs.get('pk')
        
        # Suppression du board
        try:
            board = Boards.objects.get(id=board_id)
            board.delete()
            return Response({"message": "Board deleted successfully."},status=status.HTTP_200_OK)
        except Boards.DoesNotExist:
            return Response({"error": "Board not found."}, status=status.HTTP_404_NOT_FOUND)
