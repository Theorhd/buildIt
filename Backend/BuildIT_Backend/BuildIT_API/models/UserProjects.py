from django.db import models # type: ignore

from .Users import Users
from .Projects import Projects

class UserProjects(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    user_role = models.CharField(max_length=255)
    project_placement = models.CharField(max_length=255)