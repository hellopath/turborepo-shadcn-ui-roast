from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
import random

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///photos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

if not os.path.exists('uploads'):
    os.makedirs('uploads')

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    critique = db.Column(db.String(200), nullable=False)

# Ensure the database is created within the application context
with app.app_context():
    db.create_all()

@app.route('/upload', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({"error": "No photo part in the request"}), 400
    file = request.files['photo']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        score = random.randint(1, 100)
        critique = random.choice([
            "Excellent composition!",
            "Needs better lighting.",
            "Fantastic use of color.",
            "Could be sharper.",
            "Great capture of emotion!"
        ])

        photo = Photo(filename=filename, score=score, critique=critique)
        db.session.add(photo)
        db.session.commit()

        return jsonify({"filename": filename, "score": score, "critique": critique}), 201

@app.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify([{"id": photo.id, "filename": photo.filename, "score": photo.score, "critique": photo.critique} for photo in photos])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)