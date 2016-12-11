
import requests

def post_line_api():
    headers = {
        'X-LINE-ChannelToken': '8sMiWTb1qCWxEBiKojZoaabKrTt39WNxD9NtpQAIFhj1Nq5OtQeG7R5qB2i0v8PkMDv+zERtxuGWPxmCp6u1k6Y0bnPG493OEvPbAxoKdeAT6zO6SDcy6FYw3P0Zo+cb2G9CYtI3Ynmxj1Dl4c+wM6lFKJG531yDaZgezYF19C0=',
        'content-type': 'application/json'
    }
    payload = {
        'to': 'value1',
        'toChannel': 1383378250,
        'eventType': '138311608800106203',
        'content': {
            'contentType': 1,
            'toType': 1,
            'text': 'hello stranger'
        }
    }

    r = requests.post('https://api.line.me/v1/events', data=payload, headers=headers)
    print('reply code = ', r.status_code)
    print('text = ' r.text)
    print('json response = ', r.json())
