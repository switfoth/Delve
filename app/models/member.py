from .db import db

class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    platinum = db.Column(db.Integer, default=0)
    gold = db.Column(db.Integer, default=0)
    silver = db.Column(db.Integer, default=0)
    copper = db.Column(db.Integer, default=0)
    party_id = db.Column(db.Integer, db.ForeignKey('parties'))

    items = db.relationship('Item', back_populates="member")
    party = db.relationship('Party', back_populates="members")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "platinum": self.platinum,
            "gold": self.gold,
            "silver": self.silver,
            "copper": self.copper,
            "party_id": self.party_id
        }
