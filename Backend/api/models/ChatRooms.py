from django.db import models # type: ignore

class ChatRooms(models.Model):
    name = models.CharField(max_length=255)