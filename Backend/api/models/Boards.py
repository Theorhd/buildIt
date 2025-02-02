from django.db import models # type: ignore

from .Projects import Projects
from .ChatRooms import ChatRooms

class Boards(models.Model):
    name = models.CharField(max_length=22)
    placement = models.IntegerField(default=0)
    project = models.ForeignKey(Projects, related_name='boards', on_delete=models.CASCADE, null=False, blank=False)
    chatroom = models.OneToOneField(ChatRooms, null=True, blank=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si l'objet est créé pour la première fois
            # Récupérer la dernière valeur de placement pour ce projet
            last_placement = Boards.objects.filter(project=self.project).aggregate(max_placement=models.Max('placement'))['max_placement']
            self.placement = (last_placement or 0) + 1
        super(Boards, self).save(*args, **kwargs)