from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

import traceback



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
    # try:
    name = request.POST.get('name')
    email = request.POST.get('email')
    subject = request.POST.get('subject')
    message = request.POST.get('message')

    formatted_message = message.replace('\n', '<br>')

    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redfruit AI Inquiry</title>
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }}
            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background-color: #d1454f;
                padding: 20px;
                text-align: center;
                color: #ffffff;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
                font-weight: normal;
            }}
            .content {{
                padding: 30px;
            }}
            .content p {{
                margin: 10px 0;
                line-height: 1.6;
            }}
            .content strong {{
                color: #333;
            }}
            .content .message {{
                background-color: #f4f4f4;
                padding: 15px;
                border-radius: 5px;
                margin-top: 15px;
            }}
            .footer {{
                background-color: #b23a48;
                padding: 10px;
                text-align: center;
                color: #ffffff;
                font-size: 12px;
            }}
            .footer a {{
                color: #ffffff;
                text-decoration: none;
            }}
            @media only screen and (max-width: 600px) {{
                .container {{
                    margin: 10px;
                }}
                .header h1 {{
                    font-size: 20px;
                }}
                .content {{
                    padding: 20px;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Message from Redfruit AI</h1>
            </div>
            <div class="content">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <div class="message">
                    <p><strong>Message:</strong><br>{formatted_message}</p>
                </div>
            </div>
            <div class="footer">
                <p>Redfruit AI | <a href="https://yourwebsite.com">Visit Our Website</a></p>
            </div>
        </div>
    </body>
    </html>
    """

    text_content = strip_tags(html_content)  # Fallback plain text

    msg = EmailMultiAlternatives(
        subject=f"Redfruit AI Inquiry: {subject}",
        body=text_content,
        from_email=f"Redfruit AI | {name} <galinato.jancarlo2873@gmail.com>",
        to=['jancarlogalinato@gmail.com'],
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    return JsonResponse({'success': True})

    # except Exception as e:
    #     print(f"Email sending failed: {str(e)}")
    #     traceback.print_exc()
    #     return JsonResponse({'success': False, 'error': str(e)})
