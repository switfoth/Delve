from .db import db

class Party(db.Model):
    __tablename__ = 'parties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    platinum = db.Column(db.Integer, default=0)
    gold = db.Column(db.Integer, default=0)
    silver = db.Column(db.Integer, default=0)
    copper = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users'))

    members = db.relationship("Member", back_populates="party")
    items = db.relationship("Item", back_populates="party")
    user = db.relationship("User", back_populates="parties")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "platinum": self.platinum,
            "gold": self.gold,
            "silver": self.silver,
            "copper": self.copper,
            "user_id": self.user_id
        }
