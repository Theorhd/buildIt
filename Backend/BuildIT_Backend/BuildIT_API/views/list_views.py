from rest_framework import generics, status
from rest_framework.response import Response

from BuildIT_API.models.Lists import Lists
from BuildIT_API.models.Boards import Boards
from BuildIT_API.models.Items import Items
from BuildIT_API.serializers.ListSerializer import ListSerializer
from BuildIT_API.permissions import IsAuthenticatedWithToken, IsUserInProjectFromBoardId, IsUserInProjectFromListId

class ListCreateView(generics.CreateAPIView):
    """
    Création d'une nouvelle list dans un board donné.
    
    Permission :
    - JWT Token valide
    - L'utilisateur doit faire partie du projet ou il veut créer la liste.
    """
    serializer_class = ListSerializer
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromBoardId]

    def post(self, request, *args, **kwargs):
        print("Requête reçue pour la création de liste :", request.data)  # Log des données reçues
        
        # Récupération du board_id depuis les données
        board_id = request.data.get('board_id')
        if not board_id:
            print("Erreur : Aucun 'board_id' fourni.")
            return Response({"error": "Le champ 'board_id' est requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Vérification de l'existence du board
            board = Boards.objects.get(id=board_id)
            print(f"Board trouvé : {board}")

            # Sérialisation des données avec le board inclus
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(board=board)
                print("Liste créée avec succès :", serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Erreur de validation du sérialiseur :", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Boards.DoesNotExist:
            print(f"Erreur : Le board avec l'ID {board_id} n'existe pas.")
            return Response({"error": "Board introuvable."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(f"Erreur inattendue lors de la création de la liste : {e}")
            return Response({"error": "Une erreur inattendue est survenue."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
    - L'utilisateur doit faire partie du projet ou il veut supprimer la liste.
    """
    permission_classes = [IsAuthenticatedWithToken, IsUserInProjectFromListId]
    queryset = Lists.objects.all()

def delete(self, request, *args, **kwargs):
    # Récupération de l'ID depuis les paramètres
    list_id = kwargs.get('pk')
    print(f"ID reçu pour suppression : {list_id}")

    # Vérification de la permission
    user = request.user
    print(f"Utilisateur en cours : {user}")

    try:
        # Vérifie si la liste existe
        list_instance = Lists.objects.get(id=list_id)
        print(f"Liste trouvée pour suppression : {list_instance}")
        print(f"Board associé : {list_instance.board}")
        print(f"Projet associé : {list_instance.board.project}")

        # Suppression de la liste
        list_instance.delete()
        return Response({"message": "List deleted successfully."}, status=status.HTTP_200_OK)

    except Lists.DoesNotExist:
        print(f"La liste avec l'ID {list_id} n'existe pas.")
        return Response({"error": "List not found."}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        print(f"Erreur inattendue : {e}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
