from django.db import models # type: ignore

from .Users import Users
from .Skills import Skills

class UserSkills(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)