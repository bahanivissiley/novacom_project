from django.shortcuts import render, get_object_or_404
from .models import Service, Realisation

def index(request):
    services = Service.objects.all()
    realisations_apercu = Realisation.objects.filter(afficher_accueil=True)[:3]
    
    context = {
        'services': services,
        'realisations_apercu': realisations_apercu,
    }
    return render(request, 'main/index.html', context)


def realisations(request):
    categorie_filter = request.GET.get('categorie', 'all')
    
    if categorie_filter == 'all':
        realisations = Realisation.objects.all()
    else:
        realisations = Realisation.objects.filter(categorie=categorie_filter)
    
    categories = Realisation.CATEGORY_CHOICES
    
    context = {
        'realisations': realisations,
        'categories': categories,
        'categorie_active': categorie_filter,
    }
    return render(request, 'main/realisations.html', context)


def realisation_detail(request, pk):
    realisation = get_object_or_404(Realisation, pk=pk)
    
    # Récupérer des réalisations similaires (même catégorie, excluant la réalisation actuelle)
    realisations_similaires = Realisation.objects.filter(
        categorie=realisation.categorie
    ).exclude(pk=pk)[:3]
    
    context = {
        'realisation': realisation,
        'realisations_similaires': realisations_similaires,
    }
    return render(request, 'main/realisation_detail.html', context)
