from rest_framework import generics, status
from rest_framework.response import Response

from BuildIT_API.models.Lists import Lists
from BuildIT_API.models.Boards import Boards
from BuildIT_API.serializers.ListSerializer import ListSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken, IsUserInProjectFromBoardId, IsUserInProjectFromListId

class ListCreateView(generics.CreateAPIView):
	"""
	Création d'une nouvelle list dans un board donné.
	
	Permission :
	- JWT Token valide
	- L'utilisateur doit faire partit du projet ou il veut créer la list.
	"""
	serializer_class = ListSerializer
	permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromBoardId]
	
	def post (self, request, *args, **kwargs):

		# Board_id deja vérifié dans la permission IsUserInProjectFromBoardId
		board_id = request.data.get('board_id')

		# Vérification de l'existence du board
		try:
			board = Boards.objects.get(id=board_id)
		except Boards.DoesNotExist:
			return Response({"error": "Board introuvable."}, status=status.HTTP_404_NOT_FOUND)
		
		# Sérialise les données avec le board inclus
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		# Sauvegarde avec le board transmis
		serializer.save(board=board)
		return Response(serializer.data, status=status.HTTP_201_CREATED)

class ListRetrieveView(generics.RetrieveAPIView):
	"""
	Récupération d'une list.
	
	Permission :
	- JWT Token valide
	- L'utilisateur doit faire partit du projet ou il veut voir la list.
	"""
	serializer_class = ListSerializer
	permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromListId]
	queryset = Lists.objects.all()

	def get(self, request, *args, **kwargs):

		# List_id deja vérifié dans la permission IsUserInProjectFromListId
		list_id = kwargs.get('pk')

		try:
			list = Lists.objects.get(id=list_id)
			serializer = self.get_serializer(list)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except Lists.DoesNotExist:
			return Response({"error": "List introuvable."}, status=status.HTTP_404_NOT_FOUND)

class ListUpdateView(generics.UpdateAPIView):
	"""
	Mise à jour d'une list avec son id donné.
	
	Permission :
	- JWT Token valide
	- L'utilisateur doit faire partit du projet ou il veut mettre à jour la list.
	"""
	serializer_class = ListSerializer
	permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromListId]
	queryset = Lists.objects.all()

	def put(self, request, *args, **kwargs):

		# List_id deja vérifié dans la permission IsUserInProjectFromListId
		list_id = request.data.get('list_id')
		list = Lists.objects.get(id=list_id)

		# Crée une instance du serializer avec la list transmise
		serializer = self.get_serializer(list, data=request.data, partial=True)

		# Vérifie si les données sont valides pour la mise à jour
		serializer.is_valid(raise_exception=True)

		# Sauvegarde les données mis à jour
		serializer.save()

		# Retourne les données mis à jour avec statut 200
		return Response(serializer.data, status=status.HTTP_200_OK)

class ListDeleteView(generics.DestroyAPIView):
	"""
	Suppression d'une list avec son id donné.
	
	Permission :
	- JWT Token valide
	- L'utilisateur doit faire partit du projet ou il veut supprimer la list.
	"""
	permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromListId]
	queryset = Lists.objects.all()

	def delete(self, request, *args, **kwargs):

		# List_id deja vérifié dans la permission IsUserInProjectFromListId
		list_id = kwargs.get('pk')

		# Suppression de la list
		try:
			list = Lists.objects.get(id=list_id)
			list.delete()
			return Response({"message": "List deleted successfully."},status=status.HTTP_200_OK)
		except Lists.DoesNotExist:
			return Response({"error": "List not found."}, status=status.HTTP_404_NOT_FOUND)