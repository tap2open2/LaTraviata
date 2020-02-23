from django.db import models

class Stone(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField(max_length=2000)
    robot_voice_summary = models.BooleanField(default=True)
    audio_summary = models.FileField(upload_to='audio/')
    def __str__(self):
        return self.title


class Stone_samples(models.Model):
    stone = models.ForeignKey(Stone, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='stones')
    
