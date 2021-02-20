from app.models import db, ItemType, Item

def seed_item_types():

    weapon = ItemType(
        name="Weapon"
    )

    armor = ItemType(
        name="Armor"
    )

    ring = ItemType(
        name="Ring"
    )

    wand = ItemType(
        name="Wand"
    )

    wondrous_item = ItemType(
        name="Wondrous Item"
    )

    potion = ItemType(
        name="Potion"
    )

    gear = ItemType(
        name="Gear"
    )

    tool = ItemType(
        name="Tool"
    )

    scroll = ItemType(
        name="Scroll"
    )

    consumable = ItemType(
        name="Consumable"
    )

    valuables = ItemType(
        name="Valuables"
    )

    vehicle = ItemType(
        name="Vehicle"
    )

    other = ItemType(
        name="...Other?"
    )

    db.session.add(weapon)
    db.session.add(armor)
    db.session.add(ring)
    db.session.add(wand)
    db.session.add(wondrous_item)
    db.session.add(potion)
    db.session.add(gear)
    db.session.add(tool)
    db.session.add(scroll)
    db.session.add(consumable)
    db.session.add(valuables)
    db.session.add(vehicle)
    db.session.add(other)

    db.session.commit()

def undo_item_types():
    db.session.execute('TRUNCATE item_types RESTART IDENTITY CASCADE;')
    db.session.commit()
