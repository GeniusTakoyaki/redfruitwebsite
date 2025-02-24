from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from redfruit.utils.classifier import classify_image

def home(request):
    return render(request, 'redfruit/index.html')

def ai_folder(request):
    return render(request, 'redfruit/ai-folder/ai-page.html')

def how_it_works_page(request):
    return render(request, 'redfruit/nav_pages/how_it_works_page/how_it_works.html')

def discover(request):
    return render(request, 'redfruit/nav_pages/discover_page/discover.html')


@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']

        try:
            # Process the image using the classifier
            result = classify_image(uploaded_file)

            # Return the result as JSON
            return JsonResponse(result)

        except Exception as e:
            # Handle any errors during classification
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

            # If not a POST request or no file uploaded, return an error
    return JsonResponse({'status': 'error', 'message': 'No file uploaded'}, status=400)