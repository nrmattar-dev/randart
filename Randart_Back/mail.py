# mail.py
from flask_mail import Mail, Message
from flask import render_template

mail = Mail()

def configure_mail(app):
    app.config['MAIL_SERVER'] = 'smtp.ethereal.email'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'tremaine96@ethereal.email'
    app.config['MAIL_PASSWORD'] = 'DHxKURtU5NdEED1aTm'
    app.config['MAIL_SENDER'] = 'your-email@example.com'
    mail.init_app(app)

def send_verification_email(data):
    email_recibido = data.get('email')
    token_recibido = data.get('token')
    
    msg = Message('Verifica tu cuenta', sender='your-email@example.com', recipients=[email_recibido])
    msg.html = render_template('verification_email.html', email=email_recibido, token=token_recibido)
 
    mail.send(msg)