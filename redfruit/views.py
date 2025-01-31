from django.shortcuts import render

def home(request):
    return render(request, 'redfruit/index.html')

def ai_folder(request):
    return render(request, 'redfruit/ai-folder/ai-page.html')

def how_it_works_page(request):
    return render(request, 'redfruit/nav_pages/how_it_works_page/how_it_works.html')

def discover(request):
    return render(request, 'redfruit/nav_pages/discover_page/discover.html')