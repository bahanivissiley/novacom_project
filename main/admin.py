from django.contrib import admin
from .models import Service, Realisation, ImageRealisation

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['titre', 'ordre']
    list_editable = ['ordre']
    ordering = ['ordre']


class ImageRealisationInline(admin.TabularInline):
    """Inline pour ajouter plusieurs images directement dans le formulaire de Réalisation"""
    model = ImageRealisation
    extra = 3  # Nombre de champs vides à afficher par défaut
    fields = ['image', 'legende', 'ordre']
    ordering = ['ordre']


@admin.register(Realisation)
class RealisationAdmin(admin.ModelAdmin):
    list_display = ['titre', 'type', 'categorie', 'afficher_accueil', 'nombre_images', 'ordre']
    list_filter = ['type', 'categorie', 'afficher_accueil']
    list_editable = ['afficher_accueil', 'ordre']
    search_fields = ['titre', 'description', 'client']
    ordering = ['ordre', '-date_creation']
    
    # Ajouter l'inline pour les images
    inlines = [ImageRealisationInline]
    
    fieldsets = (
        ('Informations de base', {
            'fields': ('type', 'categorie', 'titre', 'description')
        }),
        ('Image (pour réalisation simple uniquement)', {
            'fields': ('image',),
            'description': 'Utilisez ce champ uniquement pour les réalisations de type "Simple". Pour les projets, utilisez la section "Images" ci-dessous.'
        }),
        ('Informations projet (pour type projet)', {
            'fields': ('client', 'date_debut', 'date_fin', 'services'),
            'classes': ('collapse',),
            'description': 'Ces champs sont utilisés uniquement pour les réalisations de type "Projet".'
        }),
        ('Affichage', {
            'fields': ('afficher_accueil', 'ordre')
        }),
    )
    
    def nombre_images(self, obj):
        """Affiche le nombre d'images pour chaque réalisation"""
        if obj.type == 'simple':
            return '1' if obj.image else '0'
        return obj.images.count()
    nombre_images.short_description = 'Images'


@admin.register(ImageRealisation)
class ImageRealisationAdmin(admin.ModelAdmin):
    list_display = ['realisation', 'legende', 'ordre', 'date_ajout']
    list_filter = ['realisation__categorie', 'date_ajout']
    list_editable = ['ordre']
    search_fields = ['realisation__titre', 'legende']
    ordering = ['realisation', 'ordre']

