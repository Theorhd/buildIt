from django.db import models # type: ignore

from .Projects import Projects
from .ChatRooms import ChatRooms

class Boards(models.Model):
    name = models.CharField(max_length=255)
    placement = models.CharField(max_length=255)
    project = models.ForeignKey(Projects, related_name='boards', on_delete=models.CASCADE)
    chatroom = models.OneToOneField(ChatRooms, null=True, blank=True, on_delete=models.SET_NULL)