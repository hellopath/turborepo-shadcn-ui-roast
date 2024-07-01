import os
import random
import uuid
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from flask_cors import CORS
import boto3

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///photos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_S3_REGION_NAME')
)

class PhotoGroup(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    photos = db.relationship('Photo', backref='photo_group', lazy=True, cascade="all, delete-orphan")

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(80), nullable=False)
    s3_url = db.Column(db.String(200), nullable=False)
    attractivenessScore = db.Column(db.Integer, nullable=False)
    confidenceScore = db.Column(db.Integer, nullable=False)
    authenticityScore = db.Column(db.Integer, nullable=False)
    potentialScore = db.Column(db.Integer, nullable=False)
    critique = db.Column(db.String(200), nullable=False)
    photo_group_id = db.Column(db.String(36), db.ForeignKey('photo_group.id'), nullable=False)

with app.app_context():
    db.create_all()

def upload_to_s3(file):
    bucket_name = os.getenv('AWS_S3_BUCKET_NAME')
    filename = secure_filename(file.filename)
    s3_client.upload_fileobj(
        file,
        bucket_name,
        filename,
        ExtraArgs={"ContentType": file.content_type}
    )
    s3_url = f"https://{bucket_name}.s3.amazonaws.com/{filename}"
    return filename, s3_url

def generate_random_scores():
    return {
        "attractivenessScore": random.randint(1, 100),
        "confidenceScore": random.randint(1, 100),
        "authenticityScore": random.randint(1, 100),
        "potentialScore": random.randint(80, 100),
        "critique": random.choice([
            "Excellent composition! You can push the contrast a bit more.",
            "Needs better lighting. Try using a reflector.",
            "Fantastic use of color. But the focus is a bit off.",
            "Could be sharper. Try using a tripod next time.",
            "Great capture of emotion! But the background is distracting."
        ])
    }

@app.route('/upload', methods=['POST'])
def upload_photos():
    if 'photos' not in request.files:
        return jsonify({"error": "No photo part in the request"}), 400

    files = request.files.getlist('photos')
    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    photo_group = PhotoGroup()
    db.session.add(photo_group)
    db.session.flush()

    uploaded_photos = []

    for file in files:
        if not file.filename:
            continue

        filename, s3_url = upload_to_s3(file)
        scores = generate_random_scores()

        photo = Photo(
            filename=filename,
            s3_url=s3_url,
            attractivenessScore=scores['attractivenessScore'],
            confidenceScore=scores['confidenceScore'],
            authenticityScore=scores['authenticityScore'],
            potentialScore=scores['potentialScore'],
            critique=scores['critique'],
            photo_group_id=photo_group.id
        )
        db.session.add(photo)
        uploaded_photos.append({
            "filename": filename,
            "s3_url": s3_url,
            "attractivenessScore": scores['attractivenessScore'],
            "confidenceScore": scores['confidenceScore'],
            "authenticityScore": scores['authenticityScore'],
            "potentialScore": scores['potentialScore'],
            "critique": scores['critique']
        })

    db.session.commit()

    return jsonify({
        "group_id": photo_group.id,
        "uploaded_photos": uploaded_photos
    }), 201

@app.route('/upload/<string:group_id>', methods=['POST'])
def upload_photo_to_group(group_id):
    photo_group = PhotoGroup.query.get_or_404(group_id)

    if 'photo' not in request.files:
        return jsonify({"error": "No photo part in the request"}), 400

    file = request.files['photo']
    if not file.filename:
        return jsonify({"error": "No file uploaded"}), 400

    filename, s3_url = upload_to_s3(file)
    scores = generate_random_scores()

    photo = Photo(
        filename=filename,
        s3_url=s3_url,
        attractivenessScore=scores['attractivenessScore'],
        confidenceScore=scores['confidenceScore'],
        authenticityScore=scores['authenticityScore'],
        potentialScore=scores['potentialScore'],
        critique=scores['critique'],
        photo_group_id=photo_group.id
    )
    db.session.add(photo)
    db.session.commit()

    return jsonify({
        "id": photo.id,
        "filename": filename,
        "s3_url": s3_url,
        "attractivenessScore": scores['attractivenessScore'],
        "confidenceScore": scores['confidenceScore'],
        "authenticityScore": scores['authenticityScore'],
        "potentialScore": scores['potentialScore'],
        "critique": scores['critique']
    }), 201

@app.route('/photos/<string:group_id>', methods=['GET'])
def get_photos_by_group_id(group_id):
    photos = Photo.query.filter_by(photo_group_id=group_id).all()
    return jsonify([{
        "id": photo.id,
        "filename": photo.filename,
        "s3_url": photo.s3_url,
        "attractivenessScore": photo.attractivenessScore,
        "confidenceScore": photo.confidenceScore,
        "authenticityScore": photo.authenticityScore,
        "potentialScore": photo.potentialScore,
        "critique": photo.critique
    } for photo in photos])

@app.route('/photos/<string:group_id>/<int:photo_id>', methods=['DELETE'])
def delete_photo(group_id, photo_id):
    photo = Photo.query.filter_by(id=photo_id, photo_group_id=group_id).first_or_404()

    # Delete the photo from S3
    s3_client.delete_object(Bucket=os.getenv('AWS_S3_BUCKET_NAME'), Key=photo.filename)

    # Delete the photo from the database
    db.session.delete(photo)
    db.session.commit()

    return jsonify({"message": "Photo deleted successfully"}), 200

@app.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify([{
        "id": photo.id,
        "filename": photo.filename,
        "s3_url": photo.s3_url,
        "attractivenessScore": photo.attractivenessScore,
        "confidenceScore": photo.confidenceScore,
        "authenticityScore": photo.authenticityScore,
        "potentialScore": photo.potentialScore,
        "critique": photo.critique
    } for photo in photos])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)