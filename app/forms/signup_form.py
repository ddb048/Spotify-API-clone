import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


#REVIEW - customize validation for age is possible, but not required here.
def validate_birthdate(form, field):
    birthdate = field.data
    if field.data > datetime.date.today():
        raise ValidationError("Birthdate cannot be in the future")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    birthdate = DateField('birthate', format="%d-%m-%Y", validators=[DataRequired(), validate_birthdate])
    marketable = BooleanField("marketable", validators=[DataRequired()])
    gender = SelectField(
        "gender", choices=["Male", "Female", "Non-binary", "Other", "Prefer not to say"], validators=[DataRequired()])
