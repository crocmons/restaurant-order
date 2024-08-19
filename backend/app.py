from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration for SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the PantryItem model
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date_added = db.Column(db.String(50), nullable=False)

# Initialize the database
with app.app_context():
    db.create_all()

# Route to add a new order item
@app.route('/orders', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = OrderItem(
        customer_name=data['customer_name'],
        quantity=data['quantity'],
        category=data['category'],
        date_added=data['date_added']
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Order item added successfully!'}), 201

# Route to get all order items
@app.route('/orders', methods=['GET'])
def get_items():
    items = OrderItem.query.all()
    output = []
    for item in items:
        item_data = {
            'id': item.id,
            'customer_name': item.customer_name,
            'quantity': item.quantity,
            'category': item.category,
            'date_added': item.date_added
        }
        output.append(item_data)
    return jsonify(output)

# Route to update a order item
@app.route('/orders/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    item = OrderItem.query.get_or_404(id)
    item.customer_name = data['customer_name']
    item.quantity = data['quantity']
    item.category = data['category']
    item.date_added = data['date_added']
    db.session.commit()
    return jsonify({'message': 'Order item updated successfully!'})

# Route to delete a order item
@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = OrderItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully!'})

# Main entry point
# if __name__ == '__main__':
#     app.run(debug=True)
