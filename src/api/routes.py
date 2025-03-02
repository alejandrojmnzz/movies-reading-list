"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Post
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
# @api.route('/people', methods=['GET'])
# def get_all_people():
#     people = People.query.all()

#     return jsonify(list(map(lambda item: item.serialize(), people))), 200    

@api.route('/sign-up', methods=['POST'])
def sign_up():
    try:
            body = request.json
            name = body.get("name", None)
            last_name = body.get("lastName", None)
            email = body.get("email",  None)
            password = body.get("password", None)

            if name is None or email is None or password is None:
                return jsonify('Name, email and password keys are required'), 400

            if name.strip() == "" or email.strip() == "" or password.strip() == "":
                return jsonify('All credentials are required'), 400
            else:
                user = User()
                user_exist = user.query.filter_by(email = email).one_or_none()

                if user_exist is not None:
                    return jsonify('User with that email already exists'), 409
                else:
                    salt = b64encode(os.urandom(32)).decode('utf-8')
                    hashed_password = generate_password_hash(f'{password}{salt}')

                    user.name = name
                    user.email = email
                    user.last_name = last_name
                    user.password = hashed_password
                    user.salt = salt

                    db.session.add(user)
                    try:
                        db.session.commit()
                        return jsonify('User created'), 201
                    except Exception as error:

                        print(error.args)
                        return jsonify('Error'), 500
    except Exception as error:
        print(error.args)
        return jsonify('Error'), 500
    
@api.route('/sign-in', methods=['POST'])
def sign_in():
    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)

    if email is None or password is None:
        return jsonify('Email and password keys are required'), 400
    if email.strip() == "" or password.strip() == "":
        return jsonify('All credentials are required'), 400

    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify('User does not exist'), 404
    else:
        try:
            if check_password_hash(user.password, f'{password}{user.salt}'):
                token = create_access_token(identity = str(user.id))
                return jsonify({"token": token, "current_user": user.serialize()}), 200
            else:
                return jsonify("Incorrect credentials"), 404
        except Exception as error:
            print(error.args)
            return jsonify('Error'), 500

    
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()

    return jsonify(list(map(lambda item: item.serialize(), users)))

@api.route('/users/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    try:
        favorites = Favorites.query.filter_by(user_id = int(get_jwt_identity()))
        return jsonify(list(map(lambda item: item.serialize(), favorites)))
    
    except Exception as error:
        print(error)
        return jsonify('error')
  
@api.route('/favorite/<int:nature>', methods=['POST'])
@jwt_required()
def add_favorite(nature=None):
    try:
        body = request.json
        favorite = Favorites()
        favorite.element_id = body.get("id")
        favorite.user_id = int(get_jwt_identity())
        favorite.original_title = body.get("title")
        favorite.character_name = body.get("name")
        favorite.nature = nature
        exists = Favorites.query.filter(Favorites.element_id == body.get("id"), Favorites.user_id == int(get_jwt_identity())).first()
        if exists is None:
            db.session.add(favorite)
            db.session.commit()
            return jsonify('Added'), 200
        else:
            return jsonify(f'id {body.get("id")} already exists'), 404
    except Exception as error:
        print(error)
        return jsonify('error'), 500
    
@api.route('/favorite/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id=None):
  
    movie_favorite = Favorites.query.filter(Favorites.id == id, Favorites.user_id == int(get_jwt_identity())).first()
    if movie_favorite is not None:
        db.session.delete(movie_favorite)
        db.session.commit()
        return jsonify('Deleted'), 200
    else:
        return jsonify(f'id {id} does not exist'), 404
    
@api.route('/share/character/<int:character_id>', methods=['POST'])
@jwt_required()
def share_character(character_id=None):
    body = request.json

    post = Post()
    post.character_id = character_id
    post.user_id = int(get_jwt_identity())
    post.message = body["message"]
    db.session.add(post)
    try:
        db.session.commit()
        return jsonify("Posted"), 200
    except Exception as error:
        print(error.args)

        return jsonify("Error"), 500
        
@api.route('/share/movie/<int:movie_id>', methods=['POST'])
@jwt_required()
def share_movie(movie_id=None):
    body = request.json

    post = Post()
    post.movie_id = movie_id
    post.user_id = int(get_jwt_identity())
    post.message = body["message"]
    db.session.add(post)
    try:
        db.session.commit()
        return jsonify("Posted"), 200
    except Exception as error:
        print(error.args)

        return jsonify("Error"), 500
        
@api.route('/get-posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).limit(9).all()
    return jsonify(list(map(lambda item: item.serialize(), posts)))


# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
