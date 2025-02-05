from django.db import models # type: ignore

from .Users import Users
from .Items import Items

class UserItems(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, on_delete=models.CASCADE)