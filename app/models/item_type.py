from .db import db

class ItemType(db.Model):
    __tablename__ = 'item_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    items = db.relationship("Item", back_populates="item_type")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
