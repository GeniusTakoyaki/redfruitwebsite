from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.http import HttpResponse



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




def send_message(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        formatted_message = message.replace('\n', '<br>')

        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #D9230F;">New Message from Redfruit AI</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Message:</strong><br>{formatted_message}</p>
            </body>
        </html>
        """

        text_content = strip_tags(html_content)  # fallback plain text

        msg = EmailMultiAlternatives(
            subject=f"Redfruit AI Inquiry: {subject}",
            body=text_content,
            from_email=f"Redfruit AI | {name} <galinato.jancarlo2873@gmail.com>",
            to=['jancarlogalinato@gmail.com'],  # or whoever receives the email
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return render(request, 'redfruit/directs/email_success.html')  # or redirect or message
