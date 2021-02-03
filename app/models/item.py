from .db import db

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500))
    platinum_value = db.Column(db.Integer, default=0)
    gold_value = db.Column(db.Integer, default=0)
    silver_value = db.Column(db.Integer, default=0)
    copper_value = db.Column(db.Integer, default=0)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"), nullable=True)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=True)
    type_id = db.Column(db.Integer, db.ForeignKey("item_types.id"))

    party = db.relationship('Party', back_populates="items")
    member = db.relationship('Member', back_populates="items")
    item_type = db.relationship("ItemType", back_populates="items")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "platinum_value": self.platinum_value,
            "gold_value": self.gold_value,
            "silver_value": self.silver_value,
            "copper_value": self.copper_value,
            "party_id": self.party_id,
            "member_id": self.member_id,
            "type_id": self.type_id
        }
