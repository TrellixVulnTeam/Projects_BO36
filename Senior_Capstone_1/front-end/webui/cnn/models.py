from django.db import models


class Image(models.Model):
    name = models.TextField()
    image = models.ImageField(upload_to='images/')

    @classmethod
    def create(cls, file):
        obj = cls(name=file.name, image=file)
        return obj
