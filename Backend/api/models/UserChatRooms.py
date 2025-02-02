from django.db import models # type: ignore

from .Users import Users
from .ChatRooms import ChatRooms

class UserChatRooms(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    chatroom = models.ForeignKey(ChatRooms, on_delete=models.CASCADE)