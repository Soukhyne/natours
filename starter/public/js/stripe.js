/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51JToDjHy9IxVrW7je6lvV4KfCfPJF7mkySGYocTmaapva0LzwbWo70ylVxtoBOZrVtflDH66i1UySSc1YmfzG0na00T3U72644'
  );
  try {
    //1 get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
      //http://127.0.0.1:3000
    );
    console.log(session);
    //2 create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
