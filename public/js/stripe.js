/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HAblbLqdkHr4OCS6p7dDLguOhWkz5dAf6pIxX9On2jj8Vtq82CtBoWiOsQ3R9R4TnJF6yEm2WjhHP9SRoUOrUll00TJi1I59H'
);
console.log();

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
