# Generated by Django 5.1.4 on 2024-12-13 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BuildIT_API', '0002_alter_users_tagname'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
