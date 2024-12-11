from django.db import models # type: ignore

from .ChatRooms import ChatRooms

class Messages(models.Model):
    content = models.TextField()
    created_by = models.ForeignKey('Users', on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    chatroom = models.ForeignKey(ChatRooms, related_name='messages', on_delete=models.CASCADE)