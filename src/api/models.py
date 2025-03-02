from flask_sqlalchemy import SQLAlchemy
# from enum import Enumb

db = SQLAlchemy()

# user_favorites = db.Table(
#     'user_favorites',
#     db.Column('user_id', ForeignKey='user.id'),
#     db.Column('planet_id', ForeignKey='planet.id'),
#     db.Column('character_id', ForeignKey='character.id')
# )

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40))
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    salt = db.Column(db.String(255), unique=False, nullable=False)

    favorites = db.relationship('Favorites', back_populates='user')
    posts = db.relationship('Post', back_populates='user')


    def serialize(self):
        return {
        'name': self.name,
        'last_name': self.last_name,
        'email': self.email
        }

    
# class Nature(Enum):
#     CHARACTER = 'character'
#     PLANET = 'planet'

class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    element_id = db.Column(db.Integer, nullable=True)
    original_title = db.Column(db.String(130), nullable=True)
    character_name = db.Column(db.String(130), nullable=True)
    nature = db.Column(db.Integer, nullable=False)


    user = db.relationship('User', back_populates='favorites')

    def serialize(self):
        return ({
        'id': self.id,
        'user_id': self.user_id,
        "element_id": self.element_id,
        "original_title": self.original_title,
        "character_name": self.character_name,
        "nature": self.nature
        # 'nature': self.nature.value
        })
    
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    message = db.Column(db.Text())
    character_id = db.Column(db.Integer)
    movie_id = db.Column(db.Integer)



    user = db.relationship('User', back_populates='posts')

    def serialize(self): 
        return ({
            "id": self.id,
            "user": self.user.serialize(),
            "message": self.message,
            "character_id": self.character_id,
            "movie_id": self.movie_id
        })