from django.db import models

class Service(models.Model):
    titre = models.CharField(max_length=200)
    description = models.TextField()
    icone = models.CharField(max_length=10)
    ordre = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['ordre']
    
    def __str__(self):
        return self.titre


class Realisation(models.Model):
    TYPE_CHOICES = [
        ('simple', 'Simple'),
        ('projet', 'Projet'),
    ]
    
    CATEGORY_CHOICES = [
        ('graphic_design', 'Graphic Design'),
        ('community', 'Community Management'),
        ('web_dev', 'Développement Web'),
        ('media_buying', 'Media Buying'),
        ('global', 'Projet Global'),
    ]
    
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    categorie = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    titre = models.CharField(max_length=200)
    description = models.TextField()
    
    # Pour type "simple" - une seule image
    image = models.ImageField(upload_to='realisations/', blank=True, null=True)
    
    # Pour type "projet" - informations supplémentaires
    client = models.CharField(max_length=200, blank=True, null=True)
    date_debut = models.CharField(max_length=100, blank=True, null=True)
    date_fin = models.CharField(max_length=100, blank=True, null=True)
    services = models.TextField(blank=True, null=True)  # Stocké comme CSV
    
    afficher_accueil = models.BooleanField(default=False)
    ordre = models.IntegerField(default=0)
    date_creation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['ordre', '-date_creation']
        verbose_name = 'Réalisation'
        verbose_name_plural = 'Réalisations'
    
    def __str__(self):
        return self.titre
    
    def get_category_display_custom(self):
        categories = dict(self.CATEGORY_CHOICES)
        return categories.get(self.categorie, self.categorie)
    
    def get_first_image(self):
        """Retourne la première image disponible"""
        # Pour les réalisations simples
        if self.image:
            return self.image
        # Pour les projets, chercher dans les images associées
        first_project_image = self.images.first()
        if first_project_image:
            return first_project_image.image
        return None
    
    def has_image(self):
        """Vérifie si la réalisation a au moins une image"""
        return bool(self.get_first_image())
    
    def get_all_images(self):
        """Retourne toutes les images du projet"""
        if self.type == 'simple' and self.image:
            return [self.image]
        return [img.image for img in self.images.all()]


class ImageRealisation(models.Model):
    """Modèle pour gérer plusieurs images par projet"""
    realisation = models.ForeignKey(
        Realisation, 
        on_delete=models.CASCADE, 
        related_name='images'
    )
    image = models.ImageField(upload_to='realisations/')
    legende = models.CharField(max_length=200, blank=True)
    ordre = models.IntegerField(default=0)
    date_ajout = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['ordre', 'date_ajout']
        verbose_name = 'Image de Réalisation'
        verbose_name_plural = 'Images de Réalisations'
    
    def __str__(self):
        return f"Image {self.ordre} - {self.realisation.titre}"
