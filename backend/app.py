from flask import Flask, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import stripe
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


stripe.api_key = os.getenv("STRIPE_API_KEY")

# Configuration for SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items23.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the OrderItem model
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)  # Ensure this is an integer
    date_added = db.Column(db.String(50), nullable=False)

# Initialize the database
with app.app_context():
    db.create_all()

# Route to add a new order item
# Add logging in the add_item route
@app.route('/orders', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = OrderItem(
        customer_name=data['customer_name'],
        quantity=data['quantity'],
        category=data['category'],
        date_added=data['date_added'],
        price=data['price']
    )
    db.session.add(new_item)
    db.session.commit()
    app.logger.info(f"Order item added: {new_item}")
    return jsonify({'message': 'Order item added successfully!'}), 201

# Route to get all order items
@app.route('/orders', methods=['GET'])
def get_items():
    items = OrderItem.query.all()
    app.logger.info(f"Fetched items: {items}")
    output = []
    for item in items:
        item_data = {
            'id': item.id,
            'customer_name': item.customer_name,
            'quantity': item.quantity,
            'category': item.category,
            'date_added': item.date_added,
            'price': item.price
        }
        output.append(item_data)
    return jsonify(output)


# Route to create a dynamic Stripe checkout session
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    try:
        # Save the order to the database first
        new_order = OrderItem(
            customer_name=data['customer_name'],
            category=data['category'],
            quantity=data['quantity'],
            price=data['price'],  # in cents
            date_added=data['date_added']
        )
        db.session.add(new_order)
        db.session.commit()

        # Now create the Stripe session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': data['category'],
                    },
                    'unit_amount': data['price'],
                },
                'quantity': data['quantity'],
            }],
            mode='payment',
            success_url='https://restaurant-order-nu.vercel.app/orders',
            cancel_url='https://restaurant-order-nu.vercel.app/cancel',
        )
        return jsonify({'url': session.url})
    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route('/payment/success')
def payment_success():
    session_id = request.args.get('session_id')
    order_id = request.args.get('order_id')
    
    print(f"Session ID: {session_id}")
    print(f"Order ID: {order_id}")

    if session_id and order_id:
        # Fetch the order item from the database using order_id
        order_item = OrderItem.query.filter_by(id=order_id).first()
        if order_item:
            # Update the order item status or any other relevant information
            # e.g., order_item.status = 'Completed'
            db.session.commit()
            order_data = {
                'id': order_item.id,
                'customer_name': order_item.customer_name,
                'quantity': order_item.quantity,
                'category': order_item.category,
                'date_added': order_item.date_added,
                'price': order_item.price
            }
            return jsonify({'order': order_data})
    else:
        return jsonify({'error': 'Payment session or order ID not found.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
